import type { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonProps = {
  children: ReactNode;
  href?: string;
  variant?: "primary" | "secondary" | "ghost" | "light";
  icon?: ReactNode;
  className?: string;
  ariaLabel?: string;
  onClick?: () => void;
} & Pick<ButtonHTMLAttributes<HTMLButtonElement>, "type" | "disabled">;

export function Button({
  children,
  href,
  variant = "primary",
  icon,
  className = "",
  ariaLabel,
  onClick,
  type = "button",
  disabled
}: ButtonProps) {
  const classes = `button button--${variant} ${className}`.trim();
  const content = (
    <>
      <span>{children}</span>
      {icon ? <span className="button__icon" aria-hidden="true">{icon}</span> : null}
    </>
  );

  if (href) {
    return (
      <a className={classes} href={href} aria-label={ariaLabel} onClick={onClick}>
        {content}
      </a>
    );
  }

  return (
    <button className={classes} type={type} aria-label={ariaLabel} onClick={onClick} disabled={disabled}>
      {content}
    </button>
  );
}
