package utils

import (
	"fmt"
	"time"

	"github.com/atotto/clipboard"
)

func CopyToClipboard(text string) error {
	err := clipboard.WriteAll(text)
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
