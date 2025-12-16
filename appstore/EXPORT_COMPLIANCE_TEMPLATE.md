# 出口加密合规（Export Compliance）模板

> 说明：App Store Connect 在提交时会问“是否使用加密”。冷钱包通常会使用加密（本地数据保护、签名算法等）。
>  
> 你们需要按实际情况回答。下文提供一个“常见、相对稳妥”的填写口径（请法务/合规最终确认）。

## 1) App Store Connect 常见问题与建议回答

### Q1：Does your app use encryption?

- 建议：**Yes**

原因：钱包涉及加密存储、本地密钥保护、签名等。

### Q2：Does your app qualify for an exemption?

多数钱包类 App 属于“面向大众、使用标准加密、非军事用途”的范畴，通常会走 **Mass Market** / **Exempt** 路径。

建议口径（按实际修改）：

- 本应用仅在设备本地使用标准加密算法保护用户数据与完成区块链交易签名。
- 不提供加密通信服务（不作为 VPN/聊天/端到端通信工具）。
- 不面向政府/军事用途。

> 如果你们在 App Store Connect 里选择了需要提交 CCATS/ERN 的路径，请按合规要求提供对应文件；如果不确定，建议先按“标准加密 + mass market/exempt”路径选择。

## 2) 给审核员的简短说明（可放在 Review Notes）

本应用使用标准加密算法用于本地数据保护与离线交易签名，不提供加密通信服务或任何形式的加密内容传输服务。


