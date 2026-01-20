import "./Footer.scss";
import "../../styles/components/socials.scss";
import { Link } from "react-router-dom";
import IconVk from "../../assets/images/social/vk-icon.svg?react";
import IconYoutube from "../../assets/images/social/youtube-icon.svg?react";
import IconOk from "../../assets/images/social/ok-icon.svg?react";
import IconTg from "../../assets/images/social/tg-icon.svg?react";

export const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <ul className="socials footer__socials">
          <li className="socials__item">
            <Link to={""} className="socials__link">
              <IconVk
                className="socials__icon socials__icon-vk"
                width={19}
                height={10}
              />
            </Link>
          </li>
          <li className="socials__item">
            <Link to={""} className="socials__link">
              <IconYoutube
                className="socials__icon socials__icon-youtube"
                width={16}
                height={11}
              />
            </Link>
          </li>
          <li className="socials__item">
            <Link to={""} className="socials__link">
              <IconOk
                className="socials__icon socials__icon-ok"
                width={11}
                height={18}
              />
            </Link>
          </li>
          <li className="socials__item">
            <Link to={""} className="socials__link">
              <IconTg
                className="socials__icon socials__icon-tg"
                width={17}
                height={14}
              />
            </Link>
          </li>
        </ul>
      </div>
    </footer>
  );
};
