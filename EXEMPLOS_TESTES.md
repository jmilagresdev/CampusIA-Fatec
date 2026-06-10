# 📚 Exemplos Práticos do Sistema de Fluxos

## Teste 1: Acionamento de Fluxo

### Entrada do Usuário

```
"Quero trancar minha matrícula"
```

### Fluxo Esperado

```
1. Sistema detecta palavra-chave: "trancar"
2. Carrega fluxo: trancamento.json
3. Inicia step 1
4. EVA: "Entendo que deseja trancar sua matrícula..."
5. Usuário responde
6. Avança para step 2
7. Continua até conclusão ou "cancelar"
```

### Resultado no Chat

```
Usuário: Quero trancar minha matrícula
EVA:     Entendo que deseja trancar sua matrícula. Para começarmos,
         você poderia compartilhar o RA (Registro Acadêmico) para
         identificar corretamente sua matrícula?
```

---

## Teste 2: Cancelamento de Fluxo

### Entrada do Usuário

```
Usuário: Quero bilhete único
EVA:     Claro! Vou ajudar você com informações...
Usuário: Cancelar
```

### Resultado

```
EVA: Fluxo encerrado. Qual é a sua próxima dúvida?
```

**Resultado Esperado**: Fluxo é interrompido, volta ao estado livre.

---

## Teste 3: Detecção de Múltiplas Palavras-Chave

### Entradas que acionam o fluxo de "documentos"

```
- "Quero documentos"
- "Preciso de comprovante"
- "Declaração de matrícula"
- "Histórico escolar"
- "Preciso de um certificado"
```

Todos disparam o fluxo `documentos.json` pelas keywords.

---

## Teste 4: Fluxo sem Encontrar Correspondência

### Entrada do Usuário

```
"Como está o tempo hoje?"
```

### Comportamento

```
1. Sistema procura palavras-chave
2. Nenhuma encontrada
3. Retorna tipo: 'sem_fluxo'
4. responderEva() usa lógica padrão
5. EVA responde normalmente: "Posso ajudar com..."
```

---

## Teste 5: Estado Persistente

### Cenário

```
1. Usuário abre o chat
2. Começa fluxo de trancamento (step 2 ativo)
3. Fecha o navegador
4. Reabre a página
```

### Resultado Esperado

```
- Estado é restaurado do localStorage
- Fluxo continua no step 2
- Conversa mantém continuidade
```

### Como Verificar (Console)

```javascript
// Abra F12 e digite:
localStorage.getItem('estadoFluxosEva')

// Deve retornar algo como:
{
  "fluxoAtual": "trancamento",
  "stepAtual": 2,
  "timestamp": "2024-01-15T14:30:00Z"
}
```

---

## Teste 6: Variáveis em Mensagens

### Fluxo com Variáveis

```json
{
  "id": 2,
  "mensagem": "Seu RA é {ra}. O motivo é {motivo}. Confirma?"
}
```

### Entrada do Usuário

```
RA: 202412345678
Motivo: Mudança de instituição
```

### Resposta Esperada

```
EVA: Seu RA é 202412345678. O motivo é Mudança de instituição.
     Você confirma essa informação?
```

---

## Teste 7: Resposta Natural da IA

### Mensagem Base (do JSON)

```
"Solicite o RA do aluno"
```

### IA Reescreve Para

```
"Qual é o seu registro acadêmico (RA)?"
```

ou

```
"Você poderia me informar o seu RA?"
```

ou

```
"Qual é o seu RA?"
```

(A IA adiciona naturalidade de forma variada)

---

## Teste 8: Fluxo Completo - Trancamento

### Simulação Passo a Passo

```
USUÁRIO: Preciso trancar minha matrícula

[Sistema detecta: "trancar" → inicia trancamento.json]

EVA (Step 1): Entendo que deseja trancar sua matrícula. Para
              começarmos, você poderia compartilhar o RA para
              identificar corretamente sua matrícula?

USUÁRIO: 202412345678

[Sistema avança Step 2]

EVA (Step 2): Obrigado! Agora, poderia me informar o motivo do
              trancamento? Isso nos ajuda a orientá-lo melhor
              sobre as melhores alternativas.

USUÁRIO: Mudança de instituição

[Sistema avança Step 3]

EVA (Step 3): Perfeito! Deixe-me confirmar os dados: RA 202412345678,
              motivo: Mudança de instituição. Está tudo certo?
              Se sim, posso encaminhar sua solicitação à secretaria
              acadêmica.

USUÁRIO: Sim, confirmo

[Sistema avança Step 4]

EVA (Step 4): Sua solicitação de trancamento foi encaminhada com
              sucesso! Você receberá uma confirmação por email.
              Em caso de dúvidas, entre em contato com a
              secretaria acadêmica.

[Fluxo finalizado - volta ao estado livre]

USUÁRIO: Obrigado!

EVA: De nada! Qual é a sua próxima dúvida?
```

---

## Teste 9: Console Debugging

### Comandos Úteis

