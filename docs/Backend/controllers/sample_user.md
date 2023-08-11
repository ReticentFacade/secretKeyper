### Register User: 
```
curl -X POST -H "Content-Type: application/json" -d '{"name": "Ms. Mortal", "username": "karmaBitch", "email": "karma@yahoo.in", "password": "karmaIsABitch_9"}' http://localhost:5000/api/auth/register | json
```

### Login User: 
```
curl -X POST -H "Content-Type: application/json" -d '{"username": "karmaBitch", "password": "karmaIsABitch_9"}' http://localhost:5000/api/auth/login | json
```

### : 
```

```