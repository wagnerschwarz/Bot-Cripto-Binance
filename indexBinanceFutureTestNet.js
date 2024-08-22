const crypto = require("crypto");
const axios = require("axios");

const SYMBOL = "BTCUSDT";
const BUY_PRICE = 59000;
const SELL_PRICE = 60500;
const QUANTITY = "0.01"; // Quantidade de bitcoin/moeda

const API_URLFuture = "https://testnet.binancefuture.com";
const API_KEYFuture = "API_KEYFuturesBinance";
const SECRET_KEYFuture = "SECRET_KEYFuturesBinance";

let isOpened = false;

// Função para calcular a média móvel simples (SMA)
function calcSMA(data) {
    const closes = data.map(candle => parseFloat(candle[4]));
    const sum = closes.reduce((a, b) => a + b);
    return sum / data.length;
}

async function start() {
    const {data} = await axios.get(API_URLFuture + "/fapi/v1/klines?limit=21&interval=15m&symbol=" + SYMBOL);
    const candle = data[data.length - 1];
    const price = parseFloat(candle[4]);

    console.clear();
    console.log("Price: " + price);

    const sma21 = calcSMA(data);
    const sma13 = calcSMA(data.slice(8)); // Slice(8) = pega o array da 8ª posição para cima
    console.log("SMA (13P): " + sma13);
    console.log("SMA (21P): " + sma21);
    console.log("Is Opened? " + isOpened);

    if (price > 100000 && isOpened === false) {
        console.log("comprar");
        isOpened = true;
        newOrder(SYMBOL, QUANTITY, "BUY");
    //} else if (sma13 < sma21 && isOpened === true) {
    } else if (price < 60000 ) {
        console.log("vender");
        isOpened = false;
        newOrder(SYMBOL, QUANTITY, "SELL");
    } else {
        console.log("aguardar");
    }
}

async function newOrder(symbol, quantity, side) {
    const order = {
        symbol,
        quantity,
        side,
        type: "MARKET",
        timestamp: Date.now()
    };

    const query = new URLSearchParams(order).toString();

    const signature = crypto
        .createHmac("sha256", SECRET_KEYFuture)
        .update(query)
        .digest("hex");

    const params = `${query}&signature=${signature}`;

    try {
        const {data} = await axios.post(
            `${API_URLFuture}/fapi/v1/order`,
            params,
            {headers: {"X-MBX-APIKEY": API_KEYFuture}}
        );

        console.log(data);
    } catch (err) {
        console.error(err.response.data);
    }
}

setInterval(start, 3000);
start();
