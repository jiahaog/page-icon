const fs = require('fs');
const path = require('path');
const url = require('url');

const chai = require('chai');

const pageIcon = require('../src/index');
const { isIconValid, saveToFile } = require('./helpers');

const SITE_URLS = [
  'https://www.facebook.com/',
  'http://stackoverflow.com/questions/16301503/can-i-use-requirepath-join-to-safely-concatenate-urls',
  'https://web.whatsapp.com'
];

const HTTP_TEST_URL = 'http://web.whatsapp.com';
const ICON_TYPE_URL = 'https://web.whatsapp.com';

describe('Page Icon', function() {
  this.timeout(10000);

  it('Can download all icons', function(done) {
    const downloadTests = SITE_URLS.map(function(siteUrl) {
      return new Promise(function(resolve, reject) {
        pageIcon(siteUrl)
        .then(function(icon) {
          if (!icon) {
            throw `No icon found for url: ${siteUrl}`;
          }

          return icon;
        })
        .then(function(icon) {
          chai.expect(isIconValid(icon)).to.be.true;
          return icon;
        })
        .then(saveToFile)
        .then(() => {
          resolve();
        })
        .catch(reject);
      });
    });

    Promise.all(downloadTests)
    .then(function() {
      done();
    })
    .catch(done);
  });

  it('Can try to https if nothing is found at http', function(done) {
    pageIcon(HTTP_TEST_URL)
    .then(function(icon) {
      if (!icon) {
        throw `No icon found for url: ${HTTP_TEST_URL}`;
      }
      return icon;
    })
    .then(function(icon) {
      chai.expect(isIconValid(icon)).to.be.true;
      done()
    })
    .catch(done);
  });

  describe('Specification of preferred icon ext', function () {
    it('Type .png', function(done) {
      iconTypeTest('.png', done);
    });

    it('Type .ico', function (done) {
      iconTypeTest('.ico', done);
    });
  });
});

function iconTypeTest(ext, callback) {
  pageIcon(ICON_TYPE_URL, {ext: ext})
  .then(function(icon) {
    if (!icon) {
      throw `No icon found for url: ${ICON_TYPE_URL}`;
    }
    return icon;
  })
  .then(function(icon) {
    chai.expect(icon.ext).to.equal(ext, `Should get a ${ext} from WhatsApp`);
    return icon;
  })
  .then(() => {
    callback();
  })
  .catch(callback);
}
