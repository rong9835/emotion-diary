# 일기 Mock 데이터 설정 가이드

페이지네이션 테스트를 위한 일기 Mock 데이터를 로컬스토리지에 저장하는 방법입니다.

## 📝 Mock 데이터 정보

- **총 개수**: 40개 (페이지당 12개씩 4페이지)
- **감정 타입**: HAPPY, SAD, ANGRY, SURPRISE, ETC (균등 배분)
- **날짜**: 최근 40일간의 일기 데이터

## 🚀 사용 방법

### 방법 1: 스크립트를 통한 코드 생성 후 브라우저에 붙여넣기

1. 터미널에서 스크립트 실행:

```bash
node scripts/create-mock-diaries.js
```

2. 출력된 코드를 복사합니다.

3. 브라우저에서 다음 단계를 따릅니다:

   - 개발 서버 실행: `npm run dev`
   - 브라우저에서 http://localhost:3000/diaries 접속
   - 개발자 도구(F12 또는 Cmd+Option+I) 열기
   - Console 탭으로 이동
   - 복사한 코드를 붙여넣고 Enter 누르기
   - 콘솔에 "✅ Mock 데이터 40개가 로컬스토리지에 저장되었습니다!" 메시지 확인

4. 페이지 새로고침 (F5 또는 Cmd+R)

### 방법 2: JSON 파일 직접 사용 (개발용)

`mock-diaries.json` 파일이 프로젝트 루트에 생성되어 있습니다.
이 파일을 파싱하여 로컬스토리지에 저장할 수 있습니다.

```javascript
// 브라우저 개발자 도구 Console에서 실행
fetch('/mock-diaries.json')
  .then((response) => response.json())
  .then((data) => {
    localStorage.setItem('diaries', JSON.stringify(data));
    console.log('✅ Mock 데이터가 저장되었습니다!');
  });
```

## 📊 데이터 구조

```typescript
interface DiaryData {
  id: number; // 1부터 시작하는 고유 ID
  title: string; // 일기 제목
  content: string; // 일기 내용
  emotion: EmotionType; // HAPPY | SAD | ANGRY | SURPRISE | ETC
  createdAt: string; // ISO 8601 날짜 형식
}
```

## 🔄 로컬스토리지 초기화

기존 데이터를 삭제하고 새로 시작하려면:

```javascript
// 브라우저 개발자 도구 Console에서 실행
localStorage.removeItem('diaries');
console.log('로컬스토리지가 초기화되었습니다.');
```

## 📍 저장 위치

로컬스토리지 키: `diaries`

```javascript
// 저장된 데이터 확인
const diaries = JSON.parse(localStorage.getItem('diaries') || '[]');
console.log('저장된 일기 개수:', diaries.length);
console.log('첫 번째 일기:', diaries[0]);
```

## 🧪 테스트 시나리오

페이지네이션 테스트를 위해 다음을 확인하세요:

1. **첫 페이지**: 1-12번 일기 표시
2. **두 번째 페이지**: 13-24번 일기 표시
3. **세 번째 페이지**: 25-36번 일기 표시
4. **네 번째 페이지**: 37-40번 일기 표시
5. **감정 필터**: 각 감정별로 필터링 동작 확인
6. **검색**: 일기 제목/내용으로 검색 기능 확인

## 💡 참고사항

- 데이터는 브라우저별로 독립적으로 저장됩니다.
- 다른 브라우저나 시크릿 모드에서 테스트하려면 각각 데이터를 설정해야 합니다.
- 개발 서버를 재시작해도 로컬스토리지 데이터는 유지됩니다.
- 로컬스토리지를 완전히 초기화하려면 브라우저 설정에서 사이트 데이터 삭제를 선택하세요.