```javascript
// 1. Ver todos os fluxos carregados
console.log(estadoFluxos.fluxosCarregados);

// Saída esperada:
{
  trancamento: {id: "trancamento", nome: "Trancamento de Matrícula", ...},
  "bilhete-unico": {id: "bilhete-unico", nome: "Bilhete Único...", ...},
  ...
}

// 2. Ver estado atual
console.log(estadoFluxos.fluxoAtual, estadoFluxos.stepAtual);
// Saída: null 0 (nenhum fluxo ativo)
// ou: "trancamento" 2 (fluxo ativo no step 2)

// 3. Simular detecção de fluxo
const resultado = detectarFluxo("quero trancar");
console.log(resultado);
// Saída: {id: "trancamento", nome: "Trancamento de Matrícula", ...}

// 4. Ver palavras de encerramento
console.log(palavrasEncerramento);
// Saída: ["cancelar", "sair", "encerrar", "voltar", "parar", ...]

// 5. Limpar estado
limparEstadoFluxos();
console.log(estadoFluxos);
// Saída: {fluxoAtual: null, stepAtual: 0, ...}

// 6. Recarregar fluxos
await carregarFluxos();
console.log("✓ Fluxos recarregados");

// 7. Ver localStorage
console.log(JSON.parse(localStorage.getItem('estadoFluxosEva')));
```

---

## Teste 10: Criar Novo Fluxo de Teste

### Passo 1: Criar arquivo `fluxos/teste.json`

```json
{
  "id": "teste",
  "nome": "Fluxo de Teste",
  "keywords": ["teste", "test"],
  "steps": [
    {
      "id": 1,
      "mensagem": "Bem-vindo ao fluxo de teste! Este é o step 1."
    },
    {
      "id": 2,
      "mensagem": "Este é o step 2. Quase terminando..."
    },
    {
      "id": 3,
      "mensagem": "Step final! Fluxo concluído com sucesso."
    }
  ]
}
```

### Passo 2: Adicionar em `fluxos.js`

Na função `carregarFluxos()`:

```javascript
const fluxosPadrao = [
  "trancamento",
  "bilhete-unico",
  "documentos",
  "calendario",
  "acessibilidade",
  "teste", // ← adicione
];
```

### Passo 3: Testar

```
1. Recarregue a página
2. Digite: "teste"
3. Veja fluxo acionado
4. Responda qualquer coisa
5. Step avança
6. Digite "cancelar" para interromper
```

---

## Checklist de Testes

- [ ] **Teste 1**: Fluxo acionado por palavra-chave
- [ ] **Teste 2**: Cancelamento com "cancelar"
- [ ] **Teste 3**: Múltiplas keywords funcionam
- [ ] **Teste 4**: Sem fluxo → lógica padrão
- [ ] **Teste 5**: Estado persiste no localStorage
- [ ] **Teste 6**: Variáveis substituídas corretamente
- [ ] **Teste 7**: IA reescreve naturalmente
- [ ] **Teste 8**: Fluxo completo do início ao fim
- [ ] **Teste 9**: Console mostra informações corretas
- [ ] **Teste 10**: Novo fluxo criado funciona

---

## Troubleshooting

### Problema: Fluxo não é acionado

**Verificar:**

```javascript
// 1. Fluxo foi carregado?
console.log(estadoFluxos.fluxosCarregados);

// 2. Arquivo JSON existe?
// Verifique em: fluxos/seu-fluxo.json

// 3. Palavras-chave estão corretas?
console.log(detectarFluxo("sua-mensagem"));

// 4. Erro de sintaxe no JSON?
// Valide em: https://jsonlint.com
```

### Problema: Fluxo não avança

**Verificar:**

```javascript
// 1. Estado está sendo salvo?
console.log(estadoFluxos);

// 2. localStorage está habilitado?
try {
  localStorage.setItem("teste", "ok");
  console.log("✓ localStorage OK");
} catch (e) {
  console.error("✗ localStorage desativado");
}

// 3. Steps têm IDs sequenciais?
// Verifique JSON: "id": 1, 2, 3... (sem pulos)
```

### Problema: IA não reescreve

**Verificar:**

```javascript
// 1. API está rodando?
fetch("http://localhost:3000/api/reencrever-natural", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ prompt: "Teste" }),
})
  .then((r) => r.json())
  .then(console.log);

// 2. API_BASE_URL está correto?
console.log(API_BASE_URL);

// 3. Checar Network tab (F12) para erros
```

---

## Performance

### Tempos Esperados

```
Detecção de fluxo:       < 5ms
Carregamento JSON:       < 50ms
Reescrita com IA:        1-3 segundos
Transição de steps:      < 100ms
```

### Otimizações

```javascript
// Cache de fluxos já está implementado
estadoFluxos.fluxosCarregados;

// Variáveis podem ser pré-processadas
// Rate limiting no backend evita excesso

// localStorage é sincronizado
```

---

## Conclusão

O sistema está pronto para:
✓ Produção com fluxos básicos
✓ Escalação (adicionar mais fluxos facilmente)
✓ Integração com IA (ou sem, com fallback)
✓ Persistência de estado
✓ Cancelamento em qualquer momento

**Próximo passo**: Criar fluxos específicos da sua instituição!
