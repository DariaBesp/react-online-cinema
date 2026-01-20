import type { HTMLAttributes } from "react";
import { Loader } from "../Loader/Loader";
import "./Button.scss";

//типы кнопок по стилю сортировка
//1 - secondary прозрачные -  войти - тип - баттон
//2 - "Primary" - голубые с круглениями - трейлер
//3- tertiary - /о фильме/лайк/обновить - серые

interface IButtonProps extends HTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  isDisabled?: boolean;
  kind: "primary" | "secondary" | "tertiary";
  type: "submit" | "reset" | "button";
  children?: React.ReactNode;
  className?: string;
}

export const Button = ({
  isLoading,
  isDisabled,
  kind,
  children,
  type,
  className,
  ...props
}: IButtonProps) => {
  const buttonClasses = `button button--${kind} ${className || ""}`.trim();
  return (
    <button
      disabled={isDisabled}
      type={type}
      className={buttonClasses}
      data-kind={kind}
      {...props}
    >
      {isLoading ? <Loader /> : children}
    </button>
  );
};
