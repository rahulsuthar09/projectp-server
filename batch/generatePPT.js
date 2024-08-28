const path = require('path');
const pptExport = require('../modules/ppt/dummyPPT/index');

(async () => {
    try {
        var args = process.argv.slice(2);
        args = [1];
        if (args.length > 0) {
            let args1 = args.length > 1 ? args[1] : '';
            const d = await pptExport(args[0], args1);
            if (process.send) process.send(d);
        }
    } catch (error) {
        console.error(error);
        if (process.send) process.send({ status: false, msg: error.message });
    }
})();