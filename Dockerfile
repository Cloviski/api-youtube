FROM node:20.11.1

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

ENV SECRET=$SECRET \
    USER_DATABASE=$USER_DATABASE \
    PASSWORD_DATABASE=$PASSWORD_DATABASE \
    DATABASE=$DATABASE \
    HOST_DATABASE=$HOST_DATABASE \
    PORT_DATABASE=$PORT_DATABASE

EXPOSE 4000

CMD [ "npm", "start" ]