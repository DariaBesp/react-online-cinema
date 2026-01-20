import type { Movie } from "../../../api/movies";
import "./VideoPlayModal.scss";
import ReactPlayer from "react-player";
import CloseIconModal from "../../../assets/images/components/icon-close-modal.svg?react";

type VideoPlayModalProps = {
  filmData: Movie;
  onClose?: () => void;
};

export const VideoPlayModal = ({ filmData, onClose }: VideoPlayModalProps) => {
  return (
    <div className="video-play">
      <div className="video-play__content">
        <button className="video-play__btn-close" onClick={onClose}>
          <CloseIconModal
            className="video-play__icon-close"
            width={24}
            height={24}
          />
        </button>

        <ReactPlayer
          src={filmData.trailerUrl}
          width="100%"
          height="100%"
          playing
        />
        <span className="video-play__title">{filmData.title}</span>
      </div>
    </div>
  );
};
