import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { TextField } from "../../components/ui-components/Input/Input";
import "./Header.scss";
import { Button } from "../../components/ui-components/Button/Button";
import { SearchResultsByTitle } from "../../hooks/SearchResultsByTitle";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getInfoAuthUser } from "../../api/auth";
import { AuthForm } from "../../components/modal-components/AuthForm/AuthForm";

import LogoWhiteIcon from "../../assets/images/logo/logo-white.svg?react";
import LogoWhiteMobileIcon from "../../assets/images/logo/logo-white-mobile.svg?react";
import IconToGenres from "../../assets/images/components/header-genres-icon.svg?react";
import IconToSearch from "../../assets/images/components/header-search-icon.svg?react";
import IconToUser from "../../assets/images/components/header-user-icon.svg?react";

export const Header = () => {
  const navigate = useNavigate();

  //состояние для окна авторизации
  const [isAuthModalOpen, setAuthModalOpen] = useState(false);

  //cостояние для открытия/закртия строки поиска
  const [isSearchInputOpen, setSearchInputOpen] = useState(false);

  //состояния для строки поиска
  const [searchParams, setsearchParams] = useSearchParams();

  const handleSearchName = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const value = event.target.value;
    const newParams = new URLSearchParams(searchParams);
    newParams.set("searchTitle", value.toLowerCase());
    setsearchParams(newParams);
  };

  const searchTitle = searchParams.get("searchTitle") || "";

  const handleDeleteValue = (): void => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set("searchTitle", "");
    setsearchParams(newParams);
  };

  const meQuery = useQuery({
    queryFn: () => getInfoAuthUser(),
    queryKey: ["profile", "me"],
    retry: 0,
  });

  const handleClick = () => {
    console.log("Клик по кнопке войти");
    if (meQuery.status === "success" && meQuery.data) {
      navigate("/profile");
    }
    if (meQuery.status === "error") {
      setAuthModalOpen(true);
    }
  };

  //открытие строки для поиска
  const handleSearchIconClick = () => {
    setSearchInputOpen(true);
  };

  const hadleCloseInput = () => {
    setSearchInputOpen(false);
  };

  return (
    <header
      className={`header  ${isSearchInputOpen ? "header--search-open" : ""}`}
    >
      <div className="container">
        <div className="header__wrapper">
          <Link to={"/"} className="header__logo-link">
            <LogoWhiteIcon
              className="header__logo logo"
              width={143}
              height={32}
            />
            <LogoWhiteMobileIcon
              className="header__logo--mobile logo"
              width={81}
              height={32}
            />
          </Link>
          <div className="header__wrapper-icons-mobile">
            <nav className="header__nav">
              <ul className="header__nav-list">
                <li className="header__nav-item">
                  <Link to={"/"} className="header__nav-link">
                    <span className="header__nav-span header__nav-span-main">
                      Главная
                    </span>
                  </Link>
                </li>
                <li className="header__nav-item">
                  <Link to={"/genres"} className="header__nav-link">
                    <span className="header__nav-span header__nav-span-genres">
                      Жанры
                    </span>
                    <Button
                      className="header__genres-icon header__btn-mobile"
                      kind="secondary"
                      type="button"
                      children={
                        <IconToGenres
                          width={24}
                          height={24}
                          className="header__nav-icon-genres"
                        />
                      }
                    />
                  </Link>
                </li>
              </ul>
            </nav>
            <div className={"header__search"}>
              <TextField
                className="header__input"
                value={searchTitle}
                onChange={handleSearchName}
                placeholder="Поиск"
                onClose={hadleCloseInput}
                onDelete={handleDeleteValue}
              />
              <div className="header__search-list">
                <SearchResultsByTitle />
              </div>
            </div>
            <Button
              className="header__search-icon header__btn-mobile"
              kind="secondary"
              type="button"
              children={
                <IconToSearch
                  width={24}
                  height={24}
                  className="header__search-icon-svg"
                />
              }
              onClick={handleSearchIconClick}
              aria-label="Открыть поиск"
            />
            <Button
              className="header__btn"
              kind="secondary"
              type="button"
              children={
                meQuery.status === "success" ? meQuery.data?.name : "Войти"
              }
              onClick={handleClick}
            />
            <Button
              className="header__btn-mobile header__btn-user"
              kind="secondary"
              type="button"
              children={
                <IconToUser
                  className="header__icon-user"
                  width={24}
                  height={24}
                />
              }
              onClick={handleClick}
            />
          </div>
          {isAuthModalOpen && (
            <AuthForm onClose={() => setAuthModalOpen(false)} />
          )}
        </div>
      </div>
    </header>
  );
};
