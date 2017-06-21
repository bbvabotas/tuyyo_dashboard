FROM node:6

RUN mkdir /etc/tuyyo-dashboard

COPY $PWD/src /etc/tuyyo-dashboard/
COPY $PWD/static /etc/tuyyo-dashboard/
COPY $PWD/config /etc/tuyyo-dashboard/
COPY $PWD/build /etc/tuyyo-dashboard/
COPY $PWD/test /etc/tuyyo-dashboard/
COPY $PWD/.babelrc .eslintrc.js .postcssrc.js index.html .eslintignore package.json test.html /etc/tuyyo-dashboard/

