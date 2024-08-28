
var cm_units = ["x", "y", "w", "h", "Left Margin"];
let floatTypes = ["valAxisMajorUnit", "valAxisMaxVal", "valAxisMinVal", "catAxisLabelFrequency", "valAxisLabelFrequency", "valAxisCrossesAt", "catAxisCrossesAt"];
var urlSlide = "https://jsontocsv.districtd.in/json/ambit-slideconfig.json";
var urlChart = "https://jsontocsv.districtd.in/json/ambit-chartconfig.json";
var urlMPSlide = "https://jsontocsv.districtd.in/json/ambit-mp-slideconfig.json";
const path = require('path');

let getImgPath = () => {
    if (isNode2) {
        return path.join(__dirname, './icons/1/');
        //return "./icons/1/";
    }
    return "../icons/1/";
}
String.prototype.capitalize = function () {
    return this.charAt(0).toUpperCase() + this.slice(1);
}
var commonStyles = {
    x: "x",
    y: "y",
    w: "w",
    h: "h",
    bg: "fill",
    fontsize: "fontSize",
    fontcolor: "color",
    fontstyle: "bold",
    fontface: "fontFace",
    fontsize: "fontSize",

};
var _chartConfig = {};

var lineStyles = {
    ...commonStyles,
    "veralignment": "valign",
    "horalignment": "align",
    istextbox: "isTextBox",
    italic: "italic",
    "Left Margin": "inset",
    fontcolor: "color",
    fontstyle: "bold",
    fontface: "fontFace",
    fontsize: "fontSize",
    inset:"inset"
};
var optsChartBar2 = {

    showLegend: true,
    legendPos: 'b', //bottom/ u,r,l

    catGridLine: { color: "cc6699", style: "dash", size: 1  },
    valGridLine: { style: 'dash' },


};


var Shapes = function () {

    return {
        getTextBoxStyles: function (items, isMul) {
            let styleObj = {};
            for (let style in items) {
                if(style =='line'){
                    let border = items[style].split(",");
                    styleObj[style] = {
                        "width" : border[0],
                        "color" : border[1]
                    }
                }
                if (lineStyles[style]) {
                    if (cm_units.indexOf(lineStyles[style]) > -1) {
                        if (lineStyles[style].indexOf("%") > -1) {
                            styleObj[lineStyles[style]] = items[style];
                        } else {

                            styleObj[lineStyles[style]] = `${items[style]}`;
                        }
                    } else {
                        if (style === "font_style" && items[style] == "yes") {
                            styleObj[lineStyles[style]] = true;
                        } else {
                            styleObj[lineStyles[style]] = `${items[style]}`;
                        }
                    }
                }
            }
            return styleObj;
        },
        // getRectBoxStyles: function(items){
        // 	let styleObj = {};
        // 	for(let style in items){
        // 		if(lineStyles[style]){
        // 			if(cm_units.indexOf(lineStyles[style])> -1){
        // 					if(lineStyles[style].indexOf("%") > -1 ){
        // 						styleObj[lineStyles[style]] = items[style];
        // 					}else{
        // 						styleObj[lineStyles[style]] = items[style];
        // 					}
        // 			}else{
        // 				if(style === "FontStyle" && items[style] == "yes"){
        // 					styleObj[lineStyles[style]] = true;
        // 				}else{
        // 					styleObj[lineStyles[style]] = items[style];
        // 				}
        // 			}
        // 		}
        // 	}
        // 	return styleObj;
        // },
        getChartStyles: function (item, key) {
            let styleObj = {};

            let chartType = key || item["charttype"];
            let chartData = _chartConfig[chartType];
            chartData = { ...item, ...optsChartBar2, ...chartData };
            for (let style in chartData) {
                if (commonStyles[style]) {
                    //if(commonStyles[style]){
                    if (chartData[style]) {
                        styleObj[commonStyles[style]] = chartData[style];
                        if (cm_units.indexOf(commonStyles[style]) > -1) {
                            styleObj[commonStyles[style]] = chartData[style]
                        }
                    }

                    //}

                } else {
                    //styleObj[style] = chartData[style];
                    if (floatTypes.indexOf(style) > -1 && chartData[style]) {
                        styleObj[style] = parseFloat(chartData[style]);
                    }
                    else if (style == "valGridLine") {
                        if(chartData.valGridLine){
                            let [color,type,size] = chartData.valGridLine.split(",");
                            styleObj[style] = {"color" : color , "style" : type,"size":size}
                        }else {
                            styleObj[style] = { style: chartData[style] || "none" };
                        }
                    }

                    else if (style == "catGridLine") {
                        if(chartData.catGridLine){
                            let [color,type,size] = chartData.catGridLine.split(",");
                            styleObj[style] = {"color" : color , "style" : type,"size":size}
                        }else {
                            styleObj[style] = { style: chartData[style] || "none" };
                        }
                    } else {
                        if (chartData[style] !== "") {
                            styleObj[style] = chartData[style];
                        }

                    }

                }
            }

            return styleObj;

        },
        getLineBarStyles: function (item, style, index) {
            let styleObj = {};
            let chartData = { ...item };
            chartData.w = style.width[index] || 1;
            chartData.x = parseFloat(item.x) + 20
            chartData.y = parseFloat(item.y) + index * 50
            chartData.fontSize = 10;
            chartData.h = undefined;

            for (let style in chartData) {
                if (commonStyles[style]) {
                    //if(commonStyles[style]){
                    styleObj[commonStyles[style]] = chartData[style];
                    if (cm_units.indexOf(commonStyles[style]) > -1) {
                        styleObj[commonStyles[style]] = chartData[style];
                    }
                    //}

                } else {
                    styleObj[style] = chartData[style];
                }
            }
            return styleObj;

        },
        getTableStyles: function (type, items = {}, colData = {}) {
            let styleObj = {};

            let type1 = items["tabletype"];
            let tabledata = tableconfig[type1];
            if (type === "header") {
                let [bgcolor, color, bold] = items.firstrowbg.split(",") || [];
                let obj = { ...tabledata.header, ...colData, fontFace: items.fontface, fill: bgcolor, color: color, bold: bold == 1 };

                return obj;
            }

            let tableDataFull = { ...items, ...tabledata };
            for (let style in tableDataFull) {
                if (commonStyles[style]) {
                    //if(commonStyles[style]){
                    styleObj[commonStyles[style]] = items[style];
                    if (cm_units.indexOf(commonStyles[style]) > -1) {
                        styleObj[commonStyles[style]] = items[style];
                    }

                    //}

                } else {
                    styleObj[style] = tableDataFull[style];
                    if (style === "fontface") {
                        styleObj["fontFace"] = items[style];
                    }

                }
            }
            return styleObj;
        }
    }

}
var ShapeFactory = Shapes();

