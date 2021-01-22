---
title: User Management & Security
hero: https://drive.google.com/uc?export=view&id=1tGKBu9vaURElR6cU9X-gORQXFNKRk4dj
heroAlt: Philip Fry cheering
author: Cory Romdenne
comments: true
---

We have a data model, now it’s time to set up access for our users. We need to 
make sure that Fry can’t accidentally mess anything up (or that Bender can’t do
it on purpose).<!-- end_excerpt --> This will take some consideration!

Let’s start at the top with our Organization-Wide Defaults.

To make sure that our data is safe from crew member accidents, we’re going to 
go with a “Public Read Only” setting at the organization level. This will apply
to **Accounts**, **Planets** and **Deliveries**. We’ll then use custom profiles
to open up data for our CEO and Bureaucrat.

Our ship Captain needs to have edit access to a few objects as well, but since 
the intergalactic delivery business is fairly dangerous we never know when our 
captain will be… ahem… “relieved of duty”… We’ll use a permission set to open 
up access for them so that we can easily swap captains if needed.

So, let's get started! We’ll take care of those Organization-Wide Defaults 
first.

We need to open up Setup and then find “Sharing Settings” (Security --> Sharing
Settings). We’ll click “Edit” and then make sure the objects we mentioned above
are set to “Public Read Only” (**Accounts**, **Planets** and **Deliveries**). 
After we save it’ll probably take a bit for the sharing settings to be 
“recalculated”.

<div class="caption-img">
    <img class="img-fluid lazy"
         src="/images/placeholder.png"
         data-src="https://drive.google.com/uc?id=1N5bKTSHQGH8vbbUprlB7ySPVyJtIsSQP"
         alt="Organization-Wide Defaults">
</div><!-- /.caption-img -->

Next we’ll set up our custom profiles. I stumbled across a tip to incorporate 
the org name at the beginning of custom profiles for branding purposes and so 
that these profiles are sorted together in what can become a pretty long list. 
I like that, so we’re going to use these names for our custom profiles:
- PLEX Manager
- PLEX Bureaucrat
- PLEX Crew Member


Let’s find Profiles in Setup and get to work implementing them (Users --> 
Profiles).

<div class="note">
  <div class="row label">Note<span class="vertical-rule"></span></div>
  <div class="row text">
    In a normal org we’d have more user licenses, but with the limitations of our dev org we’re going to use a combination of “Salesforce” and “Salesforce Platform” licenses for our handful of users. We’ll give our CEO a “Salesforce” license so that he has all functionality, and the rest of our users will get “Salesforce Platform” licenses to use the custom app that we’ll eventually be creating.
  </div><!-- /.row -->
</div><!-- /.note -->

For our first custom profile, PLEX Manager, we’ll clone the “Standard User” 
profile so that we have a good starting point.

<div class="caption-img">
    <img class="img-fluid lazy"
         src="/images/placeholder.png"
         data-src="https://drive.google.com/uc?id=1TNEmqgNqvYvXQ-vQF3MKXmSzz9p5ZsHh"
         alt="clone a standard profile">
</div><!-- /.caption-img -->

Now we need to modify access for our PLEX Manager profile. In particular, we 
need to make sure this profile has the following privileges:
- “Assign Permission Sets”
- “Create and Customize Dashboards”
- “Create and Customize Reports”
- “Create Dashboard Folders”
- “Create Report Folders”
- “Manage Dashboards in Public Folders”
- “Manage Reports in Public Folders”
- “View Dashboards in Public Folders”
- “View Reports  in Public Folders”
- “Modify All” on **Accounts** and **Contacts**
- “Modify All” on **Planets**, **Deliveries** and **Crew Member Assignments**

After plenty of checking boxes, we’re ready to move on to our next profile, 
PLEX Bureaucrat. This time we’ll clone the “Standard Platform User” profile. 
Here are the special privileges for this profile:
- “Create and Customize Dashboards”
- “Create and Customize Reports”
- “Create Dashboard Folders”
- “Create Report Folders”
- “Manage Dashboards in Public Folders”
- “Manage Reports in Public Folders”
- “View Dashboards in Public Folders”
- “View Reports  in Public Folders”
- “View All” on **Accounts** and **Contacts**
- “View All” on **Planets**, **Deliveries** and **Crew Member Assignments**

Finally, we can wrap up our work on profiles by creating our last one, PLEX 
Crew Member. This profile is relatively restrictive:
- “View Dashboards in Public Folders”
- “View Reports  in Public Folders”
- “Read” on Accounts and Contacts
- “Read” on **Planets**, **Deliveries** and **Crew Member Assignments**
- No “Read Access” on **Planet** *Danger Level*

After checking all of the appropriate boxes and saving like we did on the 
other profiles, we go back and find **Planet** under “Custom Field-Level Security”.
We’ll deselect the “Read Access” box so that Crew Members can’t see the *Danger 
Level* for a **Planet** (we wouldn’t want to risk a boycott over some of our 
more dangerous deliveries…).

<div class="caption-img">
    <img class="img-fluid lazy"
         src="/images/placeholder.png"
         data-src="https://drive.google.com/uc?id=1Q89p6GOBaaoVitFK9iFDLpwgEJ5APzAQ"
         alt="custom object field-level permissions">
