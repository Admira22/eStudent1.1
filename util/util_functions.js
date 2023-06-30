const DataUriParser = require('datauri/parser');

const utilFunctions = {
    dataUri: function (name, file) {
        const parser = new DataUriParser();
        return parser.format(name.slice(-4), file).content;
    }
}
module.exports = utilFunctions;