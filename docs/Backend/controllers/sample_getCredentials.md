## Sample curl command for `/getCredentials` route: 

- `/getCredentials` uses `req.query` format to *get* input so it should be as follows:

Format: 
```
curl -X GET -H "x-auth-token: <your-jwt-token>" "http://localhost:5000/api/credentials/getCredentials?username=<your-username>&website=<your-website>" | json
```

Example: 
```
curl -X GET -H "x-auth-token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0ZDMyM2E1ZjIzMmU5NDQ4MmQwOGRhMyIsImlhdCI6MTY5MTY4NDU5MiwiZXhwIjoxNjkxNzcwOTkyfQ.U1mnyhAp_riccCe_qQnjicgitAZvvM7Mp916jvfhBbI" "http://localhost:5000/api/credentials/getCredentials?username=elle&website=www.github.com" | json
```

Output: 
```
{
  "password": "thisIsForGithub"
}
```

```
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