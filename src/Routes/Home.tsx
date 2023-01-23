import styled from "styled-components";
import Main from "./Components/Main";
import Nav from "./Components/Nav";
import Contents from "./Components/Contents";
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  background-color: pink;
`;
function Home() {
  return (
    <Wrapper>
      <Nav />
      <Main />
      <Contents />
    </Wrapper>
  );
}
export default Home;
