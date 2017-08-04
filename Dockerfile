FROM node:7.10.1
# RUN apt-get update
# RUN apt-get install -y less
# RUN curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.29.0/install.sh | bash
# ENV NVM_DIR=/root/.nvm
# ENV SHIPPABLE_NODE_VERSION=v7.10.1
# RUN . $HOME/.nvm/nvm.sh && nvm install $SHIPPABLE_NODE_VERSION \ 
#     && nvm alias default $SHIPPABLE_NODE_VERSION \
#     && nvm use default \
#     && node --version

# ENV NODE_PATH $NVM_DIR/v$SHIPPABLE_NODE_VERSION/lib/node_modules
# ENV PATH      $NVM_DIR/v$SHIPPABLE_NODE_VERSION/bin:$PATH

WORKDIR /usr/src/app

COPY package.json .
RUN npm install

COPY . .

EXPOSE  8080

CMD ["npm", "start"]