</div><!-- /.caption-img -->

With all of our profiles complete, our next order of business is to configure 
the Permission Set for our Ship Captain. We’ll navigate to “Permission Sets” 
(Users --> Permission Sets) and click “New”.

<div class="caption-img">
    <img class="img-fluid lazy"
         src="/images/placeholder.png"
         data-src="https://drive.google.com/uc?id=1nnbItUVswC_qsZJZafj6S0xwlZo_rjl3"
         alt="create a new permission set">
</div><!-- /.caption-img -->

Here are the special permissions our Ship Captain will need:
- Modify All on **Deliveries** and **Crew Member Assignments**
- Edit on **Planets**
- “Read Access” on **Planet** *Danger Level*

After saving our Permission Set we see a screen with all of the different 
settings we can modify.

<div class="caption-img">
    <img class="img-fluid lazy"
         src="/images/placeholder.png"
         data-src="https://drive.google.com/uc?id=1I-umwm8_bxUXkhpjFg1cxX20qGEjkKAP"
         alt="permission set options and settings">
</div><!-- /.caption-img -->

From here let’s open “Object Settings”.

Permission Sets can only *add* access, not *remove* it. So even though a bunch 
of the objects in here say “No Access”, as long as our user has a profile that 
allows access to those objects they will be able to access them. This is the 
case with our Ship Captain — as a user with any of the PLEX profiles we just 
set up, they will have varied access to the objects in our org already.

With that in mind, let’s open each of the objects the Ship Captain needs and 
modify the level of access they have as outlined above.

<div class="caption-img">
    <img class="img-fluid lazy"
         src="/images/placeholder.png"
         data-src="https://drive.google.com/uc?id=17k7vxbp9k46ZUhZx7Pqrgcf_h0QoxOUT"
         alt="modifying permissions on Planet for our permission set">
</div><!-- /.caption-img -->

At this point we can consider setting up a Role Hierarchy to grant access to 
records. However, Planet Express is a small company without many employees, 
and for now our needs are satisfied by the profiles and permission sets we’ve 
just set up. We’ll save the Role Hierarchy for another day.

Now that our user management and sharing model is complete, we’re finally ready
to create our users! We can go through and create users one-by-one or by using 
the “Add Multiple Users” feature. Here’s who we’re adding today.

<table class="table table-striped">
  <thead class="thead-dark">
    <tr>
      <th>Name</th>
      <th>Title</th>
      <th>License</th>
      <th>Profile</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Hubert Farnsworth</td>
      <td>CEO</td>
      <td>Salesforce</td>
      <td>PLEX Manager</td>
    </tr>
    <tr>
      <td>Hermes Conrad</td>
      <td>Bureaucrat (Grade 34)</td>
      <td>Salesforce Platform</td>
      <td>PLEX Bureaucrat</td>
    </tr>
    <tr>
      <td>Turanga Leela</td>
      <td>Captain</td>
      <td>Salesforce Platform</td>
      <td>PLEX Crew Member</td>
    </tr>
    <tr>
      <td>Philip Fry</td>
      <td>Delivery Boy</td>
      <td>Salesforce Platform</td>
      <td>PLEX Crew Member</td>
    </tr>
  </tbody>
</table>

<div class="caption-img">
    <img class="img-fluid lazy"
         src="/images/placeholder.png"
         data-src="https://drive.google.com/uc?id=1D_EZjONH_1C-uiZ0kJLl8VtkVfSqOGTS"
         alt="all users we've created">
    <div class="caption">
      <p>
        Our finished list of users with appropriate profiles.
      </p>
  </div><!-- /.caption -->
</div><!-- /.caption-img -->

Once we’ve finished creating our users we just have one thing left to do: 
assign Leela the Ship Captain Permission Set. We can do that from here. We’ll 
click on Leela’s name in the user list, and then find “Permission Set 
Assignments” at the top of the next screen. We click "Edit", add the PLEX Ship 
Captain Permission Set, and save. Voila!

Just like that, we have a functioning set of users and permissions. Using 
Organization-Wide Defaults, Profiles and Permission Sets we were able to 
configure our org to both distribute access to the right people and to protect 
data from accidents caused by too much access.


If you have questions or suggestions for improved user management, drop a 
comment below!
<br><br>

---

<br>
Some references for this post:
- [Standard User Licenses](https://help.salesforce.com/articleView?id=users_license_types_available.htm&type=5){:.underline-effect}{:target="blank"}
- [User Management Best Practices](https://help.salesforce.com/articleView?id=000354326&language=en_US&mode=1&type=1){:.underline-effect}{:target="blank"}
- [Organization-Wide Sharing Defaults](https://help.salesforce.com/articleView?id=security_sharing_owd_about.htm&type=5){:.underline-effect}{:target="blank"}
- [Profiles](https://help.salesforce.com/articleView?id=admin_userprofiles.htm&type=5){:.underline-effect}{:target="blank"}
- [Permission Sets](https://help.salesforce.com/articleView?id=perm_sets_overview.htm&type=5){:.underline-effect}{:target="blank"}
    