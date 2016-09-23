tweedegolf.github.io
====================

Public website of tweede golf

## Serving the website locally with Vagrant and Docker

    vagrant up
    vagrant ssh
    docker-compose up

The website is served on `http://localhost:4000`.

## Serving the website locally with Bower and Bundle

To serve this website locally, install [bower](http://bower.io/) and
[bundler](http://bundler.io/) and run the following sequence of commands in the
project root:

    bower install
    bundle install
    bundle exec jekyll serve --watch --incremental --drafts

(Or `sudo bower install --allow-root` if your OS is feeling particularly
rebellious today.)

The website is served on `http://localhost:4000`.

## Frontend updates

If you want to make styling changes you'll need Sass and compile styles
manually:

    sass --watch sass/main.scss:assets/css/main.css --style compressed

Jekyll does have its own Sass support, but GitHub Pages runs in safe mode and
won't allow multiple Sass load paths, making it impossible to include Bootstrap.

To install new frontend assets, update the `bower.json` file and run:

    bower install

To use new assets, copy them manually to the assets folder, e.g.:

    cp -r vendor/fontawesome/fonts/ assets/fonts

## Adding/editing a page

## Adding/editing blog articles
