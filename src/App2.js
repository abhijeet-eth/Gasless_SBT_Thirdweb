import {
  ThirdwebProvider,
  useContract,
  useContractWrite,
  ConnectWallet,
  useAddress,
  Web3Button,
} from "@thirdweb-dev/react";
import "./styles/Home.css";

export default function Home() {

  const addr = useAddress();

  return (
    <ThirdwebProvider activeChain="goerli">
      <div className="container">
        {/* <Component /> */}
        <main className="main">
          <h1 className="title">
            Welcome to <a href="https://thirdweb.com/">NFT Capaign</a>!
          </h1>

          <div className="connect">
            <ConnectWallet
              dropdownPosition={{ side: "bottom", align: "center" }}
            />
          </div>
          <Web3Button
            contractAddress={"0x858d2Cf70cEE8A77B62bbDc3955eF524CCc02D92"}
            // action = {(contract) => contract.erc721.claim(addr,0)}
            action={(contract) => contract.erc721.mint(addr, 0)}
            // action = {(contract) => contract.erc721.mintTo(addr,0)}
            // action = {(contract) => contract.erc721.safeMint(addr,0)}
          >
            {" "}
            Mint{" "}
          </Web3Button>
        </main>
      </div>
    </ThirdwebProvider>
  );
}
