import type { FC } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { registerUser } from "../../../api/auth";
import { queryClient } from "../../../api/queryClient";
import { Button } from "../../ui-components/Button/Button";
import IconEmail from "../../../assets/images/components/icon-form/icon-email.svg?react";
import IconKey from "../../../assets/images/components/icon-form/icon-key.svg?react";
import IconPeople from "../../../assets/images/components/icon-form/icon-people.svg?react";

import "./RegisterForm.scss";

const registerSchema = z
  .object({
    email: z.string().email("Введите корректный формат электронной почты"),
    password: z.string().min(6, "Не менее 6 символов"),
    confirmPassword: z.string(),
    name: z.string().min(2, "Не менее 2 символов"),
    surname: z.string().min(2, "Не менее 2 символов"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Пароли не совпадают",
    path: ["confirmPassword"],
  });

type registerForm = z.infer<typeof registerSchema>;

export interface IRegisterFormProps {
  onClose?: () => void;
  onSuccess?: () => void;
}

export const RegisterForm: FC<IRegisterFormProps> = ({ onSuccess }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<registerForm>({
    resolver: zodResolver(registerSchema),
  });

  const registerMutation = useMutation({
    mutationFn: registerUser,
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["register"] });
      if (onSuccess) {
        onSuccess();
      }
    },
  });

  return (
    <form
      className="register-form"
      onSubmit={handleSubmit(({ email, password, name, surname }) => {
        registerMutation.mutate({ email, password, name, surname });
      })}
    >
      <div className="register-form__wrapper-input">
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
          />{" "}
          <span className="form-field__icon">
            <IconEmail width={24} height={24} />
          </span>
        </div>

        {/* Поле Имя */}
        <div
          className={`form-field ${errors.name ? "form-field--error" : " "}`}
        >
          <input
            className="form-field__input"
            type="text"
            placeholder="Имя"
            {...register("name")}
          />
          <span className="form-field__icon">
            <IconPeople width={24} height={24} />
          </span>
        </div>

        {/* Поле Фамилия*/}
        <div
          className={`form-field ${errors.surname ? "form-field--error" : " "}`}
        >
          <input
            className="form-field__input"
            type="text"
            placeholder="Фамилия"
            {...register("surname")}
          />
          <span className="form-field__icon">
            <IconPeople width={24} height={24} />
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

        {/* Поле подвердите Пароль */}
        <div
          className={`form-field ${
            errors.confirmPassword ? "form-field--error" : " "
          }`}
        >
          <input
            className="form-field__input"
            type="password"
            placeholder="Подтвердите пароль"
            {...register("confirmPassword")}
          />
          <span className="form-field__icon">
            <IconKey width={24} height={24} />
          </span>
        </div>
      </div>
      <Button
        isLoading={registerMutation.isPending}
        kind="primary"
        type="submit"
        className="register-form__button"
      >
        Создать аккаунт
      </Button>
      {registerMutation.error && (
        <div>Произошла ошибка:{registerMutation.error?.message}</div>
      )}
    </form>
  );
};
