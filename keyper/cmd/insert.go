/*
Copyright © 2023 NAME HERE <EMAIL ADDRESS>
*/
package cmd

import (
	"fmt"
	"log"
	"os"

	"keyper/utils"
	"path/filepath"

	"github.com/spf13/cobra"
)

// insertCmd represents the insert command
var insertCmd = &cobra.Command{
	Use:   "insert",
	Short: "Creates a new directory to store passwords for that website",
	Long: `
		Usage -->
		keyper insert <website> 

		Example --> 
		keyper insert instagram
	`,
	Run: func(cmd *cobra.Command, args []string) {
		secretKeyperDir := utils.GetKeyperDir()

		if len(args) != 1 {
			fmt.Println(`Invalid number of arguments.
			Usage --> keyper insert <website>
			`)
			return
		}

		// ##########################################################################

		website := args[0]
		// fmt.Printf("Enter password for %s\n: ", website)
		password, err := utils.ReadPassword()
		if err != nil {
			log.Fatal("Error executing utils.ReadPassword: ", err)
		}
		fmt.Println("Dw, Imma use: ", password)

		websiteDir := filepath.Join(secretKeyperDir, website)
		dirExists, _ := utils.IfDirExists(websiteDir)

		// ##########################################################################

		// CASE 1: Dir = x, File = x
		// Steps: Create dir, create pw file.

		if !dirExists {
			dirPath, err := utils.CreateDir(websiteDir)
			if err == nil {
				// means dir is created
				pwFilePath := filepath.Join(dirPath, "password.txt")
				_, err := utils.CreatePasswordFile(pwFilePath, password)
				if err == nil {
					fmt.Println("pwFile successfully created!")
				}
			} else {
				log.Fatal("Error creating directory ----> \n", err)
			}
		}

		// ##########################################################################

		// CASE 2: Dir = ✓
		// Steps: Go into dir, checkPwFile, if true then don't create, if false then create pw file.

		pwFilePath := filepath.Join(websiteDir, "password.txt")
		if dirExists {
			pwFileExists, err := utils.IfFileExists(pwFilePath)

			if err == nil {
				// CASE 2.1: File = x
				if !pwFileExists {
					_, err := utils.CreatePasswordFile(pwFilePath, password)
					if err != nil {
						log.Fatal("Error creating password file: ", err)
					}
				} else {
					// CASE 2.2: File = ✓
					fmt.Println(`Cannot overwrite already existing pwfile with this command. Use "keyper edit <website>" instead`)
					return
				}
			} else {
				log.Fatal("Error checking if file exists or not", err)
			}
		}

		// ##########################################################################

		os.Exit(0)
	},
}

func init() {
	rootCmd.AddCommand(insertCmd)

	// Here you will define your flags and configuration settings.

	// Cobra supports Persistent Flags which will work for this command
	// and all subcommands, e.g.:
	// insertCmd.PersistentFlags().String("foo", "", "A help for foo")

	// Cobra supports local flags which will only run when this command
	// is called directly, e.g.:
	// insertCmd.Flags().BoolP("toggle", "t", false, "Help message for toggle")
}
