/**
 * 일기 Mock 데이터 생성 스크립트
 * 페이지네이션 테스트를 위해 40개의 일기 데이터를 생성합니다.
 */

const EmotionType = {
  HAPPY: 'HAPPY',
  SAD: 'SAD',
  ANGRY: 'ANGRY',
  SURPRISE: 'SURPRISE',
  ETC: 'ETC',
};

const emotions = [
  EmotionType.HAPPY,
  EmotionType.SAD,
  EmotionType.ANGRY,
  EmotionType.SURPRISE,
  EmotionType.ETC,
];

const titles = [
  '오늘의 일상',
  '주말 산책',
  '맛있는 점심',
  '친구와의 만남',
  '퇴근 후 행복',
  '비 오는 날',
  '평범한 하루',
  '프로젝트 완료',
  '여행 계획',
  '새로운 시작',
  '감사한 하루',
  '운동한 날',
  '영화 관람',
  '책 읽기',
  '음악 감상',
  '요리 실험',
  '향기로운 커피',
  '따뜻한 차',
  '새로운 발견',
  '반가운 소식',
  '성공의 기쁨',
  '미래를 생각하며',
  '추억 만들기',
  '평화로운 순간',
  '느긋한 오후',
  '끝나지 않은 이야기',
  '작은 기쁨',
  '은은한 미소',
  '따듯한 햇살',
  '차분한 밤',
  '아침산책',
  '점심식사',
  '저녁식사',
  '주말여행',
  '평일상하',
  '휴일사용',
  '친구만남',
  '가족모임',
  '영화보기',
  '독서시간',
];

const contents = [
  '오늘은 정말 평범한 하루였어. 하지만 소중한 순간들이 가득했어.',
  '언덕 위에서 내려다본 풍경이 너무 아름다웠다.',
  '새로운 레스토랑에서 먹은 파스타가 정말 맛있었어.',
  '오랜만에 만난 친구와 수다를 나누며 시간 가는 줄 몰랐어.',
  '퇴근 후 집에 와서 편안하게 쉬는 게 최고야.',
  '비 오는 날 창밖을 보니 마음이 차분해졌어.',
  '별거 아닌 것 같지만 의미있는 하루였다.',
  '힘들었던 프로젝트를 드디어 끝냈다! 뿌듯해.',
  '이번 여름 휴가 계획을 세우고 설레고 있어.',
  '새로운 시작을 위해 오늘도 열심히 살고 있어.',
  '주변 사람들에게 고마움이 느껴지는 날이었어.',
  '운동을 하고 나서 몸과 마음이 가벼워진 것 같아.',
  '최근 개봉한 영화를 보고 감동받았어.',
  '책을 읽으며 여행을 떠나는 기분이 들었어.',
  '좋아하는 음악을 들으며 휴식을 취했어.',
  '처음 만들어 본 요리가 의외로 잘됐어!',
  '커피 한 잔으로 하루가 시작되는 게 좋아.',
  '따뜻한 차를 마시며 마음이 따뜻해졌어.',
  '오늘 새로운 사실을 알게 되어 신기했어.',
  '기다리던 소식이 와서 기쁘다.',
  '작은 성공이지만 큰 기쁨이었어.',
  '내일을 위해 오늘도 조금씩 나아가고 있어.',
  '예쁜 사진을 찍어서 추억을 남겼어.',
  '조용한 시간이 주는 평화로움이 좋아.',
  '느긋하게 쉬며 여유를 즐겼어.',
  '끝나지 않은 이야기처럼 계속 이어지길.',
  '작은 기쁨들로 하루를 채워 나가고 있어.',
  '은은하게 드는 미소가 좋아.',
  '따뜻한 햇살 아래서 마음이 편안해졌어.',
  '차분한 밤하늘을 보며 생각에 잠겼어.',
  '아침에 일찍 일어나 산책을 했다. 상쾌한 느낌이었다.',
  '점심으로 먹은 라면이 유난히 맛있었다.',
  '저녁에 가족들과 함께 시간을 보냈다.',
  '주말에 근처로 여행을 다녀왔다.',
  '평일이지만 여유로웠던 하루였다.',
  '휴일을 제대로 활용해서 만족스러웠다.',
  '친구와 오랜만에 만나서 반가웠다.',
  '가족 모임에서 웃음이 끊이지 않았다.',
  '새로 개봉한 영화를 보고 왔다.',
  '아침 책읽기 시간이 제일 좋아.',
];

// Mock 데이터 생성
function createMockDiaries(count = 40) {
  const diaries = [];
  const today = new Date();

  for (let i = 0; i < count; i++) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);

    diaries.push({
      id: i + 1,
      title: titles[i % titles.length],
      content: contents[i % contents.length],
      emotion: emotions[i % emotions.length],
      createdAt: date.toISOString(),
    });
  }

  return diaries;
}

// 브라우저 환경에서 실행할 코드 생성
function generateBrowserCode() {
  const diaries = createMockDiaries();
  const code = `
// 로컬스토리지에 Mock 데이터 저장
const mockDiaries = ${JSON.stringify(diaries, null, 2)};
localStorage.setItem('diaries', JSON.stringify(mockDiaries));
console.log('✅ Mock 데이터 ${
    diaries.length
  }개가 로컬스토리지에 저장되었습니다!');
console.log('첫 번째 일기:', mockDiaries[0]);
  `.trim();

  console.log(code);
  console.log('\n📝 사용 방법:');
  console.log('1. 브라우저 개발자 도구(F12)를 엽니다.');
  console.log('2. Console 탭으로 이동합니다.');
  console.log('3. 위의 코드를 복사해서 붙여넣고 Enter를 누릅니다.');
  console.log('4. 일기 목록 페이지를 새로고침합니다.');
}

// Node.js 환경에서 실행
if (typeof window === 'undefined') {
  // 브라우저에서 실행할 코드 생성
  generateBrowserCode();

  // 추가로 JSON 파일로도 저장
  const fs = require('fs');
  const diaries = createMockDiaries();
  fs.writeFileSync(
    'mock-diaries.json',
    JSON.stringify(diaries, null, 2),
    'utf8'
  );
  console.log('\n📄 mock-diaries.json 파일이 생성되었습니다!');
}

module.exports = { createMockDiaries, generateBrowserCode };
