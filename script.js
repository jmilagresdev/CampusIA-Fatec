const chatBox = document.getElementById("chat-box");
const input = document.getElementById("input");
const modalPersonalizacao = document.getElementById("modal-personalizacao");
const formPersonalizacao = document.getElementById("form-personalizacao");
const previewPersonalizacao = document.getElementById("preview-personalizacao");
const painelSinonimos = document.getElementById("painel-sinonimos");
const sinonimoPalavra = document.getElementById("sinonimo-palavra");
const sinonimoDescricao = document.getElementById("sinonimo-descricao");
const sinonimoLista = document.getElementById("sinonimo-lista");
const painelIdiomas = document.getElementById("painel-idiomas");
const listaIdiomas = document.getElementById("lista-idiomas");
const painelDaltonismo = document.getElementById("painel-daltonismo");
const telaSelecao = document.getElementById("tela-selecao");
const telaLoginProfessor = document.getElementById("tela-login-professor");
const formLoginProfessor = document.getElementById("form-login-professor");
const matriculaProfessor = document.getElementById("matricula-professor");
const senhaProfessor = document.getElementById("senha-professor");
const erroLoginProfessor = document.getElementById("erro-login-professor");
const telaTotem = document.getElementById("tela-totem");
const avatarTotem = document.getElementById("avatar-totem");
const nomeAssistenteCard = document.getElementById("nome-assistente-card");
const statusAssistente = document.getElementById("status-assistente");
const btnEnviar = document.getElementById("btn-enviar");
const cardsSugestoes = document.getElementById("cards-sugestoes");
const privacidadeChat = document.getElementById("privacidade-chat");

const API_BASE_URL = "http://localhost:3000/api";

const idiomasDisponiveis = [
  { codigo: "pt-BR", nome: "Português", nativo: "Português do Brasil" },
  { codigo: "en", nome: "Inglês", nativo: "English" },
  { codigo: "es", nome: "Espanhol", nativo: "Español" },
  { codigo: "fr", nome: "Francês", nativo: "Français" },
  { codigo: "de", nome: "Alemão", nativo: "Deutsch" },
  { codigo: "it", nome: "Italiano", nativo: "Italiano" },
  { codigo: "ja", nome: "Japonês", nativo: "日本語" },
  { codigo: "zh-CN", nome: "Chinês", nativo: "中文" },
  { codigo: "ko", nome: "Coreano", nativo: "한국어" },
  { codigo: "ar", nome: "Árabe", nativo: "العربية" },
  { codigo: "hi", nome: "Hindi", nativo: "हिन्दी" },
  { codigo: "ru", nome: "Russo", nativo: "Русский" },
  { codigo: "nl", nome: "Holandês", nativo: "Nederlands" },
  { codigo: "sv", nome: "Sueco", nativo: "Svenska" },
  { codigo: "no", nome: "Norueguês", nativo: "Norsk" },
  { codigo: "da", nome: "Dinamarquês", nativo: "Dansk" },
  { codigo: "fi", nome: "Finlandês", nativo: "Suomi" },
  { codigo: "pl", nome: "Polonês", nativo: "Polski" },
  { codigo: "tr", nome: "Turco", nativo: "Türkçe" },
  { codigo: "el", nome: "Grego", nativo: "Ελληνικά" },
  { codigo: "he", nome: "Hebraico", nativo: "עברית" },
  { codigo: "th", nome: "Tailandês", nativo: "ไทย" },
  { codigo: "vi", nome: "Vietnamita", nativo: "Tiếng Việt" },
  { codigo: "id", nome: "Indonésio", nativo: "Bahasa Indonesia" },
  { codigo: "uk", nome: "Ucraniano", nativo: "Українська" },
  { codigo: "cs", nome: "Tcheco", nativo: "Čeština" },
  { codigo: "ro", nome: "Romeno", nativo: "Română" },
  { codigo: "hu", nome: "Húngaro", nativo: "Magyar" }
];

let idiomaAtual = localStorage.getItem("idiomaEva") || "pt-BR";

const i18n = {
  "pt-BR": {
    language: "Idioma",
    end: "Encerrar",
    stop: "Parar",
    serviceTotem: "Totem de atendimento",
    campusName: "FATEC Zona Sul",
    chooseAssistant: "Escolha o seu assistente virtual",
    academicAssistantFemale: "Matrícula, documentos e calendário",
    academicAssistantMale: "Assistente virtual acadêmico",
    institutionalCareer: "Carreira, eventos, estágios e setores",
    teachersOnly: "Área docente: aulas, turmas e relatórios",
    suggestions: "Sugestões para você",
    suggestionHint: "Toque em uma opção ou digite sua dúvida.",
    talkAssistant: "Fale com o assistente",
    tapAndType: "Toque aqui e digite sua dúvida",
    chatAvailable: "Chat disponível",
    accessibility: "Acessibilidade",
    accessibilityResources: "Recursos de acessibilidade",
    enableReadAloud: "Ativar leitura em voz alta",
    readAloudActive: "Leitura em voz alta ativa",
    hearAnswers: "Ouvir respostas",
    ready: "Pronto para ajudar",
    typing: "Digitando resposta...",
    typingBubble: "está digitando",
    listening: "Ouvindo...",
    authenticated: "Atendimento autenticado",
    privacy: "Encerre o atendimento ao finalizar. A conversa é apagada ao sair.",
    languagePanelTitle: "Idioma do atendimento",
    languagePanelText: "Escolha o idioma da interface e das respostas dos assistentes.",
    restrictedArea: "Área restrita para professores",
    restrictedTitle: "Área Restrita para Professores.",
    restrictedText: "A Dani possui acesso a informações acadêmicas e ferramentas de apoio pedagógico exclusivas para docentes. Para continuar, realize seu login:",
    registration: "Matrícula",
    password: "Senha",
    enter: "Entrar",
    back: "Voltar",
    messagePlaceholder: "Digite sua mensagem...",
    secureEnvironment: "Ambiente seguro e sigiloso",
    dataProtected: "Seus dados estão protegidos",
    finishWhenDone: "Encerre o atendimento ao finalizar",
    totemMonitored: "Este totem é monitorado",
    suggestionEnrollmentLock: "Trancamento<br>de matrícula",
    suggestionStudentPass: "Bilhete<br>Único",
    suggestionCadunico: "CadÚnico/<br>SPTrans",
    suggestionDocuments: "Documentos<br>Acadêmicos",
    suggestionCalendar: "Calendário<br>Acadêmico",
    suggestionLibrary: "Biblioteca<br>e Setores",
    suggestionEvents: "Eventos<br>e Palestras",
    suggestionInternships: "Estágios<br>e Vagas",
    suggestionMonitoring: "Monitorias<br>e Projetos",
    suggestionCareer: "Carreira<br>em TI",
    suggestionPlanLesson: "Planejar<br>Aula",
    suggestionCreateAssessment: "Criar<br>Avaliação",
    suggestionClassManagement: "Gestão<br>de Turmas",
    suggestionAcademicAgenda: "Agenda<br>Acadêmica",
    suggestionReports: "Relatórios",
    suggestionRegulations: "Regulamentos",
    quickEnrollmentLock: "Quero trancar minha matrícula",
    quickStudentPass: "Quero saber sobre Bilhete Único",
    quickCadunico: "Quero informações sobre gratuidade e CadÚnico SPTrans",
    quickDocuments: "Preciso de documentos acadêmicos",
    quickCalendar: "Quero consultar o calendário acadêmico",
    quickRematricula: "Quando começam as rematrículas?",
    quickLibrary: "Qual o horário da biblioteca?",
    quickEvents: "Quais eventos acontecerão este mês?",
    quickInternships: "Existem vagas de estágio para desenvolvimento?",
    quickMonitoring: "Onde encontro oportunidades de monitoria?",
    quickCareer: "Como melhorar meu LinkedIn?",
    quickPlanLesson: "Planejar aula",
    quickCreateAssessment: "Criar avaliação",
    quickClassManagement: "Gestão de turmas",
    quickAcademicAgenda: "Agenda acadêmica",
    quickReports: "Relatórios da turma",
    quickRegulations: "Regulamentos docentes",
    initialEva: "Oii! Eu sou {assistente}. Pode ficar tranquilo, vou te ajudar com dúvidas, solicitações e serviços acadêmicos de forma rápida e prática. Me diga como posso te ajudar?",
    initialElias: "Olá! Eu sou o Elias, assistente institucional e de carreira da Fatec Zona Sul. Posso ajudar com calendário acadêmico, biblioteca, eventos, palestras, projetos de extensão, iniciação científica, monitorias, contatos dos setores, estágios, vagas, LinkedIn, currículo, portfólio e entrevistas.<br>Como posso ajudar hoje?",
    initialDani: "Olá, Profª {nome}! 👋 Sou a Dani, sua Assistente Acadêmica. Já encontrei suas turmas, disciplinas e cursos vinculados a esta matrícula. Posso ajudar no planejamento de aulas, criação de avaliações, acompanhamento de turmas, consulta de regulamentos e apoio pedagógico.<br>Como posso ajudar hoje?",
    fallback: "Posso ajudar com trancamento, documentos, calendário, Bilhete Único, acessibilidade e atendimento acadêmico.",
    demoTranslation: ""
  },
  en: {
    language: "Language",
    end: "End",
    stop: "Stop",
    serviceTotem: "Service Totem",
    campusName: "FATEC South Zone",
    chooseAssistant: "Choose your virtual assistant",
    academicAssistantFemale: "Enrollment, documents and calendar",
    academicAssistantMale: "Academic virtual assistant",
    institutionalCareer: "Career, events, internships and departments",
    teachersOnly: "Faculty area: classes, groups and reports",
    suggestions: "Suggestions for you",
    suggestionHint: "Tap an option or type your question.",
    talkAssistant: "Talk to the assistant",
    tapAndType: "Tap here and type your question",
    chatAvailable: "Chat available",
    accessibility: "Accessibility",
    accessibilityResources: "Accessibility resources",
    enableReadAloud: "Enable read aloud",
    readAloudActive: "Read aloud enabled",
    hearAnswers: "Listen to answers",
    ready: "Ready to help",
    typing: "Typing response...",
    typingBubble: "is typing",
    listening: "Listening...",
    authenticated: "Authenticated service",
    privacy: "End the service when finished. The conversation is cleared when you leave.",
    languagePanelTitle: "Service language",
    languagePanelText: "Choose the language for the interface and assistant responses.",
    restrictedArea: "Restricted area for teachers",
    restrictedTitle: "Restricted Area for Teachers.",
    restrictedText: "Dani has access to academic information and pedagogical support tools exclusive to faculty. To continue, please log in:",
    registration: "Faculty ID",
    password: "Password",
    enter: "Sign in",
    back: "Back",
    messagePlaceholder: "Type your message...",
    secureEnvironment: "Secure and private environment",
    dataProtected: "Your data is protected",
    finishWhenDone: "End the service when finished",
    totemMonitored: "This totem is monitored",
    suggestionEnrollmentLock: "Enrollment<br>suspension",
    suggestionStudentPass: "Student<br>transport card",
    suggestionCadunico: "CadÚnico/<br>SPTrans",
    suggestionDocuments: "Academic<br>documents",
    suggestionCalendar: "Academic<br>calendar",
    suggestionLibrary: "Library<br>and Departments",
    suggestionEvents: "Events<br>and Talks",
    suggestionInternships: "Internships<br>and Jobs",
    suggestionMonitoring: "Tutoring<br>and Projects",
    suggestionCareer: "IT<br>Career",
    suggestionPlanLesson: "Plan<br>Lesson",
    suggestionCreateAssessment: "Create<br>Assessment",
    suggestionClassManagement: "Class<br>Management",
    suggestionAcademicAgenda: "Academic<br>Agenda",
    suggestionReports: "Reports",
    suggestionRegulations: "Regulations",
    quickEnrollmentLock: "I want to suspend my enrollment",
    quickStudentPass: "I want information about the student transport card",
    quickCadunico: "I need information about free fare and CadÚnico/SPTrans",
    quickDocuments: "I need academic documents",
    quickCalendar: "I want to check the academic calendar",
    quickRematricula: "When does re-enrollment start?",
    quickLibrary: "What are the library hours?",
    quickEvents: "What events are happening this month?",
    quickInternships: "Are there development internship openings?",
    quickMonitoring: "Where can I find tutoring opportunities?",
    quickCareer: "How can I improve my LinkedIn?",
    quickPlanLesson: "Plan lesson",
    quickCreateAssessment: "Create assessment",
    quickClassManagement: "Class management",
    quickAcademicAgenda: "Academic agenda",
    quickReports: "Class reports",
    quickRegulations: "Faculty regulations",
    initialEva: "Hi! I am {assistente}. You can relax, I will help you with academic questions, requests and services quickly and clearly. How can I help you?",
    initialElias: "Hello! I am Elias, FATEC South Zone's institutional and career assistant. I can help with academic calendar, library, events, talks, extension projects, scientific initiation, tutoring, department contacts, internships, jobs, LinkedIn, resumes, portfolios and interviews.<br>How can I help today?",
    initialDani: "Hello, Prof. {nome}! 👋 I am Dani, your Academic Assistant. I found the classes, subjects and programs linked to this faculty ID. I can help with lesson planning, assessment creation, class monitoring, regulations and pedagogical support.<br>How can I help today?",
    fallback: "I can help with enrollment suspension, documents, calendar, student transport card, accessibility and academic service.",
    demoTranslation: "Demo translation active."
  },
  es: {
    language: "Idioma",
    end: "Finalizar",
    stop: "Parar",
    serviceTotem: "Tótem de atención",
    campusName: "FATEC Zona Sur",
    chooseAssistant: "Elige tu asistente virtual",
    academicAssistantFemale: "Matrícula, documentos y calendario",
    academicAssistantMale: "Asistente virtual académico",
    institutionalCareer: "Carrera, eventos, prácticas y sectores",
    teachersOnly: "Área docente: clases, grupos e informes",
    suggestions: "Sugerencias para ti",
    suggestionHint: "Toca una opción o escribe tu pregunta.",
    talkAssistant: "Hablar con el asistente",
    tapAndType: "Toca aquí y escribe tu pregunta",
    chatAvailable: "Chat disponible",
    accessibility: "Accesibilidad",
    accessibilityResources: "Recursos de accesibilidad",
    enableReadAloud: "Activar lectura en voz alta",
    readAloudActive: "Lectura en voz alta activa",
    hearAnswers: "Escuchar respuestas",
    ready: "Listo para ayudar",
    typing: "Escribiendo respuesta...",
    typingBubble: "está escribiendo",
    listening: "Escuchando...",
    authenticated: "Atención autenticada",
    privacy: "Finaliza la atención al terminar. La conversación se borra al salir.",
    languagePanelTitle: "Idioma de atención",
    languagePanelText: "Elige el idioma de la interfaz y de las respuestas.",
    restrictedArea: "Área restringida para docentes",
    restrictedTitle: "Área Restringida para Docentes.",
    restrictedText: "Dani tiene acceso a información académica y herramientas de apoyo pedagógico exclusivas para docentes. Para continuar, inicia sesión:",
    registration: "Matrícula",
    password: "Contraseña",
    enter: "Entrar",
    back: "Volver",
    messagePlaceholder: "Escribe tu mensaje...",
    secureEnvironment: "Entorno seguro y confidencial",
    dataProtected: "Tus datos están protegidos",
    finishWhenDone: "Finaliza la atención al terminar",
    totemMonitored: "Este tótem está monitoreado",
    suggestionEnrollmentLock: "Suspender<br>matrícula",
    suggestionStudentPass: "Tarjeta<br>estudiantil",
    suggestionCadunico: "CadÚnico/<br>SPTrans",
    suggestionDocuments: "Documentos<br>académicos",
    suggestionCalendar: "Calendario<br>académico",
    suggestionLibrary: "Biblioteca<br>y Sectores",
    suggestionEvents: "Eventos<br>y Charlas",
    suggestionInternships: "Prácticas<br>y Vacantes",
    suggestionMonitoring: "Tutorías<br>y Proyectos",
    suggestionCareer: "Carrera<br>en TI",
    suggestionPlanLesson: "Planificar<br>clase",
    suggestionCreateAssessment: "Crear<br>evaluación",
    suggestionClassManagement: "Gestión<br>de grupos",
    suggestionAcademicAgenda: "Agenda<br>académica",
    suggestionReports: "Informes",
    suggestionRegulations: "Reglamentos",
    quickEnrollmentLock: "Quiero suspender mi matrícula",
    quickStudentPass: "Quiero información sobre la tarjeta estudiantil",
    quickCadunico: "Necesito información sobre gratuidad y CadÚnico/SPTrans",
    quickDocuments: "Necesito documentos académicos",
    quickCalendar: "Quiero consultar el calendario académico",
    quickRematricula: "¿Cuándo comienzan las rematrículas?",
    quickLibrary: "¿Cuál es el horario de la biblioteca?",
    quickEvents: "¿Qué eventos habrá este mes?",
    quickInternships: "¿Hay vacantes de prácticas en desarrollo?",
    quickMonitoring: "¿Dónde encuentro oportunidades de tutoría?",
    quickCareer: "¿Cómo puedo mejorar mi LinkedIn?",
    quickPlanLesson: "Planificar clase",
    quickCreateAssessment: "Crear evaluación",
    quickClassManagement: "Gestión de grupos",
    quickAcademicAgenda: "Agenda académica",
    quickReports: "Informes del grupo",
    quickRegulations: "Reglamentos docentes",
    initialEva: "¡Hola! Soy {assistente}. Puedes estar tranquilo, te ayudaré con dudas, solicitudes y servicios académicos de forma rápida y clara. ¿Cómo puedo ayudarte?",
    initialElias: "¡Hola! Soy Elias, asistente institucional y de carrera de FATEC Zona Sur. Puedo ayudar con calendario académico, biblioteca, eventos, charlas, proyectos de extensión, iniciación científica, tutorías, contactos de sectores, prácticas, vacantes, LinkedIn, currículum, portafolio y entrevistas.<br>¿Cómo puedo ayudarte hoy?",
    initialDani: "¡Hola, Prof. {nome}! 👋 Soy Dani, tu Asistente Académica. Ya encontré las clases, asignaturas y carreras vinculadas a esta matrícula. Puedo ayudar con planificación de clases, evaluaciones, seguimiento de grupos, reglamentos y apoyo pedagógico.<br>¿Cómo puedo ayudar hoy?",
    fallback: "Puedo ayudar con matrícula, documentos, calendario, Billete Único, accesibilidad y atención académica.",
    demoTranslation: "Traducción demo activa."
  }
};

