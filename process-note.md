# user registration process

- receive user data from frontend
- server side validation
  if not valid ==> response with invalid message
  -- response with invalid message
  else

  - encrypt password
  - store in the db
  - create unique url for email address
    --validation and send that url to the client email

    -> once the client receives the email, they will follow the link that should redirect him to frontend page where we get the unique key and email part of the url and call server to verify that code

          inserver:
          receive the unique email validation code
          check if the code is valid and exists in the database

          if not{
              response invalid request message
          }

          if exit {
              update user status from inactive to active in the database
              response successful request message to the client app
          }
