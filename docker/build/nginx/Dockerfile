FROM nginx

# make sure apt is up to date
RUN apt-get update && apt-get upgrade -y

# install
RUN apt-get install -y nginx-extras curl

COPY custom_404.html /usr/share/nginx/html/custom_404.html

COPY nginx.conf /etc/nginx/nginx.conf
COPY pg.local.conf /etc/nginx/sites-available/default
RUN rm /etc/nginx/conf.d/default.conf

RUN echo "Asia/Jakarta" | tee /etc/timezone
RUN rm /etc/localtime
RUN dpkg-reconfigure --frontend noninteractive tzdata
