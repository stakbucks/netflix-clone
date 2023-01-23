import styled from "styled-components";
import { useQuery } from "react-query";
import {
  getMovies,
  IGetMovies,
  IMovie,
  getDetail,
  IGetDetail,
} from "../../api";
import { AnimatePresence, motion, useScroll } from "framer-motion";
import { useEffect, useState } from "react";
import { useHistory, useRouteMatch } from "react-router-dom";

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/original";

const Loader = styled.h1`
  font-size: 50px;
  color: ${(props) => props.theme.red};
`;

const Wrapper = styled.div<{ bgPhoto: string }>`
  height: 100vh;
  min-height: 800px;
  min-width: 1000px;
  background: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.7)),
    url(${(props) => props.bgPhoto});
  background-size: cover;
  position: relative;
`;

const Description = styled.div`
  margin-left: 52px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100vh;
`;

const Title = styled.h1`
  color: white;
  font-size: 60px;
  margin-bottom: 30px;
`;
const Overview = styled.p`
  width: 60%;
  color: ${(props) => props.theme.white.darker};
  font-size: 30px;
`;
const Buttons = styled.div`
  display: flex;
  align-items: flex-end;
`;
const PlayButton = styled.button`
  width: 117px;
  height: 43px;
  border-radius: 5px;
  background-color: white;
  border: none;
  margin-top: 30px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  span {
    font-size: 20px;
  }
`;
const MoreInfo = styled.button`
  margin-left: 14px;
  width: 149px;
  height: 43px;
  border-radius: 5px;
  border: none;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  span {
    font-size: 18px;
    color: white;
  }
`;

const Ranking = styled.div`
  position: absolute;
  bottom: 0;
  height: 220px;
  width: 100%;
`;
const RankingTitle = styled.h2`
  color: ${(props) => props.theme.white.lighter};
  font-size: 20px;
  margin-left: 52px;
`;
const RankingSlider = styled.div`
  width: 100%;
  padding-left: 52px;
  place-items: center;
`;

const Rank = styled.div`
  z-index: -1;
  position: absolute;
  left: -90px;
  height: 100%;
  display: inline-block;
  top: -6px;
  font-size: 200px;
  font-weight: 800;
  font-stretch: 100%;
  text-shadow: -3px -3px 0 grey, 3px -3px 0 grey, -3px 3px 0 grey,
    3px 3px 0 grey;
`;

const Movie = styled(motion.div)`
  width: 100px;
  height: 100px;
  img {
    width: 100px;
    z-index: 99;
  }
  position: relative;
  bottom: -50px;
`;

const Row = styled(motion.div)`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  place-items: center;
`;

const movieVariants = {
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

const LeftArrow = styled(motion.div)`
  position: absolute;
  left: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.4);
  width: 60px;
  height: 160px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const RightArrow = styled(motion.div)`
  position: absolute;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.4);
  width: 70px;
  height: 160px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Img = styled(motion.div)`
  color: white;
`;

const MovieInfo = styled(motion.div)`
  background-color: ${(props) => props.theme.black.darker};
  padding: 5px;
  width: 100%;
  height: 30px;
  position: absolute;
  bottom: -20px;
  opacity: 0;
  color: white;
  text-align: center;
`;

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  opacity: 0;
`;

const BigMovie = styled(motion.div)`
  z-index: 100;
  position: absolute;
  left: 30vw;
  width: 40vw;
  background-color: #181818;
  border-radius: 15px;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: 20px 48px;
  position: relative;
  h1 {
    font-size: 60px;
    color: white;
    position: absolute;
    top: -80px;
  }
  div {
    color: white;
  }
