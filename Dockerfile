FROM node:16-alpine as base
WORKDIR /app
COPY . .
ARG APP_PORT
EXPOSE ${APP_PORT}
RUN yarn && yarn global add @nestjs/cli

FROM base as production
RUN yarn global add pm2 && yarn build
CMD ["pm2-runtime", "start", "pm2.config.js", "--env", "production"]

FROM base as development
CMD ["yarn start:dev"]
