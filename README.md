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

### Site content updates

Site content updates are performed by editing the site source directly. We use [kramdown](http://kramdown.gettalong.org/quickref.html) (variety of markdown).

#### Blog articles

Static pages are added by creating .md files in the `/_posts` folder. For unpublished articles you may use the `/_drafts` folder instead. We always use the `post` layout for blog posts. Ordinary text may be added simpy by writing in the file itself, below all variables.

Start by providing the following variables, enclosing them in three dashes `---` above and below:

+ `layout: post` (always the same)
+ `thumb: my-image.jpg` (located in /img/blog/thumbs/; size 720x360)
+ `leadimg: my-image.jpg` (located in /img/blog/; ideally landscape oriented and large)
+ `tags: tag, tag, tag` (try to provide 2 - 6 tags; order by relevance)
+ `author: Daniel` (an employee's first name; info is pulled from `/data/members`)
+ `description: Lorem ipsum dolor ...` (meta description; max 155 chars)
+ `nerd: 3` (nerd level 1 - 3; view other articles for reference)
+ OPTIONAL: `github: https://github.com/account/repo` (will render a 'View code'-button)

After closing the variables section with three dashes `---`, you may just start typing your article's content.

Inserting an image:

    ![Left and right handed system](/img/blog/left-and-right-handed-system.gif)

Inserting an image with caption:

    ![YGA verlichting](/img/blog/light-yga-verlichting.png){: .with-caption}
    *Screen from the garden prototype. Spot light support only...*

Custom images may be added in the repo directly.

Embedding a video:

    <iframe src="https://player.vimeo.com/video/131074418" height="360" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>

Embedding a video with caption:

    <iframe src="https://player.vimeo.com/video/131074418" height="360" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>{: .with-caption}
    *Test environment for point light shadows*

You can probably use any vendor's default embedding code, but it would be best to **only define a height of 360 and no width** as we are resizing videos responsively.

Custom video's may be uploaded to TG's Vimeo account rather than be put in the repo directly or on-site.


#### Static pages

Static pages are added by creating .md files in the /_static folder. We always use the `static` layout for static pages.
Ordinary text may be added simply by writing in the file itself, below all variables.
