# SecretKeyper

![Project Logo](./logo.png)

## Description:

SecretKeyper is an open source secure password store designed to keep your sensitive information safe while providing the convenience of easy access. With integrated 2FA, your stored data is doubly protected against unauthorized access.

Upcoming features shall assist developers in keeping `.env` secure. [I'm thinking something like this?](https://miro.medium.com/v2/resize:fit:1400/format:webp/0*pJQUexTaSZN2HJMl.png)

[Click here to read why you should consider centralizing your `.env` management](https://medium.com/@tony.infisical/the-death-of-the-env-file-6d65bfc6ac5e)

## Application:

- API & Web server
- CLI: For those who prefer commands over conversations 😼 
<!-- - CLI: If terminal is your idea of a cozy place  -->

## Tech used

### API and Storage:

- NodeJS
- ExpressJS
- MongoDB

### CLI:

- Golang
- GnuPG

### Frontend: 

- ReactJS
- TailwindCSS

## Features

- **Secure Storage** --> Safely manage passwords, cards, and notes.
- **2FA Support** --> Enhanced protection with time-based one-time passwords (TOTP)
- **CLI Access** --> Conveniently control everything via terminal.
- **Local Storage** --> Keep data securely stored on your device.
- **Organizational Tools** --> Customize entries and categories.

---

#### API & Web server:

- Routes --> [click here](./docs/Backend/routes.md)
- Sample `.env` --> [click here](./docs/Backend/sample_env.md)
- Sample AUTH-requests --> [click here](./docs/Backend/sample_reqs/controllers_reqs.md)
- Sample OTP-requests --> [click here](./docs/Backend/sample_reqs/otp_reqs.md)

#### CLI:
- https://asciinema.org/a/605769
- Initializes git repository
- Files are encrypted using GPG
- Generates secure passwords 
- Automatically copies extracted passwords/text to your clipboard for 90 seconds

```
➜  ~ keyper list

  Available commands ---->
  - help
  - list
  - keyper
  - init
  - insert
  - extract
  - find
  - remove
  - update
  - generate
```

## Current State 
- The API & CLI are ready to be used individually. 
- However, their integration is under development. Some important features (for developers) are yet to be implemented.

## Requirements: 
- [GnuPG](https://www.gnupg.org/): Since Keyper-CLI uses GnuPG (or GPG) file protection under the hood, it's necessary that you install it.
    * [Check out this](./docs/Backend/keyper-cli/gpg.md) for an easy walk-through.
- Git


## ‍ Getting Started

#### Build the App

```
$ go build -o bin/keyper main.go
```

or

```
$ task build
```

#### Run the App

```
$ ./bin/keyper
```

or,

```
$ task run
```

#### Test the App

```
$ ./bin/keyper
For those of you who type more than talk, here's a Golang CLI-tool to keep your secrets safe!

Usage:
  keyper [command]

Available Commands:
  completion  Generate the autocompletion script for the specified shell
  extract     Extracts your password from the website's folder
  find        Searches for all passwords given a string
  generate    Generate a random password for a website
  help        Help about any command
  init        Initializes a .secretKeyper directory in your system's home directory
  insert      Creates a new directory to store passwords for that website
  keyper      Prints the tree structure of .secretKeyper
  list        Lists All commands
  remove      Remove a website directory or its password file directly, using flags
  update      Update a website's password

Flags:
  -h, --help     help for keyper
  -t, --toggle   Help message for toggle

Use "keyper [command] --help" for more information about a command.
```


#### Add `bin` to Your PATH

To make it more convenient to run the 'keyper' binary from any location in your terminal, add the `bin` directory to your system's PATH, this way:

**For Zsh & Bash:**

1. Edit your `.zshrc`/`.bashrc` file using a text editor of your choice. You can use the `nano` editor, for example:

   ```sh
   nano ~/.zshrc
   ```
   or, 
   ```sh
   nano ~/.bashrc
   ```

2. Add this at the end:
   ```
   export PATH=$PATH:/path/to/your/keyper/repo/bin
   ```
* Replace `/path/to/your/keyper/repo` with the actual path to your 'keyper' repository.

3. Reload your `zsh`/`bash` after saving:
```sh
source ~/.zshrc
```
or,
```sh
source ~/.bashrc
```
4. **[Click for a walk-through](./docs/Backend/keyper-cli/sample_cmds.md)**

## ✅ TODO:

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
    - [x] Fix clipboard-thing
  - [x] `keyper remove <website>`
  - [x] `keyper update <website>`
  - [x] `keyper generate <website>`
  - [x] `keyper find <website>`
  - [x] Change `keyper init` to `keyper init <GPG_KEY_ID>`
  - [x] `keyper git init`
  - [x] Add progress-bar
  - [ ] `keyper edit <website>` [Opens the file in a text-editor (nvim, vi - any!) to add meta data to your decrypted password.txt.gpg]
  - [ ] `keyper show <website>` [Lists available file + provides tab-completion]
  - [ ] `keyper grep "search-using-metaData"`
  - [ ] Add features for `.env` - saving, sharing, importing variables into your projects
- [ ] Link CLI with API
- [ ] Extension

# 🤝 Contributing

This project is open to contribution. Your interest in contributing to the project is appreciated. There are many ways to get involved and help improve SecretKeyper.

### Ways to Contribute

- **Bug Reports**: If you find a bug or issue, please [open a GitHub issue](https://github.com/ReticentFacade/secretKeyper/issues) with a detailed description.

- **Feature Requests**: Have an idea for a new feature or improvement? Feel free to suggest it by opening an issue.

- **Code Contributions**: If you're a developer, you can fork the repository, make your changes, and create a pull request.

- **Documentation**: Improving documentation is always helpful. If you find areas where the documentation can be enhanced, please submit a pull request.
