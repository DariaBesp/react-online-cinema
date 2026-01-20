import type { FC } from "react";
import { Link } from "react-router-dom";
import "./GenresCardBlock.scss";
import { getBigLetter } from "../../../utils/getBigLetter";

interface GenresCardBlockProps {
  genre: string;
  image: string;
}

export const GenresCardBlock: FC<GenresCardBlockProps> = ({ genre, image }) => {
  return (
    <div className="card-genre">
      <Link to={`/movie?genre=${genre}`} className="card-genre__link">
        <img
          className="card-genre__image"
          src={image}
          alt="Изображение жанра"
          height={220}
          width={290}
        />
        <span className="card-genre__text">{getBigLetter(genre)}</span>
      </Link>
    </div>
  );
};
