---
title: A Jekyll Photoblog
hero: https://farm2.staticflickr.com/1756/28515848928_f1befaa27b_b.jpg
heroAlt: Redwood tree small branch
author: Cory Romdenne
comments: true
---

Even amateurs like sharing photos.

I'm no expert, but I do enjoy taking photos when my wife and I travel. I 
wanted a place to document my journey as an improving photographer, but I also 
wanted flexibility.<!-- end_excerpt --> I thought this might be a great 
opportunity to learn a new skill, so I dove into the details of using Jekyll 
as a photo blog.

What follows is a broad overview of the photography features I created on this 
blog using [Jekyll](https://jekyllrb.com/){: .underline-effect}{:target="blank"},
[Bootstrap](http://getbootstrap.com/){: .underline-effect}{:target="blank"} and 
[Flickr](http://www.flickr.com/){: .underline-effect}{:target="blank"}. I 
wanted to document this process for myself, and if you also find it useful 
that's great!
<br>
<br>
<hr>
<br>
### Jekyll Collections
Let's assume we already have a functional Jekyll blog. If not, [pause to catch
up](https://jekyllrb.com/docs/quickstart/){:.underline-effect}{:target="blank"}.  

We're going to use a collection to store our photos. [According to
Jekyll](https://jekyllrb.com/docs/collections/){: .underline-effect}{:target="blank"}, "Collections allow you to define a new type of document that behave like 
Pages or Posts do normally, but also have their own unique properties and 
namespace." This makes them a powerful tool and perfect for organizing photos. 
We'll start by creating a new `_photos` collection at the root of our jekyll 
site.

<div class="code-block">
  <div class="header">
Create a new folder for our photos collection<br>
<code>Mac terminal prompt</code>
  </div><!-- /.header -->
  <div class="code"><code>
    [website (master)]$ mkdir _photos
  </code></div><!-- /.code -->
</div><!-- /.code-block -->

Next, we need to tell Jekyll that we have a new collection. Let's update our
`_config.yml` file (or create one if we haven't yet).

<div class="code-block">
  <div class="header">
Update our config file so Jekyll knows about our new collection<br>
<code>~/website/_<!--_-->config.yml</code>
  </div><!-- /.header -->
  <div class="code"><code>
    collections:<br>
    &nbsp;&nbsp;photos:
  </code></div><!-- /.code -->
</div><!-- /.code-block -->

There are some other settings we can modify here in the config file, but for
now we don't need to add anything else. However, we can't forget to restart our 
Jekyll server so that changes to the `_config.yml` file will take effect!

Now we're ready to add photos to our collection. Each photo will be represented
by a single markup file, which will hold metadata for the photo. I don't keep 
my images inside the website repo because [GitHub doesn't like it when a repo 
is larger than
1GB](https://help.github.com/articles/what-is-my-disk-quota/){:target="blank"}{:
.underline-effect}. Instead, I use a free Flickr account to host my photos. Any
service could be used because we'll just be linking back to the photos from
each of our markdown metadata files.

Let's go ahead and add a few photos to our collection so that we can work with
them when styling our masonry layout. This is what our photos will look like in
markdown format.

<div class="code-block">
  <div class="header">
Create a new photo markdown file for our collection<br>
<code>~/website/_<!--_-->photos/sf-port.md</code>
  </div><!-- /.header -->
  <div class="code"><code>
  ---<br>
  image_path: https://c1.staticflickr.com/your-image-url.jpg<br>
  title: Port of San Francisco<br>
  location: San Francisco, CA<br>
  time: April 2018<br>
  camera_make: Sony<br>
  camera_model: ILCE-6000<br>
  focal_length: 30<br>
  aperture: 2.0<br>
  shutter_speed: 1/50<br>
  iso: 400<br>
  ---<br>
  <br>
  This photo has an interesting story!
  </code></div><!-- /.code -->
</div><!-- /.code-block -->

Many of these fields are custom and not required. We do need an `image_path`
(or similarly-named) field that links back to the photo on our hosting service, 
but beyond that we can get creative — the metadata we use here depends on what 
we'd like to display in our gallery. I include photo EXIF data for my blog, but 
we can use as many or as few fields as we want.

Outside of the file's frontmatter we can also add content. We could use this
area for photo captions or stories.

Let's create a few more photos now. We could even use Google or
[Unsplash](https://unsplash.com/){: .underline-effect}{:target="blank"} to
grab some placeholder photos while we're working with the layout. Five is
probably enough for us to get started.

<div class="code-block">
  <div class="header">
Add a few more photos to our collection<br>
<code>Mac terminal prompt</code>
  </div><!-- /.header -->
  <div class="code"><code>
  [website (master)]$ ls _<!--_-->photos/<br>
  sf-baybridge.md<br>
  sf-californiastreet.md<br>
  sf-goldengatebridge.md<br>
  sf-port.md<br>
  sf-pyramid.md
  </code></div><!-- /.code -->
</div><!-- /.code-block -->

We've got a `_photos` collection with several photos in markdown format, so now
we're ready to move on and create our gallery page.
<br>
<br>
<hr>
<br>
### Masonry with Bootstrap
Bootstrap 4.0 has a great built-in feature that's perfect for a masonry layout: 
[card
columns](https://getbootstrap.com/docs/4.0/components/card/#card-columns){:
.underline-effect}{:target="blank"}. With card columns we can also include
captions or other text with our images, allowing for a lot of flexibility.

If we don't have Bootstrap integrated with our project yet, [let's do that
now](https://getbootstrap.com/docs/4.0/getting-started/introduction/){:
.underline-effect}{:target="blank"}.

Next, let's create a gallery page and add the basic card column components, as
well as a loop that places all of our photos. (I use my default layout here,
but if we already have another layout set up for our gallery we can go ahead
and use that.)

<div class="code-block">
  <div class="header">
Create a gallery page and add card columns<br>
<code>~/website/gallery/index.html</code>
  </div><!-- /.header -->
  <div class="code"><code>
  ---<br>
  layout: default<br>
  title: Website<br>
  ---<br>
  <br>
  <pre>
&lt;div class="container-fluid"&gt;
  &lt;div class="card-columns"&gt;
    &#123;% for photo in site.photos %&#125;
      &lt;div class="card"&gt;
        &lt;img class="card-img"
             src="&#123;&#123; photo.image_path &#125;&#125;"
             alt="&#123;&#123; photo.title &#125;&#125;"&gt;
      &lt;/div&gt;<span class="comment">&lt;!-- /.card --&gt;</span>
    &#123;% endfor %&#125;
  &lt;/div&gt;<span class="comment">&lt;!-- /.card-columns --&gt;</span>
&lt;/div&gt;<span class="comment">&lt;!-- /.container-fluid --&gt;</span>
</pre>
  </code></div><!-- /.code -->
</div><!-- /.code-block -->

As the code shows, we use a bit of
[Liquid](https://jekyllrb.com/docs/templates/){:
.underline-effect}{:target="blank"} to iterate over our photos collection and
create a card that pulls metadata from each photo markdown file. This is where
we can get creative with our EXIF data or any other metadata/content that
we've included in the markdown files.

At this point we should have a gallery with a fairly basic masonry layout. 
After adding a few styles my gallery page looks like this:

<div class="caption-img">
  <img class="img-fluid" src="/images/gallery.png" alt="screenshot of gallery">
  <div class="caption">
    <p>I added a hover effect to display more metadata, and a modal (not shown)
    to reveal all EXIF data in a larger view</p>
  </div><!-- /.caption -->
</div><!-- /.caption-img -->

From here we can do a bit of styling to customize the photos, add hover 
effects, and even add modals or a lightbox to feature hi-res views. The best 
part is that everything is flexible with Jekyll — we can create our gallery and 
blog however we want to, and use git and GitHub Pages to easily manage and host 
it.

That's as far as we'll go today. In just a few minutes we were able to set up a
photos collection, represent our Flickr photos with markdown files, create a
gallery page and iterate over our collection to display all photos in a masonry
layout. Pretty slick!
