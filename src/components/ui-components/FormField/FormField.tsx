import { type FC, type ReactNode } from "react";
import "./FormField.scss";

interface IFormFieldProps {
  children: ReactNode;
  errorMessage?: string;
}

export const FormField: FC<IFormFieldProps> = ({ children }) => {
  return <div className="form-field__wrapper">{children}</div>;
};
