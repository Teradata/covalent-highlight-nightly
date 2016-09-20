package charts

import (
	"math"
	"math/rand"
)

var Functions = map[string]func(int) float64{
	"black_friday": BlackFriday,
	"sawtooth":     Sawtooth,
	"sine":         Sine,
	"slow_rise":    SlowRise,
	"slow_decline": SlowDecline,
	"square":       Square,
	"triangle":     Triangle,
}

func Sine(in int) float64 {
	return math.Sin(float64(in)*0.1)*100 + 100
}

func Sawtooth(in int) float64 {
	return float64(in % 10)
}

func Triangle(in int) float64 {
	if in%100 < 50 {
		return float64(in % 100)
	}
	return float64(100 - in%100)
}

func Square(in int) float64 {
	if in%100 < 50 {
		return float64(2)
	}
	return float64(94)
}

func BlackFriday(in int) float64 {
	if in > 50 && in < 160 {
		return math.Abs(rand.NormFloat64() + 95)
	}
	return math.Abs(rand.NormFloat64() + 4)
}

func SlowRise(in int) float64 {
	if in > 99 {
		return math.Abs(rand.NormFloat64() + 95)
	}
	return math.Abs(rand.NormFloat64() + float64(in))
}

func SlowDecline(in int) float64 {
	if in > 100 {
		return math.Abs(rand.NormFloat64() + 1)
	}
	return math.Abs(rand.NormFloat64() + float64(95-in))
}
