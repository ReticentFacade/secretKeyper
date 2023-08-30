package cmd

import (
	"fmt"
	"path/filepath"

	"keyper/utils"

	"github.com/spf13/cobra"
)

var gitInitCmd = &cobra.Command{
	Use:   "git init",
	Short: "Initialize a Git repository in the keyper directory",
	Long: `Usage: 
	keyper git init`,
	Run: func(cmd *cobra.Command, args []string) {
		// Get the path to the secretKeyper directory
		secretKeyperDir := utils.GetKeyperDir()

		// Check if secretKeyperDir exists
		dirExists, err := utils.IfDirExists(secretKeyperDir)
		if err != nil {
			fmt.Println("Error checking if directory exists:", err)
			return
		}
		if !dirExists {
			fmt.Println("The secretKeyper directory does not exist. Please run 'keyper init' first.")
			return
		}

		gitDir := filepath.Join(secretKeyperDir, ".git")

		// Check if the .git directory exists
		gitDirExists, err := utils.IfDirExists(gitDir)
		if err != nil {
			fmt.Println("Error checking if directory exists:", err)
			return
		}

		if !gitDirExists {
			// Create the .git directory if it doesn't exist

			// Run 'git init' in the secretKeyper directory
			err = utils.GitInitInDirectory(secretKeyperDir)
			if err != nil {
				fmt.Println("Error initializing Git repository:", err)
				return
			}
			fmt.Println("Git repository initialized in the secretKeyper directory.")
		} else {
			fmt.Println("Git repository already initialized in the secretKeyper directory.")
			return
		}
	},
}

func init() {
	rootCmd.AddCommand(gitInitCmd)
}
