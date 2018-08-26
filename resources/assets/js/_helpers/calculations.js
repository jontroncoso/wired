export function halfLife({sip, unix_now = 0, metabolism = 10}){
    const unixNow = (!unix_now ? Math.round((new Date()).getTime()) : unix_now);
    const amount = parseInt(sip.dosage/Math.pow(2,(parseInt((unixNow)-(sip.created_at*1000))/1000)/metabolism)*100)/100;
    return amount > 1 ? amount : 0;
}

// LD50 of caffeine is 175mg/kg-body-weight * 90 kg avg 200lb (15750)
export function healthPercentage({amount, ld50 = 500}) {
    return (parseInt((amount*10000)/(ld50))/100);
}

export function displayFace({health}) {
    switch(Math.ceil(health/10))
    {
    case 0:
        return '😴';//'&#128533;';
    case 1:
        return '😒';
    case 2:
        return '🙂';//'&#128533;';
    case 3:
        return '🤩';//'&#128529;';
    case 4:
        return '🤪';
    case 5:
        return '😳';
    case 6:
        return '🤯';
    case 7:
        return '🤢';
    case 8:
        return '🤮';
    case 9:
        return '😵';
    case 10:
        return '💀';
    }
    return '🧟';
}

export function secondsToHms(d) {
    d = Number(d);
    var h = Math.floor(d / 3600);
    var m = Math.floor(d % 3600 / 60);
    var s = Math.floor(d % 3600 % 60);

    var hDisplay = h > 0 ? h + (h == 1 ? ' hour, ' : ' hours, ') : '';
    var mDisplay = m > 0 ? m + (m == 1 ? ' minute, ' : ' minutes, ') : '';
    var sDisplay = s > 0 ? s + (s == 1 ? ' second' : ' seconds') : '';
    return hDisplay + mDisplay + sDisplay;
}
