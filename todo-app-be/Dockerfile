FROM eclipse-temurin:21-jdk

WORKDIR /app

COPY .mvn/ .mvn
COPY mvnw .
COPY pom.xml .
RUN ./mvnw dependency:resolve

COPY src ./src

RUN ./mvnw package -DskipTests

CMD ["java", "-jar", "target/todo-app.jar"]
