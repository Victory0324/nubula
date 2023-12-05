# CMS

[Sanity](https://www.sanity.io) is used as the CMS. We embed the sanity dashboard at `/studio`.  From there you can log into sanity and update content. 

On Development we don't cache any requests and so your updates to the CMS content will be availble on next load. However on preview & production environments we cache the requests. This cache will need to be invalidated via a webhook which you can setup according to [this article](https://www.stackfive.io/work/nextjs/how-to-use-on-demand-isr-with-next-js-and-sanity). The webhook will call our `/api/cms/[tag]/route.ts`.

We will have the webhooks setup for [dev](https://nebula-git-dev-pixelynx.vercel.app) & [prod](http://play.korus.co). But you may want to set them up for your specific preview URL if you are working with the CMS.

If you want to develop locally and update CMS data, you can use the `NEXT_PUBLIC_SANITY_DEBUG=1` envar. This will tell next.js not to use its cache for sanity api requests and so you'll always get live data without the webhook invalidation.

## Adding a new document type

Add a new schema to `src/app/utils/schema.ts`. It will then be visible in the sanity `/studio`.

