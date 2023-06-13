import {
  ThirdwebProvider,
  useContract,
  useContractWrite,
  ConnectWallet,
  Web3Button,
  useAddress,
} from "@thirdweb-dev/react";
import { mumbai } from "@thirdweb-dev/chains";

export default function Component() {
  const { contract } = useContract(
    "0xE267ee10D2E929b4Ed5D9C39186fc637F2a51c88"
  );
  const { mutateAsync: safeMint, isLoading } = useContractWrite(
    contract,
    "safeMint"
  );

  const call = async () => {
    try {
      const data = await safeMint({
        args: ["0xE267ee10D2E929b4Ed5D9C39186fc637F2a51c88", "uri"],
      });
      console.info("contract call successs", data);
    } catch (err) {
      console.error("contract call failure", err);
    }
  };

  const addr = useAddress();
  console.log("addr =>", addr);
  return (
    <ThirdwebProvider
      activeChain="mumbai"
      sdkOptions={{
        gasless: {
          openzeppelin: {
            relayerUrl:
              // "https://api.defender.openzeppelin.com/autotasks/e6f7719a-712c-4c93-9f22-62e0d6e0d5b5/runs/webhook/27451ce7-6877-47eb-ae2b-629b3b6245d9/PHmCWc51UvwE5onLuGmHMd",
              "https://api.defender.openzeppelin.com/autotasks/c1539a75-a863-4692-a11b-47564440ab15/runs/webhook/27451ce7-6877-47eb-ae2b-629b3b6245d9/4cHRFMtC7qtkcz7ibufKB6",
          },
        },
      }}
    >
      <div className="container">
        {/* <Component /> */}
        <main className="main">
          <h1 className="title">
            Welcome to <a href="https://thirdweb.com/">NFT Capaiggn</a>!
          </h1>

          <div className="connect">
            <ConnectWallet
              dropdownPosition={{ side: "bottom", align: "center" }}
            />
          </div>
          <Web3Button
            contractAddress="0xE267ee10D2E929b4Ed5D9C39186fc637F2a51c88"
            action={(contract) => {
              contract.call("safeMint", [addr, "uri"]);
            }}
          >
            safeMint
          </Web3Button>
        </main>
      </div>
    </ThirdwebProvider>
  );
}

//Goerli : 0x817cdDFEd708A7DD7efDc73fFad3cE4D1fD641EA
//Matic : 0xE267ee10D2E929b4Ed5D9C39186fc637F2a51c88
