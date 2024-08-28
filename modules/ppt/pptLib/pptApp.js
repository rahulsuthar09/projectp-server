var PptxGenJS = require("../pptxgen");
var pptx = new PptxGenJS();
var PPTExporter = require('./main');
var objPPT = PPTExporter(pptx);
global.CORE = {};
global.UTILS = {};
global.tableconfig = require('./tableType');

var normalizedPath = require("path").join(__dirname, "../config");
require("./core");
require("./left/left");
require("fs").readdirSync(normalizedPath).forEach(function (file) {
    require("../config/" + file);
});

let pptApp = function (config, callBack) {
    if (config.layout)
        pptx.layout = config.layout;
    if (!config.dummy) {
        //slidePath is path to slides_dummy/slides
        let slidesPath = config.slidePath
        switch(config.type){
            case 1:
                slidesPath = '../dummyPPT/slides_dummy';
                break;
            default:
                slidesPath = '../dummyPPT/slides_dummy'
        }
        var normalizedPathSlides = require("path").join(__dirname, slidesPath);
        require("fs").readdirSync(normalizedPathSlides).forEach(function (file) {
            if (file.indexOf("slide") > -1 && config.backendData.data[file]) {
                require(`${slidesPath}/${file}/${file}.js`);
            }
        });
    } else {
        /* to render tables from dummy data */
        for (var slide in config.backendData.data) {
            if (slide !== 'slide1') {
                CORE.slides[slide] = function () {
                    return {


                        init: function () {

                        },
                        createSlide: function (objPPT, slide) {
                            let dataTable = UTILS.getDummyTables(slide);
                            let getChartData = UTILS.getChartDataNew(slide);

                            let data = { ...dataTable, ...getChartData };
                            objPPT.createSlide(slide, data, { showPercent: true });
                        },

                        postRender: function () {

                        },
                        render: function () {
                            return (
                                `<div class="slide2" style="position:relative;">
                                </div>`
                            )
                        }
                    }
                }
            } else {
                let slidesPath = "../dummyPPT/slides_dummy";
                require(`${slidesPath}/${slide}/${slide}.js`);
            }
        }
    }

    objPPT.init({ local: config.local != undefined && config.local === false ? false : true, apiUrl: config.url, backend: config.backend || false, backendData: config.backendData || {},type:config.type, slidePath: config.slidePath || '../dummyPPT/slides_dummy'}, () => {
        var left = CORE.left(config.type || 1);
        left.postRender(true); //noHTML
        left.events && left.events();

        for (var slide in CORE.apiData) {
            if (CORE.slideClass[slide]) {
                CORE.slideClass[slide].createSlide(objPPT, slide);
            }
            else {
                console.log('Slide not available: ' + slide);
            }
        }
        callBack(objPPT);
    });
};

module.exports = pptApp;