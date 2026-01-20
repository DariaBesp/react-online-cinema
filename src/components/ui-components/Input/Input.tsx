import LoupeIcon from "../../../assets/images/components/loupe-icon.svg?react";
import CloseIcon from "../../../assets/images/components/icon-close-input-search.svg?react";
import DeleteIcon from "../../../assets/images/components/search-icon-delete.svg?react";
import "./Input.scss";

type TextFieldProps = {
  value: string | undefined;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  placeholder?: string;
  className?: string;
  onClose: () => void;
  onDelete: () => void;
};

export const TextField = ({
  value,
  onChange,
  disabled,
  placeholder,
  className,
  onClose,
  onDelete,
}: TextFieldProps) => {
  const inputClasses = `custom-input ${className || ""}`.trim();
  return (
    <div className={inputClasses}>
      <LoupeIcon className="custom-input__loupe-icon" width={24} height={24} />
      <input
        className="custom-input__field"
        type="search"
        name="search"
        value={value}
        onChange={onChange}
        disabled={disabled}
        placeholder={placeholder}
      />
      <button
        type="button"
        onClick={onClose}
        className="custom-input__btn custom-input__btn--close"
      >
        <CloseIcon
          width={24}
          height={24}
          className="custom-input__close-icon"
        />
      </button>
      <button
        type="button"
        onClick={onDelete}
        className="custom-input__btn custom-input__btn--delete"
      >
        <DeleteIcon
          width={24}
          height={24}
          className="custom-input__delete-icon"
        />
      </button>
    </div>
  );
};
