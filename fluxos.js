/**
 * SISTEMA DE FLUXOS CONVERSACIONAIS
 * Motor de fluxos baseado em JSON para assistente acadêmico
 * 
 * Arquitetura:
 * - JSON controla 100% da lógica de conversa
 * - IA apenas reescreve mensagens de forma natural
 * - Detecção automática de palavras-chave
 * - Estados simples: fluxo e step atual
 */

// ============================================================================
// ESTADO GLOBAL DO SISTEMA DE FLUXOS
// ============================================================================

const estadoFluxos = {
    fluxoAtual: null,    // ID do fluxo em execução
    stepAtual: 0,        // Número do step atual (1-based)
    fluxosCarregados: {} // Cache dos fluxos JSON carregados
};

// Palavras-chave para encerrar um fluxo
const palavrasEncerramento = [
    'cancelar',
    'sair',
    'encerrar',
    'voltar',
    'parar',
    'nada',
    'nunca',
    'não'
];

// ============================================================================
// 1. CARREGAR FLUXOS DO SERVIDOR
// ============================================================================

/**
 * Carrega todos os fluxos disponíveis na pasta /fluxos
 * Faz cache em memoria para evitar múltiplas requisições
 */
async function carregarFluxos() {
    try {
        // Lista de fluxos conhecidos (você pode descobrir dinamicamente do servidor)
        const fluxosPadrao = [
            'bilhete-unico',
            'documentos',
            'calendario',
            'acessibilidade'
        ];

        // Carregar cada fluxo
        for (const nomeFluxo of fluxosPadrao) {
            if (!estadoFluxos.fluxosCarregados[nomeFluxo]) {
                try {
                    const response = await fetch(`fluxos/${nomeFluxo}.json`);
                    if (response.ok) {
                        const fluxo = await response.json();
                        estadoFluxos.fluxosCarregados[nomeFluxo] = fluxo;
                    }
                } catch (erro) {
                    console.warn(`Erro ao carregar fluxo ${nomeFluxo}:`, erro);
                }
            }
        }

        console.log('✓ Fluxos carregados:', Object.keys(estadoFluxos.fluxosCarregados));
        return estadoFluxos.fluxosCarregados;
    } catch (erro) {
        console.error('Erro ao carregar fluxos:', erro);
        return {};
    }
}

// ============================================================================
// 2. DETECTAR FLUXO POR PALAVRAS-CHAVE
// ============================================================================

/**
 * Detecta qual fluxo ativar baseado nas palavras-chave da mensagem do usuário
 * @param {string} mensagem - Mensagem do usuário
 * @returns {object|null} Fluxo encontrado ou null
 */
function detectarFluxo(mensagem) {
    if (!mensagem) return null;

    const mensagemNormalizada = mensagem.toLowerCase().trim();

    // Procura em cada fluxo carregado
    for (const [idFluxo, fluxo] of Object.entries(estadoFluxos.fluxosCarregados)) {
        if (!fluxo.keywords) continue;

        // Verifica se alguma palavra-chave está na mensagem
        for (const keyword of fluxo.keywords) {
            if (mensagemNormalizada.includes(keyword.toLowerCase())) {
                return fluxo; // Encontrou um fluxo
            }
        }
    }

    return null; // Nenhum fluxo encontrado
}

// ============================================================================
// 3. INICIAR FLUXO
// ============================================================================

/**
 * Inicia um fluxo novo
 * @param {object} fluxo - Objeto do fluxo
 * @returns {object} Step inicial do fluxo
 */
function iniciarFluxo(fluxo) {
    if (!fluxo || !fluxo.id) return null;

    // Encerra fluxo anterior se existir
    if (estadoFluxos.fluxoAtual) {
        console.log(`⊘ Encerrando fluxo anterior: ${estadoFluxos.fluxoAtual}`);
    }

    // Ativa novo fluxo no step 1
    estadoFluxos.fluxoAtual = fluxo.id;
    estadoFluxos.stepAtual = 1;

    console.log(`✓ Fluxo iniciado: ${fluxo.nome} (${fluxo.id})`);

    // Retorna primeiro step
    return obterStepAtual();
}

