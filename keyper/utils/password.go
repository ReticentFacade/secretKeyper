package utils

// TODO:
// - ReadPassword ✔
// - BOOLEAN FUNCTION: Check if pwFile exists
// - Create pwFile: check if it exists, if it doesn't -> create it.

import (
	"fmt"
	"log"
	"os"
	"syscall"

	"golang.org/x/crypto/ssh/terminal"
)

func matchStrings(str1, str2 string) (bool, error) {
	if str1 == str2 {
		return true, nil
	}
	return false, nil
}

func ReadPassword() (string, error) {

	fmt.Printf("Enter password: ")
	// TODO: Re-enter password & match both entries LATER

	bytePassword, err := terminal.ReadPassword(int(syscall.Stdin))
	if err != nil {
		log.Fatal("Error reading password: ", err)
	}
	pw := string(bytePassword)

	fmt.Printf("\nRe-enter password: ")
	bytePassword2, err := terminal.ReadPassword(int(syscall.Stdin))
	if err != nil {
		log.Fatal("Error reading password: ", err)
	}
	confirmPw := string(bytePassword2)

	match, _ := matchStrings(pw, confirmPw)
	if match {
		fmt.Println("\nPasswords match! Yippieee 🥳 ")
		return pw, nil
	}
	return "", fmt.Errorf("\npasswords do not match. Try again, mate. :)")
}

func IfFileExists(path string) (bool, error) {
	_, err := os.Stat(path)
	if err == nil {
		return true, nil // Exists
	}
	if os.IsNotExist(err) {
		return false, nil // Doesn't exist
	}

	return false, err // Error while checking
}

func CreatePasswordFile(filePath string, password string) (string, error) {
	passwordFile, err := os.Create(filePath)
	if err != nil {
		log.Fatal("Error creating password file: ", err)
	}
	defer passwordFile.Close()

	_, err = passwordFile.Write([]byte(password))
	if err != nil {
		return "", fmt.Errorf("error writing password to file: %w", err)
	}
	return "\nPassword file successfully created!", nil
}
