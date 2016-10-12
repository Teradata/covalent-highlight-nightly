package charts

import (
	"fmt"
	"sync"
	"time"

	log "github.com/Sirupsen/logrus"
	id "github.com/ilsiepotamus/gfycatid"
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

type length struct {
	init    int
	current int
}

type Set struct {
	Name      string
	Key       string
	IntervalS int
	length    *length
	created   int64
	stop      chan bool
	active    bool
	fifo      bool
	lock      sync.Mutex
	x         *xAxis
	ys        []*yAxis
}

// GetSetData returns an array of data points from the existing set.
// If set length is zero, remove data that's being read
func GetSetData(key string, length int) (*[]map[string]interface{}, int) {
	if _, ok := Sets[key]; !ok {
		return nil, 0
	}

	s := *Sets[key]
	total := s.length.current
	if length == 0 || length > s.length.current {
		length = s.length.current
	}

	ma := []map[string]interface{}{}

	for i := 0; i < length; i++ {
		m := s.pop(i)
		ma = append(ma, m)
	}
	return &ma, total
}

func ListSets() []map[string]interface{} {
	ma := []map[string]interface{}{}
	for k, v := range Sets {
		m := map[string]interface{}{
			"key":  k,
			"name": v.Name,
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
func NewSet(name string, key string, l int, intervalS int) *Set {
	if intervalS == 0 {
		return nil
	}

	fifo := true

	// set length to 60 if none is specified
	if l == 0 {
		l = 60
		fifo = false
	}

	Length := &length{
		init:    l,
		current: l,
	}

	// generate a key if the user doesn't specify one
	if key == "" {
		key = id.New()
	}

	Sets[key] = &Set{
		Name:      name,
		Key:       key,
		length:    Length,
		IntervalS: intervalS,
		active:    false,
		fifo:      fifo,
		lock:      sync.Mutex{},
		stop:      make(chan bool),
		created:   time.Now().Unix(),
		ys:        []*yAxis{},
	}

	return Sets[key]
}

func (s *Set) AddYAxis(name string, fn function) error {
	if fn == nil {
		return fmt.Errorf("Specified function does not exist.")
	}

	y := yAxis{
		name:     name,
		values:   make([]float64, 0),
		function: fn,
	}
	for i := 0; i < s.length.init; i++ {
		y.values = append(y.values, fn(i))
	}
	s.ys = append(s.ys, &y)
	return nil
}

func (s *Set) createXAxis(name string) {
	tick := s.created

	x := xAxis{
		name:   name,
		values: make([]int64, 0),
	}

	ticks := make([]int64, s.length.init)
	for i := 0; i < s.length.init; i++ {
		p := s.length.init - i - 1
		ticks[p] = tick
		tick = tick - int64(s.IntervalS)
	}

	for i := 0; i < s.length.init; i++ {
		x.values = append(x.values, ticks[i])
		//x.values[p] = tick
		tick = tick - int64(s.IntervalS)
	}
	s.x = &x
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
	s.lock.Lock()
	defer s.lock.Unlock()

	now := time.Now().Unix()
	i := int((now-s.created)/int64(s.IntervalS)) + (s.length.init - 1)

	if s.fifo {
		s.x.values = append(s.x.values[1:], now)
		for a, y := range s.ys {
			s.ys[a].values = append(y.values[1:], y.function(i))
		}
	} else {
		s.x.values = append(s.x.values, now)
		for a, y := range s.ys {
			s.ys[a].values = append(y.values, y.function(i))
		}
		s.length.current++
	}
}

func (s *Set) pop(i int) map[string]interface{} {
	s.lock.Lock()
	defer s.lock.Unlock()
	if s.length.current == 0 {
		return nil
	}

	m := map[string]interface{}{}

	if s.fifo {
		m[s.x.name] = s.x.values[i]
		for _, y := range s.ys {
			m[y.name] = y.values[i]
		}
	} else {
		m[s.x.name] = s.x.values[0]
		s.x.values = s.x.values[1:]
		for k, y := range s.ys {
			m[y.name] = y.values[0]
			s.ys[k].values = y.values[1:]
		}
		s.length.current--
	}
	return m
}
