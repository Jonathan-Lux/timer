import { styled } from "styled-components";

export const HomeContainer = styled.main`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
  flex-direction: column;


  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 3.5rem;
  }
`;

export const FormContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  color: ${(props) => props.theme["gray-100"]};
  justify-content: center;
  align-items: center;
  font-size: 1.125rem;
  font-weight: bold;
  flex-wrap: wrap;
  width: 100%;
`;

const BaseInput = styled.input`
    background: transparent;
    border: 0;
    height: 2.5rem;
    border-bottom: 2px solid ${(props) => props.theme["gray-500"]};
    font-weight: bold;
    font-size:1.12rem;
    padding: 0 0.5rem;
    color: ${(props) => props.theme["gray-100"]};

&:focus{
  box-shadow: none;
  border-color: ${(props) => props.theme["green-500"]};
}

`

export const InputTask=styled(BaseInput)`
  flex: 1;
`

export const InputTaskMinutes = styled(BaseInput)`
  width: 4rem;
  display: flex;
  padding-left: 1.2rem;
`

export const CountDownContainer = styled.div`
  font-size: 10rem;
  line-height: 8rem;
  display: flex;
  gap: 1rem;
  font-family: "Roboto Mono", monospace;
  color: ${(props) => props.theme["gray-100"]};

  span {
    padding: 2rem 1rem;
    background-color: ${(props) => props.theme["gray-900"]};
    border-radius: 8px;
  }
`;

export const Separator = styled.div`
  padding: 2rem 0;
  color: ${(props) => props.theme["green-500"]};
  display: flex;
  width: 4rem;
  justify-content: center;
`;
export const ButtonContainer = styled.button`
  width: 100%;
  border: 0;
  padding: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  color: ${(props) => props.theme["gray-100"]};
  background-color: ${(props) => props.theme["green-500"]};
  cursor: pointer;
  font-weight: bold;
  border-radius: 8px;

  &:disabled{
    opacity: 0.7;
    cursor: not-allowed;
  }

  &:not(:disabled):hover{
    background-color: ${(props) => props.theme["green-700"]};
  }

`;
