# Start with the node:alpine image as the base for the Docker container.
FROM node:alpine

# Set /usr/src/app as the working directory within the container.
WORKDIR /usr/src/app

# Copy all project files into the container's working directory.
COPY . .

# Install project dependencies using npm install.
RUN npm install

# Make port 3001 available to the outside of the container.
EXPOSE 3001

# Configure the container to run the command npm run start to start the application.
CMD ["npm", "run", "start"]