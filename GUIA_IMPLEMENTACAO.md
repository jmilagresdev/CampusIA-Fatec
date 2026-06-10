/\*\*

- GUIA DE IMPLEMENTAÇÃO - SISTEMA DE FLUXOS
-
- Este arquivo demonstra como integrar o sistema de fluxos
- com a aplicação EVA existente.
  \*/

// ============================================================================
// 1. INCLUIR OS SCRIPTS NA ORDEM CORRETA
// ============================================================================

/\*
No arquivo index.html, certifique-se que os scripts estão na ordem:

  <!-- Sistema de Fluxos Conversacionais -->
  <script src="fluxos.js"></script>

  <!-- Script Principal (script.js) -->
  <script src="script.js"></script>

IMPORTANTE: fluxos.js DEVE vir ANTES de script.js
\*/

// ============================================================================
// 2. ESTRUTURA DE DADOS DO FLUXO
// ============================================================================

/\*
Cada fluxo JSON tem a seguinte estrutura:

{
"id": "identificador-unico", // sem espaços ou caracteres especiais
"nome": "Nome Amigável do Fluxo", // exibido nos logs
"keywords": ["palavra1", "palavra2"], // disparam este fluxo
"steps": [ // lista de passos sequenciais
{
"id": 1,
"mensagem": "Primeira mensagem"
},
{
"id": 2,
"mensagem": "Segunda mensagem com {variavel}"
}
]
}

REGRAS IMPORTANTES:

- IDs de steps DEVEM ser sequenciais (1, 2, 3...)
- Keywords devem ser em minúsculas (o sistema normaliza automaticamente)
- Mensagens podem conter HTML (será renderizado)
- Use {nomeVariavel} para placeholders
  \*/

// ============================================================================
// 3. FLUXO DE EXECUÇÃO PASSO A PASSO
// ============================================================================

/\*

1. Usuário digita uma mensagem
   ↓
2. responderEva(textoAluno) é chamada
   ↓
3. Sistema chama procesarMensagemComFluxos()
   ↓
4. Detecta palavras-chave com detectarFluxo()
   ↓
5. Se fluxo encontrado:
   a) iniciarFluxo() inicia com step 1
   b) gerarRespostaNatural() reescreve a mensagem
   c) adicionarMensagemEva() exibe no chat
   ↓
6. Próxima mensagem do usuário:
   a) processarMensagemFluxo() avança com avancarStep()
   b) Se usuário digitar "cancelar", "sair" etc → encerrarFluxo()
   c) Se último step → fluxo encerrado automaticamente
   ↓
7. Sem fluxo ativo ou nenhum detectado → usa lógica padrão
   \*/

// ============================================================================
// 4. ESTADOS DO SISTEMA
// ============================================================================

/\*
O estado é mantido em estadoFluxos:

{
fluxoAtual: null ou "id-do-fluxo", // qual fluxo está ativo
stepAtual: 0 ou número, // qual step (1-based)
fluxosCarregados: {} // cache de todos os JSON
}

Persistência:

- Salvo em localStorage como 'estadoFluxosEva'
- Restaurado automaticamente ao carregar a página
- Limpo ao encerrar fluxo ou com limparEstadoFluxos()
  \*/

// ============================================================================
// 5. PALAVRAS-CHAVE DE ENCERRAMENTO
// ============================================================================

/\*
Estas palavras encerram qualquer fluxo:

'cancelar', 'sair', 'encerrar', 'voltar', 'parar', 'nada', 'nunca', 'não'

Se o usuário digitar qualquer uma dessas, o fluxo é imediatamente encerrado
e a conversa volta ao estado livre.

Para adicionar mais palavras, edite em fluxos.js:

const palavrasEncerramento = [
'cancelar',
'sair',
'sua-palavra-aqui' // ← adicione aqui
];
\*/

// ============================================================================
// 6. EXEMPLO PRÁTICO: CRIAR UM NOVO FLUXO
// ============================================================================

/\*
EXEMPLO: Fluxo para "Horário de Funcionamento"

Passo 1: Criar fluxos/horario.json

{
"id": "horario",
"nome": "Horário de Funcionamento",
"keywords": [
"horário",
"horario",
"quando funciona",
"secretaria aberta",
"atendimento"
],
"steps": [
{
"id": 1,
"mensagem": "A secretaria acadêmica funciona de segunda a sexta, das 8h às 18h, com intervalo de 12h às 13h."
},
{
"id": 2,
"mensagem": "Sábados e domingos não há atendimento. Feriados também seguem calendário especial. Precisa de mais informações?"
}
]
}

Passo 2: Adicionar em fluxos.js na função carregarFluxos()

const fluxosPadrao = [
'trancamento',
'bilhete-unico',
'documentos',
'calendario',
'acessibilidade',
'horario' // ← adicione aqui
];

