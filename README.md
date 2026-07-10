# purpose of this repo

- Doing the blog api project to try to separate backend and frontend by making an api with jwt to authenticate api calls to the REST api.

- Going to use multiple github repos to house each app. No monorepos

## schema plan

        Post model
            (fields)
            id @id autoincrement
            userId relation to User model, what user made the post
            title String
            postText String
            datePosted DateTime
            published Boolean

        Comment model
            (fields)
            id @id autoincrement
            userId relation to User model, what user made the comment
            commentText String
            postId relation to Post, what post is this comment on
            dateCommented timestamp

        User model
            (fields)
            id @id autoincrement
            username string
            password string, but hashed
            posts[] relation, user can have many posts
            comments[] relation, user can have many comments

relations:

    - User to Posts: one-to-many
    - User to Comments: one-to-many
    - Post to Comments: one-to-many

## testing routes

- Currently using the Postman application to send custom json body to the api endpoints to check if it works.

- Also used the express.json() middleware to parse the json files instead of urlencoder because front end is handling that for now.

## notes about JWT (JSON web tokens)

- Using the jsonwebtoken npm library to create/sign json web tokens.

- jwt.sign(); has two modes: an asynchronous version (using a callback within .sign), and a synchronous version. I am using the asynchronous version
  as seen in the node.js jwt guide video:

          note.js api authentication with JWT:

          https://www.youtube.com/watch?v=7nafaH9SddU&t=7s

- jwt.sign(payload, secretkey, callback(error, token));

        - The payload is information about the user (NOT SENSITIVE INFORMATION) to identify the user within the token itself

        - secretkey is the way the token is "signed". As long as the secretkey is the same, the json web token can be checked and verified with the same secret on creation. Keep this in .env

        - callback(error, token): The callback is where I have access to the actual generated token after the payload and secretkey are applied to it. Inside the callback, it gives me an error variable that I can use to check for errors before using res.json({}) to send the actual token (the token parameter) to the user.

- When the client has this token, on future requests they will send that token back to the API through the request headers with

        authorization: beaerer [token here]

- Then back in the api, I can verify if the token is correct by getting the token from the authorization value from the request header:

        // get authorization from req.headers

        req.headers['authorization']

- Then I can use jwt.verify() to check if the token is the same or has been tampered with. jwt.verify() should be used as a middleware on PROTECTED ROUTES that I want only certain logged in users to have access to.

- The jwt.verify(token, secretOrPublicKey, callback(error, authData));

        - Token: The jwt token that the client sent to the server. Need to get the token from the request headers under "authorization" and formatted above with bearer [token].

        - secretOrPublicKey: Needs to be the same secret key that was used to create the token for verification. As long as the secret key is the same and the token hasn't been tampered with, it will attempt to check and decode the payload if it is valid.

        - callback(error, authData): A callback that is used to give access to the decoded payload, so the payload that was set during the jwt.sign(), will be decoded, and then the server can 
        use that user info to send back information or perform operations on protected routes with payload data.
