/\*\*

- EXEMPLO DE BACKEND PARA GERAÇÃO DE RESPOSTAS NATURAIS
-
- Este arquivo demonstra como implementar o endpoint /api/reescrever-natural
- que será chamado pela função gerarRespostaNatural() em fluxos.js
-
- Framework: Express.js + OpenAI/Anthropic ou similar
  \*/

// ============================================================================
// EXEMPLO 1: COM OPENAI (GPT-4 ou GPT-3.5)
// ============================================================================

/\*
npm install openai express

const express = require('express');
const { OpenAI } = require('openai');

const app = express();
app.use(express.json());

const openai = new OpenAI({
apiKey: process.env.OPENAI_API_KEY
});

// Endpoint para reencrever mensagens com IA
app.post('/api/reencrever-natural', async (req, res) => {
try {
const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({
        erro: 'Prompt não fornecido'
      });
    }

    const response = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content: 'Você é um especialista em comunicação natural e empática.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      temperature: 0.7,
      max_tokens: 500,
      top_p: 0.9
    });

    const resposta = response.choices[0].message.content.trim();

    res.json({
      sucesso: true,
      resposta: resposta
    });

} catch (erro) {
console.error('Erro ao processar prompt:', erro);
res.status(500).json({
erro: 'Erro ao gerar resposta natural'
});
}
});

app.listen(3000, () => {
console.log('✓ Servidor rodando em http://localhost:3000');
});
\*/

// ============================================================================
// EXEMPLO 2: COM ANTHROPIC CLAUDE
// ============================================================================

/\*
npm install @anthropic-ai/sdk express

const express = require('express');
const Anthropic = require('@anthropic-ai/sdk');

const app = express();
app.use(express.json());

const client = new Anthropic();

app.post('/api/reencrever-natural', async (req, res) => {
try {
const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({
        erro: 'Prompt não fornecido'
      });
    }

    const message = await client.messages.create({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 500,
      messages: [
        {
          role: 'user',
          content: prompt
        }
      ]
    });

    const resposta = message.content[0].text.trim();

    res.json({
      sucesso: true,
      resposta: resposta
    });

} catch (erro) {
console.error('Erro ao processar prompt:', erro);
res.status(500).json({
erro: 'Erro ao gerar resposta natural'
});
}
});

app.listen(3000, () => {
console.log('✓ Servidor rodando em http://localhost:3000');
});
\*/

// ============================================================================
// EXEMPLO 3: COM GEMINI (GOOGLE)
// ============================================================================

/\*
npm install @google/generative-ai express

const express = require('express');
const { GoogleGenerativeAI } = require('@google/generative-ai');

const app = express();
app.use(express.json());

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

app.post('/api/reencrever-natural', async (req, res) => {
try {
const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({
        erro: 'Prompt não fornecido'
      });
    }

    const model = genAI.getGenerativeModel({
      model: 'gemini-pro'
    });

    const result = await model.generateContent(prompt);
    const resposta = result.response.text().trim();

    res.json({
      sucesso: true,
      resposta: resposta
    });

} catch (erro) {
console.error('Erro ao processar prompt:', erro);
res.status(500).json({
erro: 'Erro ao gerar resposta natural'
});
}
});

app.listen(3000, () => {
console.log('✓ Servidor rodando em http://localhost:3000');
});
\*/

// ============================================================================
// EXEMPLO 4: VERSÃO SIMPLES SEM IA (TEMPLATE)
// ============================================================================

/\*
Para testes sem dependências de IA (rápido e sem custos):

const express = require('express');
const app = express();
app.use(express.json());

// Simples: apenas remove pontuação e adiciona pontos
app.post('/api/reencrever-natural', async (req, res) => {
try {
const { prompt } = req.body;

    // Extrai apenas a mensagem do prompt
    const regex = /Mensagem:\s*([\s\S]*?)$/;
    const match = prompt.match(regex);
    const mensagem = match ? match[1].trim() : prompt;

    // Transforma em algo mais natural
    let resposta = mensagem
      .toLowerCase()
      .replace(/solicite/gi, 'peço')
      .replace(/informe/gi, 'me conta')
      .replace(/confirme/gi, 'confirma')
      .replace(/\?/, ' por favor?');

    // Capitaliza primeira letra
    resposta = resposta.charAt(0).toUpperCase() + resposta.slice(1);

    res.json({
      sucesso: true,
      resposta: resposta
    });

} catch (erro) {
res.status(500).json({
erro: 'Erro ao processar'
});
}
});

app.listen(3000, () => {
console.log('✓ Servidor simples rodando em http://localhost:3000');
});
\*/

// ============================================================================
// EXEMPLO 5: ESTRUTURA COMPLETA COM CACHE
// ============================================================================

/\*
Para produção, adicione cache para evitar chamadas repetidas:

const express = require('express');
const { OpenAI } = require('openai');
const NodeCache = require('node-cache');

