const axios = require('axios').default;

function getPage(pageUrl) {
  return new Promise(function(resolve, reject) {
    axios.get(pageUrl)
    .then(function (response) {
      resolve(response.data);
    })
    .catch(function (response) {
      reject(response);
    });
  });
}

module.exports = getPage;
