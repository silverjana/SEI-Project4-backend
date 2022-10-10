# SEI Project 4

## Overview 

### Description

I wanted to build a useful website for users to arrange non urgent at-home care tasks between patients and caregivers. 
Both kinds of users can register and have a user profile page. The patient can then create a task and propose it to multiple carers. 
The Healthcare professionals will see the new task in their profile, open it for more information, and can accept it. 
Once the first one accepts, the task changes status and is not available anymore for the other professionals.

### Deployment link


### Timeframe & Working Team
We had 8 days for this solo project.

### Technologies Used

**Front end:**  
React  
HTML  
SCSS  
JavaScript  
Axios  

**Back end:**  
Python  
Django  
PostgreSQL  
Tableplus  

**Development tools:**  
Excalidraw (wireframing)  
Kanbantool  
VSCode  
NPM  
Insomnia  
Git and Github  
Google Chrome dev tools  
Heroku (deployment)  

### Brief
Build a full-stack application  
Use a Python Django API using Django REST Framework to serve your data from a Postgres database  
Consume your API with a separate front-end built with React  
Be a complete product  
Implement thoughtful user stories/wireframes  
Be deployed online so it's publicly accessible  
 
 ## Planning

First I sketched an Excalidraw plan with the pages needed, the interactions between them and some user journey mapping:  

I also planned what API requests and endpoints each page needed:  

And a diagram of the database:  

I already included some stretch goals, but I like to include them in my plan, to know where to add them if I reach them.  

Talking with the Teacher for sign-off, I realised that the best way to authenticate the user and have profile pages was to have one User model with the usual username, 
email and password, and then two Patient/Carer models with all the personal information. The User would then have the id of the patient or carer as object-id foreign key, 
along with the content-type id, to know in which table to look for that id. 

I also set up a Kanban board (visual project management) dividing the work in front/back end and single tasks:

## Process

**Day 1**

Front end: I created a React app with router and components, with a single h1 to check functionality.

Back end: Created Django project and started on the authentication app, with User model, serializer, register & login paths and views.


**Day 2**

Front end: Started with the Register components and the two forms on it.  

Back end: Finished the authentication app adding the JWT check. Created the patients app with model, common serializer and view.   
Modified register view to use a different serializer for the User depending if it’s a patient or a Healthcare professional.

**Day 3**

Front end: Completed Login component, 404 page and Pricelist. Added axios request to Register.  

Back end: RegisterView: I realised that to register with 2 users I had to separate user data from meta (patient / carer ) data, serialise the metadata to get the id, add that id to the user and then serialise the user.

**Day 4**

Front end: Started on Header, completed Footer and Login. In Register I fixed the data to send in the axios request adding the meta field. Both Login and Register work.
Created the UserProfile page and the sub component for PatientProfile, with working axios requests.
Set up a Cloudinary account and added the UploadImage sub component to upload the carer profile picture.

Back end: Created Carers app, connected the registerView, added populated serializers and profileView to get all the users data on the profile page.

**Day 5**

Front end: Renamed some Router paths for naming coherence, completed the CarerProfile sub component and the CreateTask page.   
Started on the SingleTask component. Fixed some issues on UploadImage and userProfile.    

Back end: Created Task app, with owner and assigned_carer as One-to-Many fields and possible_carers as Many-to-Many field in the Task model and populated the patient/carer serializers with the tasks. 
Started adding Permission classes to views.

**Day 6**

Front end: Fixed some small errors like a wrong useParams variable name or misspellings. In CreateTask I changed how I save the owner value, from getting it from params in the front end to getting it from current user data in task views, as it is more secure.
Added some navigation buttons and worked on data display in PatientProfile and CarersList, and completed SingleTask and UpdateTask. 
Started on the SCSS styling forms, Footer and CarerList
The carer’s profile image would not save in the meta data and then in the DB, so I changed the way I set the props and added the imageData useState.  

Back end: Added carer listView, worked on task views with add and put endpoints. CRUD functionality achieved.

	
**Day 7**

Front end: Finished CarersList by adding filters using a sub component. Added auth helper to set/get token and get payload and used it in SingleTask to get the current user id and display some data if it matches the task owner. Then I added getToken to all axios requests that need authentication. 
Completed CarerProfile by adding onAssign function and tasks display.


Back end: Added user id to JWT payload.
Updated delete endpoint in Task views as the id I was checking the task owner id against was wrongly the current user id, and not the object_id (patient id).  
Added TaskProposeView and TaskAssignView to update the task when the patient proposes a task to a carer and when a carer accepts it.  

**Day 8**

Front end: Fixed last details like title, headlines and text on buttons. Completed Navbar and single caregiver page.  
Styled buttons, messages, Navbar, Landing, profile pages, task pages.
I changed the way I compared the current user with the task owner in SingleTask using payload as it’s more secure:  
The carer profile image url was still not saving properly, so I set it directly from the sub component handling the cloudinary upload:  

Back end: Fixed last mistakes like forgotten brackets, and tried to update the single task put endpoint as there are issues when trying to edit an already proposed task, but did not have time to work it out.


**Deployment**
I moved the front end repository as client in the back end one using this:

Unfortunately I did not manage to deploy successfully to Heroku, and even the teacher had a really hard time trying to understand why, as locally it works fine. 


## Final Product
Landing:


Registration:


User profile page as carer or patient:
      

Single task page seen as patient:


<img src="" alt="screenshot" width="750"/>
<img src="" alt="screenshot" width="750"/>
<img src="" alt="screenshot" width="750"/>

### Wins and blockers 
I am so proud I managed to make the 2 different kinds of user work, along with the proposing and accepting of the task back and forth between the users, as in class we just practised CRUD functionality with only one user. It also required a bit more time to set up than I was expecting, and I got some complicated errors because I was doing something completely new with a language and framework I just learned, so I did not manage to reach the stretch goals and the styling is fairly simple. I usually like my project to have a more polished look, but this time the styling had to yield to functionality.

First I had to create the User extending the AbstractUser class, with content_type differentiating the kind of user, and object_id linking to the specific patient/carer:

In the patient/carer model I added it as user = GenericRelation(User).

In the Register component I added buttons to select user type, and a ternary to show the right form.


Having a meta key in the data useState I had to spread and add an if statement to the handleChange function:


In the back end I needed to serialise and save first the meta as patient or carer, then add the id to the user to validate and save.

This is how I added the One-to-many and Many-to-many relationships of the tasks:



I am also happy I got to practice new ways to write edit endpoints:

### Bugs and future features

On the other hand, I would have liked a bit more time to finish the project as there are things I’m not really happy with. 
First of all I need to clean the code,there are a lot of console logs and unused snippets of commented out code to remove. 

Then I would like to update the edit task endpoint, as the current version does not allow the task to be edited when the possible_carers is not null. 
I also did not master the display of the errors coming back from the back end, as I found selecting the right data to display in the error message fairly convoluted and time consuming.

There are also some Bugs: when a patient deletes a task, a bad gateway error appears even when successfully deleted and the carer list CSS is not great, as the cards don’t stay the same size with different profile pictures.





