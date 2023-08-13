# User: 
- `userController.js` 
- Routes: 
    * `/register` 
    * `/login`

## Register user: `/register`
Example:
```sh
curl -X POST -H "Content-Type: application/json" -d '{"name": "Ms. Mortal", "username": "karmaBitch", "email": "karma@yahoo.in", "password": "karmaIsABitch_9"}' http://localhost:5000/api/auth/register | json
```
------

## Login User: `/login`
Example:
```sh
curl -X POST -H "Content-Type: application/json" -d '{"username": "karmaBitch", "password": "karmaIsABitch_9"}' http://localhost:5000/api/auth/login | json
```

------
------

# Credentials: 
- `credentialsController.js`
- Routes:
    * `/getCredentials`
    * `/addCredentials`
    * `/updateCredentials`
    * `/deleteCredentials`

## Sample curl command for `/getCredentials` route: 

- `/getCredentials` uses `req.query` format to *get* input so it should be as follows:

Format: 
```sh
curl -X GET -H "x-auth-token: <your-jwt-token>" "http://localhost:5000/api/credentials/getCredentials?username=<your-username>&website=<your-website>" | json
```

Example: 
<<<<<<< HEAD:docs/Backend/sample_controllers_reqs.md
```js
=======
```sh
>>>>>>> 2FA:docs/Backend/sample_reqs/controllers_reqs.md
curl -X GET -H "x-auth-token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0ZDMyM2E1ZjIzMmU5NDQ4MmQwOGRhMyIsImlhdCI6MTY5MTY4NDU5MiwiZXhwIjoxNjkxNzcwOTkyfQ.U1mnyhAp_riccCe_qQnjicgitAZvvM7Mp916jvfhBbI" "http://localhost:5000/api/credentials/getCredentials?username=elle&website=www.github.com" | json
```

Output: 
```json
{
  "password": "thisIsForGithub"
}
```

```sh
[nodemon] starting `node server.js`
sessionMiddleware running...
Successfully connected to MongoDB...
Server is running on port 5000...
authMiddleware running...
Decoded token:  { id: '64d323a5f232e94482d08da3', iat: 1691684592, exp: 1691770992 }
getCredentials running...
Successfully connected to MongoDB...
Username elle exists. Logging you in now...
Credentials found :)
Starting decryption...
For 'www.github.com', the password is: 'thisIsForGithub'
```

------

## Sample curl command for `/addCredentials` into db: 

### Format: 
```sh
curl -X POST -H "Content-Type: application/json" -H "x-auth-token: <your_jwt_token>" -d '{
  "username": "your_username",
  "credentials": {
    "website": "example.com",
    "password": "your_password"
  }
}' http://localhost:5000/api/credentials/addCredentials
```

Example: 
```sh
curl -X POST -H "Content-Type: application/json" -H "x-auth-token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0ZDMyM2E1ZjIzMmU5NDQ4MmQwOGRhMyIsImlhdCI6MTY5MTY4NDU5MiwiZXhwIjoxNjkxNzcwOTkyfQ.U1mnyhAp_riccCe_qQnjicgitAZvvM7Mp916jvfhBbI" -d '{"username": "elle", "credentials": {"website": "www.github.com", "password": "thisIsForGithub"}}' http://localhost:5000/api/credentials/addCredentials | json
```

Output: 
<<<<<<< HEAD:docs/Backend/sample_controllers_reqs.md
```json
=======
```sh
>>>>>>> 2FA:docs/Backend/sample_reqs/controllers_reqs.md
Credentials saved successfully :)
 {
  username: 'elle',
  credentials: [
    {
      website: 'www.github.com',
      password: 'MTBiYTRiYzBmOTg5MDljNjdiYWNjZGVmOTZmYTYwY2I=',
      _id: new ObjectId("64d50f89b13a8530ff896eb1")
    }
  ],
  _id: new ObjectId("64d50f89b13a8530ff896eb0"),
  __v: 0
}
```

------

## Sample curl command for `/updateCredentials` route: 

### Format: 
```sh
curl -X PUT -H "x-auth-token: <your-jwt-token> -d "username=<your-username>&website=<your-website-url>&newPassword=<your-new-Password> http://localhost:5000/api/credentials/updateCredentials | json
```

Example: 
<<<<<<< HEAD:docs/Backend/sample_controllers_reqs.md
```js
=======
```sh
>>>>>>> 2FA:docs/Backend/sample_reqs/controllers_reqs.md
curl -X PUT -H "x-auth-token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0ZDMyM2E1ZjIzMmU5NDQ4MmQwOGRhMyIsImlhdCI6MTY5MTcyNjI0MywiZXhwIjoxNjkxODEyNjQzfQ.3le184iAXC-9MClhun4M4A-6yLyzymQW7RGaUVmnJbU" -d "username=elle&website=www.github.com&newPassword=newGithubPw" http://localhost:5000/api/credentials/updateCredentials | json
```

Output: 
<<<<<<< HEAD:docs/Backend/sample_controllers_reqs.md
```js
=======
```sh
>>>>>>> 2FA:docs/Backend/sample_reqs/controllers_reqs.md
Credentials updated successfully :) {
  _id: new ObjectId("64d50f89b13a8530ff896eb0"),
  username: 'elle',
  credentials: [
    {
      website: 'www.github.com',
      password: 'NzViNzk3NjBiNDdmNmM1ZDc5OTJhMzEyZWQ4MjY0ZTk=',
      _id: new ObjectId("64d50f89b13a8530ff896eb1")
    }
  ],
  __v: 0
}
```

------

## Sample curl command for `/deleteCredentials` route: 

### Format: 
```sh
curl -X DELETE -H "x-auth-token: YOUR_TOKEN" "http://localhost:5000/api/credentials/deleteCredentials?username=<your-username>&website=<your-website-url>" | json
```

Example: 
```sh
curl -X DELETE -H "x-auth-token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0ZDMyM2E1ZjIzMmU5NDQ4MmQwOGRhMyIsImlhdCI6MTY5MTY4NDU5MiwiZXhwIjoxNjkxNzcwOTkyfQ.U1mnyhAp_riccCe_qQnjicgitAZvvM7Mp916jvfhBbI" "http://localhost:5000/api/credentials/deleteCredentials?username=batman&website=www.quora.com" | json
```

Output: 
```sh
Credentials deleted successfully: 🥳  {
  _id: new ObjectId("64d50c8cec6cf9d88ee365b7"),
  username: 'batman',
  credentials: [
    {
      website: 'www.quora.com',
      password: 'thisIsForQuora',
      _id: new ObjectId("64d50c8cec6cf9d88ee365b8")
    }
  ],
  __v: 0
}
```

------

