# 한국다봄
한국 여행 플래너 웹사이트.

## 1. 제작 기간 & 참여 인원
- 2022년 08월 01일 ~ 현재 진행중
- 팀 프로젝트
  
## 2. 사용 기술
### `Back-end`
- Spring
- MySQL
### `Front-end`
- HTML
- CSS
- JavaScript(ES6)
- React

## 3. 링크

## 4. 업데이트

## 5. 사용 방법

## 6. 핵심 기능
<details>
<summary>플래너 여행 일정 생성 및 수정 기능</summary>
<div markdown="1">
플래너의 여행 날짜별 일정을 생성하고 수정하는 기능입니다.

### 6.1. api
#### 6.1.1. 일정 생성 및 수정 및 삭제
```
// 일정 생성
export const createPlan = ({ plannerId, planDate }) => {
    return client.post(`${baseUrl}/${plannerId}/plans`, { plannerId, planDate });
};

// 일정 수정
export const updatePlan = ({ type, plannerId, planId, ...queryString }) => {
    return client.patch(`${baseUrl}/${plannerId}/plans/${planId}`, { plannerId, planId, ...queryString });
};

// 일정 삭제
export const deletePlan = ({ plannerId, planId }) => {
    return client.delete(`${baseUrl}/${plannerId}/plans/${planId}`, { plannerId, planId });
};
```

#### 6.1.2. 여행지 생성 및 수정 및 삭제
```

// 여행지 생성
export const createLocation = ({ type, plannerId, planId, ...queryString }) => {
    return client.post(`${baseUrl}/${plannerId}/plans/${planId}/plan-locations`, {
        plannerId,
        planId,
        ...queryString,
    });
};

// 여행지 수정
export const updateLocation = ({ type, plannerId, locationId, planId, ...queryString }) => {
    return client.patch(`${baseUrl}/${plannerId}/plans/${planId}/plan-locations/${locationId}`, {
        plannerId,
        planId,
        locationId,
        ...queryString,
    });
};

// 여행지 삭제
export const deleteLocation = ({ plannerId, locationId, planId }) => {
    return client.delete(`${baseUrl}/${plannerId}/plans/${planId}/plan-locations/${locationId}`, {
        plannerId,
        locationId,
        planId,
    });
};

```
### 6.1.2. 슬라이드 
### 6.1.3. 
  
</div>
</details>

## 7. 기타 기능

## 8. 트러블 슈팅

## 9. 회고 & 느낀점

