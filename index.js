const crypto = require("crypto");
const axios = require("axios");
const fs = require("fs");

const SYMBOL = "BTCUSDT";
const BUY_PRICE = 60200;
const SELL_PRICE = 61300;
const QUANTITY = "0.001"; //quantidade de bitcoin/moeda

//const API_URL_PROD = "https://api.binance.com";
const API_URL = "https://testnet.binance.vision";
const API_KEY = "API_KEY";
const SECRET_KEY = "SECRET_KEY";

let isOpened = false;

// Função para calcular médias móveis
function calcSMA(data) {
    const closes = data.map(candle => parseFloat(candle[4]));
    const sum = closes.reduce((a, b) => a + b);
    return sum / data.length;
}

// Função para registrar logs
function logOrder(order, price) {
    const logMessage = `
    -------------------------------
    Operation: ${order.side.toUpperCase()}
    Symbol: ${order.symbol}
    Quantity: ${order.quantity}
    Price: ${price}
    Timestamp: ${new Date(order.timestamp).toLocaleString()}
    -------------------------------
    `;
    
    fs.appendFileSync("log.txt", logMessage, err => {
        if (err) throw err;
    });

    console.log("Log saved:", logMessage);
}

async function start() {
    const {data} = await axios.get(API_URL + "/api/v3/klines?limit=21&interval=15m&symbol=" + SYMBOL);
    const candle = data[data.length - 1];
    const price = parseFloat(candle[4]);

    console.clear();
    console.log("Price: " + price);

    const sma21 = calcSMA(data);
    const sma13 = calcSMA(data.slice(8));
    console.log("Is Opened? " + isOpened);

    if (price <= BUY_PRICE && isOpened === false) {
        console.log("comprar");
        isOpened = true;
        newOrder(SYMBOL, QUANTITY, "buy", price);
    } else if (price >= SELL_PRICE && isOpened === true) {
        console.log("vender");
        isOpened = false;
        newOrder(SYMBOL, QUANTITY, "sell", price);
    } else {
        console.log("aguardar");
    }
}

async function newOrder(symbol, quantity, side, price) {
    const order = { symbol, quantity, side };
    order.type = "MARKET";
    order.timestamp = Date.now();

    const signature = crypto
        .createHmac("sha256", SECRET_KEY)
        .update(new URLSearchParams(order).toString())
        .digest("hex");

    order.signature = signature;

    try {
        const {data} = await axios.post(
            API_URL + "/api/v3/order",
            new URLSearchParams(order).toString(),
            { headers: {"X-MBX-APIKEY": API_KEY} }
        );

        console.log(data);
        logOrder(order, price);
    } catch (err) {
        console.error(err.response.data);
    }
}

setInterval(start, 3000);

start();
