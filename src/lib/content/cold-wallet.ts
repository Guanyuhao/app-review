export const coldWalletContent = {
  appNameCn: "冷钱包",
  appNameEn: "Cold Wallet",
  tagline: "离线签名 · 多链支持",
  taglineEn: "Offline Signing · Multi-chain Support",
  promotionalText:
    "离线冷钱包：本地生成与加密存储助记词，通过二维码完成交易签名，私钥永不触网。",
  promotionalTextEn:
    "An offline cold wallet: generate and encrypt seed phrases locally, sign transactions via QR codes, and keep private keys offline.",
  description: [
    "冷钱包（Cold Wallet）是一款离线加密资产钱包工具，用于在设备本地生成/导入助记词、派生地址，并对交易进行离线签名。",
    "应用默认不提供网络访问能力，私钥与助记词仅在本地加密保存；冷/热钱包通过二维码进行安全交互。"
  ],
  descriptionEn: [
    "Cold Wallet is an offline crypto wallet utility for generating/importing seed phrases locally, deriving addresses, and signing transactions offline.",
    "Private keys and seed phrases are encrypted and stored on-device; the offline/online side interacts via QR codes."
  ],
  features: [
    "助记词生成与导入（本地）",
    "多链地址派生（如 ETH / BTC / SOL / BNB / TRON / KASPA）",
    "离线交易签名（二维码导入/手动输入）",
    "收款地址二维码展示",
    "可选的生物识别解锁（Face ID / Touch ID）"
  ],
  featuresEn: [
    "Generate/import seed phrases locally (on-device)",
    "Derive addresses for multiple chains (e.g. ETH / BTC / SOL / BNB / TRON / KASPA)",
    "Offline transaction signing (QR import / manual input)",
    "Receive address QR code display",
    "Optional biometric unlock (Face ID / Touch ID)"
  ],
  importantNotes: [
    "本应用不提供买卖/兑换/交易所服务，不提供法币相关功能",
    "本应用不要求注册登录，不进行广告追踪"
  ],
  importantNotesEn: [
    "This app does not provide buying/selling/exchange or exchange services, and does not provide fiat-related features",
    "No account registration required, and no ad tracking"
  ],
  support: {
    email: "guanyuhao666@gmail.com",
    website: "https://app-review.guanyuhao666.workers.dev"
  },
  privacy: {
    updatedAt: "2025-12-16",
    highlights: [
      "默认无网络访问；助记词/私钥仅在设备本地加密存储",
      "不进行广告追踪，不进行跨应用追踪",
      "不收集身份信息；不收集助记词/私钥；不收集交易记录"
    ],
    highlightsEn: [
      "Offline by default; seed phrases/private keys are encrypted and stored only on the device",
      "No ad tracking, no cross-app tracking",
      "No identity data collection; no seed phrase/private key collection; no transaction record collection"
    ],
    localStorageItems: [
      "助记词/钱包密钥材料（加密后存储在系统安全存储/应用数据目录中）",
      "应用设置（语言、主题、生物识别开关等）"
    ],
    localStorageItemsEn: [
      "Seed phrase / key material (encrypted and stored in system secure storage / app data directory)",
      "App settings (language, theme, biometric toggle, etc.)"
    ],
    permissions: [
      {
        name: "相机权限",
        purpose: "扫描二维码（地址输入、导入未签名交易、展示签名结果给热钱包）。"
      },
      {
        name: "生物识别（Face ID / Touch ID）",
        purpose: "用于解锁应用（可选）。生物识别验证由系统完成，应用不获取或保存生物识别信息。"
      }
    ],
    permissionsEn: [
      {
        name: "Camera",
        purpose:
          "Scan QR codes (address input, import unsigned transactions, and display signed results to the online side)."
      },
      {
        name: "Biometrics (Face ID / Touch ID)",
        purpose:
          "Optional app unlock. Biometric verification is handled by the OS; we do not access or store biometric data."
      }
    ],
    thirdParty: [
      "本应用不集成第三方广告 SDK，不使用第三方追踪服务。（如有，请在此补充第三方名称、用途与隐私链接）"
    ],
    thirdPartyEn: [
      "This app does not integrate third-party ad SDKs and does not use third-party tracking services. (If any, list the provider, purpose, and privacy link here.)"
    ],
    children: "本应用不面向 13 岁以下儿童提供服务，也不会有意收集儿童个人信息。"
    ,
    childrenEn:
      "This app is not intended for children under 13 and does not knowingly collect personal information from children."
  },
  reviewNotes: {
    positioning:
      "本应用为“离线冷钱包”，用于在设备本地生成/保存助记词并对交易进行离线签名。应用不提供买卖/兑换/交易所服务，不提供法币相关功能；不要求注册登录；不收集个人身份信息；默认无网络访问。",
    steps: [
      "打开 App → 选择「创建钱包」或「导入钱包」",
      "进入钱包主页 → 点击「收款」查看地址与二维码",
      "点击「签名交易」→ 选择「手动输入」模式 → 输入任意测试地址与金额即可生成签名结果（签名后会生成二维码，供另一端热钱包扫描广播）"
    ],
    extra:
      "备注：本 App 仅负责离线签名，不负责上链广播；上链广播由用户在联网环境下自行完成。"
    ,
    positioningEn:
      "This app is an offline cold wallet used to generate/store seed phrases locally and sign transactions offline. It does not provide buying/selling/exchange services or fiat-related features; no account required; no identity data collected; offline by default.",
    stepsEn: [
      "Open the app → choose “Create Wallet” or “Import Wallet”",
      "Go to the wallet home → tap “Receive” to view the address and QR code",
      "Tap “Sign Transaction” → choose “Manual Input” → enter any test address and amount to generate a signed result (a QR code will be generated for the online side to scan and broadcast)"
    ],
    extraEn:
      "Note: This app only performs offline signing and does not broadcast transactions on-chain. Broadcasting is done by the user on an online device."
  }
} as const;


