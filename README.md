## deco-me

친구가 생각하는 나를 캐릭터로 만들어주는 참여형 웹 서비스

---

## 📌 프로젝트 소개

**deco-me**는 사용자가 자신의 캐릭터를 직접 꾸민 뒤,
공유한 링크를 통해 친구들이  
**“친구가 생각하는 나”**를 캐릭터로 만들어주는 참여형 캐릭터 꾸미기 웹 서비스입니다.

별도의 앱 설치 없이 웹에서 바로 참여 가능하며,  
카카오톡 공유를 통해 자연스럽게 친구 참여를 유도하는 것을 목표로 합니다.

---

## ✨ 주요 기능

### 1. 캐릭터 꾸미기 (공통 Editor)

- 얼굴, 머리, 눈, 입 등 파츠 기반 캐릭터 커스터마이징
- 상태 변경 시 즉시 미리보기 반영
- 하나의 `CharacterEditor` 컴포넌트로 모드 분기 처리
  - `self` : 내가 나를 꾸미는 모드
  - `friend` : 친구가 나를 꾸미는 모드
  - `readonly` : 결과 확인 전용 모드

---

### 2. 캐릭터 저장 (Serverless)

- Supabase PostgreSQL 기반 캐릭터 데이터 저장
- 캐릭터 파츠 상태를 JSON 형태로 관리
- Row Level Security(RLS) 설정을 통한 접근 제어

---

### 3. 친구 초대 & 공유

- 캐릭터 생성 시 고유 초대 링크 생성
- 링크를 통해 로그인 없이 참여 가능
- (추후) 카카오톡 공유 연동 예정

---

### 4. 친구 응답 캐릭터 생성

- 초대 링크(`/invite/[id]`)를 통해 접속
- 기존 캐릭터를 기반으로 새로운 캐릭터 생성
- `owner_id`는 동일, `created_by`로 응답자 구분
- “친구들이 꾸며준 나” 데이터로 저장

---

### 5. 결과 페이지

- 내가 만든 캐릭터 + 친구들이 만들어준 캐릭터 목록 표시
- 카드 형태 UI로 여러 응답을 한 화면에서 확인
- `/result/[id]` 라우트에서 조회

---

## 🛠 기술 스택

### Frontend

- Next.js (App Router)
- React
- Tailwind CSS
- Zustand (Client State 관리)
- Canvas (추후 캐릭터 렌더링 예정)

### Backend (Serverless)

- Supabase
  - Database (PostgreSQL)
  - Auth (추후 Kakao OAuth 연동 예정)
  - Storage (추후 이미지 저장)

---

## 🧠 상태 관리 전략

- **Client State**
  - 캐릭터 편집 중 파츠 상태 → Zustand
- **Server State**
  - DB에서 불러오는 캐릭터 목록 → `useState + useEffect`
  - (추후 React Query 도입 가능)

---

## 🧱 데이터 구조 (현재 기준)

```sql
create table characters (
  id uuid primary key default gen_random_uuid(),
  owner_id text not null,
  created_by text not null,
  is_self boolean default false,
  parts jsonb not null,
  created_at timestamp with time zone default now()
);

---

## 🎯 프로젝트 목표

- 프론트엔드 개발자로서 서버리스 환경에서의 서비스 설계 경험
- Client State / Server State 분리 설계 이해
- 공유 기반 UX 및 사용자 참여 플로우 구현

## 🚀 Getting Started
npm install
npm run dev
```
