ARG NODE_VERSION=21.1.0
FROM node:${NODE_VERSION}-alpine

WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH

COPY package.json ./
COPY package-lock.json ./

RUN npm ci --silent
# RUN npm install --silent
RUN npm install react-scripts@5.0.1 -g --silent

COPY . ./

EXPOSE 3000

CMD ["npm", "start"]
