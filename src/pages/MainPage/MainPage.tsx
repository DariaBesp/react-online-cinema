import { FetchRandomFilm } from "./FetchRandomFilm";
import { FetchTop10Films } from "./FetchTop10Films";

export const MainPage = () => {
  return (
    <main className="main">
      {/* Вызывает рандомный фильм */}
      <FetchRandomFilm />
      {/* Вызывает топ 10 фильмов */}
      <FetchTop10Films />
    </main>
  );
};
