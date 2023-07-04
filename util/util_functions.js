const DataUriParser = require('datauri/parser');

const utilFunctions = {
    dataUri: function (name, file) {
        const parser = new DataUriParser();
        return parser.format(name.slice(-4), file).content;
    },
    checkIfContainsForbiddenWords: function (words, text) {
        let contains = false;
        text = text.split(" ");
        text.forEach(x => {
            words.forEach(y => {
                if (x.toLowerCase() === y.word.toLowerCase())
                    contains = true;
            })
        })
        return contains;
    }
}
module.exports = utilFunctions;