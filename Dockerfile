FROM node:5
MAINTAINER Francis Brito <fr.br94@gmail.com>

# Create application directory in container.
RUN mkdir /var/app

# cd /var/app
WORKDIR /var/app

# Copy host's current directory to container's application directory...
COPY . /var/app

# ... But remove `node_modules` since they might have native (compiled) bindings.
RUN rm -rf node_modules

# Install `npm` packages silently to avoid flooding the CLI output.
RUN npm i -s

# Install `gulp` globally (and silently).
RUN npm i -gs gulp

# Expose container's 3004 port to host.
EXPOSE 3004

# Command to be run by default.
CMD npm start
