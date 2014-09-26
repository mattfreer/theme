# THEME

## Usage

1. Add the following line of html to include the css
  * `<link href="http://dz44vc6ose3il.cloudfront.net/theme.css" rel="stylesheet">`
2. Ensure this line is added after any bootstrap css includes

## Development

### Installation

1. Run `npm install` to install the dependencies
2. Run `bower install` to fetch the bower dependencies
3. Start the server using `grunt`
4. Navigate to [http://localhost:3001](http://localhost:3001)
5. Make changes and the page will live reload

### Release

1. Copy `grunt-aws.json.example` to `grunt-aws.json`
2. Fill it in with your S3 User credentials and bucket
3. Grunt `grunt release`
