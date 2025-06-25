import React, { useEffect, useState } from "react";
import { useFarmToken } from "../services/useFarmToken";

export default function TokenBalance() {
  const { contract, account } = useFarmToken();
  const [balance, setBalance] = useState<string>("");

  useEffect(() => {
    const fetchBalance = async () => {
      if (contract && account) {
        const bal = await contract.balanceOf(account);
        setBalance(bal.toString());
      }
    };
    fetchBalance();
  }, [contract, account]);

  if (!account) return <div>Connect your wallet</div>;
  return <div>Your FARM balance: {balance}</div>;
} 