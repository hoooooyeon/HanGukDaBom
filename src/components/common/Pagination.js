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
    background-color: white;
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
    @media all and (max-width: 319px) {
        padding: 2px;
    }
`;

const Pagination = ({ page, totalCount, onIndexPage, onNextPage, onPreviousPage, onFirstPage, onLastPage }) => {
    // 뿌려줄 페이지 배열
    const [pageArr, setPageArr] = useState([]);
    // 페이지의 10단위
    const [block, setBlock] = useState(0);
    // 보여질 페이지네이션의 개수
    const limitIndex = 5;
    // 마지막 페이지
    const maxPage = Math.ceil(totalCount / limitIndex);

    // 페이지네이션 배열 생성
    useEffect(() => {
        const arr = Array.from({ length: maxPage }, (_, i) => i + 1);

        setPageArr(arr.slice(limitIndex * block, limitIndex * (block + 1)));
    }, [block, maxPage]);

    // block 처리
    useEffect(() => {
        if (page === 1) {
            setBlock(0);
        } else if (page === maxPage) {
            setBlock(Math.ceil(maxPage / limitIndex - 1));
        }
    }, [page]);

    return (
        <PaginationBlock>
            <Container>
                {pageArr && pageArr.length > 0 && (
                    <>
                        <PageButton onClick={onFirstPage}>
                            <FontAwesomeIcon icon={faBackward} />
                        </PageButton>
                        <PageButton onClick={onPreviousPage}>
                            <FontAwesomeIcon icon={faCaretLeft} />
                        </PageButton>
                        {pageArr.map((i) => {
                            return (
                                <PageButton
                                    key={i}
                                    aria-current={page === i ? 'cur' : null}
                                    onClick={() => onIndexPage(i)}
                                >
                                    {i}
                                </PageButton>
                            );
                        })}
                        <PageButton
                            onClick={() => {
                                onNextPage(maxPage);
                            }}
                        >
                            <FontAwesomeIcon icon={faCaretRight} />
                        </PageButton>
                        <PageButton onClick={() => onLastPage(maxPage)}>
                            <FontAwesomeIcon icon={faForward} />
                        </PageButton>
                    </>
                )}
            </Container>
        </PaginationBlock>
    );
};

export default Pagination;
