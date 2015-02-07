# Ultimate RSS

> A RSS viewer built with AngularJS and Semantic UI

## Installation

### 1) The Git way

1. Clone this repo
2. Run `npm install` & `bower install`
3. Run `gulp serve`

### 2) The "dist" way

1. Clone this repo
2. Run `npm install` & `bower install`
3. Run `gulp build` to build the dist directory
4. Import the contents of this directory in a directory in your project
5. Import the scripts "urssApp.js" and "urssApp.css"
6. Add the `urssApp` module to your list of modules

### 3) The bower way

1. `bower install urss-mallowigi` (not optimized, you still need to import the vendors along with the application right now)
2. Add the module `urssApp` in your application
3. Start using the directives in your layout

### Example page:
http://mallowigi.github.io/urss/


-----

## Notes:

* This plugin heavily requires the [Semantic UI Library](http://semantic-ui.com/), therefore, for a better usage please import the
Semantic UI Library before importing the plugin's css.
* Be careful that your stylesheets are not overriding the plugin stylesheets.
