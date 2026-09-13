import { MenuItem, QuizQuestion, QuizResultProfile, ReviewItem, InstagramReel } from '../types';

export const RESTAURANT_INFO = {
  name: "Sushi Paulista – Culinária Asiática",
  shortName: "Sushi Paulista",
  city: "Águas Belas - PE",
  sloganMain: "O Melhor Sushi de Águas Belas 🏆",
  sloganSecondary: "Menos Arroz 🍚 + RECHEIO 🍣",
  address: "Av. Coronel Constantino, 56 (Rua do Sertão) – Em frente à FÁ Motos",
  addressFull: "Av. Coronel Constantino, 56 (Rua do Sertão) – Em frente à FÁ Motos, Águas Belas - PE, 55340-000",
  hours: "Terça a Domingo, das 19:00 às 23:00",
  phoneFormatted: "+55 (87) 99626-2681",
  phoneRaw: "5587996262681",
  minimumOrder: "R$ 25,00",
  serviceTypes: "À La Carte & Delivery",
  instagramHandle: "@sushi_paulista",
  instagramUrl: "https://www.instagram.com/sushi_paulista/",
  googleRating: 5.0,
  googleRatingCount: 148,
  googleReviewUrl: "https://www.google.com/maps/search/?api=1&query=Sushi+Paulista+Aguas+Belas+PE",
  instaDeliveryUrl: "https://instadelivery.com.br/sushipaulistadelivery", // Official InstaDelivery order link
  mapsEmbedUrl: "https://maps.google.com/maps?q=Av.+Coronel+Constantino,+56,+Aguas+Belas+-+PE&t=&z=16&ie=UTF8&iwloc=&output=embed",
};

