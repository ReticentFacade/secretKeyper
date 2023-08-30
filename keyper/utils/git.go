package utils

import (
	"fmt"
	"os/exec"
)

// Function to initialize Git repository in a directory
func GitInitInDirectory(directory string) error {
	cmd := exec.Command("git", "init")
	cmd.Dir = directory

	output, err := cmd.CombinedOutput()
	if err != nil {
		return fmt.Errorf("error initializing Git repository: %v\nOutput: %s", err, output)
	}

	return nil
}
