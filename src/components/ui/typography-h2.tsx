interface TypographyH2Props {
  text: string;
}

export function TypographyH2({ text }: TypographyH2Props) {
  return <h2 className="text-3xl font-bold tracking-tight">{text}</h2>;
}