export const CHEF_STORY = {
  welcomeQuote: "Olá, seja muito bem-vindo(a) ao nosso cardápio digital Sushi Paulista! 🥰",
  historyParagraph: "Todo o nosso cardápio foi elaborado e criado por nosso Chef. Nosso Chef prestou serviços por vários anos no Restaurante Super Grill Express no Shopping Cidade São Paulo, na Av. Paulista.",
  closingQuote: "Tudo foi criado e montado com muito cuidado e carinho pensando em você! 🥰",
  highlights: [
    {
      title: "Experiência de São Paulo",
      description: "Técnica e rigor adquiridos no Super Grill Express da Avenida Paulista.",
      icon: "Award"
    },
    {
      title: "Menos Arroz, Mais Recheio",
      description: "Nosso padrão de ouro: peças generosamente recheadas com salmão e ingredientes nobres.",
      icon: "Sparkles"
    },
    {
      title: "Peixes Frescos & Cuidados",
      description: "Cortes precisos e frescor diário para garantir o sabor incomparável em cada peça.",
      icon: "Fish"
    },
    {
      title: "Delivery Rápido & Seguro",
      description: "Embalagens térmicas especiais para manter os quentes crocantes e os frios no ponto certo.",
      icon: "Truck"
    }
  ]
};

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: "Qual é o seu nível de experiência com comida japonesa?",
    subtitle: "Selecione a opção que melhor define seu paladar:",
    options: [
      {
        letter: 'A',
        text: "Iniciante — Prefiro opções quentes ou fritos (Hot Roll).",
        icon: "🔥",
        scoreType: 'iniciante_hot'
      },
      {
        letter: 'B',
        text: "Intermediário — Adoro o clássico: Salmão, Cream Cheese e Uramaki.",
        icon: "🍣",
        scoreType: 'classico_salmao'
      },
      {
        letter: 'C',
        text: "Avançado — Sou fã de lâminas de peixe cru fresco (Sashimi e Niguiri).",
        icon: "🥢",
        scoreType: 'expert_sashimi'
      },
      {
        letter: 'D',
        text: "Família/Grupo — Vim para dividir um combo grande com todo mundo!",
        icon: "🍱",
        scoreType: 'familia_banquete'
      }
    ]
  },
  {
    id: 2,
    question: "O que não pode faltar no seu pedido?",
    subtitle: "O detalhe essencial que conquista seu coração:",
    options: [
      {
        letter: 'A',
        text: "Muito recheio e pouco arroz! 🍣",
        icon: "🍣",
        scoreType: 'classico_salmao'
      },
      {
        letter: 'B',
        text: "Cream cheese bastante cremoso! 🧀",
        icon: "🧀",
        scoreType: 'iniciante_hot'
      },
      {
        letter: 'C',
        text: "Um toque crocante e bem quentinho! 🔥",
        icon: "⚡",
        scoreType: 'iniciante_hot'
      },
      {
        letter: 'D',
        text: "Variedade para provar de tudo um pouco! 🍱",
        icon: "🍱",
        scoreType: 'familia_banquete'
      }
    ]
  },
  {
    id: 3,
    question: "Qual é o tamanho da sua fome hoje?",
    subtitle: "Escolha a proporção ideal para matar sua vontade:",
    options: [
      {
        letter: 'A',
        text: "Uma entrada rápida ou um prato individual leve.",
        icon: "🥗",
        scoreType: 'iniciante_hot'
      },
      {
        letter: 'B',
        text: "Um combo individual generoso (ex: Combo de 20 peças).",
        icon: "🍣",
        scoreType: 'classico_salmao'
      },
      {
        letter: 'C',
        text: "Fome de gigante! Quero um banquete (ex: Combo de 50 peças).",
        icon: "👑",
        scoreType: 'familia_banquete'
      },
      {
        letter: 'D',
        text: "Algo especial para um jantar romântico ou em dupla.",
        icon: "❤️",
        scoreType: 'expert_sashimi'
      }
    ]
  },
  {
    id: 4,
    question: "Qual acompanhamento/estilo você prefere além do sushi tradicional?",
    subtitle: "Aquele item que fecha a refeição com chave de ouro:",
    options: [
      {
        letter: 'A',
        text: "Temaki caprichado e recheado.",
        icon: "🍙",
        scoreType: 'classico_salmao'
      },
      {
        letter: 'B',
        text: "Macarrão Asiático / Yakisoba / Shimeji.",
        icon: "🍜",
        scoreType: 'familia_banquete'
      },
      {
        letter: 'C',
        text: "Hot Roll crocante com molho tarê.",
        icon: "🔥",
        scoreType: 'iniciante_hot'
      },
      {
        letter: 'D',
        text: "Combinado variado de lâminas e sushis especiais.",
        icon: "✨",
        scoreType: 'expert_sashimi'
      }
    ]
  },
  {
    id: 5,
    question: "Qual é o momento perfeito para comer Sushi Paulista?",
    subtitle: "Qualquer hora é boa, mas hoje é especial:",
    options: [
      {
        letter: 'A',
        text: "No meio da semana para relaxar após o trabalho.",
        icon: "🛋️",
        scoreType: 'iniciante_hot'
      },
      {
        letter: 'B',
        text: "No final de semana reunido com a família ou amigos.",
        icon: "🎉",
        scoreType: 'familia_banquete'
      },
      {
        letter: 'C',
        text: "Em uma data especial ou jantar a dois.",
        icon: "🥂",
        scoreType: 'expert_sashimi'
      },
      {
        letter: 'D',
        text: "Qualquer dia entre terça e domingo das 19h às 23h!",
        icon: "⏰",
        scoreType: 'classico_salmao'
      }
    ]
  },
  {
    id: 6,
    question: "O que você prioriza na hora de escolher um restaurante?",
    subtitle: "A sua garantia de uma experiência gastronômica impecável:",
    options: [
      {
        letter: 'A',
        text: "Qualidade dos ingredientes e experiência do Chef.",
        icon: "👨‍🍳",
        scoreType: 'expert_sashimi'
      },
      {
        letter: 'B',
        text: "Atendimento atencioso e entrega rápida.",
        icon: "⚡",
        scoreType: 'iniciante_hot'
      },
      {
        letter: 'C',
        text: "Avaliações nota 5 no Google e recomendação de amigos.",
        icon: "⭐",
        scoreType: 'classico_salmao'
      },
      {
        letter: 'D',
        text: "Todas as alternativas anteriores!",
        icon: "💯",
        scoreType: 'familia_banquete'
      }
    ]
  }
];

