var tableconfig = {
	"Table1": {
		autoPage: true,
		w: undefined,
		valign: 'm',
		bg: "F7F7F7",
		color: "000000",
		align: "center",
		firstHeaderAlign: "left",
		autoPageLineWeight: -0.2,
		cols: [
			{
				align: "left",
				bold: false,
				margin: [0, 0, 0, 4]
			}
		],
		oddRow: {
			fill: 'e2e2e2',
			bold: false,
			color: '000000',
            border: [{ color: '000000', type: 'solid', pt: 0.3 }, { color: 'FFFFFF', pt: 0 }, { color: '000000', type: 'solid', pt: 0.1 }, { color: 'FFFFFF', pt: 0 }],

		},
		lastRow: {
			fill: '808284',
			bold: false,
			color: 'FFFFFF',
            border: [{ color: '000000', type: 'solid', pt: 0.3 }, { color: 'FFFFFF', pt: 0 }, { color: '000000', type: 'solid', pt: 0.3 }, { color: 'FFFFFF', pt: 0 }],
		},
		evenRow: {
			fill: 'FFFFFF',
			bold: false,
			color: '000000',
            border: [{ color: '000000', type: 'solid', pt: 0.3 }, { color: 'FFFFFF', pt: 0 }, { color: '000000', type: 'solid', pt: 0.1 }, { color: 'FFFFFF', pt: 0 }],
			align: "left",
		},
        border: { type: 'solid', pt: '1', color: 'e8e8e8' },
		header: {
			fill: 'E0C37D',
			bold: true,
			color: '000000',
			fontFace: 'Roboto',
            border: [{ 'pt': 0.5, type: 'solid', color: '000000' }, { color: 'FFFFFF', 'pt': 0 }, { 'pt': 0.5, type: 'solid', color: '000000' }, { color: 'FFFFFF', 'pt': 0 }],
        }
    },
    'TableNoAutoPage': {
        autoPage: false,
        w: undefined,
        valign: 'm',
        bg: 'F7F7F7',
        color: '000000',
        align: 'center',
        firstHeaderAlign: 'left',
        autoPageLineWeight: 0.2,
        cols: [
            {
                align: 'left',
                bold: false,
                margin: [0, 0, 0, 4]
            },
            {
                align: 'left',
                bold: false,
                margin: [0, 0, 0, 4]
            }
        ],
        oddRow: {
            fill: 'e2e2e2',
            bold: false,
            color: '000000',
            border: [{ color: '000000', type: 'solid', pt: 0.3 }, { color: 'FFFFFF',pt: 0 }, { color: '000000', type: 'solid', pt: 0.1 }, { color: 'FFFFFF',pt: 0 }],

        },
        lastRow: {
            fill: '808284',
            bold: false,
            align: 'center',
            color: 'FFFFFF',
            border: [{ color: '000000', type: 'solid', pt: 0.3 }, {color: 'FFFFFF', pt: 0 }, { color: '000000', type: 'solid', pt: 0.3 }, { color: 'FFFFFF',pt: 0 }],
        },
        evenRow: {
            fill: 'FFFFFF',
            bold: false,
            color: '000000',
            border: [{ color: '000000', type: 'solid', pt: 0.3 }, { color: 'FFFFFF',pt: 0 }, { color: '000000', type: 'solid', pt: 0.1 }, { color: 'FFFFFF',pt: 0 }],
            align: 'left',
        },
        border: { type: 'solid', pt: '1', color: 'e8e8e8' },
        header: {
            fill: 'E0C37D',
            bold: true,
            color: '000000',
            fontFace: 'Roboto',
            border: [{ 'pt': 0.5, type: 'solid', color: '000000' }, { color: 'FFFFFF','pt': 0 }, { 'pt': 0.5, type: 'solid', color: '000000' }, { color: 'FFFFFF','pt': 0 }],
		}
	},
	"Table1Normal": {
		autoPage: true,
		w: undefined,
		valign: 'm',
		bg: "F7F7F7",
		color: "000000",
		align: "center",
		firstHeaderAlign: "left",
		autoPageLineWeight: 0.7,
		cols: [
			{
				align: "left",
				bold: false,
				margin: [0, 0, 0, 4]
			}
		],
		oddRow: {
			fill: 'e2e2e2',
			bold: false,
			color: '000000'
		},
		lastRow: {
			fill: '808284',
			bold: true,
			color: 'FFFFFF',
			align: "center",
		},
		evenRow: {
			fill: 'FFFFFF',
			bold: false,
			color: '000000'
		},
		//border: { type: "solid", pt: "1", color: "e8e8e8" },
		header: {
			fill: 'E0C37D',
			bold: true,
			color: '000000',
			fontFace: 'Roboto'
		},


	},
	"disclaimerTable": {
		autoPage: false,
		w: undefined,
		valign: 'm',
		bg: "F7F7F7",
		color: "000000",
		align: "left",
		firstHeaderAlign: "left",

		cols: [
			{
				align: "left",
				bold: true,
				margin: [0, 0, 0, 4],
				italic: true
			},
			{
				align: "left",
				bold: false,
				margin: [0, 0, 0, 4],


			}

		],
		border: { type: "solid", pt: "1", color: "000000" },
		header: {
			fill: 'E0C37D',
			bold: false,
			color: '000000',
			fontFace: 'Roboto'
		}


	},
	"Table2": {
		autoPage: false,
		w: undefined,
		valign: 'm',
		bg: "F7F7F7",
		color: "000000",
		align: "center",
		firstHeaderAlign: "left",

		cols: [
			{
				align: "left",
				bold: true,
				margin: [0, 0, 0, 4]
			}
		],
		oddRow: {
			fill: 'e2e2e2',
			bold: false,
			color: '000000'
		},
		lastRow: {
			fill: '808284',
			bold: false,
			color: 'FFFFFF',
			align: "center",
		},
		evenRow: {
			fill: 'FFFFFF',
			bold: false,
			color: '000000'
		},
		border: { type: "solid", pt: "1", color: "e8e8e8" },
		header: {
			fill: 'E0C37D',
			bold: true,
			color: '000000',
			fontFace: 'Roboto'
		}


	},
	"Table2Normal": {
		autoPage: false,
		w: undefined,
		valign: 'm',
		bg: "F7F7F7",
		color: "000000",
		align: "center",
		firstHeaderAlign: "left",

		cols: [
			{
				align: "left",
				bold: false,
				margin: [0, 0, 0, 4]
			}
		],
		oddRow: {
			fill: 'e2e2e2',
			bold: false,
			color: '000000'
		},
		lastRow: {
			fill: '808284',
			bold: true,
			color: 'FFFFFF',
			align: "center",
		},
		evenRow: {
			fill: 'FFFFFF',
			bold: false,
			color: '000000'
		},
		border: { type: "solid", pt: "1", color: "e8e8e8" },
		header: {
			fill: 'E0C37D',
			bold: true,
			color: '000000',
			fontFace: 'Roboto'
		}


	},
	"Table3": {
		autoPage: true,
		w: undefined,
		valign: 'm',
		bg: "F7F7F7",
		color: "000000",
		align: "center",
		firstHeaderAlign: "left",
		autoPageLineWeight: 0.6,
		cols: [
			{
				align: "left",
				bold: false,
				margin: [0, 0, 0, 4]
			}
		],
		oddRow: {
			fill: 'e2e2e2',
			bold: false,
			color: '000000',
            border: [{ color: '000000', type: 'solid', pt: 0.3 }, { color: 'FFFFFF',pt: 0 }, { color: '000000', type: 'solid', pt: 0.1 }, { color: 'FFFFFF',pt: 0 }],

		},
		lastRow: {
			fill: '808284',
			bold: false,
			color: 'FFFFFF',
            border: [{ color: '000000', type: 'solid', pt: 0.3 }, { color: 'FFFFFF',pt: 0 }, { color: '000000', type: 'solid', pt: 0.3 }, { color: 'FFFFFF',pt: 0 }],
		},
		evenRow: {
			fill: 'FFFFFF',
			bold: false,
			color: '000000',
            border: [{ color: '000000', type: 'solid', pt: 0.3 }, {color: 'FFFFFF', pt: 0 }, { color: '000000', type: 'solid', pt: 0.1 }, { color: 'FFFFFF',pt: 0 }],
			align: "left",
		},
        border: { type: 'solid', pt: '1', color: 'e8e8e8' },
		header: {
			fill: 'E0C37D',
			bold: true,
			color: '000000',
			fontFace: 'Roboto',
            border: [{ 'pt': 0.5, type: 'solid', color: '000000' }, { color: 'FFFFFF','pt': 0 }, { 'pt': 0.5, type: 'solid', color: '000000' }, { color: 'FFFFFF','pt': 0 }],
        }
	},

	"Table4": {
		//colW:1.5,
		autoPage: true,
		w: undefined,
		valign: 'm',
		bg: "F7F7F7",
		color: "000000",
		align: "left",
		firstHeaderAlign: "left",
		autoPageLineWeight: 0.6,
		cols: [
			{
				align: "left",
				bold: false,
				margin: [0, 0, 0, 4]
			}
		],
		oddRow: {
			fill: 'e2e2e2',
			bold: false,
            border: [{ color: '000000', type: 'solid', pt: 0.3 }, { color: 'FFFFFF',pt: 0 }, { color: '000000', type: 'solid', pt: 0.1 }, { color: 'FFFFFF',pt: 0 }],
		},
		lastRow: {
			fill: '808284',
			bold: false,
			color: 'FFFFFF',
            border: [{ color: '000000', type: 'solid', pt: 0.3 }, { color: 'FFFFFF',pt: 0 }, { color: '000000', type: 'solid', pt: 0.3 }, { color: 'FFFFFF',pt: 0 }],
		},
		evenRow: {
			fill: 'FFFFFF',
			bold: false,
            border: [{ color: '000000', type: 'solid', pt: 0.3 }, { color: 'FFFFFF',pt: 0 }, { color: '000000', type: 'solid', pt: 0.1 }, { color: 'FFFFFF',pt: 0 }],
			align: "left",
		},
        border: { type: 'solid', pt: '1', color: 'e8e8e8' },
		header: {
			fill: 'E0C37D',
			bold: true,
			color: '000000',
			fontFace: 'Roboto',
            border: [{ 'pt': 0.5, type: 'solid', color: '000000' }, { color: 'FFFFFF','pt': 0 }, { 'pt': 0.5, type: 'solid', color: '000000' }, { color: 'FFFFFF','pt': 0 }],
        }
	},

}

let isNode;
if (typeof module !== 'undefined' && module.exports) {
	module.exports = tableconfig;
	isNode = true;
} else {
	isNode = false;
}