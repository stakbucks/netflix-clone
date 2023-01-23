import { json } from "stream/consumers";

const API_KEY = "81a6c47e8b449949bd833c045f5b7ee9";

export interface IMovie {
  id: number;
  backdrop_path: string;
  title: string;
  overview: string;
  vote_average: number;
  poster_path: string;
  release_date: string;
}

export interface IGetMovies {
  page: number;
  results: IMovie[];
}

export interface IGetDetail {
  backdrop_path: string;
  id: string;
  genres: {
    id: number;
    name: string;
  }[];
  production_companies: {
    name: string;
  }[];
  release_date: string;
  runtime: number;
  poster_path: string;
  vote_average: number;
  title: string;
}

export function getMovies() {
  return fetch(
    `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`
  ).then((response) => response.json());
}

export function getDetail(movieId?: string) {
  return fetch(
    `https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}`
  ).then((response) => response.json());
}

export function getLatest() {
  return fetch(
    `https://api.themoviedb.org/3/tv/100088/similar?api_key=${API_KEY}`
  ).then((response) => response.json());
}
export function getRec() {
  return fetch(
    `https://api.themoviedb.org/3/movie/76600/similar?api_key=${API_KEY}`
  ).then((response) => response.json());
}

export interface ISeries {
  id: number;
  backdrop_path: string;
  name: string;
  overview: string;
  poster_path: string;
}

export interface IGetSeries {
  page: number;
  results: ISeries[];
}
export interface IGetSeriesDetail {
  backdrop_path: string;
  id: string;
  genres: {
    name: string;
  }[];
  production_companies: {
    name: string;
  }[];
  first_air_date: string;
  episode_runtime: number;
  poster_path: string;
  vote_average: number;
  original_name: string;
}

export function getSeries() {
  return fetch(
    `https://api.themoviedb.org/3/tv/popular?api_key=${API_KEY}`
  ).then((response) => response.json());
}

export function getSeriesDetail(seriesId?: string) {
  return fetch(
    `https://api.themoviedb.org/3/tv/${seriesId}?api_key=${API_KEY}`
  ).then((response) => response.json());
}
export function getSeriesLatest() {
  return fetch(
    `https://api.themoviedb.org/3/tv/100088/recommendations?api_key=${API_KEY}`
  ).then((response) => response.json());
}
export function getSeriesRec() {
  return fetch(
    `https://api.themoviedb.org/3/tv/top_rated?api_key=${API_KEY}`
  ).then((response) => response.json());
}
