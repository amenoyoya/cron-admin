# cron-admin

⚡ Cron scheduling Management Web application ⚡

## Environment

- Shell: bash
- Node.js: `12.18.2`
    - Yarn package manager: `1.22.4`

### Setup
```bash
# install node_modules
$ yarn

# create .env
$ cp .env.default .env

# edit .env file for setting up environments
$ vim .env

# [development] start development server
## frontend(nuxt): http://localhost:3000
## backend(express): http://localhost:3333
## maildev:
##   - smtp: tcp://localhost:3025
##   - admin: http://localhost:3080
$ yarn start
```
