FROM node:16-alpine 

WORKDIR /src

COPY package*.json ./  

RUN npm install 

ENV MONGO_DB_USERNAME=skolsic993 \
    MONGO_DB_PWD=Favorite93!

COPY . . 

EXPOSE 8080 

CMD [ "npm", "start" ]