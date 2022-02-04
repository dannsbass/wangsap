FROM nikolaik/python-nodejs:latest

RUN apt-get update -y
RUN apt-get upgrade -y
RUN apt-get install nodejs -y && \
apt-get install -y \
imagemagick \
webp \
ffmpeg && \
rm -rf /var/lib/apt/list/*
WORKDIR /home/mybbg/app
COPY package.json .
RUN npm install
RUN npm install yt-search

COPY . .

CMD ["node", "index.js"]