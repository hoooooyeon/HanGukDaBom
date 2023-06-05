import { useState } from 'react';
import { useEffect } from 'react';
import styled from 'styled-components';

const HomeSpotListBlock = styled.div`
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  background-color: white;
`;

const Container = styled.div`
  width: 100%;
  height: 100%;
  margin: 0;
  padding-top: 3rem;
  padding-bottom: 8rem;
  /* @media all and (min-width: 768px) {
    width: calc(100% - 40px);
    padding: 0 20px;
  }
  @media all and (min-width: 960px) {
    width: 930px;
    padding: 0;
  }
  @media all and (min-width: 1280px) {
    width: 1024px;
  } */
`;
const Header = styled.div`
  text-align: center;
  margin-bottom: 3rem;
  h3 {
    margin: 0;
  }
`;

const SpotList = styled.ul`
  list-style-type: none;
  height: 100%;
  margin: 0 auto;
  display: inline-block;
  width: 100%;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  @media all and (min-width: 1025px) {
  }
`;

const SpotItem = styled.li`
  width: 100%;
  position: relative;
  &:hover {
    cursor: pointer;
  }
`;

const ImgOveray = styled.div`
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.6);
  position: absolute;
  top: 0;
  left: 0;
  pointer-events: none;
  p {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-weight: bold;
    font-size: 0.8rem;
    /* color: white; */
  }
`;
const Img = styled.img`
  width: 100%;
  height: 100%;
  border: none;
  margin: auto;
  display: block;
  /* @media all and (min-width: 960px) {
    height: 200px;
  }
  @media all and (min-width: 1280px) {
    height: 250px;
  } */
`;

const HomeSpotList = () => {
  const spotArr = [
    {
      title: '강남',
      areaCode: 1,
      contenttypeid: 12,
      contentid: 264570,
      firstimage: 'http://tong.visitkorea.or.kr/cms/resource/08/1984608_image2_1.jpg',
    },
    {
      title: '경복궁',
      areaCode: 1,
      contenttypeid: 12,
      contentid: 126508,
      firstimage: 'http://tong.visitkorea.or.kr/cms/resource/23/2678623_image2_1.jpg',
    },
    {
      title: '관악산',
      areaCode: 1,
      contenttypeid: 12,
      contentid: 126480,
      firstimage: 'http://tong.visitkorea.or.kr/cms/resource/30/1857230_image2_1.jpg',
    },
    {
      title: '광주천 벚꽃길',
      areaCode: 5,
      contenttypeid: 12,
      contentid: 2774295,
      firstimage: 'http://tong.visitkorea.or.kr/cms/resource/99/2793199_image2_1.jpg',
    },
    {
      title: '월봉서원',
      areaCode: 5,
      contenttypeid: 12,
      contentid: 1955610,
      firstimage: 'http://tong.visitkorea.or.kr/cms/resource/87/2675687_image2_1.jpg',
    },
    {
      title: '대왕암공원',
      areaCode: 7,
      contenttypeid: 12,
      contentid: 127515,
      firstimage: 'http://tong.visitkorea.or.kr/cms/resource/75/2712575_image2_1.jpg',
    },
    {
      title: '슬도등대',
      areaCode: 7,
      contenttypeid: 12,
      contentid: 2752131,
      firstimage: 'http://tong.visitkorea.or.kr/cms/resource/76/2752176_image2_1.png',
    },
    {
      title: '강시뽕 자연휴양림',
      areaCode: 31,
      contenttypeid: 12,
      contentid: 2774103,
      firstimage: 'http://tong.visitkorea.or.kr/cms/resource/28/2774128_image2_1.jpg',
    },
    {
      title: '거북섬',
      areaCode: 31,
      contenttypeid: 12,
      contentid: 2781820,
      firstimage: 'http://tong.visitkorea.or.kr/cms/resource/50/2782050_image2_1.jpg',
    },
    {
      title: '강릉 경포해수욕장',
      areaCode: 31,
      contenttypeid: 12,
      contentid: 128758,
      firstimage: 'http://tong.visitkorea.or.kr/cms/resource/22/2671422_image2_1.jpg',
    },
    {
      title: '거문오름',
      areaCode: 39,
      contenttypeid: 12,
      contentid: 636266,
      firstimage: 'http://tong.visitkorea.or.kr/cms/resource/62/2661662_image2_1.jpg',
    },
    {
      title: '고산일과 해안도로',
      areaCode: 39,
      contenttypeid: 12,
      contentid: 2779522,
      firstimage: 'http://tong.visitkorea.or.kr/cms/resource/47/2800647_image2_1.jpg',
    },
    {
      title: '김녕사굴',
      areaCode: 39,
      contenttypeid: 12,
      contentid: 126453,
      firstimage: 'http://tong.visitkorea.or.kr/cms/resource/37/1618237_image2_1.jpg',
    },
    {
      title: '마라도등대',
      areaCode: 39,
      contenttypeid: 12,
      contentid: 129145,
      firstimage: 'http://tong.visitkorea.or.kr/cms/resource/15/2617815_image2_1.jpg',
    },
    {
      title: '한라산',
      areaCode: 39,
      contenttypeid: 12,
      contentid: 127635,
      firstimage: 'http://tong.visitkorea.or.kr/cms/resource/99/2870099_image2_1.jpg',
    },
  ];

  const [isOveray, setIsOveray] = useState();
  const onUpdateOveray = (index) => {
    setIsOveray(index);
  };

  return (
    <HomeSpotListBlock>
      <Container>
        <Header>
          <h3>여행지 리스트</h3>
        </Header>
        <SpotList>
          {spotArr &&
            spotArr.map((s, i) => (
              <SpotItem onMouseEnter={() => onUpdateOveray(i)} onMouseLeave={() => onUpdateOveray(null)}>
                <Img alt={s.title} src={s.firstimage} />
                {isOveray === i && (
                  <ImgOveray>
                    <p>{s.title}</p>
                  </ImgOveray>
                )}
              </SpotItem>
            ))}
        </SpotList>
      </Container>
    </HomeSpotListBlock>
  );
};

export default HomeSpotList;
