import { type FC } from "react";
import type { MovieList } from "../../../api/movies";
import { FilterByGenreCardFilm } from "../FilterByGenreCardFilm/FilterByGenreCardFilm";
import { Link } from "react-router-dom";
import IconBack from "../../../assets/images/components/icon-back-genres.svg?react";
import "./FilterByGenreListFilms.scss";
import { Button } from "../../ui-components/Button/Button";
import { getBigLetter } from "../../../utils/getBigLetter";

interface FilterByGenreListFilmsProps {
  filteredList: MovieList;
  genre: string;
  count: number;
  onShowMore: () => void;
  isViewBtn: boolean;
}

export const FilterByGenreListFilms: FC<FilterByGenreListFilmsProps> = ({
  filteredList,
  genre,
  onShowMore,
  isViewBtn,
}) => {
  const sortedList = [...filteredList].sort(
    (a, b) => b.tmdbRating - a.tmdbRating
  );
  console.log(sortedList, "cортированный");
  console.log(filteredList);

  return (
    <section className="filter-genre">
      <div className="container">
        <div className="filter-genre__wrapper">
          <Link to={"/genres"} className="filter-genre__link-back">
            <IconBack
              className="filter-genre__icon-back"
              width={40}
              height={40}
            />
            <h2 className="filter-genre__title">{getBigLetter(genre)}</h2>
          </Link>
          <ul className="filter-genre__list">
            {sortedList.map((movie) => (
              <li className="filter-genre__item">
                <FilterByGenreCardFilm movie={movie} />
              </li>
            ))}
          </ul>
          {isViewBtn && (
            <Button
              type="button"
              kind="primary"
              children="Показать еще"
              className="filter-genre__btn"
              onClick={onShowMore}
            />
          )}
        </div>
      </div>
    </section>
  );
};
