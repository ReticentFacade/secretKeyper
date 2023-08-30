/*
Copyright © 2023 NAME HERE <EMAIL ADDRESS>
*/
package cmd

import (
	"fmt"
	"log"
	"os"
	"path/filepath"

	"keyper/utils"

	"github.com/spf13/cobra"
)

// initCmd represents the init command
var initCmd = &cobra.Command{
	Use:   "init <GPG_KEY_ID>",
	Short: "Initializes a .secretKeyper directory in your system's home directory",
	Long: `
		Usage --> keyper init <GPG_KEY_ID>
		Description --> Initializes a .secretKeyper directory in your home directory`,
	Run: func(cmd *cobra.Command, args []string) {

		if len(args) != 1 {
			fmt.Println("Please provide a GPG key ID to initialize SecretKeyper")
			os.Exit(1)
		}

		// Check if the GPG key is valid or not:
		var gpgKeyID string
		if len(args) == 1 {
			gpgKeyID = args[0]
			// Verifying the GPG key ID/fingerprint:
			verifyKey, err := utils.VerifyGPGKey(gpgKeyID)
			if err != nil {
				log.Fatal("Error verifying GPG key", err)
			}
			if !verifyKey {
				fmt.Println("Error: Invalid GPG key format")
				os.Exit(1)
			}
		}

		// Get the user's ./secretKeyper directory
		secretKeyperDir := utils.GetKeyperDir()

		// Check if it exists already or not:
		_, err := os.Stat(secretKeyperDir)
		if os.IsNotExist(err) {
			// Create it, if it doesn't:
			err := os.Mkdir(secretKeyperDir, 0700)
			if err != nil {
				log.Fatal("Error creating .secretKeyper directory", err)
			}
			fmt.Println("mkdir: Created .secretKeyper directory at --> ", secretKeyperDir)
		} else {
			fmt.Println("Directory already exists at -->", secretKeyperDir)
		}

		// Store the GPG key in a file in .secretKeyper directory:
		gpgKeyFile := filepath.Join(secretKeyperDir, ".gpg-id")
		err = os.WriteFile(gpgKeyFile, []byte(gpgKeyID), 0600)
		if err != nil {
			log.Fatal("Error writing GPG key to file", err)
		}

		fmt.Println("SecretKeyper initialised for GPG Key -->", gpgKeyID)
	},
}

func init() {
	rootCmd.AddCommand(initCmd)
}
