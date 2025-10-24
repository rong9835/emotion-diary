import React from 'react';
import { DiariesDetail } from '@/components/diaries-detail';

interface DiaryDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function DiaryDetailPage({
  params,
}: DiaryDetailPageProps) {
  const { id } = await params;
  return <DiariesDetail diaryId={id} />;
}
