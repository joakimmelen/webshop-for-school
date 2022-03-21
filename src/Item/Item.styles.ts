import styled from "styled-components";

export const Wrapper = styled.div`
display: flex;
justify-content: space-between;
flex-direction: column;
width: 100%;
border: 1px solid grey;
border-radius: 5px;
height: 100%;
button {
    border-radius: 0 0 20px 20px;
}
img {
    max-height: 100px;
    object-fit: contain;
    border-radius: 20px 20px 0 0;
}
div {
    font-family: Arial, Helvetica, sans-serif;
    padding: 1rem;
    height: 100%;
}
`;