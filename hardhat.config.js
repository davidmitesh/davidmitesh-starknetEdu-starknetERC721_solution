require("@shardlabs/starknet-hardhat-plugin");

module.exports = {
  starknet: {
    venv: "active",
    network: "alpha-goerli", // change to "alpha-mainnet" for mainnet
    wallets: {
      Argent: {
        accountName: "ArgentAccount",
        modulePath:
          "starkware.starknet.wallets.argent.ArgentAccount",
        accountPath: "/Users/miteshpandey/cairo_programs/StarkNet-NFT-Template/starknet-artifacts/account-contract-artifacts/ArgentAccount/0.2.1/ArgentAccount.cairo",
      },
    },
  },

};
