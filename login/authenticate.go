package login

import (
	"fmt"

	"github.com/Teradata/covalent-data/crud"

	log "github.com/Sirupsen/logrus"
)

func Authenticate(credentials *map[string]interface{}) (*map[string]interface{}, error) {
	c := *credentials

	if _, ok := c["username"].(string); !ok {
		log.Info("Authentication attempt failed due to missing or malformed username..")
		return nil, fmt.Errorf("username must be supplied.")
	}
	if _, ok := c["password"].(string); !ok {
		log.Info("Authentication attempt failed due to missing or malformed password.")
		return nil, fmt.Errorf("password must be supplied.")
	}

	user := c["username"].(string)
	pass := c["password"].(string)

	log.Info("Authenticating user ", user)
	if user != pass {
		log.Info("Authentication attempt failed for user ", user)
		return nil, fmt.Errorf("username or password is not correct.")
	}

	u, n, _ := crud.Read("users", user, "")
	if n == 0 {
		log.Info("Authentication attempt failed for user ", user)
		return nil, fmt.Errorf("username or password is not correct.")
	}

	log.Info("Authentication attempt succeeded for user ", user)

	return &u[0], nil
	return nil, nil
}
