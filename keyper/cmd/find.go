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
	"strings"

	"github.com/spf13/cobra"
)

// findCmd represents the find command
var findCmd = &cobra.Command{
	Use:   "find",
	Short: "Searches for all passwords given a string",
	Long: `Usage:
	keyper find <string> - Search for passwords containing the specified string`,
	Run: func(cmd *cobra.Command, args []string) {
		secretKeyperDir := utils.GetKeyperDir()
		if len(args) != 1 {
			fmt.Println(`Invalid number of arguments.
            Usage --> keyper find <string>
            `)
			return
		}
		searchString := args[0]

		// Walk through all subdirectories in the secretKeyperDir
		err := filepath.Walk(secretKeyperDir, func(path string, info os.FileInfo, err error) error {
			if err != nil {
				return err
			}

			// Check if the current path is a directory and not the root directory
			if info.IsDir() && path != secretKeyperDir {
				// Read the password file in the current directory
				pwFilePath := filepath.Join(path, "password.txt")
				password, err := utils.ReadPasswordFile(pwFilePath)
				if err != nil {
					return nil // Continue searching other directories
				}

				// Check if the password contains the search string
				if strings.Contains(password, searchString) {
					fmt.Printf("Found in %s:\n%s\n", path, password)
				}
			}

			return nil
		})

		if err != nil {
			log.Fatal("Error searching for passwords: ", err)
		}
	},
}

func init() {
	rootCmd.AddCommand(findCmd)

	// Here you will define your flags and configuration settings.

	// Cobra supports Persistent Flags which will work for this command
	// and all subcommands, e.g.:
	// findCmd.PersistentFlags().String("foo", "", "A help for foo")

	// Cobra supports local flags which will only run when this command
	// is called directly, e.g.:
	// findCmd.Flags().BoolP("toggle", "t", false, "Help message for toggle")
}
