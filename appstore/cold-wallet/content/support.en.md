---
title: Support & Contact
description: "Support & Contact: customer service email, FAQs, and instructions."
---

## Contact Us

Customer Service Email: **guanyuhao666@gmail.com**  
Website: **https://app-review.guanyuhao666.workers.dev**

## Frequently Asked Questions

### Is this an exchange/trading feature?

No. This app is only for locally generating/saving mnemonic phrases and performing offline signatures. It does not provide trading/exchange services.

### Will mnemonic phrases/private keys be uploaded?

No. Mnemonic phrases/private keys are only encrypted and stored locally on your device.

### Why is camera permission needed?

Used to scan QR codes to import unsigned transactions/addresses, and to display signature result QR codes for the other end to scan.

## Reviewer Testing Instructions

This app is an "offline cold wallet" used to generate/save mnemonic phrases locally on the device and perform offline transaction signatures. The app does not provide trading/exchange services or fiat-related features; it does not require registration/login; it does not collect personal identity information; and it has no network access by default.

Testing Steps:

1. Open the App → Select "Create Wallet" or "Import Wallet"
2. Enter the wallet home page → Click "Receive" to view the address and QR code
3. Click "Sign Transaction" → Select "Manual Input" mode → Enter any test address and amount to generate a signature result (after signing, a QR code will be generated for the other hot wallet to scan and broadcast)

Note: This app is only responsible for offline signing, not on-chain broadcasting; on-chain broadcasting is completed by users in a networked environment.

