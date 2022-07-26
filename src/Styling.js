import styled from 'styled-components';

const Styling = styled.div`
    &.incorrect_answer{
        color:red;
    }
    &.correct_answer--inTime{
        color: green;
    }
    &.correct_answer--outTime{
        color: orange;
    }
`;

export default Styling;
