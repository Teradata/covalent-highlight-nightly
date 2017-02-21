package login

import (
	"time"

	log "github.com/Sirupsen/logrus"
	jwt "github.com/dgrijalva/jwt-go"
)

// possible TODO: make this key configurable.
const key = "ICanHazKeysburger"

type UserClaims struct {
	jwt.StandardClaims
}

func RequestToken(user *map[string]interface{}) (*map[string]interface{}, error) {
	userToken, err := Authenticate(user)
	if err != nil {
		return nil, err
	}

	log.Info("Generating JWT token...")

	// TODO: change 7200 (2 hours) to variable
	t := generateToken(userToken, 7200)
	if err != nil {
		return nil, err
	}

	return t, nil
}

func generateToken(user *map[string]interface{}, expires int64) *map[string]interface{} {
	key := []byte(key)
	now := time.Now().Unix()
	u := *user

	// Create the Claims
	claims := UserClaims{
		jwt.StandardClaims{
			ExpiresAt: now + expires,
			Issuer:    "jwt overlord",
			IssuedAt:  now,
			NotBefore: now,
		},
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	ss, _ := token.SignedString(key)

	u["access_token"] = ss
	u["token_type"] = "Bearer"

	return &u
}

func validateToken(tokenString string) error {
	token, err := jwt.ParseWithClaims(tokenString, &UserClaims{}, func(token *jwt.Token) (interface{}, error) {
		return []byte(key), nil
	})

	if _, ok := token.Claims.(*UserClaims); ok && token.Valid {
		return nil
	}

	return err
}
