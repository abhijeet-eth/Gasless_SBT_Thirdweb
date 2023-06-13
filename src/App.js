import { create as ipfsHttpClient } from "ipfs-http-client";
import {
  ThirdwebProvider,
  useContract,
  useContractWrite,
  ConnectWallet,
  Web3Button,
  useAddress,
} from "@thirdweb-dev/react";
import { mumbai } from "@thirdweb-dev/chains";

const projectId = "2JwnITRYL8qxpSsA0lp5yXRGk8m";
const projectSecretKey = "ad81c7eb6e7578e078eaed4994f5f2f6";
const authorization = "Basic " + btoa(projectId + ":" + projectSecretKey);
var ipfsPath;

export default function Component() {
  const addr = useAddress();
  console.log("addr =>", addr);

  const { contract } = useContract(
    "0xE267ee10D2E929b4Ed5D9C39186fc637F2a51c88"
  );
  const { mutateAsync: safeMint, isLoading } = useContractWrite(
    contract,
    "safeMint"
  );

  const ipfs = ipfsHttpClient({
    url: "https://ipfs.infura.io:5001/api/v0",
    headers: {
      authorization,
    },
  });

  const call = async (event) => {


    event.preventDefault();
    const form = event.target;
    const files = form[0].files;

    if (!files || files.length === 0) {
      return alert("No files selected");
    }

    const file = files[0];
    // upload files
    const result = await ipfs.add(file);
    const completeImagePath = `https://infura-ipfs.io/ipfs/${result.path}`;

    var metaData = {
      address: addr,
      name: "CG UK NFT Campaign",
      attributes: [
        {
          trait_type: "Batch",
          value: "First Batch",
        },
        {
          trait_type: "Organizer",
          value: "CG UK Invent Team",
        },
        {
          trait_type: "Partner",
          value: "CG Indian Invent Team",
        },
      ],
      image: completeImagePath,
    };

    const metaDataUri = JSON.stringify(metaData);
    console.log("metaDatUri ==> ", metaDataUri);

    const result2 = await ipfs.add(metaDataUri);
    // console.log("result2 ==>", result2)
    ipfsPath = `https://infura-ipfs.io/ipfs/${result2.path}`;
    console.log("Metadata URI ==>", ipfsPath);

    // try {
    //   const data = await safeMint({
    //     args: [addr, completeMetadataPath],
    //   });
    //   console.info("contract call successs", data);
    // } catch (err) {
    //   console.error("contract call failure", err);
    // }
  };

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
            Welcome to <a href="https://thirdweb.com/">Gasless Soulbound NFT Mint</a>!
          </h1>

          <div className="connect">
            <ConnectWallet
              dropdownPosition={{ side: "bottom", align: "center" }}
            />
          </div>
          {ipfs ? (
            <form class="form" onSubmit={call}>
              <label for="file-upload" class="custom-file-upload">
                Select File
              </label>
              <input id="file-upload" type="file" name="file" />
            
          <Web3Button 
            contractAddress="0xE267ee10D2E929b4Ed5D9C39186fc637F2a51c88"
            action={(contract) => {
              contract.call("safeMint", [addr, ipfsPath]);
            }}
          >
            safeMint
          </Web3Button>
          </form>
          ) : null}
        </main>
      </div>
    </ThirdwebProvider>
  );
}

//Goerli : 0x817cdDFEd708A7DD7efDc73fFad3cE4D1fD641EA
//Matic : 0xE267ee10D2E929b4Ed5D9C39186fc637F2a51c88
