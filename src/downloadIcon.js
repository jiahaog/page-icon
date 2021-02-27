const url = require('url');

const axios = require('axios').default;
const fileType = require('file-type');

/**
 * @param {string} siteUrl 
 */
function getSiteDomain(siteUrl) {
  return url.parse(siteUrl).hostname;
}

/**
 * @param {string} iconUrl 
 */
async function downloadIcon(iconUrl) {
  let iconResponse;
  try {
    iconResponse = await axios.get(iconUrl, {
      responseType: 'arraybuffer',
      //'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/48.0.2564.116 Safari/537.36'
    });
  } catch (error) {
    if (error.response && error.response.status === 404) {
      return null;
    }
    throw error;
  }

  const iconData = await iconResponse.data;
  if (!iconData) {
    return null;
  }

  const fileDetails = await fileType.fromBuffer(iconData);
  if (!fileDetails) {
    return null;
  }

  return {
    source: iconUrl,
    name: getSiteDomain(iconUrl),
    data: iconData,
    size: iconData.length,
    ext: `.${fileDetails.ext}`, // add `.` to ext
    mime: fileDetails.mime,
  };
}

module.exports = downloadIcon;
