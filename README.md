### 목적

이전(라이브러리없이 드래그앤드롭 구현)

- https://github.com/ivanselah/type-motion

현재(라이브러리사용 후 드래그앤드롭 구현)

- 라이브러리 사용 후 좋은점 확인해보기
- Redux말고 Recoil상태관리 라이브러리 사용해보기
- 새로운 라이브러리의 문서를 읽고 적용해보기

### 프론트엔드

- `React`
- `Typescript`
- `Recoil`
- `Styled Components`
- `React Beautiful DnD`
- `React Hook Form`

### Deploy

- `GitHub`
  - https://ivanselah.github.io/real-trello/

### Project

> 1. 메인 색상 지정

- 색상을 선택하고 반영할 수 있습니다.
  ![color](https://user-images.githubusercontent.com/78192018/166191387-7141caa4-0aca-4671-8a86-8f8ef3865cdd.gif)

  > 2. 보드 추가 및 수정, 삭제

- 새로운 보드를 추가하고, 수정 및 삭제할 수 있습니다.
- 보드 내에서 작성한 일을 드래그-앤-드롭을 통해 다른 보드로 이동시킬 수 있습니다.
  ![board](https://user-images.githubusercontent.com/78192018/166191175-f209bb77-ebd4-423b-84eb-dd945ca31f30.gif)

  > 3. 할 일(카드) 추가 및 수정

- Recoil의 atom를 이용해 상태를 저장하고 관리합니다.
- 새로운 할 일을 추가하고 수정할 수 있습니다.
- React-hook-form을 이용해 form의 유효성을 검사합니다.
  ![card](https://user-images.githubusercontent.com/78192018/166191608-e25b76de-b179-4c3c-93dc-00fcdd43c78d.gif)

  > 4. 할 일(카드)을 드래그 앤 드롭, 삭제

- React-beautiful DnD를 이용해 드래그-앤-드롭을 구현했습니다.
- 드래그-앤-드롭을 이용해 작성한 일을 삭제할 수있으며 다른 보드로 이동할 수 있습니다.
  ![dragand](https://user-images.githubusercontent.com/78192018/166192678-78376623-398f-43cf-930e-cceca44652d0.gif)

###
