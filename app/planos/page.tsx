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
          position: relative;
          min-height: 100vh;
        }
        body::before {
          content: '';
          position: fixed;
          inset: 0;
          background-image: url('/streamers.jpg');
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
          opacity: 0.35;
          z-index: -2;
          pointer-events: none;
        }
        body::after {
          content: '';
          position: fixed;
          inset: 0;
          background: linear-gradient(180deg,
            rgba(10,10,10,0.85) 0%,
            rgba(10,10,10,0.75) 40%,
            rgba(10,10,10,0.9) 80%,
            rgba(10,10,10,0.98) 100%
          );
          z-index: -1;
          pointer-events: none;
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
          gap: 24px;
        }

        .plano-card {
          position: relative;
          background:
            radial-gradient(circle at 100% 0%, rgba(124,58,237,0.12) 0%, transparent 50%),
            linear-gradient(180deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 20px;
          padding: 36px 30px 32px;
          display: flex;
          flex-direction: column;
          overflow: hidden;
          transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .plano-card::before {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: 20px;
          padding: 1px;
          background: linear-gradient(135deg, rgba(255,255,255,0.15), transparent 50%);
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
                  mask-composite: exclude;
          pointer-events: none;
        }
        .plano-card:hover {
          transform: translateY(-6px);
          border-color: rgba(255,255,255,0.18);
          box-shadow: 0 30px 60px -20px rgba(0,0,0,0.6);
        }

        /* Card destacado (Anual) */
        .plano-card.destaque {
          background:
            radial-gradient(circle at 100% 0%, rgba(124,58,237,0.25) 0%, transparent 50%),
            radial-gradient(circle at 0% 100%, rgba(220,38,38,0.2) 0%, transparent 50%),
            linear-gradient(180deg, rgba(220,38,38,0.08) 0%, rgba(124,58,237,0.05) 100%);
          border-color: rgba(220,38,38,0.4);
          box-shadow:
            0 30px 80px -20px rgba(220,38,38,0.3),
            0 0 0 1px rgba(220,38,38,0.2) inset;
        }
        .plano-card.destaque::before {
          background: linear-gradient(135deg, rgba(220,38,38,0.6), rgba(124,58,237,0.4) 50%, transparent);
        }
        .plano-card.destaque:hover {
          box-shadow:
            0 40px 100px -20px rgba(220,38,38,0.5),
            0 0 0 1px rgba(220,38,38,0.3) inset;
        }

        /* Tag/badge no topo */
        .plano-tag {
          position: absolute;
          top: -1px;
          right: 24px;
          background: linear-gradient(90deg, #DC2626 0%, #7C3AED 100%);
          color: var(--branco);
          font-size: 10px;
          font-weight: 800;
          letter-spacing: 0.1em;
          padding: 8px 14px;
          border-radius: 0 0 8px 8px;
          white-space: nowrap;
          box-shadow: 0 4px 12px rgba(220,38,38,0.4);
        }

        /* Nome do plano */
        .plano-nome {
          font-size: 12px;
          text-transform: uppercase;
          letter-spacing: 0.14em;
          color: var(--cinza-1);
          font-weight: 700;
          margin-bottom: 20px;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .plano-nome::before {
          content: '';
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: var(--cinza-2);
          display: inline-block;
        }
        .plano-card.destaque .plano-nome::before {
          background: linear-gradient(90deg, #DC2626, #7C3AED);
          box-shadow: 0 0 12px rgba(220,38,38,0.6);
        }

        /* Preço grande e forte */
        .plano-preco-wrap {
          display: flex;
          align-items: baseline;
          gap: 4px;
          margin-bottom: 6px;
        }
        .plano-preco-cifrao {
          font-size: 20px;
          font-weight: 600;
          color: var(--cinza-1);
          margin-right: 2px;
        }
        .plano-preco {
          font-size: 56px;
          font-weight: 800;
          letter-spacing: -0.04em;
          line-height: 1;
          color: var(--branco);
          background: linear-gradient(180deg, #ffffff 0%, #a3a3a3 200%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .plano-preco-decimal {
          font-size: 22px;
          font-weight: 700;
          color: var(--cinza-1);
          margin-left: -2px;
        }

        .plano-periodo {
          font-size: 13px;
          color: var(--cinza-1);
          font-weight: 500;
          margin-bottom: 6px;
        }
        .plano-economia {
          font-size: 12px;
          font-weight: 700;
          color: #34D399;
          margin-bottom: 28px;
          min-height: 18px;
          display: flex;
          align-items: center;
          gap: 6px;
        }
        .plano-economia::before {
          content: '↓';
          font-size: 13px;
          font-weight: 800;
        }
        .plano-economia.vazia { visibility: hidden; }

        /* Divisor sutil */
        .plano-divisor {
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent);
          margin: 0 -30px 24px;
        }

        /* Lista de beneficios */
        .plano-beneficios {
          list-style: none;
          margin-bottom: 28px;
          flex: 1;
        }
        .plano-beneficios li {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          padding: 9px 0;
          font-size: 14px;
          color: var(--cinza-0);
          line-height: 1.45;
        }
        .check {
          flex-shrink: 0;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: linear-gradient(135deg, rgba(52,211,153,0.2) 0%, rgba(52,211,153,0.05) 100%);
          border: 1px solid rgba(52,211,153,0.25);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-top: 1px;
        }
        .check svg { width: 10px; height: 10px; }
        .check path {
          stroke: #34D399;
          stroke-width: 3;
          fill: none;
          stroke-linecap: round;
          stroke-linejoin: round;
        }

        /* Botão CTA */
        .plano-btn {
          display: block;
          text-align: center;
          padding: 15px 20px;
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.14);
          border-radius: 12px;
          color: var(--branco);
          font-size: 14px;
          font-weight: 700;
          letter-spacing: 0.02em;
          transition: all 0.2s;
          cursor: pointer;
          position: relative;
          overflow: hidden;
        }
        .plano-btn::after {
          content: '→';
          margin-left: 6px;
          display: inline-block;
          transition: transform 0.2s;
        }
        .plano-btn:hover {
          background: rgba(255,255,255,0.12);
          border-color: rgba(255,255,255,0.25);
        }
        .plano-btn:hover::after { transform: translateX(4px); }

        .plano-card.destaque .plano-btn {
          background: linear-gradient(90deg, #DC2626 0%, #7C3AED 100%);
          border-color: transparent;
          color: var(--branco);
          box-shadow: 0 10px 30px -10px rgba(220,38,38,0.6);
        }
        .plano-card.destaque .plano-btn:hover {
          box-shadow: 0 15px 40px -10px rgba(220,38,38,0.8);
          transform: translateY(-1px);
        }

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
            <div className="plano-preco-wrap">
              <span className="plano-preco-cifrao">R$</span>
              <span className="plano-preco">{Math.floor(plano.preco)}</span>
              <span className="plano-preco-decimal">,{String(plano.preco).split(".")[1]?.padEnd(2, "0") || "00"}</span>
            </div>
            <div className="plano-periodo">{plano.periodo}</div>
            <div className={`plano-economia ${!plano.economia ? "vazia" : ""}`}>
              {plano.economia || "-"}
            </div>
            <div className="plano-divisor" />
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
