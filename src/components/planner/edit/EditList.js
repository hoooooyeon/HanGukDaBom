import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { faBed } from '@fortawesome/free-solid-svg-icons';
import { faUtensils } from '@fortawesome/free-solid-svg-icons';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

const EditListBlock = styled.div`
    width: 350px;
    height: 750px;
    background-color: #f5f5f5;
    float: left;
`;

const MenuList = styled.div`
    width: calc(100% - 10px);
    display: flex;
    padding: 5px;
    background-color: #cdd9ac;
    justify-content: center;
`;

const MenuItem = styled.div`
    border: 3px solid #cdd9ac;
    background-color: white;
    border-radius: 10%;
    width: 4.5rem;
    height: 4.5rem;
    font-size: 1rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: #3a3934;
    & + & {
        margin-left: 1px;
    }
    p {
        line-height: 1px;
        color: #3a3934;
        font-size: 0.8rem;
        font-weight: bold;
    }
    &:hover {
        border: 3px solid #9aad67;
        transform: translateY(-3px);
        cursor: pointer;
    }
`;

const List = styled.div`
    padding: 1px 0 5px;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const StyledFontAwesomeIcon = styled(FontAwesomeIcon)`
    width: 1.5rem;
    height: 1.5rem;
`;

const ListItem = styled.div`
    /* border-radius: 0.5rem; */
    display: flex;
    align-items: center;
    justify-content: space-around;
    width: 100%;
    height: 90px;
    background-color: white;
    z-index: 99;
    /* box-shadow: 3px 3px 7px 1px rgb(0, 0, 0, 30%); */
    /* border: 1px solid lightgray; */
    border-width: 1px 0;
    border-style: solid;
    border-color: lightgray;
    & + & {
        margin-top: 1px;
    }
    &:hover {
        /* transform: translate(1px, -1px); */
        background-color: #ffcbc14f;
    }
`;

const Img = styled.div`
    border-radius: 5%;
    border: 1px solid gray;
    width: 80px;
    height: 80px;
`;

const Name = styled.div`
    width: 120px;
    height: 2.4em;
    overflow-y: auto;
    white-space: wrap;
    line-height: 1.2;
    text-align: left;
    word-wrap: break-word;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    -ms-overflow-style: none;
    &::-webkit-scrollbar {
        display: none;
    }
`;

const Button = styled.button`
    border: none;
    border-radius: 0.5rem;
    background-color: #9aad67;
    color: white;
    width: 4rem;
    height: 2rem;
    cursor: pointer;
`;

const EditList = ({ spots, onChangePlanLocation, onCreateLocation, onMoveMarker }) => {
    return (
        <>
            <EditListBlock>
                <MenuList>
                    <MenuItem>
                        <StyledFontAwesomeIcon icon={faLocationDot} />
                        <p>관광지</p>
                    </MenuItem>
                    <MenuItem>
                        <StyledFontAwesomeIcon icon={faBed} />
                        <p>숙소</p>
                    </MenuItem>
                    <MenuItem>
                        <StyledFontAwesomeIcon icon={faUtensils} />
                        <p>식당</p>
                    </MenuItem>
                    <MenuItem>
                        <StyledFontAwesomeIcon icon={faHeart} />
                        <p>좋아요</p>
                    </MenuItem>
                </MenuList>
                <List>
                    {spots.map((s, i) => {
                        return (
                            <ListItem key={i}>
                                <Img
                                // src={s.firstimage || s.firstimage2}
                                // alt={s.title}
                                // onError={onChangeErrorImg}
                                />
                                <Name>{s.title}</Name>
                                <Button
                                    onClick={() => {
                                        onCreateLocation(s);
                                    }}
                                >
                                    추가
                                </Button>
                                <Button
                                    onClick={() => {
                                        onMoveMarker(s);
                                    }}
                                >
                                    위치
                                </Button>
                            </ListItem>
                        );
                    })}
                </List>
            </EditListBlock>
        </>
    );
};

export default EditList;
