import type { MovieList } from "../../../api/movies";
import type { FC } from "react";
import "./FilterByTitleListFilms.scss";
import { SearchCardFilm } from "../SearchCardFilm/SearchCardFilm";

interface FilterByTitleListFilmsProps {
  filteredList: MovieList;
}

export const FilterByTitleListFilms: FC<FilterByTitleListFilmsProps> = ({
  filteredList,
}) => {
  return (
    <div className="filter-title">
      <ul className="filter-title__list">
        {filteredList.map((movie) => (
          <li key={movie.id} className="filter-title__item">
            <SearchCardFilm movie={movie} />
          </li>
        ))}
      </ul>
    </div>
  );
};
