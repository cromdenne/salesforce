---
title: Data Migration
hero: https://drive.google.com/uc?export=view&id=11IW72jLKefOfmncPcovydd09Rua6NnfR
heroAlt: Fry falling through the Matrix
author: Cory Romdenne
comments: true
---

Our Planet Express Salesforce org is still missing its most important 
ingredient: data!<!-- end_excerpt --> Farnsworth might be a genius, but he’s 
been using spreadsheets to run the business and we need to get that data into 
Salesforce ASAP!

Today we’re going to import the data from those spreadsheets into Salesforce. 
But we need to pay careful attention to clean up the data and come up with a 
plan before importing to ensure data integrity. Let’s get started!

First, let’s summarize the data that we’ll be importing. Our data model 
consists of the following objects:
- Accounts
- Contacts
- Planets
- Deliveries
- Crew Member Assignments

This is the data we’ll be importing from spreadsheets, and we need to be clear 
on the dependencies within this data model so that we can arrange an 
appropriate order for our data imports. Let’s go into a bit more detail about 
how each object is related and how that might impact our importing process.

<br>
<table class="table table-striped">
  <thead class="thead-dark">
    <tr>
      <th>Object</th>
      <th>Considerations</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Accounts</td>
      <td>
        Has the <em>Account Owner</em> field, which will require a User ID
      </td>
    </tr>
    <tr>
      <td>Contacts</td>
      <td>
        Has the <em>Account</em> field, which will require an Account ID<br>
        Has the <em>Contact Owner</em> field, which will require a User ID
      </td>
    </tr>
    <tr>
      <td>Planets</td>
      <td>Has no relevant relationships</td>
    </tr>
    <tr>
      <td>Deliveries</td>
      <td>
        Has the <em>Destination Contact</em> field, which will require a 
        Contact ID<br>
        Has the <em>Destination Planet</em> field, which will require a Planet 
        ID<br>
        Has the <em>Owner</em> field, which will require a User ID
      </td>
    </tr>
    <tr>
      <td>Crew Member Assignments</td>
      <td>
        Has the <em>Crew Member</em> field, which will require a User ID<br>
        Has the <em>Delivery</em> field, which will require a Delivery ID
      </td>
    </tr>
  </tbody>
</table>
<br>

This paints a bit clearer picture about our data and how each object is 
related, and we can begin to see how the order of our imports might be 
important.

Using this information, we’re finally ready to lay out a roadmap for our data 
migration.

1. Import **Planet** data into Salesforce (no relationships)
2. Export “User ID” from Salesforce
    - Apply to data in Accounts spreadsheet (*Account Owner* field)
    - Apply to data in Contacts spreadsheet (*Contact Owner* field)
    - Apply to data in Deliveries spreadsheet (*Owner* field)
    - Apply to data in Crew Member Assignments spreadsheet (*Crew Member* 
    field)
3. Import **Account** data into Salesforce
4. Export “Account ID” from Salesforce
    - Apply to data in Contacts spreadsheet (*Account* field)
5. Import **Contact** data into Salesforce
6. Export “Contact ID” from Salesforce
    - Apply to data in Deliveries spreadsheet (*Destination Contact* field)
7. Export “Planet ID” from Salesforce
    - Apply to data in Deliveries spreadsheet (*Destination Planet* field)
8. Import **Delivery** data into Salesforce
9. Export “Delivery ID” from Salesforce
    - Apply to data in Crew Member Assignments spreadsheet (*Delivery* field)
10. Import **Crew Member Assignment** data into Salesforce

That’s quite a few steps, but with everything laid out so clearly we can manage
it. One final bit of preparation I’ll do with my spreadsheets is add the 
columns for the data that I’ll be applying from our Salesforce exports.

For example, on his Accounts spreadsheet Farnsworth has signified the 
*Account Owner* with a text field showing the owner’s name, but we will need 
an ID field to link the *Account Owner* to a user in Salesforce. I’ll have to 
add this Account Owner ID column in the spreadsheet to prepare for the incoming
data, and I will make that column a different color to visually set it apart so
I know that it has to be populated before we import.

<div class="caption-img">
    <img class="img-fluid lazy"
         src="/images/placeholder.png"
         data-src="https://drive.google.com/uc?id=1s7_bCzH-gll2ZpqZi6A7PODkStFFZqMo"
         alt="spreadsheet account example data setup">
