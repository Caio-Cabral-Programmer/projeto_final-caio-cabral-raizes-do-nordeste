export const PRIVACY_POLICY_VERSION = "1.0";

export const PRIVACY_TITLE =
  "Sua privacidade é importante para a Raízes do Nordeste";

export const PRIVACY_INTRO =
  "Em conformidade com a Lei Geral de Proteção de Dados Pessoais (Lei nº 13.709/2018, LGPD), pedimos o seu consentimento antes de tratar seus dados pessoais. Leia com atenção.";

export interface PrivacySection {
  title: string;
  text?: string;
  items?: string[];
  footer?: string;
}

export const PRIVACY_SECTIONS: PrivacySection[] = [
  {
    title: "1. Quem é o controlador",
    text: "A Raízes do Nordeste, rede de lanchonetes de culinária regional, é a controladora dos dados tratados neste aplicativo. Este é um projeto acadêmico; a empresa e o contato abaixo são fictícios. Encarregado pelo tratamento de dados (DPO): privacidade@raizesdonordeste.example.",
  },
  {
    title: "2. Quais dados coletamos",
    text: "Nome, e-mail, senha (armazenada de forma protegida), histórico de pedidos e pontos do programa de fidelidade. Não coletamos dados pessoais sensíveis. Os dados de cartão digitados no pagamento são usados apenas para a simulação e nunca são armazenados.",
  },
  {
    title: "3. Para que usamos seus dados (finalidades)",
    items: [
      "Criar e manter sua conta e identificar você no aplicativo.",
      "Registrar e acompanhar seus pedidos e solicitar o pagamento a um serviço externo.",
      "Operar o programa de fidelidade (pontos, desconto de 10% e pedido grátis).",
      "Exibir promoções e campanhas relacionadas ao programa de fidelidade.",
    ],
    footer:
      "Não usamos seus dados para finalidades diferentes das descritas acima.",
  },
  {
    title: "4. Compartilhamento",
    text: "Compartilhamos apenas os dados estritamente necessários com o serviço de pagamento externo para autorizar a cobrança. Não vendemos seus dados.",
  },
  {
    title: "5. Onde e por quanto tempo guardamos",
    text: "Neste protótipo, os dados ficam armazenados no seu navegador (localStorage) até que você exclua a conta ou limpe os dados do navegador. Em um ambiente real, os dados seriam mantidos pelo tempo necessário às finalidades acima e às obrigações legais.",
  },
  {
    title: "6. Seus direitos (art. 18 da LGPD)",
    text: "Você pode, a qualquer momento: confirmar a existência de tratamento; acessar seus dados; corrigir dados incompletos, inexatos ou desatualizados; solicitar anonimização, bloqueio ou eliminação de dados desnecessários; pedir a portabilidade; saber com quem compartilhamos seus dados; ser informado sobre a possibilidade de não consentir e suas consequências; e revogar o consentimento. No aplicativo, acesse Perfil para editar seus dados, revogar o consentimento ou Excluir minha conta.",
  },
  {
    title: "7. Se você recusar",
    text: "Você poderá consultar o cardápio, mas não poderá criar conta nem fazer pedidos, pois dependem do tratamento dos dados descritos acima.",
  },
  {
    title: "8. Revogação",
    text: 'Você pode revogar o consentimento a qualquer momento, de forma gratuita e facilitada, em Perfil. A revogação encerra a sessão. Para eliminar definitivamente seus dados, use "Excluir minha conta".',
  },
];
