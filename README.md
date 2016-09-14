# covalent-data
## Golang based mock api server

covalent-data is a mock API server with the following features:

1. mock CRUD capability (available now)
2. mock chart data (TBA)

### Getting Started

A prerequisite to running covalent-data is to have [Go](https://golang.org/doc/install) installed on your machine.  Alternatively, you can use precompiled executables that are included with [covalent-quickstart](https://github.com/Teradata/covalent-quickstart).

#### Getting started with go
1. Pull down this repository into your $GOROOT src folder
2. cd into this repo and `go get`
2. `go run server.go`

#### Getting started with covalent-quickstart
1. cd into the covalent-quickstart directory
2. cd into the `mock-api` directory
3. run the executable that's applicable to your operating system.

### Customizing CRUD objects
covalent-data allows you to create custom [CRUD](https://en.wikipedia.org/wiki/Create,_read,_update_and_delete) endpoints.
On startup, it will automatically create these endpoints from yaml files in the `/schemas` directory and seed them with mock data based on example files in the `datum` directory.
There are two steps to customizing CRUD objects:

#### Step one (Create your mock object schemas):
- Create a yaml file in the `/schemas` directory.
- The CRUD endpoints will be automatically created based on the name of the file you create. (for instance, `systems.yaml` will create GET, POST, PUT, PATCH, and DELETE at http://localhost:8080/systems)
- The first line of the yaml file should be labeled `initial_entries`.  This tells the API server how many initial entries to seed your table with.
- The following lines in the yaml file define what the structure of your object will look like.
- Notice the following yaml example has some variable names bounded by underscores (`_systemname_`)- these will be discussed in the next step.

`systems.yaml:`
``` yaml
initial_entries: 8
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

#### Step two (Create mock data values to seed your schemas with):
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

### Upcoming and To-Dos
- [ ] Add a dockerfile and add to docker hub
- [ ] Link to precompiled binaries
- [ ] Update schema detection to use go templates
- [ ] Godoc support
- [ ] Mock chart data support
- [ ] Function support for CRUD seeding
