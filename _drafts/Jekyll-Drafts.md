---
title: Jekyll Drafts
hero: https://images.unsplash.com/photo-1499750310107-5fef28a66643?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=e23e6404f851a9c272479500cfac3dd5&auto=format&fit=crop&w=1050&q=80
heroAlt: laptop with notepad and coffee
author: Cory Romdenne
comments: true
---

Jekyll has been great. But it's also a bit quirky, and the solutions to some
problems can be obscure. Drafts were that kind of issue for me when I first
started working with them.<!-- end_excerpt -->

I had two main issues:

1. I couldn't get Jekyll to build the site with my drafts as published posts in
the development environment
2. I wanted to give my final drafts a publish date in the future so that I
wouldn't have to manually push them on the date they'd ship

The first issue turned out to be a relatively simple oversight on my part. I
was running my server with the `--drafts` flag, I was using the drafts folder,
but I still wasn't getting anything.

After struggling for a while I finally caught on to a detail outlined right at
the beginning of the drafts entry in the
[Jekyll docs](https://jekyllrb.com/docs/drafts/){:
.underline-effect}{:target="blank"} (\*facepalm\*). I had been using a draft that
had a date in the filename. Jekyll looks for drafts that don't have a date,
because they aren't supposed to be published.

After I removed the date from the filename everything worked as expected (with 
just a slight hit to my dignity).

The second issue has been a bit more challenging.

I originally thought that simply moving my final drafts to the posts folder
with a future date in the filename might do the trick. Unfortunately, Jekyll
simply published those posts with the future date rather than waiting for that
date to arrive.

I learned that we can turn off publishing future posts with a simple flag in
the config file, `future: false`. This way any posts with a date in the future
will not be published right away. However, this doesn't seem to solve the
problem of automatically publishing the post once our future date arrives.

jekyll serve --drafts --host 0.0.0.0