export const QUIZ_RESULTS: Record<string, QuizResultProfile> = {
  iniciante_hot: {
    id: "iniciante_hot",
    title: "Festival Hot Roll Crocante & Especial",
    slogan: "Crocância Perfeita com Molho Tarê & Cream Cheese",
    recommendedDish: "Combo Hot Supreme (20 peças quentes crocantes)",
    dishDescription: "Perfeito para quem adora a fusão entre a casquinha panko super crocante, recheio farto de salmão, cream cheese derretido e fio especial de molho tarê e cebolinha fresca.",
    piecesCount: "20 Peças",
    priceEstimate: "R$ 49,90",
    tags: ["Super Crocante", "Muito Recheio", "Molho Tarê Especial", "Campeão de Pedidos"],
    imageUrl: "https://images.unsplash.com/photo-1617196034796-73dfa7b1fd56?auto=format&fit=crop&w=800&q=80",
    whatsappMessage: "Olá, Sushi Paulista! Fiz o Quiz no site e meu resultado deu *Festival Hot Roll Crocante*! Gostaria de fazer meu pedido agora."
  },
  classico_salmao: {
    id: "classico_salmao",
    title: "Combo Salmão Paulista Clássico",
    slogan: "O Equilíbrio Perfeito: Menos Arroz + MUITO Salmão!",
    recommendedDish: "Combo Clássico 20 Peças (Uramakis, Hossomakis & Niguiris)",
    dishDescription: "O preferido dos clientes fiéis! Seleção nobre de Uramakis Philadelphia com gergelim torrado, Hossomakis de puro salmão fresco e Niguiris com lâminas generosas sobre pouco arroz temperado pelo Chef.",
    piecesCount: "20 Peças",
    priceEstimate: "R$ 54,90",
    tags: ["Salmão Fresco", "Menos Arroz + Recheio", "Philadelphia", "Nota 5.0"],
    imageUrl: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=800&q=80",
    whatsappMessage: "Olá, Sushi Paulista! Fiz o Quiz no site e meu resultado deu *Combo Salmão Clássico 20 Peças*! Gostaria de pedir."
  },
  expert_sashimi: {
    id: "expert_sashimi",
    title: "Combinado Degustação do Chef Especial",
    slogan: "Para Apreciadores de Lâminas Nobres e Cortes de São Paulo",
    recommendedDish: "Combinado Premium do Chef (Sashimis Frescos + Dyo de Salmão + Niguiri)",
    dishDescription: "Uma verdadeira obra de arte inspirada na experiência do Chef no Shopping Cidade São Paulo. Lâminas espessas de salmão cru selecionado, Dyos maçaricados com toque de geleia de pimenta e niguiris especiais.",
    piecesCount: "26 Peças",
    priceEstimate: "R$ 69,90",
    tags: ["Sashimi Fresco", "Dyo Especial", "Técnica Paulista", "Experiência Nobre"],
    imageUrl: "https://images.unsplash.com/photo-1534482421-64566f976cfa?auto=format&fit=crop&w=800&q=80",
    whatsappMessage: "Olá, Sushi Paulista! Fiz o Quiz no site e meu resultado deu *Combinado Degustação do Chef*! Gostaria de fazer o pedido."
  },
  familia_banquete: {
    id: "familia_banquete",
    title: "Grande Banquete Paulista 50 Peças",
    slogan: "Para Compartilhar a Melhor Mesa de Águas Belas com Todo Mundo!",
    recommendedDish: "Mega Combo Especial 50 Peças Variadas",
    dishDescription: "O banquete definitivo para a família ou amigos! Mix completo contendo Hot Rolls crocantes, Uramakis variados, Sashimis de Salmão, Niguiris e Joy com cream cheese. Fartura e qualidade inigualável.",
    piecesCount: "50 Peças",
    priceEstimate: "R$ 119,90",
    tags: ["50 Peças", "Ideal para Grupos", "Variedade Total", "Melhor Custo-Benefício"],
    imageUrl: "https://images.unsplash.com/photo-1553621042-f6e147245754?auto=format&fit=crop&w=800&q=80",
    whatsappMessage: "Olá, Sushi Paulista! Fiz o Quiz no site e meu resultado deu o *Mega Combo 50 Peças* para reunir a galera! Gostaria de pedir."
  }
};

