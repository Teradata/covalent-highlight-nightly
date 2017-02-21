package login

import (
	log "github.com/Sirupsen/logrus"
	jwt "github.com/dgrijalva/jwt-go"
	"time"
)

type UserClaims struct {
	jwt.StandardClaims
}

func RequestToken(user *map[string]interface{}) (*map[string]interface{}, error) {
	_, err := Authenticate(user)
	if err != nil {
		return nil, err
	}

	u := *user
	userToken := map[string]interface{}{}
	userToken["username"] = u["username"].(string)

	log.Info("Generating JWT token...")

	// TODO: change 7200 (2 hours) to variable
	t := generateToken(&userToken, 7200)
	if err != nil {
		return nil, err
	}

	return t, nil
}

func generateToken(user *map[string]interface{}, expires int64) *map[string]interface{} {
	key := []byte("AllYourBase")
	now := time.Now().Unix()
	u := *user

	// Create the Claims
	claims := UserClaims{
		jwt.StandardClaims{
			ExpiresAt: now + expires,
			Issuer:    "jwt overlord",
			Id:        u["username"].(string),
			IssuedAt:  now,
			NotBefore: now,
		},
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	ss, _ := token.SignedString(key)

	u["expires_at"] = claims.ExpiresAt
	u["issuer"] = claims.Issuer
	u["id"] = claims.Id
	u["issed_at"] = claims.IssuedAt
	u["not_before"] = claims.NotBefore
	u["access_token"] = ss
	u["token_type"] = "Bearer"

	return &u
}

func remapUserObject(user *map[string]interface{}) *map[string]interface{} {
	return nil
}
