import { Talk, Panel, Curiosity, Project } from './types';

export const schoolEvent = {
  date: 'Manhã',
  timeRange: '10h00 às 12h30',
  audience: 'Alunos do 3.º ciclo e do ensino secundário',
  location: 'Sala SAS LAB, Edifício C6, Ciências ULisboa',
  description: 'Uma manhã dedicada à divulgação da estatística junto dos estudantes do 3.º ciclo do ensino básico e do ensino secundário, através de atividades práticas e interativas da exposição "Explorística", em colaboração com o Instituto Nacional de Estatística, e minipalestras sobre aplicações da Estatística em diferentes domínios.',
  schedule: [
    {
      time: '10h00',
      activity: 'Receção dos alunos',
      description: 'Boas-vindas aos estudantes e professores participantes no evento.',
      location: 'Atrium do C6'
    },
    {
      time: '10h30 - 12h30',
      activity: '“Explorística”',
      description: 'Exposição e atividades interativas de estatística prática desenvolvidas para jovens.',
      location: 'Atrium do C6'
    },
    {
      time: '11h00',
      activity: 'Palestra 1 - Carolina Marques',
      subtitle: 'Estatística e Inteligência Artificial no Estudo dos Dinossauros',
      description: 'Os dinossauros fornecem informação valiosa sobre evolução, locomoção, comportamento e paleoecologia, mas o seu estudo é frequentemente limitado pela incompletude e fragilidade do registo fóssil. Nesta palestra será explorado como a estatística e a aprendizagem automática podem ajudar a interpretar pegadas e outros dados paleontológicos, através de ferramentas como fotogrametria, simulação de dados e métodos de classificação. O objetivo é mostrar como abordagens quantitativas podem tornar o estudo dos dinossauros mais rigoroso, reprodutível e informativo.',
      location: 'Sala SAS LAB',
      speakerInfo: {
        name: 'Carolina Marques',
        affiliation: 'Faculdade de Ciências da Universidade de Lisboa e Centro de Estatística e Aplicações da Universidade de Lisboa (CEAUL)',
        bio: 'Carolina S. Marques é doutoranda em Estatística e Investigação Operacional na Faculdade de Ciências da Universidade de Lisboa, com especialização em bioestatística e bioinformática e foco na aplicação de métodos estatísticos e de aprendizagem automática à paleontologia. A sua investigação centra-se no desenvolvimento de abordagens quantitativas para a análise, identificação e classificação de dados fósseis, incluindo dentes de terópodes e pegadas de vertebrados. O seu trabalho integra modelação estatística, deep learning, visão computacional, análise espacial e geração de dados sintéticos, tendo resultado em diversas publicações com revisão por pares e apresentações científicas internacionais. É também Assistente Convidada na ISCTE Business School, no Departamento de Métodos Quantitativos para Gestão e Economia. Os seus interesses mais amplos incluem a investigação interdisciplinar na interface entre estatística, inteligência artificial, ecologia e paleontologia.',
        photo: '/carolina.jpg'
      }
    },
    {
      time: '11h25',
      activity: 'Palestra 2 - Ana Catarina Fernandes',
      subtitle: 'Prever com Dados: Estatística, Risco e Decisão',
      description: 'Nesta palestra, será mostrado como a Estatística ajuda a interpretar dados, reconhecer padrões e tomar decisões em situações de incerteza, usando os investimentos como exemplo motivador. A partir de gráficos e cenários visuais, será explorada a diferença entre prever e acertar, bem como o papel do risco, da variabilidade e da informação na construção de previsões.',
      location: 'Sala SAS LAB',
      speakerInfo: {
        name: 'Ana Catarina Fernandes',
        affiliation: 'Faculdade de Ciências da Universidade de Lisboa',
        bio: 'Ana Catarina Fernandes é Mestre em Estatística e Investigação Operacional pela Faculdade de Ciências da Universidade de Lisboa, onde desenvolveu a dissertação “Portfolio Optimization using Copula Models”. Desde 2024, é monitora no Departamento de Ciências Matemáticas, colaborando na lecionação e lecionando unidades curriculares nas áreas da Estatística. Foi bolseira de investigação no Centro de Estatística e Aplicações da Universidade de Lisboa, tendo participado num projeto de análise de dados clínicos na área do mieloma múltiplo. Tem também desenvolvido atividades de comunicação e divulgação científica dirigidas a alunos do ensino básico e secundário. Os seus principais interesses incluem a otimização de carteiras, a modelação da dependência, a otimização sob incerteza e a aplicação da Estatística a problemas reais.',
        photo: '/ana.jpeg'
      }
    },
    {
      time: '11h50',
      activity: 'Palestra 3 - Rui Martins',
      subtitle: 'O futebol é mesmo imprevisível?',
      description: 'Porque é que algumas equipas ganham mais vezes do que outras? E porque é que acontecem resultados inesperados? Veremos como é que a Estatística ajuda a estimar probabilidades de vitória, a identificar favoritos e a compreender porque é que as surpresas fazem parte do jogo.',
      location: 'Sala SAS LAB',
      speakerInfo: {
        name: 'Rui Martins',
        affiliation: 'Faculdade de Ciências e Tecnologia da Universidade de Coimbra e Centro de Matemática da Universidade de Coimbra (CMUC)',
        bio: 'Rui Martins é Professor Auxiliar no Departamento de Matemática da Faculdade de Ciências e Tecnologia da Universidade de Coimbra e investigador do Centro de Matemática da Universidade de Coimbra (CMUC). A sua investigação centra-se na Estatística Bayesiana, com especial interesse em modelos hierárquicos, modelos estruturados aditivos, análise de sobrevivência, dados longitudinais, modelos espaciais e espaço-temporais, e inferência computacional. Tem desenvolvido investigação metodológica na área dos modelos GAMLSS e em modelos probabilísticos para previsão, com aplicações em epidemiologia, saúde pública, ecologia e análise desportiva. É autor de diversas publicações em revistas científicas internacionais e participa regularmente em projetos e colaborações internacionais. Os seus interesses atuais incluem o desenvolvimento de métodos estatísticos flexíveis para dados complexos e a sua implementação em software de código aberto, promovendo a transferência de conhecimento entre a investigação metodológica e aplicações reais.',
        photo: '/rui.jpg'
      }
    }
  ]
};

