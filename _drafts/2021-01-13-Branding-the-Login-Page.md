---
title: Branding the Login Page
hero: https://drive.google.com/uc?export=view&id=1j1OwREGWapS0BihZgf-B6EYkAczqGk_A
heroAlt: Futurama art
author: Cory Romdenne
comments: true
---

Eye candy is everything — we can't have a boring, default login page. Users
need to see our slick logo and comforting colors every time they hit they enter
our org. So let's give it to them. <!-- end_excerpt -->

First, the easy part: our logo.

Fire up your org and open Setup. We're looking for Company Settings --> My 
Domain (or just search for My Domain). If you don't already have My Domain
configured, you'll probably have to stop here [and get up to speed](https://help.salesforce.com/articleView?id=domain_name_overview.htm&type=5){:.underline-effect}{:target="blank"}.
But assuming you're ready, you should see an "Authentication Configuration"
area at the bottom of My Domain.

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

Next is the interesting part: adding a "Right Frame URL" to display an external
webpage on the right side of our login page.