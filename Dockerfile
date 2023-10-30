FROM node:20

WORKDIR /app

COPY ./packet-base/package.json /app/package.json

RUN yarn config set "strict-ssl" false -g
RUN yarn install

COPY ./packet-base /app/

EXPOSE 3000

CMD ["yarn", "run", "build"]