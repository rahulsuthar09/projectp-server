var moment = null;
if (typeof window === undefined && typeof document === undefined) {
    moment = require('moment');
}

var Utils = function() {
    return {
        numberWithCommas: function (x) {
            try {
                x = parseFloat(x);
                return x.toLocaleString('en-IN', { maximumFractionDigits: 2 });
            } catch (e) {
                console.error("numberWithCommas ", e);
                return x;
            }
        },
        weightedAverage: function (arr, total = 0) {
            let count = 0, sum = 0;
            arr.forEach(i => {
                if (!isNaN(i) && i != 0) {
                    sum += parseFloat(i);
                    count++;
                }
            })
            return parseFloat(total) ? parseFloat(sum / total).toFixed(1) : (count == 0 ? 0 : parseFloat(sum / count).toFixed(1));
        },
        formatDateIn: function (date, format = 'YYYY-MM-DD') {
            return moment(date).format(format);
        },
        
    }
}

try {
    var moment = require('moment');
    module.exports = Utils;
} catch (e) {
    var Utils = new Utils();
}

