tweedegolf.github.io
====================

Public website of tweede golf

## Serving the website locally with Vagrant and Docker

    vagrant up
    vagrant ssh
    docker-compose up

The website is served on `http://localhost:4000`.

## Serving the website locally with Bower and Bundle

To serve this website locally, install [bower](http://bower.io/) and [bundler](http://bundler.io/) and run the following sequence of commands in the project root:

    bower install
    bundle install
    bundle exec jekyll serve --watch

(Or `sudo bower install --allow-root` if your OS is feeling particularly rebellious today.)

The website is served on `http://localhost:4000`.

### Updates

To install updates to [bootstrap](http://getbootstrap.com/) or [fontawesome](http://fortawesome.github.io/Font-Awesome/), update the `.bowerrc` file and run:

    bower update

To install the new fontawesome fonts run:

    cp -r vendor/fontawesome/fonts/ fonts
