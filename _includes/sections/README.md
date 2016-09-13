# Sections

Sections may be included by layouts or pages. Some sections may be passed certain parameters to fill out your own custom content.

For example, you could include a Call To Action (`call-to-action.html`) with your own custom tagline and button:

```
{% capture cta-text %}My custom tagline.{% endcapture %}
{% capture cta-btn-text %}Contact us{% endcapture %}
{% capture cta-btn-link %}/#contact{% endcapture %}

{% include sections/call-to-action.html cta-text=page.cta-text cta-btn-text=page.cta-btn-text %}
```

`call-to-action.html`:
- Tagline as `cta-text`
- Button text `cta-btn-text`
- Button link as `cta-btn-link`

`contact.html`:
You could pass nothing for a generic form, or customise it by passing:
- Team member name (e.g. "Marlon", see `/data/members.yml`) as `person`

`dual-text.html`:
- Two simple texts or Markdown files (from `/includes/texts`) as `dual-text1` and `dual-text2`.

`images.html`:
- Pass it one to three images [TODO] as `img1`, `img2` and `img3`.

`quote.html`:
- Simple text or Markdown file as `quote-text`.
- Simple text as `quote-author`.

`slider.html`:
- One to eight images as `slide1`, `slide2` ... `slide8`.
- [TODO]

`text-images`:
- [TODO]
