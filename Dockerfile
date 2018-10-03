FROM node:8-alpine
WORKDIR /var/app
COPY ./ /var/app/
RUN npm install
RUN npm run build
EXPOSE 8080
CMD [ "node", "server.js" ]