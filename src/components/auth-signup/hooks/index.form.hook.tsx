'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useRef } from 'react';
import { useModal } from '@/commons/providers/modal/modal.provider';
import { Modal } from '@/commons/components/modal';
import { ROUTES } from '@/commons/constants/url';

// ========================================
// Zod Schema
// ========================================

const signupSchema = z
  .object({
    email: z.string().min(1, '이메일을 입력해주세요').refine(
      (email) => email.includes('@'),
      {
        message: '이메일에 @를 포함해주세요',
      }
    ),
    password: z
      .string()
      .min(8, '비밀번호는 8자리 이상이어야 합니다')
      .refine(
        (password) => /[a-zA-Z]/.test(password) && /[0-9]/.test(password),
        {
          message: '비밀번호는 영문과 숫자를 포함해야 합니다',
        }
      ),
    passwordConfirm: z.string().min(1, '비밀번호 확인을 입력해주세요'),
    name: z.string().min(1, '이름을 입력해주세요'),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: '비밀번호가 일치하지 않습니다',
    path: ['passwordConfirm'],
  });

type SignupFormData = z.infer<typeof signupSchema>;

// ========================================
// GraphQL Query
// ========================================

interface CreateUserInput {
  email: string;
  password: string;
  name: string;
}

interface CreateUserResponse {
  _id: string;
}

const createUser = async (input: CreateUserInput): Promise<CreateUserResponse> => {
  const response = await fetch('https://main-practice.codebootcamp.co.kr/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: `
        mutation createUser($createUserInput: CreateUserInput!) {
          createUser(createUserInput: $createUserInput) {
            _id
          }
        }
      `,
      variables: {
        createUserInput: {
          email: input.email,
          password: input.password,
          name: input.name,
        },
      },
    }),
  });

  const result = await response.json();

  if (result.errors) {
    throw new Error(result.errors[0].message);
  }

  return result.data.createUser;
};

// ========================================
// Hook
// ========================================

export const useSignupForm = () => {
  const router = useRouter();
  const { openModal, closeAllModals } = useModal();
  const hasShownSuccessModal = useRef(false);
  const hasShownFailureModal = useRef(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    mode: 'onChange',
  });

  const mutation = useMutation({
    mutationFn: createUser,
    onSuccess: (data) => {
      if (data._id && !hasShownSuccessModal.current) {
        hasShownSuccessModal.current = true;
        hasShownFailureModal.current = false;

        openModal(
          <Modal
            variant="info"
            actions="single"
            title="가입 완료"
            content="가입이 완료되었습니다"
            confirmText="확인"
            onConfirm={() => {
              closeAllModals();
              router.push(ROUTES.AUTH.LOGIN);
            }}
          />
        );
      }
    },
    onError: () => {
      if (!hasShownFailureModal.current) {
        hasShownFailureModal.current = true;
        hasShownSuccessModal.current = false;

        openModal(
          <Modal
            variant="danger"
            actions="single"
            title="가입 실패"
            content="회원가입에 실패했습니다"
            confirmText="확인"
            onConfirm={() => {
              closeAllModals();
            }}
          />
        );
      }
    },
  });

  const onSubmit = (data: SignupFormData) => {
    mutation.mutate({
      email: data.email,
      password: data.password,
      name: data.name,
    });
  };

  return {
    register,
    handleSubmit: handleSubmit(onSubmit),
    errors,
    isValid,
    isLoading: mutation.isPending,
  };
};
