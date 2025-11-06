FROM --platform=linux/arm64 jekyll/jekyll:latest

WORKDIR /srv/jekyll

EXPOSE 4000 35729

CMD bundle install && bundle exec jekyll serve --host 0.0.0.0 --port 4000 --livereload --force_polling
