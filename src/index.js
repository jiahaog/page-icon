const url = require('url');

const downloadIcons = require('./downloadIcons');
const findBestIcon = require('./findBestIcon');
const getIconLinks = require('./getIconLinks');
const getPage = require('./getPage');

function isHttps(pageUrl) {
  return url.parse(pageUrl).protocol === 'https:';
}

function makeHttps(pageUrl) {
  const parsed = url.parse(pageUrl);
  parsed.protocol = 'https:';
  return url.format(parsed);
}

function main(pageUrl, options={}) {

  const bestWithPref = function(icons) {
    return findBestIcon(icons, options.ext);
  };

  return getPage(pageUrl)
  .then(function (dom) {
    return getIconLinks(pageUrl, dom);
  })
  .then(downloadIcons)
  .then(bestWithPref)
  .then(result => {
    if (result || isHttps(pageUrl)) {
      return result;
    }

    const httpsUrl = makeHttps(pageUrl);
    return main(httpsUrl, options);
  });
}

module.exports = main;
