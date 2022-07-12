# Agency-management
A simple agency CRUD manager application with Kotlin backend and mongodb for persistence.

## How to run?
* Create a docker image for the backend application using the Dockerfile available in the app's root directory. Simply, run the below command in the app's root directory.
```bash
docker build -t agency-management:1.0 .
```
* The previous command creates and copies the jar as part of the container image(Part of the CI pipeline service in prod). Now to run the actual tool including the mongo database.
```bash
docker-compose -f .\docker-compose.yaml up
```
* The backend api's are available under `8080` port. The db(using mongo-express) can be viewed using `8081` port.
* Data is persisted using docker volumes. The containers can be taken down when not required.
```bash
docker-compose -f .\docker-compose.yaml down
```
