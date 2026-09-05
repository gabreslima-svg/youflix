import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "YouFlix — Streaming de filmes, séries e esportes",
  description: "Filmes, séries e esportes sem limites. Teste grátis por 12h. Assista em Smart TV, celular, PC e mais.",
  openGraph: {
    title: "YouFlix — Streaming sem limites",
    description: "Filmes, séries e esportes por R$ 29,90/mês. Teste grátis por 12h.",
    type: "website",
    locale: "pt_BR",
  },
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
