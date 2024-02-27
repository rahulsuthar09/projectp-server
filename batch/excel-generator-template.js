const ExcelJS = require('exceljs');
const moment = require('moment');
const fs = require('fs');
const path = require('path');

const Utils = require('../public/js/commonUtils')();

//entry point
try {
    //var args = process.argv;
    generateExcel().then(d => process.exit(0));

} catch (error) {
    console.log('Something went wrong');
    console.log(error);
    process.send && process.send({ status: false, msg: error.message });
    process.exit(0);
}


async function generateExcel() {
    try {
        //Create a new workbook
        const workBook = new ExcelJS.Workbook();

        //prepare data - in object format (get data from records)
        let { data } = await prepareData();
        let sheets = ['Records'];
        for (const sheetName of sheets) {
            const workSheet = workBook.addWorksheet(sheetName);

            //header
            let headersArray = ['Fname', 'Lname'];
            const headerRow = workSheet.addRow(headersArray);

            //gloabal sheet formatting
            workSheet.eachRow({ includeEmpty: true }, (row, rowNumber) => {
                row.eachCell((cell, colNumber) => {
                    // Apply global formatting here
                    cell.font = { bold: true, italic: false, size: 11, color: { argb: 'FF0000FF' } };
                    cell.alignment = { vertical: 'middle', horizontal: 'center', wrapText: true, textRotation: 0 };
                    cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: rowNumber === 1 ? 'FFFF00' : 'FFFFFFFF' } };
                    cell.border = {

                        // style: thin | thick | medium | dotted | dashed | double 
                        top: { style: 'thin', color: { argb: 'FF000000' } }, // Black thin border
                        left: { style: 'thin', color: { argb: 'FF000000' } },
                        bottom: { style: 'thin', color: { argb: 'FF000000' } },
                        right: { style: 'thin', color: { argb: 'FF000000' } }
                    };
                    /* 
                        for display - format numbers to 0 decimal place and -ve no in paranthesis
                        eg: 1.24 --> 1
                            -1.24 --> (1)
                    */
                    cell.numFmt = '0;(0)';

                    if (colNumber == 1) { }
                    if (rowNumber == 1) { }
                    if (cell.text) { }
                });
            });

            //headers formatting
            let headerAlign = [];
            headerRow.eachCell({ includeEmpty: false }, (cell, colNumber) => {
                // Add gray background to header
                cell.fill = {
                    type: 'pattern',
                    pattern: 'solid',
                    fgColor: { argb: '808080' }, // gray background color
                };

                // Make content white and bold for the header
                cell.font = { color: { argb: 'FFFFFF' }, bold: true };

                // Set border for the entire table
                cell.border = {
                    top: { style: 'thin' },
                    left: { style: 'thin' },
                    bottom: { style: 'thin' },
                    right: { style: 'thin' },
                };

                // Center align content
                if (headerAlign.includes(cell.text)) {
                    cell.alignment = { vertical: 'middle', horizontal: 'right', wrapText: true };
                } else {
                    cell.alignment = { vertical: 'middle', horizontal: 'left', wrapText: true };
                }

                //Set column width
                workSheet.getColumn(colNumber).width = 18;
            });

            //sheet body data
            switch (sheetName) {
                case '':
                    break;
                default:
                    // pass rowStart & colStart in createSheetData for merge cols positons
                    let { dataRows, mergeRowsData } = createSheetData(data, sheetName);
                    addDataRowsWithStyling(workSheet, dataRows, sheetName, headerRow, mergeRowsData);
            }

        }

        let fileName = 'result.xlsx';
        // Save the workbook to a file
        await workBook.xlsx.writeFile(path.join(__dirname, '../' + fileName));
        console.log('Excel File Generated Successfully!');

        // send signal to parent process if there any
        process.send && process.send({ status: true, msg: 'File Generated Successfully' });

    } catch (error) {
        console.log(error);
        process.send && process.send({ status: false, msg: error.message });
    }
}

async function prepareData() {
    try {
        const data = {};

        return { data };
    } catch (error) {
        console.log(error)
        return {};
    }
}

function addDataRowsWithStyling(sheet, dataRows, sheetName, headerRow, mergeRowsData = {}) {
    /*
        sheet: workBook sheet
        dataRows: array of array - data to be added
        sheetName: sheetName of sheet
    */

    // sheet.views - for frozen header
    sheet.views = [
        {
            state: 'frozen',
            ySplit: 1,  // first row frozen 
            xSplit: 1   // first column frozen
        }
    ];

    dataRows.forEach((rowData, index) => {
        const row = sheet.addRow(rowData);

        let totalRowsFlag = false;

        // check if current row is total rows or not
        if (row._cells && row._cells.length && ((row._cells[0] && row._cells[0].toString().toLowerCase() == 'overall total') || (row._cells[0] && row._cells[0].toString().toLowerCase() == 'total') || (row._cells[1] && row._cells[1].toString().toLowerCase() == 'total'))) {
            totalRowsFlag = true;
        }
        row.eachCell({ includeEmpty: false }, (cell, colNumber) => {
            // Set border for the entire table
            cell.border = {
                top: { style: 'thin' },
                left: { style: 'thin' },
                bottom: { style: 'thin' },
                right: { style: 'thin' },
            };

            if (totalRowsFlag)
                cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'D9D9D9' } };

            //last row of sheet 
            if (totalRowsFlag && index == dataRows.length - 1)
                cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'E8F5F8' } };

            //first column styling
            if (colNumber == 1) {
            }
        });
    });

    if (mergeRowsData && mergeRowsData.length) {
        // sheet.mergeCells(startRow, startCol, endRow, endCol);
        for(let mData of mergeRowsData){
            let {startRow, startCol, endRow, endCol} = mData;
            sheet.mergeCells(startRow, startCol, endRow, endCol);
        }
    }
}

function createSheetData(data, sheetName, rowStart = 1, colStart = 0) {
    //rowStart, colStart - starting point of records - for merge cell positons
    try {
        let dataRows = [];
        let mergeRowsData = []
        dataRows = [['Rahul', 'Suthar']]
        // dataRows: returns as array of array
        
        
        // push merge cell records
        // mergeRowsData.push({
        //     startRow: '',
        //     startCol: '',
        //     endRow: '',
        //     endCol: ''
        // })
        return { dataRows, mergeRowsData }
    } catch (error) {
        console.log(error)
        return { dataRows, mergeRowsData }
    }
}
