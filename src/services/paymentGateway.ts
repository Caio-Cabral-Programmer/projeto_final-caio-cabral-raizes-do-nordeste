export type GatewayOutcome = "approved" | "refused" | "unavailable";

export interface GatewayRequest {
  orderId: string;
  amountCents: number;
  outcome: GatewayOutcome;
}

export interface GatewayResponse {
  status: GatewayOutcome;
  transactionId?: string;
  message: string;
}

const MESSAGES: Record<GatewayOutcome, string> = {
  approved: "Pagamento aprovado! Seu pedido foi confirmado.",
  refused:
    "Pagamento não autorizado pela operadora. O pedido continua Pendente.",
  unavailable: "Serviço de pagamento indisponível no momento. Tente novamente.",
};


// Simula o serviço de pagamento externo. E espera de 1,5 a 2,5 segundos, respondendo com o resultado escolhido.
export function requestPayment(
  request: GatewayRequest,
): Promise<GatewayResponse> {
  const latency = 1500 + Math.random() * 1000;
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        status: request.outcome,
        transactionId:
          request.outcome === "approved"
            ? `TX-${crypto.randomUUID().slice(0, 8).toUpperCase()}`
            : undefined,
        message: MESSAGES[request.outcome],
      });
    }, latency);
  });
}
