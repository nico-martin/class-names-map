# classNames Map

"ClassNames Map" a [Webpack](https://webpack.js.org/) / [css-loader](https://webpack.js.org/loaders/css-loader/) plugin
that shortens the classNames of imported css modules based on a configurable character map. The idea is that each
className consists of only one letter. This allows classNames to be extremely shortened without any disadvantages in
productive operation.

This is possible because this plugin takes advantage of CSS modules that are imported with the css-loader. By default,
css-loader creates a unique class that is set in the markup, as well as in the CSS. In this function "classNames Map"
hooks in and creates its own CSS class based on configurable characters.

**Before**

```html

<div class="MyCSSModule__root--35HSF">
    <p class="MyCSSModule__description--ieml4">Hello World</p>
    <img class="MyCSSModule__image--62j3I MyImageCSSModule__root--9ik2w" alt="My Image" src="..."/>
</div>
```

**After**

```html

<div class="a">
    <p class="b">Hello World</p>
    <img class="c d" alt="My Image" src="..."/>
</div>
```

## Installation

```
npm install @nico-martin/class-names-map --save-dev
```

## Konfiguration

```js
// webpack.config.js
const getLocalIdent = require('@nico-martin/class-names-map/css-loader');

module.exports = (env, argv) => {
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [
          "style-loader",
          {
            loader: 'css-loader',
            modules: {
              localIdentName: '[name]__[local]--[hash:base64:5]',
              getLocalIdent: getLocalIdent(/* options */)
            }
          }
        ],
      },
    ]
  }
};
```

### development build

It makes sense to only apply this plugin to production builds

```js
// webpack.config.js
const getLocalIdent = require('@nico-martin/class-names-map/css-loader');

module.exports = (env, argv) => {
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [
          "style-loader",
          {
            loader: 'css-loader',
            modules: {
              localIdentName: '[name]__[local]--[hash:base64:5]',
              ...(argv.mode === 'production' ?
                  {
                    getLocalIdent: getLocalIdent(/* options */)
                  } :
                  {}
              ),
            }
          }
        ],
      },
    ]
  }
};
```

## Options

As option the `getLocalIdent` method accepts an object with the following properties:

### characters

An array of possible characters

**default:**
`["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]`

### separator

After each character has been used once, "classNames Map" creates string
combinations: `.a, .b, .c, ... .z, .a_a, .a_b, .a_c`. With a separator you can define, which character should be used as
a separator.

**default:** `'_'`

### shuffleCharsacters

a boolean, wether the character map should be in random order.

**default:** `true`

### full example

```js
// webpack.config.js
const getLocalIdent = require('@nico-martin/class-names-map/css-loader');

module.exports = (env, argv) => {
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [
          "style-loader",
          {
            loader: 'css-loader',
            modules: {
              localIdentName: '[name]__[local]--[hash:base64:5]',
              getLocalIdent: getLocalIdent({
                characters: ['a', 'b', 'c'],
                separator: '',
                shuffleCharsacters: false,
              })
            }
          }
        ],
      },
    ]
  }
};
```

## NextJS

This package also provides a wrapper for [NextJS](https://nextjs.org/). To use "classNames Map" with NextJS you can
simply add `withClassNamesMap` to your `next.config.js`:

```js
// next.config.js
const withClassNamesMap = require('@nico-martin/class-names-map/nextjs.js');

module.exports = withClassNamesMap({
  ...yourConfig,
  classNamesMap: {
    characters: ['a', 'b', 'c'],
    separator: '',
    shuffleCharsacters: false,
    applyInDev: false,
  },
});
```

As you can see, the options are pretty much the same as in the css-loader usecase.

The only difference is `applyInDev (boolean)`. By default, classNames Map will only be applied in production build. If
you also want to apply it in development, you can set `applyInDev` to `true`.

## Emoji

As a funny side effect we can also use an array of emojis as characters:

```js
// webpack.config.js
const getLocalIdent = require('@nico-martin/class-names-map/css-loader');
const emojis = require('@nico-martin/class-names-map/emojis');

module.exports = (env, argv) => {
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [
          "style-loader",
          {
            loader: 'css-loader',
            modules: {
              localIdentName: '[name]__[local]--[hash:base64:5]',
              getLocalIdent: getLocalIdent({
                characters: emojis,
                separator: '_',
                shuffleCharsacters: false,
              })
            }
          }
        ],
      },
    ]
  }
};
```

In this case we will end up with the following markup:

```html

<div class="😀">
    <p class="🙃">Hello World</p>
    <img class="😁 😅" alt="My Image" src="..."/>
</div>
```