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

var removeFile bool

// removeCmd represents the remove command
var removeCmd = &cobra.Command{
	Use:   "remove",
	Short: "A brief description of your command",
	Long: `Usage:
	keyper remove <website>          - Remove the website directory and its contents
	keyper remove --file <website>   - Remove the password.txt file from the website directory`,
	Run: func(cmd *cobra.Command, args []string) {
		fmt.Println("remove called...")
		secretKeyperDir := utils.GetKeyperDir()
		websiteDir := filepath.Join(secretKeyperDir, args[0])

		// Check if the directory exists
		dirExists, _ := utils.IfDirExists(websiteDir)
		pwFilePath := filepath.Join(websiteDir, "password.txt")
		fileExists, _ := utils.IfFileExists(pwFilePath)

		// Check the flag to determine the user's choice
		if removeFile {
			if fileExists {
				// Remove only the password.txt file
				err := os.Remove(pwFilePath)
				if err != nil {
					log.Fatal("Error removing password file:", err)
				}
				fmt.Println("Password file removed successfully.")
			} else {
				fmt.Println("Password file not found.")
			}
		} else {
			// Ask the user to select an option
			fmt.Println("Select one:")
			fmt.Println("1. Remove the directory and all its contents")
			fmt.Println("2. Remove `password.txt`")

			var choice int
			fmt.Print("Enter your choice: ")
			_, err := fmt.Scan(&choice)
			if err != nil {
				log.Fatal("Error reading user choice:", err)
			}

			switch choice {
			case 1:
				if dirExists {
					// Remove the entire directory and its contents
					err := os.RemoveAll(websiteDir)
					if err != nil {
						log.Fatal("Error removing directory:", err)
					}
					fmt.Println("Website directory removed successfully.")
				} else {
					fmt.Println("Website directory not found.")
				}
			case 2:
				if fileExists {
					// Remove only the password.txt file
					err := os.Remove(pwFilePath)
					if err != nil {
						log.Fatal("Error removing password file:", err)
					}
					fmt.Println("Password file removed successfully.")
				} else {
					fmt.Println("Password file not found.")
				}
			default:
				fmt.Println("Invalid choice. Please select 1 or 2.")
			}
		}
	},
}

func init() {
	rootCmd.AddCommand(removeCmd)
	// Add the --file flag and bind it to the removeFile variable
	removeCmd.Flags().BoolVarP(&removeFile, "file", "f", false, "Remove `password.txt` file only")
	// removeCmd.Flags().Bool("file", false, "Remove only the password.txt file")

	// Here you will define your flags and configuration settings.

	// Cobra supports Persistent Flags which will work for this command
	// and all subcommands, e.g.:
	// removeCmd.PersistentFlags().String("foo", "", "A help for foo")

	// Cobra supports local flags which will only run when this command
	// is called directly, e.g.:
	// removeCmd.Flags().BoolP("toggle", "t", false, "Help message for toggle")
}
