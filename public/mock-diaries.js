/**
 * 일기 Mock 데이터 자동 로드 스크립트
 * 브라우저에서 바로 실행 가능한 버전
 *
 * 사용법:
 * 1. 브라우저 개발자 도구(F12) 열기
 * 2. Console 탭에서 이 파일의 내용을 복사해서 붙여넣기
 * 3. Enter 누르기
 */

(function loadMockDiaries() {
  const mockDiaries = [
    {
      id: 1,
      title: '오늘의 일상',
      content: '오늘은 정말 평범한 하루였어. 하지만 소중한 순간들이 가득했어.',
      emotion: 'HAPPY',
      createdAt: '2025-10-27T02:12:56.406Z',
    },
    {
      id: 2,
      title: '주말 산책',
      content: '언덕 위에서 내려다본 풍경이 너무 아름다웠다.',
      emotion: 'SAD',
      createdAt: '2025-10-26T02:12:56.406Z',
    },
    {
      id: 3,
      title: '맛있는 점심',
      content: '새로운 레스토랑에서 먹은 파스타가 정말 맛있었어.',
      emotion: 'ANGRY',
      createdAt: '2025-10-25T02:12:56.406Z',
    },
    {
      id: 4,
      title: '친구와의 만남',
      content: '오랜만에 만난 친구와 수다를 나누며 시간 가는 줄 몰랐어.',
      emotion: 'SURPRISE',
      createdAt: '2025-10-24T02:12:56.406Z',
    },
    {
      id: 5,
      title: '퇴근 후 행복',
      content: '퇴근 후 집에 와서 편안하게 쉬는 게 최고야.',
      emotion: 'ETC',
      createdAt: '2025-10-23T02:12:56.406Z',
    },
    {
      id: 6,
      title: '비 오는 날',
      content: '비 오는 날 창밖을 보니 마음이 차분해졌어.',
      emotion: 'HAPPY',
      createdAt: '2025-10-22T02:12:56.406Z',
    },
    {
      id: 7,
      title: '평범한 하루',
      content: '별거 아닌 것 같지만 의미있는 하루였다.',
      emotion: 'SAD',
      createdAt: '2025-10-21T02:12:56.406Z',
    },
    {
      id: 8,
      title: '프로젝트 완료',
      content: '힘들었던 프로젝트를 드디어 끝냈다! 뿌듯해.',
      emotion: 'ANGRY',
      createdAt: '2025-10-20T02:12:56.406Z',
    },
    {
      id: 9,
      title: '여행 계획',
      content: '이번 여름 휴가 계획을 세우고 설레고 있어.',
      emotion: 'SURPRISE',
      createdAt: '2025-10-19T02:12:56.406Z',
    },
    {
      id: 10,
      title: '새로운 시작',
      content: '새로운 시작을 위해 오늘도 열심히 살고 있어.',
      emotion: 'ETC',
      createdAt: '2025-10-18T02:12:56.406Z',
    },
    {
      id: 11,
      title: '감사한 하루',
      content: '주변 사람들에게 고마움이 느껴지는 날이었어.',
      emotion: 'HAPPY',
      createdAt: '2025-10-17T02:12:56.406Z',
    },
    {
      id: 12,
      title: '운동한 날',
      content: '운동을 하고 나서 몸과 마음이 가벼워진 것 같아.',
      emotion: 'SAD',
      createdAt: '2025-10-16T02:12:56.406Z',
    },
    {
      id: 13,
      title: '영화 관람',
      content: '최근 개봉한 영화를 보고 감동받았어.',
      emotion: 'ANGRY',
      createdAt: '2025-10-15T02:12:56.406Z',
    },
    {
      id: 14,
      title: '책 읽기',
      content: '책을 읽으며 여행을 떠나는 기분이 들었어.',
      emotion: 'SURPRISE',
      createdAt: '2025-10-14T02:12:56.406Z',
    },
    {
      id: 15,
      title: '음악 감상',
      content: '좋아하는 음악을 들으며 휴식을 취했어.',
      emotion: 'ETC',
      createdAt: '2025-10-13T02:12:56.406Z',
    },
    {
      id: 16,
      title: '요리 실험',
      content: '처음 만들어 본 요리가 의외로 잘됐어!',
      emotion: 'HAPPY',
      createdAt: '2025-10-12T02:12:56.406Z',
    },
    {
      id: 17,
      title: '향기로운 커피',
      content: '커피 한 잔으로 하루가 시작되는 게 좋아.',
      emotion: 'SAD',
      createdAt: '2025-10-11T02:12:56.406Z',
    },
    {
      id: 18,
      title: '따뜻한 차',
      content: '따뜻한 차를 마시며 마음이 따뜻해졌어.',
      emotion: 'ANGRY',
      createdAt: '2025-10-10T02:12:56.406Z',
    },
    {
      id: 19,
      title: '새로운 발견',
      content: '오늘 새로운 사실을 알게 되어 신기했어.',
      emotion: 'SURPRISE',
      createdAt: '2025-10-09T02:12:56.406Z',
    },
    {
      id: 20,
      title: '반가운 소식',
      content: '기다리던 소식이 와서 기쁘다.',
      emotion: 'ETC',
      createdAt: '2025-10-08T02:12:56.406Z',
    },
    {
      id: 21,
      title: '성공의 기쁨',
      content: '작은 성공이지만 큰 기쁨이었어.',
      emotion: 'HAPPY',
      createdAt: '2025-10-07T02:12:56.406Z',
    },
    {
      id: 22,
      title: '미래를 생각하며',
      content: '내일을 위해 오늘도 조금씩 나아가고 있어.',
      emotion: 'SAD',
      createdAt: '2025-10-06T02:12:56.406Z',
    },
    {
      id: 23,
      title: '추억 만들기',
      content: '예쁜 사진을 찍어서 추억을 남겼어.',
      emotion: 'ANGRY',
      createdAt: '2025-10-05T02:12:56.406Z',
    },
    {
      id: 24,
      title: '평화로운 순간',
      content: '조용한 시간이 주는 평화로움이 좋아.',
      emotion: 'SURPRISE',
      createdAt: '2025-10-04T02:12:56.406Z',
    },
    {
      id: 25,
      title: '느긋한 오후',
      content: '느긋하게 쉬며 여유를 즐겼어.',
      emotion: 'ETC',
      createdAt: '2025-10-03T02:12:56.406Z',
    },
    {
      id: 26,
      title: '끝나지 않은 이야기',
      content: '끝나지 않은 이야기처럼 계속 이어지길.',
      emotion: 'HAPPY',
      createdAt: '2025-10-02T02:12:56.406Z',
    },
    {
      id: 27,
      title: '작은 기쁨',
      content: '작은 기쁨들로 하루를 채워 나가고 있어.',
      emotion: 'SAD',
      createdAt: '2025-10-01T02:12:56.406Z',
    },
    {
      id: 28,
      title: '은은한 미소',
      content: '은은하게 드는 미소가 좋아.',
      emotion: 'ANGRY',
      createdAt: '2025-09-30T02:12:56.406Z',
    },
    {
      id: 29,
      title: '따듯한 햇살',
      content: '따뜻한 햇살 아래서 마음이 편안해졌어.',
      emotion: 'SURPRISE',
      createdAt: '2025-09-29T02:12:56.406Z',
    },
    {
      id: 30,
      title: '차분한 밤',
      content: '차분한 밤하늘을 보며 생각에 잠겼어.',
      emotion: 'ETC',
      createdAt: '2025-09-28T02:12:56.406Z',
    },
    {
      id: 31,
      title: '아침산책',
      content: '아침에 일찍 일어나 산책을 했다. 상쾌한 느낌이었다.',
      emotion: 'HAPPY',
      createdAt: '2025-09-27T02:12:56.406Z',
    },
    {
      id: 32,
      title: '점심식사',
      content: '점심으로 먹은 라면이 유난히 맛있었다.',
      emotion: 'SAD',
      createdAt: '2025-09-26T02:12:56.406Z',
    },
    {
      id: 33,
      title: '저녁식사',
      content: '저녁에 가족들과 함께 시간을 보냈다.',
      emotion: 'ANGRY',
      createdAt: '2025-09-25T02:12:56.406Z',
    },
    {
      id: 34,
      title: '주말여행',
      content: '주말에 근처로 여행을 다녀왔다.',
      emotion: 'SURPRISE',
      createdAt: '2025-09-24T02:12:56.406Z',
    },
    {
      id: 35,
      title: '평일상하',
      content: '평일이지만 여유로웠던 하루였다.',
      emotion: 'ETC',
      createdAt: '2025-09-23T02:12:56.406Z',
    },
    {
      id: 36,
      title: '휴일사용',
      content: '휴일을 제대로 활용해서 만족스러웠다.',
      emotion: 'HAPPY',
      createdAt: '2025-09-22T02:12:56.406Z',
    },
    {
      id: 37,
      title: '친구만남',
      content: '친구와 오랜만에 만나서 반가웠다.',
      emotion: 'SAD',
      createdAt: '2025-09-21T02:12:56.406Z',
    },
    {
      id: 38,
      title: '가족모임',
      content: '가족 모임에서 웃음이 끊이지 않았다.',
      emotion: 'ANGRY',
      createdAt: '2025-09-20T02:12:56.406Z',
    },
    {
      id: 39,
      title: '영화보기',
      content: '새로 개봉한 영화를 보고 왔다.',
      emotion: 'SURPRISE',
      createdAt: '2025-09-19T02:12:56.406Z',
    },
    {
      id: 40,
      title: '독서시간',
      content: '아침 책읽기 시간이 제일 좋아.',
      emotion: 'ETC',
      createdAt: '2025-09-18T02:12:56.406Z',
    },
  ];

  // 로컬스토리지에 저장
  localStorage.setItem('diaries', JSON.stringify(mockDiaries));

  // 결과 출력
  console.log('✅ Mock 데이터 40개가 로컬스토리지에 저장되었습니다!');
  console.log('📝 저장된 일기 정보:');
  console.log('  - 총 개수:', mockDiaries.length);
  console.log('  - 첫 번째 일기:', mockDiaries[0]);
  console.log('  - 마지막 일기:', mockDiaries[mockDiaries.length - 1]);
  console.log('🔄 페이지를 새로고침하세요!');

  return mockDiaries;
})();
