## Getting Started

First, install dependencies:

```bash
yarn
```

then, run the development server :)

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000).

## Deploy on Vercel

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## Formatting

### To format

```
yarn fmt
```

### To check formating

```
yarn fmt:check
```

## TS typechecking

### To check types
```
yarn types:check 
```


## Adding svgs

Copy the svg from figma. 

Create a file with eg `Example.svg` and paste the svg.

Then run `yarn svg`. This will cleanup the svg and convert it to a react component `Example.tsx`.


## Adding slots

There is a bug in next.js where new slots are not registered with an existing cache. So if you add a new slot file `@my-slot/xyz`. Make sure to remove the `.next`, you slot will then be loaded next time you load the page, live reloading etc works after that it's just required for the initial registration.
