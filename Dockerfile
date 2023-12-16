FROM node:20

RUN apt-get update && apt-get install -y ca-certificates
RUN apt-get update && apt-get upgrade -y ca-certificates

WORKDIR /app

COPY ./packet-base/package.json /app/package.json

RUN yarn config set "strict-ssl" false -g
RUN yarn install

COPY ./packet-base /app/

EXPOSE 3000

CMD ["sh", "-c", "yarn run build && yarn start"]
