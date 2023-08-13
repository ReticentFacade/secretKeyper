# Generate OTP
- `generateOTP.controller.js`
- Route: 
    * `/otp/generate` 

## Sample curl command

Format: 
```sh
curl -X POST -H "Content-Type: application/json" -d '{"username": "<your-username>", "email": "<your-email@example.com>"}' http://localhost:5000/api/auth/otp/generate
```

Example: 
```sh
curl -X POST -H "Content-Type: application/json" -d '{"username": "hailOTP", "email": "otptester@jrvbuildcon.com"}' http://localhost:5000/api/auth/otp/generate
```

Output: 
**_(this is an old snippet - when the `otpSecret` wasn't hashed)_**
```sh
[nodemon] starting `node server.js`
sessionMiddleware running...
Successfully connected to MongoDB...
Server is running on port 5000...
Successfully connected to MongoDB...
Username hailOTP exists. Logging you in now...
otpSecret:  EM4E24JOMM5CITBVOQXXOJKVNVNXMKC6MN4EK4TIFRXSURDSKRWQ
totp:  832374
transporter:  <ref *1> Mail {
  _events: [Object: null prototype] {},
  _eventsCount: 0,
  _maxListeners: undefined,
  options: {
    service: 'gmail',

...
... 

Email sent:  250 2.0.0 OK  1691899219 c9-20020aa78c09000000b00666e649ca46sm5582196pfd.101 - gsmtp
```

-----

# Verify OTP
- `verifyOTP.controller.js`
- Route: 
    * `/otp/verify`

## Sample curl command: 

Format: 
```sh
curl -X POST -H "Content-Type: application/json" -d '{"username": "<your-username>", "token": "<your-token>"}' http://localhost:5000/api/auth/otp/verify
```

Example: 
```sh
curl -X POST -H "Content-Type: application/json" -d '{"username": "hailOTP", "token": "709463"}' http://localhost:5000/api/auth/otp/verify | json
```

Output: 
```sh
Is OTP verified? true
OTP verified successfully!
```

----

# Validate OTP
- `validateOTP`
- Route:
    * `/otp/validate`

## Sample curl command: 

Format: 
```sh
curl -X POST -H "Content-Type: application/json" -d '{"username": "<your-username>", "token": "<your-token>"}' http://localhost:5000/api/auth/otp/validate
```

Example: 
```sh
curl -X POST -H "Content-Type: application/json" -d '{"username": "hailOTP", "token": "709463"}' http://localhost:5000/api/auth/otp/validate | json
```

Output: 
```sh
Is OTP validated? true
OTP validated successfully!
```

# Disable OTP
- `/otp/disableOTP`
- Route:
    * `/otp/disable`
  
## Sample curl command: 

Format: 
```sh
curl -X POST -H "Content-Type: application/json" -d '{"username": "<your-username>"}' http://localhost:5000/api/auth/otp/disable | json
```

Example: 
```sh
curl -X POST -H "Content-Type: application/json" -d '{"username": "hailOTP"}' http://localhost:5000/api/auth/otp/disable | json
```

Output: 
```sh
{
  "message": "2FA disabled successfully for hailOTP!"
}

#### - x - x - x ####

2FA disabled successfully for hailOTP!
```