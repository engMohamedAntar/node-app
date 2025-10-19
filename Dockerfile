# Dockerfile
FROM node:22.17.0
WORKDIR /node-app
COPY package.json .

ARG NODE_ENV
RUN if [ "$NODE_ENV" = "development" ]; \
    then npm install; \
    else npm install --only=production; \
    fi

COPY . .
CMD ["npm" , "run", "start:dev"]
