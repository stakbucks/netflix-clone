import styled from "styled-components";
import {
  motion,
  useAnimationControls,
  useScroll,
  useTransform,
  useMotionValueEvent,
  AnimatePresence,
} from "framer-motion";
import { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
const NavBar = styled(motion.div)`
  z-index: 99;
  width: 100vw;
  height: 67px;
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: linear-gradient(rgba(24, 24, 24, 0.7), rgba(24, 24, 24, 0));
`;
const Col = styled.div`
  margin: 0 41px;
  display: flex;
`;
const Item = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 100;
  font-size: 14px;
  color: ${(props) => props.theme.white.lighter};
  margin: 0 10px;
  &:first-child {
    padding: 10px;
  }
`;
const Input = styled(motion.input)`
  width: 240px;
  height: 34px;
  background-color: black;
  border: 1px solid white;
  padding-left: 35px;
  color: white;
  outline: none;
`;

const Svg = styled(motion.svg)``;

const Overlay = styled(motion.div)`
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  background: transparent;
`;

function Nav() {
  const [hovered, setHovered] = useState(false);
  const [inputOpen, setInputOpen] = useState(false);
  const toggleInputOpen = () => setInputOpen((prev) => !prev);
  const toggleHovered = () => setHovered((prev) => !prev);
  const { scrollY } = useScroll();
  const scroll = useAnimationControls();

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (scrollY.get() < 40) {
      scroll.start({
        background: "linear-gradient(rgba(24,24,24,0.7),rgba(24,24,24,0))",
      });
    } else {
      scroll.start({
        background: "linear-gradient(rgba(24,24,24,1),rgba(24,24,24,1))",
      });
    }
  });

  return (
    <NavBar animate={scroll}>
      <Col>
        <Item>
          <Link to="/">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="125"
              width="125"
              viewBox="-153.6 -69.1855 1331.2 415.113"
            >
              <path
                fill="#d81f26"
                d="M140.803 258.904c-15.404 2.705-31.079 3.516-47.294 5.676L44.051 119.724v151.073C28.647 272.418 14.594 274.58 0 276.742V0h41.08l56.212 157.021V0h43.511zm85.131-157.558c16.757 0 42.431-.811 57.835-.811v43.24c-19.189 0-41.619 0-57.835.811v64.322c25.405-1.621 50.809-3.785 76.482-4.596v41.617l-119.724 9.461V0h119.724v43.241h-76.482zm237.284-58.104h-44.862V242.15c-14.594 0-29.188 0-43.239.539V43.242h-44.862V0H463.22zm70.266 55.132h59.187v43.24h-59.187v98.104h-42.433V0h120.808v43.241h-78.375zm148.641 103.507c24.594.539 49.456 2.434 73.51 3.783v42.701c-38.646-2.434-77.293-4.863-116.75-5.676V0h43.24zm109.994 49.457c13.783.812 28.377 1.623 42.43 3.242V0h-42.43zM1024 0l-54.863 131.615L1024 276.742c-16.217-2.162-32.432-5.135-48.648-7.838l-31.078-79.994-31.617 73.51c-15.678-2.705-30.812-3.516-46.484-5.678l55.672-126.75L871.576 0h46.482l28.377 72.699L976.705 0z"
              />
            </svg>
          </Link>
        </Item>
        <Item>
          <Link to="/">홈</Link>
        </Item>
        <Item>
          <Link to="/series">시리즈</Link>
        </Item>
        <Item>영화</Item>
        <Item>NEW! 요즘 대세 콘텐츠</Item>
        <Item>내가 찜한 콘텐츠</Item>
        <Item>언어별로 찾아보기</Item>
      </Col>
      <Col>
        <Item>
          {inputOpen ? (
            <Input
              initial={{ scaleX: 0 }}
              animate={{
                scaleX: inputOpen ? 1 : 0,
              }}
              autoFocus
              type="text"
              placeholder="제목,사람,장르"
            />
          ) : null}
          <Svg
            transition={{ type: "linear" }}
            onClick={toggleInputOpen}
            style={{ position: "absolute", left: 15 }}
            width="20px"
            height="20px"
            fill="white"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
          >
            <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352c79.5 0 144-64.5 144-144s-64.5-144-144-144S64 128.5 64 208s64.5 144 144 144z" />
          </Svg>
        </Item>
        <Item style={{ marginLeft: "25px" }}>키즈</Item>
        <Item>
          <svg
            width="20px"
            height="20px"
            fill="white"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 448 512"
          >
            <path d="M256 32V49.88C328.5 61.39 384 124.2 384 200V233.4C384 278.8 399.5 322.9 427.8 358.4L442.7 377C448.5 384.2 449.6 394.1 445.6 402.4C441.6 410.7 433.2 416 424 416H24C14.77 416 6.365 410.7 2.369 402.4C-1.628 394.1-.504 384.2 5.26 377L20.17 358.4C48.54 322.9 64 278.8 64 233.4V200C64 124.2 119.5 61.39 192 49.88V32C192 14.33 206.3 0 224 0C241.7 0 256 14.33 256 32V32zM216 96C158.6 96 112 142.6 112 200V233.4C112 281.3 98.12 328 72.31 368H375.7C349.9 328 336 281.3 336 233.4V200C336 142.6 289.4 96 232 96H216zM288 448C288 464.1 281.3 481.3 269.3 493.3C257.3 505.3 240.1 512 224 512C207 512 190.7 505.3 178.7 493.3C166.7 481.3 160 464.1 160 448H288z" />
          </svg>
        </Item>
        <Item onMouseEnter={toggleHovered} onMouseLeave={toggleHovered}>
          <img
            style={{
              width: "33px",
              height: "33px",
              borderRadius: "5px",
            }}
            src="img/profile.png"
          />
          <Svg
            animate={{ rotateZ: hovered ? 180 : 0 }}
            style={{ marginLeft: "10px" }}
            fill="white"
            width="20px"
            height="20px"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 320 512"
          >
            <path d="M137.4 374.6c12.5 12.5 32.8 12.5 45.3 0l128-128c9.2-9.2 11.9-22.9 6.9-34.9s-16.6-19.8-29.6-19.8L32 192c-12.9 0-24.6 7.8-29.6 19.8s-2.2 25.7 6.9 34.9l128 128z" />
          </Svg>
        </Item>
      </Col>
    </NavBar>
  );
}
export default Nav;
