package charts

import (
	"math"
	"math/rand"
)

func Random(in int) float64 {
	return math.Abs(rand.NormFloat64() * 10)
}

func Sine(in int) float64 {
	return math.Sin(float64(in)+50) * 10
}

func Sawtooth(in int) float64 {
	return float64(in % 10)
}
