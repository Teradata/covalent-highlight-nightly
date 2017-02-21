package login

import (
	//"time"
	log "github.com/Sirupsen/logrus"
	jwt "github.com/dgrijalva/jwt-go"
)

type UserClaims struct {
	Foo string `json:"foo"`
	jwt.StandardClaims
}

func RequestToken(user *map[string]interface{}) (*map[string]interface{}, error) {
	userData, err := Authenticate(user)
	if err != nil {
		return nil, err
	}

	log.Info("Generating JWT token...")
	token := generateToken(userData)
	if err != nil {
		return nil, err
	}

	u := *userData
	u["access_token"] = token
	u["token_type"] = "Bearer"
	return &u, nil
}

func generateToken(user *map[string]interface{}) string {
	key := []byte("AllYourBase")

	// Create the Claims
	claims := UserClaims{
		"bar",
		jwt.StandardClaims{
			ExpiresAt: 15000,
			Issuer:    "jwt overlord",
		},
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	ss, _ := token.SignedString(key)
	return ss
}

func remapUserObject(user *map[string]interface{}) *map[string]interface{} {
	return nil
}
