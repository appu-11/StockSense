import { Link } from "react-router-dom";
import styled from "styled-components";

export const Finall = styled(Link)`
  width: 100%;
  display: flex;
  flex-direction: column;
  color: black;
  text-decoration: none;
  font-family: "Times New Roman", sans-serif;
  div {
    width: 100%;
    height: 150px;
    overflow: hidden;
    border: 0.5px solid;
  }
  p{
    justify-content: center;
    text-align: justify;
  }
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: 0.4s;
  }
  &:hover {
    img {
      transform: scale(1.1);
    }
  }

  span {
    font-size: 12px;
    margin: 3px 0px;
  }

  @media (max-width: 550px) {
    flex-direction: row;
    gap: 10px;

    div {
      width: 150px;
      height: 100px;
    }

    section {
      flex: 1;
    }
  }

  @media (max-width: 450px) {
    div {
      width: 100px;
    }
  }
`;