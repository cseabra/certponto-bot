//TODO let user enter below parameters through some UI
let initialDate = new Date("Aug 1, 2017 00:00:00");
let finalDate = new Date("Sep 14, 2017 00:00:00");
let cookie = '';
let bearer = '';
let userId = '';
let reason = ''; //usually: Usu\xe1rio de MAC

//TODO get holidays scraping some web page or allow user enter that
const holidays = [
    new Date("Feb 28, 2017 00:00:00"),
    new Date("Apr 14, 2017 00:00:00"),
    new Date("Apr 16, 2017 00:00:00"),
    new Date("Apr 21, 2017 00:00:00"),
    new Date("May 1, 2017 00:00:00"),
    new Date("Jun 15, 2017 00:00:00"),
    new Date("Sep 7, 2017 00:00:00"),
];

let utils = {
    isSameDate(d1, d2) {
        return d1.getDate() == d2.getDate()
            && d1.getMonth() == d2.getMonth()
            && d1.getFullYear() == d2.getFullYear()
    },

    incDate(dt) {
        dt.setDate(dt.getDate() + 1);
        return dt;
    },

    isWeekend(dt) {
        var day = dt.getDay();
        return (day == 6) || (day == 0);    // 6 = Saturday, 0 = Sunday
    },

    twoChars(str) {
        if (str.length == 1) {
            str = '0' + str;
        }
        return str;
    },
    isHoliday(dt) {
        for (let i in holidays) {
            if (this.isSameDate(dt, holidays[i])) {
                return true;
            }
        }
        return false;
    },
    writeCURL(dt) {
        let m = this.twoChars('' + (dt.getMonth() + 1));
        let d = this.twoChars('' + (dt.getDate()));

        let formattedDt1 = `${dt.getFullYear()}-${m}-${d}`;
        let formattedDt2 = `${dt.getFullYear()}/${m}/${d}`;
        console.log(`curl 'https://tratamento.certponto.com.br/api/treatedmarking/post' -H 'Host: tratamento.certponto.com.br' -H 'User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10.12; rv:55.0) Gecko/20100101 Firefox/55.0' -H 'Accept: application/json, text/plain, */*' -H 'Accept-Language: en-US,en;q=0.5' --compressed -H 'Content-Type: application/json;charset=utf-8' -H 'Authorization: ${bearer}' -H 'Referer: https://tratamento.certponto.com.br/' -H 'Cookie: ${cookie}' -H 'Connection: keep-alive' --data $'{"TMC_TRB_IDENTI":"${userId}","TMC_DTAHOR":"${formattedDt1} 08:00","TMC_MOTIVO":"${reason}","TMC_TJM_IDENTI":35,"TMC_IDENTI":0,"TMC_GRUDAT":"${formattedDt2} 00:00"}'`);
        console.log(`curl 'https://tratamento.certponto.com.br/api/treatedmarking/post' -H 'Host: tratamento.certponto.com.br' -H 'User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10.12; rv:55.0) Gecko/20100101 Firefox/55.0' -H 'Accept: application/json, text/plain, */*' -H 'Accept-Language: en-US,en;q=0.5' --compressed -H 'Content-Type: application/json;charset=utf-8' -H 'Authorization: ${bearer}' -H 'Referer: https://tratamento.certponto.com.br/' -H 'Cookie: ${cookie}' -H 'Connection: keep-alive' --data $'{"TMC_TRB_IDENTI":"${userId}","TMC_DTAHOR":"${formattedDt1} 17:00","TMC_MOTIVO":"${reason}","TMC_TJM_IDENTI":35,"TMC_IDENTI":0,"TMC_GRUDAT":"${formattedDt2} 00:00"}'`);
    }
};

(() => {
    for (; ;) {
        if (!utils.isWeekend(initialDate) && !utils.isHoliday(initialDate)) {
            utils.writeCURL(initialDate)
        }
        if (utils.isSameDate(initialDate, finalDate)) break;
        initialDate = utils.incDate(initialDate);
    };
})();