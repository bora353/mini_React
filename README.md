# 미니프로젝트(DM)

## 프로젝트 기간: 2023년 10월 11일부터 2023년 11월 10일까지

## DM 요구사항

FTP 데이터 수집 및 저장:

FTP 공유 폴더에서 데이터 파일 수집
수집한 데이터를 DB에 저장
Summary 정보 생성 및 전송:

파일 수집 및 저장이 완료되면 지정된 FTP로 Summary 데이터를 CSV로 생성 후 전송
Summary 정보: 검사 Lot, Wafer 기준 정보, Chip 별 FineBin Count, RoughBin Count

## UI 요구사항

- 데이터 이력 확인:

수집된 데이터 이력을 UI에서 확인 가능

- Wafer 별 데이터 테이블:

Wafer 별 데이터를 테이블 형식으로 UI에서 확인 가능

- 이미지 확인:

수집된 이미지를 UI에서 확인 가능

## 통합시스템 요구사항

- 자동 데이터 수집 및 관리:

지정된 데이터를 자동으로 수집하고 관리

- 데이터 검색 및 UI 표시:

수집된 데이터를 검색 가능하고, 검색 결과는 UI에 표시

- 데이터 분석 UI:

1개 또는 N개의 데이터를 선택 후 분석 UI를 통해 출력

- FTP로 데이터 전송:

수집된 데이터를 지정된 FTP로 전송

- 다중 Line 데이터 조회:

1명의 작업자가 1개의 Client에서 여러 Line의 데이터에 대한 조회 및 분석 작업 가능

## 산출물

### 분석/설계:

- 요구사항관리서
- WBS (Work Breakdown Structure)
- 시스템설계
- ERD (Entity-Relationship Diagram)

### 구현:

- UI 구현
- Server 구현

### 테스트:

- Test Code 작성
