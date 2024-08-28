const fs = require('fs');
const path = require('path');
const Utils = require('../../../public/js/commonUtils.js')();
const db = require('../app/models');
const slides = require('./slides.js');

function GeneratePPT(id) {
    return {
        id: id,
        prepareData: async function () {
            try {
                // Async logic to fetch data from the database
            } catch (error) {
                console.error(error);
            }
        },
        start: async function () {
            try {
                let slidesConfig = {};

                //data are fetched from database
                // await this.prepareData();

                for (let slide in slides) {
                    let file = Utils.toProperCase(slides[slide].split('slidedummy.')[1]);
                    if (file.indexOf("Slide") > -1) {
                        let slideName = file.split('(')[0];
                        let filePath = path.join(__dirname, './dummyPPTslidesData/' + file.split('(')[0] + '.js');
                        let fileExist = fs.existsSync(filePath);
                        if (slides.hasOwnProperty(slideName.toLowerCase())) {
                            if (fileExist) {
                                let s = require(filePath).slide;
                                slidesConfig[slideName] = s;
                            } else {
                                slidesConfig[slideName] = async () => {
                                    return { data: {} }
                                }
                            }
                        }
                    }
                }

                let promises = [];
                let slideData = [];

                // Promises for slide data computation are pushed into slideData 

                // Filter for slides
                if (filters && filters.hasOwnProperty('slides')) {
                    Object.keys(slides).forEach(i => {
                        if (eval(filters.slides[i])) {
                            let k = slides[i];
                            promises.push(eval(k));
                            slideData.push({ slide: i, data: {} });
                        }
                    });
                } else {
                    for (let i in slides) {
                        promises.push(eval(slides[i]));
                        slideData.push({ slide: i, data: {} });
                    }
                }

                const values = await Promise.all(promises);
                for (let i = 0; i < values.length; i++) {
                    slideData[i].data = values[i];
                }

                let r = Utils.mapArr(slideData, 'slide');
                slideData = {};
                for (let i in r) {
                    slideData[i] = r[i].data;
                }

                return JSON.parse(Utils.escapeSplChar(JSON.stringify(slideData)));
            } catch (error) {
                console.error(error);
            }
        }
    }
}

module.exports.GeneratePPT = GeneratePPT;