`;

const ThumbsUp = styled.svg``;

const imgVariants = {
  normal: { scale: 1 },
  hover: { scale: 2, y: -150, transition: { delay: 0.3 } },
};

const infoVariants = {
  hover: { opacity: 1, transition: { delay: 0.3 } },
};

function Main() {
  const history = useHistory();
  const { scrollY, scrollYProgress } = useScroll();
  const bigMovieMatch = useRouteMatch<{ movieId: string }>("/movies/:movieId");
  const { data, isLoading } = useQuery<IGetMovies>(
    ["movies", "ranking"],
    getMovies
  );
  const [nextPage, setNextPage] = useState(false);
  const [back, setBack] = useState(false);
  const [arrowShow, setArrowShow] = useState(false);
  const clickedMovie =
    bigMovieMatch?.params.movieId &&
    data?.results.find(
      (movie) => movie.id + "" === bigMovieMatch.params.movieId
    );
  const { data: detailData, isLoading: detailIsLoading } = useQuery<IGetDetail>(
    ["movies", bigMovieMatch?.params.movieId],
    () => getDetail(bigMovieMatch?.params.movieId)
  );
  console.log(detailData);
  const togglePage = () => setNextPage((prev) => !prev);
  const goBack = () => {
    setBack(true);
    togglePage();
  };
  const goForward = () => {
    setBack(false);
    togglePage();
  };
  const onMovieClick = (movieId: number) => {
    history.push(`/movies/${movieId}`);
  };
  const onOverlayClick = () => {
    history.goBack();
  };
  const toggleArrowShow = () => {
    setArrowShow((prev) => !prev);
  };
  return (
    <>
      {isLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <Wrapper bgPhoto={`${IMAGE_BASE_URL}${data?.results[0].backdrop_path}`}>
          <Description>
            <Title>{data?.results[0].title}</Title>
            <Overview>{data?.results[0].overview}</Overview>
            <Buttons>
              <PlayButton>
                <svg
                  width="30px"
                  height="30px"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 384 512"
                >
                  <path d="M73 39c-14.8-9.1-33.4-9.4-48.5-.9S0 62.6 0 80V432c0 17.4 9.4 33.4 24.5 41.9s33.7 8.1 48.5-.9L361 297c14.3-8.7 23-24.2 23-41s-8.7-32.2-23-41L73 39z" />
                </svg>
                <span>재생</span>
              </PlayButton>
              <MoreInfo>
                <svg
                  width="30px"
                  height="30px"
                  fill="white"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                >
                  <path d="M256 512c141.4 0 256-114.6 256-256S397.4 0 256 0S0 114.6 0 256S114.6 512 256 512zM216 336h24V272H216c-13.3 0-24-10.7-24-24s10.7-24 24-24h48c13.3 0 24 10.7 24 24v88h8c13.3 0 24 10.7 24 24s-10.7 24-24 24H216c-13.3 0-24-10.7-24-24s10.7-24 24-24zm40-144c-17.7 0-32-14.3-32-32s14.3-32 32-32s32 14.3 32 32s-14.3 32-32 32z" />
                </svg>
                <span>상세 정보</span>
              </MoreInfo>
            </Buttons>
          </Description>
          <Ranking>
            <RankingTitle>오늘 대한민국의 TOP 10 영화 </RankingTitle>
            <RankingSlider>
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
                {!nextPage ? (
                  <Row>
                    {data?.results
                      .slice(1)
                      .slice(0, 6)
                      .map((movie, index) => (
                        <Movie
                          custom={back}
                          layout
                          variants={movieVariants}
                          initial="initial"
                          animate="end"
                          exit="exit"
                          key={movie.id}
                        >
                          <Rank>{index + 1}</Rank>
                          <Img
                            layoutId={movie.id + ""}
                            onClick={() => onMovieClick(movie.id)}
                            variants={imgVariants}
                            whileHover="hover"
                            initial="normal"
                          >
                            <img
                              src={`${IMAGE_BASE_URL}${movie.poster_path}`}
                            />
                            <MovieInfo variants={infoVariants}>
                              {" "}
                              {movie.title}
                            </MovieInfo>
                          </Img>
                        </Movie>
                      ))}
                  </Row>
                ) : (
                  <Row>
                    {data?.results
                      .slice(1)
                      .slice(4, 10)
                      .map((movie, index) => (
                        <Movie
                          layout
                          custom={back}
                          variants={movieVariants}
                          initial="initial"
                          animate="end"
                          exit="exit"
                          key={movie.id}
                        >
                          <Rank>{index + 5}</Rank>
                          <Img
                            layoutId={movie.id + ""}
                            onClick={() => onMovieClick(movie.id)}
                            variants={imgVariants}
                            whileHover="hover"
                            initial="normal"
                          >
                            <img
                              src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                            />
                            <MovieInfo variants={infoVariants}>
                              {movie.title}
                            </MovieInfo>
                          </Img>
                        </Movie>
                      ))}
                  </Row>
                )}
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
            </RankingSlider>
          </Ranking>
          <AnimatePresence>
            {bigMovieMatch ? (
              <>
                <Overlay
                  onClick={onOverlayClick}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                ></Overlay>
                <BigMovie
                  layoutId={bigMovieMatch.params.movieId}
                  style={{
                    top: scrollY.get() + 50,
                  }}
                >
                  {detailIsLoading ? (
                    <Loader>Loading...</Loader>
                  ) : (
                    <>
                      <Img>
                        <img
                          style={{ width: "100%" }}
                          src={`${IMAGE_BASE_URL}${detailData?.backdrop_path}`}
                        />
                      </Img>
                      <Container>
                        <h1>{detailData?.title}</h1>
                        <Buttons
                          style={{ width: "100%", position: "relative" }}
                        >
                          <PlayButton
                            style={{
                              width: "100px",
                              height: "40px",
                              marginTop: 0,
                              marginBottom: "20px",
                            }}
                          >
                            <svg
                              width="30px"
                              height="30px"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 384 512"
                            >
                              <path d="M73 39c-14.8-9.1-33.4-9.4-48.5-.9S0 62.6 0 80V432c0 17.4 9.4 33.4 24.5 41.9s33.7 8.1 48.5-.9L361 297c14.3-8.7 23-24.2 23-41s-8.7-32.2-23-41L73 39z" />
                            </svg>
                            <span>재생</span>
                          </PlayButton>
                          <ThumbsUp
                            style={{
                              position: "absolute",
                              left: 130,
                              bottom: 26,
                            }}
                            width="30px"
                            height="30px"
                            fill="white"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 512 512"
                          >
                            <path d="M96 191.1H32c-17.67 0-32 14.33-32 31.1v223.1c0 17.67 14.33 31.1 32 31.1h64c17.67 0 32-14.33 32-31.1V223.1C128 206.3 113.7 191.1 96 191.1zM512 227c0-36.89-30.05-66.92-66.97-66.92h-99.86C354.7 135.1 360 113.5 360 100.8c0-33.8-26.2-68.78-70.06-68.78c-46.61 0-59.36 32.44-69.61 58.5c-31.66 80.5-60.33 66.39-60.33 93.47c0 12.84 10.36 23.99 24.02 23.99c5.256 0 10.55-1.721 14.97-5.26c76.76-61.37 57.97-122.7 90.95-122.7c16.08 0 22.06 12.75 22.06 20.79c0 7.404-7.594 39.55-25.55 71.59c-2.046 3.646-3.066 7.686-3.066 11.72c0 13.92 11.43 23.1 24 23.1h137.6C455.5 208.1 464 216.6 464 227c0 9.809-7.766 18.03-17.67 18.71c-12.66 .8593-22.36 11.4-22.36 23.94c0 15.47 11.39 15.95 11.39 28.91c0 25.37-35.03 12.34-35.03 42.15c0 11.22 6.392 13.03 6.392 22.25c0 22.66-29.77 13.76-29.77 40.64c0 4.515 1.11 5.961 1.11 9.456c0 10.45-8.516 18.95-18.97 18.95h-52.53c-25.62 0-51.02-8.466-71.5-23.81l-36.66-27.51c-4.315-3.245-9.37-4.811-14.38-4.811c-13.85 0-24.03 11.38-24.03 24.04c0 7.287 3.312 14.42 9.596 19.13l36.67 27.52C235 468.1 270.6 480 306.6 480h52.53c35.33 0 64.36-27.49 66.8-62.2c17.77-12.23 28.83-32.51 28.83-54.83c0-3.046-.2187-6.107-.6406-9.122c17.84-12.15 29.28-32.58 29.28-55.28c0-5.311-.6406-10.54-1.875-15.64C499.9 270.1 512 250.2 512 227z" />
                          </ThumbsUp>
                        </Buttons>
                        <div>개봉일 : {detailData?.release_date}</div>
                        <div>
                          장르 :{" "}
                          {detailData?.genres.map((genre) => (
                            <span>{genre.name} </span>
                          ))}
                        </div>
                        <div>
                          제작사 : {detailData?.production_companies[0].name}
                        </div>
                        <div> 런타임 : {detailData?.runtime}분</div>
                      </Container>
                    </>
                  )}
                </BigMovie>
              </>
            ) : null}
          </AnimatePresence>
        </Wrapper>
      )}
    </>
  );
}
export default Main;
