tweedegolf.github.io
====================

Public website of tweede golf

## Serving the website locally

To serve this website locally, install [bower](http://bower.io/) and [bundler](http://bundler.io/) and run the following sequence of commands in the project root:

    bower install
    bundle exec jekyll serve --watch

The website is served on `http://localhost:4000`.
  
## Updates

To install updates to [bootstrap](http://getbootstrap.com/) or [fontawesome](http://fortawesome.github.io/Font-Awesome/), update the `.bowerrc` file and run:

    bower update

To install the new fontawesome fonts run:

    cp -r vendor/fontawesome/fonts/ fonts

After updating the [sass](http://sass-lang.com/) stylesheet in the folder `css`, or after updating *bootstrap* or *fontawesome*, run the following command to generate the stylesheet:

    sass css/main.scss css/main.css

## Static pages

Static pages are added by creating .md files in the /_posts folder. These files MUST be named according to the format YEAR-MONTH-DAY-title. See `http://jekyllrb.com/docs/posts/` for more information. 