# Use the official Jekyll image as base
FROM --platform=linux/arm64 jekyll/jekyll:latest

# Set the working directory
WORKDIR /srv/jekyll

# Copy Gemfile only (we'll regenerate the lockfile)
COPY Gemfile ./

# Install dependencies and regenerate lockfile
RUN bundle install

# Copy the rest of the site
COPY . .

# Expose the port Jekyll runs on
EXPOSE 4000

# Start Jekyll server
CMD ["jekyll", "serve", "--host", "0.0.0.0", "--port", "4000", "--livereload"]