</div><!-- /.caption-img -->

<div class="note">
  <div class="row label">Note<span class="vertical-rule"></span></div>
  <div class="row text">
    Any formatting we apply won’t matter once we get to the import stage of our
    process, because we’ll be saving our spreadsheets as CSV files. This type 
    of file strips all formatting. So these formatting changes are helpful when
    we’re cleaning up or preparing data, but they won’t affect our import.
  </div><!-- /.row -->
</div><!-- /.note -->

Ok, I think we’re ready to dive into Salesforce! We’ll be using Dataloader.io 
to carry out our operations today, so in our Salesforce org let’s enter Setup 
and then search for and launch Dataloader.io (Integrations --> Dataloader.io).

From here we’ll go to “New Task” from the top menu and select Import.

<div class="caption-img">
    <img class="img-fluid lazy"
         src="/images/placeholder.png"
         data-src="https://drive.google.com/uc?id=1P-4tJl-FcuG7Bp280ZrxFMhiNVUOe495"
         alt="Dataloader.io home screen import button">
</div><!-- /.caption-img -->

We’re going to follow the order of operations that we put together above, and 
our first import will be Planets. From the import menu in Dataloader we’ll 
select “Insert” for our operation and Planet for our object. Then we’ll find 
the CSV file we’ve saved with our Planet data and select it for upload. 
Dataloader will suggest a mapping for fields at the next step, so we’ll verify 
that our data is mapped correctly.

<div class="caption-img">
    <img class="img-fluid lazy"
         src="/images/placeholder.png"
         data-src="https://drive.google.com/uc?id=1lWIlr57wBpWj-pF36u64h9SZpzQIc1pB"
         alt="Dataloader import field mapping">
</div><!-- /.caption-img -->

At the summary screen we’ll check over the details for our import, and since 
everything looks good we’ll Save & Run.

Since this is our first import, let’s see how it worked after the job finishes 
in Dataloader.

Back in Salesforce, let’s go to our App Launcher and find Planets. Let’s change
the List View to show all Planets, and we’ll also click the gear and “Select 
Fields to Display” so that we can view the two fields that we imported: Planet 
Name and Danger Level. After saving we can see that our import worked as 
expected and our Planet data is now in Salesforce!

Step 2 in our process is to export User data so that we can populate our 
spreadsheets. Back in Dataloader we’ll use the “New Task” menu to initiate an 
Export.

For object we’ll select User, and then on the field selection screen we’ll 
select User ID and Full Name. In our situation we don’t need filtered results, 
so we’ll leave our filters on the default values.

After running the export we can click on the link for our successes, which 
will download a CSV file that we can use to populate our spreadsheets.

<div class="note">
  <div class="row label">Note<span class="vertical-rule"></span></div>
  <div class="row text">
    Since I’m dealing with such a small set of data I’m comfortable 
    copy/pasting from the exported CSV files into the spreadsheets I’ll use for
    importing. However, when handling large amounts of data it might make sense
    to use spreadsheet formulas to match data instead so that we avoid any 
    “user error” and maintain data integrity when preparing for an import. 
  </div><!-- /.row -->
</div><!-- /.note -->

Now that we have User data, let’s review our tasks for step 2.

<ol start="2">
  <li>
    Export “User ID” from Salesforce
    <ul>
      <li>
        Apply to data in Accounts spreadsheet (<em>Account Owner</em> field)
      </li>
      <li>
        Apply to data in Contacts spreadsheet (<em>Contact Owner</em> field)
      </li>
      <li>Apply to data in Deliveries spreadsheet (<em>Owner</em> field)</li>
      <li>
        Apply to data in Crew Member Assignments spreadsheet (<em>Crew 
        Member</em> field)
      </li>
    </ul>
  </li>
</ol>

We’ll head into our spreadsheets and make sure that we populate each of the 
necessary fields with the appropriate User ID values. After we’re finished we 
can move on to step 3, importing Account data into Salesforce.

Just like the first one we did, we’ll initiate a new import in Dataloader. On 
the field mapping screen we need to make sure that our “Account Owner (ID)” 
column on the spreadsheet is mapping to the Owner ID field for Accounts. We can
ignore the “Account Owner (Name)” column on the spreadsheet. After we finish 
mapping we can move through the next screen and then Save & Run.