// ============================================================================
// 4. OBTER STEP ATUAL
// ============================================================================

/**
 * Retorna o step atualmente ativo no fluxo
 * @returns {object|null} Step atual ou null se não houver fluxo
 */
function obterStepAtual() {
    if (!estadoFluxos.fluxoAtual) return null;

    const fluxo = estadoFluxos.fluxosCarregados[estadoFluxos.fluxoAtual];
    if (!fluxo || !fluxo.steps) return null;

    const step = fluxo.steps.find(s => s.id === estadoFluxos.stepAtual);
    return step || null;
}

// ============================================================================
// 5. AVANÇAR PARA PRÓXIMO STEP
// ============================================================================

/**
 * Avança para o próximo step do fluxo
 * @returns {object|null} Próximo step ou null se fluxo acabou
 */
function avancarStep() {
    if (!estadoFluxos.fluxoAtual) return null;

    const fluxo = estadoFluxos.fluxosCarregados[estadoFluxos.fluxoAtual];
    if (!fluxo) return null;

    // Próximo step
    const proximoStepId = estadoFluxos.stepAtual + 1;
    const proximoStep = fluxo.steps.find(s => s.id === proximoStepId);

    if (proximoStep) {
        estadoFluxos.stepAtual = proximoStepId;
        console.log(`↓ Step avançado: ${estadoFluxos.fluxoAtual} → step ${estadoFluxos.stepAtual}`);
        return proximoStep;
    }

    // Fluxo terminou
    console.log(`✓ Fluxo completado: ${estadoFluxos.fluxoAtual}`);
    encerrarFluxo();
    return {
        finalizado: true,
        mensagem: fluxo.mensagemFinal
    };
}

// ============================================================================
// 6. ENCERRAR FLUXO
// ============================================================================

/**
 * Encerra o fluxo atual
 */
function encerrarFluxo() {
    if (estadoFluxos.fluxoAtual) {
        console.log(`✓ Fluxo encerrado: ${estadoFluxos.fluxoAtual}`);
        estadoFluxos.fluxoAtual = null;
        estadoFluxos.stepAtual = 0;

        // Salva estado
        salvarEstadoFluxos();
    }
}

/**
 * Verifica se o usuário quer encerrar o fluxo
 * @param {string} mensagem - Mensagem do usuário
 * @returns {boolean} True se quer encerrar
 */
function desejaEncerrarFluxo(mensagem) {
    const mensagemNormalizada = mensagem.toLowerCase().trim();

    for (const palavra of palavrasEncerramento) {
        if (mensagemNormalizada.includes(palavra)) {
            return true;
        }
    }

    return false;
}

// ============================================================================
// 7. PROCESSAR MENSAGEM DO USUÁRIO NO FLUXO
// ============================================================================

/**
 * Processa mensagem do usuário dentro de um fluxo ativo
 * @param {string} mensagem - Mensagem do usuário
 * @returns {object} {fluxo: {id, nome}, step: stepAtual, proximoStep: stepProximo}
 */
function processarMensagemFluxo(mensagem) {
    // Verifica se usuário quer encerrar
    if (desejaEncerrarFluxo(mensagem)) {
        const fluxoAnterior = estadoFluxos.fluxoAtual;
        encerrarFluxo();
        return {
            encerrado: true,
            fluxo: fluxoAnterior,
            mensagem: 'Fluxo encerrado. Qual é a sua próxima dúvida?'
        };
    }

    // Se não há fluxo ativo, retorna null
    if (!estadoFluxos.fluxoAtual) return null;

    const fluxo = estadoFluxos.fluxosCarregados[estadoFluxos.fluxoAtual];
    const stepAtual = obterStepAtual();
    const proximoStep = avancarStep();

    return {
        fluxoId: estadoFluxos.fluxoAtual,
        fluxoNome: fluxo?.nome,
        stepAnterior: stepAtual?.id,
        stepAtual: estadoFluxos.stepAtual,
        proximoStep: proximoStep,
        fimFluxo: !proximoStep
    };
}

// ============================================================================
// 8. GERAR RESPOSTA NATURAL COM IA
// ============================================================================

