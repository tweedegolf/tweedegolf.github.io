# Blog articles

Articles are added by creating .md files in the `/_posts` folder. For unpublished articles you may use the `/_drafts` folder instead. We always use the `post` layout for blog posts. Ordinary text may be added simply by writing in the file itself, below all variables.

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
