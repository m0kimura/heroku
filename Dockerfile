FROM m0kimura/ubuntu-base

ARG user=${user:-docker}
RUN npm install -g heroku-cli

##  USER
ENV HOME=/home/${user} USER=${user}
WORKDIR $HOME
USER $USER
##
ADD ./parts/project ./project
ADD ./parts/heroku-init /usr/bin/heroku-init
ADD ./parts/heroku-update /usr/bin/heroku-update
ADD starter.sh /usr/bin/starter.sh
CMD starter.sh
