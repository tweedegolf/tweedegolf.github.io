# Sections

Sections may be included by layouts or pages. Some sections may be passed certain parameters to fill out your own custom content.

## Example

You could include a call to action (`call-to-action.html`) with your own custom tagline and button:

```
{% capture cta-text %}My custom tagline.{% endcapture %}
{% capture cta-btn-text %}Contact us{% endcapture %}
{% capture cta-btn-link %}/#contact{% endcapture %}

{% include sections/call-to-action.html
  cta-text=page.cta-text
  cta-btn-text=page.cta-btn-text
  cta-btn-link=page.cta-btn-text %}
```

## Call to action
- Tagline as `cta-text`
- Button text `cta-btn-text`
- Button link as `cta-btn-link`

## Contact form
You could pass nothing for a generic form, or customise it by passing:
- Team member name (e.g. "Marlon", see `/data/members.yml`) as `person`

## Dual text
- Two simple texts or Markdown files (from `/includes/texts`) as `dual-text1` and `dual-text2`.

## Images
- Pass it one to three images [TODO] as `img1`, `img2` and `img3`.

## Quote
- Simple text or Markdown file as `quote-text`.
- Simple text as `quote-author`.

## Slider
- One to eight images as `slide1`, `slide2` ... `slide8`.
- [TODO]

## Text images
- [TODO]
