import styled from 'styled-components';

export const News = styled.section`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 2%;
    row-gap: 2%;
    margin-left: 9%;
    margin-right: 9%;
    margin-top: 0%;
    @media (max-width: 700px) {
    grid-template-columns: repeat(3, 1fr);
    }

    @media (max-width: 550px) {
    grid-template-columns: 1fr;
    }
`;