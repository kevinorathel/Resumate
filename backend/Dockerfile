FROM eclipse-temurin:17-jdk-alpine as base
WORKDIR /app
COPY target/*.jar .
EXPOSE 8080
ENTRYPOINT ["java", "-Xms128m", "-Xmx256m", "-jar", "app.jar"]

