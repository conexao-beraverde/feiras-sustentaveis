/* =====================================================
   FEIRAS SUSTENTÁVEIS DE PORTO VELHO — script.js
   Baseado na lógica do template Forest (menu mobile + selo
   de clima), adaptado para o conteúdo das feirinhas.
   ===================================================== */

document.addEventListener("DOMContentLoaded", () => {

  /* ---------------------------------------------------
     Menu mobile (igual ao template original)
     --------------------------------------------------- */
  const mobileButton = document.getElementById("mobile-button");
  const mobileMenu = document.getElementById("mobile-menu");

  mobileButton.addEventListener("click", () => {
    mobileMenu.classList.toggle("hidden");
    mobileMenu.classList.toggle("flex");
  });

  mobileMenu.addEventListener("click", (e) => {
    if (e.target.tagName === "A") {
      mobileMenu.classList.add("hidden");
      mobileMenu.classList.remove("flex");
    }
  });

  /* ---------------------------------------------------
     Dados (exemplo — trocar por API/BD futuramente)
     --------------------------------------------------- */
  const feiras = [
    {
      nome: "Feira do Mutirão",
      dia: "Domingo",
      diaFiltro: "domingo",
      horario: "06h às 12h",
      local: "Av. Sete de Setembro, Centro",
      tipo: "Frutas, verduras, mel e polpas",
      mapsQuery: "Feira+do+Mutirão+Porto+Velho",
      img: "https://images.unsplash.com/photo-1610348725531-843dff563e2c?auto=format&fit=crop&w=500&q=70"
    },
    {
      nome: "Feira da Agricultura Familiar",
      dia: "Sábado",
      diaFiltro: "sábado",
      horario: "07h às 13h",
      local: "Parque Circuito Urbano de Lazer",
      tipo: "Hortaliças orgânicas e derivados",
      mapsQuery: "Circuito+Urbano+de+Lazer+Porto+Velho",
      img: "https://images.unsplash.com/photo-1488459716781-31db52582fe9?auto=format&fit=crop&w=500&q=70"
    },
    {
      nome: "Feirinha do Aponiã",
      dia: "Quarta e Sábado",
      diaFiltro: "quarta",
      horario: "06h às 11h",
      local: "Bairro Aponiã",
      tipo: "PANCs, temperos e ervas regionais",
      mapsQuery: "Aponiã+Porto+Velho",
      img: "https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&w=500&q=70"
    },
    {
      nome: "Feira do Porto",
      dia: "Sexta",
      diaFiltro: "sexta",
      horario: "15h às 20h",
      local: "Beira Rio, Centro Histórico",
      tipo: "Peixes, frutas regionais e artesanato",
      mapsQuery: "Beira+Rio+Porto+Velho",
      img: "https://images.unsplash.com/photo-1595475207225-428b62bda831?auto=format&fit=crop&w=500&q=70"
    }
  ];

  /* Receitas de aproveitamento integral (casca, talo, folha, semente).
     As fotos são genéricas (do prato, não da receita exata) — Wikimedia Commons. */
  const receitas = [
    {
      nome: "Bolo de casca de banana",
      desc: "Bolo fofinho feito com as cascas que normalmente vão pro lixo.",
      img: "./img/receitas/bolo-casca-banana.jpg",
      credito: { texto: "Shisma · CC BY 4.0", url: "https://commons.wikimedia.org/wiki/File:Banana_bread_slices.jpg" },
      ingredientes: ["4 cascas de banana bem lavadas", "2 ovos", "1 xícara de açúcar", "1/2 xícara de óleo", "2 xícaras de farinha de trigo", "1 colher (sopa) de fermento em pó", "Canela a gosto"],
      preparo: ["Bata as cascas de banana com os ovos, o açúcar e o óleo no liquidificador.", "Misture a farinha e a canela e adicione o líquido batido.", "Acrescente o fermento e mexa delicadamente.", "Asse a 180 °C por cerca de 35 minutos."]
    },
    {
      nome: "Refogado de talo de couve",
      desc: "Acompanhamento rápido e crocante com os talos da couve.",
      img: "./img/receitas/talo-de-couve.jpg",
      credito: { texto: "Evan-Amos · domínio público", url: "https://commons.wikimedia.org/wiki/File:Collard-Greens-Bundle.jpg" },
      ingredientes: ["Talos de 1 maço de couve picados fininhos", "1 dente de alho picado", "1 colher (sopa) de azeite", "Sal e pimenta-do-reino a gosto"],
      preparo: ["Aqueça o azeite e doure o alho.", "Junte os talos picados e refogue por 5 a 7 minutos.", "Tempere e sirva quente."]
    },
    {
      nome: "Farofa de folha de beterraba",
      desc: "Farofa colorida que aproveita as folhas normalmente descartadas.",
      img: "./img/receitas/farofa-folha-beterraba.jpg",
      credito: { texto: "User Carioca · CC BY-SA 3.0", url: "https://commons.wikimedia.org/wiki/File:Farofa_brazil.jpg" },
      ingredientes: ["Folhas de 1 maço de beterraba picadas", "2 colheres (sopa) de manteiga ou azeite", "1 cebola pequena picada", "1 xícara de farinha de mandioca", "Sal a gosto"],
      preparo: ["Refogue a cebola até dourar.", "Acrescente as folhas e refogue até murchar.", "Adicione a farinha aos poucos até dourar levemente.", "Ajuste o sal e sirva."]
    },
    {
      nome: "Chips de casca de batata",
      desc: "Petisco crocante feito só com as cascas, assado no forno.",
      img: "./img/receitas/chips-casca-batata.jpg",
      credito: { texto: "Evan-Amos · domínio público", url: "https://commons.wikimedia.org/wiki/File:Potato-Chips.jpg" },
      ingredientes: ["Cascas de 4 batatas grandes, bem lavadas", "1 colher (sopa) de azeite", "Sal e páprica a gosto"],
      preparo: ["Seque bem as cascas e misture com o azeite e os temperos.", "Espalhe numa assadeira, sem sobrepor.", "Asse a 200 °C por 15 a 20 minutos, virando na metade, até ficarem crocantes."]
    },
    {
      nome: "Pesto de folha de cenoura",
      desc: "Molho verde que transforma a rama da cenoura em tempero.",
      img: "./img/receitas/pesto-folha-cenoura.jpg",
      credito: { texto: "ⱮUser · CC BY-SA 3.0", url: "https://commons.wikimedia.org/wiki/File:BasilPesto.JPG" },
      ingredientes: ["Folhas de 1 maço de cenoura, só as partes macias", "1 dente de alho", "3 colheres (sopa) de amendoim ou castanha", "1/2 xícara de azeite", "2 colheres (sopa) de queijo ralado", "Sal e limão a gosto"],
      preparo: ["Escalde as folhas por 30 segundos em água fervente e escorra.", "Bata tudo no processador até formar uma pasta.", "Ajuste sal e limão. Use em massas, pães e torradas."]
    },
    {
      nome: "Sementes de abóbora torradas",
      desc: "Snack rico em nutrientes com as sementes que iriam pro lixo.",
      img: "./img/receitas/sementes-abobora.jpg",
      credito: { texto: "Dmitry Makeev · CC BY-SA 4.0", url: "https://commons.wikimedia.org/wiki/File:Pepita_de_calabaza.jpg" },
      ingredientes: ["Sementes de 1 abóbora, sem a polpa", "1 colher (chá) de azeite", "Sal a gosto"],
      preparo: ["Lave as sementes, retire os fiapos e seque bem com um pano.", "Misture com o azeite e o sal.", "Asse a 160 °C por 20 a 30 minutos, mexendo de vez em quando, até dourar."]
    },
    {
      nome: "Doce de casca de melancia",
      desc: "A parte branca da casca vira compota com calda de cravo.",
      img: "./img/receitas/doce-casca-melancia.jpg",
      credito: { texto: "Wikimedia Commons · CC BY-SA 2.0", url: "https://commons.wikimedia.org/wiki/File:Compote.jpg" },
      ingredientes: ["Parte branca da casca de 1/2 melancia, sem a parte verde, em cubos", "1 xícara de açúcar", "1 xícara de água", "3 cravos-da-índia", "Raspas de 1 limão"],
      preparo: ["Cozinhe os cubos de casca em água por 10 minutos e escorra.", "Volte à panela com o açúcar, a água, o cravo e as raspas.", "Cozinhe em fogo baixo até a calda engrossar e a casca ficar translúcida (cerca de 40 minutos)."]
    },
    {
      nome: "Suco de casca de abacaxi",
      desc: "Refresco de casca com hortelã — aproveita o abacaxi inteiro.",
      img: "./img/receitas/suco-casca-abacaxi.jpg",
      credito: { texto: "El Mono Español · CC BY-SA 4.0", url: "https://commons.wikimedia.org/wiki/File:Batido_de_pi%C3%B1a.jpg" },
      ingredientes: ["Cascas de 1 abacaxi, bem lavadas", "1,5 litro de água", "Folhas de hortelã", "Açúcar ou mel a gosto"],
      preparo: ["Ferva as cascas na água por 15 minutos e deixe amornar.", "Bata o líquido coado com a hortelã no liquidificador.", "Coe de novo, adoce e sirva bem gelado."]
    }
  ];

  /* Fichas redigidas a partir de conhecimento consolidado (KINUPP & LORENZI,
     PANC no Brasil, 2014; Embrapa Hortaliças; Flora e Funga do Brasil/JBRJ).
     Pontos incertos ou controversos estão marcados em "observacao". */
  const REF_PADRAO = [
    { nome: "Embrapa Hortaliças — folders de PANC (PDF, download gratuito)", url: "https://www.embrapa.br/web/hortalicas/publicacoes/panc-hortalicas-nao-convencionais" },
    { nome: "Flora e Funga do Brasil — JBRJ (nomenclatura botânica)", url: "https://floradobrasil.jbrj.gov.br/" },
    { nome: "KINUPP, V. F.; LORENZI, H. Plantas Alimentícias Não Convencionais (PANC) no Brasil. Instituto Plantarum, 2014." }
  ];

  const pancs = [
    {
      slug: "ora-pro-nobis",
      nome: "Ora-pro-nóbis",
      nomeCientifico: "Pereskia aculeata",
      familia: "Cactaceae",
      outrosNomes: ["lobrobó", "carne-de-pobre", "guaiapá"],
      img: "./img/pancs/ora-pro-nobis.jpg",
      resumo: "Cacto trepador de folhas carnudas, uma das PANCs mais ricas em proteína.",
      parteComestivel: ["folha", "flor", "fruto"],
      luz: "sol",
      consumo: "ambos",
      identificacao: {
        descricao: "Trepadeira ou arbusto escandente que passa de 3 m, com caules lenhosos cobertos de espinhos. Ao contrário da maioria dos cactos, tem folhas verdadeiras — verdes, brilhantes, levemente suculentas, de 4 a 7 cm.",
        comoIdentificar: [
          "Caules com aréolas que produzem grupos de espinhos curvos e rígidos.",
          "Folhas alternas, ovais, um pouco carnudas, com nervura central clara.",
          "Flores brancas a creme, perfumadas, de 2 a 3 cm, em cachos na ponta dos ramos.",
          "Frutos amarelos quando maduros, do tamanho de uma azeitona grande."
        ],
        podeConfundirCom: "Pereskia grandifolia (ora-pro-nóbis-de-flor-rosa): folhas maiores e flores rosadas. Suas folhas também são consumidas cozidas, mas confirme a espécie — a P. aculeata é a de uso tradicional."
      },
      planta: {
        origem: "Nativa das Américas tropicais; ocorre em quase todo o Brasil, do Nordeste ao Sul.",
        habitat: "Bordas de mata, quintais, cercas vivas e áreas alteradas; muito resistente à seca.",
        caracteristicas: [
          "Folhas: ovais, carnudas, 4–7 cm",
          "Flores: brancas/creme, perfumadas",
          "Fruto: baga amarela comestível",
          "Porte: trepadeira lenhosa e espinhosa, até ~10 m",
          "Ciclo: perene"
        ]
      },
      cozinha: {
        parteUtilizada: "Folhas jovens (mais usadas); flores e frutos maduros.",
        preparo: [
          "Refogada com alho e óleo, pura ou com ovos.",
          "Batida no feijão, em sopas e caldos como espessante (é mucilaginosa).",
          "Crua e bem picada em saladas e sucos verdes, quando as folhas estão tenras.",
          "Desidratada e moída como farinha para enriquecer pães e massas."
        ],
        sugestoes: [
          "Combina com ovos, feijão, arroz e carnes de panela.",
          "A mucilagem ajuda a dar liga em bolinhos e hambúrgueres vegetais."
        ],
        receita: {
          nome: "Ovos mexidos com ora-pro-nóbis",
          ingredientes: ["2 xícaras de folhas de ora-pro-nóbis lavadas e picadas", "3 ovos", "1/2 cebola picada", "1 dente de alho picado", "1 colher (sopa) de azeite", "Sal e pimenta-do-reino a gosto"],
          preparo: ["Aqueça o azeite e refogue a cebola e o alho até dourar.", "Junte as folhas de ora-pro-nóbis e refogue por 3 minutos, até murcharem.", "Acrescente os ovos ligeiramente batidos e mexa até firmarem.", "Tempere com sal e pimenta e sirva quente, com pão ou arroz."]
        }
      },
      cultivo: {
        solo: "Pouco exigente; vai bem até em solo pobre e seco, desde que drene bem.",
        luz: "Sol pleno para folhas fartas e floração; tolera meia-sombra.",
        agua: "Muito tolerante à seca; regue só em plantios novos ou estiagens longas.",
        propagacao: "Estacas de caule de 20–30 cm enraízam com facilidade direto no local.",
        epoca: "Plante as estacas na primavera ou no início das chuvas.",
        cuidados: "Conduza numa cerca, treliça ou moirão; podas frequentes estimulam brotos novos e tenros. Manuseie com luvas por causa dos espinhos."
      },
      seguranca: {
        identificacao: "O gênero Pereskia é bem distinto, mas confirme a identificação com alguém que já conhece a planta antes do primeiro consumo.",
        cozimento: "Pode ser consumida crua quando tenra; muita gente prefere levemente refogada, o que suaviza a mucilagem.",
        cozimentoObrigatorio: false,
        naoConsumir: ["Espinhos do caule — colha com luvas e descarte-os."],
        riscos: [
          "Não há relato de toxicidade para P. aculeata nas quantidades usuais de alimento.",
          "Por ser folha muito rica em fibra e mucilagem, comece com porções pequenas."
        ],
        observacao: "O teor de proteína citado para as folhas varia bastante entre estudos, conforme solo, idade da folha e método de secagem."
      },
      credito: { texto: "Kauderwelsch / Peter coxhead · CC BY-SA 3.0", url: "https://commons.wikimedia.org/wiki/File:Pereskia_aculeata4_cropped.jpg" },
      referencias: REF_PADRAO
    },

    {
      slug: "taioba",
      nome: "Taioba",
      nomeCientifico: "Xanthosoma taioba",
      familia: "Araceae",
      outrosNomes: ["taioba-mansa", "taiá", "orelha-de-elefante (nome ambíguo — cuidado)"],
      img: "./img/pancs/taioba.jpg",
      resumo: "Folha grande em forma de seta, sabor suave parecido com espinafre — sempre consumida cozida.",
      parteComestivel: ["folha"],
      luz: "meia-sombra",
      consumo: "cozida",
      identificacao: {
        descricao: "Planta herbácea robusta, sem caule aéreo, com folhas grandes (até 50 cm) em forma de seta/coração, verdes por igual, sustentadas por pecíolos longos e suculentos que saem de um rizoma.",
        comoIdentificar: [
          "Folha inteira verde, sem manchas brancas, rosadas ou vermelhas.",
          "Lâmina apontando para baixo, com o pecíolo preso na fenda da folha — não no meio dela (não é peltada).",
          "Nervuras claras bem marcadas; o pecíolo cortado solta líquido aquoso.",
          "O contato com a folha crua causa leve coceira — por isso só se come cozida."
        ],
        podeConfundirCom: "Taioba-brava, tinhorão e 'orelhas-de-elefante' ornamentais (Caladium bicolor, Alocasia, Xanthosoma ornamentais): têm folhas com manchas coloridas, brancas ou vermelhas, ou pecíolo preso no centro da folha. NÃO são comestíveis e são bem mais irritantes. Na dúvida, não colha."
      },
      planta: {
        origem: "Nativa da América tropical; cultivada e espontânea em todo o Brasil, sobretudo no Sudeste e na Amazônia.",
        habitat: "Locais úmidos e sombreados: beira de córrego, quintais, sob árvores.",
        caracteristicas: [
          "Folhas: sagitadas, até 50 cm, verde uniforme",
          "Pecíolo: longo, suculento, comestível cozido",
          "Flor: espata esverdeada, pouco vistosa e rara em cultivo",
          "Porte: 1–2 m",
          "Ciclo: perene, rebrota do rizoma"
        ]
      },
      cozinha: {
        parteUtilizada: "Folhas jovens e pecíolos (talos) — sempre cozidos.",
        preparo: [
          "Ferva as folhas picadas por 3–5 minutos e descarte a água antes de refogar.",
          "Refogada com alho como couve, em omeletes, tortas e escondidinhos.",
          "Talos descascados e picados entram em refogados e sopas.",
          "Nunca use crua."
        ],
        sugestoes: [
          "Substitui couve e espinafre na maioria das receitas.",
          "Boa com ovos, queijos e purê de mandioca ou abóbora."
        ],
        receita: {
          nome: "Escondidinho de taioba",
          ingredientes: ["6 folhas de taioba com os talos, bem lavadas", "500 g de abóbora cozida e amassada", "1 cebola picada", "2 dentes de alho picados", "4 colheres (sopa) de requeijão", "2 colheres (sopa) de azeite", "Sal e cheiro-verde a gosto"],
          preparo: ["Separe os talos das folhas; pique as folhas e corte os talos em rodelas finas.", "Ferva folhas e talos em água por 3 a 5 minutos e escorra — passo obrigatório para eliminar o oxalato da taioba crua.", "Refogue a cebola e o alho no azeite, junte a taioba e o requeijão e tempere com sal e cheiro-verde.", "Em um refratário, alterne camadas de purê de abóbora e de taioba, terminando com abóbora. Leve ao forno a 180 °C por 20 minutos."]
        }
      },
      cultivo: {
        solo: "Rico em matéria orgânica, úmido e bem drenado.",
        luz: "Meia-sombra a sombra; sol forte queima as folhas.",
        agua: "Mantenha o solo sempre úmido; não deixe secar.",
        propagacao: "Divisão de rizomas ou mudas laterais (perfilhos).",
        epoca: "Plante os rizomas na primavera; colha folhas a partir de 3–4 meses.",
        cuidados: "Adube com composto a cada 2–3 meses e retire folhas velhas. Colha sempre as folhas novas, mais macias."
      },
      seguranca: {
        identificacao: "É a PANC deste guia que mais exige cuidado, pela semelhança com ornamentais tóxicas da mesma família. Só colha plantas confirmadas por alguém experiente.",
        cozimento: "Consumo obrigatoriamente cozida. As folhas cruas têm cristais de oxalato de cálcio (ráfides) que irritam boca e garganta; a fervura com descarte da água elimina o problema.",
        cozimentoObrigatorio: true,
        naoConsumir: [
          "Folhas cruas.",
          "A água da primeira fervura (descarte-a).",
          "Qualquer planta com folhas manchadas/coloridas ou pecíolo peltado."
        ],
        riscos: [
          "Crua: ardência e inchaço na boca e na garganta por oxalato de cálcio.",
          "Quem tem histórico de cálculo renal de oxalato deve moderar mesmo a versão cozida."
        ],
        observacao: "A taxonomia é confusa: 'Xanthosoma taioba' aparece em algumas fontes como sinônimo ou dentro de X. sagittifolium. Isso não muda o modo de uso, mas explica divergências entre referências."
      },
      credito: { texto: "Obsidian Soul · CC BY-SA 4.0", url: "https://commons.wikimedia.org/wiki/File:Xanthosoma_sagittifolium_in_Bukidnon,_Philippines_02.jpg" },
      referencias: REF_PADRAO
    },

    {
      slug: "jambu",
      nome: "Jambu",
      nomeCientifico: "Acmella oleracea",
      familia: "Asteraceae",
      outrosNomes: ["agrião-do-pará", "agrião-do-norte", "jambu-açu", "botão-de-ouro", "sin. Spilanthes oleracea"],
      img: "./img/pancs/jambu.jpg",
      resumo: "Erva amazônica que provoca leve dormência e formigamento na boca; alma do tacacá e do pato no tucupi.",
      parteComestivel: ["folha", "flor"],
      luz: "ambos",
      consumo: "cozida",
      identificacao: {
        descricao: "Erva pequena, de ramos que se espalham pelo chão e sobem nas pontas, com folhas ovais de bordas levemente serrilhadas e inflorescências globosas amarelas (às vezes com o topo vermelho-escuro), sem pétalas visíveis.",
        comoIdentificar: [
          "Capítulos (flores) em forma de cone ou botão, amarelos, de 1–2 cm, sem pétalas.",
          "Folhas opostas, ovais, moles, com pecíolo.",
          "Ao mastigar um pedaço de folha ou flor: formigamento, dormência e aumento da salivação — marca registrada do jambu.",
          "Ramos avermelhados e suculentos que enraízam ao tocar o solo."
        ],
        podeConfundirCom: "Outras espécies de Acmella/Spilanthes muito parecidas, também usadas como jambu. A sensação de formigamento é o melhor indicador de que você está no grupo certo."
      },
      planta: {
        origem: "Provavelmente originária da América do Sul; muito cultivada na Amazônia, com forte tradição no Pará.",
        habitat: "Hortas, canteiros úmidos e várzeas; gosta de calor e umidade.",
        caracteristicas: [
          "Folhas: ovais, 3–7 cm, macias",
          "Flores: capítulos amarelos globosos",
          "Sabor: picância dormente (spilanthol)",
          "Porte: erva de 20–30 cm",
          "Ciclo: anual de ciclo curto (60–90 dias)"
        ]
      },
      cozinha: {
        parteUtilizada: "Folhas e talos macios; flores em pequena quantidade.",
        preparo: [
          "Escalde folhas e talos em água fervente com sal por 3–5 minutos e escorra — reduz (sem eliminar) a dormência.",
          "Clássico no tacacá, no pato no tucupi, no arroz de jambu e em caldos.",
          "Refogado com alho como acompanhamento.",
          "Flores usadas com moderação para dar o 'tremor' em pratos, cachaças e coquetéis."
        ],
        sugestoes: [
          "Combina com tucupi, peixe, camarão, arroz e ovos.",
          "Comece com pouca quantidade até se acostumar com a sensação na boca."
        ],
        receita: {
          nome: "Arroz de jambu",
          ingredientes: ["1 maço de jambu (folhas e talos macios)", "2 xícaras de arroz", "1/2 cebola picada", "2 dentes de alho picados", "2 colheres (sopa) de azeite", "4 xícaras de água fervente", "Sal a gosto"],
          preparo: ["Ferva o jambu em água com sal por 5 minutos e escorra, reservando as folhas.", "Refogue a cebola e o alho no azeite, junte o arroz e refogue por 1 minuto.", "Adicione a água fervente e o sal, tampe e cozinhe em fogo baixo até secar.", "Misture o jambu escorrido ao arroz pronto e sirva."]
        }
      },
      cultivo: {
        solo: "Fértil, úmido e rico em matéria orgânica.",
        luz: "Sol pleno a meia-sombra.",
        agua: "Regas frequentes; não tolera solo seco.",
        propagacao: "Sementes (muito pequenas) ou estacas dos ramos, que enraízam rápido.",
        epoca: "Em clima quente, plante o ano todo; colha a partir de 40–60 dias.",
        cuidados: "Belisque as pontas para a planta ramificar; retire capítulos velhos para prolongar a colheita de folhas."
      },
      seguranca: {
        identificacao: "Grupo fácil de reconhecer pelo efeito na boca; ainda assim, colha de plantios conhecidos.",
        cozimento: "Tradicionalmente escaldado antes do uso. Pode ser usado cru em pequena quantidade (flores), mas a dormência fica bem mais forte.",
        cozimentoObrigatorio: false,
        naoConsumir: ["Grandes quantidades de flores de uma vez (dormência intensa)."],
        riscos: [
          "A dormência e o formigamento são efeito esperado do spilanthol, não alergia.",
          "Por precaução tradicional, evita-se o consumo em grande quantidade na gravidez e na amamentação.",
          "Quem tem doença hepática ou usa medicação contínua deve buscar orientação profissional antes do uso frequente."
        ],
        observacao: "As recomendações para gestantes e sobre interações com medicamentos baseiam-se em precaução e em estudos preliminares, não em consenso clínico firmado."
      },
      credito: { texto: "Wikimedia Commons · CC BY-SA 3.0", url: "https://commons.wikimedia.org/wiki/File:Spilanthes-closeup-large.jpg" },
      referencias: REF_PADRAO
    },

    {
      slug: "caruru",
      nome: "Caruru",
      nomeCientifico: "Amaranthus viridis",
      familia: "Amaranthaceae",
      outrosNomes: ["bredo", "caruru-verde", "caruru-de-mancha", "amaranto"],
      img: "./img/pancs/caruru.jpg",
      resumo: "Erva espontânea de hortas e terrenos, de folhas tenras ricas em ferro e cálcio; o 'bredo' do Nordeste.",
      parteComestivel: ["folha", "semente"],
      luz: "sol",
      consumo: "cozida",
      identificacao: {
        descricao: "Erva anual de caule ereto, às vezes avermelhado, com folhas alternas em forma de losango ou ovais e longas espigas verdes de flores minúsculas nas pontas e nas axilas.",
        comoIdentificar: [
          "Folhas alternas, romboidais a ovais, com pecíolo longo e, muitas vezes, uma pequena reentrância na ponta.",
          "Inflorescências em espigas verdes finas e densas, sem cor vistosa.",
          "Caule frequentemente com tons de vermelho ou rosa na base.",
          "Não solta látex (nada de leite ao quebrar)."
        ],
        podeConfundirCom: "Caruru-de-espinho (Amaranthus spinosus): igualmente comestível, mas tem espinhos rígidos nas axilas das folhas — colha com cuidado. Evite confundir plântulas jovens com outras ervas; na dúvida, espere a espiga aparecer."
      },
      planta: {
        origem: "Grupo de distribuição quase mundial nos trópicos; no Brasil ocorre em todas as regiões como planta espontânea.",
        habitat: "Hortas, jardins, beira de estrada, terrenos baldios e áreas cultivadas.",
        caracteristicas: [
          "Folhas: romboidais/ovais, 3–8 cm",
          "Flores: espigas verdes pequenas",
          "Semente: minúscula e escura, comestível como grão",
          "Porte: 20–80 cm",
          "Ciclo: anual, ressemeia sozinho"
        ]
      },
      cozinha: {
        parteUtilizada: "Folhas e pontas tenras; sementes maduras como grão.",
        preparo: [
          "Refogado com alho, como espinafre, depois de um rápido escaldado.",
          "Em sopas, caldo verde, tortas, bolinhos e recheios.",
          "Sementes: cozidas como mingau ou tostadas, à moda do amaranto.",
          "Descarte a água do escaldado."
        ],
        sugestoes: [
          "Combina com feijão, ovos, mandioca e milho.",
          "Colha só as folhas novas; as velhas ficam fibrosas."
        ],
        receita: {
          nome: "Refogado de caruru",
          ingredientes: ["4 xícaras de folhas de caruru lavadas", "1/2 cebola picada", "1 dente de alho picado", "1 tomate sem sementes picado", "1 colher (sopa) de azeite", "Sal a gosto"],
          preparo: ["Escalde as folhas de caruru em água fervente por 2 minutos e escorra.", "Refogue a cebola e o alho no azeite, acrescente o tomate e cozinhe até desmanchar.", "Junte o caruru e refogue por mais 5 minutos.", "Acerte o sal e sirva como acompanhamento de arroz e feijão."]
        }
      },
      cultivo: {
        solo: "Cresce em quase qualquer solo; prefere os férteis e soltos.",
        luz: "Sol pleno.",
        agua: "Tolera seca; regas moderadas aceleram o crescimento das folhas.",
        propagacao: "Sementes; costuma nascer sozinho onde já existiu a planta.",
        epoca: "Clima quente o ano todo; colheita de folhas a partir de 30–45 dias.",
        cuidados: "Vira 'daninha' com facilidade — plante em canteiro delimitado e corte as espigas antes de secarem se não quiser que se espalhe."
      },
      seguranca: {
        identificacao: "O gênero Amaranthus é seguro como alimento, mas confirme que se trata de caruru antes de consumir plantas de terreno.",
        cozimento: "Prefira cozido, com descarte da água do escaldado.",
        cozimentoObrigatorio: false,
        naoConsumir: [
          "Plantas de beira de estrada, de lavouras adubadas com nitrogênio ou de áreas com agrotóxico (acúmulo de nitrato).",
          "Os espinhos, no caso do caruru-de-espinho."
        ],
        riscos: [
          "As folhas podem acumular nitrato e oxalato, sobretudo em solo muito adubado; cozinhar e descartar a água reduz bastante.",
          "Consumo cru, em grande volume e com frequência, não é recomendado."
        ],
        observacao: "Vários nomes populares se cruzam: 'caruru' também nomeia o prato baiano de quiabo e, em algumas regiões, outras plantas. Aqui tratamos do caruru-verde (Amaranthus)."
      },
      credito: { texto: "Joydeep · CC BY-SA 3.0", url: "https://commons.wikimedia.org/wiki/File:Amaranthus_viridis_25042014_1.jpg" },
      referencias: REF_PADRAO
    },

    {
      slug: "beldroega",
      nome: "Beldroega",
      nomeCientifico: "Portulaca oleracea",
      familia: "Portulacaceae",
      outrosNomes: ["porcelana", "verdolaga", "beldroega-comum"],
      img: "./img/pancs/beldroega.jpg",
      resumo: "Suculenta rasteira de sabor levemente ácido, uma das folhas mais ricas em ômega-3.",
      parteComestivel: ["folha", "flor"],
      luz: "sol",
      consumo: "ambos",
      identificacao: {
        descricao: "Planta rasteira, sem pelos, de caules cilíndricos avermelhados e suculentos, folhas pequenas em forma de colher (espatuladas), grossas e brilhantes, com florzinhas amarelas que abrem ao sol.",
        comoIdentificar: [
          "Caule e folhas nitidamente suculentos (grossos, cheios de água).",
          "Folhas espatuladas de 1–3 cm, agrupadas nas pontas dos ramos.",
          "Flores amarelas pequenas, com 5 pétalas, abrindo nas horas de sol forte.",
          "Ao quebrar o caule NÃO sai látex branco — sai apenas seiva aquosa."
        ],
        podeConfundirCom: "Ervas do gênero Euphorbia (leiteirinha, quebra-pedra-rasteiro) que crescem no mesmo tipo de lugar: têm folhas finas (não suculentas) e soltam LÁTEX BRANCO quando quebradas — são tóxicas. O teste do látex é decisivo: beldroega não tem leite."
      },
      planta: {
        origem: "Distribuição mundial; no Brasil é espontânea em todas as regiões.",
        habitat: "Hortas, calçadas, jardins e terrenos secos e ensolarados; extremamente resistente à seca.",
        caracteristicas: [
          "Folhas: espatuladas, suculentas, 1–3 cm",
          "Caule: avermelhado, prostrado, suculento",
          "Flores: amarelas, pequenas, efêmeras",
          "Porte: rasteira, forma tapetes",
          "Ciclo: anual, ressemeia com facilidade"
        ]
      },
      cozinha: {
        parteUtilizada: "Folhas, pontas e talos macios; flores como enfeite.",
        preparo: [
          "Crua em saladas, batidas em sucos e patês (textura crocante e suculenta).",
          "Refogada rapidamente, em omeletes, sopas e no feijão (dá leve liga).",
          "Em conserva, tipo picles.",
          "Escaldar por 1 minuto reduz o ácido oxálico e o gosto ácido, se incomodar."
        ],
        sugestoes: [
          "Combina com tomate, cebola, limão, ovos e peixe.",
          "Ótima para 'esticar' saladas de folhas mais neutras."
        ],
        receita: {
          nome: "Salada morna de beldroega",
          ingredientes: ["3 xícaras de folhas e ramos macios de beldroega", "1 tomate picado", "1/2 cebola roxa em fatias finas", "Suco de 1/2 limão", "2 colheres (sopa) de azeite", "Sal a gosto"],
          preparo: ["Lave bem a beldroega e escalde por 1 minuto em água fervente; escorra.", "Misture a beldroega ainda morna com o tomate e a cebola.", "Tempere com azeite, limão e sal.", "Sirva em seguida, acompanhando peixes ou grãos."]
        }
      },
      cultivo: {
        solo: "Qualquer solo com sol; vai bem em solo pobre, seco e até arenoso.",
        luz: "Sol pleno.",
        agua: "Mínima; regas leves bastam. Não encharcar.",
        propagacao: "Sementes ou pedaços de caule, que enraízam ao tocar a terra.",
        epoca: "Primavera e verão; colheita a partir de 25–40 dias.",
        cuidados: "Cresce quase sem cuidado; controle o alastramento colhendo sempre e retirando plantas que secarem."
      },
      seguranca: {
        identificacao: "Fácil de reconhecer pelo aspecto suculento e pela ausência de látex. Faça sempre o teste do caule quebrado antes de colher em terreno.",
        cozimento: "Pode ser consumida crua. Cozinhar é opcional e reduz o ácido oxálico.",
        cozimentoObrigatorio: false,
        naoConsumir: [
          "Qualquer planta parecida que solte látex branco (não é beldroega).",
          "Plantas de beira de estrada ou de canteiros tratados com herbicida."
        ],
        riscos: [
          "Contém ácido oxálico: quem tem tendência a cálculo renal de oxalato deve consumir com moderação e preferir a versão escaldada.",
          "Sem toxicidade conhecida para a população geral nas quantidades de alimento."
        ],
        observacao: "O alto teor de ômega-3 (ácido alfa-linolênico) é bem documentado, mas os valores exatos variam com clima, solo e idade da planta."
      },
      credito: { texto: "ZooFari · CC BY-SA 3.0", url: "https://commons.wikimedia.org/wiki/File:Portulaca_oleracea.jpg" },
      referencias: REF_PADRAO
    },

    {
      slug: "peixinho",
      nome: "Peixinho-da-horta",
      nomeCientifico: "Stachys byzantina",
      familia: "Lamiaceae",
      outrosNomes: ["peixinho", "lambari-da-horta", "orelha-de-cordeiro"],
      img: "./img/pancs/peixinho.jpg",
      resumo: "Folha aveludada e prateada que, empanada e frita, lembra filé de peixe.",
      parteComestivel: ["folha"],
      luz: "ambos",
      consumo: "cozida",
      identificacao: {
        descricao: "Erva perene que forma touceiras baixas (20–40 cm), com folhas grossas e macias cobertas de pelos brancos, o que dá à planta um aspecto aveludado e prateado.",
        comoIdentificar: [
          "Folhas oblongas cobertas por densa camada de pelos brancos, muito macias ao toque.",
          "Toda a planta tem aspecto acinzentado/prateado.",
          "Cresce rente ao chão, espalhando-se como um tapete.",
          "Sem cheiro forte ao amassar a folha."
        ],
        podeConfundirCom: "É a mesma planta vendida como ornamental 'orelha-de-coelho'. Outras espécies de Stachys são próximas e de uso parecido. O aspecto felpudo e prateado é bem característico."
      },
      planta: {
        origem: "Originária do Cáucaso e do Oriente Médio; cultivada em hortas e jardins em todo o Brasil.",
        habitat: "Canteiros ensolarados e jardins de borda; tolera bem a seca.",
        caracteristicas: [
          "Folhas: grossas, felpudas, prateadas, 5–10 cm",
          "Flores: espigas eretas com florzinhas rosadas",
          "Porte: 20–40 cm, em touceira",
          "Ciclo: perene"
        ]
      },
      cozinha: {
        parteUtilizada: "Folhas, sempre passadas por calor.",
        preparo: [
          "Lave, seque muito bem, passe em farinha e ovo (ou massa de tempurá) e frite — a textura lembra peixe.",
          "Também em bolinhos, na chapa ou refogada.",
          "Não se come crua: os pelos deixam a boca áspera."
        ],
        sugestoes: [
          "Sirva com limão, como faria com pescado.",
          "Combina com molho tártaro e arroz."
        ],
        receita: {
          nome: "Peixinho-da-horta empanado",
          ingredientes: ["12 folhas grandes e firmes de peixinho", "1 ovo batido", "1/2 xícara de farinha de trigo", "1/2 xícara de farinha de rosca", "Sal, pimenta e suco de limão", "Óleo para fritar"],
          preparo: ["Lave as folhas e seque-as muito bem.", "Tempere a farinha de trigo com sal e pimenta. Passe cada folha na farinha, no ovo e na farinha de rosca.", "Frite em óleo quente até dourar dos dois lados.", "Escorra em papel e sirva com limão."]
        }
      },
      cultivo: {
        solo: "Bem drenado, mesmo pobre e arenoso.",
        luz: "Sol pleno.",
        agua: "Pouca; não encharcar, senão a touceira apodrece.",
        propagacao: "Divisão de touceira ou mudas laterais.",
        epoca: "Plante na primavera; colhe folhas o ano todo.",
        cuidados: "Retire folhas velhas e as hastes de flor; evite molhar as folhas na rega."
      },
      seguranca: {
        identificacao: "Planta de horta bem conhecida; se colher em jardim alheio, confirme com quem cultiva.",
        cozimento: "Consuma sempre depois de fritar, empanar ou refogar — nunca crua.",
        cozimentoObrigatorio: true,
        naoConsumir: ["Folhas cruas (textura áspera pelos pelos)."],
        riscos: ["Não há toxicidade conhecida; é questão de textura e palatabilidade."],
        observacao: "O nome 'peixinho' vem só da textura e do modo de preparo — não tem relação botânica com peixe nem fornece o ômega-3 do pescado."
      },
      credito: { texto: "Jean-Pol Grandmont · CC BY-SA 3.0", url: "https://commons.wikimedia.org/wiki/File:0_Stachys_byzantina_-_Yvoire_(2).JPG" },
      referencias: REF_PADRAO
    },

    {
      slug: "capuchinha",
      nome: "Capuchinha",
      nomeCientifico: "Tropaeolum majus",
      familia: "Tropaeolaceae",
      outrosNomes: ["chagas", "flor-de-chagas", "nastúrcio"],
      img: "./img/pancs/capuchinha.jpg",
      resumo: "Trepadeira de flores alaranjadas comestíveis, com sabor picante parecido com agrião.",
      parteComestivel: ["folha", "flor", "fruto"],
      luz: "sol",
      consumo: "ambos",
      identificacao: {
        descricao: "Planta rasteira ou trepadeira de caules suculentos, folhas redondas em forma de escudo (o cabinho prende no centro) e flores grandes de 5 pétalas em tons de amarelo, laranja e vermelho.",
        comoIdentificar: [
          "Folha circular, verde-clara, com o pecíolo preso no meio (peltada) e nervuras saindo em raios.",
          "Flor com um esporão para trás, de 3 a 6 cm, laranja/amarela/vermelha.",
          "Sabor picante (mostarda/agrião) ao mastigar a folha ou a flor.",
          "Fruto verde rugoso, dividido em 3 gomos."
        ],
        podeConfundirCom: "Praticamente inconfundível: folha peltada redonda + flor com esporão + sabor picante. As capuchinhas de jardim de outras cores são a mesma espécie."
      },
      planta: {
        origem: "Nativa dos Andes (Peru e Bolívia); cultivada no mundo todo como ornamental e comestível.",
        habitat: "Hortas e jardins ensolarados; cresce rápido, cobre o solo ou trepa em suportes.",
        caracteristicas: [
          "Folhas: redondas, peltadas, 3–7 cm",
          "Flores: 5 pétalas com esporão, laranja/amarelo/vermelho",
          "Fruto: cápsula verde com 3 sementes",
          "Porte: rasteira ou trepadeira, até 2 m",
          "Ciclo: anual (perene em clima ameno)"
        ]
      },
      cozinha: {
        parteUtilizada: "Folhas jovens, flores e frutos verdes.",
        preparo: [
          "Folhas e flores cruas em saladas, sanduíches e para enfeitar pratos.",
          "Botões e frutos verdes em conserva de vinagre, no lugar de alcaparra.",
          "Folhas maiores refogadas rapidamente."
        ],
        sugestoes: [
          "A flor inteira decora o prato e dá um toque picante.",
          "Combina com queijos, ovos e folhas de sabor suave."
        ],
        receita: {
          nome: "Salada com flores de capuchinha",
          ingredientes: ["Folhas verdes variadas (alface, rúcula)", "1 punhado de folhas jovens de capuchinha", "6 a 8 flores de capuchinha", "Tomate-cereja e cebola roxa", "Azeite, limão e sal"],
          preparo: ["Lave e seque as folhas e as flores com cuidado.", "Monte a salada com as folhas, o tomate e a cebola.", "Tempere com azeite, limão e sal.", "Finalize espalhando as flores inteiras por cima."]
        }
      },
      cultivo: {
        solo: "Comum, pouco adubado — excesso de nitrogênio dá muita folha e pouca flor.",
        luz: "Sol pleno.",
        agua: "Regular; não encharcar.",
        propagacao: "Sementes, semeadas direto no local.",
        epoca: "Primavera; floresce em 6 a 8 semanas.",
        cuidados: "Ofereça suporte se quiser que trepe; colha flores e folhas com frequência para estimular a planta."
      },
      seguranca: {
        identificacao: "Fácil de reconhecer; use plantas de horta ou jardim que não receberam agrotóxico.",
        cozimento: "Pode ser consumida crua; cozinhar é opcional.",
        cozimentoObrigatorio: false,
        naoConsumir: ["Plantas de jardim tratadas com inseticida (comum em ornamentais compradas prontas)."],
        riscos: [
          "Contém compostos de mostarda (glucosinolatos): em grande quantidade pode irritar o estômago.",
          "Quem tem problema renal ou gástrico deve consumir com moderação."
        ],
        observacao: "É a mesma espécie vendida como flor ornamental — só use se tiver certeza de que a planta não recebeu veneno."
      },
      credito: { texto: "George Chernilevsky · domínio público", url: "https://commons.wikimedia.org/wiki/File:Tropaeolum_majus_2005_G1.jpg" },
      referencias: REF_PADRAO
    },

    {
      slug: "bertalha",
      nome: "Bertalha",
      nomeCientifico: "Basella alba",
      familia: "Basellaceae",
      outrosNomes: ["espinafre-indiano", "espinafre-de-malabar", "bertalha-coração"],
      img: "./img/pancs/bertalha.jpg",
      resumo: "Trepadeira de folhas suculentas e levemente mucilaginosas, usada como espinafre.",
      parteComestivel: ["folha"],
      luz: "ambos",
      consumo: "cozida",
      identificacao: {
        descricao: "Trepadeira de crescimento rápido, com caules carnudos (verdes ou avermelhados) e folhas grossas, brilhantes, em forma de coração, um pouco viscosas quando cortadas.",
        comoIdentificar: [
          "Folhas cordiformes (coração), carnudas e lustrosas, de 5 a 12 cm.",
          "Caule suculento que se enrola em suportes; algumas variedades têm caule vermelho-púrpura.",
          "Ao cortar a folha, solta um líquido levemente mucilaginoso (baba).",
          "Pequenas flores e frutos arroxeados dispostos em espiga."
        ],
        podeConfundirCom: "Pouco confundível pela folha carnuda em coração e o hábito trepador. Não é a mesma que a bertalha-do-mato (Anredera), também comestível, de folha mais fina."
      },
      planta: {
        origem: "Originária da Ásia tropical (Índia); hoje comum em quintais de todo o Brasil.",
        habitat: "Cercas, muros e caramanchões; gosta de calor e umidade.",
        caracteristicas: [
          "Folhas: em coração, carnudas, brilhantes, 5–12 cm",
          "Caule: suculento, verde ou vermelho, trepador",
          "Flor/fruto: espigas com bagas roxas",
          "Porte: trepadeira de vários metros",
          "Ciclo: perene em clima quente"
        ]
      },
      cozinha: {
        parteUtilizada: "Folhas e pontas macias dos ramos.",
        preparo: [
          "Refogada com alho, como espinafre — cozimento rápido para não desmanchar.",
          "Em sopas e caldos, onde a mucilagem ajuda a encorpar.",
          "Folhas bem jovens, em pequena quantidade, podem entrar cruas na salada.",
          "Em omeletes, tortas e no feijão."
        ],
        sugestoes: [
          "Combina com alho, gergelim, ovos e leite de coco.",
          "Cozinhe pouco: fica pronta em 2 a 3 minutos."
        ],
        receita: {
          nome: "Bertalha refogada",
          ingredientes: ["1 maço de bertalha (folhas e pontas)", "2 dentes de alho picados", "1 colher (sopa) de azeite", "Sal a gosto", "Gotas de limão (opcional)"],
          preparo: ["Lave as folhas e escorra.", "Doure o alho no azeite.", "Junte a bertalha e refogue por 2 a 3 minutos, só até murchar.", "Acerte o sal, finalize com limão e sirva."]
        }
      },
      cultivo: {
        solo: "Rico em matéria orgânica, úmido e bem drenado.",
        luz: "Sol pleno a meia-sombra.",
        agua: "Frequente; gosta de solo sempre úmido.",
        propagacao: "Sementes ou estacas de caule, que enraízam com facilidade.",
        epoca: "Primavera e verão; colhe a partir de 60 dias.",
        cuidados: "Ofereça suporte para trepar; belisque as pontas para ramificar e retire as espigas de fruto para ter mais folha."
      },
      seguranca: {
        identificacao: "Planta de quintal bem conhecida; confirme com quem cultiva se tiver dúvida.",
        cozimento: "Prefira levemente cozida; crua, apenas folhas jovens e em pouca quantidade.",
        cozimentoObrigatorio: false,
        naoConsumir: ["Grandes quantidades cruas (mucilagem e oxalato)."],
        riscos: [
          "Contém oxalatos: quem tem tendência a cálculo renal deve moderar e preferir a versão cozida.",
          "Rica em ferro e vitamina A; sem toxicidade conhecida no uso alimentar."
        ],
        observacao: ""
      },
      credito: { texto: "Wikimedia Commons · CC BY-SA 3.0", url: "https://commons.wikimedia.org/wiki/File:Basella_alba-2.JPG" },
      referencias: REF_PADRAO
    },

    {
      slug: "major-gomes",
      nome: "Major-gomes",
      nomeCientifico: "Talinum paniculatum",
      familia: "Talinaceae",
      outrosNomes: ["maria-gorda", "língua-de-vaca", "erva-gorda"],
      img: "./img/pancs/major-gomes.jpg",
      resumo: "Folha suculenta e macia, de sabor suave, que substitui espinafre em qualquer receita.",
      parteComestivel: ["folha"],
      luz: "sol",
      consumo: "ambos",
      identificacao: {
        descricao: "Erva ereta de 30–60 cm, com folhas carnudas, lisas e brilhantes em forma de colher, e uma haste fina que termina numa nuvem de florzinhas rosadas e frutinhos vermelhos.",
        comoIdentificar: [
          "Folhas suculentas, sem pelos, verde-claras, agrupadas na base e ao longo do caule.",
          "Panícula (raminho) alta e arejada, com flores rosa minúsculas que abrem à tarde.",
          "Frutos: cápsulas vermelhas ou alaranjadas pequeninas, bem decorativas.",
          "Ao quebrar o caule, sai seiva aquosa — nunca leite branco."
        ],
        podeConfundirCom: "A beldroega (Portulaca) é da mesma linha suculenta, mas rasteira e de folha menor. O Talinum fruticosum é muito próximo e também comestível. Nenhum parecido comum é tóxico, mas confirme a ausência de látex branco."
      },
      planta: {
        origem: "Nativa das Américas, inclusive do Brasil; espontânea em hortas, muros e terrenos.",
        habitat: "Lugares ensolarados e secos: canteiros, calçadas e jardins.",
        caracteristicas: [
          "Folhas: espatuladas, carnudas, 4–10 cm",
          "Flores: rosa, minúsculas, em panícula alta",
          "Fruto: cápsula vermelha decorativa",
          "Porte: 30–60 cm",
          "Ciclo: perene de vida curta, ressemeia sozinha"
        ]
      },
      cozinha: {
        parteUtilizada: "Folhas e pontas tenras.",
        preparo: [
          "Refogada com alho, como espinafre (solta um pouco de água — cozinhe rápido).",
          "Crua em saladas, sozinha ou misturada a folhas mais neutras.",
          "Em tortas, omeletes, sopas e no feijão.",
          "Também batida em sucos verdes."
        ],
        sugestoes: [
          "Sabor neutro: aceita bem alho, azeite, limão e queijos.",
          "Colha antes de a planta florir muito, quando as folhas estão mais gordas."
        ],
        receita: {
          nome: "Refogado de major-gomes",
          ingredientes: ["4 xícaras de folhas de major-gomes", "1 dente de alho picado", "1 colher (sopa) de azeite", "Sal a gosto"],
          preparo: ["Lave as folhas e escorra.", "Doure o alho no azeite.", "Junte as folhas e refogue por 3 a 4 minutos, até murcharem.", "Escorra o excesso de água, acerte o sal e sirva."]
        }
      },
      cultivo: {
        solo: "Qualquer solo com sol; vai bem em solo pobre e seco.",
        luz: "Sol pleno.",
        agua: "Pouca; muito tolerante à seca.",
        propagacao: "Sementes (nasce sozinha) ou estacas.",
        epoca: "Primavera e verão; colhe folhas a partir de 40 dias.",
        cuidados: "Praticamente sem cuidado; corte as panículas se não quiser que se espalhe."
      },
      seguranca: {
        identificacao: "Grupo sem toxicidade conhecida, mas confirme que a planta não solta látex branco (aí seria outra espécie).",
        cozimento: "Pode ser consumida crua ou cozida.",
        cozimentoObrigatorio: false,
        naoConsumir: ["Plantas de beira de estrada ou de canteiros tratados com herbicida."],
        riscos: [
          "Contém oxalatos (como espinafre e beldroega): quem tem cálculo renal de oxalato deve moderar.",
          "Sem outros riscos conhecidos no uso alimentar."
        ],
        observacao: ""
      },
      credito: { texto: "SAplants · CC BY-SA 4.0", url: "https://commons.wikimedia.org/wiki/File:Talinum_paniculatum_5Dsr_7057.jpg" },
      referencias: REF_PADRAO
    },

    {
      slug: "serralha",
      nome: "Serralha",
      nomeCientifico: "Sonchus oleraceus",
      familia: "Asteraceae",
      outrosNomes: ["serralha-lisa", "chicória-brava", "adélia"],
      img: "./img/pancs/serralha.jpg",
      resumo: "Folha tenra de leve amargor, parecida com almeirão, ótima em saladas e refogados.",
      parteComestivel: ["folha"],
      luz: "sol",
      consumo: "ambos",
      identificacao: {
        descricao: "Erva anual de 30–100 cm, com roseta de folhas na base e caule oco que solta látex branco leitoso ao quebrar. Folhas recortadas, com a base 'abraçando' o caule em duas orelhas arredondadas. Flores amarelas pequenas, como mini dentes-de-leão.",
        comoIdentificar: [
          "Caule e nervuras soltam LÁTEX BRANCO ao quebrar — normal nesta planta.",
          "Folhas recortadas e macias, com base auriculada (duas 'orelhinhas' agarrando o caule); bordas com dentinhos moles.",
          "Flores amarelas em capítulos de ~2 cm, que depois viram 'plumas' como as do dente-de-leão.",
          "Sabor levemente amargo, que suaviza no cozimento."
        ],
        podeConfundirCom: "A serralha-áspera (Sonchus asper) tem folhas mais rígidas e espinhosas — também comestível, só menos macia. O dente-de-leão (Taraxacum) é parecido e também comestível. No gênero Sonchus o uso é seguro."
      },
      planta: {
        origem: "Origem mediterrânea/europeia; hoje espontânea no mundo todo, muito comum no Brasil.",
        habitat: "Hortas, jardins, calçadas, terrenos baldios e lavouras — a 'daninha' clássica.",
        caracteristicas: [
          "Folhas: recortadas, macias, base auriculada, 10–25 cm",
          "Caule: oco, com látex branco",
          "Flores: amarelas, tipo dente-de-leão, viram plumas",
          "Porte: 30–100 cm",
          "Ciclo: anual, ressemeia com facilidade"
        ]
      },
      cozinha: {
        parteUtilizada: "Folhas jovens da roseta (as mais macias e menos amargas).",
        preparo: [
          "Cruas em salada quando bem novas, misturadas com folhas doces.",
          "Refogadas com alho, como almeirão — o cozimento tira o amargor.",
          "Em sopas, tortas, omeletes e no feijão.",
          "Escaldar 1 a 2 minutos antes de refogar suaviza ainda mais."
        ],
        sugestoes: [
          "Quanto mais nova a folha, menos amarga.",
          "Combina com alho, ovo, batata e limão."
        ],
        receita: {
          nome: "Serralha refogada com alho",
          ingredientes: ["1 maço de folhas jovens de serralha", "2 dentes de alho picados", "1 colher (sopa) de azeite", "Sal a gosto"],
          preparo: ["Lave bem as folhas; se estiverem amargas, escalde por 1 a 2 minutos e escorra.", "Doure o alho no azeite.", "Junte a serralha e refogue por 4 a 5 minutos.", "Acerte o sal e sirva como acompanhamento."]
        }
      },
      cultivo: {
        solo: "Qualquer um; prefere os férteis e úmidos.",
        luz: "Sol pleno a meia-sombra.",
        agua: "Moderada; as folhas ficam mais macias com solo úmido.",
        propagacao: "Sementes (nasce sozinha o ano todo).",
        epoca: "Quase o ano inteiro; colha a roseta antes de subir a haste de flor.",
        cuidados: "Colha jovem; depois de florir, a folha fica fibrosa e amarga. Corte as flores para não se espalhar demais."
      },
      seguranca: {
        identificacao: "O látex branco é normal e não indica perigo NESTE gênero (Sonchus). Ainda assim, só consuma plantas que você tenha certeza de que são serralha.",
        cozimento: "Pode ser consumida crua (folha nova) ou cozida.",
        cozimentoObrigatorio: false,
        naoConsumir: [
          "Plantas de beira de estrada, lavoura ou jardim com herbicida (é uma das ervas mais atingidas por veneno).",
          "Folhas velhas e a haste dura (muito amargas e fibrosas)."
        ],
        riscos: [
          "Sem toxicidade conhecida para consumo alimentar.",
          "O amargor em excesso pode incomodar o estômago de pessoas sensíveis."
        ],
        observacao: "Regra geral: látex branco pede atenção. A serralha é uma exceção conhecida e testada — isso não vale para plantas de látex que você não identificou."
      },
      credito: { texto: "Alvesgaspar · CC BY-SA 3.0", url: "https://commons.wikimedia.org/wiki/File:Sonchus_February_2008-1.jpg" },
      referencias: REF_PADRAO
    }
  ];

  const links = [
    { nome: "Embrapa Hortaliças — PANC", desc: "Pesquisa e materiais técnicos sobre PANCs no Brasil.", categoria: "PANCs", url: "https://www.embrapa.br/hortalicas/panc" },
    { nome: "Quintal", desc: "App que conecta vizinhos para trocar, doar e vender frutas, ervas e colheitas do quintal.", categoria: "Redes locais", url: "https://quintalapp.com.br/" },
    { nome: "MDA — Agricultura Familiar", desc: "Políticas e informações sobre agricultura familiar.", categoria: "Agricultura familiar", url: "https://www.gov.br/mda/pt-br" },
    { nome: "Instituto Kairós", desc: "Sustentabilidade, educação ambiental e novas economias.", categoria: "Educação ambiental", url: "https://institutokairos.net/" },
    { nome: "Comida do Amanhã", desc: "Sistemas alimentares sustentáveis e combate ao desperdício.", categoria: "Aproveitamento de alimentos", url: "https://comidadoamanha.org/" },
    { nome: "Rede Ecovida de Agroecologia", desc: "Agricultores agroecológicos e certificação participativa.", categoria: "Sustentabilidade", url: "https://ecovida.org.br/" }
  ];

  /* ---------------------------------------------------
     Render — Feirinhas
     --------------------------------------------------- */
  const feirasGrid = document.getElementById("feirasGrid");

  function renderFeiras(lista) {
    feirasGrid.innerHTML = lista.map(f => `
      <article class="card reveal">
        <div class="h-40 thumb-ph" data-ph="🛒"><img src="${f.img}" alt="${f.nome}" loading="lazy" class="size-full object-cover" onerror="this.remove()" /></div>
        <div class="grid gap-2 p-5">
          <span class="bg-verde-950 text-verde-300 w-fit rounded-full px-3 py-1 text-xs font-semibold uppercase">Exemplo</span>
          <h3 class="font-serif text-lg text-white">${f.nome}</h3>
          <p class="m-0 text-sm text-gray-400">📅 ${f.dia} · 🕒 ${f.horario}</p>
          <p class="m-0 text-sm text-gray-400">📍 ${f.local}</p>
          <p class="text-verde-300 m-0 text-xs font-semibold">${f.tipo}</p>
          <a class="btn-outline mt-2 w-fit" target="_blank" rel="noopener"
             href="https://www.google.com/maps/search/?api=1&query=${f.mapsQuery}">Ver no mapa ↗</a>
        </div>
      </article>
    `).join("");
    observeReveals();
  }

  renderFeiras(feiras);

  document.querySelectorAll("#filtrosDia .chip").forEach(chip => {
    chip.addEventListener("click", () => {
      document.querySelectorAll("#filtrosDia .chip").forEach(c => c.classList.remove("is-active"));
      chip.classList.add("is-active");
      const filtro = chip.dataset.filtro;
      renderFeiras(filtro === "todos" ? feiras : feiras.filter(f => f.diaFiltro === filtro));
    });
  });

  /* ---------------------------------------------------
     Render — Receitas + Modal
     --------------------------------------------------- */
  const receitasGrid = document.getElementById("receitasGrid");
  receitasGrid.innerHTML = receitas.map((r, i) => `
    <article class="card reveal">
      <div class="h-40 thumb-ph" data-ph="🍽️"><img src="${r.img}" alt="${r.nome}" loading="lazy" class="size-full object-cover" onerror="this.remove()" /></div>
      <div class="grid gap-2 p-5">
        <h3 class="font-serif text-lg text-white">${r.nome}</h3>
        <p class="m-0 text-sm text-gray-400">${r.desc}</p>
        <button class="btn-outline mt-2 w-fit" data-receita-index="${i}">Ver receita</button>
      </div>
    </article>
  `).join("");

  const modal = document.getElementById("modalReceita");
  const modalImg = document.getElementById("modalReceitaImg");
  const modalTitulo = document.getElementById("modalReceitaTitulo");
  const modalIngredientes = document.getElementById("modalReceitaIngredientes");
  const modalPreparo = document.getElementById("modalReceitaPreparo");
  const modalCredito = document.getElementById("modalReceitaCredito");

  modalImg.addEventListener("error", () => { modalImg.style.display = "none"; });

  function abrirModal(receita) {
    modalImg.style.display = "";
    modalImg.src = receita.img;
    modalImg.alt = receita.nome;
    modalTitulo.textContent = receita.nome;
    if (modalCredito) {
      modalCredito.innerHTML = receita.credito
        ? `Foto ilustrativa: <a href="${receita.credito.url}" target="_blank" rel="noopener" class="underline">${receita.credito.texto}</a> · Wikimedia Commons`
        : "";
    }
    modalIngredientes.innerHTML = receita.ingredientes.map(i => `<li>${i}</li>`).join("");
    modalPreparo.innerHTML = receita.preparo.map(p => `<li>${p}</li>`).join("");
    modal.classList.remove("hidden");
    document.body.classList.add("overflow-hidden");
  }

  function fecharModal() {
    modal.classList.add("hidden");
    document.body.classList.remove("overflow-hidden");
  }

  receitasGrid.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-receita-index]");
    if (btn) abrirModal(receitas[Number(btn.dataset.receitaIndex)]);
  });
  modal.querySelectorAll("[data-close-modal]").forEach(el => el.addEventListener("click", fecharModal));
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") fecharModal(); });

  /* ---------------------------------------------------
     PANCs — catálogo com busca/filtro + ficha (modal)
     --------------------------------------------------- */
  const pancsGrid = document.getElementById("pancsGrid");
  const pancBusca = document.getElementById("pancBusca");
  const pancFiltros = document.getElementById("pancFiltros");
  const pancContagem = document.getElementById("pancContagem");
  const pancsVazio = document.getElementById("pancsVazio");
  const pancLimpar = document.getElementById("pancLimpar");
  let parteAtual = "todas";

  const norm = (s) => s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  const itensLista = (arr) => arr.map((x) => `<li>${x}</li>`).join("");

  function pancBadges(p) {
    const mapaParte = { folha: "Folha", flor: "Flor", fruto: "Fruto", semente: "Semente", raiz: "Raiz", talo: "Talo" };
    const partes = p.parteComestivel.map((x) => mapaParte[x] || x).join(" · ");
    const luz = { sol: "Sol pleno", "meia-sombra": "Meia-sombra", ambos: "Sol / meia-sombra" }[p.luz];
    const consumo = p.seguranca.cozimentoObrigatorio
      ? "Só cozida"
      : p.consumo === "cozida" ? "Melhor cozida" : "Crua ou cozida";
    return [partes, luz, consumo];
  }

  function pancsFiltradas() {
    const q = norm(pancBusca.value.trim());
    return pancs.filter((p) => {
      if (parteAtual !== "todas" && !p.parteComestivel.includes(parteAtual)) return false;
      if (!q) return true;
      const alvo = norm([p.nome, p.nomeCientifico, p.familia].concat(p.outrosNomes).join(" "));
      return alvo.includes(q);
    });
  }

  function renderPancs() {
    const lista = pancsFiltradas();
    pancsGrid.innerHTML = lista.map((p) => `
      <article class="card panc-card">
        <div class="h-40 thumb-ph" data-ph="🌿"><img src="${p.img}" alt="${p.nome} (${p.nomeCientifico})" loading="lazy" class="size-full object-cover" onerror="this.remove()" /></div>
        <div class="grid gap-1 p-5">
          <h3 class="font-serif text-lg text-white">${p.nome}</h3>
          <p class="panc-card__sci">${p.nomeCientifico}</p>
          <p class="m-0 text-sm text-gray-400">${p.resumo}</p>
          <ul class="panc-badges" aria-label="Características">${pancBadges(p).map((b) => `<li class="panc-badge">${b}</li>`).join("")}</ul>
          <button class="btn-outline mt-2 w-fit" type="button" data-panc-abrir="${p.slug}" aria-haspopup="dialog">Ver ficha completa</button>
        </div>
      </article>
    `).join("");
    pancsVazio.hidden = lista.length !== 0;
    pancContagem.textContent = lista.length === 0
      ? "Nenhuma planta encontrada."
      : `${lista.length} ${lista.length === 1 ? "planta" : "plantas"} no catálogo`;
  }

  pancBusca.addEventListener("input", renderPancs);

  pancFiltros.addEventListener("click", (e) => {
    const btn = e.target.closest("button[data-parte]");
    if (!btn) return;
    parteAtual = btn.dataset.parte;
    pancFiltros.querySelectorAll("button").forEach((b) => {
      const ativo = b === btn;
      b.classList.toggle("is-active", ativo);
      b.setAttribute("aria-pressed", String(ativo));
    });
    renderPancs();
  });

  pancLimpar.addEventListener("click", () => {
    pancBusca.value = "";
    parteAtual = "todas";
    pancFiltros.querySelectorAll("button").forEach((b) => {
      const ativo = b.dataset.parte === "todas";
      b.classList.toggle("is-active", ativo);
      b.setAttribute("aria-pressed", String(ativo));
    });
    renderPancs();
    pancBusca.focus();
  });

  /* ---- Ficha completa (modal acessível) ---- */
  const modalPanc = document.getElementById("modalPanc");
  const pancDialog = modalPanc.querySelector(".panc-modal__dialog");
  const pancModalBody = document.getElementById("pancModalBody");
  let pancTrigger = null;

  function fichaHTML(p) {
    const dl = (pares) => `<dl class="panc-dl">${pares.map(([t, d]) => `<div><dt>${t}</dt><dd>${d}</dd></div>`).join("")}</dl>`;
    const refs = p.referencias.map((r) => r.url
      ? `<li><a href="${r.url}" target="_blank" rel="noopener">${r.nome}</a></li>`
      : `<li>${r.nome}</li>`).join("");
    const rc = p.cozinha.receita;
    const flagCozida = p.seguranca.cozimentoObrigatorio
      ? `<p class="panc-ficha__flag panc-ficha__flag--alerta"><strong>Atenção:</strong> esta planta deve ser consumida sempre cozida.</p>`
      : "";
    return `
      <div class="panc-ficha">
        <div class="panc-ficha__hero thumb-ph" data-ph="🌿"><img src="${p.img}" alt="${p.nome} (${p.nomeCientifico})" onerror="this.remove()" /></div>
        ${p.credito ? `<p class="panc-ficha__credito">Foto: <a href="${p.credito.url}" target="_blank" rel="noopener">${p.credito.texto}</a> · via Wikimedia Commons</p>` : ""}
        <div class="panc-ficha__head">
          <h2 id="pancModalTitulo" class="panc-ficha__nome">${p.nome}</h2>
          <p class="panc-ficha__sci">${p.nomeCientifico} — família ${p.familia}</p>
          <p class="panc-ficha__outros">Também conhecida como: ${p.outrosNomes.join(", ")}.</p>
          <ul class="panc-badges panc-badges--lg" aria-label="Resumo">${pancBadges(p).map((b) => `<li class="panc-badge">${b}</li>`).join("")}</ul>
          ${flagCozida}
        </div>

        <section class="panc-sec" aria-labelledby="s-id-${p.slug}">
          <h3 id="s-id-${p.slug}">Como identificar</h3>
          <p>${p.identificacao.descricao}</p>
          <ul class="panc-list">${itensLista(p.identificacao.comoIdentificar)}</ul>
          <p class="panc-callout panc-callout--info"><span aria-hidden="true">🔍</span><span><strong>Pode ser confundida com:</strong> ${p.identificacao.podeConfundirCom}</span></p>
        </section>

        <section class="panc-sec" aria-labelledby="s-planta-${p.slug}">
          <h3 id="s-planta-${p.slug}">A planta</h3>
          ${dl([["Origem", p.planta.origem], ["Habitat", p.planta.habitat]])}
          <p class="panc-sub">Características</p>
          <ul class="panc-list">${itensLista(p.planta.caracteristicas)}</ul>
        </section>

        <section class="panc-sec" aria-labelledby="s-cozinha-${p.slug}">
          <h3 id="s-cozinha-${p.slug}">Na cozinha</h3>
          <p><strong>Parte utilizada:</strong> ${p.cozinha.parteUtilizada}</p>
          <p class="panc-sub">Como preparar</p>
          <ul class="panc-list">${itensLista(p.cozinha.preparo)}</ul>
          <p class="panc-sub">Sugestões de consumo</p>
          <ul class="panc-list">${itensLista(p.cozinha.sugestoes)}</ul>
          <details class="panc-receita">
            <summary>Receita: ${rc.nome}</summary>
            <p class="panc-sub">Ingredientes</p>
            <ul class="panc-list">${itensLista(rc.ingredientes)}</ul>
            <p class="panc-sub">Modo de preparo</p>
            <ol class="panc-list panc-list--num">${itensLista(rc.preparo)}</ol>
          </details>
        </section>

        <section class="panc-sec" aria-labelledby="s-cultivo-${p.slug}">
          <h3 id="s-cultivo-${p.slug}">Cultivo</h3>
          ${dl([
            ["Solo", p.cultivo.solo], ["Luz", p.cultivo.luz], ["Água", p.cultivo.agua],
            ["Propagação", p.cultivo.propagacao], ["Época", p.cultivo.epoca], ["Cuidados", p.cultivo.cuidados]
          ])}
        </section>

        <section class="panc-sec panc-sec--seg" aria-labelledby="s-seg-${p.slug}">
          <h3 id="s-seg-${p.slug}"><span aria-hidden="true">⚠️</span> Segurança</h3>
          <p><strong>Identificação:</strong> ${p.seguranca.identificacao}</p>
          <p><strong>Cozimento:</strong> ${p.seguranca.cozimento}</p>
          <p class="panc-sub">Não consumir</p>
          <ul class="panc-list">${itensLista(p.seguranca.naoConsumir)}</ul>
          <p class="panc-sub">Riscos e contraindicações</p>
          <ul class="panc-list">${itensLista(p.seguranca.riscos)}</ul>
          ${p.seguranca.observacao ? `<p class="panc-nota"><strong>Nota:</strong> ${p.seguranca.observacao}</p>` : ""}
        </section>

        <section class="panc-sec" aria-labelledby="s-ref-${p.slug}">
          <h3 id="s-ref-${p.slug}">Referências</h3>
          <ul class="panc-list">${refs}</ul>
          <p class="panc-nota">Conteúdo educativo. Não substitui a orientação de um profissional nem a identificação botânica presencial.</p>
        </section>
      </div>`;
  }

  function focaveis(container) {
    return Array.prototype.slice.call(container.querySelectorAll(
      'a[href], button:not([disabled]), input, select, textarea, summary, [tabindex]:not([tabindex="-1"])'
    )).filter((el) => el.offsetParent !== null);
  }

  function abrirPanc(p, trigger) {
    pancTrigger = trigger || null;
    pancModalBody.innerHTML = fichaHTML(p);
    modalPanc.hidden = false;
    document.body.classList.add("overflow-hidden");
    pancDialog.scrollTop = 0;
    pancDialog.focus();
    document.addEventListener("keydown", pancKeydown, true);
  }

  function fecharPanc() {
    if (modalPanc.hidden) return;
    modalPanc.hidden = true;
    document.body.classList.remove("overflow-hidden");
    document.removeEventListener("keydown", pancKeydown, true);
    pancModalBody.innerHTML = "";
    if (pancTrigger && document.contains(pancTrigger)) pancTrigger.focus();
  }

  function pancKeydown(e) {
    if (e.key === "Escape") { e.preventDefault(); fecharPanc(); return; }
    if (e.key !== "Tab") return;
    const f = focaveis(pancDialog);
    if (!f.length) return;
    const primeiro = f[0], ultimo = f[f.length - 1];
    if (e.shiftKey && document.activeElement === primeiro) { e.preventDefault(); ultimo.focus(); }
    else if (!e.shiftKey && document.activeElement === ultimo) { e.preventDefault(); primeiro.focus(); }
  }

  pancsGrid.addEventListener("click", (e) => {
    const btn = e.target.closest("button[data-panc-abrir]");
    if (!btn) return;
    const p = pancs.find((x) => x.slug === btn.dataset.pancAbrir);
    if (p) abrirPanc(p, btn);
  });
  modalPanc.querySelectorAll("[data-close-panc]").forEach((el) => el.addEventListener("click", fecharPanc));

  renderPancs();

  /* ---- SEO: dados estruturados do catálogo (JSON-LD) ---- */
  try {
    const ld = {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: "Catálogo de PANCs — Plantas Alimentícias Não Convencionais",
      itemListElement: pancs.map((p, i) => ({
        "@type": "ListItem",
        position: i + 1,
        item: {
          "@type": "Thing",
          name: p.nome,
          alternateName: [p.nomeCientifico].concat(p.outrosNomes),
          description: p.resumo
        }
      }))
    };
    const s = document.createElement("script");
    s.type = "application/ld+json";
    s.textContent = JSON.stringify(ld);
    document.head.appendChild(s);
  } catch (_) { /* JSON-LD é opcional */ }

  /* ---------------------------------------------------
     Render — Links que Inspiram
     --------------------------------------------------- */
  document.getElementById("linksGrid").innerHTML = links.map(l => `
    <article class="card reveal grid gap-2 p-6">
      <span class="bg-verde-950 text-verde-300 w-fit rounded-full px-3 py-1 text-xs font-semibold uppercase">${l.categoria}</span>
      <h3 class="font-serif text-lg text-white">${l.nome}</h3>
      <p class="m-0 text-sm text-gray-400">${l.desc}</p>
      <a class="btn-outline mt-2 w-fit" href="${l.url}" target="_blank" rel="noopener">Conhecer</a>
    </article>
  `).join("");

  /* ---------------------------------------------------
     Reveal ao rolar a tela
     --------------------------------------------------- */
  var revealObserver;
  function observeReveals() {
    if (!revealObserver) {
      revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            revealObserver.unobserve(entry.target);
          }
        });
      }, { threshold: 0.15 });
    }
    document.querySelectorAll(".reveal:not(.is-visible)").forEach(el => revealObserver.observe(el));
  }
  observeReveals();

  /* ---------------------------------------------------
     Ano atual no rodapé
     --------------------------------------------------- */
  document.getElementById("anoAtual").textContent = new Date().getFullYear();

});
