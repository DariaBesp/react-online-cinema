import type { Movie } from "../../../api/movies";
import "./InfoFilmText.scss";

type InfoFilmTextProps = {
  filmData: Movie;
};

export const InfoFilmText = ({ filmData }: InfoFilmTextProps) => {
  return (
    <section className="info-film">
      <div className="container">
        <h2 className="info-film__title">О фильме</h2>
        <ul className="info-film__list">
          {filmData.language && (
            <li className="info-film__item">
              <div className="info-film__line">
                <div className="info-film__description">
                  <span className="info-film__description-text">
                    Original language
                  </span>
                  <div className="info-film__border"></div>
                </div>
                <span className="info-film__data">{filmData.language}</span>
              </div>
            </li>
          )}

          {filmData.budget && (
            <li className="info-film__item">
              <div className="info-film__line">
                <div className="info-film__description">
                  <span className="info-film__description-text">Budget</span>
                  <div className="info-film__border"></div>
                </div>
                <span className="info-film__data">{filmData.budget} eur</span>
              </div>
            </li>
          )}

          {filmData.revenue && (
            <li className="info-film__item">
              <div className="info-film__line">
                <div className="info-film__description">
                  <span className="info-film__description-text">Revenue</span>
                  <div className="info-film__border"></div>
                </div>
                <span className="info-film__data">{filmData.revenue} eur</span>
              </div>
            </li>
          )}

          {filmData.director && (
            <li className="info-film__item">
              <div className="info-film__line">
                <div className="info-film__description">
                  <span className="info-film__description-text">Director</span>
                  <div className="info-film__border"></div>
                </div>
                <span className="info-film__data">{filmData.director}</span>
              </div>
            </li>
          )}

          {filmData.production && (
            <li className="info-film__item">
              <div className="info-film__line">
                <div className="info-film__description">
                  <span className="info-film__description-text">
                    Production
                  </span>
                  <div className="info-film__border"></div>
                </div>
                <span className="info-film__data">{filmData.production}</span>
              </div>
            </li>
          )}

          {filmData.awardsSummary && (
            <li className="info-film__item">
              <div className="info-film__line">
                <div className="info-film__description">
                  <span className="info-film__description-text">Awards</span>
                  <div className="info-film__border"></div>
                </div>
                <span className="info-film__data">
                  {filmData.awardsSummary}
                </span>
              </div>
            </li>
          )}
        </ul>
      </div>
    </section>
  );
};
