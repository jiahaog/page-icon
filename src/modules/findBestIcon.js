function checkSquareDimension(dimension) {
    if (dimension == null || dimension.width <= 0 || dimension.height <= 0) {
        return false;
    }

    return dimension.width === dimension.height;
}

function compareByDimension(a, b) {
	var ra = checkSquareDimension(a.dimension);
    var rb = checkSquareDimension(b.dimension);

    if (rb == true && ra == false) {
    	return 1;
    } else if (rb == false && ra == true) {
    	return -1;
    }

   	return b.dimension.width - a.dimension.width;
}

function sortIconsByDimension(icons) {
    return icons.sort(compareByDimension);
}

function sortIconsBySize(icons) {
    return icons.sort(function (a, b) {
        return b.size - a.size;
    });
}

/**
 *
 * @param icons
 * @param [ext]
 */
function findBestIcon(icons, ext) {
    var sortingFunc = ext == '.ico' ? sortIconsBySize : sortIconsByDimension; //image-size doesn't support .ico.
	var sorted = sortingFunc(icons);

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
