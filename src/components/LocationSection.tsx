import { useState } from 'react';
import { MapPin, Clock, Phone, Navigation, Copy, Check, ExternalLink, MessageCircle } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/restaurantData';
import { getWhatsAppLink, checkIsOpenNow } from '../utils/helpers';
import { playClickSound, playHoverTick, playWhatsappTone } from '../utils/soundEffects';

interface LocationSectionProps {
  onOpenMenu?: () => void;
}

export function LocationSection({ onOpenMenu }: LocationSectionProps) {
  const [copiedAddress, setCopiedAddress] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const openStatus = checkIsOpenNow();

  const handleCopyAddress = () => {
    playClickSound();
    navigator.clipboard.writeText(RESTAURANT_INFO.addressFull);
    setCopiedAddress(true);
    setTimeout(() => setCopiedAddress(false), 2000);
  };

  const handleCopyPhone = () => {
    playClickSound();
    navigator.clipboard.writeText(RESTAURANT_INFO.phoneFormatted);
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2000);
  };

  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent("Av. Coronel Constantino, 56, Águas Belas - PE")}`;

  return (
    <section id="localizacao" className="py-16 md:py-20 bg-zinc-950 border-b border-zinc-800/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-semibold">
            <MapPin className="w-3.5 h-3.5 text-rose-400" />
            <span>Localização & Atendimento</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white font-['Cinzel',serif] tracking-tight">
            Venha nos Visitar ou Peça Delivery
          </h2>
          <p className="text-sm sm:text-base text-zinc-400">
            Estamos localizados no coração de Águas Belas - PE. Atendimento presencial aconchegante e entrega rápida em toda a cidade!
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left: Interactive Details & Actions */}
          <div className="lg:col-span-6 space-y-4 flex flex-col justify-between">
            
            {/* Endereço Card */}
            <div className="p-6 rounded-3xl bg-zinc-900/80 border border-zinc-800 space-y-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-2xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white">Endereço do Estabelecimento</h3>
                    <p className="text-xs text-amber-400 font-semibold">{RESTAURANT_INFO.city}</p>
                  </div>
                </div>

                <button
                  onClick={handleCopyAddress}
                  onMouseEnter={() => playHoverTick()}
                  id="loc-copy-address-btn"
                  className="px-3 py-1.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-xs text-zinc-200 font-semibold flex items-center gap-1.5 transition-colors cursor-pointer border border-zinc-700"
                  title="Copiar endereço completo"
                >
                  {copiedAddress ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedAddress ? "Copiado!" : "Copiar Endereço"}</span>
                </button>
              </div>

              <div className="p-3.5 rounded-xl bg-zinc-950/70 border border-zinc-800/80 text-sm text-zinc-200 font-medium leading-relaxed">
                📍 {RESTAURANT_INFO.addressFull}
              </div>

              <div className="flex flex-wrap items-center gap-3 pt-1">
                <a
                  href={googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => playClickSound()}
                  onMouseEnter={() => playHoverTick()}
                  id="loc-open-maps-btn"
                  className="flex-1 inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-100 font-bold text-xs transition-colors border border-zinc-700"
                >
                  <Navigation className="w-4 h-4 text-rose-400" />
                  <span>Traçar Rota no Google Maps</span>
                  <ExternalLink className="w-3.5 h-3.5 opacity-60" />
                </a>
              </div>
            </div>

            {/* Horário & Pedidos Card */}
            <div className="p-6 rounded-3xl bg-zinc-900/80 border border-zinc-800 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white">Horário de Funcionamento</h3>
                    <p className="text-xs text-emerald-400 font-semibold">{openStatus.statusText} • {openStatus.nextOpenInfo}</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-xl bg-zinc-950/70 border border-zinc-800/80 space-y-1">
                  <span className="text-zinc-400 block font-semibold">Dias de Atendimento:</span>
                  <strong className="text-zinc-100 block text-sm">Terça a Domingo</strong>
                  <span className="text-zinc-400 text-[11px] block">19:00 às 23:00 (Segunda fechado)</span>
                </div>

                <div className="p-3 rounded-xl bg-zinc-950/70 border border-zinc-800/80 space-y-1">
                  <span className="text-zinc-400 block font-semibold">Regras de Delivery:</span>
                  <strong className="text-amber-300 block text-sm">Mínimo {RESTAURANT_INFO.minimumOrder}</strong>
                  <span className="text-zinc-400 text-[11px] block">Embalagens térmicas seladas</span>
                </div>
              </div>

              {/* Direct Call & WhatsApp row */}
              <div className="flex flex-col sm:flex-row items-center gap-3 pt-1">
                <button
                  onClick={handleCopyPhone}
                  onMouseEnter={() => playHoverTick()}
                  id="loc-copy-phone-btn"
                  className="w-full sm:flex-1 py-3 px-4 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-100 font-bold text-xs flex items-center justify-center gap-2 border border-zinc-700 cursor-pointer"
                >
                  <Phone className="w-4 h-4 text-rose-400" />
                  <span>{copiedPhone ? "✓ Telefone Copiado!" : RESTAURANT_INFO.phoneFormatted}</span>
                </button>

                <a
                  href={getWhatsAppLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => playWhatsappTone()}
                  onMouseEnter={() => playHoverTick()}
                  id="loc-order-wpp-btn"
                  className="w-full sm:flex-1 py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs flex items-center justify-center gap-2 shadow-lg shadow-emerald-950/50"
                >
                  <MessageCircle className="w-4 h-4 fill-white text-emerald-600" />
                  <span>Pedir no WhatsApp</span>
                </a>
              </div>
            </div>

          </div>

          {/* Right: Map Visual Box / Direction Helper */}
          <div className="lg:col-span-6 rounded-3xl overflow-hidden border border-zinc-800 bg-zinc-900/90 shadow-2xl flex flex-col">
            <div className="p-4 bg-zinc-900 border-b border-zinc-800 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-pulse" />
                <span className="font-bold text-zinc-200">Mapa de Localização (Águas Belas - PE)</span>
              </div>
              <span className="text-zinc-400">Em frente à FÁ Motos</span>
            </div>

            {/* Interactive Map */}
            <div className="relative flex-1 min-h-[300px] sm:min-h-[360px] bg-zinc-950 flex items-center justify-center p-6 text-center overflow-hidden">
              <iframe
                title="Mapa Sushi Paulista"
                src={RESTAURANT_INFO.mapsEmbedUrl}
                className="w-full h-full min-h-[300px] border-0 rounded-2xl opacity-80 hover:opacity-100 transition-opacity"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              
              <div className="absolute bottom-4 left-4 right-4 bg-zinc-950/90 backdrop-blur-md p-3.5 rounded-2xl border border-zinc-800 flex items-center justify-between gap-3 shadow-xl">
                <div className="text-left">
                  <p className="text-xs font-bold text-white">Sushi Paulista – Culinária Asiática</p>
                  <p className="text-[11px] text-zinc-400 line-clamp-1">Av. Coronel Constantino, 56 (Rua do Sertão)</p>
                </div>
                <a
                  href={googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => playClickSound()}
                  className="px-3.5 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs whitespace-nowrap shadow-md"
                >
                  Abrir Mapa
                </a>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
