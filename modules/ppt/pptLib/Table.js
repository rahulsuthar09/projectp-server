var Table = function () {
    let table = {
        table: {
            header: [],
            body: []
        }
    };

    let obj = {
        table: table,
        setData: function (data) {
            this.table.table.body = data;
        },
        getData: function () {
            return this.table.table.body;
        },
        getHeader: function () {
            return this.table.table.header;
        },
        getTable: function () {
            return this.table;
        },
        setHeaders: function (headers) {
            this.table.table.header = headers;
        },
        addRow: function (row) {
            this.table.table.body.push(row);
        },
        addSection: function (header, data) {
            let section = new Section();
            if (header != undefined)
                section.setHeader(header);
            section.setData(data || []);
            this.table.table.body.push(section.section);
        },
        // addSectionHeader: function (header) {

        // }

    };
    return obj;
}
var Section = function () {
    let section = {
        data: [],
        header: []
    };
    let obj = {
        section: section,
        addRow: function (row) {
            this.section.data.push(row);
        },
        setHeader: function (header) {
            if (header != undefined) {
                this.section.header = [];
                this.section.header = header;
            } else {
                delete this.section.header;
            }
        },
        setData: function (data) {
            this.section.data = data;
        }
    };
    return obj;
}
module.exports = Table;