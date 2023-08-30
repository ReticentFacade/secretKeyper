/*
Copyright © 2023 NAME HERE <EMAIL ADDRESS>
*/
package cmd

import (
	"fmt"
	"log"
	"os"

	// "io/ioutil"
	"keyper/utils"
	"path/filepath"

	"github.com/spf13/cobra"
)

// extractCmd represents the extract command
var extractCmd = &cobra.Command{
	Use:   "extract",
	Short: "Extracts your password from the website's folder",
	Long: `Usage: 
	keyper extract <website>/password		 - Extracts the password for a website from its folder. If the website's folder has sub-directories, it extracts passwords from those as well.`,
	Args: cobra.ExactArgs(1), // Expects one argument (i.e. website name)
	Run: func(cmd *cobra.Command, args []string) {
		secretKeyperDir := utils.GetKeyperDir()
		// Obtain the website name from the argument
		websiteDir := filepath.Join(secretKeyperDir, args[0])

		// ==============================================
		// Get the GPG key ID from the .gpg-id file
		gpgKeyIDFile := filepath.Join(secretKeyperDir, ".gpg-id")
		gpgKeyID, err := utils.ReadGPGKeyID(gpgKeyIDFile)
		if err != nil {
			log.Fatal("Error reading GPG key ID from file:", err)
		}
		// ==============================================

		// - Check if the websiteDir exists
		dirExists, _ := utils.IfDirExists(websiteDir)
		if dirExists {
			pwFilePath := filepath.Join(websiteDir, "password.txt.gpg")
			pwFileExists, _ := utils.IfFileExists(pwFilePath)

			// - If it does, check if it has a password file
			if pwFileExists {
				// - If it does, read the password file
				pw, err := os.ReadFile(pwFilePath)
				if err != nil {
					log.Fatal("error reading password file:", err)
				} else {
					// Decrypt the password using the stored GPG key ID
					decryptedPassword, err := utils.DecryptWithGPG(string(pw), gpgKeyID)
					if err != nil {
						log.Fatal("Error decrypting password: ", err)
					}

					fmt.Println("\nYour password is:", decryptedPassword)

					// Copy the decrypted password to the clipboard
					_ = utils.CopyToClipboard(decryptedPassword)
					fmt.Println("Password copied to clipboard!")
					// ==============================================
				}
			}
			// - If it doesn't, check if it has sub-directories
			subDirExists, err := utils.CheckSubDir(websiteDir)
			if err != nil {
				fmt.Println("Error:", err)
			} else if subDirExists {
				// - If it does, read the password files from those sub-directories
				subDirList, _ := utils.ListSubDirs(websiteDir)
				fmt.Println(subDirList) // Print the list of subdirectories
			}
			// else {
			// 	// - If it doesn't, print an error message
			// 	fmt.Println("No subdirectories found in the directory.")
			// }
		} else {
			// - If it doesn't, print an error message
			log.Fatal("Error: Website doesn't exist.")
			return
		}

		// Automatically clear the clipboard after 90 seconds
		go utils.ClearClipboardAfterDelay(90)
	},
}

func init() {
	rootCmd.AddCommand(extractCmd)
}
