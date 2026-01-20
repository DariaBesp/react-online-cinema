import type { FC } from "react";
import type { Movie } from "../../../api/movies";
import { Link } from "react-router-dom";
import CloseIcon from "../../../assets/images/components/icon-close-favorite-card.svg?react";
import "./AccountFavoriteCardFilm.scss";

interface AccountFavoriteCardFilmProps {
  movie: Movie;
  onClose: (movie: Movie) => void;
}

export const AccountFavoriteCardFilm: FC<AccountFavoriteCardFilmProps> = ({
  movie,
  onClose,
}) => {
  return (
    <div className="card-film-favorite">
      <button
        className="card-film-favorite__btn"
        onClick={() => onClose(movie)}
      >
        <CloseIcon
          className="card-film-favorite__icon-close"
          width={24}
          height={24}
        />
      </button>
      <Link to={`/movie/${movie.id}`} className="card-film-favorite__link">
        <img
          className="card-film-favorite__image"
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