Passo 3: Testar

- Recarregue a página
- Digite "qual é o horário?" ou "secretaria aberta?"
- O fluxo deve ser acionado

Resultado esperado:
Usuário: "qual é o horário?"
Sistema detecta: "horario" pela palavra-chave "horário"
EVA: (reescreve naturalmente) "A secretaria funciona de segunda a sexta,..."
Step avança automaticamente
EVA: "Sábados e domingos não há atendimento..."
\*/

// ============================================================================
// 7. VARIÁVEIS E PLACEHOLDERS
// ============================================================================

/\*
Use {nomeVariavel} para valores que podem mudar:

Exemplo em JSON:
{
"id": 2,
"mensagem": "Seu RA é {ra} e você estuda no curso de {curso}. Está correto?"
}

A IA recebe e substitui:
{
"ra": "202412345678",
"curso": "Análise de Sistemas"
}

Resultado final:
"Seu RA é 202412345678 e você estuda no curso de Análise de Sistemas. Está correto?"

IMPORTANTE: O backend precisa coletar e passar essas variáveis.
Atualmente, o sistema de fluxos é agnóstico a variáveis (apenas
as substitui na mensagem).
\*/

// ============================================================================
// 8. DEBUGGING E TESTES
// ============================================================================

/\*
Abra o console do navegador (F12) e use:

// Ver fluxo carregado
console.log(estadoFluxos.fluxosCarregados);

// Ver estado atual
console.log(`Fluxo: ${estadoFluxos.fluxoAtual}, Step: ${estadoFluxos.stepAtual}`);

// Testar detecção de fluxo
console.log(detectarFluxo("quero trancar a matrícula"));

// Limpar estado (volta ao início)
limparEstadoFluxos();

// Ver palavras de encerramento
console.log(palavrasEncerramento);

// Forçar inicializar fluxos
await inicializarFluxos();
\*/

// ============================================================================
// 9. COMPATIBILIDADE COM CÓDIGO EXISTENTE
// ============================================================================

/\*
O sistema de fluxos é TOTALMENTE compatível com a lógica existente:

- Se um fluxo é acionado → processa o fluxo
- Se nenhum fluxo é encontrado → usa a lógica padrão de responderEva()
- Nenhuma mudança foi feita nas funções originais (apenas integração)
- O estado de fluxos é independente do etapa/histórico existente

Isso significa:
✓ Fluxos podem coexistir com a lógica padrão
✓ Gradualmente pode-se migrar da lógica padrão para fluxos
✓ Sem quebra de funcionalidades existentes
\*/

// ============================================================================
// 10. GERAÇÃO DE RESPOSTAS COM IA
// ============================================================================

/\*
A função gerarRespostaNatural() faz POST para:

POST /api/reencrever-natural
Content-Type: application/json

Request:
{
"prompt": "Você é EVA, assistente acadêmica..."
}

Response:
{
"resposta": "A resposta reescrita naturalmente"
}

Se a API não responder, o sistema:

1. Log de aviso no console
2. Usa a mensagem base do JSON
3. Continua funcionando normalmente

Para debugar, verifique:

- Network tab no F12 para ver requisições
- Se API_BASE_URL está correto
- Se o backend está rodando
  \*/

// ============================================================================
// 11. BOAS PRÁTICAS
// ============================================================================

/\*
✓ DO:

- Use keywords específicas e variadas
- Mensagens claras e simples
- Testes com diferentes inputs
- Nomes descritivos para fluxos
- Comentários em fluxos complexos

✗ DON'T:

- Não use caracteres especiais em IDs
- Não deixe steps sem ID sequencial
- Não espere variáveis mágicas (registre explicitamente)
- Não misture lógica condicional (JSON não suporta)
- Não use muitos steps (mais de 5 fica longo)
  \*/

// ============================================================================
// 12. PRÓXIMOS PASSOS
// ============================================================================

/\*
Depois de implementar os fluxos básicos:

1. Adicione mais fluxos conforme necessário
2. Colete dados do usuário (RA, nome, motivo) para usar em variáveis
3. Implemente persistência de dados entre fluxos
4. Crie interface para gerenciar fluxos (CRUD)
5. Adicione analytics (fluxos mais usados, taxa de conclusão)
6. Implemente branching condicional (se usuário responde sim/não)
7. Integre com banco de dados para histórico
   \*/

// ============================================================================
// RESUMO FINAL
// ============================================================================

/\*
SISTEMA DE FLUXOS = JSON + IA

1. JSON define a lógica (o QUE fazer)
2. IA naturaliza a resposta (COMO soar natural)
3. Sistema cuida da sequência (fluxo linear)
4. Usuário pode cancelar a qualquer momento

Resultado: Conversas estruturadas, previsíveis e escaláveis.
\*/
