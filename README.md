# Page Icon

[![Build Status](https://github.com/nativefier/page-icon/workflows/ci/badge.svg)](https://github.com/nativefier/page-icon/actions?query=workflow%3Aci)

A library to find the highest resolution website logo for a given url.

This a Javascript implementation of http://stackoverflow.com/a/22007642/5076225.

## Installation

Requires Node.js >= 10.

```bash
$ npm install --save page-icon
```

## Usage

```javascript
const pageIcon = require('page-icon');

const URL = 'https://www.facebook.com/';
pageIcon(siteUrl)
    .then(function(icon) {
        // do things with icon object
        console.log(icon);
    })
    .catch(error => {
        console.error(error);
    });
});
```

#### Example Icon Object

```javascript
{ 
    source: 'https://www.facebook.com/apple-touch-icon.png',
    name: 'www.facebook.com',
    data: <Buffer 89 50 4e ... >,
    size: 1779,
    ext: '.png',
    mime: 'image/png' 
}
```

## Tests

```bash
$ npm test
```

## License

MIT
