# Layouts

Layouts may be extended by other layouts or pages. The base layout is `default`. Unique pages, such as home (`/pages/index`) or the blog overview (`/pages/blog`) extend the `default` layout. Blog posts (`.md` files in `/posts`) extend the `post` layout.

Other pages usually extend the `landing` layout. This layout renders a navbar, intro, contact form and footer. To provide plenty of customisability, such a page may include all sorts of sections (`/includes/sections`) as content and pass its own contents as params.

You can pass page params which you defined in the Jekyll front matter (between the triple dashes `---`), or you can capture `.md`-files in vars and pass those. An example:

```
---
title: My amazing page title
intro: Compelling tagline is compelling.
images: img01.png,img02.png,img03.png
---

{% capture text1 %}
  {% include texts/google-for-work/power_of_google_apps.md %}
{% endcapture %}

{% capture text2 %}
  You could also just capture a plain string of text. 
{% endcapture %}

{% include sections/dual-text.html text1=text1 text2=text2 %}

{% include sections/images.html images=page.images %}
```

For detailed information on which parameters to pass to sections, see the sections readme located in `/includes/sections`.
