import styled from 'styled-components';
import SpotItem from '../../spot/SpotItem';

const Spots = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
`;

const LikeSpots = () => {
  return (
    <>
      <h2>여행지</h2>
      <hr />
      <Spots>
        <SpotItem />
        <SpotItem />
      </Spots>
    </>
  );
};

export default LikeSpots;
