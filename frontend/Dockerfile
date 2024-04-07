FROM node:18.17


# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install app dependencies
COPY package.json ./
#COPY package-lock.json ./

RUN npm config set update-notifier false
RUN npm install
RUN npm update

# add app
COPY . .

# start app
RUN npm run build
CMD npm run start