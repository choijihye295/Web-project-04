# 카카오 로그인 실습 
카카오 로그인 API를 연동하여 소셜 로그인을 지원

# 주요 기능

## 소셜 로그인
- 카카오 API를 활용한 간편 로그인 지원.
- 인증 후 사용자 정보를 로컬 스토리지에 저장.

---

# 기술 스택
- **프론트엔드**: Vue.js 3
- **CSS 프레임워크**: 사용자 정의 CSS 및 미디어 쿼리
- **API 연동**: 카카오 OAuth API
- **라우팅**: Vue Router
- **상태 관리**: Vue Composition API

---

# 설치 및 실행 방법

## 1. 프로젝트 클론
```bash
git clone <프로젝트_저장소_URL>
cd <프로젝트_폴더>
```

## 2. 패키지 설치
package.json을 확인해주세요
```bash
npm install
```

## 3. 환경변수 설정
.env 파일을 프로젝트 루트에 생성하고 아래 내용을 추가합니다:
```bash
VITE_KAKAO_JS_KEY=<카카오_앱_키>
VITE_KAKAO_REDIRECT_URI=<카카오_리다이렉트_URI>
```

## 4. 개발 서버 실행
```bash
npm run dev
```

## 5. cli확인 후 없으면 설치
```bash
npm list @vue/cli-service  
npm install @vue/cli-service --save-dev  
```
