// utils/progress.go

package utils

import (
	"fmt"
	"strings"
	"sync"
	"time"
)

// ProgressBar represents a progress bar.
type ProgressBar struct {
	TotalSteps   int
	CurrentStep  int
	progressDone chan struct{}
	mu           sync.Mutex
}

// NewProgressBar creates a new progress bar instance.
func NewProgressBar(totalSteps int) *ProgressBar {
	return &ProgressBar{
		TotalSteps:   totalSteps,
		CurrentStep:  0,
		progressDone: make(chan struct{}),
	}
}

// Start initializes and starts the progress bar.
func (pb *ProgressBar) Start() {
	go func() {
		pb.mu.Lock()
		defer pb.mu.Unlock()

		for pb.CurrentStep <= pb.TotalSteps {
			progress := float64(pb.CurrentStep) / float64(pb.TotalSteps) * 100
			pb.printProgressBar(progress)

			pb.CurrentStep++

			// Exit the goroutine when progress reaches 100%
			if pb.CurrentStep > pb.TotalSteps {
				close(pb.progressDone)
				return
			}

			time.Sleep(15 * time.Millisecond) // Faster update
			// Clear the line after progress is complete
		}
		fmt.Printf("\n")
	}()
}

// Wait waits for the progress bar to complete.
func (pb *ProgressBar) Wait() {
	<-pb.progressDone
	fmt.Printf("\n")
}

// Increment increments the progress by one step.
func (pb *ProgressBar) Increment() {
	pb.mu.Lock()
	defer pb.mu.Unlock()

	if pb.CurrentStep < pb.TotalSteps {
		pb.CurrentStep++
		progress := float64(pb.CurrentStep) / float64(pb.TotalSteps) * 100
		pb.printProgressBar(progress)
	}
}

func (pb *ProgressBar) printProgressBar(progress float64) {
	barLength := 50 // Adjustable length of the progress bar
	percent := progress

	// Calculate the number of "#" characters to display
	numberOfHashes := int(float64(barLength) * (percent / 100))
	numberOfSpaces := barLength - numberOfHashes

	// Create the progress bar string
	progressBar := "[" + strings.Repeat("#", numberOfHashes) + strings.Repeat("-", numberOfSpaces) + "]"
	progressBar += fmt.Sprintf(" %.2f%%", progress)

	// Print the progress bar without a newline
	fmt.Printf("\r%s", progressBar)
}
