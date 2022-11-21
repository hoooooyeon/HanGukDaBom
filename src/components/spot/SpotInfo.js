import styled from 'styled-components';

const SpotInfoBlock = styled.div`
  margin: auto;
  width: 90%;
  height: auto;
  display: flex;
  justify-content: space-around;
`;

const SpotImg = styled.div`
  width: 500px;
  height: 500px;
`;

const SpotTitle = styled.div`
  width: 500px;
  height: 50px;
  text-align: center;
  font-size: 1.5rem;
  margin-top: 10px;
`;
const SpotDetail = styled.div`
  width: 500px;
  height: auto;
`;

const SpotInfo = () => {
  return (
    <SpotInfoBlock>
      <SpotImg />
      <div>
        <SpotTitle>천안 언덕</SpotTitle>
        <SpotDetail>
          ㄴㅇㄻㄴㅇㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁ
        </SpotDetail>
      </div>
    </SpotInfoBlock>
  );
};

export default SpotInfo;
