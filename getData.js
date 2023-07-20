const axios = require('axios');
const xml2js = require('xml2js');
const iconv = require('iconv-lite');

function getData(DATE, ISO) {
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

module.exports = {
    getData
}