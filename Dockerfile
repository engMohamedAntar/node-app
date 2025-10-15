# Dockerfile

FROM node:22.17.0 as base

FROM base as development
WORKDIR /node-app
COPY package.json .
RUN npm install
COPY . .
CMD ["npm" , "run", "start:dev"]

FROM base as production
WORKDIR /node-app
COPY package.json .
RUN npm install --only= production
COPY . .
CMD ["npm", "start"]
