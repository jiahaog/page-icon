# Page Icon

[![Build Status](https://travis-ci.org/jiahaog/page-icon.svg?branch=master)](https://travis-ci.org/jiahaog/page-icon)
[![Code Climate](https://codeclimate.com/github/jiahaog/page-icon/badges/gpa.svg)](https://codeclimate.com/github/jiahaog/page-icon)

A library to find the highest resolution website logo for a given url.

This a Javascript implementation of http://stackoverflow.com/a/22007642/5076225.

## Installation

Only supported on Node.js >=v4.2 because of promise support.

If support is desired for earlier versions, a global promise polyfill is required.

```bash
$ npm install --save page-icon
```

## Usage

```javascript
const pageIcon = require('page-icon');

const siteUrl = 'https://www.facebook.com/';
pageIcon(siteUrl)
    .then(function(icon) {
        // do things with icon object
        console.log(icon);
    })
    .catch(error => {
        console.error(error);
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