export const MENU_ITEMS: MenuItem[] = [
  {
    id: "combo-50",
    name: "Mega Combo Especial 50 Peças",
    category: "combos",
    description: "Mix completo e farto: 10 Hot Rolls crocantes, 10 Uramakis Philadelphia, 10 Hossomakis de Salmão, 10 Sashimis e 10 Niguiris especiais.",
    price: 119.90,
    pieces: 50,
    highlightTag: "Mais Vendido da Casa 🏆",
    popular: true,
    image: "https://images.unsplash.com/photo-1553621042-f6e147245754?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "combo-20-classico",
    name: "Combo Clássico Salmão 20 Peças",
    category: "combos",
    description: "6 Uramakis Philadelphia com gergelim, 6 Hossomakis Salmão, 4 Niguiris de Salmão e 4 Hot Rolls crocantes.",
    price: 54.90,
    pieces: 20,
    highlightTag: "Menos Arroz + Recheio 🍣",
    popular: true,
    image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "combo-20-hot",
    name: "Combo Hot Supreme 20 Peças",
    category: "combos",
    description: "20 Hot Rolls empanados na farinha panko japonesa, repletos de salmão, cream cheese, molho tarê e cebolinha.",
    price: 49.90,
    pieces: 20,
    highlightTag: "100% Crocante 🔥",
    popular: true,
    image: "https://images.unsplash.com/photo-1617196034796-73dfa7b1fd56?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "temaki-especial",
    name: "Temaki Salmão Completo em Dobro Recheio",
    category: "temaki",
    description: "Cone de alga nori super crocante, salmão fresco em cubos fartos, cream cheese cremoso e cebolinha fresca. Quase sem arroz!",
    price: 28.90,
    highlightTag: "Recheio Generoso 🍙",
    popular: true,
    image: "https://images.unsplash.com/photo-1611143669185-af224c5e3252?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "temaki-hot",
    name: "Temaki Hot Empanado Crocante",
    category: "temaki",
    description: "Temaki inteiro empanado e frito na hora, recheado com pasta de salmão e cream cheese, coberto com molho tarê.",
    price: 31.90,
    highlightTag: "Crocante & Quente 🔥",
    popular: false,
    image: "https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "sashimi-salmao-10",
    name: "Sashimi Puro Salmão Fresco (10 Lâminas)",
    category: "sashimi",
    description: "10 lâminas espessas e suculentas de salmão fresco nobre, cortadas com precisão milimétrica pelo Chef.",
    price: 39.90,
    pieces: 10,
    highlightTag: "Peixe Nobre Selecionado ✨",
    popular: true,
    image: "https://images.unsplash.com/photo-1534482421-64566f976cfa?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "dyo-especial",
    name: "Dyo Especial de Salmão com Geleia (6 unidades)",
    category: "sashimi",
    description: "Arroz envolto por lâmina de salmão maçaricado, coberto com cream cheese e geleia artesanal de pimenta/maracujá.",
    price: 29.90,
    pieces: 6,
    highlightTag: "Toque Gourmet 🌶️",
    popular: false,
    image: "https://images.unsplash.com/photo-1615361200141-f45040f367be?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "yakisoba-misto",
    name: "Yakisoba Tradicional Especial Paulista",
    category: "entradas",
    description: "Macarrão artesanal asiático, legumes frescos selecionados crocantes, carne macia e frango com molho especial oriental.",
    price: 34.90,
    highlightTag: "Receita do Chef 🍜",
    popular: true,
    image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "shimeji-manteiga",
    name: "Shimeji na Manteiga com Cebolinha",
    category: "entradas",
    description: "Cogumelos shimeji frescos puxados na manteiga da terra e shoyu suave, finalizados com cebolinha verde.",
    price: 26.90,
    highlightTag: "Entrada Quente 🍄",
    popular: false,
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "bebidas-refrigerante",
    name: "Refrigerante Lata / Sucos Naturais",
    category: "bebidas",
    description: "Coca-Cola Original, Coca Zero, Guaraná Antarctica ou Suco natural da fruta geladinho.",
    price: 6.50,
    popular: false,
    image: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=600&q=80"
  }
];

