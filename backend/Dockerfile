FROM eclipse-temurin:17-jdk

# Set the working directory in the container
WORKDIR /app

# Copy the built JAR file into the container
COPY target/*.jar app.jar

# Expose the application port
EXPOSE 8080

# Run the application
ENTRYPOINT ["java", "-Xmx256m", "-Xms128m","-jar", "app.jar"]
