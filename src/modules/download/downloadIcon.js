const axios = require('axios');
const url = require('url');
const fileType = require('file-type');
const imageSize = require('image-size');


function getExtension(downloadUrl) {
    return downloadUrl.match(/\.(png|jpg|ico)/)[0];
}

function getSiteDomain(siteUrl) {
    return url.parse(siteUrl).hostname;
}

function downloadIcon(iconUrl) {
    const iconData = new Promise(function(resolve, reject) {
        axios.get(iconUrl, {
            responseType: 'arraybuffer',
            //'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/48.0.2564.116 Safari/537.36'
        })
            .then(function(response) {
                resolve(response.data);
            })
            .catch(function(error) {
                if (error.status === 404) {
                    resolve();
                    return;
                }
                reject(error);
            });
    });

    return iconData.then(iconData => {
        if (!iconData) {
            return;
        }

        const fileDetails = fileType(iconData);
        if (!fileDetails) {
            return null;
        }

        // add `.` to ext
        fileDetails.ext = `.${fileDetails.ext}`;

        var dimension;
        try {
            dimension = imageSize(iconData);
        } catch (e) {
            dimension = { width: 0, height: 0 };
        }

        return Object.assign({
        	dimension: dimension,
            source: iconUrl,
            name: getSiteDomain(iconUrl),
            data: iconData,
            size: iconData.length
        }, fileDetails);
    });
}

module.exports = downloadIcon;
