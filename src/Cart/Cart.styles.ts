import styled from "styled-components"

export const Wrapper = styled.aside`
    font-family: Arial, Helvetica, sans-serif;
    width: 450px;
    padding: 10px;
    display: grid;
    button {
        /* color: rgba(170, 150, 183, 1); */
        color: rgba(170, 150, 183, 1);
        background-color: white;
    }

    button:hover {
        background-color: rgba(170, 150, 183, 0.7);;
    }

    .cartTotal {
        display: flex;
        justify-content: space-between;
        flex-direction: row;
        padding: 0px 40px 0px 10px;
        position: sticky;
        bottom: 0;
        background-color: white;
        align-items: center;
        border-top: 1px solid rgba(170, 150, 183, 1);
        margin-bottom: 5px;
        min-height: 50px;
    }

    @media screen and (max-width: 500px) {
    width: 90%;
  }

`