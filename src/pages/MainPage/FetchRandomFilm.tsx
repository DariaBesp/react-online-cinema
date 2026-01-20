import { useQuery } from "@tanstack/react-query";
import { getRandomFilm } from "../../api/movies";
import { Loader } from "../../components/ui-components/Loader/Loader";
import { BannerFilm } from "../../components/blocks-components/BannerFilm/BannerFilm";
import { useAddFavoriteFilm } from "../../hooks/useMutateAll";
import { getInfoAuthUser } from "../../api/auth";
import { useState } from "react";
import { AuthForm } from "../../components/modal-components/AuthForm/AuthForm";
import { VideoPlayModal } from "../../components/modal-components/VideoPlayModal/VideoPlayModal";

//можно оптимизировать эту функцию, убрать randomFilmQuery
export const FetchRandomFilm = () => {
  const favoriteFilmMutation = useAddFavoriteFilm();
  //состояние для окна авторизации
  const [isAuthModalOpen, setAuthModalOpen] = useState(false);
  console.log("isAuthModalOpen в FetchRandom", isAuthModalOpen);

  //cостояние для проигрывателя плеера
  const [isPlayModalOpen, setPlayModalOpen] = useState(false);

  //состояние для кнопки "like"
  const [isFavorite, setFavorite] = useState(false);
  console.log("состояние для кнопки ", isFavorite);

  //запрос рандомного фильма
  const randomFilmQuery = useQuery({
    queryFn: getRandomFilm,
    queryKey: ["randomFilm"],
  });

  const meQuery = useQuery({
    queryFn: () => getInfoAuthUser(),
    queryKey: ["profile", "me"],
    retry: 0,
  });

  if (randomFilmQuery.status === "pending") {
    return <Loader />;
  }

  if (randomFilmQuery.status === "error") {
    return (
      <div>
        <span>Произошла ошибка:</span>
        <button onClick={() => randomFilmQuery.refetch()}>
          Повторить запрос
        </button>
      </div>
    );
  }

  const handleFavoriteClick = async () => {
    //если нет авторизации и фильм загрузился
    if (!meQuery.data && randomFilmQuery.status === "success") {
      console.log("клик по условию нет авторизации и фильм загрузился");
      setAuthModalOpen(true);
      return;
    }

    if (meQuery.data && randomFilmQuery.status === "success") {
      const idMovie = String(randomFilmQuery.data?.id);

      try {
        await favoriteFilmMutation.mutate(idMovie);
        setFavorite((prev) => !prev);
      } catch (error) {
        console.error("Ошибка добавления в избранное:", error);
      }
    }
  };

  const handleTrailerClick = () => {
    setPlayModalOpen(true);
  };

  const handleRefreshClick = () => {
    randomFilmQuery.refetch();
  };

  return (
    <>
      <BannerFilm
        filmData={randomFilmQuery.data}
        showTrailerButton
        showLinkAboutFilm
        showFavoriteButton
        showRefreshButton
        onTrailerClick={handleTrailerClick}
        onFavoriteClick={handleFavoriteClick}
        onRefreshClick={handleRefreshClick}
        isFavorite={isFavorite}
        trailerButtonVariant="main"
      />
      {isAuthModalOpen && <AuthForm onClose={() => setAuthModalOpen(false)} />}
      {isPlayModalOpen && (
        <VideoPlayModal
          filmData={randomFilmQuery.data}
          onClose={() => setPlayModalOpen(false)}
        />
      )}
    </>
  );
};
