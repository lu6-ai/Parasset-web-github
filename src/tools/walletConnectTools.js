import WalletConnect from "@walletconnect/client";
import QRCodeModal from "@walletconnect/qrcode-modal";
import store from "../store";
import Web3 from "web3";
import WalletConnectProvider from "@walletconnect/web3-provider";
import {infuraId} from '../config'
import {initParams} from "./chain";

/*
* 针对 walletconnect 环境需要手动注入web3
* */
const enableWeb3 = () => {
  // add web3
  //  Create WalletConnect Provider
  const provider = new WalletConnectProvider({
    infuraId: infuraId,
  });

//  Enable session (triggers QR Code modal)
  provider.enable();
  window.globalWeb3 = new Web3(provider);
}

/*
* 连接connectWallet
* */
const connectWallet = async () => {
  await enableWeb3();
  // Create a connector
  const connector = new WalletConnect({
    bridge: "https://bridge.walletconnect.org", // Required
    qrcodeModal: QRCodeModal,
  });

  // 每次退出后都杀掉session重新获取二维码
  if (!connector.connected) {
    // create new session
    await connector.createSession();
  } else {
    await connector.killSession();
    await connector.createSession();
  }
// Check if connection is already established
//   if (!connector.connected) {
//     // create new session
//     connector.createSession();
//   } else {
//     // 钱包已经授权，直接获取账号
//     const accounts = await window.globalWeb3.eth.getAccounts();
//     store.commit("setState", {
//       accounts,
//       connectType: 1
//     });
//   }

// Subscribe to connection events
  connector.on("connect", async (error, payload) => {
    if (error) {
      throw error;
    }

    QRCodeModal.close();
    // Get provided accounts and chainId
    const { accounts, chainId } = payload.params[0];
    store.commit("setState", {
      accounts,
      connectType: 1
    });
    localStorage.setItem('accounts',accounts[0]);
    await initParams();
    await store.dispatch("initData");
  });

  connector.on("session_update", async (error, payload) => {
    if (error) {
      throw error;
    }

    // Get updated accounts and chainId
    const { accounts, chainId } = payload.params[0];
    store.commit("setState", {
      accounts,
      connectType: 1
    });
    localStorage.setItem('accounts',accounts[0]);
    await initParams();
    await store.dispatch("initData");
  });

  connector.on("disconnect", (error) => {
    if (error) {
      throw error;
    }

    // Delete connector
  });

}

/*
* 连接metaMask
* */
const initMetaMask = () => {
  return new Promise((resolve, reject) => {

    if (window.ethereum) {
      const ethereum = window.ethereum;
      window.globalWeb3 = new Web3(ethereum);
      ethereum.request({method: 'eth_requestAccounts'}).then((accounts) => {
        resolve(accounts);
      }).catch(() => {
        reject('User denied account access...');
      });
    } else {
      reject('Please install MetaMask!');
    }

  });
}

const connectMetaMask = async () => {
  let accounts = [];
  if (window.ethereum) {
    await initMetaMask();
    accounts = window.globalWeb3.eth.accounts
  }
  if (!accounts || !accounts[0]) {
    accounts = await initMetaMask();
  }
  if (accounts.length === 0) {
    throw new Error('no accounts');
  }
  store.commit("setState", {
    accounts,
    connectType: 0,
  });
  localStorage.setItem('accounts',accounts[0]);
}



export {
  connectWallet,
  connectMetaMask
}
