package utils

// TODO:
// - ReadPassword ✔
// - BOOLEAN FUNCTION: Check if pwFile exists
// - Create pwFile: check if it exists, if it doesn't -> create it.

import (
	"crypto/rand"
	"fmt"
	"log"
	"math/big"
	"os"
	"syscall"

	"golang.org/x/crypto/ssh/terminal"
)

func MatchStrings(str1, str2 string) (bool, error) {
	if str1 == str2 {
		return true, nil
	}
	return false, nil
}

func ReadPassword() (string, error) {

	fmt.Printf("\nEnter password: ")
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

	match, _ := MatchStrings(pw, confirmPw)
	if match {
		fmt.Println("\nPasswords match! Yippieee 🥳 ")
		return pw, nil
	}
	return "", fmt.Errorf("\npasswords do not match. Try again, mate. :)")
}

func ReadOldPassword() string {
	fmt.Printf("Enter old password: ")

	bytePassword, err := terminal.ReadPassword(int(syscall.Stdin))
	if err != nil {
		log.Fatal("Error reading password: ", err)
	}

	pw := string(bytePassword)
	return pw
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

// Characters to be used in the random password
var characters = []rune("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_-+=<>?")

// GenerateRandomPassword generates a random password of the specified length
func GenerateRandomPassword(length int) string {
	password := make([]rune, length)
	max := big.NewInt(int64(len(characters)))

	for i := range password {
		randIndex, err := rand.Int(rand.Reader, max)
		if err != nil {
			panic(err) // Handle the error as needed
		}
		password[i] = characters[randIndex.Int64()]
	}

	return string(password)
}

// ReadPasswordFile reads the content of a password file located at the specified path
func ReadPasswordFile(filePath string) (string, error) {
	data, err := os.ReadFile(filePath)
	if err != nil {
		return "", err
	}
	return string(data), nil
}
