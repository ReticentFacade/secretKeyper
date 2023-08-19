/*
Copyright © 2023 NAME HERE <EMAIL ADDRESS>
*/
package cmd

import (
	"fmt"
	"keyper/utils"
	"os"
	"path/filepath"

	"github.com/spf13/cobra"
)

// ANSI color escape codes
const (
	colorReset  = "\033[0m"
	colorGreen  = "\033[32m"
	colorYellow = "\033[33m"
)

// keyperCmd represents the keyper command
var keyperCmd = &cobra.Command{
	Use:   "keyper",
	Short: "Prints the tree structure of .secretKeyper",
	Long:  `Use "keyper" to checkout the tree structure of your .secretKeyper directory`,
	Run: func(cmd *cobra.Command, args []string) {
		// fmt.Printf(".secretKeyper\n\n")
		fmt.Printf("%s%s%s\n", colorGreen, ".secretKeyper", colorReset)
		fmt.Println()

		// Get the dir
		secretKeyperDir := utils.GetKeyperDir()

		// Print the tree structure of the directory
		if err := printTree(secretKeyperDir, ""); err != nil {
			fmt.Println("Error:", err)
		}
	},
}

func printTree(rootPath string, indent string) error {
	// Open the directory
	dir, err := os.Open(rootPath)
	if err != nil {
		return err
	}
	defer dir.Close()

	// Read the directory contents
	entries, err := dir.Readdir(0)
	if err != nil {
		return err
	}

	for i, entry := range entries {
		// Determine colour based on whether it's a directory or file
		var nameColor, indentColor, resetColor string
		if entry.IsDir() {
			nameColor = colorGreen
		} else {
			nameColor = colorReset
		}

		// Set colour codes for indentation and reset
		indentColor = colorReset
		resetColor = colorReset

		// Print current entry with appropriate indentation and colour
		fmt.Printf("%s%s%s%s%s\n", indent, indentColor, nameColor, entry.Name(), resetColor)

		// Recursively print subdirectory tree
		if entry.IsDir() {
			subPath := filepath.Join(rootPath, entry.Name())
			var subIndent string
			if i == len(entries)-1 {
				subIndent = indent + "└── "
			} else {
				subIndent = indent + "├── "
			}
			if err := printTree(subPath, subIndent); err != nil {
				return err
			}
		}
	}
	return nil
}

func init() {
	rootCmd.AddCommand(keyperCmd)
	// rootCmd.Execute()

	// Here you will define your flags and configuration settings.

	// Cobra supports Persistent Flags which will work for this command
	// and all subcommands, e.g.:
	// keyperCmd.PersistentFlags().String("foo", "", "A help for foo")

	// Cobra supports local flags which will only run when this command
	// is called directly, e.g.:
	// keyperCmd.Flags().BoolP("toggle", "t", false, "Help message for toggle")
}