export const mainEvent = {
  date: 'Tarde',
  timeRange: '14h30 às 18h30',
  location: 'Edifício C6, Ciências ULisboa',
  title: 'A Formação em Estatística em Portugal na Era da Ciência de Dados e da Inteligência Artificial',
  description: 'Um encontro estratégico entre empresas e academia para refletir sobre o futuro da Estatística e responder a uma questão essencial: como preparar os profissionais de amanhã para a rápida evolução da Ciência de Dados e da Inteligência Artificial?',
  schedule: [
    {
      time: '14h30 - 14h45',
      activity: 'Abertura',
      details: 'Sessão de abertura oficial com a participação de:',
      openingSpeakers: [
        { name: 'Prof. Luís Gouveia', role: 'Presidente do Departamento de Ciências Matemáticas' },
        { name: 'Prof.ª Patrícia Bermudez', role: 'Coordenadora do CEAUL' },
        { name: 'Prof. Luís Machado', role: 'Presidente da Sociedade Portuguesa de Estatística' },
        { name: 'Prof.ª Conceição Freitas', role: 'Diretora da Faculdade de Ciências da Universidade de Lisboa' }
      ]
    },
    {
      time: '14h45 - 16h15',
      activity: 'Mesa Redonda: Empresa',
      moderator: 'Teresa Alpuim',
      moderatorInfo: {
        name: 'Teresa Alpuim',
        affiliation: 'Professora Catedrática, Faculdade de Ciências da Universidade de Lisboa',
        bio: 'É professora de Estatística na Faculdade de Ciências da Universidade de Lisboa, tendo-se licenciado em Matemática, no ramo de Estatística, Investigação Operacional e Computação. Completou o Mestrado em Estatística e Investigação Operacional e doutorou-se em Probabilidade e Estatística, com uma tese sobre Estatística de Extremos. Após o Doutoramento, interessou-se por Modelação Estatística e Análise de Dados em Meteorologia e Ciências do Ambiente bem assim como em Ciências Atuariais. Mais recentemente, tem trabalhado em Estatística e Ciência de Dados numa perspectiva muito prática e objetiva incluindo a sua utilização na procura de boas soluções para problemas de Risco de Crédito e, mais geralmente, de Risco Financeiro bem como soluções para a área do Marketing, mais especificamente, previsão de vendas. Tem promovido uma forte interação entre a universidade e empresas, tendo orientado vários doutoramentos em ambiente empresarial e tendo-se envolvido em vários projetos de inovação em estreita colaboração com bancos e seguradoras, com ênfase nos seguros de saúde. Atualmente, coordena o mestrado em Matemática Aplicada à Economia e Gestão.',
        photo: '/teresa.jpg'
      },
      description: 'Debate sobre a adequação da formação em Estatística às necessidades do tecido empresarial.',
      speakers: [
        { 
          name: 'Luísa Loura', 
          org: 'Pordata', 
          gender: 'F',
          speakerInfo: {
            name: 'Luísa Loura',
            affiliation: 'Diretora da Pordata (Fundação Francisco Manuel dos Santos) e Membro do Conselho de Curadores da A3ES',
            bio: 'É licenciada em Matemática Aplicada, pela Faculdade de Ciências da Universidade de Lisboa (1982) e doutorada em Estatística e Computação, pela mesma universidade (1992). Foi docente da FCUL entre 1982 e 2023, ano em que se aposentou como Professora Associada. Foi dirigente máxima da Direção-Geral de Estatísticas da Educação e Ciência, vice-presidente do Conselho Científico da FCUL e subdiretora da mesma instituição. De 1997 a 1999 e de 2006 a 2011, foi membro da direção da Sociedade Portuguesa de Estatística. Coordenou e lecionou disciplinas da área das probabilidades, estatística e processos estocásticos, foi coordenadora do Mestrado em Bioestatística e da Licenciatura em Estatística Aplicada. Orientou 14 alunos de mestrado e 7 de doutoramento. Enquanto membro do CEAUL, publicou cerca de 60 artigos, designadamente nas áreas da teoria de valores extremos, dos modelos estatísticos em genética, dos modelos de séries temporais e do ensino da estatística para os níveis básico e secundário. Atualmente integra o Conselho de Curadores da A3ES e é diretora da Pordata (Fundação Francisco Manuel dos Santos).',
            photo: '/luisa.jpg'
          }
        },
        { 
          name: 'Maria do Carmo de Ornelas', 
          org: 'Grupo Fidelidade', 
          gender: 'F',
          speakerInfo: {
            name: 'Maria do Carmo de Ornelas',
            affiliation: 'Grupo Fidelidade',
            bio: 'Maria do Carmo de Ornelas é especialista nas áreas das Ciências Atuariais, Estatística e Gestão de Risco, reunindo uma vasta experiência no setor segurador e na formação académica. Licenciada em Estatística e Investigação Operacional pela FCUL, complementou a sua formação com diversas pós-graduações em Ciências Atuariais, Atuariado e Gestão de Riscos Financeiros na Universidade Católica e ISEG, tendo concluído os seus estudos com um Mestrado em Estatística também na FCUL. Ao longo da sua carreira desempenhou funções de responsabilidade técnica, atuarial e de gestão em várias seguradoras portuguesas. Desde 2008 integra a Multicare Seguros de Saúde, onde liderou o Gabinete de Atuariado e Controlo, assumindo também funções-chave de Gestão de Risco, Compliance e Atuariado. Hoje gere o Health Actuarial Academy no Grupo Fidelidade. Paralelamente, desenvolve atividade docente e participa em iniciativas de formação, investigação e inovação em saúde. Tem colaborado em projetos nacionais e europeus, acompanhando trabalhos académicos e promovendo a aplicação de métodos quantitativos à saúde. Em 2023 apresentou, no Congresso Mundial dos Atuários, uma dissertação sobre quantificação do Risco Pandémico em Seguros.',
            photo: '/maria_carmo.jpg'
          }
        },
        { 
          name: 'Luís Antunes', 
          org: 'IQVIA', 
          gender: 'M',
          speakerInfo: {
            name: 'Luís Antunes',
            affiliation: 'Associate Director na IQVIA e Docente na Escola Superior de Saúde do Politécnico do Porto',
            bio: 'Luís Antunes é atualmente Diretor Associado na equipa de Bioestatística RWE DATS (Data Science, Analytics, and Tech Solutions) da IQVIA. Obteve o Doutoramento em Matemática Aplicada, o Mestrado em Matemática e a Licenciatura em Engenharia Química pela Universidade do Porto. Tem desempenhado funções como estatístico sénior de supervisão em diversos estudos de evidência de vida real (real-world evidence), utilizando dados secundários de várias fontes internacionais. As suas principais responsabilidades incluem a redação e revisão de planos de análise estatística, análise, revisão e interpretação de resultados, e coordenação estatística. Lidera uma equipa de sete bioestatísticos e é responsável pelo programa de estágios em Bioestatística em Portugal. É coautor de mais de 80 publicações científicas com revisão por pares e é docente de Bioestatística na Escola Superior de Saúde do Politécnico do Porto (ESS | P.Porto).',
            photo: '/luis_antunes.png'
          }
        }
      ]
    },
    {
      time: '16h15 - 16h45',
      activity: 'Coffee Break'
    },
    {
      time: '16h45 - 18h15',
      activity: 'Mesa Redonda: Ensino',
      moderator: 'Manuela Neves',
      moderatorInfo: {
        name: 'M. Manuela Neves',
        affiliation: 'Instituto Superior de Agronomia - ULisboa e CEAUL',
        bio: 'M. Manuela Neves é Professora Catedrática Aposentada do Instituto Superior de Agronomia da Universidade de Lisboa (ISA/ULisboa). Leccionou no ISA entre 1977 e 2022 e colaborou ainda com outras Instituições ao longo da sua carreira -- na FCT/UNL, na Faculdade de Engenharia da Universidade do Porto, na Universidade de Cabo Verde, Praia, na Faculdade de Ciências Agrárias da Universidade José Eduardo dos Santos no Huambo. Foi investigadora do CEAUL, é membro da SPE e da SPM. Licenciou-se em Matemática Aplicada pela FCL em 1976, doutorou-se em Matemática, especialidade de Estatística pela UNL em 1990 e fez Agregação em Matemática pela Universidade Técnica de Lisboa em 2003. É autora do livro “Introducão à Estatística e à Probabilidade com utilizacão do R” (2017) e de várias publicações em revistas, capítulos de livros e Actas de Congressos. Orientou/coorientou várias teses de Mestrado e de Doutoramento. Participou em muitos júris de concurso e de Provas Académicas. Ocupou cargos em Órgão de Gestão do ISA e colaborou com Órgãos Directivos da SPE. Leccionou/coordenou várias UCs de licenciatura, mestrado e doutoramento. As suas principais áreas de investigação são Teoria de Valores Extremos, Estatística Computacional, Simulação e Bioestatística.',
        photo: '/manuela.jpg'
      },
      description: 'Reflexão sobre abordagens pedagógicas, currículos e inovação no ensino superior.',
      speakers: [
        { 
          name: 'Bruno de Sousa', 
          org: 'Universidade de Coimbra, Faculdade de Psicologia e de Ciências da Educação, CINEICC', 
          gender: 'M',
          speakerInfo: {
            name: 'Bruno de Sousa',
            affiliation: 'Universidade de Coimbra, Faculdade de Psicologia e de Ciências da Educação, CINEICC',
            bio: 'Bruno de Sousa possui uma sólida formação em Estatística e uma carreira académica dedicada à aplicação do conhecimento estatístico a desafios reais nas áreas da Saúde e das Ciências Sociais. Desde 2012, integra a Faculdade de Psicologia e de Ciências da Educação da Universidade de Coimbra, onde desenvolve atividade docente e científica de elevado impacto. Enquanto docente, concebeu e lecionou diversas unidades curriculares e seminários metodológicos, abrangendo tópicos avançados como modelos multinível, meta-análise, mediação e moderação, análise fatorial e regressão não linear, tendo orientado e apoiado metodologicamente mais de 150 trabalhos académicos. É investigador integrado do CINEICC desde 2012, contribuindo para a classificação de “Excelente” da unidade de I&D. Mantém uma forte colaboração interdisciplinar, refletida em mais de 60 publicações internacionais e participação em mais de 10 projetos de investigação. O seu percurso inclui vários prémios de excelência pedagógica e inovação, destacando-se o Prémio Santander-UC de Inovação Pedagógica (2020) e várias distinções internacionais pelo mérito no ensino e na literacia estatística.',
            photo: '/bruno.jpg'
          }
        },
        { 
          name: 'Luís Castro', 
          org: 'Conselho Nacional para a Inovação Pedagógica no Ensino Superior', 
          gender: 'M',
          speakerInfo: {
            name: 'Luís Castro',
            affiliation: 'Vice-Reitor da Universidade de Lisboa e Professor Associado do Instituto Superior Técnico',
            bio: 'Professor Associado com Agregação do Departamento de Engenharia Civil, Arquitetura e Ambiente do Instituto Superior Técnico (DECivil). É docente da área científica de Mecânica Estrutural e Estruturas, tendo lecionado as seguintes Unidades Curriculares: Mecânica I, Mecânica II, Resistência de Materiais I, Análise de Estruturas I e Análise de Estruturas II. As principais áreas de especialização são a análise fisicamente não linear de estruturas, modelos não-convencionais de elementos finitos e a utilização de sistemas de wavelets na definição de bases de aproximação para modelos híbridos-mistos. É, desde outubro de 2021, Vice-Reitor da Universidade de Lisboa. Desempenhou os seguintes cargos de gestão académica: Vice-Presidente do IST para a Gestão Financeira, de 2017 a 2019; Vice-Presidente do IST para os Assuntos de Pessoal em 2016; Vice-Presidente do Conselho Pedagógico do IST entre 2013 e 2015; Vice-Presidente do DECivil para Assuntos Pedagógicos e Curriculares, de 2011 a 2012; Vogal da direção da IST-ID de 2013 a 2020; Diretor-Adjunto do IST para a Área de Projetos, entre 2012 e 2013; Diretor Executivo do DECivil de 2009 a 2010 e de 2003 a 2004.',
            photo: '/luis.jpg'
          }
        },
        { 
          name: 'Sofia Sá', 
          org: 'Formadora e Consultora Pedagógica, Sofia Sá Unipessoal LDA.', 
          gender: 'F',
          speakerInfo: {
            name: 'Sofia Sá',
            affiliation: 'Formadora e Consultora Pedagógica, Sofia Sá Unipessoal LDA.',
            bio: 'Psicóloga Educacional, iniciou a sua atividade de formadora há 23 anos e é formadora e consultora pedagógica em diversas universidades e universidades politécnicas portuguesas. É certificada pelo Conselho Científico-Pedagógico da Formação Contínua (CCPFC) e pelo IEFP (CCP). Foi Professora Auxiliar Convidada no Instituto Superior Técnico, onde concebeu e lecionou duas Unidades Curriculares na área das Competências Comunicacionais no Mestrado em Engenharia Informática, tendo sido distinguida com diversos prémios incluindo o Outstanding Teaching Award. Especialista em Pedagogia no Ensino Superior, integrou a equipa de oradores dos Brent-Felder Webinar Series, promovidos pela International Federation of Engineering Education Societies (IFEES). Atualmente desenvolve atividade de formação, consultoria e investigação nas áreas da pedagogia universitária, desenvolvimento pedagógico de docentes e implementação de metodologias ativas no Ensino Superior.',
            photo: '/sofia.jpg'
          }
        }
      ]
    },
    {
      time: '18h15 - 18h30',
      activity: 'Encerramento'
    },
    {
      time: '18h30',
      activity: 'Atuação da Vicentuna'
    }
  ]
};

