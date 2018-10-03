FROM node:8-alpine
WORKDIR /var/app
COPY ./ /var/app/
RUN npm install
RUN npm run build
EXPOSE 80:80
EXPOSE 443:443
EXPOSE 4000:4000
CMD [ "node", "server.js" ]
