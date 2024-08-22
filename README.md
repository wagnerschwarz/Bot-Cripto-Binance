**Binance Crypto Bot**

Programa simples utilizando as APIs de Testnet da Binance para enviar ordens de Compra e Venda conforme a estratégia implementada no programa.
(Comentado exemplo de RSI média móveis, 13 e 21 períodos)

**Para gerar a ACCESS_KEY e SECRET_KEY na testnet:**
https://testnet.binance.vision/

**Para utilizar o Binance Future, usar o /indexBinanceFutureTestNet, necessário pegar a ACCESS_KEY e SECRET_KEY em:**
https://testnet.binancefuture.com/

O Bot registra todas as operações de compras e venda no arquivo** log.txt (caminho raiz do projeto)**

Dica: Para deixar rodando em segundo plano no Windows, pode configurar o **arquivo botSemTela.vbs **
(para parar a execução, você pode fechar pelo gerenciador de tarefas (programa node.exe)