var PPTExporter = function (pptx2) {
    var _tplConfig = {}, pptx;
    if (pptx2) {
        pptx = pptx2;
    } else {
        pptx = new PptxGenJS();
    }
    pptx.author = 'rahulsuthar';
    pptx.company = 'suthar';
    pptx.subject = 'Portfolio';
    pptx.title = 'Portfolio'
    pptx.layout = 'LAYOUT_WIDE';

    function generateMasterSlideS(type) {

        for (var slide in _tplConfig) {
            if (_tplConfig[slide].type === "master_slide") {
                let commonObj = getMasterItemsStyle(_tplConfig[slide].child);
                var obj = {
                    title: slide,
                    bkgd: 'FFFFFF',
                    objects: commonObj.child,
                    //  slideMargin: [3,3,3,3],
                    margin: [0, 0, 1, 0],
                    slideNumber: type == 3 ? {x: '95%', y: "6.9", color: "000000", fontSize: 10} : { x: '95%', y: "7.1", color: "FFFFFF", fontSize: 10 },
                    ...commonObj.styles
                };

                if (_tplConfig[slide].margin) {
                    let margin = _tplConfig[slide].margin.split(",");
                    let mar = [];
                    margin.forEach((mr) => {
                        mar.push(parseFloat(mr));
                    })
                    obj.margin = mar
                    //console.log(mar);
                }


                pptx.defineSlideMaster(obj);
            }
        }
    }

    function createChart(slide, item) {
        slide.addChart(pptx.charts.BAR, arrDataRegions, optsChartBar2);
    }


    function addElements(slide, items, data, overrideStyle) {
        for (var slideIndex = 0; slideIndex < items.length; slideIndex++) {
            try {
                var item = items[slideIndex];
                switch (item.type) {
                    case "Textbox":
                        if (item.key === "footer") {

                        }
                        // for dynamic styling
                        if(typeof(data[item.key]) == "object"){
                            item = {...item,...data[item.key].overrideObject}
                            data[item.key] = data[item.key]["text"]
                        }
                        slide.addText((data && data[item.key || ""]) || item["textstring"], ShapeFactory.getTextBoxStyles(item, true));
                        break;
                    case "LINK":

                        let textStr = (data && data[item.key || ""]) || item["textstring"];
                        let txtStls = ShapeFactory.getTextBoxStyles(item, true);

                        // console.log(txtStls);

                        let [linkUrl, tooltip] = item.extradata && item.extradata.split(",") || ["", ""];
                        txtStls.hyperlink = { url: linkUrl, tooltip: tooltip };

                        slide.addText(textStr, txtStls);
                        break;
                    case "Bullet":
                        let text2 = item["textstring"];
                        text2 = Array.isArray(text2) ? text2 : JSON.parse(text2);
                        let textData = []
                        text2.forEach((txt) => {
                            //  txt = txt + "\\n";
                            textData.push({ text: txt, options: { bullet: { type: 'number', style: 'alphaLcPeriod' } } })
                        })

                        let style2 = { ...ShapeFactory.getTextBoxStyles(item, true) };
                        //style2.bullet = {type:'number',  style:'alphaLcPeriod'}
                        slide.addText(
                            textData,
                            style2
                        )
                        // slide.addText(
                        //     textData,
                        //     { x: 8.0, y: 5.0, w: "30%", h: 1.4, color: "ABABAB", margin: 1 }
                        // );
                        //console.log(textData);
                        break;
                    case "Placeholder":

                        slide.addText(item["textstring"], { placeholder: "title" });
                        break;
                    case "Line":

                        slide.addText(item["textstring"], { placeholder: "title" });
                        break;
                    case "Styles":
                        let options = ShapeFactory.getTextBoxStyles(item);
                        for (let opt in options) {
                            if (options[opt]) {
                                slide[opt] = options[opt];
                            }
                        }
                        break;
                    case "Rectangle":
                        let styleRect = ShapeFactory.getTextBoxStyles(item);

                        let [lineSize, lineDash, line, rectRadius] = item.metadata && item.metadata.split(",") || [];
                        lineSize ? styleRect["lineSize"] = parseInt(lineSize) : ""
                        lineDash ? styleRect["lineDash"] = lineDash : ""
                        line ? styleRect["line"] = line : ""
                        rectRadius ? styleRect["rectRadius"] = rectRadius : ""

                        if (item["textstring"]) {
                            console.log("aaaa");
                            slide.addShape(pptx.ShapeType.rect, styleRect);
                            slide.addText((data[item.key]) || item["textstring"], { shape: pptx.ShapeType.rect, ...styleRect });
                        } else {
                            slide.addShape(pptx.ShapeType.rect, styleRect);
                        }
                        break;
                    case "Circle":

                        // var rect = { 'rect': { ...ShapeFactory.getTextBoxStyles(item), rectRadius: item.w / 2 } };
                        let style1 = ShapeFactory.getTextBoxStyles(item);
                        slide.addShape(pptx.ShapeType.ellipse, style1);

                        break;
                    case "FullTable1":
                        if (!(item.key && data[item.key])) {
                            if (!isNode2) console.log("No key set for item index ", i, "type", item.type, item);
                            //break;
                            break;
                        }
                        item.extradata = item.extradata || "";
                        let [x, y, w, h] = item.extradata.split(",");
                        x = parseFloat(x);
                        y = parseFloat(y);
                        w = parseFloat(w);
                        h = parseFloat(h);

                        let styles = {
                            masterSlideName: item.mastertemplate,
                            ...ShapeFactory.getTextBoxStyles(item),
                            h: undefined,
                            w: undefined,
                            newSlideStartY: 1,
                            autoPage: true,
                            //addHeaderToEach:true,

                            //addText: { text: "Dynamic Title", options: { x: 1, y: 0.5, color: "0088CC" }}
                            addText: { text: item["textstring"], options: { ...ShapeFactory.getTextBoxStyles(item), x, y, w, h } }

                        };
                        pptx.tableToSlides(data[item.key], styles);
                        //slide.addShape(pptx.ShapeType.rect, ShapeFactory.getTextBoxStyles(item));
                        break;
                    case "LineBar":
                        let boxStyle = ShapeFactory.getTextBoxStyles(item)
                        slide.addShape(pptx.ShapeType.rect, boxStyle);
                        let style = LinebarConfig[item["charttype"]];

                        if (!(item.key && data[item.key])) {
                            if (!isNode2) console.log("No key set for item index ", i, "type", item.type, item);
                            //break;
                            break;
                        }
                        var bars = data[item.key];

                        var maxValue = bars[0].value;
                        bars.forEach((elm, index) => {
                            if (elm.value > maxValue) {
                                maxValue = elm.value;
                            }
                        });

                        bars.forEach((elm, index) => {


                            let styleObj = ShapeFactory.getLineBarStyles(item, style, index)


                            let LineStyle = { ...styleObj };
                            LineStyle.x = LineStyle.x + style.width[index] + 0.2;
                            let mainY = LineStyle.y = LineStyle.y + (index * 0.015) + 0.15;
                            LineStyle.w = (boxStyle.w - LineStyle.w - 1) * elm.value / maxValue;

                            LineStyle.h = 0;
                            LineStyle.lineSize = style.thik[index];
                            LineStyle.line = style.barColors[index];


                            let styleObjRight = { w: 0.5, x: LineStyle.x + LineStyle.w + 0.25, fontSize: 10, y: styleObj.y };
                            //styleObjRight.align = "right";

                            slide.addText(elm.value + elm.suffix, styleObjRight);

                            slide.addShape(pptx.ShapeType.line, LineStyle);

                            slide.addText(elm.header, styleObj);

                        })



                        break;
                    case "Full background image":
                        break;
                    case "Chart":

                        let chartType = _chartConfig[item["charttype"]] && _chartConfig[item["charttype"]]["charttype"] || "BAR";
                        let styleChart = ShapeFactory.getChartStyles(item);
                        let st = { ...styleChart, ...(overrideStyle && overrideStyle[item.key]) };

                        if (data["chartData"][item.key]) {
                            st = JSON.parse(JSON.stringify(st))
                            //st = {...st,valAxisCrossesAt: -12,catAxisCrossesAt:-14}

                            if (st.valAxisInterval) {
                                let min = 0, max = 0;
                                let val = data["chartData"][item.key];

                                let [gap, point] = st.valAxisInterval.split(",")
                                val.forEach((ch) => {

                                    ch.values.forEach((el) => {
                                        if (!isNaN(el)) {
                                            if (el <= min) {
                                                min = el;
                                            }
                                            if (el >= max) {
                                                max = el;
                                            }
                                        }
                                    })
                                })
                                let interval = (1.2 * max - min) / gap;
                                interval = parseFloat(interval.toFixed(point))
                                st.valAxisMajorUnit = interval;
                            }

                            slide.addChart(pptx.charts[chartType], data["chartData"][item.key], { ...st });

                        }

                        break;
                    case "MultiChart":
                        let [primaryChartType, secondaryChartType] = item["charttype"].split(",");
                        let chartType1 = _chartConfig[primaryChartType] && _chartConfig[primaryChartType]["charttype"] || "BAR";
                        let chartType2 = _chartConfig[secondaryChartType] && _chartConfig[secondaryChartType]["charttype"] || "BAR";
                        let [key1, key2] = item.key.split(",");
                        let chart1Style = ShapeFactory.getChartStyles(item, primaryChartType);
                        let chart2Style = ShapeFactory.getChartStyles(item, secondaryChartType);
                        let Charts = [
                            {
                                type: pptx.charts[chartType1],
                                data: data["chartData"][key1],
                                options: { ...chart1Style }
                            }, {
                                type: pptx.charts[chartType2],
                                data: data["chartData"][key2],
                                options: { ...chart2Style, secondaryValAxis: true, secondaryCatAxis: true }
                            }];

                        let chartOpt = ShapeFactory.getChartStyles(item, primaryChartType);
                        chartOpt.valAxes = [{
                            showValAxisTitle: false,

                        }, {
                            showValAxisTitle: false,

                        }]
                        chartOpt.catAxes = [{
                            catAxisHidden: true,
                            catAxisLineShow: true,
                        }, {
                            catAxisHidden: false,
                            catAxisLineShow: false,
                        }]

                        chartOpt = { ...chartOpt, ...overrideStyle }


                        slide.addChart(Charts, chartOpt);

                        break;
                    case "Image2":
                    case "Image":

                        if(item.key && data[item.key]){
                            let st2 = ShapeFactory.getTextBoxStyles(item);
                            let uploadedImagePath = path.join(__dirname,'../../../public/pptLib/images/');
                            slide.addImage({...st2,path:uploadedImagePath + data[item.key]})
                        }

                        if (item.imgpath) {

                            let st2 = ShapeFactory.getTextBoxStyles(item)
                            slide.addImage({ ...st2, path: getImgPath() + item.imgpath });

                        }

                        //var objImg = { 'image': { 
                        // 		x:item.x, 
                        // 		y:item.y,
                        // 		 w:item.w.indexOf("%") > -1 ? item.w :item.w, 
                        // 		 h:item.h.indexOf("%") > -1 ? item.h :item.h, 
                        // 		 path:"bg.jpg"
                        // 	}
                        // };


                        break;
                    case "Row":
                        let tableStyleRow = ShapeFactory.getTableStyles("table", item);

                        let rowSingle = data[item.key];
                        if (rowSingle)
                            slide.addTable([rowSingle], tableStyleRow);
                        break;
                    case "Table":

                        if (!(item.key && data[item.key])) {
                            if (!isNode2) console.log("No key set for item index ", i, "type", item.slides);
                            break;
                        }

                        let dataRows = data[item.key].rows;
                        let type1 = item["tabletype"];
                        let tabledata = tableconfig[type1];
                    tabledata['autoPageLineWeight'] = item['autopagelineweight'] || tabledata['autoPageLineWeight'];
                        rows = [];
                        let header = [];
                        let wi = parseFloat(item.w);
                        let firstColWidth = (item.extradata);
                        if (typeof firstColWidth == 'string' && firstColWidth.indexOf(",") > -1) {
                            firstColWidth = (item.extradata.split(",")[0]).split(":")[1]
                        }
                        item.w = wi;
                        item.colW = [];
                        let blankColIndex = data[item.key].blankColIndex || [];
                        let gapIndex = data[item.key].gap || [];
                        let remainingWidth = item.w - parseFloat(firstColWidth || 0) - (blankColIndex.length * 0.1);
                        let firstHeader = data[item.key].header[0] || data[item.key].header;
                        let totalCols = 0;

                        firstHeader.forEach((col) => {
                            if (col.colspan) {
                                totalCols += (parseInt(col.colspan))
                            } else {
                                totalCols++;
                            }
                        });
                        let allColls = item.extradata
                        if (typeof allColls == 'string' && allColls.indexOf(",") > -1) {
                            data[item.key].width = data[item.key].width || {};
                            let colsS = allColls.split(",");
                            colsS.forEach((c) => {
                                let [indexCols, widthC] = c.split(":");
                                if (indexCols == "last") {
                                    data[item.key].width[totalCols - 1] = widthC
                                } else if (indexCols != 1) {
                                    data[item.key].width[parseInt(indexCols) - 1] = widthC
                                }

                            })

                        }

                        let predefinedWidth = 0;
                        let predefinedWidthObj = data[item.key].width || {};
                        for (let index in predefinedWidthObj) {
                            predefinedWidth += parseFloat(predefinedWidthObj[index]);
                        }


                        remainingWidth = ((remainingWidth - predefinedWidth) / (totalCols - 1 - blankColIndex.length - Object.keys(predefinedWidthObj).length))
                        for (let i = 0; i < totalCols; i++) {

                            if (i === 0 && firstColWidth) {

                                item.colW.push(parseFloat(firstColWidth));
                            }
                            else if (predefinedWidthObj[i]) {
                                item.colW.push(parseFloat(predefinedWidthObj[i]));
                            }
                            else if (gapIndex.indexOf(i) > -1) {
                                item.colW.push(0.1);
                            } else {
                                item.colW.push(remainingWidth);
                            }


                        }

                        if (data[item.key].colW) {
                            item.colW = data[item.key].colW;
                        }
                        //console.log( item.colW)
                        let rowH = [];
                        data[item.key].header.forEach(function (head, indexH) {
                            let rowHeader1 = [];
                            rowH.push(parseFloat(item.metadata || "0.46"));
                            head.forEach((elm) => { //elm column
                                let text, colData = {};
                                if (typeof elm === 'object') {
                                    text = elm.text;
                                    colData = elm;
                                } else {
                                    text = elm;
                                }
                                const ro = { text: text, ...colData, options: { ...ShapeFactory.getTableStyles("header", item, colData), ...elm.overrideObject } }

                                rowHeader1.push({ ...ro });

                            })

                            rows.push(rowHeader1);

                        })

                        let columStyles = tabledata.cols;
                        dataRows.forEach((row, index) => {
                            rowH.push(parseFloat(item.h || 0.236));
                            if (index % 2 === 1) {
                                row.forEach((col, colIndex) => {
                                    if (colIndex === 0 && item.charlimit && col.text) {
                                        let limit = parseInt(item.charlimit);
                                        if (col.text.length > limit) {
                                            col.text = col.text.substr(0, limit) + "..."

                                        }

                                    }
                                    let [bgcolor, color, bold, fontSize] = item.oddrowbg.split(",");
                                    if (fontSize) {
                                        col.options = { ...tabledata.oddRow, fill: bgcolor, color, bold: bold == 1, fontSize, ...col.overrideObject }

                                    } else {
                                        col.options = { ...tabledata.oddRow, fill: bgcolor, color, bold: bold == 1, ...col.overrideObject }

                                    }
                                    if (columStyles[colIndex]) {
                                        col.options = { ...col.options, ...columStyles[colIndex], ...col.overrideObject }
                                    }


                                    if (col.overrideKey && item[col.overrideKey]) {
                                        let [bgcolor, color, bold, fontSize] = item[col.overrideKey].split(",");
                                        if (fontSize) {
                                            col.options = { ...col.options, fill: bgcolor, color, bold: bold == 1, fontSize, ...col.overrideObject }

                                        } else {
                                            col.options = { ...col.options, fill: bgcolor, color, bold: bold == 1, ...col.overrideObject }

                                        }
                                        col.options = { ...col.options, fill: bgcolor, color, bold: bold == 1, ...col.overrideObject }
                                    }
                                    if (colIndex === 0 && item.colcolor1) {
                                        let [bgcolor, color, bold, fontSize] = item.colcolor1.split(",");
                                        if (fontSize) {
                                            col.options = { ...col.options, fill: bgcolor, color, bold: bold == 1, fontSize: fontSize }

                                        } else {
                                            col.options = { ...col.options, fill: bgcolor, color, bold: bold == 1 }

                                        }
                                    }
                                    if (colIndex === 1 && item.colcolor2) {
                                        let [bgcolor, color, bold, fontSize] = item.colcolor2.split(",");
                                        if (fontSize) {
                                            col.options = { ...col.options, fill: bgcolor, color, bold: bold == 1, fontSize: fontSize }

                                        } else {
                                            col.options = { ...col.options, fill: bgcolor, color, bold: bold == 1 }

                                        }
                                    }
                                    col.options = { ...col.options, rowspan: col.rowspan, colspan: col.colspan }

                                })
                            }
                            else {

                                row.forEach((col, colIndex) => {
                                    if (colIndex === 0 && item.charlimit && col.text) {
                                        let limit = parseInt(item.charlimit);
                                        if (col.text.length > limit) {
                                            col.text = col.text.substr(0, limit) + "..."

                                        }

                                    }
                                    let [bgcolor, color, bold, fontSize] = item.evenrowbg.split(",");
                                    if (fontSize) {
                                        col.options = { ...tabledata.oddRow, fill: bgcolor, color, bold: bold == 1, fontSize, ...col.overrideObject }

                                    } else {
                                        col.options = { ...tabledata.oddRow, fill: bgcolor, color, bold: bold == 1, ...col.overrideObject }

                                    }
                                    if (columStyles[colIndex]) {
                                        col.options = { ...col.options, ...columStyles[colIndex], ...col.overrideObject }
                                    }


                                    if (col.overrideKey && item[col.overrideKey]) {
                                        let [bgcolor, color, bold, fontSize] = item[col.overrideKey].split(",");
                                        if (fontSize) {
                                            col.options = { ...col.options, fill: bgcolor, color, bold: bold == 1, fontSize, ...col.overrideObject }

                                        } else {
                                            col.options = { ...col.options, fill: bgcolor, color, bold: bold == 1, ...col.overrideObject }

                                        }
                                        col.options = { ...col.options, fill: bgcolor, color, bold: bold == 1, ...col.overrideObject }
                                    }
                                    if (colIndex === 0 && item.colcolor1) {
                                        let [bgcolor, color, bold, fontSize, fontface] = item.colcolor1.split(",");
                                        if (fontSize) {
                                            col.options = { ...col.options, fill: bgcolor, color, bold: bold == 1, fontSize: fontSize, fontFace: fontface }

                                        } else {
                                            col.options = { ...col.options, fill: bgcolor, color, bold: bold == 1, fontFace: fontface }

                                        }
                                    }
                                    if (colIndex === 1 && item.colcolor2) {
                                        let [bgcolor, color, bold, fontSize] = item.colcolor2.split(",");
                                        if (fontSize) {
                                            col.options = { ...col.options, fill: bgcolor, color, bold: bold == 1, fontSize: fontSize }

                                        } else {
                                            col.options = { ...col.options, fill: bgcolor, color, bold: bold == 1 }

                                        }
                                    }
                                    col.options = { ...col.options, rowspan: col.rowspan, colspan: col.colspan }

                                })
                            }
                            if (item.lastrowbg && tabledata.lastRow && index === dataRows.length - 1) {
                                //final row
                                row.forEach((col, colIndex) => {
                                    if (columStyles[colIndex]) {
                                        col.options = { ...col.options, ...columStyles[colIndex], ...col.overrideObject }
                                        if (columStyles[colIndex].lastAlign) {
                                            col.options.align = columStyles[colIndex].lastAlign;
                                        }
                                    }
                                    if (colIndex === 0 && item.colcolor1) {
                                        let [bgcolor, color, bold, fontSize, fontface] = item.colcolor1.split(",");
                                        if (fontSize) {
                                            col.options = { ...col.options, fill: bgcolor, color, bold: bold == 1, fontSize: fontSize, fontFace: fontface }

                                        } else {
                                            col.options = { ...col.options, fill: bgcolor, color, bold: bold == 1, fontFace: fontface }

                                        }
                                    }
                                    if (colIndex === 1 && item.colcolor2) {
                                        let [bgcolor, color, bold, fontSize] = item.colcolor2.split(",");
                                        if (fontSize) {
                                            col.options = { ...col.options, fill: bgcolor, color, bold: bold == 1, fontSize: fontSize }

                                        } else {
                                            col.options = { ...col.options, fill: bgcolor, color, bold: bold == 1 }

                                        }
                                    }
                                    let [bgcolor, color, bold, fontSize, fontface] = item.lastrowbg.split(",");
                                    if (fontSize) {
                                        col.options = { ...tabledata.lastRow, fill: bgcolor, color, bold: bold == 1, fontSize, fontFace: fontface, ...col.overrideObject }

                                    } else {
                                        col.options = { ...tabledata.lastRow, fill: bgcolor, color, bold: bold == 1, fontFace: fontface, ...col.overrideObject }

                                    }

                                    col.options = { ...col.options, rowspan: col.rowspan, colspan: col.colspan }


                                })
                            }


                        })
                        var rows1 = rows.concat(dataRows);
                        //var rows1 = [...rows,...dataRows];



                        let tableStyle = ShapeFactory.getTableStyles("table", item);
                        tableStyle.fontSize = item.fontsize;
                        tableStyle.newSlideStartY = tableStyle.y;
                        tableStyle.autoPage = true;
                        tableStyle.rowH = rowH;
                        // tableStyle.verbose = true;
                        delete tableStyle["h"];
                        if (item.margin) {
                            let margin = item.margin.split(",")
                            tableStyle.margin = margin;

                        } else {
                            tableStyle.margin = undefined;

                        }
                        //tableStyle.margin = undefined;

                        if (tabledata.autoPage && item.autopage != 'false') {
                            tableStyle.autoPageSlideStartY = parseFloat(data[item.key].newSlideStartY || tableStyle.y);
                            tableStyle.autoPage = true;
                            tableStyle.autoPageRepeatHeader = true;
                            tableStyle.autoPageHeaderRows = data[item.key].header.length;
                        } else {
                            tableStyle.autoPage = false;
                        }

                        if (firstColWidth) {
                            delete tableStyle.w;
                        } else {
                            delete tableStyle.colW;
                        }
                        let a = slide.addTable(rows1, tableStyle);

                        break;


                }
            }
            catch (e) {
                console.log("error in", item.slides, item.type, e)
            }
        }

    }

    function createSlide(slide, data, overrideStyle) {
        if (_tplConfig[slide] == undefined) {
            if (!isNode2) console.log("Slide no ", slide, "not available ")
        } else {
            if (_tplConfig[slide].type !== "master_slide") {

                var slide1 = pptx.addSlide(_tplConfig[slide]["mastertemplate"]);
                slide1.name = slide;
                //var slide1 = pptx.addSlide();
                addElements(slide1, _tplConfig[slide].child, data, overrideStyle);
                return slide1;
            }
        }


    }


    function getMasterItemsStyle(items) {

        let obj = [];
        let apiData = CORE.apiData.slide1;
        let result = {};
        for (let slideIndex = 0; slideIndex < items.length; slideIndex++) {
            let item = items[slideIndex];
            switch (item.type) {
                case "Textbox":
                    let textVar = item["textstring"];

                    if (item.key) {
                        let keysV = item.key.split(",");
                        keysV.forEach((k) => {
                            textVar = textVar.replace("%" + k + "%", apiData[k])
                        })
                    }
                    var text = { 'text': { text: textVar, options: ShapeFactory.getTextBoxStyles(item) } };
                    obj.push(text)
                    break;
                case "Styles":
                    result.styles = ShapeFactory.getTextBoxStyles(item);
                    break;
                case "Rectangle":

                    var rect = { 'rect': ShapeFactory.getTextBoxStyles({ ...item }) };

                    obj.push(rect)

                    break;
                case "Circle":

                    var rect = { 'rect': { ...ShapeFactory.getTextBoxStyles(item), rectRadius: item.w / 2 } };
                    obj.push(rect)

                    break;

                case "Placeholder":

                    var pc = {
                        placeholder: {
                            options: { name: "title", type: "body", ...ShapeFactory.getTextBoxStyles(item) },
                            text: "(custom placeholder text!)",
                        }
                    };

                    obj.push(pc)

                    break;

                case "Image2":
                case "Image":

                    //var objImg = { 'image': { 
                    // 		x:item.x, 
                    // 		y:item.y,
                    // 		 w:item.w.indexOf("%") > -1 ? item.w :item.w, 
                    // 		 h:item.h.indexOf("%") > -1 ? item.h :item.h, 
                    // 		 path:"bg.jpg"
                    // 	}
                    // };

                    if (item.imgpath) {
                        var objImg = {
                            'image': {
                                x: item.x,
                                y: item.y,
                                w: `${item.w}`.indexOf("%") > -1 ? item.w : item.w,
                                h: `${item.h}`.indexOf("%") > -1 ? item.h : item.h,
                                path: getImgPath() + item.imgpath
                            }
                        };
                        obj.push(objImg)
                    }

                    break;


            }
        }
        result.child = obj;
        return result;

    }

    function formateJSONLocal([...tplmain], trim, trimSpace) {
        let tpl = [];
        let len = tplmain.length;
        for (let i = 0; i < len; i++) {
            let obj = {};
            for (let key in tplmain[i]) {
                if (tplmain[i][key] !== "") {

                    let key2 = key;
                    let mainKey = key;
                    if (trim) {
                        key2 = key2.split("-");
                        mainKey = "";
                        key2.forEach((k, index) => {
                            if (index == 0) {
                                mainKey = k.toLowerCase()
                            } else {
                                mainKey += k.capitalize();
                            }
                        })
                    } else if (trimSpace) {

                        mainKey = key.toLowerCase();
                        mainKey = mainKey.toLowerCase().replace(/_/g, "");


                    }
                    else {
                        mainKey = mainKey.toLowerCase().replace(/_/g, "");
                    }

                    if (tplmain[i][key] == "FALSE") {
                        obj[mainKey] = false;
                    }
                    else if (tplmain[i][key] == "TRUE") {
                        obj[mainKey] = true;
                    }
                    else if (mainKey == "dataBorder") {
                        let val = tplmain[i][key] && `${tplmain[i][key]}`.split("-") || [];
                        obj[mainKey] = {
                            pt: val[0],
                            color: val[1]
                        }
                    }
                    else if (mainKey === "chartColors" && tplmain[i][key]) {
                        try {
                            obj[mainKey] = `${tplmain[i][key]}`.split(",") || []

                        } catch (e) {
                            if (!isNode2) console.log(tplmain[i][key], mainKey)
                        }
                    }
                    else {
                        obj[mainKey] = tplmain[i][key];
                    }


                }

            }
            tpl.push(obj);
        }
        return tpl;
    }

    function formateJSON(tpl1, trim) {
        var tpl = []

        var len = tpl1.length;
        for (var i = 0; i < len; i++) {
            var obj = {};
            for (var key in tpl1[i]) {

                if (key.indexOf("gsx$") > -1 && tpl1[i][key]["$t"] != "") {
                    var key2 = key.substr(4);
                    var mainKey = key2;
                    if (trim) {
                        key2 = key2.split("-");
                        mainKey = "";
                        key2.forEach((k, index) => {
                            if (index == 0) {
                                mainKey = k.toLowerCase()
                            } else {
                                mainKey += k.capitalize();
                            }
                        })
                    }
                    if (tpl1[i][key]["$t"] == "FALSE") {
                        obj[mainKey] = false;
                    }
                    else if (tpl1[i][key]["$t"] == "TRUE") {
                        obj[mainKey] = true;
                    }
                    else if (mainKey == "dataBorder") {
                        let val = tpl1[i][key]["$t"].split("-");
                        obj[mainKey] = {
                            pt: val[0],
                            color: val[1]
                        }
                    }
                    else if (mainKey === "chartColors") {

                        obj[mainKey] = tpl1[i][key]["$t"].split(",")


                    }
                    else {
                        obj[mainKey] = tpl1[i][key]["$t"];
                    }


                }

            }
            tpl.push(obj);
        }
        return tpl;
    }
    function callApiPromis(api, local) {
        return new Promise((res, reject) => {
            if (local) {
                res([]);
            } else {
                if (isNode2) {
                    let options = {
                        uri: api,
                        method: 'GET',
                        json: true
                    }
                    let request = require('request');
                    request(options, function (error, response, body) {

                        if (error) console.log(error);
                        else res(body);
                    });
                } else {
                    $.getJSON(api, function (data) {
                        res(data);
                    });
                }

            }

        })
    }

    return {
        init: function ({ local, apiUrl, backend, backendData, type, slidePath }, callBack) {

            var api1 = callApiPromis(type == 2 ? urlMPSlide : urlSlide, local === true);
            var api2 = callApiPromis(urlChart, local === true);
            var api3 = callApiPromis(apiUrl, backend === true);
            //var api4 = callApiPromis(apiUrlPriceChart);


            Promise.all([api1, api2, api3]).then(([dataSlide, dataChart, apiData]) => {

                let tpl;
                if (backend)
                    apiData = backendData;
                if (local) {
                    tpl = formateJSONLocal(slideConfigGlobal, undefined, true)
                } else {
                    tpl = formateJSONLocal(dataSlide);
                }
                CORE.apiData = apiData.data;
                CORE.slideOrder = apiData.order;
                //CORE.priceData = priceData;
                let chartConfig;
                if (local) {

                    chartConfig = formateJSONLocal(chartConfigGlobal, true);

                } else {
                    chartConfig = formateJSONLocal(dataChart, true);
                }
                //console.log(chartConfig);

                //let chartConfig = formateJSONLocal(chartConfigGlobal) || formateJSON(dataChart.feed.entry,true);
                let leng = tpl.length;
                for (var i = 0; i < leng; i++) {

                    _tplConfig[tpl[i].slides] = _tplConfig[tpl[i].slides] || {};
                    _tplConfig[tpl[i].slides].type = _tplConfig[tpl[i].slides].type || "";
                    _tplConfig[tpl[i].slides]["mastertemplate"] = _tplConfig[tpl[i].slides]["mastertemplate"] || "";
                    _tplConfig[tpl[i].slides]["mastertemplate"] = tpl[i]["mastertemplate"];
                    _tplConfig[tpl[i].slides].type = tpl[i]["mastertemplate"] ? "" : "master_slide",
                        _tplConfig[tpl[i].slides].margin = tpl[i]["mastertemplate"] ? "" : _tplConfig[tpl[i].slides].margin || tpl[i].margin,
                        _tplConfig[tpl[i].slides].child = _tplConfig[tpl[i].slides].child || [];
                    _tplConfig[tpl[i].slides].child.push(tpl[i]);

                }


                var len = chartConfig.length;

                for (var i = 0; i < len; i++) {
                    _chartConfig[chartConfig[i].type] = _chartConfig[chartConfig[i].type] || {};
                    _chartConfig[chartConfig[i].type] = chartConfig[i];

                }
                for (var chart in _chartConfig) {
                    if (chart !== "Default") {

                        _chartConfig[chart] = { ..._chartConfig["Default"], ..._chartConfig[chart] }

                    }
                }
                generateMasterSlideS(type);
                callBack()
            })
            //createSlide();


        },
        createSlide: function (slide, data, overrideStyle) {
            createSlide(slide, data, overrideStyle)
        },
        get: function () {
            return _tplConfig;
        },
        createTable: function () {
            pptx.tableToSlides("table1", {
                addText: { text: "Dynamic Title", options: { x: 1, y: 0.5, color: "0088CC" } }
            });
        },
        download: function (name) {



            //createSlide();

            pptx.writeFile(name);
        },
        setPageIndex: function(indexPageName) {
            let slideIndex = -1;
            pptx._slides.forEach((s, idx) => {
                if (s.name == indexPageName) {
                    slideIndex = idx;
                }
            });
            if (slideIndex > -1) {
                pptx._slides[slideIndex].data.forEach(elem => {
                    if (elem && elem.text && elem.text.length && elem.text[0].text.indexOf('PageNumber')>-1) {
                        let slideNum = elem.text[0].text.replace('PageNumber', '');
                        let pageNum = -1;
                        pptx._slides.forEach((s, idx) => {
                            if (s.name == slideNum) {
                                pageNum = s.number;
                            }
                        });
                        if (pageNum > -1) {
                            elem.text[0].text = pageNum + '';
                        }
                    }
                })
            }
        },
        getStream: function () {
            return pptx.stream();
        },
        writeFile: function (path, cb) {
            pptx.writeFile(path).then(r => {
                cb({ status: true })
            }).catch(e => {
                cb({ status: false, msg: e })
            })
        }
    }

};






let isNode2;
if (typeof module !== 'undefined' && module.exports) {
    module.exports = PPTExporter;
    isNode2 = true;
} else {
    isNode2 = false;
}