package utils

// TODO:
// - BOOLEAN Function: Check if Dir Exists
// - Create Dir: check if dir exists, if it doesn't -> create it.
// - Boolean function to check if a directory has subdirectories or not
// - Function to list all subdirectories of a directory

import (
	"fmt"
	"os"
	"strings"
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

// Check if a directory has subdirectories or not
func CheckSubDir(dirPath string) (bool, error) {
	// Open the directory
	dir, err := os.Open(dirPath)
	if err != nil {
		return false, err
	}
	defer dir.Close()

	// Read the directory entries:
	entries, err := dir.Readdir(0)
	if err != nil {
		return false, err
	}

	// Iterate through 'entries' to check if they're directories
	for _, entry := range entries {
		if entry.IsDir() {
			return true, nil // At least one subDir found
		}
	}

	// No subDirs found
	return false, nil
}

// List all subdirectories of a directory
func ListSubDirs(dirPath string) (string, error) {
	var subDirs []string

	// Open the directory
	dir, err := os.Open(dirPath)
	if err != nil {
		return "", err
	}
	defer dir.Close()

	// Read the directory entries:
	entries, err := dir.Readdir(0)
	if err != nil {
		return "", err
	}

	// Iterate through the entries and collect subdirectory names
	for i, entry := range entries {
		if entry.IsDir() {
			subDirs = append(subDirs, fmt.Sprintf("%d. %s", i+1, entry.Name()))
		}
	}

	// Create a header
	header := "This directory has the following sub-directories:\n"

	// Join subdirectory names into a single string, separated by newline
	subDirList := strings.Join(subDirs, "\n")

	// Combine the header and the subdirectory list
	result := header + subDirList

	return result, nil
}
