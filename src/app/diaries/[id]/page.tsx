import React from 'react';
import { DiariesDetail } from '@/components/diaries-detail';

interface DiaryDetailPageProps {
  params: {
    id: string;
  };
}

export default function DiaryDetailPage({ params }: DiaryDetailPageProps) {
  return <DiariesDetail diaryId={params.id} />;
}
