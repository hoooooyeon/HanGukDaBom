import styled from 'styled-components';
import SpotItem from './SpotItem';
import defaultImg from '../../lib/images/defaultImg.jpg';
import SpotDetailModal from './SpotDetailModal';
import { useEffect, useRef, useState } from 'react';
import Slider from '../common/Slider';
import SpotSlider from './SpotSlider';

const SpotListBlock = styled.div`
    width: 100%;
    height: 100%;
`;

const Container = styled.div`
    width: 100%;
    height: 100%;
    margin: 10px auto;
    @media all and (min-width: 768px) {
        width: calc(100% - 40px);
        padding: 0 20px;
    }
    @media all and (min-width: 960px) {
        width: 930px;
        padding: 0;
    }
    @media all and (min-width: 1280px) {
        width: 1250px;
        padding: 0;
    }
`;

const MenuTitle = styled.div`
    font-size: 1.2rem;
    font-weight: bold;
    margin-top: 20px;
`;

const AreaItem = styled.li`
    white-space: nowrap;
    width: auto;
    margin: 0 15px 5px 0;
    padding: 10px 15px;
    border-radius: 2rem;
    background: #f5f5f7;
    user-select: none;
    cursor: pointer;
    &:hover {
        background: #e6e6e6;
    }
    &[aria-current] {
        background: #cdd9ac;
        font-weight: bold;
        cursor: rever;
    }
`;

const HiddenBox = styled.div`
    margin: 20px auto;
    overflow: hidden;
    z-index: 1;
    @media all and (max-width: 768px) {
        margin-left: 15px;
    }
    @media all and (min-width: 768px) {
        width: calc(100% - 40px);
    }
    @media all and (min-width: 1025px) {
        width: 100%;
    }
`;

const List = styled.ul`
    width: 840px;
    height: 100%;
    margin: 0 auto;
    padding: 0;
    display: inline-block;
    @media all and (min-width: 768px) {
        width: 100%;
    }
`;

const ScrollBox = styled.div`
    width: calc(100% - 40px);
    height: 4px;
    margin-top: 5px;
    border-radius: 10px;
    position: absolute;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: lightgray;
    overflow: hidden;
    z-index: 1;
    opacity: 0;
    @media all and (min-width: 768px) {
        display: none;
    }
`;

const Scroll = styled.div`
    width: 50%;
    height: 100%;
    background-color: gray;
`;

const SearchBox = styled.div`
    width: 30rem;
    background: #cdd9ac;
    padding: 10px;
    height: 4rem;
    z-index: 999;
`;

const SearchForm = styled.form`
    padding: 10px 15px;
    width: 28rem;
    height: 2rem;
    display: flex;
    background-color: #cdd9ac;
    align-items: center;
    justify-content: space-around;

    /* input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
    } */
`;

const SearchInput = styled.input`
    width: 20rem;
    height: 2rem;
    border: none;
    border-radius: 10px;
    padding: 0 10px;
    &:focus {
        outline: none;
    }
`;

const SearchButton = styled.button`
    border: none;
    border-radius: 0.5rem;
    width: 5rem;
    height: 2rem;
    background-color: rgba(255, 203, 193, 80%);
    color: white;
    font-weight: bold;
    cursor: pointer;
    &:hover {
        transform: translate(1px, -1px);
    }
`;
const InvisibleInput = styled.input`
    display: none;
`;

