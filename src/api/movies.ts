import axios from "axios";
import { z } from "zod";

export const MovieSchema = z.object({
  id: z.number(),
  title: z.string(),
  originalTitle: z.string(),
  language: z.string(),
  releaseYear: z.number(),
  releaseDate: z.string().nullable(),
  genres: z.array(z.string()),
  plot: z.string(),
  runtime: z.number(),
  budget: z.string().nullable(),
  revenue: z.string().nullable(),
  homepage: z.string(),
  status: z.string(),
  posterUrl: z.string().optional().nullable(),
  backdropUrl: z.string().optional().nullable(),
  trailerUrl: z.string().optional(),
  trailerYoutubeId: z.string().optional(),
  tmdbRating: z.number(),
  searchL: z.string(),
  keywords: z.array(z.string()),
  countriesOfOrigin: z.array(z.string()),
  languages: z.array(z.string()),
  cast: z.array(z.string()),
  director: z.string().nullable(),
  production: z.string().nullable(),
  awardsSummary: z.string().nullable(),
});

export const MovieListSchema = z.array(MovieSchema);
export const GenresListSсhema = z.array(z.string());

export type Movie = z.infer<typeof MovieSchema>;
export type MovieList = z.infer<typeof MovieListSchema>;
export type GenresList = z.infer<typeof GenresListSсhema>;

//запрос на рандомный фильм
export async function getRandomFilm(): Promise<Movie> {
  try {
    const response = await axios.get<Movie>(
      "https://cinemaguide.skillbox.cc/movie/random",
    );
    return MovieSchema.parse(response.data);
  } catch (error) {
    console.error(error);
    throw error;
  }
}

//запрос на 10фильмов
export async function getTop10Films(): Promise<MovieList> {
  try {
    const response = await axios.get<MovieList>(
      "https://cinemaguide.skillbox.cc/movie/top10",
    );
    const validated = MovieListSchema.parse(response.data);
    return validated;
  } catch (error) {
    throw error;
  }
}

//запрос на жанры
export async function getGenres(): Promise<GenresList> {
  try {
    const response = await axios.get<GenresList>(
      "https://cinemaguide.skillbox.cc/movie/genres",
    );
    return GenresListSсhema.parse(response.data);
  } catch (error) {
    throw error;
  }
}

//фильтрация по жанру (чтобы получить полное число фильмов)
export async function getFilterGenre(genre: string | null): Promise<MovieList> {
  try {
    const response = await axios.get<MovieList>(
      `https://cinemaguide.skillbox.cc/movie?genre=${genre}`,
    );
    console.log(response.data);
    const validated = MovieListSchema.parse(response.data);
    return validated;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

//фильтрация по жанру и количеству
export async function getFilterGenreCount(
  genre: string | null,
  count: number,
): Promise<MovieList> {
  try {
    const response = await axios.get<MovieList>(
      `https://cinemaguide.skillbox.cc/movie?genre=${genre}&count=${count}`,
    );
    console.log(response.data);
    const validated = MovieListSchema.parse(response.data);
    return validated;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

//фильтрация по title
export async function getFilterTitle(title: string | null): Promise<MovieList> {
  try {
    const response = await axios.get<MovieList>(
      `https://cinemaguide.skillbox.cc/movie?count=5&title=${title}`,
    );
    console.log(response.data);
    const validated = MovieListSchema.parse(response.data);
    return validated;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

//получение инфо фильм по id
export async function getInfoFilmId(movieId: number): Promise<Movie> {
  console.log("Вызов getInfoFilmId");

  try {
    const response = await axios.get<Movie>(
      `https://cinemaguide.skillbox.cc/movie/${movieId}`,
    );
    const validated = MovieSchema.parse(response.data);
    return validated;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
