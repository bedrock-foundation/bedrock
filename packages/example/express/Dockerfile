FROM node:17.7.1

# make source directory
RUN mkdir /service

# change working directory
WORKDIR /service

# Register Env Vars
ARG ENVIRONMENT_NAME

# Copy package.json
COPY package.json package-lock.json ./

# Install Deps
RUN npm install

# copy source code -- we do this step after the last two for build caching reasons
# see link below
# https://christianfei.com/posts/Cache-speed-up-docker-node-modules/
COPY . /service


RUN npm run build
CMD npm run start