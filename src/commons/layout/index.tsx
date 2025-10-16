'use client';

import React from 'react';
import Image from 'next/image';
import styles from './styles.module.css';
import { useLinkRouting } from './hooks/index.link.routing.hook';

// ========================================
// Layout Component Types
// ========================================

interface LayoutProps {
  /**
   * 레이아웃 내부에 렌더링될 자식 컴포넌트들
   */
  children: React.ReactNode;
}

// ========================================
// Layout Component
// ========================================

export default function Layout({ children }: LayoutProps) {
  const {
    isDiariesActive,
    isPicturesActive,
    navigateToDiaries,
    navigateToPictures,
    navigateToHome,
  } = useLinkRouting();

  return (
    <div className={styles.container}>
      {/* Header 영역: 1168 * 60 */}
      <header className={styles.header}>
        <div
          className={styles.logo}
          onClick={navigateToHome}
          data-testid="header-logo"
        >
          <h1 className={styles.logoText}>민지의 다이어리</h1>
        </div>
      </header>

      {/* Gap 영역: 1168 * 24 */}
      <div className={styles.gap}></div>

      {/* Banner 영역: 1168 * 240 */}
      <section className={styles.banner}>
        <Image
          src="/images/banner.png"
          alt="배너 이미지"
          width={1168}
          height={240}
          className={styles.bannerImage}
        />
      </section>

      {/* Gap 영역: 1168 * 24 */}
      <div className={styles.gap}></div>

      {/* Navigation 영역: 1168 * 48 */}
      <nav className={styles.navigation}>
        <div className={styles.tabContainer}>
          <div
            className={`${styles.tab} ${
              isDiariesActive ? styles.activeTab : ''
            }`}
            onClick={navigateToDiaries}
            data-testid="nav-diaries"
          >
            <span className={styles.tabText}>일기보관함</span>
          </div>
          <div
            className={`${styles.tab} ${
              isPicturesActive ? styles.activeTab : ''
            }`}
            onClick={navigateToPictures}
            data-testid="nav-pictures"
          >
            <span className={styles.tabText}>사진보관함</span>
          </div>
        </div>
      </nav>

      {/* Children 영역: 1168 * auto */}
      <main className={styles.children}>{children}</main>

      {/* Footer 영역: 1168 * 160 */}
      <footer className={styles.footer}>
        <div className={styles.footerContent}>
          <h2 className={styles.footerTitle}>민지의 다이어리</h2>
          <div className={styles.footerInfo}>
            <p className={styles.footerRepresentative}>대표 : 민지</p>
            <p className={styles.footerCopyright}>
              Copyright © 2024. 민지 Co., Ltd.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
