# Notes:
### Description
What I learnt while writing the CLI in Golang.

----

### Reference: [init.go](../../../keyper-cli/cmd/init.go)

Line 29: 
`_, err := os.Stat(secretKeyperDir);`

- used to check whether a directory exists at the specified path (`secretKeyperDir`).
- The function os.Stat() returns information about a file or directory. 
- In this case, we're using the returned error value to check if the directory exists or not.

- The variable `_` is used to discard the actual file or directory information returned by `os.Stat()` because we're only interested in whether the directory exists or not, not in the details of the file or directory itself.

- If the error value is nil, it means the directory exists.

----

### Reference: [](../../../keyper-cli/cmd/)