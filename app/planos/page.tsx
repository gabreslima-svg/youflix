"use client";

const WHATSAPP = "5516994587380";
const linkWhats = (plano: string) =>
  `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(`Olá, vim do site e quero assinar o plano ${plano} da YouFlix`)}`;

const planos = [
  {
    id: "mensal",
    nome: "Mensal",
    preco: 29.90,
    periodo: "por mês",
    economia: null,
    tag: null,
    beneficios: [
      "Acesso completo ao catálogo",
      "500+ canais ao vivo",
      "30 mil+ filmes",
      "10 mil+ séries",
      "Esportes 24/7",
      "Suporte via WhatsApp",
      "Cancele quando quiser",
    ],
  },
  {
    id: "trimestral",
    nome: "Trimestral",
    preco: 69.90,
    periodo: "a cada 3 meses",
    economia: "Equivale a R$ 23,30/mês",
    tag: "MAIS VANTAJOSO",
    beneficios: [
      "Tudo do plano mensal",
      "Economia de R$ 20,80 no período",
      "Preço fixo por 3 meses",
      "Renovação facilitada",
      "Suporte prioritário",
      "Sem taxas extras",
      "Cancele quando quiser",
    ],
  },
  {
    id: "anual",
    nome: "Anual",
    preco: 199.90,
    periodo: "por ano",
    economia: "Equivale a R$ 16,66/mês",
    tag: "MELHOR PREÇO",
    beneficios: [
      "Tudo do plano mensal",
      "Economia de R$ 158,90 no ano",
      "Preço fixo por 12 meses",
      "Acesso ilimitado",
      "Suporte VIP",
      "Sem reajustes durante o período",
      "Cancele quando quiser",
    ],
  },
];

function formatarPreco(n: number): string {
  return n.toLocaleString("pt-BR", { style: "currency", currency: "BRL" }).replace("R$", "R$ ");
}

