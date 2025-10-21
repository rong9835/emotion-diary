'use client';

import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  ReactNode,
} from 'react';
import { createPortal } from 'react-dom';

import styles from './styles.module.css';

// ========================================
// Types & Interfaces
// ========================================

interface ModalOptions {
  closeOnBackdropClick?: boolean;
  closeOnEscape?: boolean;
  showCloseButton?: boolean;
  className?: string;
}

interface ModalItem {
  id: string;
  content: ReactNode;
  options: ModalOptions;
}

interface ModalContextType {
  modals: ModalItem[];
  openModal: (content: ReactNode, options?: ModalOptions) => string;
  closeModal: (id?: string) => void;
  closeAllModals: () => void;
}

// ========================================
// Constants
// ========================================

const defaultOptions: ModalOptions = {
  closeOnBackdropClick: true,
  closeOnEscape: true,
  showCloseButton: true,
  className: '',
};

// ========================================
// Context
// ========================================

const ModalContext = createContext<ModalContextType | undefined>(undefined);

// ========================================
// Hooks
// ========================================

export const useModal = (): ModalContextType => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return context;
};

// ========================================
// Components
// ========================================

interface ModalProviderProps {
  children: ReactNode;
}

export const ModalProvider: React.FC<ModalProviderProps> = ({ children }) => {
  const [modals, setModals] = useState<ModalItem[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const openModal = useCallback(
    (modalContent: ReactNode, modalOptions?: ModalOptions): string => {
      const id = Math.random().toString(36).substring(2, 11);
      const newModal: ModalItem = {
        id,
        content: modalContent,
        options: { ...defaultOptions, ...modalOptions },
      };

      setModals((prev) => [...prev, newModal]);
      return id;
    },
    []
  );

  const closeModal = useCallback((id?: string): void => {
    if (id) {
      setModals((prev) => prev.filter((modal) => modal.id !== id));
    } else {
      // id가 없으면 가장 최근 모달 닫기
      setModals((prev) => prev.slice(0, -1));
    }
  }, []);

  const closeAllModals = useCallback((): void => {
    setModals([]);
  }, []);

  // ========================================
  // Effects
  // ========================================

  // ESC 키로 가장 최근 모달 닫기
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent): void => {
      if (event.key === 'Escape' && modals.length > 0) {
        const topModal = modals[modals.length - 1];
        if (topModal.options.closeOnEscape) {
          closeModal();
        }
      }
    };

    if (modals.length > 0) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [modals, closeModal]);

  // body 스크롤 제거
  useEffect(() => {
    if (modals.length > 0) {
      const scrollbarWidth =
        window.innerWidth - document.documentElement.clientWidth;
      const originalOverflow = document.body.style.overflow;
      const originalPaddingRight = document.body.style.paddingRight;

      document.body.style.overflow = 'hidden';
      document.body.style.paddingRight = `${scrollbarWidth}px`;

      return () => {
        document.body.style.overflow = originalOverflow;
        document.body.style.paddingRight = originalPaddingRight;
      };
    }
  }, [modals.length]);

  const contextValue: ModalContextType = {
    modals,
    openModal,
    closeModal,
    closeAllModals,
  };

  return (
    <ModalContext.Provider value={contextValue}>
      {children}
      {mounted && <ModalStack />}
    </ModalContext.Provider>
  );
};

const ModalStack: React.FC = (): JSX.Element | null => {
  const { modals, closeModal } = useModal();

  if (modals.length === 0) {
    return null;
  }

  return (
    <>
      {modals.map((modal, index) => (
        <ModalPortal
          key={modal.id}
          modal={modal}
          index={index}
          onClose={() => closeModal(modal.id)}
        />
      ))}
    </>
  );
};

interface ModalPortalProps {
  modal: ModalItem;
  index: number;
  onClose: () => void;
}

const ModalPortal: React.FC<ModalPortalProps> = ({
  modal,
  index,
  onClose,
}): JSX.Element => {
  const handleBackdropClick = (event: React.MouseEvent): void => {
    if (
      event.target === event.currentTarget &&
      modal.options.closeOnBackdropClick
    ) {
      onClose();
    }
  };

  // 포커스 트랩을 위한 ref
  const modalRef = React.useRef<HTMLDivElement>(null);

  // 모달이 열릴 때 첫 번째 포커스 가능한 요소에 포커스
  React.useEffect(() => {
    if (modalRef.current) {
      const focusableElements = modalRef.current.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      const firstFocusable = focusableElements[0] as HTMLElement;
      if (firstFocusable) {
        firstFocusable.focus();
      }
    }
  }, []);

  // Modal 컴포넌트인지 확인 (displayName으로 판단)
  // forwardRef로 감싸진 컴포넌트는 type이 object이므로 둘 다 허용
  const isModalComponent =
    React.isValidElement(modal.content) &&
    modal.content.type &&
    (typeof modal.content.type === 'function' || typeof modal.content.type === 'object') &&
    (modal.content.type as { displayName?: string }).displayName === 'Modal';

  const modalElement = isModalComponent ? (
    // Modal 컴포넌트인 경우: backdrop만 렌더링
    <div
      ref={modalRef}
      className={styles.modalBackdrop}
      style={{ zIndex: 1000 + index }}
      onClick={handleBackdropClick}
    >
      {modal.content}
    </div>
  ) : (
    // 일반 콘텐츠인 경우: 기존 방식 사용
    <div
      ref={modalRef}
      className={styles.modalBackdrop}
      style={{ zIndex: 1000 + index }}
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
    >
      <div
        className={`${styles.modalContent} ${modal.options.className || ''}`}
        onClick={(e) => e.stopPropagation()}
      >
        {modal.options.showCloseButton && (
          <button
            onClick={onClose}
            className={styles.closeButton}
            aria-label="모달 닫기"
            type="button"
          >
            ×
          </button>
        )}
        {modal.content}
      </div>
    </div>
  );

  return createPortal(modalElement, document.body);
};

export default ModalProvider;
