import axios from "axios";
import { MovieListSchema, type MovieList } from "./movies";
import { type User } from "./auth";

//Получение избранных фильмов - get
export async function getFavoriteFilms(): Promise<MovieList> {
  try {
    const response = await axios.get<MovieList>(
      "https://cinemaguide.skillbox.cc/favorites",
      { withCredentials: true },
    );
    console.log(response.data);
    return MovieListSchema.parse(response.data);
  } catch (error) {
    throw error;
  }
}

//Добавление фильма в избранное - post
export async function addFavoriteFilm(id: string): Promise<User> {
  const params = new URLSearchParams();
  params.append("id", id);

  const response = await axios.post(
    "https://cinemaguide.skillbox.cc/favorites",
    params.toString(),
    {
      withCredentials: true,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        accept: "application/json",
      },
    },
  );
  console.log("Фильм добавлен в избранное", response.data);
  return response.data;
}

//удаление фильма из избранного - delete
export async function deleteFavoriteFilm(id: string): Promise<User> {
  const response = await axios.delete<User>(
    `https://cinemaguide.skillbox.cc/favorites/${id}`,
    { withCredentials: true },
  );
  console.log("Фильм удален из избранного", response.data);
  return response.data;
}
