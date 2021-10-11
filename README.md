# General Assembly Project 3: Mugglemore
![](https://lh5.googleusercontent.com/hMAVHoRMwUwzbXtvNhyvBj2faaFF0MkCl3Na7VFs7C3_kO4oIOhub3t2fw1q5iigB1LIEYoU7H_bv92DEV0RrYgrVPsYg-b4gk0ocoHXhnfbTISCCvQH6DMgqEWGulg3AlPUTTk=s0)

Table of Contents
====================================================================================================================================================================================================

1.[Overview](#overview)

2.[Project Brief](#projectbrief)

3.[Mugglemore](#mugglemore)

4.[Getting Started](#gettingstarted)

5.[Process](#process)

  1. [Planning](#planning)

      1. [Meetup-clone](#meetupclone)

      2. [Database relationships](#databaserelationships)

      3. [Next steps](#nextsteps)

  2. [Backend](#backend)

      1. ['Product' models](#productmodels)

      2. [User model](#usermodel)

          1.[Passwords](#passwords)

          2.[Authentication](#authentication)

  3. [Frontend](#frontend)

      1. [User Profile](#userprofile)

      2. [Styling](#styling)

6.[Known Bugs](#bugs)

7.[Wins](#wins)

8.[Challenges](#challenges)

9.[Key Learnings](#learnings)

10.[Future Content](#futurecontent)


Overview <a name="overview"></a>
========

This was my third project as part of the General Assembly immersive Software Engineering course, in which my group built a full stack application called Mugglemore, a meetup site for Harry Potter fans, using MongoDB, Express, React and Node.

Project Brief <a name="projectbrief"></a>
=============

In this group project we were tasked to build a full stack MERN application.

Timeframe: 8 days

Group members:

-   [Maggie Ward](https://github.com/MaggieLiz)

-   [Victor ReySantos](https://github.com/vjmreysantos)

Technologies used:

-   Node.js

-   Express

-   MongoDB

-   Mongoose

-   React.js

-   React-router-dom

-   React-select

-   React-map-gl

-   SCSS

-   Bootstrap React

-   JWT

-   Bcrypt

-   Axios

-   Git + GitHub

-   MapBox

Mugglemore <a name="mugglemore"></a>
==========

For this project we were inspired by [MeetUp](https://www.meetup.com/) and wanted to create a similar site, which allowed users to create and join events. To make it more fun, we dedicated it to all things Harry Potter and called it Mugglemore, taking inspiration from [Wizarding World](https://www.wizardingworld.com/) (previously Pottermore).

You can see the deployed site [here](https://mugglemore.netlify.app/) or click the link below to watch an overview of site functionality.


[<img width="891" alt="Screenshot 2021-10-09 at 17 52 22" src="https://user-images.githubusercontent.com/78015278/136667402-281b90cc-800a-4db2-9e52-30f78460c6c9.png">](https://www.youtube.com/watch?v=NKpSO7AaPp4)



Getting Started <a name="gettingstarted"></a>
===============

-   Clone or download the repo

-   Backend:

-   `npm i` to install any dependencies 

-   `npm run seed` to run the seed files

-   `npm run dev` to start the server 

-   Frontend:

-   `npm i` to install any dependencies

-   `npm run dev` to run the client and open localhost:3000

-   Please note MapBox is used in this app, so there might be some issues around mapbox tokens if downloading the code. You can get a free account to provide your own mapbox token locally here: <https://www.mapbox.com/>

Process <a name="process"></a>
=======

Planning <a name="planning"></a>
--------

### Meetup-clone with a Wizarding World twist <a name="meetupclone"></a>

We quickly decided as a group that we liked the idea of building a clone of a well-known site to see if we could recreate its functionality. We made a shortlist of a few sites which we thought provided some interesting challenges and made a list of key features we'd need to build for each. From there, we debated which we felt would offer the best balance of testing our understanding of the latest course module, while being feasible within the timeframe.

We settled on Meetup, but wanted to put a fun twist on it to make it more of our own creation, which led us to Mugglemore, a meetup site exclusively for Harry Potter fans. This theme enabled us to be a bit more creative with the seed data and styling for the site.

### Database relationships <a name="databaserelationships"></a>

Once this was decided, we went through the Meetup site again from the start of the user journey and created a wireframe for each relevant page. While drawing up the wireframes we discussed in detail which features we definitely wanted in the MVP vs which could be stretch goals, and considered carefully how these features would translate on the backend in terms of Mongoose relationships.

We realised there were some complex relationships involved, in particular around nested events within groups, whereby Admins of groups of Meetup can create events solely for members of that group. We decided that this would probably be too much for us at that stage of our learning when we had so much else to do with the site. We therefore decided to focus on allowing users to create and join events, online events and groups as long as they were signed in on a valid account.

### Next steps <a name="nextsteps"></a>

![](https://lh4.googleusercontent.com/ImPeig5aGwJUhIJ_5TlPeg-JQ7gjpGw_qcWqN8ErpjzB6b4t2EjMAwd84ahVMW26EDJ-d3gPuoaj3IyCJlOifvvYUhgqIwkPqLdgU4qKlia2uXJByUBBw1HIAQdX3yJo6GQizJw=s0)

We knew it would be in the interest of time and team cohesion to make sure our backend was in good shape from the start, rather than having to go back and amend after already dedicating time to seed files or the front end.

We decided to work together on all steps of the back end and then separate to work on sections of the front end. This ended up working really well as it meant we were all well versed with the server and could not only work independently, but easily step in to help other teammates as needed.

We gave ourselves three days to build the backend and then created a timeline and Trello board to divide front end tasks between us. Initially we split the three main areas of the site: events went to me, online events to Victor and groups to Maggie.

We met every morning to have "merge parties" and discuss how we were getting on, but would often meet again in the afternoon, or, towards the end of the project, sit in the same Zoom room so we could quickly discuss issues.

In this ReadMe, I will focus on areas of the project that I specifically worked on. If you would like a fuller picture, please do check out [Maggie](https://github.com/MaggieLiz) and [Victor's](https://github.com/vjmreysantos) Githubs.

Backend <a name="backend"></a>
-------

### 'Product' models <a name="productmodels"></a>

After the initial setup of the server, connecting to the port and database, adding in the logger and error handling middleware, etc., we began writing our main 'product' models.

Here is the code for the events model as an example. As you can see, we used both embedded and referenced relationships for comments and attendees and addedBy respectively.

```

const  eventSchema = new  mongoose.Schema(

 {

   name: { type:  String, required:  true },

   image: { type:  String, required:  true },

   description: { type:  String, required:  true, maxlength:  500 },

   category: [{ type:  String, required:  true }],

   date: { type:  String, format:  Date, required:  true },

   time: { type:  String, required:  true },

   location: {

     placeName: { type:  String },

     streetNumber: { type:  Number },

     streetName: { type:  String, required:  true },

     postcode: { type:  String, required:  true },

     latitude: { type:  Number, required:  true },

     longitude: { type:  Number, required:  true },

   },

   attendees: [{ type:  mongoose.Schema.ObjectId, ref:  'User' }],

   addedBy: { type:  mongoose.Schema.ObjectId, ref:  'User', required:  true },

   comments: [ commentSchema ],

 }

)
```

Once the model for each product was set up, we created our controllers and hooked up the RESTful routes.

For events we needed requests for all basic CRUD functions, as well as creating and deleting comments, and attending and un-attending events (which we produced using a toggle function). All of these functions were exported as an object like so:

```

export  default {

 createEvent:  createEvent,

 eventIndex:  eventIndex,

 eventShow:  eventShow,

 eventEdit:  eventEdit,

 eventDelete:  eventDelete,

 createEventComment:  createEventComment,

 deleteEventComment:  deleteEventComment,

 attendEvent:  attendEvent,

}
```

And connected to the router:

```

// REQUESTS FOR EVENTS

router.route('/events')

 .get(events.eventIndex)

router.route('/events/new-event')

 .post(secureRoute, events.createEvent)

router.route('/events/:eventId') 

 .get(events.eventShow)

 .put(secureRoute, events.eventEdit)

 .delete(secureRoute, events.eventDelete)

 .post(secureRoute, events.attendEvent)

router.route('/events/:eventId/create-comment')

 .post(secureRoute, events.createEventComment)

 router.route('/events/:eventId/:commentId')

 .delete(secureRoute, events.deleteEventComment)
 ```

Here is the code for the toggle attending function as an example.

```

async  function  attendEvent(req, res, next) {

 const { eventId } = req.params

 const { currentUserId, currentUser } = req

 try {

   const  eventToAttend = await  Event.findById(eventId).populate('attendees')

   if (!eventToAttend) {

     throw  new  NotFound()

   }

   if (eventToAttend.attendees.find(user  =>  currentUserId.equals(user._id))) {

     eventToAttend.attendees.remove(currentUserId)

} else {

     eventToAttend.attendees.push(currentUser)

   }

   await  eventToAttend.save()

   return  res.status(202).json(eventToAttend)

} catch (err) {

   next(err)

 }

}
```

We start by finding the event the user wishes to attend and populating the attendees field, as we will want the attendees' information to show on the front end and not simply the referenced user ID.

Then we say, if it is not the correct event, throw a custom NotFound error (which we set up in our error handling).

If it is the correct event, it moves onto the toggle function, which simply says if the event's attendees field array includes a user ID matching that of the current user, remove that user from the array as they are already attending, else add them to the array.

If all of this has been completed successfully, the new event details are saved and a 202 accepted response is sent.

### User model <a name="usermodel"></a>

#### Passwords <a name="passwords"></a>

Once the product models were completed, we moved onto the user model, which is more complicated due to passwords and authentication.

We had several virtual fields on our user model, such as created and joined events, enabling us to display referenced models without having to store that data on the user model itself. Virtuals are also useful for password confirmations, which obviously are not needed on the user model:

```

userSchema

 .virtual('passwordConfirmation')

 .set(function (passwordConfirmation) {

   this._passwordConfirmation = passwordConfirmation

 })
 ```

We installed Bcrypt to hash our user passwords before they are stored on the database for security reasons, meaning we first need to check our passwords match in the pre-validate hook of the Mongoose life cycle and then hash the password provided in the pre-save hook:

```

userSchema

 .pre('validate', function(next) {

   if (this.isModified('password') && this.password !== this._passwordConfirmation) {

     this.invalidate('passwordConfirmation', 'does not match')

   }

   next()

 })

userSchema

 .pre('save', function(next) {

   if (this.isModified('password')) {

     this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync())

   }

   next()

 })

userSchema.methods.validatePassword = function(password) {

 return  bcrypt.compareSync(password, this.password)

}
```

#### Authentication <a name="authentication"></a>

We wanted several of our requests to only be available to authenticated users logged into the Mugglemore site. To do this, we would need to create secure routes accessed via authentication tokens sent along with the requests in authorization headers. We used JSON Web Token (JWT) to do this.

As you can see in the function below, when a user logs in, firstly their password is checked, and then when logging in they are given an authorization token. On the front end, we were then able to say if a user had a token, they were authenticated and therefore had access to secure routes on the site.

```

async  function  loginUser(req, res, next) {

 try {

   const  userToLogin = await  User.findOne({ email:  req.body.email })

   if (!userToLogin || !userToLogin.validatePassword(req.body.password)) {

     throw  new  Unauthorized()

   }

   const  token = jwt.sign({ sub:  userToLogin._id }, secret, { expiresIn:  '7 days' })

   return  res.status(202).json({

     message:  `Welcome Back ${userToLogin.username}`,

     token,

   })

} catch (err) {

   next(err)

 }

}
```

Finally, after testing each request as we went along in Insomnia to make sure everything was working correctly, we each gave ourselves a set number of seed files to create for events, online events, groups and users to populate the database before moving onto the front end.

Frontend <a name="frontend"></a>
--------

On the frontend of the site, I was responsible for building the events index and show pages, the 'create an event' form, comment form, the user profile page and all styling for the site.

Events

![](https://lh3.googleusercontent.com/msZn90E8oBQiSaStixA-ITm5qnfWumNfjTOhty6tUJJn3i32oiptXzXrXi8_L-csK5KOmvG2T3vQLUb31pQ6IlX4jekQ1tih5omXOZ2FCopoZi4RyhcDforg1RyE9-cNmp2NCHY=s0)

On the event index page, I quite simply ordered the results of a get all events request in date order and added a simple search bar, allowing users to search by title or category.

I created an event card component, which allowed me to neatly compartmentalise the events shown on the event index page and this event card linked to the event show page, displayed above.

On the event show page, I made use of MapBox to create a handy map feature, showing users where the event was taking place (see EventMap.js component in the code if you are interested in seeing this in detail).

I included some conditional rendering on the event show page, depending on whether the user had created the event, was attending or was logged in. For example, if the user was the owner of the event, the page would show a delete button, allowing them to delete the event if they wish:

```

{isOwner(event.addedBy._id) ?

             <div  className="hosted-by">

               <img  className="hosted-by-image"  src={event.addedBy.avatar}  alt={event.addedBy.username}></img>

               <p>You are hosting this event</p>

               <Button  variant="danger"

                 onClick={handleSubmit}>

               Delete event

               </Button>

             </div>

             :

             <div  className="hosted-by">

               <img  className="hosted-by-image"  src={event.addedBy.avatar}  alt={event.addedBy.username}></img>

               <p>Hosted by <span>{event.addedBy.username}</span></p>

             </div>

           }
```

On the bottom of the page, I created a fixed attendance banner, taking inspiration from Meetup, using some basic CSS positioning. I felt this was helpful for the user experience as they could scroll to see the event details while always having the attend button in sight. Again, this was conditionally rendered, so if you were already attending, you could click to un-attend.

Logged in users can also leave comments. When pressing the "create a comment" button, they are taken to a comment form. In an ideal world, we would enable users to leave comments directly on the event show page but we had some issues with too many post requests at the same url and prioritised attending over comments. This would be an area to improve if we had more time, perhaps by looking into modal popups.

### User Profile <a name="userprofile"></a>

![](https://lh3.googleusercontent.com/DLbDC-hmZNmMyYpiq-ZzeCsdFraM3COiokKuASGzvM5_n2fUZYCDnvKyNL9fQD-STIydsp6vmeR7eJXhjwrHRbfbQ5FQOCTVVxu_eRGF2QwfJD4UhE7yiqu-jnY7_9zYokc3fns=s0)

For the user profile page, I set it to conditionally display a little write up depending on which Hogwarts house the user belonged to. 

Then, the profile page displays the user's groups, events and online events, as well as groups they have created and are an admin for. This was achieved by simply mapping the relevant user fields provided from the getProfile request, for example:

```

{user.createdGroup.length === 0 ?

             <p>You are not an admin for any groups yet!</p>

             :

             user.createdGroup.map(group  => (

               <a  className="created-group"  key={group.name}href={`/groups/${group._id}`}>

                 <h5>{group.name}</h5>

                 <figure  className="created-group-image">

                   <img  src={group.image}  alt={group.name}></img>

                 </figure>

               </a>

             ))

           }
```

Styling <a name="styling"></a>
-------

I was responsible for the styling of the site. I took inspiration from [Wizarding World](https://www.wizardingworld.com/) in terms of the starry background (which twinkles), the hero images at the top of the index pages and the font-style. I also added some small details like adding spell names to buttons on forms to give it some extra personalisation, and I made use of Bootstrap-React for forms and buttons.

The most challenging and time-consuming element of styling was making sure pages which had been coded by other group members looked uniform. This often meant going back and adjusting page structures and div class names to avoid too much repetition in the SCSS.

In hindsight, I realise it would have been useful to say from the start who was styling the site and for that person (me in this instance) to provide some basic classNames and page structure templates for other group members to work with - a good lesson to learn!

Known Bugs <a name="bugs"></a>
==========

-   After deployment, the online event show pages have started being a bit buggy. Some will randomly not appear and provide a blank screen. It is not consistent however and seems to get better the longer the site is open.

Wins <a name="wins"></a>
====

-   It was great working in a team and familiarising myself with Git group working. This was an invaluable experience in preparing me for working in teams professionally and I really enjoyed it.

Challenges <a name="challenges"></a>
==========

-   We had some difficulties with pages not refreshing as expected with state updates. At first, simply to enable us to proceed with the project, we got around this by using location.reload(), but knew this wasn't ideal. We sought advice from the course teachers and learned this could be resolved by awaiting the relevant axios function for that page and setting state again in our submit function. For example, on the attend event function, this meant not only awaiting the attendEvent request but also the getSingleEvent request again in order to trigger a new state and page refresh.

-   As mentioned above, it was difficult to provide the exact user experience we wanted as we had issues trying to implement more than one post request on the same url.

-   As mentioned in the styling section above, I learned that setting some styling guidelines for your teammates in advance would be helpful for time management.

Key Learnings <a name="learnings"></a>
=============

-   It was great to learn about Git Group working, how to successfully resolve merge conflicts and the importance of working on branches for version control, etc.

-   It was really interesting to be given a basic introduction to password and token authentication through Bcrypt, JWT and secure routing, although I'm aware this isn't even really the tip of the iceberg when it comes to these things!

-   This project solidified my understanding of state and my ability in React.

-   Learning about NoSQL databases and the importance of properly planning the structure of your database models to aid user experience on the frontend.

Future Content <a name="futurecontent"></a>
==============

-   An image uploader tool, which would set an upload preset to all images, meaning they would be a uniform shape and size to help with styling.

-   A postcode to latitude and longitude package, so users don't need to input the latitude and longitude into the create event form for the map feature.

-   Admin permissions for group creators.
