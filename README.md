# Agency-management
A simple agency CRUD manager application with Angular UI - Kotlin backend and mongodb for persistence.

## How to run?
* Create a docker image for the application using the Dockerfiles available in the app's root directory. Run the below commands in the app's root directory.
```bash
> docker-compose -f docker-compose-local.yaml up -d
> ./gradlew clean build
> docker build -t agency-management:1.0 -f Dockerfile .
> docker build -t agency-management-ui:1.0 -f DockerfileUI .
> docker-compose -f docker-compose-local.yaml down
```
* The previous commands creates and copies the jar/dist as part of the container images(Part of the CI pipeline service in prod). Now to run the actual tool including the mongo database.
```bash
> docker-compose -f docker-compose-prod.yaml up -d
```
* **The application frontend is available at `http://localhost:8090/index.html`**
* The backend api's are available under `8080` port. The db(using mongo-express) can be viewed using `8081` port.
* Data is persisted using docker volumes. The containers can be taken down when not required.
```bash
> docker-compose -f docker-compose-prod.yaml down
```