idiomasDisponiveis
  .map((idioma) => idioma.codigo)
  .filter((codigo) => !["pt-BR", "en", "es"].includes(codigo))
  .forEach((codigo) => {
    i18n[codigo] = {
      ...i18n.en,
      language: idiomasDisponiveis.find((idioma) => idioma.codigo === codigo)?.nativo || "Language",
      demoTranslation: `Translation demo active: ${idiomasDisponiveis.find((idioma) => idioma.codigo === codigo)?.nativo || codigo}.`
    };
  });

function txt(chave) {
  return (i18n[idiomaAtual] && i18n[idiomaAtual][chave]) || i18n.en[chave] || i18n["pt-BR"][chave] || chave;
}

function textoIdioma(pt, en = pt, es = en) {
  const idiomaBase = idiomaAtual.toLowerCase().split("-")[0];
  if (idiomaBase === "pt") return pt;
  if (idiomaBase === "es") return es;
  return en;
}

/* CORREÇÃO MOBILE / IOS */

function ajustarAlturaMobile() {
  const alturaViewport = window.visualViewport
    ? window.visualViewport.height
    : window.innerHeight;

  document.documentElement.style.setProperty(
    "--altura-real",
    `${alturaViewport}px`
  );

  if (window.visualViewport) {
    const inputFocado = document.activeElement === input;
    const tecladoAberto =
      window.innerHeight - window.visualViewport.height > 120 ||
      (window.innerWidth <= 768 && inputFocado);

    document.body.classList.toggle("teclado-aberto", tecladoAberto);
    document.body.style.transform = window.visualViewport.offsetTop
      ? `translateY(${window.visualViewport.offsetTop}px)`
      : "";
  }

  rolarChatParaBaixo();
}

function traduzirSugestao(item) {
  return item.labelKey ? txt(item.labelKey) : item.texto;
}

function traduzirTextoRapido(item) {
  return item.messageKey ? txt(item.messageKey) : item.mensagem;
}

function traduzirMensagemAssistente(texto) {
  if (idiomaAtual === "pt-BR") return texto;

  const traducoesExatas = {
    [i18n["pt-BR"].fallback]: txt("fallback")
  };

  if (traducoesExatas[texto]) return traducoesExatas[texto];

  if (texto.includes("Localizei suas turmas") || texto.includes("Consultei a base demo")) {
    return `${txt("demoTranslation")}<br><br>${texto}`;
  }

  return texto;
}

function aplicarIdioma() {
  document.documentElement.lang = idiomaAtual;
  localStorage.setItem("idiomaEva", idiomaAtual);

  document.querySelectorAll("[data-i18n]").forEach((elemento) => {
    elemento.innerText = txt(elemento.dataset.i18n);
  });

  const tituloSelecao = document.querySelector(".selecao-conteudo h1");
  if (tituloSelecao) tituloSelecao.innerText = txt("chooseAssistant");

  const cards = document.querySelectorAll(".assistente-card > span");
  if (cards[0]) cards[0].innerText = txt("academicAssistantFemale");
  if (cards[1]) cards[1].innerText = txt("institutionalCareer");
  if (cards[2]) cards[2].innerText = txt("teachersOnly");

  const loginTitulo = document.querySelector(".login-professor-copy h1");
  const loginTexto = document.querySelector(".login-professor-copy p:not(.login-etiqueta)");
  const labelsLogin = document.querySelectorAll(".form-login-professor label");
  const botoesLogin = document.querySelectorAll(".login-professor-acoes button");

  if (loginTitulo) loginTitulo.innerText = txt("restrictedTitle");
  if (loginTexto) loginTexto.innerText = txt("restrictedText");
  if (labelsLogin[0]) labelsLogin[0].innerText = txt("registration");
  if (labelsLogin[1]) labelsLogin[1].innerText = txt("password");
  if (botoesLogin[0]) botoesLogin[0].innerText = txt("enter");
  if (botoesLogin[1]) botoesLogin[1].innerText = txt("back");

  const tituloSugestoes = document.querySelector(".card-sugestoes h2");
  if (tituloSugestoes) {
    tituloSugestoes.innerHTML = `<svg class="icon"><use href="#icon-star"></use></svg>${txt("suggestions")}`;
  }

  if (statusAssistente) {
    statusAssistente.innerText = txt("ready");
  }

  if (privacidadeChat) {
    privacidadeChat.innerHTML =
      assistenteAtual.id === "dani"
        ? `<svg class="icon"><use href="#icon-shield"></use></svg>${txt("authenticated")}`
        : `<svg class="icon"><use href="#icon-shield"></use></svg>${txt("privacy")}`;
  }

  const btnAudio = document.getElementById("btn-audio");
  if (btnAudio) {
    const texto = btnAudio.querySelector("strong");
    if (texto) texto.innerText = audioAtivo ? txt("readAloudActive") : txt("enableReadAloud");
  }

  if (input) {
    input.placeholder = txt("messagePlaceholder");
    input.setAttribute("aria-label", txt("messagePlaceholder"));
  }

  renderizarIdiomas();
  renderizarSugestoes();
}

function abrirIdiomas() {
  if (!painelIdiomas) return;
  renderizarIdiomas();
  painelIdiomas.hidden = false;
}

function fecharIdiomas() {
  if (painelIdiomas) painelIdiomas.hidden = true;
}

function selecionarIdioma(codigo) {
  idiomaAtual = codigo;
  aplicarIdioma();
  fecharIdiomas();

  if (chatBox && chatBox.children.length && telaTotem && !telaTotem.hidden) {
    invalidarRespostaAtual();
    limparFluxoAtual();
    chatBox.innerHTML = "";
    etapa = "inicio";
    mensagemInicial();
    adicionarMensagemEva(`${txt("languagePanelTitle")}: ${idiomasDisponiveis.find((idioma) => idioma.codigo === codigo)?.nativo || codigo}`);
    salvarHistorico();
  }
}

function renderizarIdiomas() {
  if (!listaIdiomas) return;

  listaIdiomas.innerHTML = "";
  idiomasDisponiveis.forEach((idioma) => {
    const botao = document.createElement("button");
    botao.type = "button";
    botao.classList.toggle("ativo", idioma.codigo === idiomaAtual);
    botao.innerHTML = `<strong>${idioma.nativo}</strong><span>${idioma.nome}</span>`;
    botao.addEventListener("click", () => selecionarIdioma(idioma.codigo));
    listaIdiomas.appendChild(botao);
  });
}

function encerrarTotem() {
  voltarSelecao();
}

window.addEventListener("load", ajustarAlturaMobile);
window.addEventListener("resize", ajustarAlturaMobile);
window.addEventListener("orientationchange", ajustarAlturaMobile);

if (window.visualViewport) {
  window.visualViewport.addEventListener("resize", ajustarAlturaMobile);
  window.visualViewport.addEventListener("scroll", ajustarAlturaMobile);
}

/* USUÁRIO */

function gerarIdUsuario() {
  if (window.crypto && crypto.randomUUID) {
    return crypto.randomUUID();
  }

  return "usuario-" + Date.now() + "-" + Math.floor(Math.random() * 100000);
}

const usuarioEva = {
  id: localStorage.getItem("usuarioEvaId") || gerarIdUsuario()
};

localStorage.setItem("usuarioEvaId", usuarioEva.id);

/* VARIÁVEIS */

let etapa = "inicio";
let timeoutsEva = [];
let respostaAtualId = 0;

// Cancelamento e controle de requisições
let abortControllers = {};
let currentConversationId = localStorage.getItem("conversationIdEva") || null;

function limparPendenciasResposta() {
  timeoutsEva.forEach(clearTimeout);
  timeoutsEva = [];

  Object.values(abortControllers).forEach((ctl) => {
    try {
      ctl.abort();
    } catch (e) { }
  });
  abortControllers = {};
}

function iniciarCicloResposta() {
  respostaAtualId += 1;
  limparPendenciasResposta();
  const controller = new AbortController();
  abortControllers.resposta = controller;
  window.respostaAtualSignal = controller.signal;
  return respostaAtualId;
}

function invalidarRespostaAtual() {
  respostaAtualId += 1;
  limparPendenciasResposta();
  delete window.respostaAtualSignal;
}

function respostaEstaAtiva(idResposta) {
  return idResposta === respostaAtualId;
}

function limparFluxoAtual() {
  if (typeof limparEstadoFluxos === "function") {
    limparEstadoFluxos();
  }
}

// Gerenciamento simples de conversas no localStorage
function loadConversationList() {
  try {
    const raw = localStorage.getItem("conversasEva");
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    console.warn("Erro ao carregar conversas locais", e);
    return [];
  }
}

function saveConversationList(list) {
  try {
    localStorage.setItem("conversasEva", JSON.stringify(list));
  } catch (e) {
    console.warn("Erro ao salvar conversas locais", e);
  }
}

function createOrUpdateConversation(dados) {
  const list = loadConversationList();
  if (currentConversationId) {
    const idx = list.findIndex((c) => c.id === currentConversationId);
    if (idx !== -1) {
      list[idx] = { ...list[idx], ...dados };
      saveConversationList(list);
      return;
    }
  }

  // criar nova conversa
  const id = (window.crypto && crypto.randomUUID && crypto.randomUUID()) || `conv-${Date.now()}`;
  currentConversationId = id;
  localStorage.setItem("conversationIdEva", currentConversationId);
  const item = { id, title: dados.historico?.slice(0, 120) || "Conversa", ...dados };
  list.push(item);
  saveConversationList(list);
}

function abrirModalConversas() {
  const modal = document.getElementById("modal-conversas");
  if (!modal) return;
  renderModalConversas();
  modal.hidden = false;
}

function fecharModalConversas() {
  const modal = document.getElementById("modal-conversas");
  if (modal) modal.hidden = true;
}

function renderModalConversas() {
  const lista = document.getElementById("lista-conversas");
  if (!lista) return;
  const conv = loadConversationList();
  lista.innerHTML = "";
  if (!conv.length) {
    const vazio = document.createElement("div");
    vazio.innerText = "Nenhuma conversa salva.";
    lista.appendChild(vazio);
    return;
  }

  conv.slice().reverse().forEach((c) => {
    const row = document.createElement("div");
    const titulo = document.createElement("div");
    titulo.innerText = c.title || `Conversa ${c.id}`;
    const acoes = document.createElement("div");
    acoes.className = "acoes";

    const btnRetomar = document.createElement("button");
    btnRetomar.type = "button";
    btnRetomar.innerText = "Retomar";
    btnRetomar.addEventListener("click", () => retomarConversa(c.id));

    const btnExcluir = document.createElement("button");
    btnExcluir.type = "button";
    btnExcluir.innerText = "Excluir";
    btnExcluir.addEventListener("click", () => excluirConversa(c.id));

    acoes.appendChild(btnRetomar);
    acoes.appendChild(btnExcluir);

    row.appendChild(titulo);
    row.appendChild(acoes);
    lista.appendChild(row);
  });
}

function retomarConversa(id) {
  const list = loadConversationList();
  const item = list.find((c) => c.id === id);
  if (!item) return;
  currentConversationId = id;
  localStorage.setItem("conversationIdEva", id);
  localStorage.setItem("historicoEva", item.historico || "");
  localStorage.setItem("etapaEva", item.etapa || "inicio");
  fecharModalConversas();
  carregarHistorico();
}

function novaConversa() {
  invalidarRespostaAtual();
  limparFluxoAtual();
  currentConversationId = null;
  localStorage.removeItem("conversationIdEva");
  localStorage.removeItem("historicoEva");
  localStorage.removeItem("etapaEva");
  if (chatBox) chatBox.innerHTML = "";
  if (input) input.value = "";
  etapa = "inicio";
  fecharModalConversas();
  mensagemInicial();
}

function excluirConversa(id) {
  let list = loadConversationList();
  list = list.filter((c) => c.id !== id);
  saveConversationList(list);
  if (currentConversationId === id) {
    currentConversationId = null;
    localStorage.removeItem("conversationIdEva");
  }
  renderModalConversas();
}

let audioAtivo = false;
let tamanhoFonte = 1;
let filaAudio = [];
let audioFalando = false;
let timerInatividade = null;
let modoSinonimosAtivo = false;
let botaoDaltonismoAtual = null;
let vozesDisponiveis = [];
let professorAtual = null;
let assistenteAtual = {
  id: "eva",
  nome: "EVA",
  desk: "assets/eva-secretaria.png",
  chat: "assets/eva-standing.png"
};

const assistentesDisponiveis = {
  eva: {
    id: "eva",
    nome: "EVA",
    desk: "assets/eva-secretaria.png",
    chat: "assets/eva-standing.png"
  },
  elias: {
    id: "elias",
    nome: "Elias",
    desk: "assets/elias-secretaria.png",
    chat: "assets/elias-standing.png"
  },
  dani: {
    id: "dani",
    nome: "Dani",
    desk: "assets/dani-secretaria.png",
    chat: "assets/dani-professores.png"
  }
};

const professoresDemo = {
  "100125": {
    nome: "Milena Zahir",
    senha: "milena2026",
    cursos: ["ADS"]
  },
  "100126": {
    nome: "João Batista",
    senha: "joao2026",
    cursos: ["ADS", "DSM"]
  },
  "100127": {
    nome: "Luciana Alpiani",
    senha: "luciana2026",
    cursos: ["DSM", "ADS"]
  }
};