/**
 * Usa IA para reescrever a mensagem do step de forma natural
 * @param {string} mensagemBase - Mensagem base do step (do JSON)
 * @param {string} nomeAssistente - Nome do assistente (EVA, Dani, Elias)
 * @param {string} nomeFluxo - Nome do fluxo
 * @param {number} stepNum - Número do step
 * @param {object} variaveis - Variáveis para substituir (ex: {ra: "123456"})
 * @returns {Promise<string>} Mensagem naturalizada pela IA
 */
async function gerarRespostaNatural(
    mensagemBase,
    nomeAssistente = 'EVA',
    nomeFluxo = '',
    stepNum = 0,
    variaveis = {}
) {
    try {
        // Substitui variáveis na mensagem base (ex: {ra} → valor real)
        let mensagemProcessada = mensagemBase;
        for (const [chave, valor] of Object.entries(variaveis)) {
            const regex = new RegExp(`\\{${chave}\\}`, 'g');
            mensagemProcessada = mensagemProcessada.replace(regex, valor);
        }

        const apiBaseUrlRaw = typeof API_BASE_URL !== 'undefined' ? API_BASE_URL : 'http://localhost:3000';
        const apiBaseUrl = apiBaseUrlRaw.replace(/\/api\/?$/, '');

        // Se não houver API configurada, retorna a mensagem base
        if (!apiBaseUrl) {
            console.warn('API_BASE_URL não configurada. Usando mensagem base.');
            return mensagemProcessada;
        }

        // Prompt para a IA
        const prompt = `Você é ${nomeAssistente}, assistente acadêmica amigável e empática.

Fluxo atual: ${nomeFluxo || 'Conversação livre'}
Passo: ${stepNum || 'N/A'}

Transforme a mensagem abaixo em uma resposta natural, amigável e concisa. 
Mantenha o mesmo significado mas deixe mais conversacional e humana.
Não adicione informações novas. Não decida o próximo passo.

Mensagem:
${mensagemProcessada}

Retorne apenas a resposta reescrita, sem explicações.`;

        // Chamada à API (ajuste conforme seu backend)
        const signal = typeof window !== 'undefined' ? window.respostaAtualSignal : undefined;

        const response = await fetch(`${apiBaseUrl}/api/reescrever-natural`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            signal,
            body: JSON.stringify({ prompt })
        });

        if (response.ok) {
            const dados = await response.json();
            return dados.resposta || mensagemProcessada;
        }

        console.warn('Falha ao gerar resposta natural. Usando base.');
        return mensagemProcessada;

    } catch (erro) {
        console.error('Erro ao gerar resposta natural:', erro);
        return mensagemBase; // Fallback para mensagem base
    }
}

// ============================================================================
// 9. SALVAR/CARREGAR ESTADO DOS FLUXOS
// ============================================================================

/**
 * Salva o estado do fluxo no localStorage
 */
function salvarEstadoFluxos() {
    const estado = {
        fluxoAtual: estadoFluxos.fluxoAtual,
        stepAtual: estadoFluxos.stepAtual,
        timestamp: new Date().toISOString()
    };
    localStorage.setItem('estadoFluxosEva', JSON.stringify(estado));
    console.log('✓ Estado dos fluxos salvo');
}

/**
 * Restaura o estado dos fluxos do localStorage
 */
function restaurarEstadoFluxos() {
    try {
        const estado = JSON.parse(localStorage.getItem('estadoFluxosEva'));
        if (estado) {
            estadoFluxos.fluxoAtual = estado.fluxoAtual;
            estadoFluxos.stepAtual = estado.stepAtual;
            console.log('✓ Estado dos fluxos restaurado');
        }
    } catch (erro) {
        console.warn('Erro ao restaurar estado dos fluxos:', erro);
    }
}

/**
 * Limpa o estado dos fluxos
 */
function limparEstadoFluxos() {
    localStorage.removeItem('estadoFluxosEva');
    estadoFluxos.fluxoAtual = null;
    estadoFluxos.stepAtual = 0;
}

