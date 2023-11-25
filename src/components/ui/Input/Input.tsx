import styles from "./Input.module.scss";
import { FC } from "react";
import { FieldValues, RegisterOptions, UseFormRegister } from "react-hook-form";

interface InputProps {
  placeholder?: string;
  type?: string;
  name: string;
  error?: any;
  options: RegisterOptions<FieldValues>;
  register: UseFormRegister<FieldValues>;
}

const Input: FC<InputProps> = ({
  placeholder,
  error,
  type = "text",
  name,
  register,
  options,
  ...rest
}) => {
  return (
    <div style={{ marginBottom: "1rem" }}>
      <input
        placeholder={placeholder}
        type={type}
        {...register(name, options)}
        {...rest}
        className={styles.input}
      />
      {error && <div className={styles.error}>{error}</div>}
    </div>
  );
};

export default Input;
