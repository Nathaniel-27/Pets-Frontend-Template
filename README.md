# Web 4 Front End (for the API we built in Web 4)

To run the project, all you need to do is install the dependencies (assuming that you have already installed Node):
```
npm install
```
And run it:
```
npm run dev
```
You can log in with these accounts:
- john@doe.com  (admin)
- jane@doe.com  (standard user)

The password for both is test1234

It's currently set up to make API calls to my (live) version of the Web 4 final project.
You can update the **VITE_API_BASE_URL** variable in the .env files to point it to a different
environment (in development, we ran the API on localhost:3000)


## Notes
I gave this project to the students at the end of the Web 4 so that they have a starter frontend
to match the API that they created in the course. They should be able to understand the code with the
exception of one important thing - the login page and process (see the notes on that below).

In Web 3, the students created a React app that did CRUD operations against a fake API (called **JSON Server**), and it did not require a login. This gave them some exposure to the concept of APIs, which primed them for building their own API in the Web 4 class.

I found that 7 weeks was not enough time to really understand React. And we did not have time in Web 4 to do 
much with React. In Web 4, we worked together in class to start an API that managed user accounts. And for the final project the students had to design a database, and build that into the API. Near the end of the semester, I gave them this project and told them that it could be a good starting point for them to build a frontend for their API project, because it already includes functionality to do CRUD operations on users. They could then add functionality to match the features that they added to the API in their final project.

My sense is that the students have a much better understanding of the API code in Web 4 than they do of the React code from Web 3

## The Login Page
The login page incorporates some things that we did not have time to cover in Web 3
- useContext - to store a user's data when they log in
- Axios interceptors - to send an access token with each request, so that the API can authorize/authenticate the request
- useRef - my intention was to cover useRef in Web 3, but we just barely ran out of time

### The Login Process
Here's what happens when a user submits the login form with valid email and password
- The API sends the user's data in the response body and a JWT token in the Authorization header
- Both the user's data and the JWT token are put into the browser's session storage (not the most secure, but easier than using cookies). By putting them in session storage, they can persist if the user refreshes the page (otherwise the user would lose the token and have to login again after refreshing the page)
- The users's data is also stored as context (see **UserContext.jsx**)
- The NavBar component uses the UserContext to display the current user (and thier role)
- An axios intercepter (in **axios-config.js**) will intercept every API call, get the token from session storage, and add it as the Authorization header to the request

That's pretty complicated for beginning React developers!

When a user logs out, they are simply redirected to the login page, which has code in it to remove the token and the user's data from session storage on first render.

## One issue that would need to be addressed in the API
I made a mistake when designing the API. When you make a PUT request to update a user, it does not change their password. My intention was to create a separate endpoint, for the specific purpose of changing passwords, but again, we ran out of time. I put an alert in the React code for when this scenario takes place. And it should be a fairly easy fix to the API. Just check to see if the **password** property is included in the request body, and not empty. If so, hash it (with bcryptjs) and update it in the database.

We did also discuss a security vulnerability that should be fixed. A standard user can make a PUT request and escalate their role to admin. This would be another one that should be easy to fix (if only we had more time!).


