import { useRef } from 'react';
import styled from 'styled-components';
import Slider from '../../common/Slider';

const InfoDatinationBlock = styled.div`
    border-radius: 0.5rem;
    margin-bottom: 0.5rem;
`;

const DateList = styled.ul`
    display: flex;
    padding: 0.5rem 0.2rem;
    margin: 0;
    width: 100%;
`;

const DateBox = styled.li`
    position: relative;
    border-radius: 2rem;
    cursor: pointer;
    & + & {
        margin-left: 0.5rem;
    }
    &[aria-current] {
        box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
    }
`;

const DateButton = styled.div`
    width: 2.5rem;
    height: 2.5rem;
    line-height: 2.5rem;
    font-weight: bold;
    white-space: nowrap;
    font-size: 0.7rem;
    padding: 0.5rem;
    background-color: white;
    border-radius: 2rem;
    box-shadow: 0 0 2px rgba(0, 0, 0, 0.3);
    text-align: center;
    &:hover {
        transition: transform 0.3s ease;
        transform: scale(1.1);
    }
`;

const RouteLine = styled.div`
    background-color: rgba(0, 0, 0, 0.1);
    width: 2rem;
    height: 0.2rem;
    position: absolute;
    left: 16%;
    top: 50%;
    transform: translate(-50%, -50%);
    z-index: -1;
`;

const InfoDatination = ({ planner, plannerData, drag, onChangeCurPlanId }) => {
    const { plans } = { ...planner };

    const letsFormat = (d) => {
        const date = new Date(d);
        return ('0' + (date.getMonth() + 1)).slice(-2) + ' / ' + ('0' + date.getDate()).slice(-2);
    };

    const itemRef = useRef();

    if (!plans) {
        return <div>Loading...</div>;
    }
    return (
        <InfoDatinationBlock>
            <Slider list={plans} drag={drag} itemRef={itemRef}>
                <DateList>
                    {plans &&
                        plans.map((p, i) => (
                            <DateBox
                                ref={itemRef}
                                key={p.planId}
                                aria-current={p.planId === plannerData.planId ? 'date' : null}
                                onClick={() => {
                                    onChangeCurPlanId(p.planId);
                                }}
                            >
                                <DateButton>{letsFormat(p.planDate)}</DateButton>
                                {i !== 0 && <RouteLine />}
                            </DateBox>
                        ))}
                </DateList>
            </Slider>
        </InfoDatinationBlock>
    );
};

export default InfoDatination;