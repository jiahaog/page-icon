const fs = require('fs');
const path = require('path');

const chai = require('chai');

const downloadIcon = require('../src/downloadIcon');

const ICON_URL = 'https://web.whatsapp.com/favicon.ico';
const NOT_ICON_URL = 'https://nativefier.github.io/nativefier-icons';
const STATUS_NOT_FOUND_URL = 'https://nativefier.github.io/nativefier-icons/pleasegivemea404';

const ICON_PATH = path.join(__dirname, 'testicon_single.ico');

describe('Download Icons', function() {
  this.timeout(10000);
  it('Can download icons', function(done) {
    downloadIcon(ICON_URL)
    .then(icon => {
      if (!icon) {
        throw 'Icon not found';
      }
      fs.writeFileSync(ICON_PATH, icon.data);
      done();
    })
    .catch(done);
  });

  it('Returns null if icon is not found', function(done) {
    downloadIcon(NOT_ICON_URL)
    .then(icon => {
      chai.expect(icon).to.equal(null, 'Invalid icon should return null');
      done();
    })
    .catch(done);
  });

  it('Returns null if the URL returns a 404', function(done) {
    downloadIcon(STATUS_NOT_FOUND_URL)
    .then(icon => {
      chai.expect(icon).to.equal(null, 'Invalid icon should return null');
      done();
    })
    .catch(done);
  });
});
