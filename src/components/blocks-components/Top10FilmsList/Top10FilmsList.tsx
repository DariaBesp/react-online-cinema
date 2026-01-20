import type { FC } from "react";
import type { MovieList } from "../../../api/movies";
import "./Top10FilmsList.scss";
import { Top10CardFilm } from "../Top10CardFilm/Top10CardFilm";

interface Top10FilmsProps {
  listFilms: MovieList;
}

export const Top10FilmsList: FC<Top10FilmsProps> = ({ listFilms }) => {
  return (
    <section className="top-films">
      <div className="container">
        <div className="top-films__wrapper">
          <h2 className="top-films__title">Топ 10 фильмов</h2>
          <ul className="top-films__list">
            {listFilms.map((film, index) => (
              <li key={film.id} className="top-films__item">
                <Top10CardFilm movie={film} number={index + 1} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};
