'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useModal } from '@/commons/providers/modal/modal.provider';
import { useAuth } from '@/commons/providers/auth/auth.provider';
import { Modal } from '@/commons/components/modal';
import { ROUTES } from '@/commons/constants/url';

// ========================================
// Zod Schema
// ========================================

const loginSchema = z.object({
  email: z
    .string()
    .min(1, '이메일을 입력해주세요')
    .refine((email) => email.includes('@'), {
      message: '이메일에 @를 포함해주세요',
    }),
  password: z.string().min(1, '비밀번호를 입력해주세요'),
});

type LoginFormData = z.infer<typeof loginSchema>;

// ========================================
// GraphQL Mutations & Queries
// ========================================

interface LoginUserInput {
  email: string;
  password: string;
}

interface LoginUserResponse {
  accessToken: string;
}

interface FetchUserLoggedInResponse {
  _id: string;
  name: string;
}

const loginUser = async (input: LoginUserInput): Promise<LoginUserResponse> => {
  const response = await fetch(
    'https://main-practice.codebootcamp.co.kr/graphql',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: `
        mutation loginUser($email: String!, $password: String!) {
          loginUser(email: $email, password: $password) {
            accessToken
          }
        }
      `,
        variables: {
          email: input.email,
          password: input.password,
        },
      }),
    }
  );

  const result = await response.json();

  if (result.errors) {
    throw new Error(result.errors[0].message);
  }

  return result.data.loginUser;
};

const fetchUserLoggedIn = async (
  accessToken: string
): Promise<FetchUserLoggedInResponse> => {
  const response = await fetch(
    'https://main-practice.codebootcamp.co.kr/graphql',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        query: `
        query {
          fetchUserLoggedIn {
            _id
            name
          }
        }
      `,
      }),
    }
  );

  const result = await response.json();

  if (result.errors) {
    throw new Error(result.errors[0].message);
  }

  return result.data.fetchUserLoggedIn;
};

// ========================================
// Hook
// ========================================

export const useLoginForm = () => {
  const router = useRouter();
  const { openModal, closeAllModals } = useModal();
  const { login } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setError,
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: 'onChange',
  });

  // 모든 필드 값 감시
  const watchedValues = watch();

  // 커스텀 유효성 검사 로직
  const isFormValid = () => {
    const { email, password } = watchedValues || {};

    // 모든 필드가 입력되었는지 확인 (빈 문자열도 입력으로 간주)
    if (email === undefined || password === undefined) {
      return false;
    }

    // 빈 문자열이 아닌지 확인
    if (!email.trim() || !password.trim()) {
      return false;
    }

    // 모든 필드가 입력되었으면 버튼을 활성화 (에러 메시지는 폼 제출 시 표시)
    return true;
  };

  const mutation = useMutation({
    mutationFn: async (data: LoginFormData) => {
      // 1. 로그인 API 호출
      const loginResponse = await loginUser({
        email: data.email,
        password: data.password,
      });

      // 2. 사용자 정보 조회 API 호출
      const userResponse = await fetchUserLoggedIn(loginResponse.accessToken);

      return {
        accessToken: loginResponse.accessToken,
        user: userResponse,
      };
    },
    retry: false, // 재시도 비활성화
    onSuccess: (data) => {
      // Auth Provider를 통해 로그인 상태 업데이트
      login(data.accessToken, {
        id: data.user._id,
        email: '', // 이메일은 API에서 반환하지 않으므로 빈 문자열
        name: data.user.name,
      });

      // 성공 모달 표시
      openModal(
        <Modal
          variant="info"
          actions="single"
          title="로그인 완료"
          content="로그인이 완료되었습니다"
          confirmText="확인"
          onConfirm={() => {
            closeAllModals();
            setTimeout(() => {
              router.push(ROUTES.DIARIES.LIST);
            }, 100);
          }}
        />
      );
    },
    onError: (error) => {
      // 콘솔 로그
      console.error('Login error:', error);

      // 에러가 validation 에러인 경우
      if (error.message.includes('@')) {
        setError('email', {
          type: 'manual',
          message: error.message,
        });
        return;
      }

      // 실패 모달 표시
      openModal(
        <Modal
          variant="danger"
          actions="single"
          title="로그인 실패"
          content={`로그인에 실패했습니다: ${error.message}`}
          confirmText="확인"
          onConfirm={() => {
            closeAllModals();
          }}
        />
      );
    },
  });

  const onSubmit = (data: LoginFormData) => {
    mutation.mutate(data);
  };

  return {
    register,
    handleSubmit: handleSubmit(onSubmit),
    errors,
    isValid: isFormValid(),
    isLoading: mutation.isPending,
  };
};
