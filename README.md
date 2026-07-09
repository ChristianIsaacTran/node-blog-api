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
