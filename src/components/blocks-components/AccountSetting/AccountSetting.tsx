import type { FC } from "react";
import { logOut, type User } from "../../../api/auth";
import "./AccountSetting.scss";
import { Button } from "../../ui-components/Button/Button";
import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../../../api/queryClient";
import { useNavigate } from "react-router-dom";
import IconEmail from "../../../assets/images/components/icon-form/icon-email.svg?react";
import axios from "axios";

export interface AccountProps {
  user: User;
}

export const AccountSetting: FC<AccountProps> = ({ user }) => {
  const navigate = useNavigate();
  const logoutMutation = useMutation({
    mutationFn: () => logOut(),
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ["profile", "me"],
      });
      navigate("/");
    },
    onError(error: any) {
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        // игнорируем ошибку 401 и редиректим на главную
        navigate("/");
      } else {
        // для других ошибок можно показать уведомление
        alert("Произошла ошибка при выходе");
      }
    },
  });

  return (
    <div className="account-setting">
      <div className="account-setting__wrapper">
        <ul className="account-setting__list">
          <li className="account-setting__item">
            <div className="account-setting__info">
              <span className="account-setting__view-user">
                {user.name.charAt(0).toLocaleUpperCase()}
                {user.surname.charAt(0).toLocaleUpperCase()}
              </span>
              <div className="account-setting__text-block">
                <span className="account-setting__text">Имя Фамилия</span>
                <span className="account-setting__text-data">
                  {user.name} {user.surname}
                </span>
              </div>
            </div>
          </li>
          <li className="account-setting__item">
            <div className="account-setting__info">
              <span className="account-setting__view-icon">
                <IconEmail width={24} hanging={24} />
              </span>
              <div className="account-setting__text-block">
                <span className="account-setting__text">Электронная почта</span>
                <span className="account-setting__text-data">{user.email}</span>
              </div>
            </div>
          </li>
        </ul>
        <Button
          className="account-setting__btn-logout"
          kind="primary"
          type="button"
          isLoading={logoutMutation.isPending}
          onClick={() => logoutMutation.mutate()}
        >
          Выйти из аккаунта
        </Button>
      </div>
    </div>
  );
};
