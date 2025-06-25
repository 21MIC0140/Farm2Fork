import { useEffect, useState } from "react";
import { ethers } from "ethers";
import FarmTokenArtifact from "../contracts/FarmToken.json";

const CONTRACT_ADDRESS = "0xFB7Cb1ba0A2969F637d011F2FCe8947DEB98d0dC"; // Update if redeployed

export function useFarmToken() {
  const [contract, setContract] = useState<ethers.Contract | null>(null);
  const [account, setAccount] = useState<string | null>(null);
  const [provider, setProvider] = useState<ethers.BrowserProvider | null>(null);

  useEffect(() => {
    const init = async () => {
      if (window.ethereum) {
        await window.ethereum.request({ method: "eth_requestAccounts" });
        const provider = new ethers.BrowserProvider(window.ethereum);
        setProvider(provider);
        const signer = await provider.getSigner();
        setAccount(await signer.getAddress());
        const farmToken = new ethers.Contract(
          CONTRACT_ADDRESS,
          FarmTokenArtifact.abi,
          signer
        );
        setContract(farmToken);
      }
    };
    init();
  }, []);

  return { contract, account, provider };
} 