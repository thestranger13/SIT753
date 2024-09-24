# Use Node.js image as a base image
FROM node:18

# Set the working directory inside the container
WORKDIR /usr/src/vehiclechecker

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install the application dependencies
RUN npm install

# Copy the rest of your application code to the working directory
COPY . .

# Expose the port the app runs which is 3000 in this case
EXPOSE 3000

# Command to run your application
CMD ["node", "server.js"]
