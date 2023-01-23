import styled from "styled-components";
import Main from "./Components/Main";
import Nav from "./Components/Nav";
import Contents from "./Components/Contents";
import SerMain from "./Components/SerMain";
import SerContent from "./Components/SerContent";
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  background-color: pink;
`;
function Series() {
  return (
    <Wrapper>
      <Nav />
      <SerMain />
      <SerContent />
    </Wrapper>
  );
}
export default Series;
