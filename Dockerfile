FROM node:19.6.0
WORKDIR /app
COPY ./package*.json .
RUN npm cache clean --force
RUN npm install
COPY . .
EXPOSE 4500
CMD ["node","src/index.js"]

