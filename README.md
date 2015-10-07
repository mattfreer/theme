# Theme

The [Theme] is a Twitter [Bootstrap] based CSS theme that helps Livestax App developers build consistency across their apps.
The theme extends Twitter [Bootstrap] to add components that meet common UI needs within Livestax.

## Usage

The theme can be added to your App by simply including the following `<link>` tag to your app's source code:

`<link href="//assets.livestax.com/theme-0.0.1.css" rel="stylesheet">`

Please Note: Bootstrap CSS include is not required, as the [Theme] handles this dependency.

## Contributing

We'd love to get contributions from you!
For instructions on how to get set up quickly, follow the installation instructions below.
Once you're up and running, take a look at the [Contribution Document](https://github.com/livestax/theme/blob/master/CONTRIBUTING.md) to see how to get your changes merged in.

### Requirements
* [NodeJS](https://nodejs.org/en/) - version 0.12.4 or above
* [Bower](http://bower.io/) - `npm install -g bower`
* [Grunt-CLI](http://gruntjs.com/using-the-cli) - `npm install -g grunt-cli`

### Installation
1. Fork and then clone the repository
  * `git clone git@github.com:<your-user-name>/theme.git`
2. Install the NPM dependencies
  * `npm install`
3. Install the Bower dependencies
  * `bower install`
4. Start the server
  * `grunt`
5. Open the app in the browser
  * `http://127.0.0.1:3001`

### Building Components
Once you have the repository forked, you can start building your own component. The components/ directory contains all of the custom components in neat, self contained directories.

**Example Components Directory Structure**

```
components/
 | badge/
 | collapsible-panel/
 | dropdown-item/
 | indicators/
 | inline-form-item/
```

The component sub-directory contains all files required for the component, such as the `.less` stylesheet and any documentation.

To create a new component, simply create a new sub-directory within the `components/` directory with a directory name that appropriately describes the component.

**_Please Note: Use hyphens `-` instead of spaces in directory names_**

#### Component Styles
To create custom styles for a component, simply create a `styles.less` file within your component directory and add any required styles to this file. Styles are defined in LESS to provide an easier to maintain styles file, which compiles down to the final Theme CSS.

#### Component Documentation
To provide documentation for your component, simply create an appropriately named HTML file within your components directory e.g. `basic.html`.

```
components/
 | my-new-component/
 | basic.html
 | detailed.html
 | styles.less
```

The contents of the HTML documentation file is just HTML with the exception of two helper tags:

**Title Tag**

The `title` tag creates emphasized title text within the documentation. The text is 'Word Capitalized'.

```html
<title>Example title text here</title>
```

**Example Tag**

The `example` tag wraps any inner HTML content within an example block and provides a mechanism to view the example source code in a modal.

```html
<example>
  <div>
    <p>My example code to display</p>
  </div>
</example>
```

It is advised not to include any custom styles in your documentation and to just use styles and components that are already provided by the Theme.

#### Generating Docs
To include your new component in the public documentation, you need to update the `docs/build.json` file to reference your component documentation.

The `build.json` file determines which content within the `docs/` directory will be used to generate the documentation and in which order it will appear. Even though your component documentation is in the `components/` directory, it will still be included in the build as there is a symlink of `./docs/components/ -> ./components/`.

**`build.json` Example**

```json
{
  "home": {
  },
  "styles": {
  },
  "components": {
    "panels": [
      "basic",
      "contextual"
    ],
    "dropdown-item": [
      "individual",
      "list"
    ]
  }
}
```

To add your component documentation, simply add your component and the sub-sections to the `build.json` file. You can determine the position of your component documentation by placing it between the relevant lines of the `build.json` file.

The main section will be the directory name of your component and each subsequent sub-section will be the relevant HTML files within the directory.

**`build.json` Updated Example**

```json
{
  "home": {
  },
  "styles": {
  },
  "components": {
    "panels": [
      "basic",
      "contextual"
    ],
    "my-new-component": [
      "basic",
      "detailed"
    ],
    "dropdown-item": [
      "individual",
      "list"
    ]
  }
}
```

Building the public documentation and hosting it locally is done via a grunt task and simply running `grunt` will initiate the build process and host the results on your local IP address.

The grunt server auto-(re)builds when any changes are made to the documentation files and refreshes your web browser.

#### Submitting Content

When you are happy with your new content, submit a [Pull Request](https://help.github.com/articles/using-pull-requests/) and we will review it for inclusion in the theme.

Be sure to take a look at the [Contribution Document](https://github.com/livestax/theme/blob/master/CONTRIBUTING.md) to see how to get your changes merged in.

## License

Code released under the MIT license. Docs released under Creative Commons.

[Bootstrap]: http://getbootstrap.com
[Theme]: http://theme.livestax.com