const bancoDemoDani = {
  limiteFaltas: 20,
  professores: {
    "100125": {
      nome: "Milena Zahir",
      disciplinas: [
        {
          disciplina: "Matemática Discreta",
          curso: "ADS",
          semestre: "1º semestre",
          alunos: [
            { nome: "Ana Clara Mendes", ra: "ADS1001", email: "ana.mendes@aluno.cps.com.br", presencas: 30, ausencias: 4, media: 8.4, participacao: "alta" },
            { nome: "Bruno Henrique Silva", ra: "ADS1002", email: "bruno.silva@aluno.cps.com.br", presencas: 26, ausencias: 8, media: 6.7, participacao: "média" },
            { nome: "Camila Rocha Nunes", ra: "ADS1003", email: "camila.nunes@aluno.cps.com.br", presencas: 18, ausencias: 16, media: 5.8, participacao: "baixa" },
            { nome: "Diego Santos Lima", ra: "ADS1004", email: "diego.lima@aluno.cps.com.br", presencas: 16, ausencias: 18, media: 6.1, participacao: "baixa" },
            { nome: "Elisa Pereira Costa", ra: "ADS1005", email: "elisa.costa@aluno.cps.com.br", presencas: 31, ausencias: 3, media: 9.1, participacao: "alta" }
          ]
        },
        {
          disciplina: "Cálculo",
          curso: "ADS",
          semestre: "2º semestre",
          alunos: [
            { nome: "Felipe Andrade Moraes", ra: "ADS2001", email: "felipe.moraes@aluno.cps.com.br", presencas: 25, ausencias: 9, media: 6.3, participacao: "média" },
            { nome: "Giovana Martins Alves", ra: "ADS2002", email: "giovana.alves@aluno.cps.com.br", presencas: 29, ausencias: 5, media: 7.8, participacao: "alta" },
            { nome: "Henrique Barros Souza", ra: "ADS2003", email: "henrique.souza@aluno.cps.com.br", presencas: 17, ausencias: 17, media: 5.4, participacao: "baixa" },
            { nome: "Isabela Gomes Vieira", ra: "ADS2004", email: "isabela.vieira@aluno.cps.com.br", presencas: 16, ausencias: 18, media: 6.0, participacao: "baixa" },
            { nome: "João Pedro Ramos", ra: "ADS2005", email: "joao.ramos@aluno.cps.com.br", presencas: 30, ausencias: 4, media: 8.6, participacao: "alta" }
          ]
        },
        {
          disciplina: "Programação Linear e Aplicações",
          curso: "ADS",
          semestre: "5º semestre",
          alunos: [
            { nome: "Karina Lopes Farias", ra: "ADS5001", email: "karina.farias@aluno.cps.com.br", presencas: 27, ausencias: 7, media: 7.2, participacao: "média" },
            { nome: "Lucas Ribeiro Teixeira", ra: "ADS5002", email: "lucas.teixeira@aluno.cps.com.br", presencas: 15, ausencias: 19, media: 5.7, participacao: "baixa" },
            { nome: "Mariana Castro Dias", ra: "ADS5003", email: "mariana.dias@aluno.cps.com.br", presencas: 28, ausencias: 6, media: 8.0, participacao: "alta" },
            { nome: "Nicolas Ferreira Prado", ra: "ADS5004", email: "nicolas.prado@aluno.cps.com.br", presencas: 18, ausencias: 16, media: 6.4, participacao: "média" },
            { nome: "Olívia Cardoso Melo", ra: "ADS5005", email: "olivia.melo@aluno.cps.com.br", presencas: 32, ausencias: 2, media: 9.3, participacao: "alta" }
          ]
        }
      ]
    },
    "100126": {
      nome: "João Batista",
      disciplinas: [
        {
          disciplina: "Contabilidade",
          curso: "ADS",
          semestre: "2º semestre",
          alunos: [
            { nome: "Paula Beatriz Oliveira", ra: "ADS2101", email: "paula.oliveira@aluno.cps.com.br", presencas: 29, ausencias: 5, media: 8.1, participacao: "alta" },
            { nome: "Rafael Augusto Pinto", ra: "ADS2102", email: "rafael.pinto@aluno.cps.com.br", presencas: 18, ausencias: 16, media: 5.9, participacao: "baixa" },
            { nome: "Sofia Monteiro Reis", ra: "ADS2103", email: "sofia.reis@aluno.cps.com.br", presencas: 24, ausencias: 10, media: 6.8, participacao: "média" },
            { nome: "Thiago Nascimento Cruz", ra: "ADS2104", email: "thiago.cruz@aluno.cps.com.br", presencas: 16, ausencias: 18, media: 6.2, participacao: "baixa" },
            { nome: "Vitória Santana Leal", ra: "ADS2105", email: "vitoria.leal@aluno.cps.com.br", presencas: 31, ausencias: 3, media: 8.9, participacao: "alta" }
          ]
        },
        {
          disciplina: "Economia e Finanças",
          curso: "ADS",
          semestre: "3º semestre",
          alunos: [
            { nome: "Arthur Queiroz Freitas", ra: "ADS3001", email: "arthur.freitas@aluno.cps.com.br", presencas: 26, ausencias: 8, media: 7.1, participacao: "média" },
            { nome: "Bianca Sales Martins", ra: "ADS3002", email: "bianca.martins@aluno.cps.com.br", presencas: 17, ausencias: 17, media: 5.6, participacao: "baixa" },
            { nome: "Caio Eduardo Lopes", ra: "ADS3003", email: "caio.lopes@aluno.cps.com.br", presencas: 30, ausencias: 4, media: 8.7, participacao: "alta" },
            { nome: "Daniela Brito Campos", ra: "ADS3004", email: "daniela.campos@aluno.cps.com.br", presencas: 15, ausencias: 19, media: 6.0, participacao: "baixa" },
            { nome: "Eduardo Neves Rocha", ra: "ADS3005", email: "eduardo.rocha@aluno.cps.com.br", presencas: 28, ausencias: 6, media: 7.9, participacao: "alta" }
          ]
        },
        {
          disciplina: "Álgebra Linear",
          curso: "DSM",
          semestre: "3º semestre",
          alunos: [
            { nome: "Fernanda Lima Xavier", ra: "DSM3001", email: "fernanda.xavier@aluno.cps.com.br", presencas: 32, ausencias: 2, media: 9.0, participacao: "alta" },
            { nome: "Gabriel Pires Almeida", ra: "DSM3002", email: "gabriel.almeida@aluno.cps.com.br", presencas: 18, ausencias: 16, media: 6.4, participacao: "média" },
            { nome: "Helena Diniz Barbosa", ra: "DSM3003", email: "helena.barbosa@aluno.cps.com.br", presencas: 16, ausencias: 18, media: 5.8, participacao: "baixa" },
            { nome: "Igor Martins Tavares", ra: "DSM3004", email: "igor.tavares@aluno.cps.com.br", presencas: 27, ausencias: 7, media: 7.6, participacao: "média" },
            { nome: "Juliana Costa Azevedo", ra: "DSM3005", email: "juliana.azevedo@aluno.cps.com.br", presencas: 14, ausencias: 20, media: 5.2, participacao: "baixa" }
          ]
        }
      ]
    },
    "100127": {
      nome: "Luciana Alpiani",
      disciplinas: [
        {
          disciplina: "Banco de Dados Não Relacional",
          curso: "DSM",
          semestre: "3º semestre",
          alunos: [
            { nome: "Laura Cristina Machado", ra: "DSM3101", email: "laura.machado@aluno.cps.com.br", presencas: 29, ausencias: 5, media: 8.3, participacao: "alta" },
            { nome: "Miguel Henrique Torres", ra: "DSM3102", email: "miguel.torres@aluno.cps.com.br", presencas: 18, ausencias: 16, media: 5.7, participacao: "baixa" },
            { nome: "Natália Borges Pinto", ra: "DSM3103", email: "natalia.pinto@aluno.cps.com.br", presencas: 25, ausencias: 9, media: 6.9, participacao: "média" },
            { nome: "Otávio César Gomes", ra: "DSM3104", email: "otavio.gomes@aluno.cps.com.br", presencas: 15, ausencias: 19, media: 5.9, participacao: "baixa" },
            { nome: "Priscila Nogueira Dias", ra: "DSM3105", email: "priscila.dias@aluno.cps.com.br", presencas: 31, ausencias: 3, media: 8.8, participacao: "alta" }
          ]
        },
        {
          disciplina: "Banco de Dados Relacional",
          curso: "DSM",
          semestre: "2º semestre",
          alunos: [
            { nome: "Renan Alves Cardoso", ra: "DSM2001", email: "renan.cardoso@aluno.cps.com.br", presencas: 17, ausencias: 17, media: 6.1, participacao: "baixa" },
            { nome: "Sara Fernandes Neri", ra: "DSM2002", email: "sara.neri@aluno.cps.com.br", presencas: 30, ausencias: 4, media: 8.5, participacao: "alta" },
            { nome: "Talita Moreira Lopes", ra: "DSM2003", email: "talita.lopes@aluno.cps.com.br", presencas: 24, ausencias: 10, media: 6.7, participacao: "média" },
            { nome: "Uriel Carvalho Batista", ra: "DSM2004", email: "uriel.batista@aluno.cps.com.br", presencas: 16, ausencias: 18, media: 5.5, participacao: "baixa" },
            { nome: "Vanessa Prado Ribeiro", ra: "DSM2005", email: "vanessa.ribeiro@aluno.cps.com.br", presencas: 32, ausencias: 2, media: 9.2, participacao: "alta" }
          ]
        },
        {
          disciplina: "Estrutura de Dados",
          curso: "ADS",
          semestre: "3º semestre",
          alunos: [
            { nome: "Wesley Araújo Cunha", ra: "ADS3101", email: "wesley.cunha@aluno.cps.com.br", presencas: 19, ausencias: 15, media: 6.2, participacao: "média" },
            { nome: "Yasmin Correia Lima", ra: "ADS3102", email: "yasmin.lima@aluno.cps.com.br", presencas: 15, ausencias: 19, media: 5.6, participacao: "baixa" },
            { nome: "Zeca Matheus Barros", ra: "ADS3103", email: "zeca.barros@aluno.cps.com.br", presencas: 28, ausencias: 6, media: 7.7, participacao: "alta" },
            { nome: "Amanda Ferreira Nascimento", ra: "ADS3104", email: "amanda.nascimento@aluno.cps.com.br", presencas: 16, ausencias: 18, media: 6.0, participacao: "baixa" },
            { nome: "Breno Cavalcante Reis", ra: "ADS3105", email: "breno.reis@aluno.cps.com.br", presencas: 31, ausencias: 3, media: 8.9, participacao: "alta" }
          ]
        }
      ]
    }
  }
};

const sugestoesAlunos = [
  {
    texto: "Trancamento<br>de matrícula",
    labelKey: "suggestionEnrollmentLock",
    icone: "icon-lock",
    mensagem: "Quero trancar minha matrícula",
    messageKey: "quickEnrollmentLock"
  },
  {
    texto: "Bilhete<br>Único",
    labelKey: "suggestionStudentPass",
    icone: "icon-bus",
    mensagem: "Quero saber sobre Bilhete Único",
    messageKey: "quickStudentPass"
  },
  {
    texto: "CadÚnico/<br>SPTrans",
    labelKey: "suggestionCadunico",
    icone: "icon-id",
    mensagem: "Quero informações sobre gratuidade e CadÚnico SPTrans",
    messageKey: "quickCadunico"
  },
  {
    texto: "Documentos<br>Acadêmicos",
    labelKey: "suggestionDocuments",
    icone: "icon-file",
    mensagem: "Preciso de documentos acadêmicos",
    messageKey: "quickDocuments"
  },
  {
    texto: "Calendário<br>Acadêmico",
    labelKey: "suggestionCalendar",
    icone: "icon-calendar",
    mensagem: "Quero consultar o calendário acadêmico",
    messageKey: "quickCalendar"
  }
];

const sugestoesElias = [
  {
    texto: "Calendário<br>Acadêmico",
    labelKey: "suggestionCalendar",
    icone: "icon-calendar",
    mensagem: "Quando começam as rematrículas?",
    messageKey: "quickRematricula"
  },
  {
    texto: "Biblioteca<br>e Setores",
    labelKey: "suggestionLibrary",
    icone: "icon-book",
    mensagem: "Qual o horário da biblioteca?",
    messageKey: "quickLibrary"
  },
  {
    texto: "Eventos<br>e Palestras",
    labelKey: "suggestionEvents",
    icone: "icon-star",
    mensagem: "Quais eventos acontecerão este mês?",
    messageKey: "quickEvents"
  },
  {
    texto: "Estágios<br>e Vagas",
    labelKey: "suggestionInternships",
    icone: "icon-id",
    mensagem: "Existem vagas de estágio para desenvolvimento?",
    messageKey: "quickInternships"
  },
  {
    texto: "Monitorias<br>e Projetos",
    labelKey: "suggestionMonitoring",
    icone: "icon-lines",
    mensagem: "Onde encontro oportunidades de monitoria?",
    messageKey: "quickMonitoring"
  },
  {
    texto: "Carreira<br>em TI",
    labelKey: "suggestionCareer",
    icone: "icon-file",
    mensagem: "Como melhorar meu LinkedIn?",
    messageKey: "quickCareer"
  }
];

const sugestoesDocentes = [
  {
    texto: "Planejar<br>Aula",
    labelKey: "suggestionPlanLesson",
    icone: "icon-book",
    mensagem: "Planejar aula",
    messageKey: "quickPlanLesson"
  },
  {
    texto: "Criar<br>Avaliação",
    labelKey: "suggestionCreateAssessment",
    icone: "icon-file",
    mensagem: "Criar avaliação",
    messageKey: "quickCreateAssessment"
  },
  {
    texto: "Gestão<br>de Turmas",
    labelKey: "suggestionClassManagement",
    icone: "icon-id",
    mensagem: "Gestão de turmas",
    messageKey: "quickClassManagement"
  },
  {
    texto: "Agenda<br>Acadêmica",
    labelKey: "suggestionAcademicAgenda",
    icone: "icon-calendar",
    mensagem: "Agenda acadêmica",
    messageKey: "quickAcademicAgenda"
  },
  {
    texto: "Relatórios",
    labelKey: "suggestionReports",
    icone: "icon-lines",
    mensagem: "Relatórios da turma",
    messageKey: "quickReports"
  },
  {
    texto: "Regulamentos",
    labelKey: "suggestionRegulations",
    icone: "icon-book",
    mensagem: "Regulamentos docentes",
    messageKey: "quickRegulations"
  }
];

let preferenciasEva = {
  tom: "acolhedor",
  tema: "classic",
  resposta: "passo"
};

const textosPorTom = {
  acolhedor: {
    saudacao:
      "Oii! Eu sou {assistente}. Pode ficar tranquilo, vou te ajudar com dúvidas, solicitações e serviços acadêmicos de forma rápida e prática. Me diga como posso te ajudar?",
    naoEntendi:
      "Ainda não entendi totalmente, mas eu posso te guiar. Posso ajudar com trancamento de matrícula, documentos acadêmicos, calendário, Bilhete Único ou descobrir onde resolver seu problema.",
    mudancaBilhete:
      "Claro, podemos falar sobre Bilhete Único agora.",
    salvou:
      "Pronto! Ajustei minha forma de conversar com você."
  },
  formal: {
    saudacao:
      "Olá. Eu sou {assistente}, assistente virtual acadêmico. Posso auxiliá-lo com dúvidas, solicitações e serviços acadêmicos. Como posso ajudar?",
    naoEntendi:
      "Não localizei esse assunto. Posso auxiliar com trancamento de matrícula, documentos acadêmicos, calendário, Bilhete Único ou direcionamento do atendimento.",
    mudancaBilhete:
      "Certo. Podemos tratar sobre Bilhete Único agora.",
    salvou:
      "Configuração salva. A experiência do assistente foi atualizada."
  },
  direto: {
    saudacao:
      "Olá, sou {assistente}. Escolha um assunto ou digite sua dúvida acadêmica.",
    naoEntendi:
      "Não encontrei esse assunto. Posso ajudar com trancamento, documentos, calendário, Bilhete Único ou direcionamento.",
    mudancaBilhete:
      "Vamos para Bilhete Único.",
    salvou:
      "Preferências salvas."
  }
};

function textoTom(chave) {
  const tomAtual = textosPorTom[preferenciasEva.tom] || textosPorTom.acolhedor;
  const texto = tomAtual[chave] || textosPorTom.acolhedor[chave];
  return texto.replace("{assistente}", assistenteAtual.nome);
}

function aplicarPreferenciasEva() {
  document.body.classList.remove(
    "tema-classic",
    "tema-universitaria",
    "tema-tech"
  );

  document.body.classList.add(`tema-${preferenciasEva.tema}`);
  document.body.dataset.tomEva = preferenciasEva.tom;
  document.body.dataset.respostaEva = preferenciasEva.resposta;

  if (formPersonalizacao) {
    const campoTom = formPersonalizacao.elements.tom;
    const campoTema = formPersonalizacao.elements.tema;
    const campoResposta = formPersonalizacao.elements.resposta;

    if (campoTom) campoTom.value = preferenciasEva.tom;
    if (campoTema) campoTema.value = preferenciasEva.tema;
    if (campoResposta) campoResposta.value = preferenciasEva.resposta;
  }

  atualizarPreviewPersonalizacao();
}

function salvarPreferenciasEva() {
  localStorage.setItem("preferenciasEva", JSON.stringify(preferenciasEva));
}

function carregarPreferenciasEva() {
  const preferenciasSalvas = localStorage.getItem("preferenciasEva");

  if (preferenciasSalvas) {
    try {
      preferenciasEva = {
        ...preferenciasEva,
        ...JSON.parse(preferenciasSalvas)
      };
    } catch (erro) {
      console.warn("Não foi possível carregar preferências da Eva.", erro);
    }
  }

  aplicarPreferenciasEva();
}

function atualizarPreviewPersonalizacao() {
  if (!previewPersonalizacao) return;

  const exemplos = {
    acolhedor: "Oii, pode ficar tranquilo. Vou te ajudar no que precisar.",
    formal: "Olá. Como posso auxiliá-lo com sua demanda acadêmica?",
    direto: "Olá. Digite sua dúvida ou escolha um assunto."
  };

  const formatos = {
    passo: " Vou te orientar passo a passo.",
    curta: " Vou responder de forma objetiva.",
    simples: " Vou usar uma linguagem simples."
  };

  previewPersonalizacao.innerText =
    exemplos[preferenciasEva.tom] + formatos[preferenciasEva.resposta];
}

function abrirPersonalizacao() {
  if (!modalPersonalizacao) return;

  aplicarPreferenciasEva();
  modalPersonalizacao.hidden = false;

  const primeiroCampo = modalPersonalizacao.querySelector("button");

  if (primeiroCampo) {
    primeiroCampo.focus();
  }
}

function fecharPersonalizacao() {
  if (modalPersonalizacao) {
    modalPersonalizacao.hidden = true;
  }
}

function restaurarPersonalizacaoPadrao() {
  preferenciasEva = {
    tom: "acolhedor",
    tema: "classic",
    resposta: "passo"
  };

  salvarPreferenciasEva();
  aplicarPreferenciasEva();
}

function mensagemPorFormato(mensagens) {
  if (preferenciasEva.resposta === "curta") {
    return mensagens.curta || mensagens.passo;
  }

  if (preferenciasEva.resposta === "simples") {
    return mensagens.simples || mensagens.passo;
  }

  return mensagens.passo;
}

if (formPersonalizacao) {
  formPersonalizacao.addEventListener("change", function () {
    const dados = new FormData(formPersonalizacao);

    preferenciasEva = {
      tom: dados.get("tom") || preferenciasEva.tom,
      tema: dados.get("tema") || preferenciasEva.tema,
      resposta: dados.get("resposta") || preferenciasEva.resposta
    };

    aplicarPreferenciasEva();
  });

  formPersonalizacao.addEventListener("submit", function (event) {
    event.preventDefault();

    const dados = new FormData(formPersonalizacao);

    preferenciasEva = {
      tom: dados.get("tom") || preferenciasEva.tom,
      tema: dados.get("tema") || preferenciasEva.tema,
      resposta: dados.get("resposta") || preferenciasEva.resposta
    };

    salvarPreferenciasEva();
    aplicarPreferenciasEva();
    fecharPersonalizacao();
    adicionarMensagemEva(textoTom("salvou"));
  });
}

if (modalPersonalizacao) {
  modalPersonalizacao.addEventListener("click", function (event) {
    if (event.target === modalPersonalizacao) {
      fecharPersonalizacao();
    }
  });
}

if (painelDaltonismo) {
  painelDaltonismo.addEventListener("click", atualizarOpcoesDaltonismo);
}

if (formLoginProfessor) {
  formLoginProfessor.addEventListener("submit", function (event) {
    event.preventDefault();

    const matricula = matriculaProfessor?.value.trim() || "";
    const senha = senhaProfessor?.value || "";
    const professor = professoresDemo[matricula];

    if (!professor || professor.senha !== senha) {
      if (erroLoginProfessor) {
        erroLoginProfessor.innerText =
          "Matrícula ou senha inválida. Confira os dados e tente novamente.";
      }
      return;
    }

    professorAtual = {
      matricula,
      nome: professor.nome
    };

    iniciarChatAssistente();
  });
}

document.addEventListener("keydown", function (event) {
  if (event.key === "Escape" && modalPersonalizacao && !modalPersonalizacao.hidden) {
    fecharPersonalizacao();
  }

  if (event.key === "Escape" && painelDaltonismo && !painelDaltonismo.hidden) {
    fecharOpcoesDaltonismo();
  }

  if (event.key === "Escape" && painelIdiomas && !painelIdiomas.hidden) {
    fecharIdiomas();
  }
});

