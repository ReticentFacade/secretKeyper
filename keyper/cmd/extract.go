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
	keyper extract <website>/password
	
	Extracts the password for a website from its folder.
	If the website's folder has sub-directories, it extracts passwords from those as well.`,
	Args: cobra.ExactArgs(1), // Expects one argument (i.e. website name)
	Run: func(cmd *cobra.Command, args []string) {
		secretKeyperDir := utils.GetKeyperDir()
		// Obtain the website name from the argument
		websiteDir := filepath.Join(secretKeyperDir, args[0])

		// - Check if the websiteDir exists
		dirExists, _ := utils.IfDirExists(websiteDir)
		if dirExists {
			pwFilePath := filepath.Join(websiteDir, "password.txt")
			pwFileExists, _ := utils.IfFileExists(pwFilePath)

			// - If it does, check if it has a password file
			if pwFileExists {
				// - If it does, read the password file
				pw, err := os.ReadFile(pwFilePath)
				if err != nil {
					log.Fatal("error reading password file:", err)
				} else {
					fmt.Println("\nYour password is: ", string(pw))
					// Copy the generated password to the clipboard
					_ = utils.CopyToClipboard(string(pw))

					fmt.Println("Password copied to clipboard!")
					if err != nil {
						log.Fatal("Error copying password to clipboard:", err)
					}
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
			} else {
				// - If it doesn't, print an error message
				fmt.Println("No subdirectories found in the directory.")
			}
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

	// Here you will define your flags and configuration settings.

	// Cobra supports Persistent Flags which will work for this command
	// and all subcommands, e.g.:
	// extractCmd.PersistentFlags().String("foo", "", "A help for foo")

	// Cobra supports local flags which will only run when this command
	// is called directly, e.g.:
	// extractCmd.Flags().BoolP("toggle", "t", false, "Help message for toggle")
}
