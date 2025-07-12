# Employee Directory Web Application

## Setup and Run Instructions

1. Ensure you have the following installed:
   - Java JDK 17 or higher
   - Maven
   - VS Code (recommended for development)

2. Open the project folder in Visual Studio Code.

3. Build the project using the terminal:
   mvn clean install

4. Run the application using:
   mvn spring-boot:run

5. Once the application starts, open your browser and go to:
   http://localhost:8080/

## Project Structure Overview

The project follows a standard Spring Boot layout:

- pom.xml - Maven build file
- src/
  - main/
    - java/
      - com/rama/springboot/htmlui/
        - HtmlUiApplication.java (main class to run the application)
    - resources/
      - templates/
        - index.ftlh (Freemarker HTML template)
      - static/
        - css/
          - style.css (styles for UI)
        - js/
          - script.js (JavaScript logic)

The application starts a local web server and serves the Employee Directory UI. The UI includes filtering, searching, and form handling, designed using HTML, CSS, and JavaScript.

## Reflection

### Challenges Faced:
- Adjusting the static file paths to work properly with Freemarker and Spring Boot
- Ensuring responsiveness and user experience using only basic HTML and CSS
- Integrating dynamic sorting, filtering, and pagination purely on the frontend without backend data persistence

### Improvements If Given More Time:
- Add a database and backend CRUD functionality using Spring Data JPA
- Support image upload and display employee profile pictures
- Implement server-side validation and store employee records persistently
- Improve accessibility and cross-browser compatibility
- Add unit tests and basic CI/CD setup

This project provides a solid frontend and serves as a good base to evolve into a full-stack application.
