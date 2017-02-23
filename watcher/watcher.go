package watcher

import (
	log "github.com/Sirupsen/logrus"
	"github.com/fsnotify/fsnotify"
)

func Watch(watchDirs []string, execute func()) {
	watcher, err := fsnotify.NewWatcher()
	if err != nil {
		log.Fatal(err)
	}
	defer watcher.Close()

	done := make(chan bool)
	for {
		select {
		case event := <-watcher.Events:
			//log.Info("Watcher event:", event)
			if event.Op&fsnotify.Write == fsnotify.Write {
				//log.Warn("Modified file:", event.Name)
				log.Warn("Changes detected.  Reloading config...")
				execute()
			}
		case err := <-watcher.Errors:
			log.Error("Error:", err)
		}
	}

	for _, v := range watchDirs {
		err = watcher.Add(v)
		if err != nil {
			log.Fatal(err)
		}
	}

	<-done
}
