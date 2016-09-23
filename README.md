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

### Upcoming and To-Dos
- [ ] Add a dockerfile and add to docker hub
- [ ] Link to precompiled binaries
- [ ] Update schema detection to use go templates
- [ ] Godoc support
- [ ] Mock chart data support
- [ ] Function support for CRUD seeding
