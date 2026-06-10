# 🎯 Sistema de Fluxos Conversacionais

Motor de fluxos baseado em JSON para assistente acadêmico EVA. A IA não controla a lógica da conversa - apenas reescreve mensagens de forma natural.

## 📋 Arquitetura

```
Usuário envia mensagem
       ↓
Sistema detecta palavras-chave
       ↓
Se encontrado → Inicia fluxo JSON
       ↓
Carrega primeiro step
       ↓
Cada resposta do usuário → avança para próximo step
       ↓
IA reescreve mensagem para tom natural
       ↓
Quando último step → Fluxo encerrado
       ↓
Se usuário disser "cancelar", "sair", etc → Fluxo encerrado
```

## 🗂️ Estrutura de Pastas

```
/fluxos/
├── README.md (este arquivo)
├── trancamento.json
├── bilhete-unico.json
├── documentos.json
├── calendario.json
├── acessibilidade.json
└── [adicionar novos fluxos aqui]
```

## 📄 Formato de um Fluxo JSON

```json
{
  "id": "nome-do-fluxo",
  "nome": "Nome Descritivo do Fluxo",
  "keywords": ["palavra-chave1", "palavra-chave2", "palavra-chave3"],
  "steps": [
    {
      "id": 1,
      "mensagem": "Primeira mensagem que a IA deve reescrever"
    },
    {
      "id": 2,
      "mensagem": "Segunda mensagem com variáveis como {ra} ou {motivo}"
    },
    {
      "id": 3,
      "mensagem": "Mensagem final antes de encerrar o fluxo"
    }
  ]
}
```

### Campos Obrigatórios

| Campo      | Tipo   | Descrição                                  |
| ---------- | ------ | ------------------------------------------ |
| `id`       | string | Identificador único do fluxo (sem espaços) |
| `nome`     | string | Nome amigável do fluxo                     |
| `keywords` | array  | Palavras-chave que acionam este fluxo      |
| `steps`    | array  | Lista de steps do fluxo                    |

### Structure de um Step

| Campo      | Tipo   | Descrição                          |
| ---------- | ------ | ---------------------------------- |
| `id`       | number | Número sequencial (1, 2, 3...)     |
| `mensagem` | string | Mensagem base que a IA reescreverá |

## ✨ Variáveis em Mensagens

Use `{nomeVariavel}` para substituições. Exemplo:

```json
{
  "id": 2,
  "mensagem": "Obrigado! Você informou RA: {ra}. O motivo foi: {motivo}. Está correto?"
}
```

As variáveis são substituídas pela IA ao gerar resposta natural.

## 🚀 Como Funciona no Código

### 1. **Carregamento Automático**

Ao inicializar (`fluxos.js`):

```javascript
await carregarFluxos(); // Carrega todos os JSON
restaurarEstadoFluxos(); // Restaura estado anterior
```

### 2. **Detecção de Fluxo**

```javascript
const fluxo = detectarFluxo("trancar minha matrícula");
// Encontra 'trancamento.json' pela palavra-chave 'trancar'
```

### 3. **Processamento de Mensagem**

```javascript
const resultado = await procesarMensagemComFluxos("quero trancar");
// resultado.tipo = 'fluxo_novo'
// resultado.mensagem = resposta naturalizada
// resultado.fluxoAtivo = true
```

### 4. **Integração com responderEva()**

A função `responderEva()` agora:

1. Tenta processar com fluxos
2. Se não encontrar fluxo → usa lógica padrão (compatível com código atual)

## 🔤 Palavras de Encerramento

Estas palavras encerram um fluxo automaticamente:

```javascript
("cancelar", "sair", "encerrar", "voltar", "parar", "nada", "nunca", "não");
```

Adicione mais em `fluxos.js` na variável `palavrasEncerramento`.

## 📝 Como Criar um Novo Fluxo

### Passo 1: Criar arquivo JSON

Crie `fluxos/seu-fluxo.json`:

```json
{
  "id": "seu-fluxo",
  "nome": "Nome do Seu Fluxo",
  "keywords": ["palavra1", "palavra2"],
  "steps": [
    {
      "id": 1,
      "mensagem": "Primeira pergunta"
    },
    {
      "id": 2,
      "mensagem": "Segunda pergunta"
    },
    {
      "id": 3,
      "mensagem": "Mensagem final"
    }
  ]
}
```

### Passo 2: Registrar no carregamento

Edite `fluxos.js` e adicione o nome do novo fluxo no array:

```javascript
const fluxosPadrao = [
  "trancamento",
  "bilhete-unico",
  "seu-fluxo", // ← adicione aqui
];
```

### Passo 3: Testar

- Recarregue a página
- Tire a palavra-chave em uma mensagem
- O fluxo deve ser acionado automaticamente

## 💡 Exemplos de Uso

### Exemplo 1: Fluxo Simples

