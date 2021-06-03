FROM node:14

# BACKEND
WORKDIR /usr/src/users-app/server

COPY server/package.json .
COPY server/server.js .
COPY server/api.js .
COPY server/model.js .
#COPY server/routes/. /usr/src/users-app/server/routes
RUN npm install

# FRONTEND
WORKDIR /usr/src/users-app/app

COPY app/public/. /usr/src/users-app/app/public
COPY app/package.json /usr/src/users-app/app
COPY app/vite.config.js /usr/src/users-app/app
COPY app/index.html /usr/src/users-app/app
COPY app/src/. /usr/src/users-app/app/src

RUN npm install
RUN npm run build


WORKDIR /usr/src/users-app/server

EXPOSE 4004

CMD node server.js
