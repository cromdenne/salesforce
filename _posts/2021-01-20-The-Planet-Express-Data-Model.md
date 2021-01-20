---
title: The Planet Express Data Model
hero: https://drive.google.com/uc?export=view&id=1vWmh6_2A-svh9m5bCKnauqxTfJJ6ODt1
heroAlt: abstract lighting in the dark
author: Cory Romdenne
comments: true
---

Now that Planet Express is adopting Salesforce, their intergalactic delivery 
business must be translated into a simple data model that even Fry could 
understand.<!-- end_excerpt --> Well, maybe not quite *that* simple… In any 
case: roll up your sleeves, we’re about to get technical!

The goal with Salesforce is to give Planet Express business processes a home 
outside of CEO Farnsworth’s 160-year-old brain. We want to standardize the work
that happens inside the business and help the crew become more efficient! To do
that we need to reflect our deliveries with a Salesforce data model.

We’ll begin with a high-level overview of the objects we need.

First, the standard Salesforce objects. Like any other business, we have 
**Accounts**. We also have **Contacts** related to those Accounts. Even though 
Farnsworth has a knack for making delivery jobs appear out of thin air, we’ll 
likely need **Opportunities** to represent potential deals. And we have 
**Users** who are part of our Planet Express crew.

But this is a… unique... business. We’re going to need some custom objects as
well.

Since we’re an intergalactic delivery company, we need to represent 
**Planet**s. Some are more dangerous than others, and we need to keep notes.

We also need to represent each closed deal, or **Delivery**, in our business. 
And someone has to actually, you know, do the delivering. Those will be 
reflected with **Crew Member Assignment**s.

Now that we have a summary of the basics, we can outline the model visually.


<div class="caption-img">
    <img class="img-fluid lazy"
         src="/images/placeholder.png"
         data-src="https://drive.google.com/uc?id=1jbRXJHEDQuXWnx2f2khMKAhJfGJwkhe8"
         alt="a visual data model for Planet Express">
</div><!-- /.caption-img -->

Before we dive into Salesforce, let’s make sure we capture all of the data we 
need for each object.

<table class="table table-striped">
  <thead class="thead-dark">
    <tr>
        <th>Delivery</th>
        <th></th>
    </tr>
    <tr>
      <th>Field</th>
      <th>Type</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Name</td>
      <td>auto number</td>
    </tr>
    <tr>
      <td>Contents</td>
      <td>text</td>
    </tr>
    <tr>
      <td>Account</td>
      <td>lookup</td>
    </tr>
    <tr>
      <td>Destination Planet</td>
      <td>lookup</td>
    </tr>
    <tr>
      <td>Destination Location</td>
      <td>text</td>
    </tr>
    <tr>
      <td>Destination Contact</td>
      <td>lookup</td>
    </tr>
    <tr>
      <td>Skills Needed</td>
      <td>picklist (multi-select)</td>
    </tr>
    <tr>
      <td>Crew Size</td>
      <td>number</td>
    </tr>
    <tr>
      <td>Status</td>
      <td>picklist</td>
    </tr>
    <tr>
      <td>Notes</td>
      <td>rich text</td>
    </tr>
  </tbody>
</table>
<br>

<table class="table table-striped">
  <thead class="thead-dark">
    <tr>
        <th>Crew Member Assignment</th>
        <th></th>
    </tr>
    <tr>
      <th>Field</th>
      <th>Type</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Name</td>
      <td>auto number</td>
    </tr>
    <tr>
      <td>Delivery</td>
      <td>master-detail</td>
    </tr>
    <tr>
      <td>Crew Member</td>
      <td>lookup</td>
    </tr>
    <tr>
      <td>Delivery Date</td>
      <td>formula (date)</td>
    </tr>
    <tr>
      <td>IsCrewMember</td>
      <td>formula (checkbox)</td>
    </tr>
  </tbody>
</table>
<br>

<table class="table table-striped">
  <thead class="thead-dark">
    <tr>
        <th>Planet</th>
        <th></th>
    </tr>
    <tr>
      <th>Field</th>
      <th>Type</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Name</td>
      <td>text</td>
    </tr>
    <tr>
      <td>Danger Level</td>
      <td>picklist</td>
    </tr>
    <tr>
      <td>Notes</td>
      <td>rich text</td>
    </tr>
  </tbody>
</table>
<br>

<table class="table table-striped">
  <thead class="thead-dark">
    <tr>
        <th>User</th>
        <th></th>
    </tr>
    <tr>
      <th>Field</th>
      <th>Type</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Crew Member Skills</td>
      <td>picklist (multi-select)</td>
    </tr>
  </tbody>
</table>
<br>

Whew! It looks like we’re finally ready to do some Salesforce magic. We’re 
going to start with something simple that we’ll use when building our schema: 
a global picklist for *Crew Member Skills*, since this will be used on both 
the **User** and **Delivery** objects.

We’re heading into Setup, then Objects and Fields --> Picklist Value Sets (or 
just a search for "Picklist Value Sets"). We’ll create a new Global Value Set 
here. This won’t be a required field, so we don’t need a default value.