function aplicarAssistente() {
  if (avatarTotem) {
    avatarTotem.src = assistenteAtual.desk;
    avatarTotem.alt = `${assistenteAtual.nome}, assistente virtual no computador`;
  }

  if (nomeAssistenteCard) {
    nomeAssistenteCard.innerText = assistenteAtual.nome;
  }

  if (statusAssistente) {
    statusAssistente.innerText = txt("ready");
  }

  if (privacidadeChat) {
    privacidadeChat.innerHTML =
      assistenteAtual.id === "dani"
        ? `<svg class="icon"><use href="#icon-shield"></use></svg>${txt("authenticated")}`
        : `<svg class="icon"><use href="#icon-shield"></use></svg>${txt("privacy")}`;
  }

  document.body.dataset.assistente = assistenteAtual.id;
  renderizarSugestoes();
}

function renderizarSugestoes() {
  if (!cardsSugestoes) return;

  const lista =
    assistenteAtual.id === "dani"
      ? sugestoesDocentes
      : assistenteAtual.id === "elias"
        ? sugestoesElias
        : sugestoesAlunos;
  cardsSugestoes.innerHTML = "";

  lista.forEach((item) => {
    const botao = document.createElement("button");
    botao.type = "button";
    botao.addEventListener("click", function () {
      respostaRapida(item.mensagem, traduzirTextoRapido(item));
    });

    const icone = document.createElement("span");
    icone.innerHTML = `<svg class="icon"><use href="#${item.icone}"></use></svg>`;

    const texto = document.createElement("strong");
    texto.innerHTML = traduzirSugestao(item);

    botao.appendChild(icone);
    botao.appendChild(texto);
    cardsSugestoes.appendChild(botao);
  });
}

function selecionarAssistente(idAssistente) {
  assistenteAtual = assistentesDisponiveis[idAssistente] || assistentesDisponiveis.eva;
  localStorage.setItem("assistenteAtual", assistenteAtual.id);

  const cardSelecionado = document.querySelector(
    `.assistente-card[onclick*="${assistenteAtual.id}"]`
  );

  if (cardSelecionado) {
    cardSelecionado.classList.add("selecionado");
  }

  aplicarAssistente();

  setTimeout(() => {
    if (assistenteAtual.id === "dani") {
      abrirLoginProfessor();
      return;
    }

    iniciarChatAssistente();
  }, 550);
}

function iniciarChatAssistente() {
  if (telaSelecao) telaSelecao.hidden = true;
  if (telaLoginProfessor) telaLoginProfessor.hidden = true;
  if (telaTotem) telaTotem.hidden = false;

  limparFluxoAtual();
  chatBox.innerHTML = "";
  etapa = "inicio";
  mensagemInicial();
  input.focus();
  reiniciarTimerInatividade();
}

function abrirLoginProfessor() {
  if (telaSelecao) telaSelecao.hidden = true;
  if (telaTotem) telaTotem.hidden = true;
  if (telaLoginProfessor) telaLoginProfessor.hidden = false;

  if (erroLoginProfessor) erroLoginProfessor.innerText = "";
  if (senhaProfessor) senhaProfessor.value = "";
  matriculaProfessor?.focus();
}

function voltarLoginProfessor() {
  professorAtual = null;
  if (telaLoginProfessor) telaLoginProfessor.hidden = true;
  if (telaSelecao) telaSelecao.hidden = false;
}

function voltarSelecao() {
  invalidarRespostaAtual();
  limparFluxoAtual();
  removerDigitando();

  if ("speechSynthesis" in window) {
    speechSynthesis.cancel();
  }

  if (telaTotem) telaTotem.hidden = true;
  if (telaLoginProfessor) telaLoginProfessor.hidden = true;
  if (telaSelecao) telaSelecao.hidden = false;

  chatBox.innerHTML = "";
  input.value = "";
  etapa = "inicio";
  professorAtual = null;
  localStorage.removeItem("historicoEva");
  localStorage.removeItem("etapaEva");

  fetch(`${API_BASE_URL}/conversas/${usuarioEva.id}`, {
    method: "DELETE"
  }).catch((erro) => {
    console.warn("Não foi possível apagar conversa no back-end.", erro);
  });

  atualizarEstadoEnvio();
  limparTimerInatividade();
}

function definirEstadoAssistente(estado) {
  if (!avatarTotem || !statusAssistente) return;

  avatarTotem.classList.toggle("digitando", estado === "digitando");
  statusAssistente.innerText =
    estado === "digitando" ? txt("typing") : txt("ready");
}

function limparTimerInatividade() {
  if (timerInatividade) {
    clearTimeout(timerInatividade);
    timerInatividade = null;
  }
}

function reiniciarTimerInatividade() {
  limparTimerInatividade();

  if (!telaTotem || telaTotem.hidden) return;

  timerInatividade = setTimeout(() => {
    adicionarMensagemEva("Por segurança, vou encerrar este atendimento e apagar a conversa da tela.");

    setTimeout(() => {
      voltarSelecao();
    }, 2200);
  }, 120000);
}

["click", "keydown", "touchstart"].forEach((evento) => {
  document.addEventListener(evento, reiniciarTimerInatividade, { passive: true });
});

function atualizarEstadoEnvio() {
  if (!btnEnviar) return;

  btnEnviar.disabled = input.value.trim() === "";
}

/* ACESSIBILIDADE */

function aplicarFonte() {
  document.documentElement.style.setProperty("--escala-fonte", tamanhoFonte);
  salvarHistorico();
}

function aumentarFonte() {
  if (tamanhoFonte < 1.4) {
    tamanhoFonte = Number((tamanhoFonte + 0.1).toFixed(1));
    aplicarFonte();
  }
}

function diminuirFonte() {
  if (tamanhoFonte > 0.8) {
    tamanhoFonte = Number((tamanhoFonte - 0.1).toFixed(1));
    aplicarFonte();
  }
}

function alternarContraste() {
  document.body.classList.toggle("alto-contraste");

  const btnContraste = document.getElementById("btn-contraste");

  if (btnContraste) {
    btnContraste.setAttribute(
      "aria-pressed",
      document.body.classList.contains("alto-contraste")
    );
  }

  salvarHistorico();
}

function alternarAcessibilidade(classe, botao) {
  document.body.classList.toggle(classe);

  const estaAtivo = document.body.classList.contains(classe);

  if (botao) {
    botao.setAttribute("aria-pressed", estaAtivo ? "true" : "false");
  }

  salvarHistorico();
}

const dicionarioAcademico = {
  acadêmico: {
    significado: "Relacionado à faculdade, aos estudos e aos processos da instituição.",
    sinonimos: ["educacional", "universitário", "estudantil"]
  },
  acadêmica: {
    significado: "Relacionado à faculdade, aos estudos e aos processos da instituição.",
    sinonimos: ["educacional", "universitária", "estudantil"]
  },
  matrícula: {
    significado: "Registro que confirma o vínculo do aluno com o curso.",
    sinonimos: ["inscrição", "registro", "vínculo"]
  },
  trancamento: {
    significado: "Pausa temporária no curso, seguindo regras e prazos da instituição.",
    sinonimos: ["suspensão", "pausa", "interrupção temporária"]
  },
  bilhete: {
    significado: "Cartão ou benefício usado para transporte público estudantil.",
    sinonimos: ["cartão", "passe", "benefício"]
  },
  único: {
    significado: "No contexto do transporte, faz parte do nome Bilhete Único.",
    sinonimos: ["individual", "exclusivo"]
  },
  gratuidade: {
    significado: "Benefício que permite usar o transporte sem pagar tarifa, quando há direito aprovado.",
    sinonimos: ["passe livre", "isenção", "benefício gratuito"]
  },
  tarifa: {
    significado: "Valor cobrado por um serviço, como transporte público.",
    sinonimos: ["preço", "taxa", "valor"]
  },
  sptrans: {
    significado: "Empresa responsável por gerenciar o transporte público municipal de São Paulo.",
    sinonimos: ["transporte municipal", "gestão do transporte"]
  },
  cadúnico: {
    significado: "Cadastro Único, registro usado pelo governo para identificar famílias de baixa renda.",
    sinonimos: ["Cadastro Único", "cadastro social"]
  },
  cadunico: {
    significado: "Cadastro Único, registro usado pelo governo para identificar famílias de baixa renda.",
    sinonimos: ["Cadastro Único", "cadastro social"]
  },
  documentos: {
    significado: "Arquivos ou comprovantes acadêmicos emitidos ou solicitados pela faculdade.",
    sinonimos: ["comprovantes", "declarações", "registros"]
  },
  documento: {
    significado: "Arquivo ou comprovante acadêmico emitido ou solicitado pela faculdade.",
    sinonimos: ["comprovante", "declaração", "registro"]
  },
  declaração: {
    significado: "Documento que comprova uma informação, como matrícula ou vínculo acadêmico.",
    sinonimos: ["comprovante", "atestado", "certidão"]
  },
  histórico: {
    significado: "Documento com disciplinas, notas e informações da trajetória acadêmica.",
    sinonimos: ["registro acadêmico", "boletim", "relatório"]
  },
  calendário: {
    significado: "Lista de datas importantes do semestre, como prazos, provas e rematrícula.",
    sinonimos: ["cronograma", "agenda", "programação"]
  },
  prazo: {
    significado: "Data limite para realizar uma solicitação ou entrega.",
    sinonimos: ["limite", "data final", "vencimento"]
  },
  secretaria: {
    significado: "Setor que atende solicitações acadêmicas e documentos dos alunos.",
    sinonimos: ["atendimento acadêmico", "setor acadêmico"]
  },
  coordenação: {
    significado: "Área responsável por orientar questões do curso e da vida acadêmica.",
    sinonimos: ["gestão do curso", "orientação acadêmica"]
  },
  rematrícula: {
    significado: "Renovação da matrícula para o próximo período letivo.",
    sinonimos: ["renovação", "reinscrição"]
  },
  deferido: {
    significado: "Pedido analisado e aprovado.",
    sinonimos: ["aprovado", "aceito", "autorizado"]
  },
  indeferido: {
    significado: "Pedido analisado e negado.",
    sinonimos: ["negado", "recusado", "não aprovado"]
  },
  ra: {
    significado: "Registro do Aluno. É o número de identificação acadêmica do estudante.",
    sinonimos: ["identificação do aluno", "número acadêmico"]
  }
};

