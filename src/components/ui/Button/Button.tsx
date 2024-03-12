import styles from "./Button.module.scss";
import { ButtonHTMLAttributes, DetailedHTMLProps, FC, ReactNode } from "react";
import cn from "clsx";

interface IButton
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  children: ReactNode;
  color?: "purple" | "white" | "gray" | "primary";
  size?: "big" | "medium" | "small";
  disabled?: true | false;
}

const Button: FC<IButton> = ({
  children,
  className,
  color,
  size,
  disabled,
  ...props
}) => {
  console.log("из кнопки", disabled)
  return (

    <button
      className={cn(styles.button, className, {
        [styles.disabled]: disabled === true,
        // новое 
        [styles.primary]: color === "primary",
        // было
        [styles.purple]: color === "purple",
        [styles.white]: color === "white",
        [styles.gray]: color === "gray",
        [styles.big]: size === "big",
        [styles.medium]: size === "medium",
        [styles.small]: size === "small",
      })}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
