import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretRight } from '@fortawesome/free-solid-svg-icons';
import { faCaretLeft } from '@fortawesome/free-solid-svg-icons';
import { faBackward } from '@fortawesome/free-solid-svg-icons';
import { faForward } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';

const PaginationBlock = styled.div`
    width: 100%;
    height: 100%;
    margin: 0 auto;
    display: flex;
    justify-content: center;
`;

const Container = styled.div`
    display: flex;
    margin: 0 auto;
    @media all and (min-width: 768px) {
        padding: 0rem 9rem;
    }
`;

const PageButton = styled.div`
    border-radius: 8px;
    padding: 8px;
    margin: 0;
    font-size: 0.9rem;
    &:hover {
        background: lightblue;
        cursor: pointer;
        transform: translateY(-2px);
    }

    &[disabled] {
        background: grey;
        cursor: revert;
        transform: revert;
    }

    &[aria-current] {
        background: lightblue;
        font-weight: bold;
        cursor: revert;
        transform: revert;
    }
`;

const Pagination = ({ pageArr, onIndexPage, onNextPage, onPreviousPage, onFirstPage, onLastPage }) => {
    return (
        <PaginationBlock>
            <Container>
                <PageButton onClick={onFirstPage}>
                    <FontAwesomeIcon icon={faBackward} />
                </PageButton>
                <PageButton onClick={onPreviousPage}>
                    <FontAwesomeIcon icon={faCaretLeft} />
                </PageButton>
                {pageArr.map((i) => {
                    return (
                        <PageButton key={i} onClick={() => onIndexPage(i)}>
                            {i}
                        </PageButton>
                    );
                })}
                <PageButton onClick={onNextPage}>
                    <FontAwesomeIcon icon={faCaretRight} />
                </PageButton>
                <PageButton onClick={onLastPage}>
                    <FontAwesomeIcon icon={faForward} />
                </PageButton>
            </Container>
        </PaginationBlock>
    );
};

export default Pagination;
