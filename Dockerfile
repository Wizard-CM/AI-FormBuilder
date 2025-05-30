# Use official nodejs image as the base image
FROM node:22-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json & package-lock.json file for dependency installtion
COPY package*.json ./

# Install the app dependencies
RUN npm install

# Copy the rest of your application code
COPY . .

RUN npm install -g prisma
RUN npx prisma generate


# ARG NEXT_PUBLIC_BASE_URL

# ARG DATABASE_URL
# ARG DIRECT_URL

# ARG NEXTAUTH_URL
# ARG NEXTAUTH_SECRET

# ARG GOOGLE_CLIENT_ID 
# ARG GOOGLE_CLIENT_SECRET 
# ARG NEXT_PUBLIC_GOOGLE_AI_API_KEY 

# Set env variable during the build an runtime

# ENV NEXT_PUBLIC_BASE_URL=${NEXT_PUBLIC_BASE_URL}

# ENV DATABASE_URL=${DATABASE_URL}
# ENV DIRECT_URL=${DIRECT_URL}

# ENV NEXTAUTH_URL=${NEXTAUTH_URL}
# ENV NEXTAUTH_SECRET=${NEXTAUTH_SECRET}

# ENV GOOGLE_CLIENT_ID=${GOOGLE_CLIENT_ID}
# ENV GOOGLE_CLIENT_SECRET=${GOOGLE_CLIENT_SECRET}
# ENV NEXT_PUBLIC_GOOGLE_AI_API_KEY=${NEXT_PUBLIC_GOOGLE_AI_API_KEY}


# Build the nextjs app for production
RUN npm run build

# Expose port
EXPOSE 3000

CMD [ "npm", "start"]








