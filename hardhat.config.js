require("@shardlabs/starknet-hardhat-plugin");

module.exports = {
  starknet: {
    venv: "active",
    // venv: " ~/cairo_venv",
    network: "alpha-goerli", // change to "alpha-mainnet" for mainnet
    wallets: {
      Argent: {
        accountName: "ArgentAccount",
        modulePath:
          "starkware.starknet.wallets.argent.ArgentAccount",
        accountPath: "~/.starknet_accounts",
      },
    },
  },

};
