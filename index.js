const CurrencyConverter = require("currency-converter-lt");
let CURC = new CurrencyConverter({from:"USD", to:"RUB", amount:1});

CURC.convert().then((response) => {
    console.log(`Result:${response}`);
});



