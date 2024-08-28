let pptConfig = require('../pptLib/slideConfigModelPortfolio');
let chartConfig = require('../pptLib/chart');
let pptApp = require('../pptLib/pptApp');
const { GeneratePPT } = require('./pptGen');
const db = require('../../../app/models');

global.slideConfigGlobal = pptConfig;
global.chartConfigGlobal = chartConfig;

module.exports = async function (id) {
    try {
        let f = new GeneratePPT(id);
        let gen = await f.start();
        let fileName = `PPT-${id}.pptx`;

        const data = await new Promise((resolve, reject) => {
            pptApp({
                url: '',
                backend: true,
                backendData: { data: gen },
                type: 1,
                layout: 'LAYOUT_4x3',
                dummy: false,
                slidePath: '../dummyPPT/slides_dummy'
            }, function (objPPT) {
                objPPT.setPageIndex("slide2");
                let promises = [];
                promises.push(objPPT.getStream());
                Promise.all(promises).then(data => resolve(data[0])).catch(reject);
            })
        });


        let filePath = path.join(__dirname, '../../../uploads/ppts/' + filename);
        data.writeFile(filePath, async function (resp) {
            if (resp.status) {
                console.log('File saved successfully')
            }
        })
        return { status: true, fileName };
    } catch (error) {
        console.error(error);
        throw error;
    }
}