const app = express();
app.use(express.json());

const openai = new OpenAI({
apiKey: process.env.OPENAI_API_KEY
});

// Cache com TTL de 1 hora
const cache = new NodeCache({ stdTTL: 3600 });

app.post('/api/reencrever-natural', async (req, res) => {
try {
const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({
        erro: 'Prompt não fornecido'
      });
    }

    // Verifica cache
    const cacheKey = Buffer.from(prompt).toString('base64');
    const respostaCached = cache.get(cacheKey);

    if (respostaCached) {
      console.log('✓ Resposta do cache');
      return res.json({
        sucesso: true,
        resposta: respostaCached,
        origem: 'cache'
      });
    }

    // Gera nova resposta
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: 'Reescreva a mensagem de forma natural, breve e empática.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      temperature: 0.7,
      max_tokens: 500
    });

    const resposta = response.choices[0].message.content.trim();

    // Salva no cache
    cache.set(cacheKey, resposta);

    res.json({
      sucesso: true,
      resposta: resposta,
      origem: 'api'
    });

} catch (erro) {
console.error('Erro:', erro);

    // Fallback: retorna a mensagem do prompt original
    res.status(500).json({
      erro: 'Erro ao gerar resposta',
      origem: 'fallback'
    });

}
});

// Health check
app.get('/health', (req, res) => {
res.json({
status: 'ok',
cache_size: cache.keys().length
});
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
console.log(`✓ Servidor com cache rodando em http://localhost:${PORT}`);
});
\*/

// ============================================================================
// VARIABLES DE AMBIENTE RECOMENDADAS
// ============================================================================

/\*
Crie um arquivo .env na raiz do projeto:

# Para OpenAI

OPENAI_API_KEY=sk-...

# Para Anthropic

ANTHROPIC_API_KEY=sk-ant-...

# Para Google Gemini

GEMINI_API_KEY=...

# Configurações gerais

API_PORT=3000
NODE_ENV=development
LOG_LEVEL=info

Carregue com: require('dotenv').config()
\*/

// ============================================================================
// ESTRUTURA DE RESPOSTA
// ============================================================================

/\*
Esperado pelo fluxos.js:

SUCESSO:
{
"resposta": "A mensagem reescrita naturalmente"
}

ERRO (fallback para mensagem base):
{
"erro": "Descrição do erro"
}

A aplicação front-end trata ambos os casos.
\*/

// ============================================================================
// RATE LIMITING (RECOMENDADO)
// ============================================================================

/\*
npm install express-rate-limit

const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
windowMs: 15 _ 60 _ 1000, // 15 minutos
max: 100, // 100 requisições
message: 'Muitas requisições de uma vez, tente depois',
standardHeaders: true,
legacyHeaders: false
});

app.use('/api/', limiter);
\*/

// ============================================================================
// LOGGING (RECOMENDADO)
// ============================================================================

/\*
npm install winston

const winston = require('winston');

const logger = winston.createLogger({
level: 'info',
format: winston.format.json(),
transports: [
new winston.transports.File({ filename: 'error.log', level: 'error' }),
new winston.transports.File({ filename: 'combined.log' })
]
});

if (process.env.NODE_ENV !== 'production') {
logger.add(new winston.transports.Console({
format: winston.format.simple()
}));
}

logger.info('Servidor iniciado');
\*/

// ============================================================================
// TESTANDO LOCALMENTE
// ============================================================================

/\*

1. Instale dependências:
   npm install express openai

2. Configure variáveis de ambiente:
   export OPENAI_API_KEY="sua-chave-aqui"

3. Execute o servidor:
   node server.js

4. Teste com curl:
   curl -X POST http://localhost:3000/api/reencrever-natural \
    -H "Content-Type: application/json" \
    -d '{"prompt": "Solicite o RA do aluno"}'

5. Resposta esperada:
   {
   "sucesso": true,
   "resposta": "Qual é o seu RA?"
   }
   \*/

// ============================================================================
// NOTAS IMPORTANTES
// ============================================================================

/\*

1. CUSTOS: Chamadas à API têm custo (OpenAI, Anthropic, etc)
   - Implemente cache para economizar
   - Use rate limiting
   - Monitore uso

2. LATÊNCIA: A IA pode levar 1-3 segundos
   - Mostre "digitando..." enquanto aguarda
   - Considere timeouts

3. QUALIDADE: Ajuste o prompt conforme necessário
   - Teste diferentes modelos
   - Refine instruções
   - Colete feedback dos usuários

4. PRIVACIDADE: As mensagens são enviadas à IA
   - Implemente filtros de dados sensíveis
   - Use HTTPS em produção
   - Cumpra LGPD/GDPR

5. FALLBACK: Sempre tenha um plano B
   - Se API cair, use a mensagem base
   - Não quebre a experiência do usuário
     \*/
