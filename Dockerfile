FROM node:19.6.0
WORKDIR /app
COPY ./package*.json .
RUN npm cache clean --force
RUN npm install
COPY . .
EXPOSE 4000
CMD ["node","index.js"]