When the import finishes let’s repeat our checking process: we’ll head over to 
Salesforce and find Accounts from the App Launcher. We’ll show all Accounts in 
our list view, and we’ll select all of the fields that we just imported.

<div class="caption-img">
    <img class="img-fluid lazy"
         src="/images/placeholder.png"
         data-src="https://drive.google.com/uc?id=17mbrj_fKTuAjiuvEG4E2orE1-IO0Lrom"
         alt="List View of all Accounts after importing Account data">
</div><!-- /.caption-img -->

We can see that our Account Owner relationship was imported correctly, along 
with the other fields. Looking good!

The process should be familiar now that we’ve successfully run through it with 
a couple of objects, so we’ll quickly finish up our final three objects with 
similar actions in steps 4–10. We make sure to check our data in Salesforce 
after each import to ensure that everything is working as expected.

<ol start="4">
  <li>
    Export “Account ID” from Salesforce
    <ul>
      <li>
        Apply to data in Contacts spreadsheet (<em>Account</em> field)
      </li>
    </ul>
  </li>
  <li>
    Import <strong>Contact</strong> data into Salesforce
  </li>
  <li>
    Export “Contact ID” from Salesforce
    <ul>
      <li>
        Apply to data in Deliveries spreadsheet (<em>Destination Contact</em> 
        field)
      </li>
    </ul>
  </li>
  <li>
    Export “Planet ID” from Salesforce
    <ul>
      <li>
        Apply to data in Deliveries spreadsheet (<em>Destination Planet</em> 
        field)
      </li>
    </ul>
  </li>
  <li>
    Import <strong>Delivery</strong> data into Salesforce
  </li>
  <li>
    Export “Delivery ID” from Salesforce
    <ul>
      <li>
        Apply to data in Crew Member Assignments spreadsheet 
        (<em>Delivery</em> field)
      </li>
    </ul>
  </li>
  <li>
    Import <strong>Crew Member Assignment</strong> data into Salesforce
  </li>
</ol>

<div class="caption-img">
    <img class="img-fluid lazy"
         src="/images/placeholder.png"
         data-src="https://drive.google.com/uc?id=19-S9w0Lg07ao1vfTlmPplvym__pNtmqA"
         alt="List View of all Contacts after importing Contact data">
    <div class="caption">
      <p>
        List View of all Contacts after importing <strong>Contact</strong> data
      </p>
    </div><!-- /.caption -->
</div><!-- /.caption-img -->
<br>

<div class="caption-img">
    <img class="img-fluid lazy"
         src="/images/placeholder.png"
         data-src="https://drive.google.com/uc?id=1or3PYvglZnz3Pva_FzhSpdmX_l1hOVSE"
         alt="List View of all Deliveries after importing Delivery data">
    <div class="caption">
      <p>
        List View of all Deliveries after importing <strong>Delivery</strong> 
        data
      </p>
    </div><!-- /.caption -->
</div><!-- /.caption-img -->
<br>

<div class="caption-img">
    <img class="img-fluid lazy"
         src="/images/placeholder.png"
         data-src="https://drive.google.com/uc?id=1-OgCordPLf1lKTymR-g04HsuF0aESj-f"
         alt="List View of all Crew Member Assignments after importing data">
    <div class="caption">
      <p>
        List View of all Crew Member Assignments after importing <strong>Crew
        Member Assignment</strong> data
      </p>
    </div><!-- /.caption -->
</div><!-- /.caption-img -->
<br>

We can see after each of these imports that the relationships between our 
objects are coming into Salesforce correctly, thanks to our planning with 
record IDs.

We started with a broad overview of the objects in our data model, and then we 
zoomed in on the relationships between those objects. That allowed us to see a 
logical order for importing our data, and we were able to put together a 
straightforward plan with detailed steps to get the job done. All it took after
that was a bit of careful work, and now we’ve got real, live data in our 
Salesforce org!

If you have questions or suggestions for more efficient data migration, drop a 
comment below!
<br><br>

---

<br>
Some references for this post:
- [Dataloader.io](https://dataloader.zendesk.com/hc/en-us){:.underline-effect}{:target="blank"}
    