import React from 'react';
import styles from './styles.module.css';

const Pictures: React.FC = () => {
  return (
    <div className={styles.container}>
      {/* gap: 1168 x 32 */}
      <div className={styles.gap}></div>

      {/* filter: 1168 x 48 */}
      <div className={styles.filter}></div>

      {/* gap: 1168 x 42 */}
      <div className={styles.gap}></div>

      {/* main: 1168 x auto */}
      <div className={styles.main}></div>
    </div>
  );
};

export default Pictures;
