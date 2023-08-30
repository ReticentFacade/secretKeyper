/*
Copyright © 2023 NAME HERE <EMAIL ADDRESS>
*/
package cmd

import (
	"fmt"
	"log"
	"os"

	"keyper/utils"

	"github.com/spf13/cobra"
)

// initCmd represents the init command
var initCmd = &cobra.Command{
	Use:   "init",
	Short: "Initializes a .secretKeyper directory in your system's home directory",
	Long: `
		Usage --> keyper init
		Description --> Initializes a .secretKeyper directory in your home directory`,
	Run: func(cmd *cobra.Command, args []string) {
		// Check if flag is set:
		generateKey, _ := cmd.Flags().GetBool("generate")

		if len(args) > 0 && !generateKey {
			fmt.Println("Invalid argument for init command. Use --> keyper init")
			return
		}
		// ========================================

		var choice int
		fmt.Println("Please select one of the following options:")
		fmt.Println("1. I have a GPG key.")
		fmt.Println("2. I want Keyper to generate my GPG key.")
		fmt.Print("Enter your choice (1 or 2): ")
		_, err := fmt.Scan(&choice)
		if err != nil {
			log.Fatal("Error reading your choice: ", err)
		}

		if choice == 1 {
			fmt.Println("Please use this flag:")
			fmt.Println("keyper init -g <YOUR_GPG_KEY>")
		} else if choice == 2 {
			// Generate a new GPG key in the background
			generatedKey := utils.GenerateGPGKey()
			fmt.Println("Here's your GPG key:", generatedKey)
			fmt.Println("Keep it safe!")
		} else {
			fmt.Println("Invalid choice. Please select either 1 or 2.")
		}

		// ========================================

		// Get the user's ./secretKeyper directory
		secretKeyperDir := utils.GetKeyperDir()

		// Check if it exists already or not:
		_, err = os.Stat(secretKeyperDir)
		if os.IsNotExist(err) {
			// Create it, if it doesn't:
			err := os.Mkdir(secretKeyperDir, 0700)
			if err != nil {
				log.Fatal("Error creating .secretKeyper directory", err)
			}
			fmt.Println("mkdir: Created .secretKeyper directory at --> ", secretKeyperDir)
		} else {
			fmt.Println("Directory already exists at --> ", secretKeyperDir)
			fmt.Println("SecretKeyper initialized successfully")
		}
	},
}

func init() {
	rootCmd.AddCommand(initCmd)

	initCmd.Flags().BoolP("generate", "g", false, "Generate a new GPG key")
}
