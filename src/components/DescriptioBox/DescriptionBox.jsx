import "./DescriptionBox.scss";

const texts = [
  "Faróis de LED com nivelamento automático e temporizador – Follow Me Home",
  "Faróis de neblina dianteiros",
  "Lanternas traseiras de LED",
  "Acendimento automático dos faróis",
  "Maçanetas externas cromadas",
  "Aerofólio traseiro",
  "Retrovisores externos na cor do veículo com regulagem elétrica, rebatimento elétrico, indicadores de direção e iluminação de boas-vindas",
  "Vidros elétricos e sistema de abertura e fechamento por um toque com antiesmagamento",
  "Abertura elétrica do porta-malas com função de memória para ajuste da altura da tampa",
  "Abertura eletrônica do porta-malas com sensor de presença",
  "Câmera de 360 graus (PVM)",
  "Airbags de cortina, frontais, laterais e de joelho para o motorista",
  "Assistente de pré-colisão (Pré-Crash System – PCS) com alerta sonoro e visual e, se necessário, frenagem automática",
  "Assistente de reboque (TSC), de descida e de subida (HAC)",
  "Controle adaptativo de velocidade de cruzeiro (ACC)",
  "Controle eletrônico de estabilidade do veículo (VSC) e de tração (A-TRC)",
  "Sensores de estacionamento dianteiros (2) e traseiros (4)",
  "Sistema auxiliar BAS (sistema de assistência em frenagem de emergência) nas 4 rodas",
  "Sistema auxiliar EBD (distribuição eletrônica de força de frenagem) nas 4 rodas",
  "Alerta de Mudança de Faixa (Lane Departure Alert – LDA)",
  "Aviso de ponto cego (BSM)",
  "Alerta de tráfego traseiro (RCTA)",
  "Isofix para fixação de cadeirinha para crianças no banco traseiro",
  "Trava de segurança das rodas",
];

const DescriptionBox = () => {
  return (
    <div className="description">
      {texts.map(p => <p className="description__p">{p}</p>)}
    </div>
  );
};

export default DescriptionBox;
