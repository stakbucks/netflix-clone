import styled from "styled-components";
import { useQuery } from "react-query";
import { getLatest, getRec } from "../../api";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { IGetMovies } from "../../api";

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/original";

const Wrapper = styled.div`
  width: 100%;
  height: 50vh;
  background-color: ${(props) => props.theme.black.darker};
`;

const Loader = styled.h1`
  margin-top: 50px;
  margin-bottom: 40px;
  font-size: 50px;
  color: ${(props) => props.theme.red};
`;

const Latest = styled.div`
  margin-top: 20px;
  width: 100%;
  height: 200px;
`;
const Title = styled.h1`
  font-size: 20px;
  color: ${(props) => props.theme.white.lighter};
  margin-left: 52px;
`;
const LatestSlider = styled(motion.div)`
  margin-top: 20px;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LeftArrow = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  border-top-style: 0;
  background-color: rgba(0, 0, 0, 0.4);
  width: 60px;
  height: 160px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const RightArrow = styled(motion.div)`
  position: absolute;
  top: 0;
  right: 0;
  border-top-style: 0;
  background-color: rgba(0, 0, 0, 0.4);
  width: 60px;
  height: 160px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Row = styled(motion.div)`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 5px;
  place-items: center;
  position: absolute;
`;
const Movie = styled(motion.div)`
  img {
    height: 125px;
    width: 220px;
  }
  position: relative;
  &:last-child {
    transform-origin: center right;
  }
`;
const Box = styled(motion.div)`
  opacity: 0;
  position: absolute;
  background-color: grey;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5px;
  height: 40px;
  bottom: -35px;
  color: white;
`;

const rowVariants = {
  initial: (back: boolean) => ({
    opacity: 0,
    x: back ? -800 : 800,
  }),
  end: {
    opacity: 1,
    x: 0,
  },
  exit: (back: boolean) => ({
    opacity: 0,
    x: back ? 800 : -800,
  }),
};
const movieVariants = {
  hover: { scale: 2, zIndex: 99, y: -200, transition: { delay: 0.4 } },
};
const boxVariants = {
  hover: { opacity: 1, transition: { delay: 0.4 } },
};

function Contents() {
  const { data: latestData, isLoading: latestIsLoading } = useQuery<IGetMovies>(
    ["movies", "latest"],
    getLatest
  );
  const { data: recData, isLoading: recIsLoading } = useQuery<IGetMovies>(
    ["movies", "rec"],
    getRec
  );
  console.log(latestData);
  const [row, setRow] = useState(0);
  const [recRow, setRecRow] = useState(0);
  const maxRow = latestData && Math.floor(latestData?.results.length / 6);
  const maxRecRow = recData && Math.floor(recData?.results.length / 6);
  const [arrowShow, setArrowShow] = useState(false);
  const [back, setBack] = useState(false);
  const toggleArrowShow = () => setArrowShow((prev) => !prev);
  const goBack = () => {
    setBack(true);
    if (row === 0) setRow((maxRow as any) - 1);
    else setRow((prev) => prev - 1);
  };
  const recGoBack = () => {
    setBack(true);
    if (row === 0) setRecRow((maxRecRow as any) - 1);
    else setRecRow((prev) => prev - 1);
  };
  const goForward = () => {
    setBack(false);
    if (row === (maxRow as any) - 1) setRow(0);
    else setRow((prev) => prev + 1);
  };
  const recGoForward = () => {
    setBack(false);
    if (recRow === (maxRecRow as any) - 1) setRecRow(0);
    else setRecRow((prev) => prev + 1);
  };
  console.log(maxRecRow);
  return (
    <Wrapper>
      {latestIsLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <Latest>
            <Title>최근 개봉 콘텐츠</Title>
            <LatestSlider>
              <LeftArrow
                onMouseEnter={toggleArrowShow}
                onMouseLeave={toggleArrowShow}
                onClick={goBack}
              >
                <AnimatePresence>
                  {arrowShow ? (
                    <svg
                      width="50px"
                      height="100px"
                      fill="white"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 384 512"
                    >
                      <path d="M41.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 256 278.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z" />
                    </svg>
                  ) : null}
                </AnimatePresence>
              </LeftArrow>

              <AnimatePresence initial={false} custom={back}>
                <Row
                  custom={back}
                  key={row}
                  variants={rowVariants}
                  initial="initial"
                  animate="end"
                  exit="exit"
                  transition={{ duration: 0.5 }}
                >
                  {latestData?.results
                    .slice(6 * row, 6 * row + 6)
                    .map((movie) => (
                      <>
                        <Movie
                          variants={movieVariants}
                          whileHover="hover"
                          key={movie.id}
                        >
                          <img
                            src={`${IMAGE_BASE_URL}${movie.backdrop_path}`}
                          />
                          <Box variants={boxVariants}>{movie.title}</Box>
                        </Movie>
                      </>
                    ))}
                </Row>
              </AnimatePresence>
              <RightArrow
                onMouseEnter={toggleArrowShow}
                onMouseLeave={toggleArrowShow}
                onClick={goForward}
              >
                <AnimatePresence>
                  {arrowShow ? (
                    <svg
                      fill="white"
                      width="50px"
                      height="100px"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 384 512"
                    >
                      <path d="M342.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L274.7 256 105.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z" />
                    </svg>
                  ) : null}
                </AnimatePresence>
              </RightArrow>
            </LatestSlider>
          </Latest>
        </>
      )}
      {recIsLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <Latest>
            <Title>추천 콘텐츠</Title>
            <LatestSlider>
              <LeftArrow
                onMouseEnter={toggleArrowShow}
                onMouseLeave={toggleArrowShow}
                onClick={recGoBack}
              >
                <AnimatePresence>
                  {arrowShow ? (
                    <svg
                      width="50px"
                      height="100px"
                      fill="white"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 384 512"
                    >
                      <path d="M41.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 256 278.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z" />
                    </svg>
                  ) : null}
                </AnimatePresence>
              </LeftArrow>

              <AnimatePresence initial={false} custom={back}>
                <Row
                  custom={back}
                  key={recRow + 1000}
                  variants={rowVariants}
                  initial="initial"
                  animate="end"
                  exit="exit"
                  transition={{ duration: 0.5 }}
                >
                  {recData?.results
                    .slice(6 * recRow, 6 * recRow + 6)
                    .map((movie) => (
                      <>
                        <Movie
                          variants={movieVariants}
                          whileHover="hover"
                          key={movie.id}
                        >
                          <img
                            src={`${IMAGE_BASE_URL}${movie.backdrop_path}`}
                          />
                          <Box variants={boxVariants}>{movie.title}</Box>
                        </Movie>
                      </>
                    ))}
                </Row>
              </AnimatePresence>
              <RightArrow
                onMouseEnter={toggleArrowShow}
                onMouseLeave={toggleArrowShow}
                onClick={recGoForward}
              >
                <AnimatePresence>
                  {arrowShow ? (
                    <svg
                      fill="white"
                      width="50px"
                      height="100px"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 384 512"
                    >
                      <path d="M342.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L274.7 256 105.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z" />
                    </svg>
                  ) : null}
                </AnimatePresence>
              </RightArrow>
            </LatestSlider>
          </Latest>
        </>
      )}
    </Wrapper>
  );
}
export default Contents;
