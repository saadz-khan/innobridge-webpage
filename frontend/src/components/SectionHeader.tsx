import type { ReactNode } from "react";
import { Reveal } from "./Reveal";

type SectionHeaderProps = {
  id?: string;
  eyebrow?: string;
  title: string;
  description?: ReactNode;
  align?: "left" | "center";
};

export function SectionHeader({ id, eyebrow, title, description, align = "left" }: SectionHeaderProps) {
  return (
    <Reveal className={`section-header section-header--${align}`}>
      {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
      <h2 id={id}>{title}</h2>
      {description ? <p className="section-header__copy">{description}</p> : null}
    </Reveal>
  );
}
