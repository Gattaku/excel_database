const paddingNum = (num) => {
    const str = num.toString();
    if (str.length === 1) {
        return `0${str}`;
    }
    return str;
}

module.exports.getCurrentTime = () => {
    const now = new Date();
    const Year = now.getFullYear();
    const Month = now.getMonth() + 1;
    const DateNum = now.getDate();
    const Hour = paddingNum(now.getHours());
    const Min = paddingNum(now.getMinutes());
    const Sec = paddingNum(now.getSeconds());
    return `${Year}/${Month}/${DateNum} ${Hour}:${Min}:${Sec}`;
}

