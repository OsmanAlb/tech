FROM maven:3.8.4-openjdk-17 as builder
WORKDIR /app
#- создаем директорию app внутри слоя образа.
COPY . /app/.
#- копируем все наши папки с текущего проекта в папку app в слое образа.
# TODO перед сборкой копировать файлы с папки build в static
RUN mvn -f /app/pom.xml clean package -D  maven.test.skip=true
# - запускаем maven, который билдит наш проект и получаем jar-ник.
FROM eclipse-temurin:17-jre-alpine
#снова указываем на основании какого образа, мы будем запускать наш проект, здесь уже мы не используем jdk, а только jre - так как нам не нужны инструменты разработчика.
WORKDIR /app
# создаем директорию app в новом слое образа.
COPY --from=builder /app/target/*.jar /app/*.jar
#- копируем с предыдущего слоя с папки target наш jar-ник в папку app.
EXPOSE 8080
# - указываем на каком порту должен работать наш контейнер
ENTRYPOINT ["java", "-jar", "/app/*.jar"]
#- запускаем наше приложение в контейнере.