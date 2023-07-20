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


module.exports = {
    getPartDate,
    commandPars
}

