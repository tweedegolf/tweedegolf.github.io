tweedegolf.github.io
====================

Public website of tweede golf

## Serving the website locally with Vagrant and Docker

```
vagrant up
vagrant ssh
docker-compose up
```

The website is served on `http://localhost:4000`.

### Troubleshooting

When running `vagrant up` you might run into the following error:

```
The following SSH command responded with a non-zero exit status.
Vagrant assumes that this means the command failed!

stdin: is not a tty
mount.nfs: access denied by server while mounting
```

It's something to do with Vagrant still running. You fix it by running:

```
vagrant reload --provision
```

This quickly restarts the VM. The provision flag instructs Vagrant to run the provisioners, which normally only happens on the very first `vagrant up`.

If everything fails, remove the VM and start all over with `vagrant up`. Then wait 20 minutes :D

If problems persist, just serve the website locally.

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

After updating the [sass](http://sass-lang.com/) stylesheet in the folder `css`, or after updating *bootstrap* or *fontawesome*, run the following command to generate the stylesheet:

    sass css/main.scss css/main.css
