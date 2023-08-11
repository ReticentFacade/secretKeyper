## Sample curl command for adding credentials into db: 
Format: 
```
curl -X POST -H "Content-Type: application/json" -H "x-auth-token: <your_jwt_token>" -d '{
  "username": "your_username",
  "credentials": {
    "website": "example.com",
    "password": "your_password"
  }
}' http://localhost:5000/api/credentials/addCredentials
```

Example: 
```
curl -X POST -H "Content-Type: application/json" -H "x-auth-token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0ZDMyM2E1ZjIzMmU5NDQ4MmQwOGRhMyIsImlhdCI6MTY5MTY4NDU5MiwiZXhwIjoxNjkxNzcwOTkyfQ.U1mnyhAp_riccCe_qQnjicgitAZvvM7Mp916jvfhBbI" -d '{"username": "elle", "credentials": {"website": "www.github.com", "password": "thisIsForGithub"}}' http://localhost:5000/api/credentials/addCredentials | json
```

Output: 
```
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