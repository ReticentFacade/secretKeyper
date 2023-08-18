package utils

import (
	"log"
	"os"
	"path/filepath"
	// "golang.org/x/term"
)

func GetKeyperDir() string {
	homeDir, err := os.UserHomeDir()
	if err != nil {
		log.Fatal("Error getting user's home directory", err)
	}

	// returns filepath = $HOME/.secretKeyper
	return filepath.Join(homeDir, ".secretKeyper")
}
