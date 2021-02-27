const fs = require('fs');
const path = require('path');

const ICON_SIZE_THRESHOLD_KB = 0.5;
const ICON_DIR = path.join(__dirname);

function isIconValid(icon) {
  const fileSizeKB = icon.data.length / 1000;
  return fileSizeKB > ICON_SIZE_THRESHOLD_KB;
}

function saveToFile(icon) {
  const filePath = path.join(ICON_DIR, `testicon_${icon.name}${icon.ext}`);
  return new Promise(function(resolve, reject) {
    fs.writeFile(filePath, icon.data, function(error) {
      if (error) {
        reject(error);
        return;
      }
      resolve(filePath);
    });
  });
}

module.exports = {
  isIconValid, saveToFile
};
