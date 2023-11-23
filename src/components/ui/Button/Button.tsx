import styles from "./Button.module.scss";
import { ButtonHTMLAttributes, DetailedHTMLProps, FC, ReactNode } from "react";
import cn from "clsx";

interface IButton
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  children: ReactNode;
  color?: "yellow" | "white" | "blue";
  size?: "big" | "medium" | "small";
}

const Button: FC<IButton> = ({
  children,
  className,
  color,
  size,
  ...props
}) => {
  return (
    <button
      className={cn(styles.button, className, {
        [styles.yellow]: color === "yellow",
        [styles.white]: color === "white",
        [styles.blue]: color === "blue",
        [styles.big]: size === "big",
        [styles.medium]: size === "medium",
        [styles.small]: size === "small",
      })}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
