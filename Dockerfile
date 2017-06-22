FROM node:6

RUN mkdir /etc/tuyyo-dashboard


COPY $PWD/static /etc/tuyyo-dashboard/static
COPY $PWD/config /etc/tuyyo-dashboard/config
COPY $PWD/build /etc/tuyyo-dashboard/build
COPY $PWD/test /etc/tuyyo-dashboard/test
COPY $PWD/src /etc/tuyyo-dashboard/src

COPY $PWD/.babelrc .eslintrc.js .postcssrc.js index.html .eslintignore package.json test.html /etc/tuyyo-dashboard/

