import type { FC } from "react";
import type { AccountProps } from "../AccountSetting/AccountSetting";
import { useQuery } from "@tanstack/react-query";
import { getFavoriteFilms } from "../../../api/favorites";
import { Loader } from "../../ui-components/Loader/Loader";
import { useDeleteFavoriteFilm } from "../../../hooks/useMutateAll";
import type { Movie } from "../../../api/movies";
import { AccountFavoriteCardFilm } from "../AccountFavoriteCardFilm/AccountFavoriteCardFilm";
import "./AccountFavoriteFilms.scss";

//получаю данные о пользователе и внутри получаю список фильмов по запросу favorites
export const AccountFavoriteFilms: FC<AccountProps> = ({ user }) => {
  const favoritesFilmsQuery = useQuery({
    queryFn: () => getFavoriteFilms(),
    queryKey: ["favorites"],
  });

  const deleteFilmMutation = useDeleteFavoriteFilm();

  //обработчик на buttonClose
  const deleteFavoriteFilm = (movie: Movie) => {
    deleteFilmMutation.mutate(String(movie.id));
  };

  if (favoritesFilmsQuery.isPending) {
    return <Loader />;
  }

  if (favoritesFilmsQuery.isError) {
    return (
      <div>
        <span>Произошла ошибка:</span>
        <button onClick={() => favoritesFilmsQuery.refetch()}>
          Повторить запрос
        </button>
      </div>
    );
  }

  return (
    <div className="favorite-films">
      <div className="favorite-films__wrapper">
        <ul className="favorite-films__list">
          {favoritesFilmsQuery.data.map((film) => (
            <li key={film.id} className="favorite-films__item">
              <AccountFavoriteCardFilm
                movie={film}
                onClose={deleteFavoriteFilm}
              />
            </li>
          ))}
        </ul>
        {favoritesFilmsQuery.data.length === 0 && (
          <span>Избранных фильмов нет</span>
        )}
      </div>
    </div>
  );
};