export const REVIEWS_LIST: ReviewItem[] = [
  {
    id: "rev-1",
    author: "Matheus Albuquerque",
    location: "Águas Belas - PE",
    rating: 5,
    date: "Há 2 dias",
    comment: "Melhor sushi da região sem dúvidas! O lema de 'menos arroz e mais recheio' é 100% real. O combo de 50 peças veio impecável e super fresco.",
    avatarColor: "from-rose-500 to-amber-500"
  },
  {
    id: "rev-2",
    author: "Camila Bezerra",
    location: "Águas Belas - PE",
    rating: 5,
    date: "Há 1 semana",
    comment: "A qualidade do salmão e o sabor do Hot Roll lembram muito os sushis que comi em São Paulo. O Chef está de parabéns! Atendimento nota 10 no WhatsApp.",
    avatarColor: "from-emerald-500 to-teal-500"
  },
  {
    id: "rev-3",
    author: "Rafael Cavalcanti",
    location: "Águas Belas - PE",
    rating: 5,
    date: "Há 2 semanas",
    comment: "Experiência incrível! Pedido entregue super rápido, quentinho e com uma apresentação linda. O Temaki é gigante e muito recheado. Nota 5 estrelas!",
    avatarColor: "from-amber-500 to-orange-500"
  },
  {
    id: "rev-4",
    author: "Juliana Mendes",
    location: "Águas Belas - PE",
    rating: 5,
    date: "Há 3 semanas",
    comment: "O molho tarê da casa é sensacional e o cream cheese é de verdade. Já virou nosso jantar obrigatório do final de semana aqui em casa!",
    avatarColor: "from-purple-500 to-rose-500"
  },
  {
    id: "rev-5",
    author: "Lucas Tenório",
    location: "Águas Belas - PE",
    rating: 5,
    date: "Há 1 mês",
    comment: "Simplesmente espetacular! O sashimi derrete na boca e a apresentação dos combinados é impecável. Melhor custo-benefício de Águas Belas.",
    avatarColor: "from-blue-500 to-indigo-500"
  },
  {
    id: "rev-6",
    author: "Beatriz Siqueira",
    location: "Águas Belas - PE",
    rating: 5,
    date: "Há 1 mês",
    comment: "Amei o Quiz e pedi o Combo Hot Supreme. Veio super crocante, quentinho e embalado com todo o capricho. Virei cliente fiel!",
    avatarColor: "from-pink-500 to-rose-500"
  },
  {
    id: "rev-7",
    author: "Thiago Ferreira",
    location: "Águas Belas - PE",
    rating: 5,
    date: "Há 2 meses",
    comment: "Atendimento exemplar e rapidez na entrega. Os rolinhos e o yakisoba são deliciosos. Parabéns à equipe do Sushi Paulista!",
    avatarColor: "from-amber-600 to-yellow-500"
  },
  {
    id: "rev-8",
    author: "Mariana Duarte",
    location: "Águas Belas - PE",
    rating: 5,
    date: "Há 2 meses",
    comment: "Peixes fresquíssimos e padrão paulista de qualidade. Dá para sentir o carinho em cada peça. Recomendo de olhos fechados!",
    avatarColor: "from-teal-500 to-emerald-600"
  },
  {
    id: "rev-9",
    author: "Carlos Eduardo",
    location: "Águas Belas - PE",
    rating: 5,
    date: "Há 3 meses",
    comment: "O melhor lugar para pedir sushi com a patroa no fim de semana. Farto, saboroso e preço justo. Nota 10!",
    avatarColor: "from-violet-500 to-purple-600"
  },
  {
    id: "rev-10",
    author: "Fernanda Lima",
    location: "Águas Belas - PE",
    rating: 5,
    date: "Há 3 meses",
    comment: "Surpreendente! Não esperava encontrar um sushi tão refinado em Águas Belas. O dyo maçaricado com geleia é divino.",
    avatarColor: "from-rose-600 to-pink-500"
  }
];

