FROM nginx:alpine

# remove default nginx page
RUN rm -rf /usr/share/nginx/html/*

# copy your app
COPY . /usr/share/nginx/html

# expose port
EXPOSE 80

# run nginx in foreground
CMD ["nginx", "-g", "daemon off;"]