function normalizarPalavraSinonimo(palavra) {
  return palavra
    .toLowerCase()
    .replace(/[.,;:!?()[\]{}"“”'’]/g, "")
    .trim();
}

function alternarSinonimos(botao) {
  modoSinonimosAtivo = !modoSinonimosAtivo;
  document.body.classList.toggle("modo-sinonimos", modoSinonimosAtivo);

  if (botao) {
    botao.setAttribute("aria-pressed", modoSinonimosAtivo ? "true" : "false");
  }

  if (modoSinonimosAtivo) {
    fecharPersonalizacao();
    mostrarPainelSinonimos(
      "Clique em uma palavra",
      "Clique em uma frase ou palavra do chat para ver uma explicação simples.",
      ["matrícula", "prazo", "Bilhete Único", "secretaria"]
    );
  } else {
    fecharPainelSinonimos();
  }

  atualizarPalavrasClicaveis();
}

function mostrarPainelSinonimos(palavra, significado, sinonimos = []) {
  if (!painelSinonimos) return;

  painelSinonimos.hidden = false;

  if (sinonimoPalavra) sinonimoPalavra.innerText = palavra;
  if (sinonimoDescricao) sinonimoDescricao.innerText = significado;

  if (sinonimoLista) {
    sinonimoLista.innerHTML = "";
    sinonimos.forEach((sinonimo) => {
      const item = document.createElement("span");
      item.innerText = sinonimo;
      sinonimoLista.appendChild(item);
    });
  }
}

function fecharPainelSinonimos() {
  if (painelSinonimos) {
    painelSinonimos.hidden = true;
  }
}

function consultarSinonimo(palavraOriginal) {
  const chave = normalizarPalavraSinonimo(palavraOriginal);
  const entrada = dicionarioAcademico[chave] || {
    significado:
      "Ainda não tenho esse termo no glossário acadêmico. Tente clicar em palavras como matrícula, prazo, documento, bilhete ou calendário.",
    sinonimos: ["termo acadêmico", "palavra do atendimento"]
  };

  mostrarPainelSinonimos(palavraOriginal, entrada.significado, entrada.sinonimos);
}

function criarPalavraClicavel(texto) {
  const fragmento = document.createDocumentFragment();
  const partes = texto.split(/(\s+)/);

  partes.forEach((parte) => {
    if (!parte.trim()) {
      fragmento.appendChild(document.createTextNode(parte));
      return;
    }

    const palavraLimpa = normalizarPalavraSinonimo(parte);

    if (palavraLimpa.length < 3) {
      fragmento.appendChild(document.createTextNode(parte));
      return;
    }

    const botao = document.createElement("button");
    botao.type = "button";
    botao.className = "palavra-sinonimo";
    botao.innerText = parte;
    botao.dataset.palavra = parte;
    botao.setAttribute("aria-label", `Ver significado de ${parte}`);
    botao.addEventListener("click", function (event) {
      event.stopPropagation();
      consultarSinonimo(parte);
    });

    fragmento.appendChild(botao);
  });

  return fragmento;
}

function tornarTextoClicavel(elemento) {
  if (!elemento || elemento.dataset.sinonimosPreparado === "true") return;

  const walker = document.createTreeWalker(
    elemento,
    NodeFilter.SHOW_TEXT,
    {
      acceptNode(node) {
        if (!node.nodeValue.trim()) return NodeFilter.FILTER_REJECT;
        if (node.parentElement?.closest("button, a, .horario, .check")) {
          return NodeFilter.FILTER_REJECT;
        }
        return NodeFilter.FILTER_ACCEPT;
      }
    }
  );

  const textos = [];

  while (walker.nextNode()) {
    textos.push(walker.currentNode);
  }

  textos.forEach((node) => {
    node.parentNode.replaceChild(criarPalavraClicavel(node.nodeValue), node);
  });

  elemento.dataset.sinonimosPreparado = "true";
}

function atualizarPalavrasClicaveis() {
  if (!modoSinonimosAtivo) return;

  document
    .querySelectorAll(".balao-eva, .balao-aluno")
    .forEach(tornarTextoClicavel);
}

const classesDaltonismo = [
  "modo-daltonico",
  "daltonismo-deuteranopia",
  "daltonismo-protanopia",
  "daltonismo-tritanopia",
  "daltonismo-acromatopsia"
];

function abrirOpcoesDaltonismo(botao) {
  botaoDaltonismoAtual = botao || botaoDaltonismoAtual;

  if (painelDaltonismo) {
    painelDaltonismo.hidden = false;
  }

  fecharPersonalizacao();
  atualizarBotaoDaltonismo();
}

function fecharOpcoesDaltonismo() {
  if (painelDaltonismo) {
    painelDaltonismo.hidden = true;
  }
}

function aplicarDaltonismo(tipo) {
  classesDaltonismo.forEach((classe) => document.body.classList.remove(classe));

  const classe = `daltonismo-${tipo}`;
  document.body.classList.add("modo-daltonico", classe);
  document.body.dataset.daltonismo = tipo;
  localStorage.setItem("daltonismoEva", tipo);

  atualizarBotaoDaltonismo();
  atualizarOpcoesDaltonismo();
  fecharOpcoesDaltonismo();
  salvarHistorico();
}

function removerDaltonismo() {
  classesDaltonismo.forEach((classe) => document.body.classList.remove(classe));
  delete document.body.dataset.daltonismo;
  localStorage.removeItem("daltonismoEva");

  atualizarBotaoDaltonismo();
  atualizarOpcoesDaltonismo();
  fecharOpcoesDaltonismo();
  salvarHistorico();
}

function atualizarBotaoDaltonismo() {
  const ativo = document.body.classList.contains("modo-daltonico");
  const botao = botaoDaltonismoAtual || document.querySelector("[onclick^='abrirOpcoesDaltonismo']");

  if (botao) {
    botao.setAttribute("aria-pressed", ativo ? "true" : "false");
    const detalhe = botao.querySelector("small");

    if (detalhe) {
      const tipo = document.body.dataset.daltonismo;
      const nomes = {
        deuteranopia: "Deuteranopia ativa",
        protanopia: "Protanopia ativa",
        tritanopia: "Tritanopia ativa",
        acromatopsia: "Acromatopsia ativa"
      };
      detalhe.innerText = ativo ? nomes[tipo] || "Perfil ativo" : "Escolher perfil de cores";
    }
  }
}

function atualizarOpcoesDaltonismo() {
  if (!painelDaltonismo) return;

  const tipoAtual = document.body.dataset.daltonismo;

  painelDaltonismo.querySelectorAll(".opcoes-daltonismo button").forEach((botao) => {
    const onclick = botao.getAttribute("onclick") || "";
    botao.classList.toggle("ativo", onclick.includes(`'${tipoAtual}'`));
  });
}

function abrirVLibras() {
  const botaoVLibras = document.querySelector("[vw-access-button]");

  if (botaoVLibras) {
    botaoVLibras.click();
    return;
  }

  adicionarMensagemEva(
    "O VLibras está disponível pelo botão azul de acessibilidade na lateral da tela."
  );
}

function restaurarAcessibilidade() {
  const classesAcessibilidade = [
    "texto-destaque",
    "espaco-linhas",
    "espaco-letras",
    "modo-leitura",
    "mascara-leitura",
    "destacar-links",
    "pausar-animacoes",
    "intensidade-cores",
    "modo-daltonico",
    "daltonismo-deuteranopia",
    "daltonismo-protanopia",
    "daltonismo-tritanopia",
    "daltonismo-acromatopsia",
    "alto-contraste",
    "modo-sinonimos"
  ];

  classesAcessibilidade.forEach((classe) => document.body.classList.remove(classe));

  tamanhoFonte = 1;
  aplicarFonte();

  modalPersonalizacao
    ?.querySelectorAll(".acessibilidade-opcao[aria-pressed]")
    .forEach((botao) => botao.setAttribute("aria-pressed", "false"));

  modoSinonimosAtivo = false;
  fecharPainelSinonimos();
  delete document.body.dataset.daltonismo;
  localStorage.removeItem("daltonismoEva");
  atualizarBotaoDaltonismo();
  atualizarOpcoesDaltonismo();
  fecharOpcoesDaltonismo();
  salvarHistorico();
}

function alternarAudio() {
  audioAtivo = !audioAtivo;

  const btnAudio = document.getElementById("btn-audio");

  if (audioAtivo) {
    if (btnAudio) {
      btnAudio.setAttribute("aria-pressed", "true");
      const texto = btnAudio.querySelector("strong");
      if (texto) texto.innerText = txt("readAloudActive");
    }
  } else {
    if ("speechSynthesis" in window) {
      speechSynthesis.cancel();
    }

    filaAudio = [];
    audioFalando = false;

    if (btnAudio) {
      btnAudio.setAttribute("aria-pressed", "false");
      const texto = btnAudio.querySelector("strong");
      if (texto) texto.innerText = txt("enableReadAloud");
    }
  }

  salvarHistorico();
}

/* ÁUDIO */

function limparHTML(texto) {
  const div = document.createElement("div");
  div.innerHTML = texto;
  return div.innerText;
}

function carregarVozesSintese() {
  if (!("speechSynthesis" in window)) return;

  vozesDisponiveis = speechSynthesis.getVoices();
}

function escolherVozAssistente() {
  if (!vozesDisponiveis.length) {
    carregarVozesSintese();
  }

  const idiomaBase = idiomaAtual.toLowerCase().split("-")[0];
  const vozesDoIdioma = vozesDisponiveis.filter((voz) =>
    voz.lang && voz.lang.toLowerCase().startsWith(idiomaBase)
  );

  const vozes = vozesDoIdioma.length ? vozesDoIdioma : vozesDisponiveis;

  const nomesFemininos = [
    "maria",
    "heloisa",
    "helena",
    "luciana",
    "francisca",
    "fernanda",
    "female",
    "mulher"
  ];

  const nomesMasculinos = [
    "daniel",
    "felipe",
    "ricardo",
    "antonio",
    "antônio",
    "male",
    "homem"
  ];

  const preferidos = assistenteAtual.id === "elias" ? nomesMasculinos : nomesFemininos;

  const vozPreferida = vozes.find((voz) => {
    const nome = voz.name.toLowerCase();
    return preferidos.some((preferido) => nome.includes(preferido));
  });

  return vozPreferida || vozes[0] || null;
}

if ("speechSynthesis" in window) {
  carregarVozesSintese();

  if (typeof speechSynthesis.addEventListener === "function") {
    speechSynthesis.addEventListener("voiceschanged", carregarVozesSintese);
  } else {
    speechSynthesis.onvoiceschanged = carregarVozesSintese;
  }
}

function lerTexto(texto) {
  if (!audioAtivo) return;
  if (!("speechSynthesis" in window)) return;

  const textoLimpo = limparHTML(texto);
  filaAudio.push(textoLimpo);

  if (!audioFalando) {
    tocarProximoAudio();
  }
}

function tocarProximoAudio() {
  if (filaAudio.length === 0) {
    audioFalando = false;
    return;
  }

  audioFalando = true;

  const textoAtual = filaAudio.shift();
  const fala = new SpeechSynthesisUtterance(textoAtual);
  const vozAssistente = escolherVozAssistente();

  fala.lang = idiomaAtual;
  fala.rate = assistenteAtual.id === "elias" ? 0.92 : 0.96;
  fala.pitch = assistenteAtual.id === "elias" ? 0.86 : 1.16;

  if (vozAssistente) {
    fala.voice = vozAssistente;
    fala.lang = vozAssistente.lang || idiomaAtual;
  }

  fala.onend = function () {
    tocarProximoAudio();
  };

  fala.onerror = function () {
    tocarProximoAudio();
  };

  speechSynthesis.speak(fala);
}

/* MICROFONE */

function ouvirUsuario() {
  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;

  if (!SpeechRecognition) {
    adicionarMensagemEva(
      "Seu navegador não permite comando por voz neste momento. Você ainda pode digitar sua mensagem normalmente."
    );
    return;
  }

  const reconhecimento = new SpeechRecognition();

  reconhecimento.lang = idiomaAtual;
  reconhecimento.continuous = false;
  reconhecimento.interimResults = false;

  if (statusAssistente) {
    statusAssistente.innerText = txt("listening");
  }

  reconhecimento.start();

  reconhecimento.onresult = function (event) {
    const textoFalado = event.results[0][0].transcript;
    input.value = textoFalado;
    definirEstadoAssistente("pronto");
    enviar();
  };

  reconhecimento.onerror = function () {
    definirEstadoAssistente("pronto");
    adicionarMensagemEva(
      "Não consegui ouvir sua mensagem. Tente novamente ou digite no campo de texto."
    );
  };

  reconhecimento.onend = function () {
    definirEstadoAssistente("pronto");
  };
}

/* HISTÓRICO */

async function salvarHistorico() {
  const dadosHistorico = {
    usuarioId: usuarioEva.id,
    historico: chatBox.innerHTML,
    etapa: etapa,
    fonte: tamanhoFonte,
    audioAtivo: audioAtivo,
    contrasteAtivo: document.body.classList.contains("alto-contraste"),
    preferencias: preferenciasEva,
    atualizadoEm: new Date().toISOString()
  };

  localStorage.setItem("historicoEva", dadosHistorico.historico);
  localStorage.setItem("etapaEva", dadosHistorico.etapa);
  localStorage.setItem("fonteEva", dadosHistorico.fonte);
  localStorage.setItem("audioEva", dadosHistorico.audioAtivo);
  localStorage.setItem("contrasteEva", dadosHistorico.contrasteAtivo);
  localStorage.setItem("preferenciasEva", JSON.stringify(preferenciasEva));

  // Atualiza lista de conversas em localStorage (modo offline)
  try {
    createOrUpdateConversation({
      usuarioId: dadosHistorico.usuarioId,
      historico: dadosHistorico.historico,
      etapa: dadosHistorico.etapa,
      atualizadoEm: dadosHistorico.atualizadoEm
    });
  } catch (e) {
    console.warn("Erro ao atualizar lista de conversas local", e);
  }

  try {
    await fetch(`${API_BASE_URL}/conversas/salvar`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(dadosHistorico)
    });
  } catch (erro) {
    console.warn("Back-end indisponível. Histórico salvo localmente.", erro);
  }
}

async function carregarHistorico() {
  let dadosBack = null;

  try {
    const controleHistorico = new AbortController();
    const limiteHistorico = setTimeout(() => controleHistorico.abort(), 900);

    const resposta = await fetch(`${API_BASE_URL}/conversas/${usuarioEva.id}`, {
      signal: controleHistorico.signal
    });

    clearTimeout(limiteHistorico);

    if (resposta.ok) {
      dadosBack = await resposta.json();
    }
  } catch (erro) {
    console.warn("Não foi possível carregar histórico do back-end.", erro);
  }

  // Se existem conversas armazenadas localmente, permitir escolher
  const convList = loadConversationList();
  if (convList && convList.length > 1) {
    abrirModalConversas();
    return;
  }

  if (convList && convList.length === 1) {
    const único = convList[0];
    localStorage.setItem("historicoEva", único.historico || "");
    localStorage.setItem("etapaEva", único.etapa || "inicio");
    currentConversationId = único.id;
    localStorage.setItem("conversationIdEva", currentConversationId);
  }

  const historicoSalvo =
    dadosBack?.historico || localStorage.getItem("historicoEva");

  const etapaSalva =
    dadosBack?.etapa || localStorage.getItem("etapaEva");

  const fonteSalva =
    dadosBack?.fonte || localStorage.getItem("fonteEva");

  const audioSalvo =
    dadosBack?.audioAtivo ?? localStorage.getItem("audioEva");

  const contrasteSalvo =
    dadosBack?.contrasteAtivo ?? localStorage.getItem("contrasteEva");

  const preferenciasSalvas =
    dadosBack?.preferencias || localStorage.getItem("preferenciasEva");

  if (fonteSalva) {
    tamanhoFonte = Number(fonteSalva);
    document.documentElement.style.setProperty("--escala-fonte", tamanhoFonte);
  }

  if (contrasteSalvo === true || contrasteSalvo === "true") {
    document.body.classList.add("alto-contraste");
  }

  const daltonismoSalvo = localStorage.getItem("daltonismoEva");

  if (daltonismoSalvo) {
    aplicarDaltonismo(daltonismoSalvo);
  }

  if (preferenciasSalvas) {
    try {
      preferenciasEva = {
        ...preferenciasEva,
        ...(typeof preferenciasSalvas === "string"
          ? JSON.parse(preferenciasSalvas)
          : preferenciasSalvas)
      };
      aplicarPreferenciasEva();
    } catch (erro) {
      console.warn("Não foi possível aplicar preferências salvas.", erro);
    }
  }

  const btnContraste = document.getElementById("btn-contraste");

  if (btnContraste) {
    btnContraste.setAttribute(
      "aria-pressed",
      document.body.classList.contains("alto-contraste")
    );
  }

  audioAtivo = audioSalvo === true || audioSalvo === "true";

  const btnAudio = document.getElementById("btn-audio");

  if (btnAudio) {
    btnAudio.setAttribute("aria-pressed", audioAtivo);
    const texto = btnAudio.querySelector("strong");
    if (texto) {
      texto.innerText = audioAtivo
        ? txt("readAloudActive")
        : txt("enableReadAloud");
    }
  }

  if (historicoSalvo && historicoSalvo.trim() !== "") {
    chatBox.innerHTML = historicoSalvo;
    etapa = etapaSalva || "inicio";
    rolarChatParaBaixo();
  } else {
    mensagemInicial();
  }
}

/* INICIALIZAÇÃO */

window.addEventListener("load", function () {
  carregarPreferenciasEva();
  aplicarAssistente();
  aplicarIdioma();
  atualizarEstadoEnvio();
  carregarHistorico();
});

/* MENSAGEM INICIAL */

function mensagemInicial() {
  if (assistenteAtual.id === "dani") {
    const nomeProfessor = professorAtual?.nome || "Professor";
    adicionarMensagemEva(
      txt("initialDani").replace("{nome}", nomeProfessor)
    );
    return;
  }

  if (assistenteAtual.id === "elias") {
    adicionarMensagemEva(
      txt("initialElias")
    );
    return;
  }

  adicionarMensagemEva(
    idiomaAtual === "pt-BR"
      ? textoTom("saudacao")
      : txt("initialEva").replace("{assistente}", assistenteAtual.nome)
  );
}

/* HORÁRIO */

function pegarHorario() {
  const agora = new Date();

  return agora.toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit"
  });
}

/* MENSAGENS */

function rolarChatParaBaixo() {
  requestAnimationFrame(() => {
    chatBox.scrollTop = chatBox.scrollHeight;
  });
}

function adicionarMensagemEva(texto) {
  removerDigitando();
  const textoFinal = traduzirMensagemAssistente(texto);

  const linha = document.createElement("div");
  linha.classList.add("linha-eva");

  const avatar = document.createElement("img");
  avatar.src = assistenteAtual.chat;
  avatar.alt = assistenteAtual.nome;
  avatar.classList.add("avatar-chat");

  const conteudo = document.createElement("div");

  const balao = document.createElement("div");
  balao.classList.add("balao-eva");
  balao.dataset.assistente = assistenteAtual.nome;
  balao.innerHTML = textoFinal;

  const horario = document.createElement("div");
  horario.classList.add("horario");
  horario.innerText = pegarHorario();

  conteudo.appendChild(balao);
  conteudo.appendChild(horario);

  linha.appendChild(avatar);
  linha.appendChild(conteudo);

  chatBox.appendChild(linha);
  definirEstadoAssistente("pronto");
  atualizarPalavrasClicaveis();
  rolarChatParaBaixo();

  lerTexto(textoFinal);
  salvarHistorico();
}

function adicionarMensagemAluno(texto) {
  const linha = document.createElement("div");
  linha.classList.add("linha-aluno");

  const balao = document.createElement("div");
  balao.classList.add("balao-aluno");

  const textoMensagem = document.createElement("span");
  textoMensagem.innerText = texto;

  const check = document.createElement("span");
  check.classList.add("check");
  check.innerText = "✔✔";

  balao.appendChild(textoMensagem);
  balao.appendChild(check);

  linha.appendChild(balao);
  chatBox.appendChild(linha);

  atualizarPalavrasClicaveis();
  rolarChatParaBaixo();
  salvarHistorico();
}

/* ENVIO */

function enviar() {
  const texto = input.value.trim();

  if (texto === "") return;

  adicionarMensagemAluno(texto);
  input.value = "";
  atualizarEstadoEnvio();
  reiniciarTimerInatividade();

  responderEva(texto);
}

function respostaRapida(texto, textoExibido = texto) {
  adicionarMensagemAluno(textoExibido);
  reiniciarTimerInatividade();
  responderEva(texto);
}

if (input) {
  input.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      event.preventDefault();
      enviar();
    }
  });

  input.addEventListener("input", function () {
    atualizarEstadoEnvio();
    reiniciarTimerInatividade();
  });

  input.addEventListener("focus", function () {
    document.body.classList.add("teclado-aberto");
    ajustarAlturaMobile();

    setTimeout(rolarChatParaBaixo, 250);
  });

  input.addEventListener("blur", function () {
    setTimeout(() => {
      ajustarAlturaMobile();

      if (
        !window.visualViewport ||
        window.innerHeight - window.visualViewport.height <= 120
      ) {
        document.body.classList.remove("teclado-aberto");
        document.body.style.transform = "";
      }
    }, 150);
  });
}

if (chatBox) {
  chatBox.addEventListener("click", function (event) {
    const palavra = event.target.closest(".palavra-sinonimo");

    if (!palavra) return;

    event.stopPropagation();
    consultarSinonimo(palavra.dataset.palavra || palavra.innerText);
  });
}

/* DIGITANDO */

function mostrarDigitando() {
  removerDigitando();

  const linha = document.createElement("div");
  linha.classList.add("linha-eva");
  linha.id = "digitando";

  const avatar = document.createElement("img");
  avatar.src = assistenteAtual.chat;
  avatar.alt = assistenteAtual.nome;
  avatar.classList.add("avatar-chat");

  const conteudo = document.createElement("div");

  const balao = document.createElement("div");
  balao.classList.add("balao-eva", "digitando");
  balao.dataset.assistente = assistenteAtual.nome;
  balao.innerHTML = `${assistenteAtual.nome} ${txt("typingBubble")}<span class="pontos"></span>`;

  conteudo.appendChild(balao);

  linha.appendChild(avatar);
  linha.appendChild(conteudo);

  chatBox.appendChild(linha);
  definirEstadoAssistente("digitando");
  const btnCancelar = document.getElementById("btn-cancelar");
  if (btnCancelar) btnCancelar.style.display = "grid";
  rolarChatParaBaixo();
}

function removerDigitando() {
  const digitando = document.getElementById("digitando");

  if (digitando) {
    digitando.remove();
  }
  definirEstadoAssistente("pronto");
  const btnCancelar = document.getElementById("btn-cancelar");
  if (btnCancelar) btnCancelar.style.display = "none";
}

function cancelarResposta() {
  invalidarRespostaAtual();
  limparFluxoAtual();

  // Para leitura em voz
  if ("speechSynthesis" in window) {
    speechSynthesis.cancel();
  }

  removerDigitando();
  etapa = "interrompido";
  salvarHistorico();
}

function enviarMensagensEva(listaMensagens, tempo = 1800, idResposta = respostaAtualId) {
  listaMensagens.forEach((mensagem, index) => {
    const timeout1 = setTimeout(() => {
      if (!respostaEstaAtiva(idResposta)) return;
      mostrarDigitando();

      const timeout2 = setTimeout(() => {
        if (!respostaEstaAtiva(idResposta)) return;
        adicionarMensagemEva(mensagem);
      }, 1000);

      timeoutsEva.push(timeout2);
    }, tempo * index);

    timeoutsEva.push(timeout1);
  });
}

function respostaNaoEntendi() {
  adicionarMensagemEva(idiomaAtual === "pt-BR" ? textoTom("naoEntendi") : txt("fallback"));
}

