/*
Copyright © 2023 NAME HERE <EMAIL ADDRESS>
*/
package cmd

import (
	"fmt"
	"keyper/utils"
	"log"
	"path/filepath"

	"github.com/spf13/cobra"
)

// generateCmd represents the generate command
var generateCmd = &cobra.Command{
	Use:   "generate",
	Short: "Generate a random password for a website",
	Long: `Usage:
	keyper generate <website>`,
	Run: func(cmd *cobra.Command, args []string) {
		fmt.Println("generate called...")
		secretKeyperDir := utils.GetKeyperDir()

		website := args[0]
		websiteDir := filepath.Join(secretKeyperDir, website)

		// Check if the website directory exists
		dirExists, err := utils.IfDirExists(websiteDir)
		if err != nil {
			log.Fatal("Error checking directory existence: ", err)
		}
		if !dirExists {
			fmt.Println("Website directory does not exist. Use 'keyper insert <website>' to create it.")
			return
		}

		// Generate a random password
		password := utils.GenerateRandomPassword(6)

		// Create a password file and save the generated password
		pwFilePath := filepath.Join(websiteDir, "password.txt")
		_, err = utils.CreatePasswordFile(pwFilePath, password)
		if err != nil {
			log.Fatal("Error creating password file: ", err)
		}

		// Print the generated password to the terminal
		fmt.Printf("Generated password for %s: %s\n", website, password)

		// Copy the generated password to the clipboard
		_ = utils.CopyToClipboard(string(password))

		fmt.Println("Password copied to clipboard!")

		fmt.Println("Use `keyper insert <website>` and paste the password (don't worry, it's there on your clipboard already) into your password-file).")
	},
}

func init() {
	rootCmd.AddCommand(generateCmd)

	// Here you will define your flags and configuration settings.

	// Cobra supports Persistent Flags which will work for this command
	// and all subcommands, e.g.:
	// generateCmd.PersistentFlags().String("foo", "", "A help for foo")

	// Cobra supports local flags which will only run when this command
	// is called directly, e.g.:
	// generateCmd.Flags().BoolP("toggle", "t", false, "Help message for toggle")
}
