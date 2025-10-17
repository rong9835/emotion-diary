'use client';

import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  ReactNode,
  useEffect,
} from 'react';
import { createPortal } from 'react-dom';
import styles from './styles.module.css';

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
  const [modals, setModals] = useState<ModalItem[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const openModal = useCallback(
    (modalContent: ReactNode, modalOptions?: ModalOptions): string => {
      const id = Math.random().toString(36).substr(2, 9);
      const newModal: ModalItem = {
        id,
        content: modalContent,
        options: { ...defaultOptions, ...modalOptions },
      };
      
      setModals(prev => [...prev, newModal]);
      return id;
    },
    []
  );

  const closeModal = useCallback((id?: string) => {
    if (id) {
      setModals(prev => prev.filter(modal => modal.id !== id));
    } else {
      // id가 없으면 가장 최근 모달 닫기
      setModals(prev => prev.slice(0, -1));
    }
  }, []);

  const closeAllModals = useCallback(() => {
    setModals([]);
  }, []);

  // ESC 키로 가장 최근 모달 닫기
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
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
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
      document.body.style.overflow = 'hidden';
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    } else {
      document.body.style.overflow = 'unset';
      document.body.style.paddingRight = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
      document.body.style.paddingRight = 'unset';
    };
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

const ModalStack: React.FC = () => {
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

const ModalPortal: React.FC<ModalPortalProps> = ({ modal, index, onClose }) => {
  const handleBackdropClick = (event: React.MouseEvent) => {
    if (event.target === event.currentTarget && modal.options.closeOnBackdropClick) {
      onClose();
    }
  };

  const modalElement = (
    <div
      className={styles.modalBackdrop}
      style={{ zIndex: 1000 + index }}
      onClick={handleBackdropClick}
    >
      <div
        className={`${styles.modalContent} ${modal.options.className || ''}`}
        onClick={(e) => e.stopPropagation()}
      >
        {modal.options.showCloseButton && (
          <button
            onClick={onClose}
            className={styles.closeButton}
            aria-label="Close modal"
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