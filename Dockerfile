FROM node:16-alpine 

ENV MONGO_DB_USERNAME=skolsic993 \
    MONGO_DB_PWD=Favorite93!

WORKDIR /src

COPY package*.json ./  

RUN npm install 

COPY . . 

EXPOSE 8080 

CMD [ "npm", "start" ]