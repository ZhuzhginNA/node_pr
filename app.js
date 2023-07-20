const readline = require('readline');
const fs = require('fs');
const axios = require('axios');
const xml2js = require('xml2js');
const iconv = require('iconv-lite');
const { Console } = require('console');

const URL_CODE = 'https://www.cbr.ru/scripts/XML_valFull.asp';
const ISO = 'DKK';
const DATE = "02/03/2002";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('Введите комманду: ', (command) => {
    const [ISO, DATE] = commandPars(command);
    getData(DATE, ISO).then(data => {
        if (data)
            console.log(
                
                `${data.CharCode[0]} (${data.Name[0]}): ${data.Value[0]}`
            );
        else
            console.log('Нет данных');

    })
    .catch(error => {
        console.error(error);
    });
    rl.close();
});

const getData = (DATE, ISO) => {
    const URL = "https://www.cbr.ru/scripts/XML_daily.asp?date_req="+DATE;
    return axios.get(URL,{
        responseType: 'arraybuffer'
      }).then(response => {
        const xmlBuffer = Buffer.from(response.data, 'binary');
        const xml = iconv.decode(xmlBuffer, 'win1251');
        let res;
        xml2js.parseString(xml, (err, result) => {
            if (err) {
            console.error(err);
            return;
            }
            let arr = result.ValCurs.Valute;
            res = arr.filter(item => item.CharCode == ISO);
        });
        return res[0];
    }).catch(error => {
        console.error(error);
    });;
}

function getPartDate(date){
    let year = date.slice(0,4);
    let month = date.slice(5,7);
    let day = date.slice(8,10);
    return `${day}-${month}-${year}`
    }

function commandPars(command){
    pars = command.split(' ');
    codeDate = pars.filter(pars => pars.startsWith('--'));
    result = codeDate.map(item => item.split('='));
    const searchValue = '--date';
    let foundIndex = -1;

    for (let i = 0; i < result.length; i++) {
        if (result[i][0] === searchValue) {
            foundIndex = i;
            break;
        }
    }
    boolIndex = Boolean(foundIndex);
    reverseIndex = !boolIndex;
    secondIndex = reverseIndex ? 1 : 0;
    return [result[secondIndex][1],getPartDate(result[foundIndex][1])]
}


