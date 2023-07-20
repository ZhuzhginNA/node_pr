const readline = require('readline');
const parser = require('./parser.js');
const getData = require('./getData.js');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('Введите комманду: ', (command) => {
    const [ISO, DATE] = parser.commandPars(command);
    getData.getData(DATE, ISO).then(data => {
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