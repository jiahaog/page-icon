const downloadIcon = require('./downloadIcon');

function downloadIcons(iconUrls) {
  const promises = iconUrls.map(downloadIcon);

  return Promise.all(promises)
  .then((iconPaths) => {
    return iconPaths.filter(element => !!element);
  });
}

module.exports = downloadIcons;
