FROM node:alpine

WORKDIR /app

COPY package.json .
COPY package-lock.json .
COPY . .

# RUN npm install --legacy-peer-dep
RUN npm config set legacy-peer-deps true
RUN npm install

CMD ["npm", "start"]

