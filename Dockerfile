FROM node:4

ENV DEBIAN_FRONTEND noninteractive

RUN apt-get update && \
    apt-get -y install locales \
    sudo \
    curl \
    lib32z1 \
    lib32ncurses5 \
    libbz2-1.0 \
    lib32stdc++6 \
    g++ \
    software-properties-common \
    python-software-properties && \
    apt-get -y clean && \
    rm -rf /var/lib/apt/lists/*


RUN echo "%sudo ALL=(ALL) NOPASSWD: ALL" >> /etc/sudoers
RUN useradd -u 1000 -G users,sudo -d /usr/src/app --shell /bin/bash -m user     
RUN PASS=$(openssl rand -base64 32) && echo "$PASS\n$PASS" | passwd user
USER user


RUN sudo npm install -g npm@latest
RUN sudo npm install --unsafe-perm -g grunt
RUN sudo npm install --unsafe-perm -g bower

RUN sudo chmod 2775 /usr/src/app
WORKDIR /usr/src/app

ADD . /usr/src/app
ONBUILD npm install
ONBUILD bower install

EXPOSE 3001 11301
CMD [ "grunt", "serve" ]