export const INSTAGRAM_REELS: InstagramReel[] = [
  {
    id: "reel-1",
    title: "Mega Combo 50 Peças Sendo Montado",
    caption: "Menos arroz 🍚 e MUITO RECHEIO 🍣! Olha o capricho do nosso Chef preparando o Mega Combo 50 Peças de hoje em Águas Belas!",
    imageUrl: "https://images.unsplash.com/photo-1553621042-f6e147245754?auto=format&fit=crop&w=700&h=1240&q=85",
    videoUrl: "https://res.cloudinary.com/h8uymlg5/video/upload/v1789337156/SnapInsta.to_AQO1Cyl5-FG1z5vFhuGjEcZDKrUR_aIrNvSwPXJuk29pt4IWqMiI_mXaR2_44avCHVhtzDY_qlZsIl0_W64EF2kbQcCMyAGZNLIv5JI.mp4",
    views: "24.8k",
    likes: "1.4k",
    commentsCount: "86",
    duration: "0:28",
    audioTrack: "sushi_paulista • Som Original",
    tag: "Mega Combo 50pçs",
    isPopular: true
  },
  {
    id: "reel-2",
    title: "O Crocante Incomparável do Hot Roll",
    caption: "Aumente o som e ouça a crocância da farinha Panko japonesa com o salmão cremoso e molho tarê especial! 🔥",
    imageUrl: "https://images.unsplash.com/photo-1617196034796-73dfa7b1fd56?auto=format&fit=crop&w=700&h=1240&q=85",
    videoUrl: "https://res.cloudinary.com/h8uymlg5/video/upload/v1789337156/SnapInsta.to_AQMZbAyZ1P4Ct-KrNfNUMqDdQ3d-0mqJSUwbk3NSRyZE9PvwGRPJJjCgNz-jXmfV7KPGfG-yvOiHhg5mlUTkmU1fhbuNz-mPhsj6Ikc.mp4",
    views: "38.2k",
    likes: "2.1k",
    commentsCount: "142",
    duration: "0:19",
    audioTrack: "sushi_paulista • ASMR Crocante",
    tag: "Hot Roll Panko 🔥",
    isPopular: true
  },
  {
    id: "reel-3",
    title: "Corte Preciso de Salmão Fresco",
    caption: "Técnica adquirida em anos na Av. Paulista em São Paulo. Fatias espessas de sashimi com frescor rigoroso do dia ✨",
    imageUrl: "https://images.unsplash.com/photo-1534482421-64566f976cfa?auto=format&fit=crop&w=700&h=1240&q=85",
    videoUrl: "https://res.cloudinary.com/h8uymlg5/video/upload/v1789337163/SnapInsta.to_AQOMVUzWCUrJ2JFi1Oe2fsEiB1JJIYJdJCpoIafuLxyOlZe0Pu1FtVABL1cdYpyahzmMKRuYKJ--VsG-YWWm0kKDnjcy4eymEzyVlj4.mp4",
    views: "19.5k",
    likes: "980",
    commentsCount: "54",
    duration: "0:34",
    audioTrack: "sushi_paulista • Tradição & Arte",
    tag: "Sashimi do Chef",
    isPopular: false
  },
  {
    id: "reel-4",
    title: "Temaki Transbordando Salmão e Cream Cheese",
    caption: "Alga nori crocante e quase nada de arroz. Aqui é puro recheio de verdade! Quem aí aguenta comer dois desse? 🍙🤤",
    imageUrl: "https://images.unsplash.com/photo-1611143669185-af224c5e3252?auto=format&fit=crop&w=700&h=1240&q=85",
    videoUrl: "https://res.cloudinary.com/h8uymlg5/video/upload/v1789337164/SnapInsta.to_AQOreuZIeFzcowi9VMCjBwmxAMZrBaL-Kt3l2JcEIIyRmqc8WrRSKkPEhqZtQVETiI58o_UXd3zvDHBK34ERTJQhq9VzCVfS1k3O0yo.mp4",
    views: "31.9k",
    likes: "1.8k",
    commentsCount: "119",
    duration: "0:22",
    audioTrack: "sushi_paulista • Menos Arroz + Recheio",
    tag: "Temaki Dobro Recheio",
    isPopular: true
  },
  {
    id: "reel-5",
    title: "Combo 20 Peças: O Queridinho do Jantar",
    caption: "Perfeito para o seu jantar de terça a domingo! Salmão fresquinho, niguiris impecáveis e aquele toque paulista 🥰",
    imageUrl: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=700&h=1240&q=85",
    videoUrl: "https://res.cloudinary.com/h8uymlg5/video/upload/v1789337177/SnapInsta.to_AQOpwO5gkNw6973CRXrlh_UZ9jKcgNjmnMZHjjy7CJxq8SoNPZ_D5gW0Yl4fu50m2x2bC1qcnc6Yxe4IyQUscDzO4Q32-qVCVc6YOX4.mp4",
    views: "16.4k",
    likes: "820",
    commentsCount: "43",
    duration: "0:15",
    audioTrack: "sushi_paulista • Jantar Águas Belas",
    tag: "Combo 20pçs Salmão",
    isPopular: false
  },
  {
    id: "reel-6",
    title: "Dyo Maçaricado com Geleia Artesanal",
    caption: "Finalização no maçarico com aroma irresistível e toque de pimenta suave. Uma explosão de sabor na sua boca! 🔥🌶️",
    imageUrl: "https://images.unsplash.com/photo-1615361200141-f45040f367be?auto=format&fit=crop&w=700&h=1240&q=85",
    videoUrl: "https://res.cloudinary.com/h8uymlg5/video/upload/v1789337554/SnapInsta.to_AQN66wKnVnL-jbqhplGnQkO6hzT-O7oMemLulkBRdcyulKqoLKs7kBjsnjNXwQwd5OML4-1rBpGXgne6iwkBPgYwPe5Sv1iksdK-27c.mp4",
    views: "27.1k",
    likes: "1.5k",
    commentsCount: "97",
    duration: "0:25",
    audioTrack: "sushi_paulista • Gourmet Especial",
    tag: "Dyo Maçaricado 🌶️",
    isPopular: true
  },
  {
    id: "reel-7",
    title: "Bastidores e Preparo no Sushi Paulista",
    caption: "Todo o rigor e frescor que você merece em cada combo entregue em Águas Belas! 🍣🥢",
    imageUrl: "https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=700&h=1240&q=85",
    videoUrl: "https://res.cloudinary.com/h8uymlg5/video/upload/v1789337553/SnapInsta.to_AQPec4rFEntpnU-ry6RPKKDQyOU-RLpdWI4nHfyKvZ46xgDgPDS156rKonUXTm9w8pemAGKtRmZyclHn2zO8GFWR9VUkvCLAvTPAp6w.mp4",
    views: "21.3k",
    likes: "1.1k",
    commentsCount: "68",
    duration: "0:21",
    audioTrack: "sushi_paulista • Bastidores",
    tag: "Bastidores Chef",
    isPopular: false
  }
];

