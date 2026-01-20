import { Link } from "react-router-dom";
import type { Movie } from "../../../api/movies";
import "./Top10CardFilm.scss";
import type { FC } from "react";

interface CardViewProps {
  number: number;
  movie: Movie;
}

export const Top10CardFilm: FC<CardViewProps> = ({ movie, number }) => {
  return (
    <div className="card-film">
      <span className="card-film__number">{number}</span>
      <Link to={`/movie/${movie.id}`} className="card-film__link">
        <img
          className="card-film__image"
          src={
            movie.posterUrl === null
              ? "https://imgholder.ru/224x336/8493a8/adb9ca&text=There+will+be+poster+:)&font=arial"
              : movie.posterUrl
          }
          alt="Изображение постера фильма"
          height={336}
          width={224}
        />
      </Link>
    </div>
  );
};
