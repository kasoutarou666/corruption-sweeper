cat > README.md << 'EOF'

# 🔍 汚職議員を告発せよ！/ Corruption Sweeper

> 証拠を集めて汚職議員を暴け！闇の力に葬られるな！

🎮 **[今すぐ告発する](https://corruption-sweeper.vercel.app)**

---

## 🎯 ゲーム概要

政治家モチーフのマインスイーパーゲームです。
汚職議員（💣）を避けながら証拠を集め、全ての安全なマスを開けたら告発成功！

---

## 🕹️ 遊び方

1. マスをタップして証拠を収集
2. 数字は周囲の汚職議員の数を示す
3. 「📋 告発状モード」で汚職議員の場所をマーク
4. 全てのマスを開けたら告発成功！🎉
5. 汚職議員を踏んだら「闇の力に葬られました」💀

---

## ⚠️ ゲームルール

| 要素        | 説明                   |
| ----------- | ---------------------- |
| 🤵 汚職議員 | 踏んだらゲームオーバー |
| 📋 告発状   | 汚職議員の場所をマーク |
| 数字        | 周囲の汚職議員の数     |
| 空白        | 安全な証拠エリア       |

---

## 🛠️ 技術スタック

- **Framework**: Vite + React + TypeScript
- **Platform**: Farcaster Mini App
- **Deploy**: Vercel
- **SDK**: @farcaster/frame-sdk

---

## 🚀 ローカル開発

```bash
git clone https://github.com/kasoutarou666/corruption-sweeper.git
cd corruption-sweeper
npm install
npm run dev
```

---

## 📝 ライセンス

MIT
EOF
