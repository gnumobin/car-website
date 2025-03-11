import "./CTAForm.scss";

const CTAForm = _ => {
  return <section className="section-cta">
      <div className="section-cta__head-box">
        <h2 className="heading-secondary">
          Você está procurando <br /> algum modelo em específico?
        </h2>
        <p className="head-box__description">
          Deixe seu contato para que a nossa equipe entre em contato com você!
        </p>
      </div>

      <form action="#" className="cta-form">
        <div className="cta-form__input-box">
          <input type="text" className="cta-form__input" placeholder="Modelo" />
          <input type="text" className="cta-form__input" placeholder="Nome" />
          <input type="text" className="cta-form__input" placeholder="E-mail" />
          <input type="text" className="cta-form__input" placeholder="Número" />
          <input
            type="submit"
            className="cta-form__input cta-form__submit"
            value="Enviar"
          />
        </div>

        <label className="cta-form__label">
          <input type="checkbox" className="cta-form__checkbox" />
          <p className="cta-form__checkbox-text">
            De acordo com a LGPD, concordo em fornecer os dados acima para que a
            Touring Cars entre em contato comigo para apresentar serviços. Seu
            nome, e-mail e telefone serão usados de acordo com a nossa Política
            de Privacidade.
          </p>
        </label>
      </form>
    </section>
};

export default CTAForm;