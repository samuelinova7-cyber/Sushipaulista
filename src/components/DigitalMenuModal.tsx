import { useState } from 'react';
import { X, Utensils, MessageCircle, ExternalLink, Search, Sparkles } from 'lucide-react';
import { MENU_ITEMS, RESTAURANT_INFO } from '../data/restaurantData';
import { MenuItem } from '../types';
import { formatCurrency, getWhatsAppLink } from '../utils/helpers';
import { CardapioButton } from './CardapioButton';
import { playClickSound, playHoverTick, playWhatsappTone, playCardapioChime } from '../utils/soundEffects';

interface DigitalMenuModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function DigitalMenuModal({ isOpen, onClose }: DigitalMenuModalProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  if (!isOpen) return null;

  const categories = [
    { id: 'all', label: 'Todos os Pratos' },
    { id: 'combos', label: 'Combos Especiais (20 & 50 pçs)' },
    { id: 'hot', label: 'Hot Rolls & Fritos' },
    { id: 'temaki', label: 'Temakis Recheados' },
    { id: 'sashimi', label: 'Sashimis & Niguiris' },
    { id: 'entradas', label: 'Yakisoba & Entradas' },
    { id: 'bebidas', label: 'Bebidas' },
  ];

  const filteredItems = MENU_ITEMS.filter(item => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleOrderSpecificItem = (item: MenuItem) => {
    playWhatsappTone();
    const msg = `Olá Sushi Paulista! Gostaria de pedir: *${item.name}* (${formatCurrency(item.price)}). Poderia me confirmar a disponibilidade?`;
    window.open(getWhatsAppLink(msg), '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-zinc-950/85 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-4xl max-h-[92vh] bg-zinc-950 border border-zinc-800 rounded-3xl shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Header */}
        <div className="p-4 sm:p-6 bg-zinc-900/90 border-b border-zinc-800 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-rose-600 to-red-600 flex items-center justify-center text-white shadow-md">
              <Utensils className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg sm:text-xl font-bold text-white font-['Cinzel',serif]">
                  Cardápio Digital Sushi Paulista
                </h3>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 border border-rose-500/30 hidden sm:inline-block">
                  Águas Belas - PE
                </span>
              </div>
              <p className="text-xs text-zinc-400">
                Menos arroz e muito mais recheio • Pedido mínimo: <strong className="text-zinc-200">{RESTAURANT_INFO.minimumOrder}</strong>
              </p>
            </div>
          </div>

          <button
            onClick={() => { playClickSound(); onClose(); }}
            id="modal-close-menu-btn"
            className="p-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-white transition-colors cursor-pointer"
            aria-label="Fechar cardápio"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Highlight Banner: Direct InstaDelivery Order Link with colorful animated button */}
        <div className="bg-gradient-to-r from-rose-950/70 via-zinc-900 to-amber-950/70 p-3.5 px-4 sm:px-6 border-b border-rose-500/30 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-center sm:text-left">
            <p className="text-xs font-bold text-white flex items-center justify-center sm:justify-start gap-1.5">
              <Sparkles className="w-4 h-4 text-amber-400 animate-spin" style={{ animationDuration: '4s' }} />
              <span>Cardápio Oficial Interativo no InstaDelivery</span>
            </p>
            <p className="text-[11px] text-zinc-400">
              Faça pedidos completos com carrinho, cálculo de entrega e pagamento online:
            </p>
          </div>

          <CardapioButton
            id="modal-instadelivery-banner-btn"
            size="sm"
            text="ABRIR NO INSTADELIVERY ➔"
          />
        </div>

        {/* Search & Category Filter Bar */}
        <div className="p-4 bg-zinc-900/50 border-b border-zinc-800 space-y-3">
          <div className="relative">
            <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Buscar por combo, salmão, hot roll, temaki, yakisoba..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-xs sm:text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-rose-500 transition-colors"
            />
          </div>

          {/* Category Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-xs">
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => { playClickSound(); setSelectedCategory(cat.id); }}
                onMouseEnter={() => playHoverTick()}
                className={`px-3 py-1.5 rounded-xl font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-rose-600 text-white shadow-md shadow-rose-950'
                    : 'bg-zinc-900 hover:bg-zinc-800 text-zinc-300 border border-zinc-800'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Menu Items Grid Scrollable Area */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredItems.map(item => (
              <div
                key={item.id}
                className="p-4 rounded-2xl bg-zinc-900/60 hover:bg-zinc-900 border border-zinc-800/80 hover:border-zinc-700 transition-all flex flex-col justify-between gap-3 group"
              >
                <div className="flex items-start gap-3.5">
                  {item.image && (
                    <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden shrink-0 border border-zinc-700/60 bg-zinc-800">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        referrerPolicy="no-referrer"
                      />
                      {item.pieces && (
                        <span className="absolute bottom-1 right-1 text-[9px] font-bold px-1.5 py-0.5 rounded bg-zinc-950/90 text-zinc-200 backdrop-blur-xs">
                          {item.pieces} pçs
                        </span>
                      )}
                    </div>
                  )}

                  <div className="flex-1 min-w-0 space-y-1">
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="text-sm sm:text-base font-bold text-white group-hover:text-rose-300 transition-colors leading-tight">
                        {item.name}
                      </h4>
                    </div>

                    {item.highlightTag && (
                      <span className="inline-block text-[10px] font-bold px-2 py-0.5 rounded bg-amber-500/10 text-amber-300 border border-amber-500/20">
                        {item.highlightTag}
                      </span>
                    )}

                    <p className="text-xs text-zinc-400 leading-snug line-clamp-2">
                      {item.description}
                    </p>
                  </div>
                </div>

                <div className="pt-2 border-t border-zinc-800/60 flex items-center justify-between">
                  <span className="text-base sm:text-lg font-black text-amber-400">
                    {formatCurrency(item.price)}
                  </span>

                  <button
                    onClick={() => handleOrderSpecificItem(item)}
                    onMouseEnter={() => playHoverTick()}
                    id={`menu-order-btn-${item.id}`}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md transition-all active:scale-95 cursor-pointer"
                  >
                    <MessageCircle className="w-3.5 h-3.5 fill-white text-emerald-600" />
                    <span>Pedir no WhatsApp</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

          {filteredItems.length === 0 && (
            <div className="py-12 text-center space-y-2">
              <span className="text-3xl">🔍</span>
              <p className="text-sm font-semibold text-zinc-300">Nenhum prato encontrado para "{searchQuery}"</p>
              <button
                onClick={() => { playClickSound(); setSearchQuery(''); setSelectedCategory('all'); }}
                className="text-xs text-rose-400 hover:underline cursor-pointer"
              >
                Limpar filtros de busca
              </button>
            </div>
          )}
        </div>

        {/* Modal Bottom Action Footer */}
        <div className="p-4 sm:p-5 bg-zinc-900/90 border-t border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-xs text-zinc-400 text-center sm:text-left">
            <span>Deseja personalizar seu combinado ou tirar dúvidas com o Chef?</span>
          </div>

          <div className="flex items-center gap-2.5 w-full sm:w-auto">
            <a
              href={getWhatsAppLink("Olá Sushi Paulista! Estou olhando o cardápio digital e gostaria de fazer meu pedido.")}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => playWhatsappTone()}
              onMouseEnter={() => playHoverTick()}
              className="flex-1 sm:flex-initial flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition-all shadow-md"
            >
              <MessageCircle className="w-4 h-4 fill-white text-emerald-600" />
              <span>Fazer Pedido Geral no WhatsApp</span>
            </a>

            <button
              onClick={() => { playClickSound(); onClose(); }}
              className="px-4 py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 font-semibold text-xs transition-colors cursor-pointer"
            >
              Fechar
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
