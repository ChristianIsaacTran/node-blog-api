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

          [Youtube](https://www.youtube.com/watch?v=7nafaH9SddU&t=7s)

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

## jwt token creation and the two methods for verification

- So from what I've learned from reading the documentation of jsonwebtoken library and the passport-jwt strategy,
  is that creation happens when the user logs in successfully, but should happen OUTSIDE the passport local-strategy function as a
  middleware after.

        - inside authController.js

        const loginUser = [
            passport.authenticate("local", { session: false }),
            async (req, res) => {

                jwt.sign(payload, secretkey, tokenCallbackForAsync
                (error, token) {

                    res.json({
                        token: newlyMadeJwtToken
                    });
                });
            }
        ];

        passport.authenticate() uses the local strategy to log the user in normally, then after that if successful, calls next() to move onto the next middleware which contains the jwt.sign(). jwt.sign() requires a payload (which contains unique user info to lookup the user later, but NO SENSITIVE INFO. maybe a userid or something). Then a secretkey to generate the jwt. secretkey MUST BE THE SAME ON CREATION OR AUTHORIZATION, so keep the secretkey in a .env. Then the token callback which on creation, contains two parameters, error and the actual jwt token. This way, WITHIN the callback, I can use res.json({}) to send the token back to the user, and Voila! The user now has a newly generated jwt token for access. I will add options later to set the jwt to expire.

- Then, once the user gets the jwt token back and saves it somewhere, (in my case, I am going to save the jwt token in the localstorage in the front-end), then I can make requests to the back-end REST api by putting the token into the request header under "authorization" in the "bearer" format.

        - ex: on the front-end

        inside request header on front-end:

        "authorization": "bearer [jwt token goes here, stored in localStorage]

- Now that the token is generated for logged in users, ANY route on the backend I want to keep private, I just have to add a step to verify the incoming jwt token from the request header, but there are two ways I can do this:

        way 1. The jsonwebtoken library:

        The jsonwebtoken library has a

        jwt.verify(token, secretkey, callback(error, payload) => {});

            - inserting the jwt token into the .verify() function with
            the SAME secretkey that was used during creation of the
            jwt decodes the payload from it, and puts it into the
            callback function as the "payload". Theres also an error
            parameter that I can use to have error handling upon unsuccessful verify of the jwt (could send back a res.status(403) to indicate unauthorization).

        way 2. The passport-jwt strategy (I did this one):

            - using the passport-jwt strategy from npm, I defined that strategy as an extra strategy in passportConfig.js alongside the local-strategy. Once defined, I can use the passport.authenticate(), but specify to use the "jwt" strategy by:

            passport.authenticate("jwt", {session: false});

            - putting passport.authenticate() on ANY routes I want protected will check for the jwt token. If its not verified, then it will prevent the user from accessing that route.

            - note: the {session: false} is an option that HAS to be toggled for both the local-strategy and the "jwt" strategy because by default, passport assumes session storage instead of jwt, so I have to specify it or else passport will have errors with non-existent sessions.

            - explaination of how to configure the passport-jwt strategy is in comments in the "passportConfig.js" file.

- Note: also when creating and signing the jwt, if the jwt has an expiration on the options, it will be encoded into the jwt itself. I can see the expiration and the "iat" (short for issued at) when the jwt is decoded in passportConfig.js under the jwt strategy.
