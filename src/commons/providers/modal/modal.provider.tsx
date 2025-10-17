'use client';

import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  ReactNode,
} from 'react';
import { createPortal } from 'react-dom';

interface ModalContextType {
  isOpen: boolean;
  openModal: (content: ReactNode, options?: ModalOptions) => void;
  closeModal: () => void;
  content: ReactNode;
  options: ModalOptions;
}

interface ModalOptions {
  closeOnBackdropClick?: boolean;
  closeOnEscape?: boolean;
  showCloseButton?: boolean;
  className?: string;
}

const defaultOptions: ModalOptions = {
  closeOnBackdropClick: true,
  closeOnEscape: true,
  showCloseButton: true,
  className: '',
};

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return context;
};

interface ModalProviderProps {
  children: ReactNode;
}

export const ModalProvider: React.FC<ModalProviderProps> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [content, setContent] = useState<ReactNode>(null);
  const [options, setOptions] = useState<ModalOptions>(defaultOptions);

  const openModal = useCallback(
    (modalContent: ReactNode, modalOptions?: ModalOptions) => {
      setContent(modalContent);
      setOptions({ ...defaultOptions, ...modalOptions });
      setIsOpen(true);
    },
    []
  );

  const closeModal = useCallback(() => {
    setIsOpen(false);
    setContent(null);
    setOptions(defaultOptions);
  }, []);

  // ESC 키로 모달 닫기
  React.useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen && options.closeOnEscape) {
        closeModal();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);

      // 스크롤바 너비 계산하여 페이지 움직임 방지
      const scrollbarWidth =
        window.innerWidth - document.documentElement.clientWidth;
      document.body.style.overflow = 'hidden';
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
      document.body.style.paddingRight = 'unset';
    };
  }, [isOpen, options.closeOnEscape, closeModal]);

  const contextValue: ModalContextType = {
    isOpen,
    openModal,
    closeModal,
    content,
    options,
  };

  return (
    <ModalContext.Provider value={contextValue}>
      {children}
      <ModalPortal />
    </ModalContext.Provider>
  );
};

const ModalPortal: React.FC = () => {
  const { isOpen, closeModal, content, options } = useModal();
  const [mounted, setMounted] = useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || !isOpen) {
    return null;
  }

  const handleBackdropClick = (event: React.MouseEvent) => {
    if (event.target === event.currentTarget && options.closeOnBackdropClick) {
      closeModal();
    }
  };

  const modalElement = (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      onClick={handleBackdropClick}
    >
      <div
        className={`relative bg-white rounded-lg shadow-lg p-6 ${
          options.className || ''
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {options.showCloseButton && (
          <button
            onClick={closeModal}
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-xl font-bold"
            aria-label="Close modal"
          >
            ×
          </button>
        )}
        {content}
      </div>
    </div>
  );

  return createPortal(modalElement, document.body);
};

export default ModalProvider;
