import type { Movie } from "../../../api/movies";
import "./BannerFilm.scss";
import RatingIcon from "../../../assets/images/components/rating-star-icon.svg?react";
// import FavoriteIcon from "../../../assets/images/components/favorite-btn-icon.svg?react";
// import FavoriteIconFull from "../../../assets/images/components/favorite-icon-full.svg?react";
// import RefetchIcon from "../../../assets/images/components/refetch-btn-icon.svg?react";
import { getRatingClass } from "../../../utils/getRatingClass";
// import { Button } from "../../ui-components/Button/Button";
// import { Link } from "react-router-dom";
import { getTimeHoursMinutes } from "../../../utils/getTimeHoursMinutes";
import {
  AboutFilmLink,
  FavoriteButton,
  RefreshButton,
  TrailerButton,
} from "../../ui-components/Button/AllButtons";

//модификаторы
type BannerFilmVariant = "default" | "small";
type TrailerButtonVariant = "main" | "film";

export type BannerFilmProps = {
  filmData: Movie;
  variant?: BannerFilmVariant;
  trailerButtonVariant: TrailerButtonVariant;
  //Убрать? запрос сам решает какой фильм передать
  movieId?: number;

  showTrailerButton?: boolean;
  showFavoriteButton?: boolean;
  showRefreshButton?: boolean;
  showLinkAboutFilm?: boolean;

  isFavorite?: boolean;

  onTrailerClick?: () => void;
  onFavoriteClick?: () => void;
  onRefreshClick?: () => void;
};

export const BannerFilm = ({
  filmData,
  variant,
  showTrailerButton,
  showFavoriteButton,
  showRefreshButton,
  showLinkAboutFilm,
  onTrailerClick,
  onFavoriteClick,
  onRefreshClick,
  isFavorite,
  trailerButtonVariant,
}: BannerFilmProps) => {
  return (
    <section className={`banner-film banner-film--${variant}`}>
      <div className="container">
        <h1 className="visually-hidden">Маруся - онлайн кинотеатр</h1>
        <div className="banner-film__wrapper">
          <div className="banner-film__info-wrapper">
            <div className="banner-film__info">
              <div className="banner-film__header">
                <div
                  className={`banner-film__rating banner-film__${getRatingClass(
                    filmData.tmdbRating,
                  )} `}
                >
                  <RatingIcon
                    className="banner-film__rating-icon"
                    width={16}
                    height={16}
                  />
                  <span className="banner-film__rating-text">
                    {filmData.tmdbRating}
                  </span>
                </div>
                <span className="banner-film__releaseYear">
                  {filmData.releaseYear}
                </span>
                <span className="banner-film__genre">{filmData.genres[0]}</span>
                <span className="banner-film__runtime">
                  {getTimeHoursMinutes(filmData.runtime)}
                </span>
              </div>
              <div className="banner-film__description">
                <h2 className="banner-film__title">{filmData.title}</h2>
                <p className="banner-film__plot">{filmData.plot}</p>
              </div>
            </div>
            <div className="banner-film__buttons">
              {showTrailerButton && (
                <TrailerButton
                  btnTypeTrailer={trailerButtonVariant}
                  onClick={onTrailerClick}
                />
              )}
              <div className="banner-film__small-buttons">
                {showLinkAboutFilm && <AboutFilmLink filmData={filmData} />}
                {showFavoriteButton && (
                  <FavoriteButton
                    onClick={onFavoriteClick}
                    isFavorite={isFavorite}
                  />
                )}
                {showRefreshButton && (
                  <RefreshButton onClick={onRefreshClick} />
                )}
              </div>
            </div>
          </div>
          <div className="banner-film__image-wrapper">
            <img
              className="banner-film__image"
              height={552}
              width={680}
              src={
                filmData.posterUrl === null
                  ? "https://imgholder.ru/680x552&text=https://imgholder.ru/680x552&text=The+poster+will+appear+later+:)&font=arial&font=arial"
                  : filmData.posterUrl
              }
              alt="Изображение постера фильма"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
