require('dotenv').config();

const OpenAI = require('openai');

const openRouterApiKey = process.env.OPENROUTER_API_KEY || process.env.GEMINI_API_KEY;

const client = new OpenAI({
    apiKey: openRouterApiKey,
    baseURL: 'https://openrouter.ai/api/v1'
});

const path = require('path');
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'EVA - chat')));

const conversations = new Map();

app.post('/api/reescrever-natural', async (req, res) => {
    try {
        const { prompt } = req.body;

        if (!prompt) {
            return res.status(400).json({
                erro: 'Prompt não fornecido'
            });
        }

        const completion = await client.chat.completions.create({
            model: 'openai/gpt-4o-mini',
            messages: [
                {
                    role: 'system',
                    content: 'Reescreva a mensagem de forma natural, amigável e curta. Não adicione informações.'
                },
                {
                    role: 'user',
                    content: prompt
                }
            ]
        });

        const resposta = completion.choices?.[0]?.message?.content || '';

        res.json({
            sucesso: true,
            resposta
        });
    } catch (erro) {
        console.error('Erro ao processar prompt:', erro);
        res.status(500).json({
            erro: 'Erro ao gerar resposta natural'
        });
    }
});

app.post('/api/conversas/salvar', (req, res) => {
    const { usuarioId, historico, etapa, fonte, audioAtivo, contrasteAtivo, preferencias, atualizadoEm } = req.body;

    if (!usuarioId) {
        return res.status(400).json({ erro: 'usuarioId � obrigat�rio' });
    }

    conversations.set(String(usuarioId), {
        usuarioId: String(usuarioId),
        historico: historico || '',
        etapa: etapa || 'inicio',
        fonte: fonte || 1,
        audioAtivo: audioAtivo || false,
        contrasteAtivo: contrasteAtivo || false,
        preferencias: preferencias || {},
        atualizadoEm: atualizadoEm || new Date().toISOString()
    });

    res.json({ sucesso: true });
});

app.get('/api/conversas/:id', (req, res) => {
    const conversa = conversations.get(String(req.params.id));

    if (!conversa) {
        return res.json({});
    }

    res.json(conversa);
});

app.delete('/api/conversas/:id', (req, res) => {
    conversations.delete(String(req.params.id));
    res.json({ sucesso: true });
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'EVA - chat', 'index.html'));
});

app.listen(3000, () => {
    console.log('? Servidor rodando em http://localhost:3000');
});
