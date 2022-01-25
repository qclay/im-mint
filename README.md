# Getting Started

```js
yarn
```

## Notes
This repo is fully functional front end that talks to a test smart contract on Rinkeby with the address given in the file config.js.

After the smart contract is deployed to production, I will update the the config.js file with the production smart contract address and the contractAbi.json. 
Also I will need to update the whitelistHashedAddresses in the config.js once we collect the whitelist from people in Discord. 

The styling uses the library https://chakra-ui.com/.

It uses the library https://usedapp.readthedocs.io/en/latest/ to simplify making calls to Ethereum.

The work that is needed is to update the styling. There should be NO work on the logic of the web 3 calls. Although that may be hard to decouple, and thank you so much for helping to style.

If you have any questions at all, feel free to email me at phu@phungo.dev