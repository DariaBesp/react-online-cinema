import type { FC } from "react";
import type { GenresList } from "../../../api/movies";
import { GenresCardBlock } from "../GenresCardBlock/GenresCardBlock";
import { getGenreImage } from "../../../utils/genresImages";
import "./GenresListBlock.scss";

interface GenresBlockProps {
  genresList: GenresList;
}
export const GenresBlock: FC<GenresBlockProps> = ({ genresList }) => {
  return (
    <section className="genres">
      <div className="container">
        <h2 className="genres__title">Жанры фильмов</h2>
        <ul className="genres__list">
          {genresList.map((genre) => (
            <li className="genres__item" key={genre}>
              <GenresCardBlock genre={genre} image={getGenreImage(genre)} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};