<div class="caption-img">
    <img class="img-fluid lazy"
         src="/images/placeholder.png"
         data-src="https://drive.google.com/uc?id=1debw8Zi-UvK1QnBZCo-k3Ew0DsJHBBPP"
         alt="menu to create a global value set">
</div><!-- /.caption-img -->

Next, let’s fire up Schema Builder to create our custom objects and fields. 
Using the Objects tab on the left, we’re going to deselect all objects except 
**Account**, **Contact**, and **User**, since those will either need some 
custom fields or will be helpful in visualizing our final model. We’ll drag 
these three objects into a nice layout to start, but we’ll be moving them later
when everything else is created.

<div class="caption-img">
    <img class="img-fluid lazy"
         src="/images/placeholder.png"
         data-src="https://drive.google.com/uc?id=1zfF13UnOcknASknri6Xffj1PL4W7mTdp"
         alt="Schema Builder with a few standard objects">
</div><!-- /.caption-img -->

We’ll start simple, so the first object we’ll create is **Planet**. In the left
panel we switch to the Elements tab, and then we drag the “Object” element into
an open area of the canvas. The properties are fairly straightforward, and for 
now we won’t need to report on planets so we’ll leave that box unchecked.

<div class="caption-img">
    <img class="img-fluid lazy"
         src="/images/placeholder.png"
         data-src="https://drive.google.com/uc?id=1tLI05_pBPabgV55QyhWB0GlX8UQEuWCk"
         alt="making a new custom object for Planet">
</div><!-- /.caption-img -->

We need to add a couple fields to our new object, so we’ll find those in the 
Elements tab as well and drag them onto the Planet object.

That one was simple, now let’s add our **Delivery** object with all of its 
custom fields. We drag another object from the Elements tab onto the canvas, 
and we fill out the necessary properties. The name for each Delivery will be 
automatically numbered, so we make sure to set it up with a numbering format 
and starting number. And unlike Planets, we’re also going to allow reports and 
activities on deliveries.

<div class="caption-img">
    <img class="img-fluid lazy"
         src="/images/placeholder.png"
         data-src="https://drive.google.com/uc?id=1nwUJSl6jBXuKpCmF7i7-55yj00OeObP6"
         alt="making a new custom object for Delivery">
</div><!-- /.caption-img -->

Now that we have an object, we’ll step through and create the custom fields 
one-by-one.

Mosts of these fields are fairly straightforward and can be created directly 
from the Schema Builder. However, we’ll need to go directly to the object to 
complete two of them. Once we have all of the other fields created, we’ll 
click the gear at the top of the Delivery object and then “View Object”. Let’s 
go to “Fields & Relationships” and then “New” to get started.

Schema Builder doesn’t let us select a Global Value Set for picklists, which is 
why we’re creating our *Skills Needed* field here. We’ll choose “Picklist 
(Multi-Select)” for the field type, and we’ll use our “Crew Member Skills” 
Global Value Set on the next page.

<div class="caption-img">
    <img class="img-fluid lazy"
         src="/images/placeholder.png"
         data-src="https://drive.google.com/uc?id=1rzfyLhk1jQFlyA57l76f2VOdQrX-YMrA"
         alt="making a new custom field with global value set">
</div><!-- /.caption-img -->

We’ll leave the field-level security and the layout assignment at defaults to 
finish setting up this field.

Finally, we need to create the *Delivery Date* field. 

At Planet Express, we make no deliveries on Christmas Eve. We can’t risk 
running into Robot Santa — that guy thinks everyone is naughty and he’s 
ruthless. So we’re going to set up a validation rule for the *Delivery Date* 
field (which is why we didn’t just create the field in Schema Builder).

We’ll go ahead and create the date field, and when it’s finished and we’re back
at the “Fields & Relationships” page, we’re going to select the field. (We 
could also use the “Validation Rules” link in the left pane.) Here we’ll create
a new Validation Rule.

We give our rule a name and make sure it’s active. The way validation rules 
work is if the formula evaluates to true, the error message appears. So we want
to set up our formula so that if the date is 12/24 we display an error. We’ll 
use the “Insert Field” helper to find our Delivery Date field, and then we’ll 
use the date functions to set up our formula:

`(MONTH(Delivery_Date__c) == 12) && (DAY(Delivery_Date__c) == 24)`

We can use the “Check Syntax” helper to make sure we have no errors, and then 
we’ll enter the message we want our users to see if they schedule a delivery 
on Christmas Eve. We also want this error to appear next to the Delivery Date 
field instead of at the top of the page.

<div class="caption-img">
    <img class="img-fluid lazy"
         src="/images/placeholder.png"
         data-src="https://drive.google.com/uc?id=1dk-ElUTPqFuLt_Ro_roHG8rXQ70RxHQM"
         alt="creating a validation rule">
</div><!-- /.caption-img -->

We’ll test that rule in a minute, but first let’s finish setting up our 
**Delivery** object and then our other custom objects and fields.