function normalizarBusca(texto) {
  return texto
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

function contemAlgum(texto, termos) {
  const textoNormalizado = normalizarBusca(texto);
  return termos.some((termo) => textoNormalizado.includes(normalizarBusca(termo)));
}

function querBilheteUnico(texto) {
  return (
    contemAlgum(texto, [
      "bilhete",
      "ônibus",
      "onibus",
      "sptrans",
      "passe",
      "meia",
      "transport card",
      "student pass",
      "bus pass",
      "fare",
      "tarjeta",
      "transporte"
    ])
  );
}

function querCadunico(texto) {
  return contemAlgum(texto, [
    "cadunico",
    "cadúnico",
    "cadastro unico",
    "cadastro único",
    "gratuidade",
    "gratuito",
    "passe livre",
    "free fare"
  ]);
}

function querCalendario(texto) {
  return contemAlgum(texto, ["calendário", "calendario", "calendar", "calendario académico"]);
}

function querDocumentos(texto) {
  return (
    contemAlgum(texto, [
      "documentos",
      "documento",
      "declaração",
      "declaracao",
      "histórico",
      "historico",
      "documents",
      "document",
      "transcript",
      "certificate",
      "declaration"
    ])
  );
}

function querTrancamento(texto) {
  return contemAlgum(texto, [
    "trancar",
    "trancamento",
    "suspender matrícula",
    "suspend enrollment",
    "enrollment suspension",
    "cancel enrollment",
    "suspender mi matrícula"
  ]);
}

function querTriagem(texto) {
  return (
    contemAlgum(texto, [
      "não sei",
      "nao sei",
      "onde resolver",
      "outros serviços",
      "outros servicos",
      "i do not know",
      "i don't know",
      "where to solve",
      "other services",
      "no se",
      "otros servicios"
    ])
  );
}

function querTrocaHorario(texto) {
  return contemAlgum(texto, [
    "trocar de horario",
    "troca de horario",
    "mudar horario",
    "mudar de horario",
    "horario",
    "turno"
  ]);
}

function querTrocaCurso(texto) {
  return contemAlgum(texto, [
    "trocar de curso",
    "troca de curso",
    "mudar de curso",
    "transferencia interna",
    "transferência interna",
    "outro curso"
  ]);
}

function confirmouTrancamento(texto) {
  return contemAlgum(texto, [
    "sim",
    "tenho certeza",
    "confirmo",
    "quero trancar",
    "seguir com trancamento",
    "continuar com trancamento",
    "pode trancar"
  ]);
}

function negouOuQuerAlternativa(texto) {
  return contemAlgum(texto, [
    "nao",
    "não",
    "alternativa",
    "outras possibilidades",
    "ver possibilidades",
    "quero ver",
    "opcoes",
    "opções"
  ]);
}

function conheceCoordenador(texto) {
  return contemAlgum(texto, ["sim", "sei", "conheco", "conheço"]);
}

function desconheceCoordenador(texto) {
  return contemAlgum(texto, ["nao", "não", "nao sei", "não sei", "desconheco", "desconheço"]);
}

function cursoInformado(texto) {
  if (contemAlgum(texto, ["desenvolvimento de software", "multiplataforma", "dsm"])) return "dsm";
  if (contemAlgum(texto, ["analise e desenvolvimento de sistemas", "análise e desenvolvimento de sistemas", "ads"])) return "ads";
  if (contemAlgum(texto, ["logistica", "logística"])) return "logistica";
  if (contemAlgum(texto, ["gestao empresarial", "gestão empresarial"])) return "gestao";
  return null;
}

function cardsCursosHorario() {
  const dsm = textoIdioma(
    "Desenvolvimento de Software Multiplataforma",
    "Multiplatform Software Development",
    "Desarrollo de Software Multiplataforma"
  );
  const ads = textoIdioma(
    "Análise e Desenvolvimento de Sistemas",
    "Systems Analysis and Development",
    "Análisis y Desarrollo de Sistemas"
  );
  const logistica = textoIdioma("Logística", "Logistics", "Logística");
  const gestao = textoIdioma("Gestão Empresarial", "Business Management", "Gestión Empresarial");

  return `
    <div class="opcoes-chat">
      <button type="button" onclick="respostaRapida('curso_dsm', '${dsm}')">${dsm}</button>
      <button type="button" onclick="respostaRapida('curso_ads', '${ads}')">${ads}</button>
      <button type="button" onclick="respostaRapida('curso_logistica', '${logistica}')">${logistica}</button>
      <button type="button" onclick="respostaRapida('curso_gestao', '${gestao}')">${gestao}</button>
    </div>
  `;
}

function cardsOpcoesTrancamento() {
  const horario = textoIdioma("Trocar de horário", "Change schedule", "Cambiar horario");
  const curso = textoIdioma("Trocar de curso", "Change program", "Cambiar de carrera");
  const seguir = textoIdioma("Seguir com trancamento", "Continue with enrollment suspension", "Seguir con la suspensión de matrícula");

  return `
    <div class="opcoes-chat">
      <button type="button" onclick="respostaRapida('trocar de horario', '${horario}')">${horario}</button>
      <button type="button" onclick="respostaRapida('trocar de curso', '${curso}')">${curso}</button>
      <button type="button" onclick="respostaRapida('seguir com trancamento', '${seguir}')">${seguir}</button>
    </div>
  `;
}

function cardsSimNaoCoordenador() {
  const sim = textoIdioma("Sim", "Yes", "Sí");
  const nao = textoIdioma("Não", "No", "No");

  return `
    <div class="opcoes-chat opcoes-chat-compactas">
      <button type="button" onclick="respostaRapida('sim', '${sim}')">${sim}</button>
      <button type="button" onclick="respostaRapida('nao', '${nao}')">${nao}</button>
    </div>
  `;
}

function cardsPosAlternativa() {
  const seguir = textoIdioma("Seguir com trancamento", "Continue with enrollment suspension", "Seguir con la suspensión de matrícula");
  const tentar = textoIdioma("Tentar alternativa primeiro", "Try the alternative first", "Intentar la alternativa primero");

  return `
    <div class="opcoes-chat">
      <button type="button" onclick="respostaRapida('seguir com trancamento', '${seguir}')">${seguir}</button>
      <button type="button" onclick="respostaRapida('tentar alternativa', '${tentar}')">${tentar}</button>
    </div>
  `;
}

function cardsConfirmacaoTrancamento() {
  const certeza = textoIdioma("Tenho certeza", "I am sure", "Estoy seguro/a");
  const cancelar = textoIdioma("Não quero trancar", "I do not want to suspend", "No quiero suspender la matrícula");

  return `
    <div class="opcoes-chat">
      <button type="button" onclick="respostaRapida('tenho certeza', '${certeza}')">${certeza}</button>
      <button type="button" onclick="respostaRapida('nao quero trancar', '${cancelar}')">${cancelar}</button>
    </div>
  `;
}

function responderCoordenadorCurso(curso) {
  if (curso === "dsm") {
    enviarMensagensEva([
      textoIdioma(
        'O professor coordenador de Desenvolvimento de Software Multiplataforma é o <strong>Edson Ceroni</strong>.',
        'The coordinator for Multiplatform Software Development is <strong>Edson Ceroni</strong>.',
        'El coordinador de Desarrollo de Software Multiplataforma es <strong>Edson Ceroni</strong>.'
      ),
      textoIdioma(
        'Entre em contato via Teams ou envie um e-mail para <strong>edson.ceroni@cps.com</strong> com o assunto <strong>Solicitação troca de horário</strong>.',
        'Contact him through Teams or email <strong>edson.ceroni@cps.com</strong> with the subject <strong>Schedule change request</strong>.',
        'Comunícate por Teams o envía un correo a <strong>edson.ceroni@cps.com</strong> con el asunto <strong>Solicitud de cambio de horario</strong>.'
      ),
      `${textoIdioma(
        'Depois de verificar essa possibilidade, você ainda quer seguir com o trancamento ou prefere tentar essa alternativa primeiro?',
        'After checking that option, do you still want to continue with enrollment suspension or try this alternative first?',
        'Después de revisar esa posibilidad, ¿todavía quieres seguir con la suspensión de matrícula o prefieres intentar esta alternativa primero?'
      )}${cardsPosAlternativa()}`
    ]);
    etapa = "trancamento_pos_alternativa";
    return;
  }

  enviarMensagensEva([
    textoIdioma(
      "Para esse curso, recomendo confirmar o coordenador diretamente com a secretaria acadêmica ou no canal oficial da coordenação.",
      "For this program, I recommend confirming the coordinator directly with the academic office or the official coordination channel.",
      "Para este curso, recomiendo confirmar el coordinador directamente con la secretaría académica o el canal oficial de coordinación."
    ),
    textoIdioma(
      "Ao entrar em contato, informe seu nome completo, RA, curso, turma atual e o horário desejado.",
      "When contacting them, include your full name, student ID, program, current class/group and desired schedule.",
      "Al comunicarte, informa tu nombre completo, matrícula, curso, grupo actual y el horario deseado."
    ),
    `${textoIdioma(
      "Depois de verificar essa possibilidade, você ainda quer seguir com o trancamento ou prefere tentar essa alternativa primeiro?",
      "After checking that option, do you still want to continue with enrollment suspension or try this alternative first?",
      "Después de revisar esa posibilidad, ¿todavía quieres seguir con la suspensión de matrícula o prefieres intentar esta alternativa primero?"
    )}${cardsPosAlternativa()}`
  ]);
  etapa = "trancamento_pos_alternativa";
}

function explicarTrocaCurso() {
  enviarMensagensEva([
    textoIdioma(
      'A Fatec não costuma fazer uma "troca automática" de curso. Geralmente existem duas possibilidades:<br><br>1. Transferência interna, quando há edital e vagas remanescentes.<br>2. Prestar o vestibular novamente para o curso desejado.',
      'Fatec usually does not provide an "automatic program change." There are usually two possibilities:<br><br>1. Internal transfer, when there is a notice and remaining seats.<br>2. Taking the entrance exam again for the desired program.',
      'Fatec normalmente no realiza un "cambio automático" de carrera. Generalmente existen dos posibilidades:<br><br>1. Transferencia interna, cuando hay convocatoria y vacantes remanentes.<br>2. Presentar nuevamente el vestibular/proceso selectivo para la carrera deseada.'
    ),
    textoIdioma(
      "A segunda opção costuma ser a mais garantida, pois pode não haver vagas disponíveis, principalmente se for um curso concorrido como ADS.",
      "The second option is usually more reliable because seats may not be available, especially in a competitive program like ADS.",
      "La segunda opción suele ser la más garantizada, porque puede que no haya vacantes disponibles, especialmente en una carrera concurrida como ADS."
    ),
    textoIdioma(
      "Mesmo se sua escolha for entre cursos da mesma área, por exemplo, de ADS para DSM ou de DSM para ADS, a grade não é a mesma. Algumas matérias provavelmente seriam aproveitadas, mas outras podem não ter equivalência exata, o que pode fazer você precisar cursar disciplinas extras ou voltar alguns semestres na grade.",
      "Even when switching between programs in the same area, such as ADS to DSM or DSM to ADS, the curriculum is not identical. Some subjects may be accepted, but others may not have exact equivalence, which can require extra subjects or even moving back a few semesters.",
      "Aunque el cambio sea entre carreras de la misma área, por ejemplo de ADS a DSM o de DSM a ADS, la malla curricular no es la misma. Algunas materias probablemente podrían aprovecharse, pero otras pueden no tener equivalencia exacta, lo que puede hacer que curses materias extra o regreses algunos semestres."
    ),
    textoIdioma(
      "Entre em contato com a secretaria para verificar a possibilidade da troca de curso.",
      "Contact the academic office to check whether a program change is possible.",
      "Comunícate con la secretaría para verificar la posibilidad del cambio de carrera."
    ),
    `${textoIdioma(
      "Depois de verificar essa possibilidade, você ainda quer seguir com o trancamento ou prefere tentar essa alternativa primeiro?",
      "After checking that option, do you still want to continue with enrollment suspension or try this alternative first?",
      "Después de revisar esa posibilidad, ¿todavía quieres seguir con la suspensión de matrícula o prefieres intentar esta alternativa primero?"
    )}${cardsPosAlternativa()}`
  ]);
  etapa = "trancamento_pos_alternativa";
}

function trocarParaBilheteUnico() {
  removerDigitando();

  enviarMensagensEva(mensagemPorFormato({
    passo: [
      textoTom("mudancaBilhete"),
      "Você quer orientação sobre meia-tarifa estudantil ou gratuidade/passe livre?"
    ],
    curta: [
      textoTom("mudancaBilhete"),
      "Meia-tarifa ou gratuidade?"
    ],
    simples: [
      textoTom("mudancaBilhete"),
      "Você quer pagar meia passagem ou tentar o passe livre gratuito?"
    ]
  }));

  etapa = "bilhete";
}

function normalizarTextoDani(texto) {
  return (texto || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

function obterBancoProfessorAtual() {
  if (!professorAtual?.matricula) return null;
  return bancoDemoDani.professores[professorAtual.matricula] || null;
}

function obterTurmasProfessorAtual() {
  return obterBancoProfessorAtual()?.disciplinas || [];
}

function detectarTurmasDani(texto) {
  const textoNormalizado = normalizarTextoDani(texto);
  const turmas = obterTurmasProfessorAtual();

  const encontradas = turmas.filter((turma) => {
    const disciplina = normalizarTextoDani(turma.disciplina);
    const curso = normalizarTextoDani(turma.curso);
    const semestreNumero = (turma.semestre.match(/\d+/) || [""])[0];
    const mencionaDisciplina = disciplina
      .split(" ")
      .filter((parte) => parte.length > 2)
      .some((parte) => textoNormalizado.includes(parte));
    const mencionaCurso = curso && textoNormalizado.includes(curso.toLowerCase());
    const mencionaSemestre = semestreNumero && textoNormalizado.includes(semestreNumero);

    return mencionaDisciplina || (mencionaCurso && mencionaSemestre);
  });

  return encontradas.length ? encontradas : turmas;
}

function encontrarAlunoDani(texto) {
  const textoNormalizado = normalizarTextoDani(texto);

  for (const turma of obterTurmasProfessorAtual()) {
    const aluno = turma.alunos.find((item) => {
      const nome = normalizarTextoDani(item.nome);
      return textoNormalizado.includes(item.ra.toLowerCase()) || nome
        .split(" ")
        .filter((parte) => parte.length > 2)
        .some((parte) => textoNormalizado.includes(parte));
    });

    if (aluno) {
      return { turma, aluno };
    }
  }

  return null;
}

function avaliarRiscoAluno(aluno) {
  const faltasRestantes = bancoDemoDani.limiteFaltas - aluno.ausencias;
  const riscoFalta = faltasRestantes <= 2;
  const riscoNota = aluno.media < 6;
  const riscoParticipacao = aluno.participacao === "baixa";
  const nivel =
    aluno.ausencias >= bancoDemoDani.limiteFaltas || (riscoFalta && riscoNota)
      ? "crítico"
      : riscoFalta || riscoNota || riscoParticipacao
        ? "atenção"
        : "regular";

  return {
    faltasRestantes,
    riscoFalta,
    riscoNota,
    riscoParticipacao,
    nivel
  };
}

function formatarAlunoDani(aluno, turma) {
  const risco = avaliarRiscoAluno(aluno);
  const avisar =
    risco.riscoFalta || risco.riscoNota
      ? `<br><button class="btn-alerta-demo" type="button" onclick="enviarAlertaAcademico('${aluno.ra}')">Enviar alerta automático para ${aluno.email}</button>`
      : "";

  return `<strong>${aluno.nome}</strong> (${aluno.ra})<br>${turma.disciplina} - ${turma.semestre} ${turma.curso}<br>Presenças: ${aluno.presencas} | Ausências: ${aluno.ausencias} | Média: ${aluno.media.toFixed(1)} | Participação: ${aluno.participacao}<br>Status: ${risco.nivel}. Faltam ${Math.max(risco.faltasRestantes, 0)} ausência(s) para DP por falta.${avisar}`;
}

function resumoTurmaDani(turma) {
  const mediaTurma = turma.alunos.reduce((total, aluno) => total + aluno.media, 0) / turma.alunos.length;
  const alunosRisco = turma.alunos.filter((aluno) => avaliarRiscoAluno(aluno).nivel !== "regular");
  const riscoCritico = alunosRisco.filter((aluno) => avaliarRiscoAluno(aluno).nivel === "crítico");
  const listaRisco = alunosRisco
    .map((aluno) => {
      const risco = avaliarRiscoAluno(aluno);
      return `${aluno.nome} (${aluno.ra}) - ${aluno.ausencias} ausências, média ${aluno.media.toFixed(1)}, ${risco.faltasRestantes <= 0 ? "já atingiu o limite de faltas" : `faltam ${risco.faltasRestantes} falta(s) para DP`}`;
    })
    .join("<br>");

  return `<strong>${turma.disciplina} - ${turma.semestre} ${turma.curso}</strong><br>Alunos: ${turma.alunos.length} | Média da turma: ${mediaTurma.toFixed(1)}<br>Em atenção: ${alunosRisco.length} | Críticos: ${riscoCritico.length}<br>${listaRisco || "Nenhum aluno em risco neste momento."}`;
}

function listarTurmasDani() {
  const turmas = obterTurmasProfessorAtual();

  if (!turmas.length) {
    return "Não encontrei turmas vinculadas a este login docente na base demo.";
  }

  return `Localizei suas turmas na base demo:<br><br>${turmas
    .map((turma) => `• ${turma.disciplina} - ${turma.semestre} de ${turma.curso}`)
    .join("<br>")}`;
}

function respostaBancoDani(texto) {
  const textoNormalizado = normalizarTextoDani(texto);
  const alunoEncontrado = encontrarAlunoDani(texto);

  if (alunoEncontrado) {
    return [
      "Encontrei esse aluno na base demo da Dani:",
      formatarAlunoDani(alunoEncontrado.aluno, alunoEncontrado.turma)
    ];
  }

  if (
    textoNormalizado.includes("minhas turma") ||
    textoNormalizado.includes("disciplinas") ||
    textoNormalizado.includes("aulas que dou") ||
    textoNormalizado.includes("materias")
  ) {
    return [listarTurmasDani()];
  }

  if (
    textoNormalizado.includes("risco") ||
    textoNormalizado.includes("dp") ||
    textoNormalizado.includes("frequ") ||
    textoNormalizado.includes("falta") ||
    textoNormalizado.includes("desempenho") ||
    textoNormalizado.includes("relatorio") ||
    textoNormalizado.includes("media")
  ) {
    const turmas = detectarTurmasDani(texto);

    return [
      "Consultei a base demo vinculada ao seu login docente.",
      turmas.map(resumoTurmaDani).join("<br><br>"),
      "Quando um aluno aparece a até 2 faltas da DP por frequência ou com média abaixo de 6, a Dani exibe a ação de alerta automático por e-mail."
    ];
  }

  return null;
}

function enviarAlertaAcademico(ra) {
  const registro = encontrarAlunoDani(ra);

  if (!registro) {
    adicionarMensagemEva("Não consegui localizar esse aluno na base demo para enviar o alerta.");
    return;
  }

  adicionarMensagemEva(
    `Alerta demo preparado para <strong>${registro.aluno.nome}</strong> (${registro.aluno.email}).<br><br>Assunto: risco acadêmico em ${registro.turma.disciplina}.<br>Mensagem: identificamos frequência ou desempenho em atenção. Recomendamos procurar o professor da disciplina para combinar um plano de recuperação.`
  );
}

function responderDani(textoAluno) {
  timeoutsEva.forEach(clearTimeout);
  timeoutsEva = [];
  removerDigitando();

  const texto = textoAluno.toLowerCase();
  const respostaBanco = respostaBancoDani(textoAluno);
  mostrarDigitando();

  const timeoutResposta = setTimeout(() => {
    removerDigitando();

    if (respostaBanco) {
      enviarMensagensEva(respostaBanco);
    } else if (texto.includes("planejar") || texto.includes("aula")) {
      enviarMensagensEva([
        "Claro. Posso criar um plano de aula com objetivo, metodologia, recursos, tempo estimado e forma de avaliação.",
        "Também posso gerar uma atividade prática ou sugerir uma dinâmica para engajar a turma.",
        "Informe a disciplina, tema da aula, duração e perfil da turma."
      ]);
    } else if (
      texto.includes("avalia") ||
      texto.includes("prova") ||
      texto.includes("quiz") ||
      texto.includes("quest")
    ) {
      enviarMensagensEva([
        "Posso ajudar a criar avaliação, prova, quiz ou banco de questões.",
        "Você pode escolher o nível de dificuldade, quantidade de questões, formato discursivo ou múltipla escolha e critérios de correção.",
        "Qual tema ou competência você deseja avaliar?"
      ]);
    } else if (
      texto.includes("turma") ||
      texto.includes("frequ") ||
      texto.includes("desempenho") ||
      texto.includes("risco")
    ) {
      enviarMensagensEva([
        "Na gestão de turmas, posso apoiar na leitura de frequência, desempenho e identificação de alunos em risco acadêmico.",
        "Para uma análise, informe a turma, disciplina e o tipo de acompanhamento desejado: frequência, notas, participação ou risco."
      ]);
    } else if (
      texto.includes("agenda") ||
      texto.includes("reuni") ||
      texto.includes("prazo") ||
      texto.includes("calend")
    ) {
      enviarMensagensEva([
        "Posso organizar reuniões, prazos, entregas, avaliações e eventos do calendário acadêmico.",
        "Diga a data, horário, turma envolvida e objetivo para eu estruturar a agenda."
      ]);
    } else if (
      texto.includes("relat") ||
      texto.includes("estat") ||
      texto.includes("média") ||
      texto.includes("media") ||
      texto.includes("particip")
    ) {
      enviarMensagensEva([
        "Consigo ajudar com relatórios de turma, médias das avaliações, participação dos alunos e indicadores de acompanhamento.",
        "Informe a turma e quais dados você deseja destacar no relatório."
      ]);
    } else if (
      texto.includes("regul") ||
      texto.includes("norma") ||
      texto.includes("procedimento") ||
      texto.includes("documenta")
    ) {
      enviarMensagensEva([
        "Posso orientar sobre normas da Fatec, procedimentos acadêmicos e documentação docente.",
        "Me diga qual procedimento você quer consultar: avaliação, frequência, plano de ensino, registro acadêmico ou documentação."
      ]);
    } else {
      adicionarMensagemEva(
        "Posso apoiar em planejamento de aulas, criação de avaliações, gestão de turmas, agenda acadêmica, relatórios e regulamentos docentes. Escolha uma sugestão ou descreva sua necessidade."
      );
    }

    salvarHistorico();
  }, 900);

  timeoutsEva.push(timeoutResposta);
}

const bancoDemoElias = {
  biblioteca: {
    horario: "Segunda a sexta, das 8h às 21h. Aos sábados letivos, das 8h às 12h.",
    servicos: "Empréstimo e devolução de livros, consulta local, orientação para normas ABNT e apoio à pesquisa acadêmica."
  },
  calendario: {
    rematriculas: "As rematrículas da demo começam em 15 de julho de 2026 e seguem até 22 de julho de 2026 pelo SIGA.",
    inicioSemestre: "O início das aulas do próximo semestre está previsto para 3 de agosto de 2026.",
    ajuste: "O período de ajuste de matrícula ocorre na primeira semana de aula, conforme disponibilidade de vagas."
  },
  eventos: [
    {
      nome: "Fatec Expo",
      data: "18 de setembro de 2026",
      descricao: "Mostra de projetos acadêmicos, extensão, empresas parceiras e apresentações de estudantes."
    },
    {
      nome: "Semana Tecnológica",
      data: "21 a 25 de outubro de 2026",
      descricao: "Palestras, oficinas, hackathons, painéis de carreira e minicursos de tecnologia."
    },
    {
      nome: "Ciclo de Palestras de Carreira em TI",
      data: "12 de junho de 2026",
      descricao: "Encontro com profissionais do mercado sobre currículo, LinkedIn, entrevistas e portfólio."
    }
  ],
  oportunidades: {
    estagios: [
      "Desenvolvimento Front-end Jr - React, HTML, CSS e Git",
      "Suporte em Análise de Dados - Excel, Power BI e SQL",
      "QA/Testes - lógica, documentação e automação básica"
    ],
    monitorias: [
      "Algoritmos e Lógica de Programação",
      "Banco de Dados",
      "Matemática aplicada"
    ],
    certificacoes: [
      "Git e GitHub",
      "Fundamentos de Cloud",
      "Power BI introdutório",
      "Scrum Foundation"
    ],
    hackathons: [
      "Hackathon CPS Inovação - inscrições previstas para agosto",
      "Desafio Fatec Zona Sul de Soluções para Secretaria Acadêmica"
    ]
  },
  contatos: [
    "Secretaria Acadêmica: secretaria.zonasul@fatec.sp.gov.br",
    "Coordenação de curso: coordenacao.zonasul@fatec.sp.gov.br",
    "Biblioteca: biblioteca.zonasul@fatec.sp.gov.br",
    "Estágios e carreira: estagios.zonasul@fatec.sp.gov.br",
    "Extensão e eventos: extensao.zonasul@fatec.sp.gov.br"
  ]
};

function responderElias(textoAluno) {
  timeoutsEva.forEach(clearTimeout);
  timeoutsEva = [];
  removerDigitando();

  const texto = normalizarTextoDani(textoAluno);
  mostrarDigitando();

  const timeoutResposta = setTimeout(() => {
    removerDigitando();

    if (texto.includes("biblioteca") || texto.includes("livro") || texto.includes("abnt")) {
      enviarMensagensEva([
        `A biblioteca funciona: <strong>${bancoDemoElias.biblioteca.horario}</strong>`,
        bancoDemoElias.biblioteca.servicos,
        "Para dúvidas rápidas, procure o balcão da biblioteca ou envie e-mail para biblioteca.zonasul@fatec.sp.gov.br."
      ]);
    } else if (
      texto.includes("rematricula") ||
      texto.includes("rematr") ||
      texto.includes("calendario") ||
      texto.includes("prazo") ||
      texto.includes("aulas")
    ) {
      enviarMensagensEva([
        bancoDemoElias.calendario.rematriculas,
        bancoDemoElias.calendario.inicioSemestre,
        bancoDemoElias.calendario.ajuste
      ]);
    } else if (
      texto.includes("fatec expo") ||
      texto.includes("expo") ||
      texto.includes("semana tecnologica") ||
      texto.includes("evento") ||
      texto.includes("palestra") ||
      texto.includes("hackathon")
    ) {
      const eventos = bancoDemoElias.eventos
        .map((evento) => `<strong>${evento.nome}</strong> - ${evento.data}<br>${evento.descricao}`)
        .join("<br><br>");
      enviarMensagensEva([
        "Estes são os principais eventos institucionais cadastrados na demo:",
        eventos,
        `Hackathons em destaque:<br>${bancoDemoElias.oportunidades.hackathons.map((item) => `• ${item}`).join("<br>")}`
      ]);
    } else if (
      texto.includes("iniciacao cientifica") ||
      texto.includes("pesquisa") ||
      texto.includes("extensao") ||
      texto.includes("empresa junior") ||
      texto.includes("projeto")
    ) {
      enviarMensagensEva([
        "Para iniciação científica, o melhor caminho é procurar um professor orientador da área em que você quer pesquisar e preparar uma proposta simples: tema, problema, objetivo e justificativa.",
        "Projetos de extensão e empresas juniores costumam ser divulgados pela coordenação, murais, grupos oficiais e eventos como a Fatec Expo.",
        "Se quiser começar bem, posso te ajudar a montar uma ideia de projeto com tema, objetivo, público atendido e próximos passos."
      ]);
    } else if (
      texto.includes("monitoria") ||
      texto.includes("monitorias")
    ) {
      enviarMensagensEva([
        "As oportunidades de monitoria da demo estão ligadas às disciplinas com maior demanda de apoio:",
        bancoDemoElias.oportunidades.monitorias.map((item) => `• ${item}`).join("<br>"),
        "Procure a coordenação do curso ou o professor responsável pela disciplina. Normalmente são avaliados desempenho, disponibilidade e perfil colaborativo."
      ]);
    } else if (
      texto.includes("estagio") ||
      texto.includes("vaga") ||
      texto.includes("emprego") ||
      texto.includes("desenvolvimento") ||
      texto.includes("certificacao") ||
      texto.includes("curso complementar")
    ) {
      enviarMensagensEva([
        "Encontrei oportunidades demo que combinam com tecnologia e início de carreira:",
        bancoDemoElias.oportunidades.estagios.map((item) => `• ${item}`).join("<br>"),
        `Cursos/certificações úteis para fortalecer o currículo:<br>${bancoDemoElias.oportunidades.certificacoes.map((item) => `• ${item}`).join("<br>")}`
      ]);
    } else if (
      texto.includes("linkedin") ||
      texto.includes("curriculo") ||
      texto.includes("currículo") ||
      texto.includes("portfolio") ||
      texto.includes("portfólio") ||
      texto.includes("entrevista") ||
      texto.includes("carreira")
    ) {
      enviarMensagensEva([
        "Para carreira em TI, pense em três entregáveis: currículo objetivo, LinkedIn com palavras-chave e portfólio com projetos publicados.",
        "No currículo para estágio, coloque: curso e semestre, tecnologias que você já praticou, projetos acadêmicos, GitHub, inglês/cursos e disponibilidade.",
        "No LinkedIn, escreva um resumo curto dizendo sua área de interesse, destaque ADS/DSM/Fatec, liste tecnologias e publique projetos com prints, descrição e link do GitHub."
      ]);
    } else if (
      texto.includes("contato") ||
      texto.includes("setor") ||
      texto.includes("secretaria") ||
      texto.includes("coordenacao") ||
      texto.includes("coordenação")
    ) {
      enviarMensagensEva([
        "Aqui estão os contatos institucionais da demo:",
        bancoDemoElias.contatos.map((item) => `• ${item}`).join("<br>")
      ]);
    } else {
      enviarMensagensEva([
        "Sou o Elias, assistente institucional e de carreira da Fatec Zona Sul.",
        "Posso ajudar com biblioteca, calendário acadêmico, eventos, Semana Tecnológica, Fatec Expo, palestras, projetos de extensão, iniciação científica, empresas juniores, monitorias, contatos dos setores, estágios, vagas e preparação para carreira em TI.",
        "Você pode perguntar, por exemplo: “Qual o horário da biblioteca?”, “Quando será a Fatec Expo?” ou “Como melhorar meu LinkedIn?”"
      ]);
    }

    salvarHistorico();
  }, 900);

  timeoutsEva.push(timeoutResposta);
}

/* ============================================================================
   INTEGRAÇÃO COM SISTEMA DE FLUXOS CONVERSACIONAIS
   ============================================================================ */

/**
 * Processa a resposta usando o sistema de fluxos
 * Retorna true se foi processado por um fluxo, false se deve usar lógica padrão
 */
async function processarComFluxos(textoAluno, idResposta) {
  try {
    if (!respostaEstaAtiva(idResposta)) return true;

    if (etapa === "inicio" && (querTrancamento(textoAluno) || querCadunico(textoAluno))) {
      return false;
    }

    // Processa a mensagem com os fluxos
    const resultado = await processarMensagemComFluxos(textoAluno);

    if (!respostaEstaAtiva(idResposta)) return true;

    if (!resultado) {
      return false;
    }

    if (resultado.tipo === 'sem_fluxo') {
      // Nenhum fluxo encontrado, usar lógica padrão
      return false;
    }

    // Exibe a mensagem do fluxo
    if (resultado.mensagem) {
      if (!respostaEstaAtiva(idResposta)) return true;
      removerDigitando();
      adicionarMensagemEva(resultado.mensagem);
      salvarHistorico();
    }

    // Salva informações de débug
    if (resultado.fluxoAtivo) {
      console.log(`📊 Fluxo ativo: ${resultado.fluxoNome} | Step: ${resultado.stepAtual}`);
    }

    return true;

  } catch (erro) {
    console.error('Erro ao processar com fluxos:', erro);
    return false;
  }
}

/* LÓGICA DA EVA */

function responderEva(textoAluno) {
  const idResposta = iniciarCicloResposta();

  if (assistenteAtual.id === "dani") {
    responderDani(textoAluno);
    return;
  }

  if (assistenteAtual.id === "elias") {
    responderElias(textoAluno);
    return;
  }

  removerDigitando();

  const texto = textoAluno.toLowerCase();

  mostrarDigitando();

  // *** TENTA USAR SISTEMA DE FLUXOS PRIMEIRO ***
  const timeoutFluxos = setTimeout(async () => {
    if (!respostaEstaAtiva(idResposta)) return;

    const processouFluxo = await processarComFluxos(textoAluno, idResposta);

    if (!respostaEstaAtiva(idResposta)) return;

    if (processouFluxo) {
      // Fluxo processou com sucesso, encerra
      removerDigitando();
      timeoutsEva.push(timeoutFluxos);
      return;
    }

    // *** NENHUM FLUXO ENCONTRADO - USA LÓGICA PADRÃO ***
    const timeoutResposta = setTimeout(() => {
      if (!respostaEstaAtiva(idResposta)) return;

      if (
        etapa !== "inicio" &&
        etapa !== "bilhete" &&
        etapa !== "cadunico" &&
        querBilheteUnico(texto)
      ) {
        trocarParaBilheteUnico();
        salvarHistorico();
        return;
      }

      if (
        etapa !== "inicio" &&
        etapa !== "documentos" &&
        querDocumentos(texto)
      ) {
        removerDigitando();

        enviarMensagensEva([
          "Claro, podemos mudar para documentos acadêmicos.",
          "Você pode solicitar documentos como declaração de matrícula, histórico escolar, comprovante de vínculo ou outros documentos disponíveis pela secretaria acadêmica.",
          "Qual documento você precisa solicitar?"
        ]);

        etapa = "documentos";
        salvarHistorico();
        return;
      }

      if (etapa !== "inicio" && querCalendario(texto)) {
        removerDigitando();

        enviarMensagensEva([
          "Claro, podemos falar sobre calendário acadêmico agora.",
          "Você pode consultar datas importantes como início e fim do semestre, matrícula, rematrícula, trancamento, provas e recessos.",
          "Qual prazo ou data você quer encontrar?"
        ]);

        etapa = "inicio";
        salvarHistorico();
        return;
      }

      if (
        etapa !== "inicio" &&
        etapa !== "triagem" &&
        querTriagem(texto)
      ) {
        removerDigitando();

        enviarMensagensEva([
          "Tudo bem, vamos reorganizar o atendimento.",
          "Me diga em poucas palavras o que aconteceu ou escolha uma área: matrícula, notas, documentos, estágio, transporte, calendário ou atendimento da secretaria.",
          "Depois disso, eu te ajudo a encontrar o caminho certo."
        ]);

        etapa = "triagem";
        salvarHistorico();
        return;
      }

      if (etapa === "inicio") {

        if (querTrancamento(texto)) {
          removerDigitando();

          enviarMensagensEva([
            textoIdioma(
              "Entendo. Trancar a matrícula é uma decisão importante, então vou te explicar com calma e também te mostrar alternativas antes de você decidir.",
              "I understand. Suspending your enrollment is an important decision, so I will explain it calmly and show you alternatives before you decide.",
              "Entiendo. Suspender tu matrícula es una decisión importante, así que te lo explicaré con calma y también te mostraré alternativas antes de decidir."
            ),
            textoIdioma(
              "No trancamento, você pausa o vínculo com o curso por um período permitido pela instituição. Depois, pode solicitar o destrancamento dentro do prazo definido.",
              "With enrollment suspension, your link with the program is paused for the period allowed by the institution. Later, you can request reactivation within the defined deadline.",
              "Con la suspensión de matrícula, pausas tu vínculo con el curso por el período permitido por la institución. Después, puedes solicitar la reactivación dentro del plazo definido."
            ),
            `${textoIdioma(
              "Antes de seguir com o trancamento, você gostaria de verificar outras possibilidades, como trocar de horário ou avaliar uma mudança de curso?",
              "Before continuing with enrollment suspension, would you like to check other possibilities, such as changing your schedule or considering a program change?",
              "Antes de seguir con la suspensión de matrícula, ¿quieres revisar otras posibilidades, como cambiar de horario o evaluar un cambio de carrera?"
            )}${cardsOpcoesTrancamento()}`
          ]);

          etapa = "trancamento_opcoes";
        }

        else if (querCadunico(texto)) {
          removerDigitando();

          enviarMensagensEva(mensagemPorFormato({
            passo: [
              "A gratuidade do Bilhete Único Estudante depende dos critérios da SPTrans, como possuir CadÚnico atualizado e renda familiar dentro das regras exigidas.",
              "Se o CadÚnico não estiver atualizado, você pode agendar atendimento presencial pelo Descomplica SP para regularizar o cadastro.",
              "Você já possui CadÚnico atualizado?"
            ],
            curta: [
              "A gratuidade depende dos critérios da SPTrans, incluindo CadÚnico atualizado e renda dentro das regras.",
              "Seu CadÚnico está atualizado?"
            ],
            simples: [
              "Para tentar o passe livre, geralmente é preciso ter CadÚnico atualizado.",
              "Seu CadÚnico está atualizado?"
            ]
          }));

          etapa = "cadunico";
        }

        else if (querBilheteUnico(texto)) {
          trocarParaBilheteUnico();
        }

        else if (querCalendario(texto)) {
          removerDigitando();

          enviarMensagensEva(mensagemPorFormato({
            passo: [
              "Você pode consultar o calendário acadêmico para verificar datas importantes, como início e fim do semestre, prazos de matrícula, rematrícula, trancamento, provas e recessos.",
              "Normalmente, o calendário fica disponível no site oficial da instituição ou nos canais acadêmicos da unidade.",
              "Se quiser, também posso te orientar sobre qual prazo você está procurando."
            ],
            curta: [
              "O calendário acadêmico reúne prazos de matrícula, rematrícula, trancamento, provas, recessos e datas do semestre.",
              "Qual prazo você quer encontrar?"
            ],
            simples: [
              "O calendário mostra as datas importantes da faculdade.",
              "Ele ajuda a ver prazos de matrícula, provas, recessos e trancamento.",
              "Qual data você está procurando?"
            ]
          }));

          etapa = "inicio";
        }

        else if (querDocumentos(texto)) {
          removerDigitando();

          enviarMensagensEva(mensagemPorFormato({
            passo: [
              "Claro. Você pode solicitar documentos acadêmicos como declaração de matrícula, histórico escolar, comprovante de vínculo ou outros documentos disponíveis pela secretaria acadêmica.",
              "Para isso, normalmente é necessário acessar o sistema acadêmico ou entrar em contato com a secretaria da unidade informando seu nome completo, RA e o documento desejado.",
              "Qual documento você precisa solicitar?"
            ],
            curta: [
              "Você pode solicitar declaração de matrícula, histórico escolar, comprovante de vínculo ou outros documentos pela secretaria acadêmica.",
              "Qual documento você precisa?"
            ],
            simples: [
              "Você pode pedir documentos da faculdade pela secretaria acadêmica.",
              "Exemplos: declaração de matrícula, histórico escolar ou comprovante de vínculo.",
              "Qual documento você precisa?"
            ]
          }));

          etapa = "documentos";
        }

        else if (querTriagem(texto)) {
          removerDigitando();

          enviarMensagensEva([
            "Tudo bem. Você não precisa saber o nome exato do setor para começar.",
            "Me diga em poucas palavras o que aconteceu ou escolha uma área: matrícula, notas, documentos, estágio, transporte, calendário ou atendimento da secretaria.",
            "Depois disso, eu organizo o próximo passo para você."
          ]);

          etapa = "triagem";
        }

        else {
          respostaNaoEntendi();
        }
      }

      else if (etapa === "triagem") {
        removerDigitando();

        enviarMensagensEva([
          "Entendi. Para esse tipo de situação, o melhor caminho é registrar a solicitação com a secretaria acadêmica ou coordenação, dependendo do assunto.",
          "Resumo para você levar: descreva o problema, informe seu nome completo, RA, curso, semestre e anexe prints ou documentos se houver.",
          "Se quiser, posso continuar te ajudando por aqui com matrícula, documentos, calendário, Bilhete Único ou trancamento."
        ]);

        etapa = "inicio";
      }

      else if (etapa === "trancamento_opcoes") {
        removerDigitando();

        if (querTrocaHorario(texto)) {
          enviarMensagensEva([
            textoIdioma(
              "Tudo bem. Para tentar mudar de horário, o ideal é entrar em contato com o professor coordenador do curso e realizar a solicitação.",
              "All right. To try changing your schedule, the best path is to contact your program coordinator and submit the request.",
              "De acuerdo. Para intentar cambiar de horario, lo ideal es contactar al coordinador de tu curso y realizar la solicitud."
            ),
            `${textoIdioma(
              "Você sabe quem é o seu coordenador?",
              "Do you know who your coordinator is?",
              "¿Sabes quién es tu coordinador?"
            )}${cardsSimNaoCoordenador()}`
          ]);
          etapa = "trancamento_sabe_coordenador";
        } else if (querTrocaCurso(texto)) {
          explicarTrocaCurso();
        } else if (confirmouTrancamento(texto)) {
          enviarMensagensEva([
            textoIdioma(
              "Tudo bem. Antes de confirmar, preciso reforçar: ao trancar sua matrícula, você terá até 2 anos para solicitar o retorno ao curso.",
              "All right. Before confirming, I need to reinforce this: after suspending your enrollment, you will have up to 2 years to request your return to the program.",
              "De acuerdo. Antes de confirmar, necesito reforzar esto: al suspender tu matrícula, tendrás hasta 2 años para solicitar el regreso al curso."
            ),
            textoIdioma(
              "Após esse período, será necessário participar de um novo processo seletivo/vestibular para voltar.",
              "After that period, you will need to take a new selection process/entrance exam to return.",
              "Después de ese período, será necesario participar en un nuevo proceso selectivo/vestibular para volver."
            ),
            `${textoIdioma(
              "Com essas informações, você tem certeza de que deseja seguir com o trancamento?",
              "With this information, are you sure you want to continue with enrollment suspension?",
              "Con esta información, ¿estás seguro/a de que quieres seguir con la suspensión de matrícula?"
            )}${cardsConfirmacaoTrancamento()}`
          ]);
          etapa = "confirmacao";
        } else if (negouOuQuerAlternativa(texto)) {
          enviarMensagensEva([
            textoIdioma(
              "Claro. Podemos olhar alternativas antes de tomar essa decisão.",
              "Of course. We can review alternatives before you make this decision.",
              "Claro. Podemos revisar alternativas antes de tomar esta decisión."
            ),
            `${textoIdioma(
              "Você quer verificar a possibilidade de trocar de horário ou trocar de curso?",
              "Would you like to check the possibility of changing your schedule or changing programs?",
              "¿Quieres verificar la posibilidad de cambiar de horario o cambiar de carrera?"
            )}${cardsOpcoesTrancamento()}`
          ]);
          etapa = "trancamento_opcoes";
        } else {
          enviarMensagensEva([
            textoIdioma(
              "Sem problema. Você pode responder com uma destas opções: trocar de horário, trocar de curso ou seguir com o trancamento.",
              "No problem. You can choose one of these options: change schedule, change program, or continue with enrollment suspension.",
              "No hay problema. Puedes elegir una de estas opciones: cambiar de horario, cambiar de carrera o seguir con la suspensión de matrícula."
            ),
            `${textoIdioma(
              "Qual caminho você prefere verificar agora?",
              "Which path would you like to check now?",
              "¿Qué camino prefieres revisar ahora?"
            )}${cardsOpcoesTrancamento()}`
          ]);
        }
      }

      else if (etapa === "trancamento_sabe_coordenador") {
        removerDigitando();

        if (conheceCoordenador(texto)) {
          enviarMensagensEva([
            textoIdioma(
              "Ótimo. Então entre em contato com o professor coordenador do seu curso e explique que deseja solicitar troca de horário.",
              "Great. Contact your program coordinator and explain that you want to request a schedule change.",
              "Perfecto. Contacta al coordinador de tu curso y explica que quieres solicitar un cambio de horario."
            ),
            textoIdioma(
              "Inclua seu nome completo, RA, curso, turma atual e o horário desejado.",
              "Include your full name, student ID, program, current class/group and desired schedule.",
              "Incluye tu nombre completo, matrícula, curso, grupo actual y el horario deseado."
            ),
            `${textoIdioma(
              "Depois de verificar essa possibilidade, você ainda quer seguir com o trancamento ou prefere tentar essa alternativa primeiro?",
              "After checking that option, do you still want to continue with enrollment suspension or try this alternative first?",
              "Después de revisar esa posibilidad, ¿todavía quieres seguir con la suspensión de matrícula o prefieres intentar esta alternativa primero?"
            )}${cardsPosAlternativa()}`
          ]);
          etapa = "trancamento_pos_alternativa";
        } else if (desconheceCoordenador(texto)) {
          enviarMensagensEva([
            `${textoIdioma(
              "Tudo bem. Qual é o seu curso?",
              "All right. What is your program?",
              "De acuerdo. ¿Cuál es tu curso?"
            )}${cardsCursosHorario()}`
          ]);
          etapa = "trancamento_curso_horario";
        } else {
          enviarMensagensEva([
            textoIdioma(
              "Você pode responder sim ou não.",
              "You can answer yes or no.",
              "Puedes responder sí o no."
            ),
            `${textoIdioma(
              "Você sabe quem é o coordenador do seu curso?",
              "Do you know who your program coordinator is?",
              "¿Sabes quién es el coordinador de tu curso?"
            )}${cardsSimNaoCoordenador()}`
          ]);
        }
      }

      else if (etapa === "trancamento_curso_horario") {
        removerDigitando();

        const curso = texto.includes("curso_dsm") ? "dsm"
          : texto.includes("curso_ads") ? "ads"
            : texto.includes("curso_logistica") ? "logistica"
              : texto.includes("curso_gestao") ? "gestao"
                : cursoInformado(texto);

        if (curso) {
          responderCoordenadorCurso(curso);
        } else {
          enviarMensagensEva([
            `${textoIdioma(
              "Não consegui identificar o curso. Toque em uma opção ou digite o nome do curso.",
              "I could not identify the program. Tap one option or type the program name.",
              "No pude identificar el curso. Toca una opción o escribe el nombre del curso."
            )}${cardsCursosHorario()}`
          ]);
        }
      }

      else if (etapa === "trancamento_pos_alternativa") {
        removerDigitando();

        if (confirmouTrancamento(texto) || querTrancamento(texto)) {
          enviarMensagensEva([
            textoIdioma(
              "Tudo bem. Antes de confirmar, preciso reforçar: ao trancar sua matrícula, você terá até 2 anos para solicitar o retorno ao curso.",
              "All right. Before confirming, I need to reinforce this: after suspending your enrollment, you will have up to 2 years to request your return to the program.",
              "De acuerdo. Antes de confirmar, necesito reforzar esto: al suspender tu matrícula, tendrás hasta 2 años para solicitar el regreso al curso."
            ),
            textoIdioma(
              "Após esse período, será necessário participar de um novo processo seletivo/vestibular para voltar.",
              "After that period, you will need to take a new selection process/entrance exam to return.",
              "Después de ese período, será necesario participar en un nuevo proceso selectivo/vestibular para volver."
            ),
            `${textoIdioma(
              "Com essas informações, você tem certeza de que deseja seguir com o trancamento?",
              "With this information, are you sure you want to continue with enrollment suspension?",
              "Con esta información, ¿estás seguro/a de que quieres seguir con la suspensión de matrícula?"
            )}${cardsConfirmacaoTrancamento()}`
          ]);
          etapa = "confirmacao";
        } else {
          enviarMensagensEva([
            textoIdioma(
              "Perfeito. Então recomendo tentar essa alternativa antes de decidir pelo trancamento.",
              "Perfect. I recommend trying that alternative before deciding on enrollment suspension.",
              "Perfecto. Entonces recomiendo intentar esa alternativa antes de decidir la suspensión de matrícula."
            ),
            textoIdioma(
              "Se depois você ainda quiser trancar, é só voltar aqui e me chamar novamente.",
              "If you still want to suspend later, just come back here and ask me again.",
              "Si después todavía quieres suspender la matrícula, vuelve aquí y pregúntame de nuevo."
            )
          ]);
          etapa = "inicio";
        }
      }

      else if (etapa === "confirmacao") {
        if (confirmouTrancamento(texto)) {
          removerDigitando();

          enviarMensagensEva([
            textoIdioma(
              "Certo. Para formalizar o trancamento, procure a secretaria acadêmica ou o canal oficial da Fatec e registre a solicitação dentro do prazo informado pela unidade.",
              "All right. To formalize the enrollment suspension, contact the academic office or Fatec's official channel and register the request within the deadline informed by the unit.",
              "De acuerdo. Para formalizar la suspensión de matrícula, busca la secretaría académica o el canal oficial de Fatec y registra la solicitud dentro del plazo informado por la unidad."
            ),
            textoIdioma(
              "Lembre-se: você terá até 2 anos para solicitar o destrancamento. Se passar desse prazo, será necessário prestar um novo vestibular/processo seletivo.",
              "Remember: you will have up to 2 years to request reactivation. If that deadline passes, you will need to take a new entrance exam/selection process.",
              "Recuerda: tendrás hasta 2 años para solicitar la reactivación. Si pasa ese plazo, será necesario presentar un nuevo vestibular/proceso selectivo."
            ),
            textoIdioma(
              "Espero que essa pausa te ajude a reorganizar as coisas. Quando precisar, estou por aqui para te orientar.",
              "I hope this pause helps you reorganize things. Whenever you need guidance, I am here.",
              "Espero que esta pausa te ayude a reorganizar las cosas. Cuando lo necesites, estoy aquí para orientarte."
            )
          ]);

          etapa = "inicio";
        } else {
          enviarMensagensEva([
            textoIdioma(
              "Tudo bem. Sua solicitação não será confirmada por aqui.",
              "All right. Your request will not be confirmed here.",
              "De acuerdo. Tu solicitud no será confirmada aquí."
            ),
            textoIdioma(
              "Se quiser, podemos verificar alternativas como troca de horário ou troca de curso antes de você tomar essa decisão.",
              "If you want, we can review alternatives such as changing schedule or changing programs before you make this decision.",
              "Si quieres, podemos revisar alternativas como cambio de horario o cambio de carrera antes de tomar esta decisión."
            )
          ]);

          etapa = "inicio";
        }
      }

      else if (etapa === "bilhete") {
        if (
          texto.includes("gratuidade") ||
          texto.includes("gratis") ||
          texto.includes("gratuito") ||
          texto.includes("livre")
        ) {
          removerDigitando();

          enviarMensagensEva(mensagemPorFormato({
            passo: [
              "A gratuidade do Bilhete Único Estudante é destinada a alunos matriculados no ensino regular, técnico ou superior que atendam aos critérios da SPTrans, como possuir CadÚnico atualizado e renda familiar per capita de até 1,5 salário mínimo.",
              "Você já possui CadÚnico atualizado?"
            ],
            curta: [
              "A gratuidade depende dos critérios da SPTrans, incluindo CadÚnico atualizado e renda dentro das regras.",
              "Você já tem CadÚnico atualizado?"
            ],
            simples: [
              "O passe livre gratuito depende das regras da SPTrans.",
              "Geralmente, precisa ter CadÚnico atualizado e renda familiar dentro do limite.",
              "Seu CadÚnico está atualizado?"
            ]
          }));

          etapa = "cadunico";
        }

        else if (
          texto.includes("meia") ||
          texto.includes("tarifa") ||
          texto.includes("estudantil") ||
          texto.includes("metade")
        ) {
          removerDigitando();

          enviarMensagensEva(mensagemPorFormato({
            passo: [
              "Para a meia-tarifa do Bilhete Único Estudante, a instituição precisa ter seus dados acadêmicos atualizados para validação junto à SPTrans.",
              'Depois disso, acesse o <a href="https://atendimento.sptrans.com.br/login" target="_blank">Portal de Atendimento SPTrans</a>, entre com seu login e procure a área do Bilhete Único Estudante.',
              "Se aparecer alguma pendência de matrícula, curso ou vínculo, procure a secretaria acadêmica da FATEC com seu nome completo, RA, curso e semestre para conferência dos dados."
            ],
            curta: [
              'Para meia-tarifa, confira seus dados acadêmicos e solicite pelo <a href="https://atendimento.sptrans.com.br/login" target="_blank">Portal SPTrans</a>.',
              "Se houver pendência, procure a secretaria com nome completo, RA, curso e semestre."
            ],
            simples: [
              "Para pagar meia passagem, seus dados da faculdade precisam estar corretos na SPTrans.",
              'Depois, entre no <a href="https://atendimento.sptrans.com.br/login" target="_blank">Portal SPTrans</a> e procure Bilhete Único Estudante.',
              "Se der erro, fale com a secretaria da FATEC com seu RA, curso e semestre."
            ]
          }));

          etapa = "inicio";
        }

        else {
          removerDigitando();

          enviarMensagensEva([
            "Existem dois caminhos principais para o Bilhete Único Estudante:",
            'Meia-tarifa: solicitação pelo <a href="https://atendimento.sptrans.com.br/login" target="_blank">Portal de Atendimento SPTrans</a>, após validação dos dados acadêmicos.',
            "Gratuidade/passe livre: depende dos critérios da SPTrans, como CadÚnico atualizado e renda familiar dentro das regras exigidas. Se quiser esse caminho, responda: gratuidade."
          ]);

          etapa = "bilhete";
        }
      }

      else if (etapa === "cadunico") {
        if (
          texto.includes("sim") ||
          texto.includes("tenho") ||
          texto.includes("possuo")
        ) {
          removerDigitando();

          enviarMensagensEva([
            "Ótimo! Então você pode solicitar a gratuidade diretamente pelo site da SPTrans.",
            'Acesse: <a href="https://atendimento.sptrans.com.br/login" target="_blank">Portal de Atendimento SPTrans</a>',
            "Entre com seu login e senha, procure a opção relacionada ao Bilhete Único Estudante e solicite a gratuidade."
          ]);

          etapa = "inicio";
        } else {
          removerDigitando();

          enviarMensagensEva([
            'Tudo bem. Nesse caso, você pode acessar o site do Descomplica SP para agendar atendimento presencial e atualizar o CadÚnico.<br><br><a href="https://agendadesc.prefeitura.sp.gov.br/agendamento/" target="_blank">Agendamento Descomplica SP</a>',
            "Uma dica importante: tente acessar o agendamento no começo da manhã, por volta das 8h, porque costuma ser o melhor horário para encontrar novas vagas.",
            "Depois que o CadÚnico estiver atualizado, acesse o site da SPTrans para solicitar a gratuidade."
          ]);

          etapa = "inicio";
        }
      }

      else {
        respostaNaoEntendi();
        etapa = "inicio";
      }

      if (!respostaEstaAtiva(idResposta)) return;
      salvarHistorico();

    }, 1200);

    timeoutsEva.push(timeoutResposta);
  }, 100); // pequeno delay para fluxos serem processados primeiro

  timeoutsEva.push(timeoutFluxos);
}
