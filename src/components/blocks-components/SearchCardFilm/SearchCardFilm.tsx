import type { FC } from "react";
import type { Movie } from "../../../api/movies";
import { Link } from "react-router-dom";
import { getRatingClass } from "../../../utils/getRatingClass";
import { getTimeHoursMinutes } from "../../../utils/getTimeHoursMinutes";
import RatingIcon from "../../../assets/images/components/rating-star-icon.svg?react";
import "./SearchCardFilm.scss";

interface SearchCardFilmProps {
  movie: Movie;
}

export const SearchCardFilm: FC<SearchCardFilmProps> = ({ movie }) => {
  return (
    <Link to={`/movie/${movie.id}`} className="card-film-search">
      <img
        className="card-film-search__image"
        src={
          movie.posterUrl === null
            ? "https://imgholder.ru/40x52/8493a8/adb9ca&text=IMAGE+HOLDER&font=arial"
            : movie.posterUrl
        }
        alt="Постер фильма"
        height={52}
        width={40}
      />

      <div className="card-film-search__info-wrapper">
        <div className="card-film-search__header">
          <div
            className={`card-film-search__rating card-film-search__${getRatingClass(
              movie.tmdbRating,
            )} `}
          >
            <RatingIcon
              className="card-film-search__rating-icon"
              width={10}
              height={10}
            />
            <span className="card-film-search__rating-text">
              {movie.tmdbRating}
            </span>
          </div>
          <span className="card-film-search__releaseYear">
            {movie.releaseYear}
          </span>
          <span className="card-film-search__genre">{movie.genres[0]}</span>
          <span className="card-film-search__runtime">
            {getTimeHoursMinutes(movie.runtime)}
          </span>
        </div>
        <h2 className="card-film-search__title">{movie.title}</h2>
      </div>
    </Link>
  );
};
