package charts

import (
	"fmt"
	"time"

	log "github.com/Sirupsen/logrus"
	uuid "github.com/satori/go.uuid"
)

var Sets = map[string]*Set{}

type function func(int) float64

type xAxis struct {
	name   string
	values []int64
}

type yAxis struct {
	name     string
	values   []float64
	function function
}

type Set struct {
	Name      string
	Key       string
	Length    int
	IntervalS int
	created   int64
	stop      chan bool
	active    bool
	x         xAxis
	ys        []yAxis
}

// GetSetData returns an array of data points from the existing set.
func GetSetData(key string) *[]map[string]interface{} {

	if _, ok := Sets[key]; !ok {
		return nil
	}

	s := *Sets[key]

	ma := []map[string]interface{}{}
	for i := 0; i < s.Length; i++ {
		m := map[string]interface{}{}
		m[s.x.name] = s.x.values[i]
		for _, y := range s.ys {
			m[y.name] = y.values[i]
		}
		ma = append(ma, m)
	}

	return &ma
}

func ListSets() []map[string]interface{} {
	ma := []map[string]interface{}{}
	for k, v := range Sets {
		m := map[string]interface{}{
			"key":    k,
			"active": v.active,
			"name":   v.Name,
		}
		ma = append(ma, m)
	}

	return ma
}

func DeleteSet(key string) {
	if _, ok := Sets[key]; !ok {
		return
	}

	s := *Sets[key]
	s.Stop()
	delete(Sets, key)
}

// NewSet returns a new set.
func NewSet(Name string, Length int, IntervalS int) *Set {
	if Length == 0 || IntervalS == 0 {
		return nil
	}

	key := uuid.NewV4().String()
	Sets[key] = &Set{
		Name:      Name,
		Key:       key,
		Length:    Length,
		IntervalS: IntervalS,
		active:    false,
		stop:      make(chan bool),
		created:   time.Now().Unix(),
		ys:        []yAxis{},
	}

	return Sets[key]
}

func (s *Set) AddYAxis(name string, fn function) error {
	if fn == nil {
		return fmt.Errorf("Specified function does not exist.")
	}

	y := yAxis{
		name:     name,
		values:   []float64{},
		function: fn,
	}
	y.values = make([]float64, s.Length)

	for i := 0; i < s.Length; i++ {
		y.values[i] = fn(i)
	}
	s.ys = append(s.ys, y)

	return nil
}

func (s *Set) createXAxis(name string) {
	tick := s.created

	x := xAxis{
		name:   name,
		values: []int64{},
	}
	x.values = make([]int64, s.Length)

	for i := 0; i < s.Length; i++ {
		p := s.Length - i - 1
		x.values[p] = tick
		tick = tick - int64(s.IntervalS)
	}
	s.x = x
}

func (s *Set) Run() {
	s.createXAxis("timestamp")
	s.active = true
	go func() {
		for {
			select {
			case <-s.stop:
				log.Info("Stopping data stream ", s.Name)
				return
			default:
				time.Sleep(time.Duration(s.IntervalS) * time.Second)
				s.push()
			}
		}
	}()
}

func (s *Set) Stop() {
	s.active = false
	s.stop <- true
}

func (s *Set) IsActive() bool {
	return s.active
}

func (s *Set) push() {
	now := time.Now().Unix()
	i := int((now-s.created)/int64(s.IntervalS)) + (s.Length - 1)
	s.x.values = append(s.x.values[1:], now)
	for a, y := range s.ys {
		s.ys[a].values = append(y.values[1:], y.function(i))
	}
}
