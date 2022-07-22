import styled from "styled-components";

const Styling = styled.div`
  /* color: ${(props) => (props.speed ? "green" : "orange")};
  color: ${(props) =>
    props.userAnswer != props.correctAnswer ? "red" : ""}; */

  &.correct__answer--inTime {
    color: green;
  }
  &.correct__answer--outTime {
    color: orange;
  }
  &.incorrect__answer {
    color: red;
  }
`;

export default Styling;
