import action from "../assets/images/genres/action.jpg";
import adventure from "../assets/images/genres/adventure.jpg";
import animation from "../assets/images/genres/animation.jpg";
import comedy from "../assets/images/genres/comedy.jpg";
import crime from "../assets/images/genres/crime.jpg";
import documentary from "../assets/images/genres/documentary.jpg";
import drama from "../assets/images/genres/drama.jpg";
import family from "../assets/images/genres/family.jpg";
import fantasy from "../assets/images/genres/fantasy.jpg";
import history from "../assets/images/genres/history.jpg";
import horror from "../assets/images/genres/horror.jpg";
import music from "../assets/images/genres/music.jpg";
import mystery from "../assets/images/genres/mystery.jpg";
import romance from "../assets/images/genres/romance.jpg";
import standUp from "../assets/images/genres/stand-up.jpg";
import thriller from "../assets/images/genres/thriller.jpg";
import war from "../assets/images/genres/war.jpg";
import scifi from "../assets/images/genres/scifi.jpg";
import tvMovie from "../assets/images/genres/tv-movie.jpg";
import western from "../assets/images/genres/western.jpg";
import defaultImage from "../assets/images/genres/default.jpg";

export const genreImages: Record<string, string> = {
  action,
  adventure,
  animation,
  comedy,
  crime,
  documentary,
  drama,
  family,
  fantasy,
  history,
  horror,
  music,
  mystery,
  romance,
  scifi,
  "tv-movie": tvMovie,
  "stand-up": standUp,
  thriller,
  war,
  western,
};

export const getGenreImage = (genre: string) => {
  return genreImages[genre] ?? defaultImage;
};
