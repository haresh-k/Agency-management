#FROM openjdk:8-jre-alpine3.9
FROM gradle:7.4.2-jdk11-alpine AS build
ENV MONGO_DB_USERNAME=admin \
    MONGO_DB_PWD=password
COPY --chown=gradle:gradle . /home/gradle/src
WORKDIR /home/gradle/src
RUN gradle build --no-daemon

FROM openjdk:8-jre-slim

EXPOSE 8080

RUN mkdir /app

COPY --from=build /home/gradle/src/build/libs/*.jar /app/agency-management-application.jar
ENTRYPOINT ["java", "-XX:+UnlockExperimentalVMOptions", "-XX:+UseCGroupMemoryLimitForHeap", "-Djava.security.egd=file:/dev/./urandom","-jar","/app/agency-management-application.jar"]