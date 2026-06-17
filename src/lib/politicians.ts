export interface Politician {
  id: number;
  name: string;
  crime: string;
  color: string;
  svgPath: string;
}

export const POLITICIANS: Politician[] = [
  {
    id: 1,
    name: "嘘市",
    crime: "公約を一度も守らず",
    color: "#c0392b",
    svgPath: `
      <!-- 髪 -->
      <rect x="8" y="2" width="16" height="8" fill="#2c1810"/>
      <rect x="6" y="4" width="2" height="6" fill="#2c1810"/>
      <rect x="24" y="4" width="2" height="6" fill="#2c1810"/>
      <!-- 顔 -->
      <rect x="8" y="8" width="16" height="14" fill="#f4c89a"/>
      <!-- 目（黒線） -->
      <rect x="9" y="13" width="6" height="2" fill="#1a1a1a"/>
      <rect x="17" y="13" width="6" height="2" fill="#1a1a1a"/>
      <!-- 口 -->
      <rect x="11" y="18" width="10" height="2" fill="#c0392b"/>
      <!-- パール -->
      <rect x="10" y="22" width="2" height="2" fill="white"/>
      <rect x="14" y="22" width="2" height="2" fill="white"/>
      <rect x="18" y="22" width="2" height="2" fill="white"/>
      <!-- スーツ -->
      <rect x="6" y="24" width="20" height="8" fill="#34495e"/>
      <rect x="14" y="24" width="4" height="8" fill="#2c3e50"/>
    `
  },
  {
    id: 2,
    name: "口いっぱいおにぎり",
    crime: "政務活動費で飲食三昧",
    color: "#e67e22",
    svgPath: `
      <!-- 髪 -->
      <rect x="6" y="2" width="20" height="6" fill="#1a1a1a"/>
      <!-- 顔（丸くて大きい） -->
      <rect x="5" y="6" width="22" height="16" fill="#f4c89a"/>
      <!-- 目（黒線） -->
      <rect x="7" y="11" width="6" height="2" fill="#1a1a1a"/>
      <rect x="19" y="11" width="6" height="2" fill="#1a1a1a"/>
      <!-- 口（半開き） -->
      <rect x="10" y="17" width="12" height="4" fill="#c0392b"/>
      <rect x="11" y="18" width="10" height="2" fill="#f39c12"/>
      <!-- スーツ -->
      <rect x="5" y="24" width="22" height="8" fill="#1a1a1a"/>
      <!-- ネクタイ -->
      <rect x="13" y="24" width="4" height="8" fill="#2980b9"/>
    `
  },
  {
    id: 3,
    name: "増税メガネ",
    crime: "消費税を何度も上げた",
    color: "#8e44ad",
    svgPath: `
      <!-- 髪 -->
      <rect x="7" y="2" width="18" height="6" fill="#1a1a1a"/>
      <!-- 顔 -->
      <rect x="7" y="6" width="18" height="14" fill="#f4c89a"/>
      <!-- メガネ -->
      <rect x="8" y="11" width="6" height="4" fill="none" stroke="#1a1a1a" stroke-width="1"/>
      <rect x="18" y="11" width="6" height="4" fill="none" stroke="#1a1a1a" stroke-width="1"/>
      <rect x="14" y="12" width="4" height="2" fill="#1a1a1a"/>
      <!-- 目（黒線） -->
      <rect x="9" y="12" width="4" height="2" fill="#1a1a1a"/>
      <rect x="19" y="12" width="4" height="2" fill="#1a1a1a"/>
      <!-- 口 -->
      <rect x="11" y="17" width="10" height="2" fill="#c0392b"/>
      <!-- スーツ -->
      <rect x="6" y="22" width="20" height="10" fill="#1a1a1a"/>
      <rect x="13" y="22" width="4" height="10" fill="#c0392b"/>
    `
  },
  {
    id: 4,
    name: "ボケ傀儡",
    crime: "官僚の言いなりボケ老人",
    color: "#7f8c8d",
    svgPath: `
      <!-- 白髪 -->
      <rect x="7" y="2" width="18" height="6" fill="#bdc3c7"/>
      <rect x="5" y="4" width="2" height="4" fill="#bdc3c7"/>
      <rect x="25" y="4" width="2" height="4" fill="#bdc3c7"/>
      <!-- 顔（丸い） -->
      <rect x="7" y="6" width="18" height="14" fill="#f4c89a"/>
      <!-- 目（黒線・ぼーっと） -->
      <rect x="9" y="12" width="5" height="2" fill="#1a1a1a"/>
      <rect x="18" y="12" width="5" height="2" fill="#1a1a1a"/>
      <!-- 口（への字） -->
      <rect x="11" y="17" width="4" height="2" fill="#c0392b"/>
      <rect x="17" y="17" width="4" height="2" fill="#c0392b"/>
      <!-- スーツ -->
      <rect x="6" y="22" width="20" height="10" fill="#1a1a1a"/>
      <!-- 青ネクタイ -->
      <rect x="13" y="22" width="4" height="10" fill="#2980b9"/>
    `
  },
  {
    id: 5,
    name: "ゴルフやる三",
    crime: "国会中にゴルフ三昧",
    color: "#27ae60",
    svgPath: `
      <!-- ゴルフキャップ -->
      <rect x="6" y="2" width="20" height="4" fill="#e74c3c"/>
      <rect x="4" y="4" width="24" height="4" fill="#e74c3c"/>
      <!-- 顔 -->
      <rect x="7" y="8" width="18" height="13" fill="#f4c89a"/>
      <!-- メガネ -->
      <rect x="8" y="12" width="5" height="3" fill="none" stroke="#1a1a1a" stroke-width="1"/>
      <rect x="19" y="12" width="5" height="3" fill="none" stroke="#1a1a1a" stroke-width="1"/>
      <rect x="13" y="13" width="6" height="1" fill="#1a1a1a"/>
      <!-- 目（黒線） -->
      <rect x="9" y="13" width="3" height="1" fill="#1a1a1a"/>
      <rect x="20" y="13" width="3" height="1" fill="#1a1a1a"/>
      <!-- 口（にやけ） -->
      <rect x="10" y="18" width="12" height="2" fill="#c0392b"/>
      <!-- ゴルフウェア -->
      <rect x="6" y="23" width="20" height="9" fill="#f1c40f"/>
    `
  },
  {
    id: 6,
    name: "民営化詐欺師",
    crime: "日本の資産を外国へ売った",
    color: "#2980b9",
    svgPath: `
      <!-- ボサボサ白髪 -->
      <rect x="5" y="1" width="22" height="8" fill="#ecf0f1"/>
      <rect x="3" y="3" width="4" height="6" fill="#ecf0f1"/>
      <rect x="25" y="3" width="4" height="6" fill="#ecf0f1"/>
      <rect x="6" y="2" width="3" height="3" fill="#ecf0f1"/>
      <rect x="23" y="2" width="3" height="3" fill="#ecf0f1"/>
      <!-- 顔 -->
      <rect x="7" y="8" width="18" height="13" fill="#f4c89a"/>
      <!-- 目（黒線・鋭い） -->
      <rect x="9" y="12" width="5" height="2" fill="#1a1a1a"/>
      <rect x="18" y="12" width="5" height="2" fill="#1a1a1a"/>
      <!-- 口（への字） -->
      <rect x="11" y="18" width="10" height="2" fill="#c0392b"/>
      <!-- 指差し -->
      <rect x="25" y="15" width="4" height="2" fill="#f4c89a"/>
      <!-- スーツ -->
      <rect x="6" y="23" width="20" height="9" fill="#1a1a1a"/>
      <rect x="13" y="23" width="4" height="9" fill="#2980b9"/>
    `
  },
  {
    id: 7,
    name: "消費税導入クソ野郎",
    crime: "日本にブレーキをかけたA級戦犯",
    color: "#c0392b",
    svgPath: `
      <!-- 髪（白髪混じり） -->
      <rect x="7" y="2" width="18" height="6" fill="#7f8c8d"/>
      <!-- 顔（丸くて大きい） -->
      <rect x="6" y="6" width="20" height="15" fill="#f4c89a"/>
      <!-- 目（黒線） -->
      <rect x="8" y="12" width="5" height="2" fill="#1a1a1a"/>
      <rect x="19" y="12" width="5" height="2" fill="#1a1a1a"/>
      <!-- 口（ドヤ顔・大きい） -->
      <rect x="9" y="17" width="14" height="3" fill="#c0392b"/>
      <rect x="10" y="18" width="12" height="1" fill="#ecf0f1"/>
      <!-- スーツ -->
      <rect x="5" y="23" width="22" height="9" fill="#1a1a1a"/>
      <!-- ガッツポーズの腕 -->
      <rect x="2" y="20" width="3" height="8" fill="#1a1a1a"/>
      <rect x="27" y="20" width="3" height="8" fill="#1a1a1a"/>
    `
  },
  {
    id: 8,
    name: "エステクソババア",
    crime: "高額予算を全て無に帰す金食い女",
    color: "#e91e8c",
    svgPath: `
      <!-- 髪（ショートボブ） -->
      <rect x="7" y="2" width="18" height="8" fill="#1a1a1a"/>
      <rect x="5" y="4" width="2" height="10" fill="#1a1a1a"/>
      <rect x="25" y="4" width="2" height="10" fill="#1a1a1a"/>
      <!-- 顔 -->
      <rect x="7" y="8" width="18" height="13" fill="#f4c89a"/>
      <!-- メガネ -->
      <rect x="8" y="12" width="5" height="3" fill="none" stroke="#1a1a1a" stroke-width="1"/>
      <rect x="19" y="12" width="5" height="3" fill="none" stroke="#1a1a1a" stroke-width="1"/>
      <rect x="13" y="13" width="6" height="1" fill="#1a1a1a"/>
      <!-- 目（黒線） -->
      <rect x="9" y="13" width="3" height="1" fill="#1a1a1a"/>
      <rect x="20" y="13" width="3" height="1" fill="#1a1a1a"/>
      <!-- 口 -->
      <rect x="11" y="18" width="10" height="2" fill="#c0392b"/>
      <!-- 白スーツ -->
      <rect x="6" y="23" width="20" height="9" fill="#ecf0f1"/>
      <rect x="13" y="23" width="4" height="9" fill="#bdc3c7"/>
    `
  },
];