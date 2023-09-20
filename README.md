# StarknetKit's Template

Taking your dapp from development to production should be easy! To simplify your development process, we introduce the `create-starknetkit-app` Template.

This Template uses Nextjs and Starknetkit, with an option to bootstrap with starknet-react.

## Getting Started
To spin up a starknet dapp using `create-starknetkit-app`, run:
```js
npx create-starknetkit-app [app-name]
```
where `app-name` should be the project name.

This command spins up a basic starknetkit project, with the default connection options.

## StarknetKit + Starknet-react
We also provide a template that includes starknet-react by default. To spin this up:
```bash
npx create-starknetkit-app [app-name] starknet-react
```

### Running your dApp
After installation, change your directory and run your app:
```bash
cd my-app
npm run dev
```

<img width='100%' src="./public/template.png" />