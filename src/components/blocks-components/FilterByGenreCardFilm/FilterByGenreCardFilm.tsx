import { Link } from "react-router-dom";
import type { Movie } from "../../../api/movies";
import type { FC } from "react";
import "./FilterByGenreCardFilm.scss";

interface FilterByGenreCardFilmProps {
  movie: Movie;
}

export const FilterByGenreCardFilm: FC<FilterByGenreCardFilmProps> = ({
  movie,
}) => {
  return (
    <div className="card-film-genre">
      <Link to={`/movie/${movie.id}`} className="card-film-genre__link">
        <img
          className="card-film-genre__image"
          src={
            movie.posterUrl === null
              ? "https://imgholder.ru/224x336/8493a8/adb9ca&text=There+will+be+poster+:)&font=arial"
              : movie.posterUrl
          }
          alt="Постер фильма"
          height={336}
          width={224}
        />
      </Link>
    </div>
  );
};
