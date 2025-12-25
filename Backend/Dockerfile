FROM node:20

RUN npm i serverless -g
RUN apt-get -y update
RUN apt-get -y install git

WORKDIR /project

COPY package*.json ./
# RUN chmod +x ./localstack-init.sh
RUN npm install

COPY . .
# Start the application using nodemon for hot reloading
CMD ["npx", "nodemon", "--legacy-watch", "--exec", "sls", "offline", "--host", "0.0.0.0"]