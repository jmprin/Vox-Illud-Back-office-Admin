
const formatSeconds = (time,format=[]) => {
    const sec_num = parseInt(time, 10);
    let hours   = Math.floor(sec_num / 3600);
    let minutes = Math.floor((sec_num - (hours * 3600)) / 60);
    let seconds = sec_num - (hours * 3600) - (minutes * 60);

    // if (hours   < 10) {hours   = "0"+hours;}
    if (minutes < 10) {minutes = "0"+minutes;}
    if (seconds < 10) {seconds = "0"+seconds;}

    let formated = '';
    if( format.includes('H') ){
        formated += hours + ' h ';
    }
    if( format.includes('m') ){
        formated +=  minutes + ' min ' ;
    }
    if( format.includes('s') ){
        formated +=seconds + ' s';
    }

    return formated;
}

export {
    formatSeconds
};