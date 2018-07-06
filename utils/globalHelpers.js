const _ = require('lodash');
const moment = require('moment');

const uniqueID = function() {
    // always start with a letter (for DOM friendlyness)
    var idstr = String.fromCharCode(Math.floor((Math.random() * 25) + 65));
    do {
        // between numbers and characters (48 is 0 and 90 is Z (42-48 = 90)
        var ascicode = Math.floor((Math.random() * 42) + 48);
        if (ascicode < 58 || ascicode > 64) {
            // exclude all chars between : (58) and @ (64)
            idstr += String.fromCharCode(ascicode);
        }
    } while (idstr.length < 32);

    return (idstr);
}

const convertTimestampToDate = (timestamp) => {
  return moment.unix(timestamp.seconds).toDate();
}

const paginate = (items, page, perPage = 10) => {
  var page = page || 1;
  var chunked = _.chunk(items, perPage);
  var totalPages = chunked.length;
  var data = page <= totalPages ? chunked[page-1] : []
  return {
    page: page,
    per_page: perPage,
    total: items.length,
    total_pages: totalPages,
    data: data,
  };
}

// This function basically defines how long to keep a cache. 
// Change the amount of time to fit your need.
const getValidCacheTime = () => {
  return moment().subtract(3, 'hours');
}

const normalizeName = (name) => {
  return name.toLowerCase().replace('-', " ");
}

const unescapeFirebaseForbiddenChars = (str) => {
  const keyMap = {
    ".": "·",
    "$": "﹩",
  }
  Object.keys(keyMap).map(key => {
    str = str.replace(keyMap[key], key);
  });
  return str;
}

module.exports = {
  uniqueID,
  paginate,
  convertTimestampToDate,
  getValidCacheTime,
  normalizeName,
  unescapeFirebaseForbiddenChars,
}
