package utils

// TODO:
// - BOOLEAN Function: Check if Dir Exists
// - Create Dir: check if dir exists, if it doesn't -> create it.

import (
	"fmt"
	"os"
)

func IfDirExists(path string) (bool, error) {
	_, err := os.Stat(path)
	if err == nil {
		return true, nil // Exists
	}
	if os.IsNotExist(err) {
		return false, nil // Doesn't exist
	}
	return false, err // Error while checking
}

// If directory doesn't exist, create it:
func CreateDir(dirPath string) (string, error) {
	_, err := os.Stat(dirPath)
	if os.IsNotExist(err) {
		err := os.MkdirAll(dirPath, 0700)
		if err != nil {
			return "", fmt.Errorf("error creating directory: %w", err)
		}
		fmt.Println("Created new directory at: ", dirPath)
		return dirPath, nil
	}
	fmt.Println("Directory already exists at: ", dirPath)
	return dirPath, nil
}
