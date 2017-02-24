package config

import (
	"strings"

	log "github.com/Sirupsen/logrus"
	"github.com/Teradata/covalent-data/http/router"
	"github.com/fsnotify/fsnotify"
)

var watcher *fsnotify.Watcher
var done = make(chan bool)

func Watch(configDirs []string) {
	if watcher == nil {
		watcher, _ = fsnotify.NewWatcher()
		for _, v := range configDirs {
			err := watcher.Add(v)
			if err != nil {
				log.Fatal("fsnotify error:", err)
			}
		}
	}

	go func() {
		for {
			select {
			case event := <-watcher.Events:
				fn := strings.Split(event.Name, "/")
				l := len(fn) - 1
				if !strings.HasSuffix(fn[l], "~") && !strings.HasPrefix(fn[l], ".") {
					if event.Op&fsnotify.Write == fsnotify.Write ||
						event.Op&fsnotify.Create == fsnotify.Create ||
						event.Op&fsnotify.Remove == fsnotify.Remove {
						log.Warn("Modified file: ", fn[l], "...Reloading config")
						router.Initialize(configDirs[0], configDirs[1], configDirs[2])
					}
				}
			case err := <-watcher.Errors:
				log.Error("fsnotify error:", err)
			}
		}
	}()

	<-done
}
