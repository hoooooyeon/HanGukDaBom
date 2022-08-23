import styled from 'styled-components';

const ReviewItemBlock = styled.div`
  width: 280px;
  height: 320px;
  margin: 10px;
  text-align: center;
  h3 {
    margin: 10px;
  }
`;

const SimpleImg = styled.div`
  width: 280px;
  height: 270px;
`;

const ReviewItem = () => {
  return (
    <ReviewItemBlock>
      <SimpleImg />
      <h3>천안문 갔다온 일</h3>
    </ReviewItemBlock>
  );
};

export default ReviewItem;
