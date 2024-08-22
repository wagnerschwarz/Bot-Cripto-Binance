const crypto = require("crypto");
const axios = require("axios");

const SYMBOL = "BTCUSDT";
const BUY_PRICE = 59000;
const SELL_PRICE = 60500;
const QUANTITY = "0.001"; //quantidade de bitcoin/moeda


//const API_URL_PROD = "https://api.binance.com";
const API_URL = "https://testnet.binance.vision";
const API_KEY = "ApQPbuZmQwNhfBXJbX9JQ9EpAofbnzs1zdfr6bH8b7PR9h1VQFFXS0bPl54jl90o";
const SECRET_KEY = "PKZyw1kPxkyOTdv12lsLZ8o88tXMkBhII8nVGDXwZmHEDcDklBMj1po2FhNWCYTI";

let isOpened = false;

//medias moveis 21 candles/13 candles
function calcSMA(data){
    const closes = data.map(candle => parseFloat(candle[4]));
    const sum = closes.reduce( (a,b) => a + b);
    return sum / data.length;
}

async function start(){
   
    //limit = qtde de candle
    //interval = tempo grafico
    const {data} = await axios.get(API_URL + "/api/v3/klines?limit=21&interval=15m&symbol=" + SYMBOL);
    const candle = data[data.length - 1];
    const price = parseFloat(candle[4]);

    console.clear();
    console.log("Price: "+price);

    const sma21 = calcSMA(data);
    const sma13 = calcSMA(data.slice(8)); //slice(8) = pega o array da 8 posicao pra cima...
    //console.log("SMA (13P): "+sma13);
    //console.log("SMA (21P): "+sma21);
    console.log("Is Opened? "+isOpened);

    if (price <= BUY_PRICE && isOpened === false) {
    //se a media de 13 ficou maior que a de 21, cruzou para cima, mercado tende a entrar em uma alta de curto-prazo
    //if (sma13 > sma21 && isOpened === false) {
    //if (price < 100000 && isOpened === false) {
        console.log("comprar");
        isOpened = true; 
        newOrder(SYMBOL, QUANTITY, "buy");
    }
    else if (price >= SELL_PRICE && isOpened === true) {
    //se a media de 13 ficou menor que a de 21, cruzou para baixo, mercado tende a entrar em uma queda de curto-prazo
    //else if (sma13 < sma21 && isOpened === true) {
        console.log("vender");
        isOpened = false;
        newOrder(SYMBOL, QUANTITY, "sell");
    }
    else
        console.log("aguardar");

}

async function newOrder(symbol, quantity, side){
    
    const order = { symbol, quantity, side};
    order.type = "MARKET";
    order.timestamp = Date.now();

    const signature = crypto
        .createHmac("sha256", SECRET_KEY)
        .update(new URLSearchParams(order).toString())
        .digest("hex");

    order.signature = signature;
    //console.log("Signature: "+signature);

    try{
        const {data} = await axios.post(
            API_URL+ "/api/v3/order",
            new URLSearchParams(order).toString(),
            { headers: {"X-MBX-APIKEY": API_KEY} }
        )

        console.log(data);
    }
    catch (err) {
        console.error(err.response.data);
    }

}

setInterval(start, 1300)

start();