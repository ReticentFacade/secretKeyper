package utils

import (
	"fmt"
	"time"

	"github.com/atotto/clipboard"
)

func CopyToClipboard(str string) error {
	fmt.Println("Password copied to clipboard for 90 seconds.")
	err := clipboard.WriteAll(str)
	if err != nil {
		fmt.Println("Error copying to clipboard:", err)
	}
	return err
}

func ClearClipboardAfterDelay(delaySeconds int) error {
	time.Sleep(time.Duration(delaySeconds) * time.Second)

	err := clipboard.WriteAll("") // Clear clipboard
	if err != nil {
		fmt.Println("Error clearing clipboard:", err)
	}
	return err
}
