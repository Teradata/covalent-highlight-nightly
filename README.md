# covalent-data
## Golang based mock api server

covalent-data is a mock API server with the following features:

1. mock CRUD capability
2. mock chart data (TBA)

### Getting started
#### go
To run from source or to create your own executables, you must first install [Go](https://golang.org/doc/install).

1. Pull down this repository into your $GOROOT src folder
2. cd into this repo and `go get`
3. `go run server.go`
4. The `/schema` directory and the `/datum` directory must be in the root of this repo.

#### npm
The covalent-data CLI is available to download as a package in the [npm repository](https://www.npmjs.com/package/@covalent/data).

1. `npm install @covalent/data -g`
2. `covalent-data`

#### docker
To run from docker:

1. Install [Docker Engine](https://docs.docker.com/engine/installation/).
2. Pull down this repo and `cd` into it.
3. `docker build -t covalent-data .`
4. `docker run -p 8080:8080 --name covalent-data covalent-data`
5. To stop- `docker stop covalent-data`

#### covalent-quickstart
covalent-data is included in the [covalent-quickstart](https://github.com/Teradata/covalent-quickstart) repo.

1. Pull down the latest covalent-quickstart repo.
2. `npm install`
3. `npm run start-api` (`npm run stop-api` to stop the API server)
4. `ng serve` and go to http://localhost:4200

### Using covalent-data
#### Customizing CRUD objects
covalent-data allows you to create custom [CRUD](https://en.wikipedia.org/wiki/Create,_read,_update_and_delete) endpoints.
On startup, it will automatically create these endpoints from yaml files in the `/schemas` directory and seed them with mock data based on example files in the `datum` directory.
There are two steps to customizing CRUD objects:

##### Step one (Create your mock object schemas):
- Create a yaml file in the `/schemas` directory.
- The CRUD endpoints will be automatically created based on the name of the file you create. (for instance, `systems.yaml` will create GET, POST, PUT, PATCH, and DELETE at http://localhost:8080/systems)
- The first line of the yaml file can optionally be labeled `initial_entries`.  This tells the API server how many initial entries to seed your table with.
- The second line of the yaml file can optionally be labeled `randomize`.  This tells the API server whether you want the seed data randomized, or ordered.  Ordered data can be useful if you need to have the same usernames across multiple objects, for example.
- The following lines in the yaml file define what the structure of your object will look like.
- Notice the following yaml example has some variable names bounded by underscores (`_systemname_`)- these will be discussed in the next step.

`systems.yaml:`
``` yaml
initial_entries: 8
randmoize: false
name: _systemname_
status: _activity_
sessions: _session_
workloads: _workload_
```

will generate eight random JSON objects that look like this:
``` json
{
  "name": "tdsystem",
  "status": "active",
  "sessions": "12",
  "workloads": "55"
```

##### Step two (Create mock data values to seed your schemas with):
- Create a text file in the `/datum` directory.
- The text file should be named with one of the underscore bounded variables from the previous steps. (For instance, `systemname.txt`.
- Each line of the txt file should have one value that you want to seed your initial database with.  (For instance, `tdsystem`).
- *Each underscore bounded variable should have a corresponding txt file!*

`systemname.txt:`
``` txt
tdsystem
awssystem
aster
localsystem
```
##### Step three- try it out!
Once your mock objects are created, run the mock server.  You can then send RESTful commands to it!  Try the following:
- `GET http://localhost:8080/ping` (this will return a pong)
- `GET http://localhost:8080/systems` (this will return the fake systems defined by the schemas and datum)
- `POST http://localhost:8080/systems` - send a body with this one to create a new entry
- `GET http://localhost:8080/systems/{system_name}`
- `PUT http://localhost:8080/systems/{system_name}` - send a body with this one to update the system
- `DELETE http://localhost:8080/systems/{system_name}` - delete the system

We also support sorting and paging:
- `GET http://localhost:8080/users?sort={asc|desc}:{sortOnValue}&page=1&per_page=50`

#### Charts
Covalent-data will create realistic chart data that you can use right away in your charts.

##### Step one (create a new mock chart)
Send a `POST http://localhost:8080/charts` with a body that's formatted as such:

``` json
{
  "name": "my new chart",
  "key": "MyChartKey",
  "num_data_points": 60,
  "interval_seconds": 90,
  "y_axes": [
    {
      "name": "cpu",
      "function_type": "black_friday" 
    },
    {
      "name": "hits",
      "function_type": "sawtooth" 
    }
  ]
}
```

This will create *60* points, spaced *90 seconds* apart, with two y-axes- `cpu` and `hits`.

_IMPORTANT NOTE_: if you omit `num_data_points` (or set to 0) then the chart data will disappear as you consume it.  Otherwise,
you will always get 60 time ordered data points in a queue.

The following `function_types` for Y axes are available:

- `black_friday`
- `sawtooth`
- `sine`
- `slow_rise`
- `slow_decline`
- `square`
- `triangle`

The value you set for `key` is how you will access your mock chart data.  This is an optional value, and if you dont set this, the API will assign a unique key for your mock chart data.

##### Step two (consume chart data)
Send a `GET http://localhost:8080/charts/MyChartKey` and you will get a JSON array back that looks similar to this:
```json
[
  {
    "cpu": 3.4086436391430617,
    "hits": 0,
    "timestamp": 1474998463
  },
  {
    "cpu": 3.436764648923683,
    "hits": 1,
    "timestamp": 1474998523
  },
  {
    "cpu": 4.839440493047819,
    "hits": 2,
    "timestamp": 1474998583
  },
  {
    "cpu": 3.871987273635802,
    "hits": 3,
    "timestamp": 1474998643
  },
  {
    "cpu": 3.3517529842176668,
    "hits": 4,
    "timestamp": 1474998703
  },
  {
    "cpu": 4.161895630999336,
    "hits": 5,
    "timestamp": 1474998763
  }
]
```

### Upcoming and To-Dos
- [ ] Update schema detection to use go templates
- [ ] Godoc support
- [ ] Function support for CRUD seeding
