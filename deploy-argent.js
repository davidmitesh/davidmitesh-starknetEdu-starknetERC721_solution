const starknet = require("hardhat").starknet;
// import { ArgentAccount } from "hardhat/types/runtime";
// import { TIMEOUT } from "../test/constants";
// import { ensureEnvVar, expectAddressEquality } from "../test/util";

async function deployLogAccount() {

    const account = await starknet.deployAccount(
        "Argent",
        {
            salt: "0x42",
            privateKey: "0x041FB4E148DBF5C20015E132DF25E7F93B60383FA94A8357B31127AF30CCBC11",
        }
    );

    const expectedAddress = "0x0344eA2e3FD35431fff40151e6ae95002A9E62B3F559B8e769e4C865d47d1d1D";
    // expectAddressEquality(account.address, expectedAddress);

    // initializing Argent account requires invoking `initialize` with a funded account
    // const fundedAccount = await hardhat.starknet.getAccountFromAddress(
    //     ensureEnvVar("OZ_ACCOUNT_ADDRESS"),
    //     ensureEnvVar("OZ_ACCOUNT_PRIVATE_KEY"),
    //     "OpenZeppelin"
    // );
    const starknetAccount = await starknet.getAccountFromAddress("0x0344eA2e3FD35431fff40151e6ae95002A9E62B3F559B8e769e4C865d47d1d1D", "0x041FB4E148DBF5C20015E132DF25E7F93B60383FA94A8357B31127AF30CCBC11", "Argent");
    await account.initialize({ starknetAccount, maxFee: 1e18 });
}
deployLogAccount()
    .then(() => process.exit(0))
    .catch((err) => console.log(err)); ``