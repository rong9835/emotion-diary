import React from 'react';
import styles from './styles.module.css';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className={styles.container}>
      {/* Header 영역: 1168 * 60 */}
      <header className={styles.header}></header>

      {/* Gap 영역: 1168 * 24 */}
      <div className={styles.gap}></div>

      {/* Banner 영역: 1168 * 240 */}
      <section className={styles.banner}></section>

      {/* Gap 영역: 1168 * 24 */}
      <div className={styles.gap}></div>

      {/* Navigation 영역: 1168 * 48 */}
      <nav className={styles.navigation}></nav>

      {/* Children 영역: 1168 * auto */}
      <main className={styles.children}>{children}</main>

      {/* Footer 영역: 1168 * 160 */}
      <footer className={styles.footer}></footer>
    </div>
  );
}