const SpotList = ({
    areas,
    spots,
    spotError,
    detail,
    spotData,
    keyword,
    sliderSpots,
    contentTypeList,
    drag,
    onFirstSpotsPage,
    onUnloadDetailSpot,
    onToggleSpotLike,
    onOpenDetail,
    onChangeKeyword,
    onResetKeyword,
    onSearchSpot,
    onUpdateContentTypeId,
}) => {
    // 대체 이미지 넣기
    const onChangeErrorImg = (e) => {
        e.target.src = defaultImg;
    };

    // // ---------- 메뉴 슬라이더 ----------
    // const menuRef = useRef();
    // const menuBoxRef = useRef();

    // let mIsSlide = false;
    // let mStartX = 0;
    // let mCurrentX = 0;
    // const mMoveX = useRef(0);
    // const mSliderX = useRef(0);

    // const menuSliderStart = (e) => {
    //     mStartX = e.clientX;
    //     mIsSlide = true;
    //     mDrag.current = false;
    // };
    // const menuSliderMove = (e) => {
    //     if (mIsSlide) {
    //         mCurrentX = e.clientX;
    //         mMoveX.current = mSliderX.current + mCurrentX - mStartX;

    //         menuRef.current.style.transform = ' translateX(' + mMoveX.current + 'px)';
    //         menuRef.current.style.transitionDuration = '0ms';
    //         if (!mDrag.current) {
    //             mDrag.current = true;
    //         }
    //     }
    // };

    // const menuSliderEnd = () => {
    //     mSliderX.current = mMoveX.current;
    //     if (mSliderX.current > 0) {
    //         mSliderX.current = 0;
    //     } else if (mSliderX.current < menuBoxRef.current.clientWidth - menuRef.current.scrollWidth) {
    //         mSliderX.current = menuBoxRef.current.clientWidth - menuRef.current.scrollWidth;
    //     }
    //     menuRef.current.style.transform = 'translateX(' + mSliderX.current + 'px)';
    //     menuRef.current.style.transitionDuration = ' 1000ms';

    //     mIsSlide = false;
    // };

    // const menuSliderResize = () => {
    //     if (mSliderX.current > 0) {
    //         mSliderX.current = 0;
    //     } else if (mSliderX.current < menuBoxRef.current.clientWidth - menuRef.current.scrollWidth) {
    //         mSliderX.current = menuBoxRef.current.clientWidth - menuRef.current.scrollWidth;
    //     }
    //     menuRef.current.style.transform = 'translateX(' + mSliderX.current + 'px)';
    //     menuRef.current.style.transitionDuration = ' 1000ms';
    // };

    // useEffect(() => {
    //     if (areas) {
    //         let menuRefValue = menuBoxRef.current;
    //         menuRefValue.addEventListener('mousedown', menuSliderStart);
    //         window.addEventListener('mousemove', menuSliderMove);
    //         window.addEventListener('mouseup', menuSliderEnd);
    //         window.addEventListener('resize', menuSliderResize);

    //         return () => {
    //             menuRefValue.removeEventListener('mousedown', menuSliderStart);
    //             window.removeEventListener('mousemove', menuSliderMove);
    //             window.removeEventListener('mouseup', menuSliderEnd);
    //             window.removeEventListener('resize', menuSliderResize);
    //         };
    //     }
    // });

    // // ---------- 여행지 슬라이더 ----------

    // const listRef = useRef();
    // const listBoxRef = useRef();

    // let lIsSlide = false;
    // let lStartX = 0;
    // let lCurrentX = 0;
    // const lMoveX = useRef(0);
    // const lSliderX = useRef(0);

    // const TOTAL_SLIDE = 4;

    // const scrollBoxRef = useRef();
    // const scrollRef = useRef();
    // let scrollMoveX = 0;

    // const listSliderStart = (e) => {
    //     lStartX = e.clientX;
    //     lIsSlide = true;
    //     sDrag.current = false;
    // };

    // const listSliderMove = (e) => {
    //     if (lIsSlide) {
    //         lCurrentX = e.clientX;
    //         lMoveX.current = lSliderX.current + lCurrentX - lStartX;

    //         listRef.current.style.transform = 'translateX(' + lMoveX.current + 'px)';
    //         listRef.current.style.transitionDuration = '0ms';

    //         if (!sDrag.current) {
    //             sDrag.current = true;
    //         }

    //         scrollMoveX = -((lMoveX.current / -(listBoxRef.current.clientWidth - listRef.current.clientWidth)) * 100);

    //         if (scrollMoveX < 0) {
    //             scrollMoveX = 0;
    //         } else if (scrollMoveX > 100) {
    //             scrollMoveX = 100;
    //         }

    //         scrollBoxRef.current.style.opacity = 1;
    //         scrollBoxRef.current.style.transitionDuration = '400ms';
    //         scrollRef.current.style.transform = 'translateX(' + scrollMoveX + '%)';
    //         scrollRef.current.style.transitionDuration = '0ms';
    //     }
    // };

    // const listSliderEnd = () => {
    //     let itemSize = listRef.current.scrollWidth / TOTAL_SLIDE;
    //     lSliderX.current = Math.round(lMoveX.current / itemSize) * itemSize;

    //     if (lSliderX.current > 0) {
    //         lSliderX.current = 0;
    //     } else if (lSliderX.current < listBoxRef.current.clientWidth - listRef.current.clientWidth) {
    //         lSliderX.current = listBoxRef.current.clientWidth - listRef.current.clientWidth;
    //     }

    //     listRef.current.style.transform = 'translateX(' + lSliderX.current + 'px)';
    //     listRef.current.style.transitionDuration = ' 1000ms';

    //     scrollBoxRef.current.style.opacity = 0;
    //     scrollBoxRef.current.style.transitionDuration = '2000ms';
    //     lIsSlide = false;
    // };

    // const listSliderResize = () => {
    //     if (lSliderX.current > 0) {
    //         lSliderX.current = 0;
    //     } else if (lSliderX.current < listBoxRef.current.clientWidth - listRef.current.scrollWidth) {
    //         lSliderX.current = listBoxRef.current.clientWidth - listRef.current.scrollWidth;
    //     }

    //     listRef.current.style.transform = 'translateX(' + lSliderX.current + 'px)';
    //     listRef.current.style.transitionDuration = '1000ms';
    // };

    // useEffect(() => {
    //     if (spots) {
    //         let listRefValue = listRef.current;
    //         listRefValue.addEventListener('mousedown', listSliderStart);
    //         window.addEventListener('mousemove', listSliderMove);
    //         window.addEventListener('mouseup', listSliderEnd);
    //         window.addEventListener('resize', listSliderResize);

    //         return () => {
    //             listRefValue.removeEventListener('mousedown', listSliderStart);
    //             window.removeEventListener('mousemove', listSliderMove);
    //             window.removeEventListener('mouseup', listSliderEnd);
    //             window.removeEventListener('resize', listSliderResize);
    //         };
    //     }
    // });

    if (spotError) {
        alert(spotError);
    }
    const { areaIndex } = spotData;
    return (
        <SpotListBlock>
            <SpotSlider sliderSpots={sliderSpots} />
            <Container>
                <MenuTitle>추천 여행지</MenuTitle>
                <SearchBox>
                    <SearchForm>
                        <SearchInput
                            placeholder="장소 검색"
                            type="text"
                            value={keyword}
                            onChange={(e) => {
                                onChangeKeyword(e.target.value);
                            }}
                        />
                        <InvisibleInput type="text" />
                        <SearchButton type="button" onClick={onSearchSpot}>
                            검색
                        </SearchButton>
                    </SearchForm>
                </SearchBox>
                {contentTypeList && (
                    <Slider list={contentTypeList} drag={drag}>
                        {contentTypeList.map((c) => (
                            <AreaItem key={c.id} onClick={() => onUpdateContentTypeId(c.id)}>
                                {c.label}
                            </AreaItem>
                        ))}
                    </Slider>
                )}
                {areas && (
                    <Slider list={areas} drag={drag}>
                        {/* <HiddenBox ref={menuBoxRef}>
                    <Menu ref={menuRef}> */}

                        {areas.map((area) => (
                            <AreaItem key={area.code} onClick={() => onFirstSpotsPage(area.code)} aria-current={areaIndex === area.code ? 'page' : null}>
                                {area.name}
                            </AreaItem>
                        ))}
                        {/* </Menu>
                </HiddenBox> */}
                    </Slider>
                )}

                {spots && (
                    <Slider list={spots.list} scroll={true} drag={drag}>
                        {/* <HiddenBox ref={listBoxRef}>
                            <List ref={listRef}> */}
                        {spots.list.map((spot) => (
                            <SpotItem spot={spot} key={spot.info.contentid} onChangeErrorImg={onChangeErrorImg} onOpenDetail={onOpenDetail} />
                        ))}
                        {/* </List>
                        </HiddenBox>
                         <ScrollBox ref={scrollBoxRef}>
                             <Scroll ref={scrollRef} />
                         </ScrollBox> */}
                    </Slider>
                )}
                {detail && <SpotDetailModal detail={detail} onChangeErrorImg={onChangeErrorImg} onUnloadDetailSpot={onUnloadDetailSpot} onToggleSpotLike={onToggleSpotLike} />}
            </Container>
        </SpotListBlock>
    );
};

export default SpotList;