# aistomin.com

Andrej Istomin's personal website, built with Jekyll. Visit at https://aistomin.com

## About

This is where I write about things that interest me - mostly technology, innovation, and the occasional random thought. Sometimes I post about my work and projects too.

## Local Development

### Recommended: Docker Setup

#### Prerequisites

- Docker Engine 18.06.0+ (includes Docker Compose)

#### Setup

1. Clone the repository:

   ```bash
   git clone git@github.com:aistomin/aistomin.com.git
   cd aistomin.com
   ```

2. Start the development server:

   ```bash
   ./start.sh
   ```

3. Open your browser and navigate to `http://localhost:4000`

The site will automatically rebuild when you make changes to the source files, and live reload is enabled!

**Note:** The `start.sh` script rebuilds the Docker image from scratch to ensure you always have the latest changes with no caching issues.

### Alternative: Traditional Ruby Setup

#### Prerequisites

- Ruby 2.7 or newer
- Bundler gem

#### Setup

1. Clone the repository:

   ```bash
   git clone git@github.com:aistomin/aistomin.com.git
   cd aistomin.com
   ```

2. Install dependencies:

   ```bash
   bundle install
   ```

3. Start the development server:

   ```bash
   bundle exec jekyll serve
   ```

4. Open your browser and navigate to `http://localhost:4000`

The site will automatically rebuild when you make changes to the source files.

## Built With

- [Jekyll](https://jekyllrb.com/) - Static site generator
- [Bundler](https://bundler.io/) - Dependency management
