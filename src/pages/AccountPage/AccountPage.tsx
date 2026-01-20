import { useState } from "react";
import { Button } from "../../components/ui-components/Button/Button";
import { useQuery } from "@tanstack/react-query";
import { getInfoAuthUser } from "../../api/auth";
import { Loader } from "../../components/ui-components/Loader/Loader";
import { AccountSetting } from "../../components/blocks-components/AccountSetting/AccountSetting";
import { AccountFavoriteFilms } from "../../components/blocks-components/AccountFavoriteFilms/AccountFavoriteFilms";
import { Navigate } from "react-router-dom";
import FavoriteIcon from "../../assets/images/components/favorite-btn-icon.svg?react";
import UserIcon from "../../assets/images/components/header-user-icon.svg?react";
import "./AccountPage.scss";

export const AccountPage = () => {
  const [activeComponent, setActiveComponent] = useState("favorite-films");

  const meQuery = useQuery({
    queryFn: () => getInfoAuthUser(),
    queryKey: ["profile", "me"],
    retry: 0,
  });

  if (meQuery.status === "pending") {
    return <Loader />;
  }

  if (meQuery.status === "error") {
    return (
      <div>
        <span>Произошла ошибка:</span>
        <button onClick={() => meQuery.refetch()}>Повторить запрос</button>
      </div>
    );
  }

  // Если пользователь не авторизован, редирект на главную
  if (!meQuery.data) {
    return <Navigate to="/" replace />;
  }

  return (
    <main className="main">
      <section className="account-page">
        <div className="container">
          <h2 className="account-page__title">Мой аккаунт</h2>
          <div className="account-page__links">
            <div className="account-page__links-item">
              <Button
                kind="secondary"
                type="button"
                className="account-page__btn"
                onClick={() => setActiveComponent("favorite-films")}
              >
                <FavoriteIcon
                  width={24}
                  height={24}
                  className="account-page__icon-favorite"
                />
                <span className="account-page__span-desktop">
                  Избранные фильмы
                </span>
                <span className="account-page__span-mobile">Избранное</span>
              </Button>
            </div>
            <div className="account-page__links-item">
              <Button
                kind="secondary"
                type="button"
                className="account-page__btn"
                onClick={() => setActiveComponent("setting")}
              >
                <UserIcon
                  width={24}
                  height={24}
                  className="account-page__icon-user"
                />
                <span className="account-page__span-desktop">
                  Настройка аккаунта
                </span>
                <span className="account-page__span-mobile">Настройки</span>
              </Button>
            </div>
          </div>
          <div>
            {activeComponent === "favorite-films" && (
              <AccountFavoriteFilms user={meQuery.data} />
            )}
            {activeComponent === "setting" && (
              <AccountSetting user={meQuery.data} />
            )}
          </div>
        </div>
      </section>
    </main>
  );
};
