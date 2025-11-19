###########################
# 1) BUILD STAGE
###########################
FROM maven:3.9.6-amazoncorretto-21 AS build

WORKDIR /app

# Copy Maven config first (for caching dependency downloads)
COPY pom.xml .
RUN mvn -q dependency:go-offline

# Copy source code
COPY src ./src

# Build the JAR
RUN mvn -q clean package -DskipTests


###########################
# 2) RUNTIME STAGE
###########################
FROM amazoncorretto:21-alpine

ARG PROFILE=dev

WORKDIR /app

# Copy only final JAR from build stage
COPY --from=build /app/target/*.jar app.jar

# Extract the JAR version
#ARG APP_VERSION=1.0.1
#RUN APP_VERSION=$(ls /app | grep *.jar | awk 'NR==2{split($0,a,"-"); print a[3]}' | awk '{sub(/.jar$/,"")}1')\ && echo "Building container with BSN v-$version"

# ================
# ENV VARIABLES
# ================
ENV ACTIVE_PROFILE=${PROFILE}
ENV DB_URL=jdbc:postgresql://postgres:5432/todo_db
ENV JAR_NAME=app.jar


# Expose backend port
EXPOSE 8080

# Environment variables (override in docker-compose)
# ENV SPRING_PROFILES_ACTIVE=${PROFILE}
ENV JAVA_OPTS=""

CMD java -jar \
  -Dspring.profiles.active=${ACTIVE_PROFILE} \
  -Dspring.datasource.url=${DB_URL} \
  ${JAR_NAME}

#ENTRYPOINT ["sh", "-c", "java -jar \
#    -Dspring.profiles.active=${ACTIVE_PROFILE} \
#    -Dspring.datasource.url=${DB_URL} \
#    ${JAR_NAME}"]