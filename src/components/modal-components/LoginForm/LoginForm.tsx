import { zodResolver } from "@hookform/resolvers/zod";
import type { FC } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "../../ui-components/Button/Button";
import { useMutation } from "@tanstack/react-query";
import { logIn } from "../../../api/auth";
import { queryClient } from "../../../api/queryClient";
import { Loader } from "../../ui-components/Loader/Loader";
import IconEmail from "../../../assets/images/components/icon-form/icon-email.svg?react";
import IconKey from "../../../assets/images/components/icon-form/icon-key.svg?react";
import "./LoginForm.scss";

const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6, "Не менее 6 символов"),
});

interface ILoginFormProps {
  onClose?: () => void;
}

type LoginForm = z.infer<typeof LoginSchema>;

export const LoginForm: FC<ILoginFormProps> = ({ onClose }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    resolver: zodResolver(LoginSchema),
  });

  const loginMutation = useMutation(
    {
      mutationFn: logIn,
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["profile", "me"],
        });
        if (onClose) {
          onClose();
        }
      },
    },
    queryClient,
  );

  return (
    <form
      className="login-form"
      onSubmit={handleSubmit(({ email, password }) => {
        loginMutation.mutate({ email, password });
      })}
    >
      <div className="login-form__wrapper-input">
        <div
          className={`form-field ${errors.email ? "form-field--error" : " "}`}
        >
          <input
            className="form-field__input"
            type="email"
            placeholder={`${
              errors.email ? "sample@domain.ru" : "Электронная почта"
            }`}
            {...register("email")}
          />
          <span className="form-field__icon">
            <IconEmail width={24} height={24} />
          </span>
        </div>
        {/* Поле Пароль */}
        <div
          className={`form-field ${
            errors.password ? "form-field--error" : " "
          }`}
        >
          <input
            className="form-field__input"
            type="password"
            placeholder="Пароль"
            {...register("password")}
          />
          <span className="form-field__icon">
            <IconKey width={24} height={24} />
          </span>
        </div>
      </div>

      <Button
        kind="primary"
        type="submit"
        className="login-form__button"
        isLoading={loginMutation.isPending}
      >
        Войти
      </Button>
      {loginMutation.isPending && (
        <div>
          <Loader />
        </div>
      )}
      {loginMutation.error && (
        <div>Произошла ошибка:{loginMutation.error?.message}</div>
      )}
    </form>
  );
};
