'use client';

import React from 'react';
import { DiariesNew, DiaryData } from '@/components/diaries-new';

// ========================================
// Temp Page Component
// ========================================

export default function TempPage() {
  // ========================================
  // Event Handlers
  // ========================================

  const handleSave = (data: DiaryData) => {
    console.log('일기 저장:', data);
    alert(
      `일기가 저장되었습니다!\n감정: ${data.emotion}\n제목: ${data.title}\n내용: ${data.content}`
    );
  };

  const handleCancel = () => {
    console.log('일기 작성 취소');
    alert('일기 작성이 취소되었습니다.');
  };

  // ========================================
  // Render
  // ========================================

  return (
    <div
      style={{
        padding: '40px',
        minHeight: '100vh',
        backgroundColor: '#f9fafb',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <DiariesNew theme="light" onSave={handleSave} onCancel={handleCancel} />
    </div>
  );
}