export const curiosities: Curiosity[] = [
  {
    id: 'simpson',
    title: 'O Paradoxo de Simpson',
    category: 'Visualizações & Intuição',
    description: 'Quando um padrão visível em vários grupos separados desaparece ou inverte-se por completo ao juntarmos os dados.',
    explanation: 'Isto ocorre devido a variáveis ocultas que influenciam as proporções relativas. Por exemplo, num estudo de admissões universitárias, os homens podem ter maior taxa de admissão geral, mas quando analisado departamento por departamento, as mulheres apresentam taxas superiores em cada um! Isto acontece porque as mulheres se candidataram em maior número a departamentos com taxas de aceitação muito baixas.'
  },
  {
    id: 'monty',
    title: 'O Problema de Monty Hall',
    category: 'Probabilidade de Decisão',
    description: 'Mudar de porta duplica a sua probabilidade de ganhar de 1/3 para 2/3. Parece contra-intuitivo, mas é matematicamente exato.',
    explanation: 'Imagine 3 portas: 1 tem um carro, 2 têm cabras. Escolhe a Porta 1 (1/3 de probabilidade). O apresentador (que sabe onde está o carro) abre a Porta 3 revelando uma cabra. Se mantiver a escolha, a sua hipótese permanece 1/3. Ao mudar, herda a probabilidade de o carro estar em qualquer uma das outras portas originais (2/3), porque o apresentador filtrou intencionalmente uma opção incorreta!'
  },
  {
    id: 'benford',
    title: 'A Lei de Benford',
    category: 'Padrões Numéricos',
    description: 'Em conjuntos de dados reais, o algarismo 1 aparece como primeiro dígito cerca de 30% das vezes, enquanto o 9 aparece apenas em 4,6%.',
    explanation: 'Também conhecida como a lei do primeiro dígito, aplica-se a dados que abrangem várias ordens de magnitude (populações de cidades, preços de ações, faturas fiscais). É amplamente utilizada por auditores e peritos criminais para detetar fraudes financeiras e manipulação de dados científicos.'
  },
  {
    id: 'normal',
    title: 'A Distribuição Normal e o Galton Board',
    category: 'Leis da Natureza',
    description: 'A curva em forma de sino representa dezenas de fenómenos naturais: a altura das pessoas, notas de exames ou erros de medição.',
    explanation: 'Quando muitos fatores aleatórios independentes atuam em conjunto, o resultado agregado converge inevitavelmente para a Distribuição Normal. É o Teorema do Limite Central em ação. Se soltarmos milhares de esferas através de pinos (Tábua de Galton), elas formam perfeitamente este sino estatístico.'
  }
];

