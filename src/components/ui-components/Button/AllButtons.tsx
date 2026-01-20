import { Link } from "react-router-dom";
import "./AllButtons.scss";
import { Button } from "./Button";

import FavoriteIcon from "../../../assets/images/components/favorite-btn-icon.svg?react";
import FavoriteIconFull from "../../../assets/images/components/favorite-icon-full.svg?react";
import RefetchIcon from "../../../assets/images/components/refetch-btn-icon.svg?react";
import type { Movie } from "../../../api/movies";

type TrailerButtonVariant = "main" | "film";
interface TrailerButtonProps {
  onClick?: () => void;
  btnTypeTrailer: TrailerButtonVariant;
}

export const TrailerButton = ({
  onClick,
  btnTypeTrailer,
}: TrailerButtonProps) => {
  return (
    <Button
      kind="primary"
      type="button"
      onClick={onClick}
      className={`btn__trailer btn__trailer--${btnTypeTrailer}`}
    >
      Трейлер
    </Button>
  );
};

export const FavoriteButton = ({
  isFavorite,
  onClick,
}: {
  isFavorite?: boolean;
  onClick?: () => void;
}) => (
  <Button
    kind="tertiary"
    onClick={onClick}
    className="btn__favorite"
    type="button"
  >
    {isFavorite ? (
      <FavoriteIconFull className="button__icon btn__favorite--active" />
    ) : (
      <FavoriteIcon className="button__icon btn__favorite--inactive" />
    )}
  </Button>
);

export const RefreshButton = ({ onClick }: { onClick?: () => void }) => (
  <Button
    kind="tertiary"
    onClick={onClick}
    type="button"
    className="btn__refetch"
  >
    <RefetchIcon />
  </Button>
);

type AboutFilmLinkProps = {
  filmData: Movie;
};

export const AboutFilmLink = ({ filmData }: AboutFilmLinkProps) => (
  <Link
    to={`/movie/${filmData.id}`}
    className="button button--tertiary btn__link-about"
  >
    О фильме
  </Link>
);
