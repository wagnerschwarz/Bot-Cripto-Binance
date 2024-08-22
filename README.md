# Binance Crypto Bot

Este é um programa simples desenvolvido para interagir com as APIs da Testnet da Binance, permitindo o envio de ordens de compra e venda conforme a estratégia definida no código. Ele é ideal para testar e simular operações no mercado de criptomoedas sem riscos financeiros, utilizando a infraestrutura da Binance.

## Funcionalidades

- **Envio de ordens de compra e venda:** Através das APIs da Testnet da Binance.
- **Estratégias personalizáveis:** Exemplo incluído com cálculo de RSI (Índice de Força Relativa) e médias móveis de 13 e 21 períodos.
- **Registro de operações:** Todas as operações realizadas são registradas no arquivo `log.txt` localizado na raiz do projeto.

## Como Iniciar

### 1. Configuração da Testnet

Para utilizar as APIs da Testnet, é necessário gerar suas chaves de acesso (ACCESS_KEY e SECRET_KEY). Siga as instruções abaixo para obter suas chaves:

- **Testnet Spot (Mercado à Vista):**  
  Acesse [Binance Testnet](https://testnet.binance.vision) para criar uma conta e gerar as chaves.

- **Testnet Futures (Mercado de Futuros):**  
  Para utilizar o Binance Future, acesse [Binance Future Testnet](https://testnet.binancefuture.com/) e gere suas chaves específicas.

### 2. Configuração do Bot

Clone este repositório e configure as chaves de acesso no arquivo de configuração correspondente.

### 3. Execução do Bot

Para iniciar o bot, basta executar o script principal. O bot funcionará conforme a estratégia implementada.

### 4. Registro de Operações

Todas as operações realizadas pelo bot são automaticamente registradas no arquivo `log.txt` na raiz do projeto. Esse log pode ser utilizado para revisar as operações e realizar ajustes na estratégia.

## Dicas Úteis

- **Rodando o Bot em Segundo Plano (Windows):**  
  Para rodar o bot em segundo plano, utilize o arquivo `botSemTela.vbs`. Esse arquivo permite que o bot seja executado sem abrir uma janela visível. Caso precise interromper a execução, você pode encerrar o processo `node.exe` pelo Gerenciador de Tarefas do Windows.

---
