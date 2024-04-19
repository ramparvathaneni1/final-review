# Use the postgres image as the base for your Docker container.
FROM postgres

# Set the environment variable POSTGRES_PASSWORD to "docker" for the database superuser password.
ENV POSTGRES_PASSWORD docker

# Set the environment variable POSTGRES_DB to "todo_app_db" to specify the default database name.
ENV POSTGRES_DB todo_app_db

# Copy the todo.sql file into the /docker-entrypoint-initdb.d/ directory inside the container to execute custom initialization scripts.
COPY todo.sql /docker-entrypoint-initdb.d/
