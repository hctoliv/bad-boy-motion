// menu real de badboy.com.br (29/10/2026). "c" = handle da coleção, aberta em colecao.html
const MENU = [
  { t: 'Lançamentos', c: 'lancamentos' },
  {
    t: 'Masculino', c: 'bad-boy',
    items: [
      ['Mais vendidos', 'mais-vendidos-no-site'], ['Camisetas', 'camisetas'], ['Regatas', 'regatas'],
      ['Rashguard', 'rashguard-todas'], ['Bermudas e shorts', 'bermudas-e-shorts'], ['Calças', 'calcas'],
      ['Moletons e jaquetas', 'moletons-e-jaquetas-1'], ['Kimonos e faixas', 'kimonos'], ['Cuecas', 'cueca-bad-boy'],
      ['Bonés e gorros', 'bones'], ['Calçados', 'calcados-masculinos'], ['Óculos de sol', 'oculos-de-sol-masculino'],
      ['Acessórios', 'acessorios-bad'], ['Cosméticos', 'cosmeticos-badboy-barba-cabelo'],
    ],
    promo: [['img/cat-camisetas.jpg', 'Camisetas', 'camisetas'], ['img/cat-moletom.jpg', 'Moletons', 'moletons-e-jaquetas-1']],
  },
  {
    t: 'Feminino', c: 'bad-girl',
    items: [
      ['Tops', 'blusa-feminino'], ['Shorts', 'shorts-feminino'], ['Linha fitness', 'fitness'],
      ['Conjuntos', 'conjunto-de-moletom-sexy-machine'], ['Bonés', 'bones-e-chapeus-femininos'],
      ['Óculos de sol', 'oculos-de-sol-feminino'], ['Meias', 'meias-feminino'], ['Sexy Machine', 'sexy-machine'],
    ],
    promo: [['img/p/top-frente-unica-sexy-machine-soft-rose-1.jpg', 'Sexy Machine', 'sexy-machine'], ['img/p/macaquinho-sexy-machine-soft-black-1.jpg', 'Linha fitness', 'fitness']],
  },
  {
    t: 'Equipamentos', c: 'equipamentos-de-luta',
    items: [
      ['Equipamentos de luta', 'equipamentos-de-luta'], ['Kimonos e patchs', 'kimonos'],
      ['Equipamento infantil', 'equipamento-de-luta-infantil'], ['Mochilas e acessórios', 'mochilas-masculino'],
      ['Garrafas', 'garrafas-e-copos-bad-boy'],
    ],
    promo: [['img/luta-manopla.jpg', 'Boxe', 'boxe'], ['img/kimono-roots.jpg', 'Kimonos', 'kimonos']],
  },
  {
    t: 'Coleções',
    items: [
      ['Infantil', 'infantil'], ["Old School 90's", 'old-school'], ['BJJ', 'bjj'], ['Tactical', 'tactical'],
      ['Oversized', 'camisetas-oversized'], ['Pro Series', 'pro-series'], ['Respect is earned', 'respect-is-earned'],
      ['Boxe', 'boxe'], ['Bodybuilding', 'bodybuilding'], ['Surf', 'surf'], ['Colecionáveis', 'colecionaveis'],
      ['Couro', 'couro-colecao-couro-bad-boy'], ['Pré venda', 'pre-venda'],
    ],
    promo: [['img/col-tactical.jpg', 'Tactical', 'tactical'], ['img/col-oldschool.jpg', 'Old School', 'old-school']],
  },
  { t: 'Suplementos', c: 'suplemento' },
  {
    t: 'Outlet', c: 'outlet', sale: true,
    items: [['Ver tudo', 'outlet'], ['Kits: leve mais por menos', 'kits-leve-mais-por-menos']],
  },
  {
    t: 'Marcas',
    items: [
      ['Bad Boy', 'bad-boy'], ['Bad Boy Tactical', 'tactical'], ['Bad Girl', 'bad-girl'],
      ['Sexy Machine', 'sexy-machine'], ["Life's A Beach", 'life-is-a-beach'],
    ],
  },
];
