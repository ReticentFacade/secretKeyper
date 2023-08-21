# SecretKeyper

![Project Logo](./logo.png)

## Description:

SecretKeyper is a secure password manager designed to keep your sensitive information safe while providing the convenience of easy access. With integrated 2FA, your stored data is doubly protected against unauthorized access.

## Application:

- API
- CLI: For those who prefer commands over conversations 😼 
<!-- - CLI: If terminal is your idea of a cozy place  -->

## Tech used

### API:

- Nodejs
- Expressjs
- MongoDB

### CLI:

- Golang

## Features

- **Secure Storage** --> Safely manage passwords, cards, and notes.
- **2FA Support** --> Enhanced protection with two-factor authentication.
- **CLI Access** --> Conveniently control everything via terminal.
- **Local Storage** --> Keep data securely stored on your device.
- **Organizational Tools** --> Customize entries and categories.

---
#### API: 
- Routes --> [click here](./docs/Backend/routes.md)
- Sample `.env` --> [click here](./docs/Backend/sample_env.md)
- Sample AUTH-requests --> [click here](./docs/Backend/sample_reqs/controllers_reqs.md)
- Sample OTP-requests --> [click here](./docs/Backend/sample_reqs/otp_reqs.md)

#### CLI: 
- Automatically copies extracted passwords/text to your clipboard
```
➜  ~ keyper list

  Available commands ---->
  - help
  - list
  - keyper
  - init
  - insert
  - extract
```

---

## TODO:

- [x] Authentication
- [x] Strength
- [x] Encryption
- [x] Storage
- [x] Decryption 
- [x] 2FA
- [ ] CLI
    - [x] `keyper`
    - [x] `keyper list`
    - [x] `keyper init`
    - [x] `keyper insert <website>`
    - [x] `keyper extract <website>`
      - [ ] Fix clipboard-thing
    - [x] `keyper remove <website>`
    - [x] `keyper update <website>`
    - [ ] `keyper generate <website>`
    - [ ] `keyper find <website>`
    - [ ] `keyper init <GPG_KEY_ID>`
    - [ ] `keyper git init`
    - [ ] Add progress-bar (?)
- [ ] Link CLI with API
- [ ] Extension
