module.exports = {
  "env": {
    "es6": true,
    "node": true,
    "mocha": true
  },
  "extends": [
    "eslint:recommended",
    "airbnb-base"
  ],
  "parserOptions": {
    "sourceType": "module"
  },
  "rules": {
    "indent": [
      "error",
      4
    ],
    "linebreak-style": [
      "error",
      "unix"
    ],
    "max-len": [
      "error",
      150
    ],
    "quotes": [
      "error",
      "single"
    ],
    "semi": [
      "error",
      "never"
    ],
    "arrow-body-style": [
      "off"
    ],
    "no-underscore-dangle": [
      "off"
    ]
  }
};
