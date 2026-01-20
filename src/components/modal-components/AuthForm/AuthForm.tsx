import { useState, type FC } from "react";
import LogoBlackIcon from "../../../assets/images/logo/logo-black.svg?react";

import { Button } from "../../ui-components/Button/Button";
import { LoginForm } from "../LoginForm/LoginForm";
import { RegisterForm } from "../RegisterForm/RegisterForm";
import "./AuthForm.scss";
import CloseIconModal from "../../../assets/images/components/icon-close-modal.svg?react";

interface IAuthFormProps {
  onClose?: () => void;
}

export const AuthForm: FC<IAuthFormProps> = ({ onClose }) => {
  const [authType, setAuthType] = useState<string>("auth");
  const [isRegisterSuccess, setIsRegisterSuccess] = useState<boolean>(false);

  const handleClick = () => {
    setAuthType((prevState) => (prevState === "auth" ? "register" : "auth"));
  };

  const handleRegisterClick = () => {
    setIsRegisterSuccess(true);
    setAuthType("auth");
  };

  if (isRegisterSuccess) {
    return (
      <div className="auth-form">
        <div className="auth-form__content">
          <button className="auth-form__btn-close" onClick={onClose}>
            <CloseIconModal
              className="auth-form__icon-close"
              width={24}
              height={24}
            />
          </button>
          <LogoBlackIcon
            className="auth-form__logo logo "
            width={133}
            height={30}
          />
          <p className="auth-form__title">Регистрация завершена</p>
          <span className="auth-form__span">
            Используйте вашу электронную почту для входа
          </span>
          <Button
            className="auth-form__btn-success"
            kind="primary"
            type="button"
            onClick={() => {
              setAuthType("auth");
              setIsRegisterSuccess(false);
            }}
          >
            Войти
          </Button>
        </div>
      </div>
    );
  }
  return (
    <div className="auth-form">
      <div className="auth-form__content">
        <button className="auth-form__btn-close" onClick={onClose}>
          <CloseIconModal
            className="auth-form__icon-close"
            width={24}
            height={24}
          />
        </button>
        <div className="auth-form__form-inner">
          <LogoBlackIcon
            className="auth-form__logo logo "
            width={133}
            height={30}
          />
          <p className="auth-form__title">
            {authType === "auth" ? "" : "Регистрация"}
          </p>
          {authType === "auth" ? (
            <LoginForm onClose={onClose} />
          ) : (
            <RegisterForm onClose={onClose} onSuccess={handleRegisterClick} />
          )}
          <Button
            kind="secondary"
            type="button"
            className="auth-form__button-toggle"
            children={
              authType === "auth" ? "Регистрация" : "У меня есть пароль"
            }
            onClick={handleClick}
          />
        </div>
      </div>
    </div>
  );
};
