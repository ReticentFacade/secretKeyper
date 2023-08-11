## Sample curl command for `/updateCredentials` route: 

Format: 
```
curl -X PUT -H "x-auth-token: <your-jwt-token> -d "username=<your-username>&website=<your-website-url>&newPassword=<your-new-Password> http://localhost:5000/api/credentials/updateCredentials | json
```

Example: 
```
curl -X PUT -H "x-auth-token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0ZDMyM2E1ZjIzMmU5NDQ4MmQwOGRhMyIsImlhdCI6MTY5MTcyNjI0MywiZXhwIjoxNjkxODEyNjQzfQ.3le184iAXC-9MClhun4M4A-6yLyzymQW7RGaUVmnJbU" -d "username=elle&website=www.github.com&newPassword=newGithubPw" http://localhost:5000/api/credentials/updateCredentials | json

  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100   106  100    46  100    60     12     16  0:00:03  0:00:03 --:--:--    29
{
  "message": "Credentials updated successfully"
}
```

Output: 
```
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