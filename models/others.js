

exports.getLocalTime=function (nS) {
    return new Date(parseInt(nS) * 1000).toLocaleString();
}

exports.getVirtualSize=function (num) {
    num/=1000000;
    return num.toFixed(2)+'MB';
}