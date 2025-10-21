'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useModal } from '@/commons/providers/modal/modal.provider';
import { Modal } from '@/commons/components/modal';
import { ROUTES } from '@/commons/constants/url';

// ========================================
// Zod Schema
// ========================================

const signupSchema = z
  .object({
    email: z
      .string()
      .min(1, '이메일을 입력해주세요')
      .refine((email) => email.includes('@'), {
        message: '이메일에 @를 포함해주세요',
      }),
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
    name: z.string().min(2, '이름은 2글자 이상이어야 합니다'),
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

const createUser = async (
  input: CreateUserInput
): Promise<CreateUserResponse> => {
  const response = await fetch(
    'https://main-practice.codebootcamp.co.kr/graphql',
    {
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
    }
  );

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

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    mode: 'onChange',
  });

  // 모든 필드 값 감시
  const watchedValues = watch();

  // 커스텀 유효성 검사 로직
  const isFormValid = () => {
    const { email, password, passwordConfirm, name } = watchedValues || {};

    // 모든 필드가 입력되었는지 확인 (빈 문자열도 입력으로 간주)
    if (
      email === undefined ||
      password === undefined ||
      passwordConfirm === undefined ||
      name === undefined
    ) {
      return false;
    }

    // 빈 문자열이 아닌지 확인
    if (
      !email.trim() ||
      !password.trim() ||
      !passwordConfirm.trim() ||
      !name.trim()
    ) {
      return false;
    }

    // 모든 필드가 입력되었으면 버튼을 활성화 (에러 메시지는 폼 제출 시 표시)
    return true;
  };

  const mutation = useMutation({
    mutationFn: createUser,
    retry: false, // 재시도 비활성화
    onSuccess: (data) => {
      if (data._id) {
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
    isValid: isFormValid(),
    isLoading: mutation.isPending,
  };
};
