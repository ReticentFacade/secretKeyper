package utils

import (
	"os/exec"
	"strings"
)

func GenerateGPGKey() error {
	return nil
}

func VerifyGPGKey(key string) (bool, error) {
	// Use the gpg command to list keys:
	cmd := exec.Command("gpg", "--list-keys", key)
	output, err := cmd.CombinedOutput()
	if err != nil {
		return false, err
	}

	// Check if the output contains information about the key
	return strings.Contains(string(output), key), nil
}
