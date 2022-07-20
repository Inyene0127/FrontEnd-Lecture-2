import styled from 'styled-components';

const Styling = styled.div`
    color: ${(props) => props.speed ? "green" : "orange"};
    color: ${(props) => props.userAnswer != props.correctAnswer ? "red" : ""};
`;

export default Styling;