Before we move on from Deliveries, let’s make sure a few fields are required: 
*Destination Location*, *Destination Planet*, *Destination Contact* and 
*Contents*. From the “Fields & Relationships” page we can drill down into each 
of these fields and make sure the “Required” checkbox is selected.

Ok, we’re ready to finish our other objects and fields.

First we’ll add our *Crew Member Skills* field to the **User** object. Like 
earlier, since this is a Global Value Set we’ll need to do it from the Object 
Manager rather than Schema Builder. We navigate to the User object and add a 
new “Picklist (Multi-Select)” field.

Next we’ll move back over into Schema Builder, and we’ll create our **Crew 
Member Assignment** object. It looks much the same as the Delivery object — the
records will be automatically named with a number according to our format (in 
this case we’re using CR-{0000} and starting at 0) and we will allow reports.

After we’ve created the object we step through and create the first two fields 
that we’ll need.

*Delivery* — whenever a delivery is deleted, we want to delete the crew member 
assignments with it, so this will be a master-detail relationship

*Crew Member* — this references a User


The final two fields that we need are formula fields, which will be easier to 
set up in Object Manager. So we head back over there to open up **Crew 
Member Assignment**, and we create a new formula field.


*Delivery Date* — this references the delivery date from the Delivery object

*IsCrewMember* — if the user viewing the record is the Crew Member referenced 
in this Crew Member Assignment record, then this checkbox is automatically 
active, otherwise the checkbox is inactive; this will be used for reporting 
purposes


We’ll start with *Delivery Date*, which is obviously going to return a date 
type. On the “Enter formula” step we’re going to open the “Advanced Formula” 
tab. This formula is simple: we just want to reference the delivery date of 
the parent Delivery object. So we click the “Insert Field” helper button and 
we select that date:

`Crew Member Assignment > Delivery > Delivery Date`

Easy! We’ll leave the field-level security and the layout assignment at 
defaults to finish setting up this field.

Now we’ll move on to the *IsCrewMember* formula field, which will return a 
checkbox. We’ll open the Advanced Formula tab again, and this time our 
formula should check if the user viewing the record is the same as the user 
the record references. We’ll use the “Insert Field” helper button again to 
select the current user id:

`$User > User ID`

Then we’ll use it again to select the Crew Member user id:

`Crew Member Assignment > Crew Member > User ID`

Now we have our fields, we’re going to combine them into an IF function that 
evaluates to TRUE if the fields are equal and FALSE if they are not. This will 
make up the logic for our checkbox.

`IF($User.Id = Crew_Member__r.Id, TRUE, FALSE)`

After creating this field, our schema is complete!

<div class="caption-img">
    <img class="img-fluid lazy"
         src="/images/placeholder.png"
         data-src="https://drive.google.com/uc?id=1qYzOEq8v1JXrU5pcbjbpCPtPljRRHebh"
         alt="our completed schema">
</div><!-- /.caption-img -->

We just have a couple of loose ends to tie up. First, we need to add tabs for 
our new custom objects so that they can be accessed. In setup we navigate to 
User Interface → Tabs (or just search for “Tabs”).

Here we’ll add new “Custom Object Tabs”, one each for **Planet**, **Delivery**,
and **Crew Member Assignment**.

<div class="caption-img">
    <img class="img-fluid lazy"
         src="/images/placeholder.png"
         data-src="https://drive.google.com/uc?id=11ns46p0wZF_vMCD3QID9YYzKc85UZR2N"
         alt="creating a tab for a custom object">
</div><!-- /.caption-img -->

After we’re finished adding tabs, we’ll follow through on our promise to test 
the *Delivery Date* validation. From the App Launcher in the upper-left we’ll 
search for “Deliveries”, and then we’ll click “New” at the upper-right of the 
Delivery list view. We’ll enter a bit of dummy information to fill out the 
required fields, and we’ll try to set the Delivery Date to 12/24/2020.

When we try to save the delivery, we see our validation error!

<div class="caption-img">
    <img class="img-fluid lazy"
         src="/images/placeholder.png"
         data-src="https://drive.google.com/uc?id=1iOcXQYxYk53v1Hm0l086A_mQvtWgJT0i"
         alt="testing our validation for delivery date">
</div><!-- /.caption-img -->

So there we have it! We accomplished a lot:
- Outlined the data model and all custom objects and fields
- Created a Global Value Set for picklists
- Used Schema Builder and Object Manager to create the custom objects and fields
- Set up validations for required fields and no deliveries on Christmas Eve
- Set up formula fields
- Set up tabs to access custom objects
- Tested our validation rule

Even a humble intergalactic delivery company with a simple data model requires 
a bit of planning and consideration, but we got there eventually!

If you have questions or a more effective solution to represent the Planet 
Express data model, drop a comment below!
<br><br>

---

<br>
Some references for this post:
- [Object Reference for Salesforce and Lightning Platform](https://developer.salesforce.com/docs/atlas.en-us.object_reference.meta/object_reference/data_model.htm){:.underline-effect}{:target="blank"}
    