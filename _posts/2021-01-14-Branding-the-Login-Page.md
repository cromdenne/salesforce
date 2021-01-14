---
title: Branding the Login Page
hero: https://drive.google.com/uc?export=view&id=1j1OwREGWapS0BihZgf-B6EYkAczqGk_A
heroAlt: Futurama art
author: Cory Romdenne
comments: true
---

Eye candy is everything — we can't have a boring, default login page. Users
need to see our slick logo and comforting colors every time they enter our org!
So let's give it to them. <!-- end_excerpt -->

First, the easy part: our logo.

Fire up your org and open Setup. We're looking for Company Settings --> My 
Domain (or just search for My Domain). If you don't already have My Domain
configured, you'll probably have to stop here [and get up to speed](https://help.salesforce.com/articleView?id=domain_name_overview.htm&type=5){:.underline-effect}{:target="blank"}.
But assuming you're ready, you should see an "Authentication Configuration"
area at the bottom of My Domain.

<div class="caption-img">
    <img class="img-fluid lazy"
         src="/images/placeholder.png"
         data-src="https://drive.google.com/uc?id=1xYOQgdHDknp-ISS0ZlSE81CdRbh1P8H0"
         alt="My Domain Authentication Configuration settings">
    <div class="caption">
        <p>
            If your org has My Domain configured then you'll have access to the
            Authentication Configuration settings.
        </p>
    </div><!-- /.caption -->
</div><!-- /.caption-img -->

So we can begin by uploading a logo file, which needs to be no bigger than
250 pixels wide by 125 pixels high and a max file size of 100KB. You can use
a `.jpg` or `.png` for your logo file, or you can even get fancy with a `.gif`.

We can also update our Background Color, which will affect the left pane of the
login screen. If you don't normally work with hex codes, use a website like
[convertingcolors.com](https://convertingcolors.com/){:.underline-effect}{:target="blank"}
to get the value you need.

The login page is immediately updated after you save changes, so if you use
Chrome you can open an incognito window and navigate to your org's login page
to check it out.

Next is the interesting part: adding a "Right Frame URL" to display external
content on the right side of our login page.

All the setting requires is a URL, but you'll need to do some setup before
plugging that in. If you're able to add a basic page to your company's website
that's probably the easiest route. This page MUST begin with https:// (you must
have SSL encryption for your site).

If you're not able to add a page to your company site, a quick and dirty
solution is [GitHub Pages](https://pages.github.com/){:.underline-effect}{:target="blank"}.

GitHub is a version control and collaboration platform, one of many used
in software development. I'll spare the details today, but the important thing
is that the GitHub Pages feature allows you to use a GitHub project as a free 
hosted website, and it includes SSL encryption!

This might sound complicated, and there are some pretty neat things you can
build with GitHub Pages (including this blog!), but for our purposes it's
simple: create a repo with a basic HTML file, then enable GitHub Pages. You'll
need an account for this, so maybe you can set one up with your company email.

First, we'll create a new GitHub repo. Give it a sensible name and make sure
it's public.

<div class="caption-img">
    <img class="img-fluid lazy"
        src="/images/placeholder.png"
        data-src="https://drive.google.com/uc?id=1KR14l4BgbjCLok6eOUiG-LIhPFDcM0s2"
        alt="setting up a new GitHub repo">
</div><!-- /.caption-img -->

Next, we're going to create our HTML file. From the "<> Code" tab of the
project, find the "creating a new file" link under quick setup.

<div class="caption-img">
    <img class="img-fluid lazy"
        src="/images/placeholder.png"
        data-src="https://drive.google.com/uc?id=1fZXBDuDDrNCAm_Wwh-FuHSI4szWvuu4k"
        alt="create a new GitHub file">
</div><!-- /.caption-img -->

Name your file "index.html". If you know a bit of HTML and CSS you can add
this yourself, but if you're unsure or you just want to get up and running
you can use this code block for your page.

<div class="code-block">
    <div class="header">
        Create our HTML file with a background image<br>
        <code>~/index.html</code>
    </div><!-- /.header -->
    <div class="code">
        <code>
            <pre>
<!DOCTYPE html>
&lt;html lang="en"&gt;
    &lt;head&gt;
        &lt;style&gt;
            body {
                background-image: url(org-login-image.jpg);
                background-repeat: no-repeat;
                background-position: center-bottom;
                background-size: cover;
            }
        &lt;/style&gt;
    &lt;/head&gt;
    &lt;body&gt;
    
    &lt;/body&gt;
&lt;/html&gt;
            </pre>
        </code>
    </div><!-- /.code -->
</div><!-- /.code-block -->

Once you're finished, commit your changes at the bottom of the page. You'll
need to enter a comment — use something simple but descriptive like "Create 
index.html".

If you noticed in the style block near the top, we referenced a file named
`org-login-image.jpg`. This is going to be the image we use for the background.
The styles here essentially tell the page to render the image centered and 
covering the entire page.

Next, we need to upload our image file to the project. Find and save a file 
(higher resolution is better), and rename it to `org-login-image.jpg`. From 
the "<> Code" tab of the project, find the "Add file" dropdown and select
"Upload files".

<div class="caption-img">
    <img class="img-fluid lazy"
        src="/images/placeholder.png"
        data-src="https://drive.google.com/uc?id=1Ccyfx-dmB6KUP8CyScVbY4xt6Lm1nZ1M"
        alt="upload a new GitHub file">
</div><!-- /.caption-img -->

On the next page, go ahead and upload your file and then commit the change
with another comment, maybe something like "Add file via upload".

We're almost there! Now we just have to enable GitHub Pages and add the page
URL to Salesforce.

On the GitHub project, open the Settings. Scroll down on the main settings page
until you find the GitHub Pages area. Under "Source", select "main" and leave
the other settings at defaults. Click Save.

After the page refreshes, scroll down to the GitHub Pages area and click the
option to "Enforce HTTPS".

It might take a couple minutes for your new page to go live, but you'll
eventually be able to open the page from the link provided and view the fruits
of your labor!

If everything looks ok then we're ready for the final step. Grab the full link
for your page (beginning with `https://`) and head back to your Salesforce org.
Paste the link into the "Right Frame URL" field, save, and then open an 
incognito window to check out your branded login page!

<div class="caption-img">
    <img class="img-fluid lazy"
        src="/images/placeholder.png"
        data-src="https://drive.google.com/uc?id=1RIiUqXh1gfU4iLvazpXEqq2f58BewX_V"
        alt="a custom Salesforce login page">
    <div class="caption">
        <p>
            Fry will know he's in the right place next time he tries to log in.
        </p>
    </div><!-- /.caption -->
</div><!-- /.caption-img -->

If you know a little more about HTML and CSS, you can easily add more elements
to your right pane — something like a welcome message, important news 
or announcements, celebrations, etc. It's also easy to keep your background 
image fresh: just upload a new image file to the GitHub project, using the 
same name as before (`org-login-image.jpg`).

If you have questions or clever tricks you use with your login page, drop them
in the comments!
<br><br>

---

<br>
Some references for this post:
- [Customize Your My Domain Login Page with Your Brand](https://help.salesforce.com/articleView?id=domain_name_login_branding.htm&type=5){:.underline-effect}{:target="blank"}
- [GitHub Pages](https://pages.github.com/){:.underline-effect}{:target="blank"}
    