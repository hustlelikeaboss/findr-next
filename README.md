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

# Remove local database
docker-compose down
```

#### Explore database

1. Visit http://localhost:8080 in your browser; or
2. In your shell, run

```bash
PGPASSWORD=findr psql -h localhost -p 5436 -d findr -U findr
```

### Stripe Integration

You will need a Stripe account ([register](https://dashboard.stripe.com/register)) to run this sample. Go to the Stripe [developer dashboard](https://stripe.com/docs/development/quickstart#api-keys) to find your API keys and replace them in the `.env.local` file.

```bash
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=<replace-with-your-publishable-key>
STRIPE_SECRET_KEY=<replace-with-your-secret-key>
```

#### Create Subscriptions

```
stripe products create --name="Genin" --description="- 10 searches a month"

stripe products create --name="Chuunin" --description="- Unlimited searches"

stripe products create --name="Jounin" --description="- Unlimited searches; -Template identification based on computer vision; - Personal library with favorites, categories, tags, and notes"
```

Create the price for the premium product, passing the product ID from the responses above:

```
stripe prices create \
  -d product=prod_J9ZUWv8N1dF4Nl \
  -d unit_amount=0 \
  -d currency=usd \
  -d "recurring[interval]"=month

stripe prices create \
  -d product=prod_J7FTksGCKP8OiV \
  -d unit_amount=299 \
  -d currency=usd \
  -d "recurring[interval]"=month

stripe prices create \
  -d product=prod_J7FUBVhNGWQfmk \
  -d unit_amount=599 \
  -d currency=usd \
  -d "recurring[interval]"=month
```

#### Test Cards

Use `4242424242424242` as a test card number with any CVC + future expiration date. Use the `4000000000003220` test card number to trigger a 3D Secure challenge flow.

#### Forward webhooks to your local dev server

First [install the CLI](https://stripe.com/docs/stripe-cli) and [link your Stripe account](https://stripe.com/docs/stripe-cli#link-account).

Next, start the webhook forwarding:

```bash
stripe listen --forward-to localhost:3000/api/stripe/webhooks
```

The CLI will print a webhook secret key to the console. Set `STRIPE_WEBHOOK_SECRET` to this value in your `.env.local` file.

#### Setting up a live webhook endpoint

After deploying, copy the deployment URL with the webhook path (`https://your-url.now.sh/api/webhooks`) and create a live webhook endpoint [in your Stripe dashboard](https://stripe.com/docs/webhooks/setup#configure-webhook-settings).

Once created, you can click to reveal your webhook's signing secret. Copy the webhook secret (`whsec_***`) and add it as a new environment variable in your [Vercel Dashboard](https://vercel.com/dashboard):

- Select your newly created project.
- Navigate to the Settings tab.
- In the general settings scroll to the "Environment Variables" section.

After adding an environment variable you will need to rebuild your project for it to become within your code. Within your project Dashboard, navigate to the "Deployments" tab, select the most recent deployment, click the overflow menu button (next to the "Visit" button) and select "Redeploy".