export const dataImportancePoints = [
  {
    title: 'Tomada de Decisão Rigorosa',
    description: 'A intuição humana falha frequentemente perante a complexidade. A estatística fornece um farol metodológico para converter números brutos em decisões informadas e baseadas em evidências sólidas.',
    icon: 'BrainCircuit'
  },
  {
    title: 'Prevenção e Modelação de Risco',
    description: 'De seguradoras a investimentos financeiros, a análise de dados permite quantificar a incerteza e estimar probabilidades, protegendo instituições e indivíduos de eventos catastróficos.',
    icon: 'ShieldCheck'
  },
  {
    title: 'Avanço Científico e Saúde',
    description: 'Nenhum medicamento é aprovado sem ensaios clínicos rigorosos sustentados em bioestatística. A análise quantitativa é a chave para discernir efeitos reais de meras coincidências e salvar vidas.',
    icon: 'Stethoscope'
  },
  {
    title: 'Combustível para a IA e Machine Learning',
    description: 'A Inteligência Artificial moderna não passa de modelos estatísticos complexos alimentados por vastos volumes de dados. Sem dados limpos e modelação correta, os algoritmos produzem respostas erradas.',
    icon: 'Cpu'
  },
  {
    title: 'Avanço e Inovação no Ensino',
    description: 'A literacia estatística é essencial desde cedo para cultivar o pensamento crítico. Ao compreender dados e probabilidades, formamos cidadãos capazes de analisar informações complexas e questionar o mundo que os rodeia.',
    icon: 'GraduationCap'
  }
];

export const fundingProjects: Project[] = [
  {
    reference: 'UIDB/00006/2020',
    agency: 'FCT',
    name: 'Projeto de Financiamento Plurianual do Centro de Estatística e Aplicações da Universidade de Lisboa (CEAUL) - Componente de Base'
  },
  {
    reference: 'UIDP/00006/2020',
    agency: 'FCT',
    name: 'Projeto de Financiamento Plurianual do Centro de Estatística e Aplicações da Universidade de Lisboa (CEAUL) - Componente Programática'
  }
];
