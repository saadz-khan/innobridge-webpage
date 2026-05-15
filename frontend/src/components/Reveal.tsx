import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { useScrollReveal } from "../lib/useScrollReveal";

type RevealProps = ComponentPropsWithoutRef<"div"> & {
  children: ReactNode;
  delay?: number;
};

export function Reveal({ children, className = "", delay = 0, style, ...props }: RevealProps) {
  const ref = useScrollReveal<HTMLDivElement>();

  return (
    <div
      {...props}
      ref={ref}
      className={`reveal ${className}`}
      style={{ ...style, transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}
