import Image from 'next/image';
import { Button, ButtonGroup } from '../commons/components/button';

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <Image
          className="dark:invert"
          src="https://nextjs.org/icons/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />

        <div className="flex flex-col gap-8 items-center">
          <h1 className="text-2xl font-bold">
            감정 일기장 Button 컴포넌트 테스트
          </h1>

          {/* Size Variants */}
          <div className="flex flex-col gap-4 items-center">
            <h2 className="text-lg font-semibold">크기 변형 (Size Variants)</h2>
            <ButtonGroup spacing="medium" align="center">
              <Button variant="primary" size="small">
                작은 버튼
              </Button>
              <Button variant="primary" size="medium">
                중간 버튼
              </Button>
              <Button variant="primary" size="large">
                큰 버튼
              </Button>
            </ButtonGroup>
          </div>

          {/* Variant Types */}
          <div className="flex flex-col gap-4 items-center">
            <h2 className="text-lg font-semibold">
              스타일 변형 (Style Variants)
            </h2>
            <ButtonGroup spacing="medium" align="center">
              <Button variant="primary" size="medium">
                등록하기
              </Button>
              <Button variant="secondary" size="medium">
                닫기
              </Button>
              <Button variant="tertiary" size="medium">
                비활성화
              </Button>
            </ButtonGroup>
          </div>

          {/* Theme Variants */}
          <div className="flex flex-col gap-4 items-center">
            <h2 className="text-lg font-semibold">
              테마 변형 (Theme Variants)
            </h2>
            <div className="flex flex-col gap-4">
              <div className="p-4 bg-white rounded-lg">
                <p className="text-sm text-gray-600 mb-2">라이트 테마</p>
                <ButtonGroup spacing="medium" align="center">
                  <Button variant="primary" theme="light" size="small">
                    확인
                  </Button>
                  <Button variant="secondary" theme="light" size="small">
                    계속 작성
                  </Button>
                  <Button variant="tertiary" theme="light" size="small">
                    등록 취소
                  </Button>
                </ButtonGroup>
              </div>

              <div className="p-4 bg-gray-900 rounded-lg">
                <p className="text-sm text-gray-300 mb-2">다크 테마</p>
                <ButtonGroup spacing="medium" align="center">
                  <Button variant="primary" theme="dark" size="small">
                    확인
                  </Button>
                  <Button variant="secondary" theme="dark" size="small">
                    계속 작성
                  </Button>
                  <Button variant="tertiary" theme="dark" size="small">
                    등록 취소
                  </Button>
                </ButtonGroup>
              </div>
            </div>
          </div>

          {/* States */}
          <div className="flex flex-col gap-4 items-center">
            <h2 className="text-lg font-semibold">
              상태 변형 (State Variants)
            </h2>
            <ButtonGroup spacing="medium" align="center">
              <Button variant="primary" size="medium">
                일반 상태
              </Button>
              <Button variant="primary" size="medium" loading>
                로딩 상태
              </Button>
              <Button variant="primary" size="medium" disabled>
                비활성화 상태
              </Button>
            </ButtonGroup>
          </div>

          {/* Full Width */}
          <div className="flex flex-col gap-4 items-center w-full max-w-md">
            <h2 className="text-lg font-semibold">전체 너비 (Full Width)</h2>
            <Button variant="primary" fullWidth>
              전체 너비 버튼
            </Button>
          </div>
        </div>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="https://nextjs.org/icons/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Learn
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="https://nextjs.org/icons/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Examples
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="https://nextjs.org/icons/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to nextjs.org →
        </a>
      </footer>
    </div>
  );
}
