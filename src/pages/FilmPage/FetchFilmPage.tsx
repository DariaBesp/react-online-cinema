import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getInfoFilmId } from "../../api/movies";
import { Loader } from "../../components/ui-components/Loader/Loader";
import { BannerFilm } from "../../components/blocks-components/BannerFilm/BannerFilm";
import { InfoFilmText } from "../../components/blocks-components/InfoFilmText/InfoFilmText";
import { useAddFavoriteFilm } from "../../hooks/useMutateAll";
import { getInfoAuthUser } from "../../api/auth";
import { useState } from "react";
import { AuthForm } from "../../components/modal-components/AuthForm/AuthForm";
import { VideoPlayModal } from "../../components/modal-components/VideoPlayModal/VideoPlayModal";

export const FetchFilmPage = () => {
  const { movieId } = useParams();
  const numberId = Number(movieId);
  const favoriteFilmMutation = useAddFavoriteFilm();

  //состояние для окна авторизации
  const [isAuthModalOpen, setAuthModalOpen] = useState(false);
  console.log("isAuthModalOpen в FetchFilmPage", isAuthModalOpen);

  //состояние для кнопки "like"
  const [isFavorite, setFavorite] = useState(false);
  console.log("состояние для кнопки ", isFavorite);

  //cостояние для проигрывателя плеера
  const [isPlayModalOpen, setPlayModalOpen] = useState(false);

  const isValidId = !isNaN(numberId) && numberId > 0;
  if (!isValidId) {
    return <div>Неверный идентификатор фильма</div>;
  }
  const filmPageQuery = useQuery({
    queryFn: () => getInfoFilmId(numberId),
    queryKey: ["infoFilm", movieId],
    enabled: isValidId,
  });

  const meQuery = useQuery({
    queryFn: () => getInfoAuthUser(),
    queryKey: ["profile", "me"],
    retry: 0,
  });

  if (filmPageQuery.status === "pending") {
    return <Loader />;
  }

  if (filmPageQuery.status === "error") {
    return (
      <div>
        <span>Произошла ошибка:</span>
        <button onClick={() => filmPageQuery.refetch()}>
          Повторить запрос
        </button>
      </div>
    );
  }

  //кликеры кнопок
  const handleTrailerClick = () => {
    console.log("кликнули трейлер");
    setPlayModalOpen(true);
  };

  const handleFavoriteClick = async () => {
    console.log("кликнули по лайку");
    if (!movieId) return;

    if (!meQuery.data && filmPageQuery.status === "success") {
      console.log("клик по условию нет авторизации и фильм загрузился");
      setAuthModalOpen(true);
      return;
    }

    if (
      meQuery.data &&
      filmPageQuery.status === "success" &&
      meQuery.status === "success"
    ) {
      console.log("Добавляем в избранное:", movieId);
      console.log(typeof movieId);
      try {
        await favoriteFilmMutation.mutate(movieId);
        setFavorite((prev) => !prev);
      } catch (error) {
        console.error("Ошибка добавления в избранное:", error);
      }
    }
  };

  return (
    <div>
      <BannerFilm
        filmData={filmPageQuery.data}
        showTrailerButton
        showFavoriteButton
        onTrailerClick={handleTrailerClick}
        onFavoriteClick={handleFavoriteClick}
        isFavorite={isFavorite}
        trailerButtonVariant="film"
      />
      <InfoFilmText filmData={filmPageQuery.data} />
      {isAuthModalOpen && <AuthForm onClose={() => setAuthModalOpen(false)} />}
      {isPlayModalOpen && (
        <VideoPlayModal
          filmData={filmPageQuery.data}
          onClose={() => setPlayModalOpen(false)}
        />
      )}
    </div>
  );
};
