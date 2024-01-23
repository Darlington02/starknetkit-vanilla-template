"use client"
import React from 'react'
import styles from "./connect.module.css"
import { useEffect, useState } from 'react'
import { connect, disconnect } from "starknetkit"

function Connect() {
  const [connection, setConnection] = useState('');
  const [account, setAccount] = useState('');
  const [address, setAddress] = useState('');

  useEffect(() => {
    const connectToStarknet = async() => {
        const { wallet } = await connect( { modalMode: "neverAsk", webWalletUrl: "https://web.argent.xyz" } )

        if (wallet && wallet.isConnected) {
            setConnection(wallet)
            setAccount(wallet.account)
            setAddress(wallet.selectedAddress)
        }
        connectToStarknet()
    }
  }, [])

  const connectWallet = async() => {
    const { wallet } = await connect( { webWalletUrl: "https://web.argent.xyz" } )

    if(wallet && wallet.isConnected) {
        setConnection(wallet)
        setAccount(wallet.account)
        setAddress(wallet.selectedAddress)
    }
  }

  const disconnectWallet = async() => {
    await disconnect()
    setConnection(undefined)
    setAccount(undefined)
    setAddress('')
   }

  return (
    <div>
        {
          !connection ? 
            <button className={styles.connectbtn} onClick={connectWallet}>Connect</button>
          : 
            <button className={styles.connectbtn} onDoubleClick={disconnectWallet}>{address.slice(0, 5)}...{address.slice(60, 66)}</button>
        }
    </div>
  )
}

export default Connect