export default function PlanosPage() {
  return (
    <>
      <style>{`
        * { margin: 0; padding: 0; box-sizing: border-box; }
        :root {
          --preto: #0a0a0a;
          --branco: #ffffff;
          --cinza-0: #f5f5f7;
          --cinza-1: #a3a3a3;
          --cinza-2: #737373;
          --vermelho: #DC2626;
          --roxo: #7C3AED;
        }
        html, body { overflow-x: hidden; }
        body {
          background: var(--preto);
          color: var(--branco);
          font-family: 'Inter', -apple-system, system-ui, sans-serif;
          -webkit-font-smoothing: antialiased;
          line-height: 1.5;
        }
        a { color: inherit; text-decoration: none; }

        .nav {
          padding: 20px 32px;
          border-bottom: 1px solid rgba(255,255,255,0.06);
          display: flex;
          align-items: center;
          justify-content: space-between;
          position: sticky;
          top: 0;
          background: rgba(10,10,10,0.85);
          backdrop-filter: blur(12px);
          z-index: 50;
        }
        .nav-logo { display: flex; align-items: center; gap: 8px; font-size: 18px; font-weight: 700; }
        .nav-logo img { height: 28px; width: auto; }
        .nav-links { display: flex; gap: 24px; align-items: center; }
        .nav-links a { font-size: 14px; color: var(--cinza-1); transition: color 0.15s; }
        .nav-links a:hover { color: var(--branco); }
        .nav-cta { background: var(--vermelho); color: var(--branco); padding: 8px 18px; border-radius: 8px; font-size: 13px; font-weight: 600; }
        .nav-cta:hover { background: #b91c1c; }

        .hero { padding: 80px 32px 40px; text-align: center; max-width: 900px; margin: 0 auto; }
        .hero-titulo { font-size: 52px; font-weight: 800; letter-spacing: -0.03em; line-height: 1.1; margin-bottom: 16px; }
        .hero-sub { font-size: 17px; color: var(--cinza-1); max-width: 560px; margin: 0 auto; }

        .planos-wrap {
          max-width: 1200px;
          margin: 0 auto;
          padding: 40px 32px 60px;
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
        }

        .plano-card {
          background: linear-gradient(180deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 16px;
          padding: 32px 28px;
          display: flex;
          flex-direction: column;
          position: relative;
          transition: all 0.2s;
        }
        .plano-card:hover { border-color: rgba(255,255,255,0.15); transform: translateY(-4px); }
        .plano-card.destaque {
          border-color: var(--vermelho);
          background: linear-gradient(180deg, rgba(220,38,38,0.08) 0%, rgba(124,58,237,0.04) 100%);
          box-shadow: 0 20px 60px -20px rgba(220,38,38,0.3);
        }

        .plano-tag {
          position: absolute;
          top: -12px;
          left: 50%;
          transform: translateX(-50%);
          background: linear-gradient(90deg, var(--vermelho) 0%, var(--roxo) 100%);
          color: var(--branco);
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.08em;
          padding: 6px 14px;
          border-radius: 20px;
          white-space: nowrap;
        }

        .plano-nome { font-size: 14px; text-transform: uppercase; letter-spacing: 0.1em; color: var(--cinza-1); font-weight: 600; margin-bottom: 12px; }
        .plano-preco { font-size: 44px; font-weight: 800; letter-spacing: -0.03em; line-height: 1; }
        .plano-periodo { font-size: 13px; color: var(--cinza-1); font-weight: 500; margin-bottom: 4px; }
        .plano-economia { font-size: 12px; color: #34D399; font-weight: 600; margin-bottom: 24px; min-height: 18px; }
        .plano-economia.vazia { visibility: hidden; }

        .plano-beneficios { list-style: none; margin-bottom: 28px; flex: 1; }
        .plano-beneficios li { display: flex; align-items: flex-start; gap: 10px; padding: 8px 0; font-size: 14px; color: var(--cinza-0); line-height: 1.4; }
        .check {
          flex-shrink: 0; width: 18px; height: 18px; border-radius: 50%;
          background: rgba(52,211,153,0.15);
          display: flex; align-items: center; justify-content: center;
          margin-top: 2px;
        }
        .check svg { width: 10px; height: 10px; }
        .check path { stroke: #34D399; stroke-width: 3; fill: none; stroke-linecap: round; stroke-linejoin: round; }

        .plano-btn {
          display: block;
          text-align: center;
          padding: 14px;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.12);
          border-radius: 10px;
          color: var(--branco);
          font-size: 14px;
          font-weight: 600;
          transition: all 0.15s;
          cursor: pointer;
        }
        .plano-btn:hover { background: rgba(255,255,255,0.1); border-color: rgba(255,255,255,0.2); }
        .plano-card.destaque .plano-btn { background: var(--vermelho); border-color: var(--vermelho); }
        .plano-card.destaque .plano-btn:hover { background: #b91c1c; }

        .adicional {
          max-width: 900px;
          margin: 40px auto 60px;
          padding: 32px;
          background: linear-gradient(90deg, rgba(124,58,237,0.08) 0%, rgba(220,38,38,0.08) 100%);
          border: 1px solid rgba(124,58,237,0.2);
          border-radius: 16px;
          display: flex;
          align-items: center;
          gap: 24px;
        }
        .adicional-icone {
          flex-shrink: 0; width: 60px; height: 60px; border-radius: 12px;
          background: rgba(255,255,255,0.05);
          display: flex; align-items: center; justify-content: center;
          color: #34D399;
        }
        .adicional-info { flex: 1; }
        .adicional-titulo { font-size: 18px; font-weight: 700; margin-bottom: 4px; }
        .adicional-desc { font-size: 13px; color: var(--cinza-1); line-height: 1.5; }
        .adicional-preco-wrap { text-align: right; flex-shrink: 0; }
        .adicional-preco { font-size: 22px; font-weight: 800; color: var(--branco); letter-spacing: -0.02em; }
        .adicional-preco-label { font-size: 11px; color: var(--cinza-1); margin-top: 2px; }

        .faq-mini { max-width: 800px; margin: 0 auto 80px; padding: 0 32px; }
        .faq-mini-titulo { font-size: 24px; font-weight: 700; text-align: center; margin-bottom: 24px; letter-spacing: -0.02em; }
        .faq-item { padding: 20px 0; border-bottom: 1px solid rgba(255,255,255,0.06); }
        .faq-item:last-child { border-bottom: none; }
        .faq-q { font-size: 15px; font-weight: 600; margin-bottom: 6px; }
        .faq-a { font-size: 14px; color: var(--cinza-1); line-height: 1.6; }

        .rodape { padding: 40px 32px; text-align: center; border-top: 1px solid rgba(255,255,255,0.06); color: var(--cinza-2); font-size: 12px; }
        .rodape a { color: var(--cinza-1); }
        .rodape a:hover { color: var(--branco); }

        @media (max-width: 900px) {
          .planos-wrap { grid-template-columns: 1fr; gap: 32px; padding: 40px 20px; }
          .hero-titulo { font-size: 36px; }
          .hero { padding: 40px 20px 20px; }
          .plano-preco { font-size: 38px; }
          .adicional { flex-direction: column; text-align: center; gap: 16px; margin: 20px 20px 40px; padding: 24px; }
          .adicional-preco-wrap { text-align: center; }
          .faq-mini { padding: 0 20px; }
          .nav { padding: 16px 20px; }
          .nav-links { gap: 14px; }
          .nav-links a:not(.nav-cta) { display: none; }
        }
      `}</style>

      <nav className="nav">
        <a href="/" className="nav-logo">
          <img src="/youflix-logo.png" alt="YouFlix" />
        </a>
        <div className="nav-links">
          <a href="/">Início</a>
          <a href="/#faq">FAQ</a>
          <a href={linkWhats("mensal")} className="nav-cta" target="_blank" rel="noopener noreferrer">Testar grátis</a>
        </div>
      </nav>

      <section className="hero">
        <h1 className="hero-titulo">Escolha o seu plano</h1>
        <p className="hero-sub">
          Todos os planos incluem <strong>catálogo completo</strong> com filmes, séries, esportes ao vivo e mais de 500 canais.
          Cancele quando quiser.
        </p>
      </section>

      <div className="planos-wrap">
        {planos.map((plano) => (
          <div key={plano.id} className={`plano-card ${plano.id === "anual" ? "destaque" : ""}`}>
            {plano.tag && <div className="plano-tag">{plano.tag}</div>}
            <div className="plano-nome">{plano.nome}</div>
            <div className="plano-preco">{formatarPreco(plano.preco)}</div>
            <div className="plano-periodo">{plano.periodo}</div>
            <div className={`plano-economia ${!plano.economia ? "vazia" : ""}`}>
              {plano.economia || "-"}
            </div>
            <ul className="plano-beneficios">
              {plano.beneficios.map((b, i) => (
                <li key={i}>
                  <span className="check">
                    <svg viewBox="0 0 10 10"><path d="M2 5 L4 7 L8 3"/></svg>
                  </span>
                  <span>{b}</span>
                </li>
              ))}
            </ul>
            <a href={linkWhats(plano.nome)} target="_blank" rel="noopener noreferrer" className="plano-btn">
              Assinar {plano.nome}
            </a>
          </div>
        ))}
      </div>

      <div className="adicional">
        <div className="adicional-icone">
          <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="4" width="20" height="14" rx="2"/>
            <path d="M8 21h8M12 18v3"/>
            <path d="M12 8v6M9 11h6"/>
          </svg>
        </div>
        <div className="adicional-info">
          <div className="adicional-titulo">Precisa de mais uma tela?</div>
          <div className="adicional-desc">
            Adicione um dispositivo extra para usar simultaneamente com o seu plano.
            Ideal para família compartilhar o mesmo catálogo em telas diferentes.
          </div>
        </div>
        <div className="adicional-preco-wrap">
          <div className="adicional-preco">+ R$ 9,90</div>
          <div className="adicional-preco-label">por tela adicional</div>
        </div>
      </div>

      <div className="faq-mini">
        <h2 className="faq-mini-titulo">Perguntas frequentes</h2>
        <div className="faq-item">
          <div className="faq-q">Como funciona o teste grátis?</div>
          <div className="faq-a">Você ganha 12 horas gratuitas para testar todo o catálogo. Se gostar, escolhe o plano no WhatsApp e libera o acesso definitivo via Pix.</div>
        </div>
        <div className="faq-item">
          <div className="faq-q">Posso cancelar quando quiser?</div>
          <div className="faq-a">Sim. Não tem fidelidade nem multa. Se cancelar, o acesso continua ativo até o fim do período pago.</div>
        </div>
        <div className="faq-item">
          <div className="faq-q">Qual a diferença entre os planos?</div>
          <div className="faq-a">O conteúdo é o mesmo em todos. A diferença é só o preço por mês: quanto mais longo o plano, mais barato fica proporcionalmente.</div>
        </div>
        <div className="faq-item">
          <div className="faq-q">Como funciona a tela adicional?</div>
          <div className="faq-a">Cada plano já inclui 1 dispositivo. Se você quiser usar em outra TV ou celular ao mesmo tempo, adiciona R$ 9,90 por tela extra.</div>
        </div>
        <div className="faq-item">
          <div className="faq-q">Formas de pagamento?</div>
          <div className="faq-a">Pix (aprovação instantânea). Contato direto via WhatsApp para gerar o pagamento.</div>
        </div>
      </div>

      <footer className="rodape">
        <p>YouFlix · <a href="https://instagram.com/youflix.tv" target="_blank" rel="noopener noreferrer">@youflix.tv</a> · <a href={linkWhats("suporte")} target="_blank" rel="noopener noreferrer">WhatsApp</a></p>
      </footer>
    </>
  );
}
