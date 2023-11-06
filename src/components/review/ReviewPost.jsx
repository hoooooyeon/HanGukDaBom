import Quill from 'quill';
import 'quill/dist/quill.snow.css';
import { useEffect, useMemo, useRef } from 'react';
import styled, { css } from 'styled-components';
import Editor from '../common/Editor';
import { useState } from 'react';
import Modal from '../common/Modal';
import PlannerInfo from './PlannerInfo';
import Loading from '../common/Loading';

const Container = styled.div`
    /* width: 800px; */
    color: ${(props) => props.theme.secondaryColor};
    background-color: ${(props) => props.theme.primaryBackgroundColor};
    padding: 20px;
`;

const PostMain = styled.div`
    margin-top: 50px;
    display: flex;
    flex-direction: column;
    justify-content: center;
`;

const BoxAlign = styled.div`
    display: flex;
    flex-direction: column;
    padding: 0px 20px;
`;
const B = styled.b`
    margin: 10px 0px;
`;

const Title = styled.input`
    margin-top: 20px;
    margin-bottom: 10px;
    outline: none;
    border: none;
    border-bottom: 1px solid silver;
    font-weight: 600;
    font-size: larger;
    background-color: ${(props) => props.theme.primaryBackgroundColor};
`;

const PostTitleBox = styled(BoxAlign)``;

const PostContentBox = styled.div`
    margin: 10px 0px;
    .ql-editor {
        min-height: 320px;
    }
`;

const PostFooterBox = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    padding: 0px 20px;
`;

const Button = styled.button`
    width: 64px;
    height: 32px;
    font-weight: bold;
    color: ${(props) => props.secondaryColor};
    background-color: ${(props) => props.theme.primaryButtonBackgroundColor};
    border: none;
    border-radius: 6px;
    margin: 10px 4px;
    box-shadow: 0px 1px 3px ${(props) => props.theme.shadowColor};

    &:hover {
        box-shadow: 0px 1px 6px ${(props) => props.theme.shadowColor};
    }
`;

const ReviewPost = ({
    loading,
    reviewData,
    selectPlanner,
    newFileList,
    onChangeText,
    onCancel,
    onWritePost,
    onFileUpload,
    fileListUpdate,
    isEdit,
    plannerList,
    onPlannerListLoad,
    onPlannerChange,
}) => {
    const [plannerConfirmModal, setPlannerConfirmModal] = useState(false);

    const { title, content } = reviewData || {};

    const handleWriteClick = () => {
        if (!selectPlanner) {
            setPlannerConfirmModal(true);
        } else {
            onWritePost();
            setPlannerConfirmModal(false);
        }
    };

    const handleModalClose = () => {
        setPlannerConfirmModal(false);
    };

    const handleModalConfirm = () => {
        onWritePost();
        setPlannerConfirmModal(false);
    };

    return (
        <Container>
            <PostMain>
                <BoxAlign>
                    <Title
                        type="text"
                        name="title"
                        value={title}
                        onChange={(e) => onChangeText({ key: 'title', value: e.target.value })}
                        placeholder="제목을 입력하세요."
                    />
                    <B>플래너</B>
                    <PlannerInfo
                        loading={loading}
                        viewMode={false}
                        selectPlanner={selectPlanner}
                        plannerList={plannerList}
                        onPlannerListLoad={onPlannerListLoad}
                        onPlannerChange={onPlannerChange}
                    />
                    <PostContentBox>
                        <Editor
                            content={content}
                            onChangeText={onChangeText}
                            isEdit={isEdit}
                            newFileList={newFileList}
                            onFileUpload={onFileUpload}
                            fileListUpdate={fileListUpdate}
                        />
                    </PostContentBox>
                </BoxAlign>
                <PostFooterBox>
                    <Button onClick={onCancel}>취소</Button>
                    <Button onClick={handleWriteClick}>{isEdit ? '수정' : '쓰기'}</Button>
                </PostFooterBox>
            </PostMain>
            <Modal
                modalVisible={plannerConfirmModal}
                title="플래너 확인"
                onModalClose={handleModalClose}
                onModalCancle={handleModalClose}
                onModalConfirm={handleModalConfirm}
                modalConfirmText="확인"
            >
                <b>플래너를 선택하지 않으셨습니다.. 그래도 진행합니까?</b>
            </Modal>
        </Container>
    );
};

export default ReviewPost;
