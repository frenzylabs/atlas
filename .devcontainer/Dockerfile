
FROM frenzylab/devcontainer

RUN apt-get --allow-releaseinfo-change update && apt-get install -y \
  pkg-config \
  npm \
  python3-pip \
  && npm install yarn --global

RUN yarn global add nodemon

RUN pip3 install pipenv
RUN curl https://cli-assets.heroku.com/install-ubuntu.sh | sh


# # Install nvm with node and npm

ENV NVM_DIR /root/.nvm
ENV NODE_VERSION 16.14.0
ARG NVM_VERSION=0.36.0

RUN curl https://raw.githubusercontent.com/creationix/nvm/v${NVM_VERSION}/install.sh | bash \
  && . $NVM_DIR/nvm.sh \
  && nvm install $NODE_VERSION \
  && nvm alias default $NODE_VERSION \
  && nvm use default

ENV NODE_PATH $NVM_DIR/versions/node/v$NODE_VERSION/lib/node_modules
ENV PATH      $NVM_DIR/versions/node/v$NODE_VERSION/bin:$PATH


RUN echo 'export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")"\n\
  [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"' \
  >> $HOME/.zshrc


WORKDIR /root

COPY . /root/atlas

