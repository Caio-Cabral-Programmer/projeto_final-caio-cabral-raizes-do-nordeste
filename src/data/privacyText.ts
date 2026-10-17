export const PRIVACY_POLICY_VERSION = "1.0";
export const PRIVACY_LAST_UPDATE = "outubro de 2026";

export const PRIVACY_TITLE =
  "Sua privacidade é importante para a Raízes do Nordeste";

export const PRIVACY_INTRO =
  "Esta Política de Privacidade explica como a Raízes do Nordeste trata os seus dados pessoais quando você usa o nosso aplicativo e site, em conformidade com a Lei Geral de Proteção de Dados Pessoais (Lei nº 13.709/2018, LGPD). Ao aceitar, você consente com o tratamento descrito abaixo. Leia com atenção.";

export interface PrivacySection {
  title: string;
  text?: string;
  items?: string[];
  footer?: string;
}

export const PRIVACY_SECTIONS: PrivacySection[] = [
  {
    title: "1. Quem é o controlador",
    text: 'A Raízes do Nordeste Lanchonetes Ltda. ("Raízes do Nordeste"), rede de lanchonetes de culinária regional com unidades em Recife, Caruaru e Fortaleza, é a controladora dos seus dados pessoais, ou seja, quem decide como eles são tratados. O Encarregado pelo Tratamento de Dados (DPO) atende pelo e-mail privacidade@raizesdonordeste.com.br.',
  },
  {
    title: "2. Quais dados coletamos",
    items: [
      "Dados de cadastro: nome, e-mail e senha (guardada apenas em formato criptográfico irreversível, o hash).",
      "Dados de uso do serviço: unidade escolhida, itens e valores dos pedidos, status, data e hora, e pontos e benefícios do programa de fidelidade.",
      "Registro do seu consentimento: a decisão tomada, a data, a hora e a versão desta política.",
    ],
    footer:
      "Não coletamos dados pessoais sensíveis. Os dados do cartão informados no pagamento são enviados ao serviço de pagamento para autorizar a cobrança e não são armazenados por nós.",
  },
  {
    title: "3. Para que usamos os dados e em qual base legal",
    items: [
      "Criar e manter a sua conta e autenticar o seu acesso (consentimento, art. 7º, I).",
      "Registrar, cobrar e acompanhar os seus pedidos, incluindo a solicitação de pagamento ao serviço externo (execução de contrato, art. 7º, V).",
      "Operar o programa de fidelidade: pontos, desconto de 10% e pedido grátis (consentimento, art. 7º, I).",
      "Exibir promoções e campanhas do programa de fidelidade (consentimento, art. 7º, I).",
      "Cumprir obrigações legais e regulatórias, como as fiscais (art. 7º, II).",
    ],
    footer:
      "Não usamos os seus dados para finalidades incompatíveis com estas. Se a finalidade mudar, avisaremos você e pediremos novo consentimento quando necessário.",
  },
  {
    title: "4. Com quem compartilhamos",
    items: [
      "Provedor de pagamento: recebe o valor, o identificador do pedido e os dados do cartão para autorizar a cobrança.",
      "Provedores de infraestrutura e hospedagem: operam em nosso nome, sob contrato e seguindo as nossas instruções.",
      "Autoridades públicas: apenas quando houver obrigação legal ou ordem judicial.",
    ],
    footer:
      "Não vendemos nem alugamos os seus dados. Se algum provedor estiver fora do Brasil, a transferência seguirá as garantias do art. 33 da LGPD.",
  },
  {
    title: "5. Segurança e prazo de armazenamento",
    text: "Adotamos medidas técnicas e administrativas para proteger os seus dados contra acessos não autorizados e situações acidentais ou ilícitas de destruição, perda, alteração ou divulgação (art. 46), como o armazenamento de senhas com hash e a validação das informações recebidas. Mantemos os dados enquanto a sua conta estiver ativa. Após a exclusão da conta, guardamos apenas o que a lei exigir, pelo prazo necessário, e eliminamos o restante. Se ocorrer um incidente de segurança que possa gerar risco ou dano relevante, comunicaremos você e a Autoridade Nacional de Proteção de Dados (ANPD), conforme o art. 48.",
  },
  {
    title: "6. Seus direitos (art. 18 da LGPD)",
    text: "A qualquer momento, e sem custo, você pode: confirmar se tratamos os seus dados; acessar os seus dados; corrigir dados incompletos, inexatos ou desatualizados; pedir a anonimização, o bloqueio ou a eliminação de dados desnecessários, excessivos ou tratados em desconformidade com a lei; pedir a portabilidade dos dados; saber com quais entidades compartilhamos os seus dados; ser informado sobre a possibilidade de não consentir e sobre as consequências da recusa; e revogar o consentimento. Para exercer esses direitos, acesse Perfil no aplicativo ou escreva para o nosso DPO. Você também pode apresentar reclamação à ANPD.",
  },
  {
    title: "7. Se você recusar",
    text: "Você poderá consultar o cardápio, mas não poderá criar conta nem fazer pedidos, pois essas funções dependem do tratamento dos dados descritos nesta política.",
  },
  {
    title: "8. Como revogar o consentimento",
    text: "Você pode revogar o consentimento a qualquer momento, de forma gratuita e facilitada, em Perfil > Revogar consentimento. A revogação encerra a sua sessão e não afeta o tratamento já realizado com base no consentimento anterior. Para eliminar definitivamente os seus dados, use Excluir minha conta.",
  },
  {
    title: "9. Alterações desta política",
    text: "Podemos atualizar esta política para refletir mudanças no serviço ou na lei. Quando a mudança for relevante, avisaremos você de forma destacada e, se a mudança exigir, pediremos um novo consentimento.",
  },
];
