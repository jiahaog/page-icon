function sortIconsBySize(icons) {
  return icons.sort((a, b) => {
    if (a.size < b.size) {
      return 1;
    } else {
      return -1;
    }
  });
}

function findBestIcon(icons, ext) {
  const sorted = sortIconsBySize(icons);
  if (ext) {
    for (let icon of sorted) {
      if (icon.ext === ext) {
        return icon;
      }
    }
  }

  return sorted[0];
}

module.exports = findBestIcon;
