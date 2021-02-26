# findr

## Deploy your own

Deploy using [Vercel](https://vercel.com?utm_source=github&utm_medium=readme&utm_campaign=next-example):

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/git/external?repository-url=https://https://github.com/hustlelikeaboss/findr-next&project-name=findr-next&repository-name=findr-next)

## Local Development

### Database

#### Setup

```bash
# Init local database
docker-compose up -d

# Run migrations
PGPASSWORD=findr psql -h localhost -p 5436 -d findr -U findr < ./.migrations/001-init.psql

# Remove local database
docker-compose down
```

#### Explore database

1. Visit http://localhost:8080 in your browser; or
2. In your shell, run

```bash
PGPASSWORD=findr psql -h localhost -p 5436 -d findr -U findr
```