// ============================================================================
// 10. INICIALIZAÇÃO DO SISTEMA
// ============================================================================

/**
 * Inicializa o sistema de fluxos
 * Deve ser chamado no carregamento da página
 */
async function inicializarFluxos() {
    console.log('🚀 Inicializando sistema de fluxos...');

    // Carrega fluxos disponíveis
    await carregarFluxos();

    // Restaura estado anterior se existir
    restaurarEstadoFluxos();

    console.log('✓ Sistema de fluxos pronto');
}

// ============================================================================
// 11. FUNÇÃO DE INTEGRAÇÃO PRINCIPAL
// ============================================================================

/**
 * Processa uma mensagem do usuário considerando fluxos
 * Retorna: {tipo, mensagem, fluxo, step, proximoStep}
 * 
 * tipo pode ser:
 * - 'fluxo_novo': Iniciou um fluxo novo
 * - 'fluxo_ativo': Continuando em um fluxo
 * - 'fluxo_encerrado': Fluxo foi finalizado
 * - 'sem_fluxo': Sem fluxo ativo (conversa livre)
 */
async function processarMensagemComFluxos(mensagemUsuario) {
    if (!mensagemUsuario) return null;

    // 1. Se há fluxo ativo, processa dentro dele
    if (estadoFluxos.fluxoAtual) {
        const resultado = processarMensagemFluxo(mensagemUsuario);

        if (resultado.encerrado) {
            const stepAtual = obterStepAtual();
            const mensagem = await gerarRespostaNatural(
                resultado.mensagem,
                assistenteAtual?.nome || 'EVA'
            );

            return {
                tipo: 'fluxo_encerrado',
                mensagem: mensagem,
                fluxoId: resultado.fluxo,
                semFluxo: true
            };
        }

        if (resultado.fimFluxo) {
            // Fluxo concluído com sucesso
            const stepAnterior = estadoFluxos.fluxosCarregados[resultado.fluxoId]?.steps[resultado.stepAnterior - 1];
            const mensagem = await gerarRespostaNatural(
                stepAnterior?.mensagem || 'Processo finalizado com sucesso!',
                assistenteAtual?.nome || 'EVA',
                resultado.fluxoNome,
                resultado.stepAnterior
            );

            return {
                tipo: 'fluxo_encerrado',
                mensagem: mensagem,
                fluxoId: resultado.fluxoId,
                completado: true
            };
        }

        // Continua no fluxo
        const proximoStep = resultado.proximoStep;
        if (proximoStep) {
            const mensagem = await gerarRespostaNatural(
                proximoStep.mensagem,
                assistenteAtual?.nome || 'EVA',
                resultado.fluxoNome,
                proximoStep.id
            );

            return {
                tipo: 'fluxo_ativo',
                mensagem: mensagem,
                fluxoId: resultado.fluxoId,
                fluxoNome: resultado.fluxoNome,
                stepAtual: resultado.stepAtual,
                fluxoAtivo: true
            };
        }
    }

    // 2. Não há fluxo ativo, tenta detectar um novo
    const fluxoEncontrado = detectarFluxo(mensagemUsuario);

    if (fluxoEncontrado) {
        const stepInicial = iniciarFluxo(fluxoEncontrado);

        if (stepInicial) {
            const mensagem = await gerarRespostaNatural(
                stepInicial.mensagem,
                assistenteAtual?.nome || 'EVA',
                fluxoEncontrado.nome,
                stepInicial.id
            );

            // Salva estado
            salvarEstadoFluxos();

            return {
                tipo: 'fluxo_novo',
                mensagem: mensagem,
                fluxoId: fluxoEncontrado.id,
                fluxoNome: fluxoEncontrado.nome,
                stepAtual: 1,
                fluxoAtivo: true
            };
        }
    }

    // 3. Sem fluxo: conversa livre
    return {
        tipo: 'sem_fluxo',
        mensagem: null,
        fluxoAtivo: false
    };
}

// ============================================================================
// EXPORTAR PARA USO GLOBAL
// ============================================================================

// Inicializa automaticamente quando o arquivo é carregado
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', inicializarFluxos);
} else {
    inicializarFluxos();
}
