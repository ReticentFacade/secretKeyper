/*
Copyright © 2023 NAME HERE <EMAIL ADDRESS>
*/
package cmd

import (
	"fmt"
	"keyper/utils"
	"log"
	"os"
	"path/filepath"

	"github.com/spf13/cobra"
)

// updateCmd represents the update command
var updateCmd = &cobra.Command{
	Use:   "update",
	Short: "Update a website's password",
	Long: `Usage:
	keyper update <website>          - Update the password for the website`,
	Run: func(cmd *cobra.Command, args []string) {
		secretKeyperDir := utils.GetKeyperDir()

		if len(args) != 1 {
			fmt.Println(`Invalid number of arguments.
			Usage --> keyper update <website>
			`)
			return
		}

		// Case 1: Dir = x
		// Case 2: Dir =  ✓, File = x
		websiteDir := filepath.Join(secretKeyperDir, args[0])
		dirExists, err := utils.IfDirExists(websiteDir)
		if err != nil {
			log.Fatal("Error checking directory existence: ", err)
		}
		pwFilePath := filepath.Join(websiteDir, "password.txt")
		fileExists, err := utils.IfFileExists(pwFilePath)
		if err != nil {
			log.Fatal("Error checking password file existence: ", err)
		}
		if !dirExists || !fileExists {
			fmt.Println("Oopsie! Either directory or password file doesn't exist. Try creating it first using `keyper insert <website` cmd :)")
			return
		}

		// Case 3: Dir = ✓, File = ✓
		// Ask for old password
		oldPass := utils.ReadOldPassword()
		// Read existing password from file
		existingPass, err := os.ReadFile(pwFilePath)
		if err != nil {
			log.Fatal("Error reading existing password from file: ", err)
		}
		// Compare old password with existing password:
		match, err := utils.MatchStrings(oldPass, string(existingPass))
		if err != nil {
			log.Fatal("Error comparing passwords: ", err)
		}
		if !match {
			log.Fatal("Old password doesn't match existing password. Try again, mate. :)")
		}
		// If old password matches the text in password.txt, then:

		// Prompt user for new password:
		// Prompt the user for the new password
		newPass, err := utils.ReadPassword()
		if err != nil {
			log.Fatal("Error reading new password: ", err)
		}
		// Update the password file with the new password
		_, err = utils.CreatePasswordFile(pwFilePath, newPass)
		if err != nil {
			log.Fatal("Error updating password file: ", err)
		}
		fmt.Println("Password updated successfully! 😁 🥳 😁 ")
	},
}

func init() {
	rootCmd.AddCommand(updateCmd)

	// Here you will define your flags and configuration settings.

	// Cobra supports Persistent Flags which will work for this command
	// and all subcommands, e.g.:
	// updateCmd.PersistentFlags().String("foo", "", "A help for foo")

	// Cobra supports local flags which will only run when this command
	// is called directly, e.g.:
	// updateCmd.Flags().BoolP("toggle", "t", false, "Help message for toggle")
}
