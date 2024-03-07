# Step 1: Use an official Node.js image as the base image
FROM node:alpine as build

# Step 2: Set the working directory inside the container
WORKDIR /app

# Step 3: Copy package.json and package-lock.json (or yarn.lock) to the working directory
COPY package*.json ./

# Step 4: Install dependencies
RUN npm install --force

# Step 5: Copy the rest of your application's code to the working directory
COPY . .

# Step 6: Build your React application
RUN npm run build

# Step 7: Use an official Nginx image to serve the built application
FROM nginx:alpine

# Step 8: Copy the build artifacts from the build stage to the Nginx serve directory
COPY --from=build /app/build /usr/share/nginx/html

# Step 9: Expose port 80 to the Docker host, so we can access the container
EXPOSE 80

# Step 10: Start Nginx and serve the application
CMD ["nginx", "-g", "daemon off;"]
