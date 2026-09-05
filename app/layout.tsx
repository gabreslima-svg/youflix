import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "YouFlix — Streaming de filmes, séries e esportes",
  description: "Filmes, séries e esportes sem limites. Teste grátis por 12h. Assista em Smart TV, celular, PC e mais.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
