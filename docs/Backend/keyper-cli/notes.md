# Notes:

### Description

What I learnt while writing the CLI in Golang.

---

### Reference: [init.go](../../../keyper-cli/cmd/init.go)

Line 29:
`_, err := os.Stat(secretKeyperDir);`

1. `os.Stat(<dirname>)` returns the `File Info`. Ex: name, size, mode, modTime (modification time), isDir (boolean that represents whether a path is a directory), sys (the underlying data source; can be nil; if it doesn't exist, it'll return an error), etc.
2. used to check whether a directory exists at the specified path (`secretKeyperDir`).
3. The function os.Stat() returns information about a file or directory.
4. In this case, we're using the returned error value to check if the directory exists or not.

5. The variable `_` is used to discard the actual file or directory information returned by `os.Stat()` because we're only interested in whether the directory exists or not, not in the details of the file or directory itself.

6. If the error value is nil, it means the directory exists.

---

### Reference: [insert.go](../../../keyper-cli/cmd/insert.go)

Line 38 - 41:

```
// Read the input:
		reader := bufio.NewReader(os.Stdin);
		password, _ := reader.ReadString('\n');
		password = string.TrimSpace(password);
```

1. `bufio.NewReader(os.Stdin)` creates a new `bufio.Reader` object that reads from the standard input stream (`os.Stdin`). It captures user input.
2. `reader.ReadString('\n')s` line reads the input from the user until it encounters a newline character (`'\n'`). It captures the entire line of text that the user enters, including the newline character itself.
   - In `password, _ := reader.ReadString('\n')`, `password` variable is assigned the captured user input (including the newline character).
   - The underscore (`_`) here is used as a placeholder for an error value that might occur during this read operation. Since we're not interested in the error at this moment, we use the underscore to ignore it.
3. In `password = strings.TrimSpace(password)`, the `strings.TrimSpace` function is used to **remove leading and trailing whitespace** characters (including the newline character) from the captured user input.
   - This ensures that the password variable contains only the actual password entered by the user, without any extra whitespace.

