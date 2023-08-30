package utils

import (
	"fmt"
	"log"
	"os"
	"os/exec"
	"strings"
)

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

func EncryptWithGPG(data, recipient, outputPath string) error {
	// Create a temporary file to store the plaintext data
	tempFile, err := os.CreateTemp("", "temp.txt")
	if err != nil {
		return err
	}
	defer os.Remove(tempFile.Name()) // Clean up the temporary file
	defer tempFile.Close()

	// Write the plaintext data to the temporary file
	_, err = tempFile.WriteString(data)
	if err != nil {
		return err
	}

	// Use GPG to encrypt the temporary file using the -c flag (symmetric encryption)
	cmd := exec.Command("gpg", "-c", "--output", outputPath+".gpg", tempFile.Name())
	cmd.Stdin = os.Stdin
	cmd.Stdout = os.Stdout
	cmd.Stderr = os.Stderr
	err = cmd.Run()
	if err != nil {
		return err
	}
	fmt.Println("Encrypted data with GPG and saved as: ", outputPath+".gpg")

	return nil
}

func DecryptWithGPG(encryptedData, recipient string) (string, error) {
	cmd := exec.Command("gpg", "--decrypt")
	cmd.Args = append(cmd.Args, "--recipient", recipient)
	cmd.Args = append(cmd.Args, "--batch", "--yes") // These flags prevent GPG from asking for user input.
	cmd.Stdin = strings.NewReader(encryptedData)

	// Log the command being executed
	// log.Printf("Executing command: %s", cmd.String())

	output, err := cmd.CombinedOutput()
	if err != nil {
		log.Printf("Error decrypting data with GPG: %v\nCommand: %v\nOutput: %s", err, cmd.String(), output)
		return "", err
	}

	// Split the output into lines
	lines := strings.Split(string(output), "\n")

	// The decrypted password should be on the last line, remove any leading/trailing white spaces
	decryptedPassword := strings.TrimSpace(lines[len(lines)-1])

	return decryptedPassword, nil
}

func ReadGPGKeyID(filePath string) (string, error) {
	// Read the GPG key ID from a file and return it as a string.
	data, err := os.ReadFile(filePath)
	if err != nil {
		return "", err
	}

	// Trim any leading/trailing white spaces or newlines
	keyID := strings.TrimSpace(string(data))

	return keyID, nil
}
