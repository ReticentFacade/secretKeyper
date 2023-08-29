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
			fmt.Println("Directory already exists at --> ", secretKeyperDir)
			fmt.Println("SecretKeyper initialized successfully")
		}
	},
}

func init() {
	rootCmd.AddCommand(initCmd)

	// Here you will define your flags and configuration settings.

	// Cobra supports Persistent Flags which will work for this command
	// and all subcommands, e.g.:
	// initCmd.PersistentFlags().String("foo", "", "A help for foo")

	// Cobra supports local flags which will only run when this command
	// is called directly, e.g.:
	// initCmd.Flags().BoolP("toggle", "t", false, "Help message for toggle")
}
