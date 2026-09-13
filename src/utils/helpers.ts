import { RESTAURANT_INFO } from '../data/restaurantData';

export function getWhatsAppLink(customMessage?: string): string {
  const defaultText = "Olá, Sushi Paulista! Vim pelo site e gostaria de ver o cardápio e fazer meu pedido 🍣";
  const message = encodeURIComponent(customMessage || defaultText);
  return `https://wa.me/${RESTAURANT_INFO.phoneRaw}?text=${message}`;
}

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);
}

export function checkIsOpenNow(): { isOpen: boolean; statusText: string; nextOpenInfo: string } {
  // Local timezone of Pernambuco is America/Recife (UTC-3)
  const now = new Date();
  
  // Convert current time to UTC-3
  const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
  const recifeTime = new Date(utc - (3600000 * 3));
  
  const dayOfWeek = recifeTime.getDay(); // 0 = Sun, 1 = Mon, 2 = Tue, ..., 6 = Sat
  const hours = recifeTime.getHours();
  const minutes = recifeTime.getMinutes();
  const currentTimeNumber = hours + (minutes / 60);

  // Open Tuesday (2) to Sunday (0), from 19:00 to 23:00
  // Monday (1) is closed
  const isOperatingDay = dayOfWeek !== 1;
  const isOperatingHours = currentTimeNumber >= 19 && currentTimeNumber < 23;

  const isOpen = isOperatingDay && isOperatingHours;

  if (isOpen) {
    return {
      isOpen: true,
      statusText: "Aberto Agora",
      nextOpenInfo: "Fechamos hoje às 23:00",
    };
  }

  if (dayOfWeek === 1) {
    return {
      isOpen: false,
      statusText: "Fechado Hoje (Segunda)",
      nextOpenInfo: "Abrimos amanhã (Terça) às 19:00",
    };
  }

  if (currentTimeNumber < 19) {
    return {
      isOpen: false,
      statusText: "Fechado no Momento",
      nextOpenInfo: "Abrimos hoje às 19:00",
    };
  }

  return {
    isOpen: false,
    statusText: "Fechado por hoje",
    nextOpenInfo: "Abrimos amanhã às 19:00",
  };
}
