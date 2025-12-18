---
title: Review Notes
description: "Review Notes: app positioning, testing steps, and permission explanations."
---

## 1. App Positioning

This app is an "offline cold wallet" used to generate/save mnemonic phrases locally on the device and perform offline transaction signatures.  
The app **does not provide trading/exchange services** or fiat-related features; it does not require registration/login; it does not collect personal identity information; and it has no network access by default.

## 2. Testing Steps (No Account Required)

1. Open the App → Select "Create Wallet" or "Import Wallet"
2. Enter the wallet home page → Click "Receive" to view the address and QR code
3. Click "Sign Transaction"
   - You can select "Manual Input" mode for testing
   - Enter any test address and amount to generate a signature result (after signing, a QR code will be generated for the other hot wallet to scan and broadcast)

> Note: This app is only responsible for offline signing, not on-chain broadcasting; on-chain broadcasting is completed by users in a networked environment.

## 3. Permission Explanations

- Camera Permission: Used to scan QR codes (address input, importing unsigned transactions, displaying signature results).
- Face ID: Used to enable biometric unlock (optional). Biometric verification is handled by the system; the app does not save any biometric information.

## 4. Additional Notes (Optional)

If reviewers wish to verify "cold/hot wallet QR code interaction," they can use your provided hot wallet app or any QR code generator to generate unsigned transaction QR codes that comply with the protocol (if you have a fixed protocol format, please supplement examples here).