```json
{
  "id": "horario-secretaria",
  "nome": "Horário da Secretaria",
  "keywords": ["horário", "horario", "secretaria", "quando fecha"],
  "steps": [
    {
      "id": 1,
      "mensagem": "A secretaria acadêmica funciona de segunda a sexta, das 8h às 18h, com uma hora de intervalo entre 12h e 13h."
    },
    {
      "id": 2,
      "mensagem": "Alguma outra dúvida sobre atendimento?"
    }
  ]
}
```

### Exemplo 2: Fluxo com Dados

```json
{
  "id": "comprovante-vinculo",
  "nome": "Comprovante de Vínculo",
  "keywords": ["comprovante de vínculo", "comprovante"],
  "steps": [
    {
      "id": 1,
      "mensagem": "Vou ajudar você com o comprovante de vínculo. Qual é o seu RA?"
    },
    {
      "id": 2,
      "mensagem": "Perfeito! Seu comprovante será gerado com base em seus dados: RA {ra}. Está correto?"
    },
    {
      "id": 3,
      "mensagem": "Pronto! Seu comprovante foi enviado para o email registrado. Se não receber em 5 minutos, verifique a pasta de spam."
    }
  ]
}
```

## 🔧 Funções Principais em `fluxos.js`

| Função                                | Descrição                                           |
| ------------------------------------- | --------------------------------------------------- |
| `carregarFluxos()`                    | Carrega todos os JSON da pasta `/fluxos/`           |
| `detectarFluxo(mensagem)`             | Detecta qual fluxo ativar baseado em palavras-chave |
| `iniciarFluxo(fluxo)`                 | Inicia um novo fluxo                                |
| `avancarStep()`                       | Avança para o próximo step                          |
| `encerrarFluxo()`                     | Encerra fluxo atual                                 |
| `procesarMensagemComFluxos(mensagem)` | Processa mensagem considerando fluxos               |
| `gerarRespostaNatural(mensagem)`      | Reescreve mensagem com IA                           |
| `salvarEstadoFluxos()`                | Salva estado em localStorage                        |
| `restaurarEstadoFluxos()`             | Restaura estado anterior                            |

## 🎯 Estado do Fluxo

O estado é armazenado em `localStorage` com estrutura:

```javascript
{
  "fluxoAtual": "trancamento", // ID do fluxo ativo
  "stepAtual": 2,              // Step atual (1-based)
  "timestamp": "2024-01-15T10:30:00Z"
}
```

Acesse via: `localStorage.getItem('estadoFluxosEva')`

## 🧪 Depuração

Abra o console do navegador (F12) para ver logs:

```javascript
// Fluxos carregados
console.log(estadoFluxos.fluxosCarregados);

// Estado atual
console.log(estadoFluxos.fluxoAtual, estadoFluxos.stepAtual);

// Detectar fluxo
console.log(detectarFluxo("trancar matrícula"));

// Limpar estado
limparEstadoFluxos();
```

## ⚙️ Configuração da IA

A função `gerarRespostaNatural()` usa um endpoint da API:

```javascript
POST http://localhost:3000/api/reencrever-natural
Content-Type: application/json

{
  "prompt": "Você é EVA..."
}
```

Se a API não estiver disponível, usa a mensagem base do JSON sem reescrever.

### Customizar Prompt

Edite o prompt em `gerarRespostaNatural()`:

```javascript
const prompt = `Você é ${nomeAssistente}, assistente acadêmica.
...
Transforme a mensagem abaixo em uma resposta natural...`;
```

## 🔄 Fluxo de Fallback

Se nenhum fluxo for encontrado:

1. `procesarMensagemComFluxos()` retorna `{tipo: 'sem_fluxo'}`
2. `responderEva()` continua com lógica padrão
3. Sistema compatível com código existente

## 📊 Visualizar Fluxo Ativo

No console:

```javascript
// Ver fluxo ativo
estadoFluxos.fluxoAtual;

// Ver step atual
estadoFluxos.stepAtual;

// Ver todos os fluxos
estadoFluxos.fluxosCarregados;
```

## ✅ Checklist para Novo Fluxo

- [ ] Arquivo JSON criado em `/fluxos/`
- [ ] `id` é único e sem espaços
- [ ] `keywords` contém variações comuns
- [ ] Cada `step` tem `id` sequencial
- [ ] Mensagens são claras e objetivas
- [ ] Adicionado à lista `fluxosPadrao` em `fluxos.js`
- [ ] Testado no navegador
- [ ] Cancelamento funciona (digitando "cancelar")

## 🚀 Próximas Melhorias

- [ ] Interface para gerenciar fluxos (CRUD)
- [ ] Validação automática de JSON
- [ ] Analytics de fluxos mais usados
- [ ] Suporte a branching condicional
- [ ] Persistência de dados entre fluxos
- [ ] Histórico completo de conversas

## 📞 Suporte

Para dúvidas ou problemas:

1. Verifique o console (F12) para erros
2. Valide o JSON com [jsonlint.com](https://jsonlint.com)
3. Verifique se as palavras-chave estão corretas
4. Teste com diferentes variações de entrada
