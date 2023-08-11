## Sample curl command for `/deleteCredentials` route: 

Format: 
```
curl -X DELETE -H "x-auth-token: YOUR_TOKEN" "http://localhost:5000/api/credentials/deleteCredentials?username=<your-username>&website=<your-website-url>" | json
```

Example: 
```
curl -X DELETE -H "x-auth-token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0ZDMyM2E1ZjIzMmU5NDQ4MmQwOGRhMyIsImlhdCI6MTY5MTY4NDU5MiwiZXhwIjoxNjkxNzcwOTkyfQ.U1mnyhAp_riccCe_qQnjicgitAZvvM7Mp916jvfhBbI" "http://localhost:5000/api/credentials/deleteCredentials?username=batman&website=www.quora.com" | json
```

Output: 
```
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