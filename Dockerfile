# Local dev image. Keep the Ruby minor in step with ci-cd.yml's ruby-version so
# the site previewed here is built by the same toolchain that builds production.
FROM ruby:3.2-slim-bookworm

# ffi and eventmachine (which livereload runs on) ship no precompiled Linux
# gems, so the image needs a compiler.
RUN apt-get update \
    && apt-get install -y --no-install-recommends build-essential \
    && rm -rf /var/lib/apt/lists/*

# Gems install into GEM_HOME (/usr/local/bundle), outside the workdir, so the
# bind mount cannot shadow them. Frozen: the container must never rewrite the
# committed Gemfile.lock — see CLAUDE.md for the deliberate-update command.
ENV BUNDLE_FROZEN=true

WORKDIR /srv/jekyll

COPY Gemfile Gemfile.lock ./
RUN bundle install

EXPOSE 4000 35729

CMD ["bundle", "exec", "jekyll", "serve", \
     "--host", "0.0.0.0", "--port", "4000", \
     "--livereload", "--force_polling"]
