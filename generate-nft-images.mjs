import sharp from 'sharp';
import fs from 'fs';

const politicians = [
  { id: 1, name: "嘘市", color: "#c0392b", hair: "#2c1810", suit: "#34495e", tie: null, hat: null, glasses: false, hairStyle: "short" },
  { id: 2, name: "口いっぱいおにぎり", color: "#e67e22", hair: "#1a1a1a", suit: "#1a1a1a", tie: "#2980b9", hat: null, glasses: false, hairStyle: "round" },
  { id: 3, name: "増税メガネ", color: "#8e44ad", hair: "#1a1a1a", suit: "#1a1a1a", tie: "#c0392b", hat: null, glasses: true, hairStyle: "normal" },
  { id: 4, name: "ボケ傀儡", color: "#7f8c8d", hair: "#bdc3c7", suit: "#1a1a1a", tie: "#2980b9", hat: null, glasses: false, hairStyle: "thin" },
  { id: 5, name: "ゴルフやる三", color: "#27ae60", hair: "#1a1a1a", suit: "#f1c40f", tie: null, hat: "#e74c3c", glasses: true, hairStyle: "normal" },
  { id: 6, name: "民営化詐欺師", color: "#2980b9", hair: "#ecf0f1", suit: "#1a1a1a", tie: "#2980b9", hat: null, glasses: false, hairStyle: "wild" },
  { id: 7, name: "消費税導入クソ野郎", color: "#c0392b", hair: "#7f8c8d", suit: "#1a1a1a", tie: null, hat: null, glasses: false, hairStyle: "round" },
  { id: 8, name: "エステクソババア", color: "#e91e8c", hair: "#1a1a1a", suit: "#ecf0f1", tie: null, hat: null, glasses: true, hairStyle: "bob" },
];

function generateSVG(p) {
  const glasses = p.glasses ? `
    <rect x="52" y="88" width="40" height="24" rx="4" fill="none" stroke="#1a1a1a" stroke-width="4"/>
    <rect x="108" y="88" width="40" height="24" rx="4" fill="none" stroke="#1a1a1a" stroke-width="4"/>
    <rect x="92" y="96" width="16" height="4" fill="#1a1a1a"/>
  ` : '';

  const hat = p.hat ? `
    <rect x="40" y="20" width="120" height="28" rx="4" fill="${p.hat}"/>
    <rect x="20" y="40" width="160" height="12" rx="2" fill="${p.hat}"/>
  ` : '';

  const wildHair = p.hairStyle === "wild" ? `
    <rect x="30" y="16" width="20" height="40" rx="4" fill="${p.hair}"/>
    <rect x="150" y="16" width="20" height="40" rx="4" fill="${p.hair}"/>
    <rect x="40" y="10" width="20" height="20" rx="4" fill="${p.hair}"/>
    <rect x="140" y="10" width="20" height="20" rx="4" fill="${p.hair}"/>
  ` : '';

  const tie = p.tie ? `<rect x="88" y="180" width="24" height="60" rx="4" fill="${p.tie}"/>` : '';
  const pearl = p.hairStyle === "short" || p.hairStyle === "bob" ? `
    <circle cx="70" cy="172" r="6" fill="white"/>
    <circle cx="90" cy="172" r="6" fill="white"/>
    <circle cx="110" cy="172" r="6" fill="white"/>
    <circle cx="130" cy="172" r="6" fill="white"/>
  ` : '';

  return `<svg width="200" height="280" xmlns="http://www.w3.org/2000/svg">
    <!-- 背景 -->
    <rect width="200" height="280" fill="${p.color}22" rx="16"/>
    <rect x="4" y="4" width="192" height="272" fill="#1a1a2e" rx="14"/>
    
    <!-- ゴールド枠 -->
    <rect x="2" y="2" width="196" height="276" fill="none" stroke="gold" stroke-width="3" rx="15"/>
    
    ${hat}
    
    <!-- 髪 -->
    <rect x="48" y="${p.hat ? '48' : '24'}" width="104" height="${p.hairStyle === 'thin' ? '20' : '44'}" rx="8" fill="${p.hair}"/>
    ${p.hairStyle === 'bob' ? `<rect x="36" y="28" width="16" height="60" rx="4" fill="${p.hair}"/><rect x="148" y="28" width="16" height="60" rx="4" fill="${p.hair}"/>` : ''}
    ${wildHair}
    
    <!-- 顔 -->
    <rect x="48" y="64" width="104" height="100" rx="12" fill="#f4c89a"/>
    
    ${glasses}
    
    <!-- 目（黒線） -->
    <rect x="60" y="${p.glasses ? '96' : '100'}" width="32" height="8" rx="2" fill="#1a1a1a"/>
    <rect x="108" y="${p.glasses ? '96' : '100'}" width="32" height="8" rx="2" fill="#1a1a1a"/>
    
    <!-- 口 -->
    <rect x="68" y="136" width="64" height="12" rx="4" fill="#c0392b"/>
    
    ${pearl}
    
    <!-- スーツ -->
    <rect x="36" y="176" width="128" height="80" rx="8" fill="${p.suit}"/>
    ${tie}
    
    <!-- 名前 -->
    <text x="100" y="270" text-anchor="middle" font-family="serif" font-size="11" fill="gold">${p.name}</text>
  </svg>`;
}

fs.mkdirSync('nft-images', { recursive: true });

for (const p of politicians) {
  const svg = generateSVG(p);
  const svgBuffer = Buffer.from(svg);
  await sharp(svgBuffer)
    .resize(400, 560)
    .png()
    .toFile(`nft-images/${p.id}_${p.name}.png`);
  console.log(`✅ ${p.name} 生成完了`);
}

console.log('🎉 全画像生成完了！nft-imagesフォルダを確認してや！');
