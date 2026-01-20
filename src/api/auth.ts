import axios from "axios";
import { z } from "zod";

export const UserSchema = z.object({
  name: z.string(),
  surname: z.string(),
  email: z.string(),
  favorites: z.array(z.string()),
});

export type User = z.infer<typeof UserSchema>;

//Получение данных о текущем авторизованном пользователе
export async function getInfoAuthUser(): Promise<User> {
  const response = await axios.get<User>(
    "https://cinemaguide.skillbox.cc/profile",
    { withCredentials: true },
  );
  console.log(response.data);
  return UserSchema.parse(response.data);
}

//регистрация
export async function registerUser(data: {
  email: string;
  password: string;
  name: string;
  surname: string;
}): Promise<void> {
  const response = await axios.post(
    "https://cinemaguide.skillbox.cc/user",
    data,
    { withCredentials: true },
  );
  console.log("Регистрация прошла успешно", response.data);
  return response.data;
}

//авторизация - logIn - POST
export async function logIn(data: {
  email: string;
  password: string;
}): Promise<void> {
  const response = await axios.post(
    "https://cinemaguide.skillbox.cc/auth/login",
    data,
    { withCredentials: true },
  );
  console.log("Вход (логин) успешно произведен", response.data);
  return response.data;
}

//выход из аккаунута - logOut - get
export async function logOut() {
  const response = await axios.get(
    "https://cinemaguide.skillbox.cc/auth/logout",
    { withCredentials: true },
  );
  return response;
}
