import { execSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const root = "/Users/panda/Documents/Yunth";
const outDir = path.join(root, "outputs/session_handoff_site");
const assetsDir = path.join(outDir, "assets");
const downloadsDir = path.join(outDir, "downloads");
const panelOutDir = path.join(assetsDir, "panels");
const referencesDir = path.join(assetsDir, "references");

const googleSheetUrl =
  "https://docs.google.com/spreadsheets/d/1xUbP7dNZGyPWRQ8g1cZijWqB1TQEPZQzygSsG7mF4VA/edit?usp=sharing";
const originalSheetUrl =
  "https://docs.google.com/spreadsheets/d/1xB-cAYA5VqXWnW9HjtQkZW4cte44EJdCYAqlhOPm9Jc/edit?gid=227896483#gid=227896483";
const referenceYoutubeUrl = "https://www.youtube.com/watch?v=zE9UvVaC0qw";
const productLpUrl =
  "https://yunth.jp/lp?u=es-air-gs-101&gad_source=1&gad_campaignid=22529448228";

const storyboardRows = [
  {
    no: 1,
    script: "Yunth、気になっていたけれど、",
    scene:
      "洗面台の広め。Yunth箱と横長VCパウチを見つめる女性。気になっていたけど迷っている導入。",
    edit: "冒頭は“気になっていたけど迷う”温度。白背景で静かに開始。",
  },
  {
    no: 2,
    script: "定価だと少し迷っていた方へ。",
    scene:
      "スマホと商品を同画面に置く。指が購入ボタン手前で止まり、定価で迷う気持ちとサイズ感を見せる。",
    edit: "スマホと商品を同時に見せ、定価で迷う理由を作る。",
  },
  {
    no: 3,
    script: "通常3,960円の",
    scene:
      "通常価格の説明前。箱正面、横長VCパウチ、手、スマホで商品サイズと公式感を見せる。",
    edit: "価格比較の前振り。商品サイズが伝わる手元を残す。",
  },
  {
    no: 4,
    script: "Yunth VC美白美容液本品入り",
    scene:
      "本品入りの説明。箱の上蓋を開け、中に横長VCパウチが並んでいることを明確に見せる。",
    edit: "箱を開く動作で、本品入り/実物感を強める。",
  },
  {
    no: 5,
    script: "5,214円相当の「夏直前 シミ対策セット」が、今なら税込1,980円です。",
    scene:
      "セット価値の俯瞰。箱、VCパウチ、化粧水ミニ、クリームミニ、シートマスク、特典2包を整理して見せる。",
    edit: "物量の俯瞰。1,980円の納得感を一気に作る。",
  },
  {
    no: 6,
    script: "サンプルではなく、本品でしっかり試せる",
    scene:
      "サンプルではなく本品。開いた箱を持ち、手のひらに1包を乗せて、実物量と1包サイズを同時に伝える。",
    edit: "本品で試せる安心感。手のひらサイズも見せる。",
  },
  {
    no: 7,
    script: "6月限定キャンペーンをご用意しました。",
    scene:
      "6月限定キャンペーン。カレンダー風小物と商品一式を整列し、公式告知の静かな画にする。",
    edit: "6月限定の公式告知感。煽りすぎず整列。",
  },
  {
    no: 8,
    script: "セット内容は、",
    scene:
      "セット内容導入。低い商品スイープでパウチ列から箱へ奥行きを作り、単調さを防ぐ。",
    edit: "低い商品スイープで画面変化。ここから内容紹介へ。",
  },
  {
    no: 9,
    script: "VC美白美容液本品と、",
    scene:
      "VC美白美容液本品。主役は箱と横長VCパウチだけ。ミニや特典は主役にしない。",
    edit: "本品の説明。主役は箱とVCパウチのみ。",
    important: true,
  },
  {
    no: 10,
    script: "化粧水ミニ、クリームミニ。",
    scene:
      "化粧水ミニ、クリームミニ。手と並べて小ささを見せ、背景に本品箱を置く。",
    edit: "ミニ2点のサイズ感。手と並べて小ささを出す。",
    important: true,
  },
  {
    no: 11,
    script: "さらに特典として、シートマスク1枚と、",
    scene:
      "シートマスク1枚。1枚のシートマスクを主役にし、レチノールパウチは出さない。",
    edit: "シートマスク1枚のみ。特典の種類を混ぜない。",
    important: true,
  },
  {
    no: 12,
    script: "レチノールパウチ2包も。",
    scene:
      "レチノールパウチ2包。前景は同じ小さい特典パウチ2包だけ。サイズ違い比較はしない。",
    edit: "同じ小さいレチノールパウチ2包のみ。サイズ違い比較なし。",
    important: true,
  },
  {
    no: 13,
    script: "Yunthの生ビタミンC美白美容液は、",
    scene:
      "生VCパートへ。箱の中から1包を選ぶ手元で、個包装美容液へ話題を切り替える。",
    edit: "処方パートへ切替。1包を取る動作。",
  },
  {
    no: 14,
    script: "洗顔後すぐ、まっさらな肌に使う美容液。",
    scene:
      "洗顔後すぐ。夜の洗面台、タオル、鏡、商品待機で使う直前の生活感を出す。",
    edit: "夜の洗面台。生活シーンで単調さを切る。",
  },
  {
    no: 15,
    script: "純度100%の生ビタミンCを、",
    scene:
      "純度100%の生VC。横長パウチを開けて手のひらに一滴落ちるマクロカット。",
    edit: "一滴の質感。参照CMのマクロ感を意識。",
  },
  {
    no: 16,
    script: "1回分ずつ個包装。",
    scene:
      "1回分ずつ個包装。箱/トレイに同じ個包装が並び、1包だけ取る手元。",
    edit: "個包装が並ぶ気持ちよさ。1回分ずつを視覚化。",
  },
  {
    no: 17,
    script: "仕事を終えて、メイクを落として、やっと一息つく夜。",
    scene:
      "仕事終わりの夜。玄関/洗面所へのワイドで大きく場面転換し、商品カット続きの単調さを切る。",
    edit: "帰宅ワイド。商品卓上カットから大きく場面転換。",
  },
  {
    no: 18,
    script: "洗面台の鏡に映る素肌を見て、ふと立ち止まることがある。",
    scene:
      "鏡に映る素肌。鏡越しの静かな間。頬に手を添え、商品は洗面台に置く。",
    edit: "鏡越しの間。肌を見る感情の余白。",
  },
  {
    no: 19,
    script: "そんなまっさらな肌へ、開けたての生ビタミンCを。",
    scene:
      "開けたて生VCを肌へ。頬へなじませる使用カット。商品と開封済みパウチも入れる。",
    edit: "頬へなじませる。商品と使用感を同時に。",
  },
  {
    no: 20,
    script: "医薬部外品として、メラニンの生成を抑え、",
    scene:
      "医薬部外品。肌横顔に細いラインとシールドを重ね、処方の公式感を視覚化。",
    edit: "薬機表現はテロップで安全に。映像はバリア/ラインで補助。",
  },
  {
    no: 21,
    script: "しみ・そばかすを防ぐ予防ケア。",
    scene:
      "予防ケア。朝の鏡で頬に触れる女性。薄いバリア表現で守られている感じを出す。",
    edit: "朝の明るさ。予防ケアの前向きさを出す。",
  },
  {
    no: 22,
    script: "気になっていたYunthを、",
    scene:
      "気になっていたYunthへ戻る。スマホを見て、迷いから行動へ移るカット。",
    edit: "迷いから行動へ。購入導線に戻す。",
  },
  {
    no: 23,
    script: "本品入りセットで無理なく試せる",
    scene:
      "本品入りセットで無理なく試せる。全内容を俯瞰し、両手でフレーミングして納得感を作る。",
    edit: "セット全体を再回収。CTA前に価値を整理。",
  },
  {
    no: 24,
    script: "6月限定のキャンペーンです。",
    scene:
      "6月限定キャンペーン。ここだけ色付きエンドカード。淡いピンク/金色で商品からバリアが出る雰囲気。",
    edit: "ここだけ色付き。淡いピンクとバリア感でエンドカード風。",
    important: true,
  },
  {
    no: 25,
    script: "数量限定、在庫限り。",
    scene:
      "数量限定、在庫限り。在庫確認している手元と商品。少しだけ緊張感のある画にする。",
    edit: "数量限定/在庫限り。売れてる広告寄りに在庫確認感。",
  },
  {
    no: 26,
    script: "詳細は、",
    scene:
      "詳細は。スマホCTAボタンへ指が近づく寄り。商品も識別できる大きさで残す。",
    edit: "指寄りCTA。ボタンへ視線誘導。",
  },
  {
    no: 27,
    script: "動画下のボタンからご確認ください。",
    scene:
      "動画下ボタン。箱いっぱいのパウチ、スマホ、余白。CTAを乗せやすい最終カット。",
    edit: "最終CTA。余白を残して動画下ボタン文言を載せる。",
  },
];

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function copyFile(src, dest) {
  if (!fs.existsSync(src)) return false;
  ensureDir(path.dirname(dest));
  fs.copyFileSync(src, dest);
  return true;
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function rowImage(no) {
  return `assets/panels/scene_${String(no).padStart(2, "0")}.png`;
}

fs.rmSync(outDir, { recursive: true, force: true });
ensureDir(panelOutDir);
ensureDir(referencesDir);
ensureDir(downloadsDir);

for (const row of storyboardRows) {
  const file = `scene_${String(row.no).padStart(2, "0")}.png`;
  copyFile(
    path.join(root, "outputs/storyboard_lineart_v5_fixed/panels", file),
    path.join(panelOutDir, file),
  );
}

const copied = [
  copyFile(
    path.join(root, "outputs/storyboard_lineart_v5_fixed/yunth_lineart_v5_contact_sheet.png"),
    path.join(assetsDir, "yunth_lineart_v5_contact_sheet.png"),
  ),
  copyFile(
    "/Volumes/4TBくん_ピース/ユンスでヤンス/VC_パウチ (1).png",
    path.join(referencesDir, "yunth_vc_pouch.png"),
  ),
  copyFile(
    "/Volumes/4TBくん_ピース/ユンスでヤンス/biyoueki_hako_rename (2).png",
    path.join(referencesDir, "yunth_vc_box.png"),
  ),
  copyFile(
    path.join(root, "outputs/winning_ads_analysis/video_1_contact.jpg"),
    path.join(referencesDir, "winning_ad_1_contact.jpg"),
  ),
  copyFile(
    path.join(root, "outputs/winning_ads_analysis/video_2_contact.jpg"),
    path.join(referencesDir, "winning_ad_2_contact.jpg"),
  ),
  copyFile(
    path.join(root, "generated_frames/yunth_chifure_style_start_frame.png"),
    path.join(referencesDir, "chifure_style_start_frame.png"),
  ),
  copyFile(
    path.join(root, "generated_frames/yunth_chifure_style_end_frame.png"),
    path.join(referencesDir, "chifure_style_end_frame.png"),
  ),
  copyFile(
    path.join(root, "outputs/sheet_import/yunth_storyboard_v5_share_tab.xlsx"),
    path.join(downloadsDir, "yunth_storyboard_v5_share_tab.xlsx"),
  ),
  copyFile(
    path.join(root, "outputs/storyboard_lineart_v5_fixed/yunth_lineart_storyboard_v5_fixed.xlsx"),
    path.join(downloadsDir, "yunth_lineart_storyboard_v5_fixed.xlsx"),
  ),
  copyFile(
    path.join(root, "outputs/winning_ads_analysis/yunth_winning_ads_analysis.md"),
    path.join(downloadsDir, "yunth_winning_ads_analysis.md"),
  ),
  copyFile(
    path.join(root, "outputs/winning_ads_analysis/transcripts/video (1).txt"),
    path.join(downloadsDir, "winning_ad_1_transcript.txt"),
  ),
  copyFile(
    path.join(root, "outputs/winning_ads_analysis/transcripts/video.txt"),
    path.join(downloadsDir, "winning_ad_2_transcript.txt"),
  ),
];

try {
  execSync("zip -qr ../../downloads/yunth_v5_storyboard_panels.zip .", {
    cwd: panelOutDir,
    stdio: "ignore",
  });
} catch {
  // The page still works without the zip; individual panels remain available.
}

const storyboardCards = storyboardRows
  .map(
    (row) => `
      <article class="story-card${row.important ? " story-card--important" : ""}" id="scene-${row.no}">
        <div class="story-image">
          <img src="${rowImage(row.no)}" alt="Scene ${row.no} storyboard line art">
        </div>
        <div class="story-body">
          <div class="story-kicker">Scene ${String(row.no).padStart(2, "0")}</div>
          <h3>${escapeHtml(row.script)}</h3>
          <p><strong>画作り</strong>${escapeHtml(row.scene)}</p>
          <p><strong>編集/確認</strong>${escapeHtml(row.edit)}</p>
        </div>
      </article>`,
  )
  .join("\n");

const html = `<!doctype html>
<html lang="ja">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="description" content="Yunth 6月キャンペーン 絵コンテ制作セッションの引き継ぎ資料">
  <title>Yunth 6月キャンペーン 絵コンテ引き継ぎ</title>
  <style>
    :root {
      --ink: #252229;
      --muted: #6f6873;
      --paper: #fffaf8;
      --white: #ffffff;
      --blush: #f6c1c8;
      --blush-soft: #fff0f2;
      --rose: #c84f68;
      --gold: #b98d45;
      --mint: #dff1ec;
      --blue: #426a86;
      --blue-soft: #edf5f9;
      --line: #eadde1;
      --shadow: 0 16px 34px rgba(37, 34, 41, 0.08);
      --radius: 8px;
    }

    * { box-sizing: border-box; }
    html { scroll-behavior: smooth; }
    body {
      margin: 0;
      color: var(--ink);
      font-family: -apple-system, BlinkMacSystemFont, "Hiragino Sans", "Yu Gothic", "YuGothic", "Noto Sans JP", sans-serif;
      line-height: 1.75;
      background: var(--paper);
      overflow-x: hidden;
      overflow-wrap: break-word;
    }
    img { display: block; max-width: 100%; height: auto; }
    a { color: inherit; }

    .topbar {
      position: sticky;
      top: 0;
      z-index: 10;
      background: rgba(255, 250, 248, 0.94);
      border-bottom: 1px solid var(--line);
      backdrop-filter: blur(12px);
    }
    .wrap {
      width: min(1180px, calc(100% - 40px));
      margin: 0 auto;
    }
    .topbar .wrap {
      min-height: 58px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 18px;
    }
    .brand {
      font-weight: 800;
      line-height: 1.2;
    }
    .brand small {
      display: block;
      color: var(--muted);
      font-weight: 600;
      font-size: 0.78rem;
    }
    .nav {
      display: flex;
      gap: 6px;
      flex-wrap: wrap;
      justify-content: flex-end;
    }
    .nav a,
    .button {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      min-width: 0;
      border: 1px solid var(--line);
      background: var(--white);
      border-radius: var(--radius);
      padding: 8px 12px;
      text-decoration: none;
      font-weight: 700;
      font-size: 0.9rem;
      text-align: center;
      white-space: normal;
      overflow-wrap: anywhere;
    }
    .nav a:hover,
    .button:hover {
      border-color: var(--rose);
      color: var(--rose);
    }

    .hero {
      padding: 42px 0 34px;
      background:
        linear-gradient(180deg, #fff2f4 0%, var(--paper) 82%);
      border-bottom: 1px solid var(--line);
    }
    .hero-grid {
      display: grid;
      grid-template-columns: 0.92fr 1.08fr;
      gap: 28px;
      align-items: center;
    }
    .hero-grid > *,
    .grid > *,
    .product-strip > * {
      min-width: 0;
    }
    .eyebrow {
      color: var(--rose);
      font-weight: 800;
      font-size: 0.88rem;
      margin: 0 0 10px;
    }
    h1 {
      margin: 0;
      font-size: 2.15rem;
      line-height: 1.22;
      max-width: 100%;
      overflow-wrap: anywhere;
      word-break: normal;
    }
    .lead {
      margin: 16px 0 0;
      color: #463f47;
      font-size: 1.02rem;
    }
    .hero-actions {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
      margin-top: 20px;
    }
    .button--primary {
      background: var(--ink);
      color: var(--white);
      border-color: var(--ink);
    }
    .button--primary:hover {
      color: var(--white);
      background: var(--rose);
      border-color: var(--rose);
    }
    .hero-media {
      background: var(--white);
      border: 1px solid var(--line);
      border-radius: var(--radius);
      box-shadow: var(--shadow);
      padding: 10px;
      width: 100%;
      max-width: 100%;
      overflow: hidden;
    }
    .hero-media img {
      width: 100%;
      border-radius: 6px;
      border: 1px solid #eee;
    }

    section {
      padding: 42px 0;
      border-bottom: 1px solid var(--line);
    }
    .section-head {
      display: flex;
      justify-content: space-between;
      align-items: end;
      gap: 20px;
      margin-bottom: 20px;
    }
    h2 {
      margin: 0;
      font-size: 1.55rem;
      line-height: 1.32;
    }
    .section-note {
      margin: 8px 0 0;
      color: var(--muted);
      max-width: 740px;
    }
    .grid {
      display: grid;
      gap: 14px;
    }
    .grid--3 { grid-template-columns: repeat(3, 1fr); }
    .grid--2 { grid-template-columns: repeat(2, 1fr); }

    .summary-item,
    .rule,
    .asset-card,
    .timeline-item,
    .download-card {
      background: var(--white);
      border: 1px solid var(--line);
      border-radius: var(--radius);
      padding: 18px;
      box-shadow: 0 8px 20px rgba(37, 34, 41, 0.04);
    }
    .summary-item b,
    .rule b,
    .timeline-item b {
      display: block;
      margin-bottom: 6px;
      font-size: 1.02rem;
    }
    .summary-item p,
    .rule p,
    .timeline-item p,
    .download-card p {
      margin: 0;
      color: var(--muted);
    }
    .rule--hot {
      border-color: #efb5bf;
      background: linear-gradient(180deg, #fff5f6, #ffffff);
    }
    .pill-row {
      display: flex;
      gap: 8px;
      flex-wrap: wrap;
      margin-top: 14px;
    }
    .pill {
      display: inline-flex;
      align-items: center;
      min-width: 0;
      border: 1px solid var(--line);
      border-radius: 999px;
      padding: 5px 10px;
      color: #4f4752;
      background: var(--white);
      font-size: 0.84rem;
      font-weight: 700;
      white-space: normal;
      overflow-wrap: anywhere;
    }

    .product-strip {
      display: grid;
      grid-template-columns: 0.9fr 1.1fr;
      gap: 14px;
      align-items: stretch;
    }
    .asset-card figure {
      margin: 0;
      display: grid;
      gap: 12px;
      height: 100%;
      align-content: start;
    }
    .asset-card img {
      width: 100%;
      background: #fff;
      border: 1px solid #eee;
      border-radius: 6px;
    }
    figcaption {
      color: var(--muted);
      font-size: 0.92rem;
    }

    .story-grid {
      display: grid;
      gap: 14px;
    }
    .story-card {
      display: grid;
      grid-template-columns: minmax(260px, 38%) 1fr;
      gap: 16px;
      align-items: stretch;
      background: var(--white);
      border: 1px solid var(--line);
      border-radius: var(--radius);
      padding: 12px;
      box-shadow: 0 8px 20px rgba(37, 34, 41, 0.04);
    }
    .story-card--important {
      border-color: #e7a8b2;
      background: linear-gradient(180deg, #fff7f8, #ffffff);
    }
    .story-image {
      border: 1px solid #e8e2e3;
      border-radius: 6px;
      background: #fff;
      overflow: hidden;
    }
    .story-image img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      aspect-ratio: 16 / 9;
    }
    .story-body {
      padding: 6px 4px;
    }
    .story-kicker {
      color: var(--rose);
      font-weight: 800;
      font-size: 0.82rem;
      margin-bottom: 4px;
    }
    .story-body h3 {
      margin: 0 0 9px;
      font-size: 1.13rem;
      line-height: 1.42;
    }
    .story-body p {
      margin: 7px 0;
      color: #4c454d;
    }
    .story-body strong {
      display: inline-block;
      min-width: 82px;
      color: var(--ink);
      margin-right: 6px;
    }

    .band {
      background: var(--blue-soft);
    }
    .timeline {
      display: grid;
      gap: 10px;
      counter-reset: step;
    }
    .timeline-item {
      display: grid;
      grid-template-columns: 44px 1fr;
      gap: 14px;
      align-items: start;
    }
    .timeline-item::before {
      counter-increment: step;
      content: counter(step);
      width: 34px;
      height: 34px;
      border-radius: 50%;
      display: grid;
      place-items: center;
      background: var(--ink);
      color: var(--white);
      font-weight: 800;
      line-height: 1;
    }

    .downloads {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 12px;
    }
    .download-card {
      display: flex;
      flex-direction: column;
      gap: 10px;
      min-height: 160px;
    }
    .download-card a {
      font-weight: 800;
      color: var(--rose);
      text-decoration: none;
    }
    .download-card a:hover {
      text-decoration: underline;
    }
    .note-box {
      margin-top: 18px;
      padding: 16px;
      border: 1px solid #d8e5e7;
      background: #f7fcfb;
      border-radius: var(--radius);
      color: #40555a;
    }
    footer {
      padding: 24px 0 34px;
      color: var(--muted);
      font-size: 0.9rem;
      background: var(--paper);
    }

    @media (max-width: 980px) {
      .hero-grid,
      .product-strip,
      .grid--3,
      .grid--2,
      .downloads {
        grid-template-columns: 1fr;
      }
      .story-card {
        grid-template-columns: 1fr;
      }
    }
    @media (max-width: 720px) {
      .wrap {
        width: min(100% - 24px, 1180px);
      }
      .topbar .wrap {
        align-items: start;
        flex-direction: column;
        padding: 10px 0;
      }
      .nav {
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        justify-content: stretch;
        width: 100%;
      }
      .nav a {
        width: 100%;
      }
      h1 {
        font-size: 1.48rem;
      }
      .hero-actions {
        display: grid;
        grid-template-columns: 1fr;
      }
      .pill-row {
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));
      }
      .pill {
        justify-content: center;
        text-align: center;
      }
      section {
        padding: 34px 0;
      }
      .section-head {
        display: block;
      }
      .timeline-item {
        grid-template-columns: 36px 1fr;
      }
      .story-body strong {
        display: block;
        margin-bottom: 2px;
      }
    }
  </style>
</head>
<body>
  <header class="topbar">
    <div class="wrap">
      <div class="brand">Yunth 絵コンテ引き継ぎ<small>2026-06-02 / v5 fixed</small></div>
      <nav class="nav" aria-label="ページ内ナビゲーション">
        <a href="#summary">要点</a>
        <a href="#storyboard">27シーン</a>
        <a href="#history">経緯</a>
        <a href="#downloads">資料</a>
      </nav>
    </div>
  </header>

  <main>
    <section class="hero">
      <div class="wrap hero-grid">
        <div>
          <p class="eyebrow">Yunth 6月キャンペーン / 生VC美白美容液</p>
          <h1>このセッションで決めた絵コンテ案を、人に渡せる状態にまとめました。</h1>
          <p class="lead">台本27行に対して、最終線画v5・商品サイズの注意・シーン差し替え意図・勝ち広告から拾った構造を1ページで確認できます。</p>
          <div class="hero-actions">
            <a class="button button--primary" href="${googleSheetUrl}" target="_blank" rel="noreferrer">Googleスプシを見る</a>
            <a class="button" href="downloads/yunth_storyboard_v5_share_tab.xlsx">共有用XLSX</a>
            <a class="button" href="#storyboard">シーン一覧へ</a>
          </div>
          <div class="pill-row">
            <span class="pill">最終版: v5 fixed</span>
            <span class="pill">27パネル</span>
            <span class="pill">線画中心</span>
            <span class="pill">Scene 24のみ色付き</span>
          </div>
        </div>
        <div class="hero-media">
          <img src="assets/yunth_lineart_v5_contact_sheet.png" alt="Yunth storyboard v5 contact sheet">
        </div>
      </div>
    </section>

    <section id="summary">
      <div class="wrap">
        <div class="section-head">
          <div>
            <h2>まず共有したい結論</h2>
            <p class="section-note">この案件は、抽象的な絵コンテから「商品形状・開封・サイズ感・売れる広告の流れ」まで具体化したセッションです。</p>
          </div>
        </div>
        <div class="grid grid--3">
          <div class="summary-item"><b>成果物</b><p>最終絵コンテはv5。台本27行と画像27枚を固定対応させ、Googleスプシにもまとめました。</p></div>
          <div class="summary-item"><b>重要修正</b><p>ライン11/12のズレとパウチサイズ違いを修正。11はシートマスクだけ、12は同じ小さい特典パウチ2包だけ。</p></div>
          <div class="summary-item"><b>演出方針</b><p>商品カットだけが続かないよう、手元、洗面台、鏡、帰宅ワイド、マクロ、CTAへ場面を変えます。</p></div>
        </div>

        <div class="grid grid--2" style="margin-top:14px;">
          <div class="rule rule--hot"><b>ズラさないルール</b><p>9=本品のみ、10=化粧水ミニ/クリームミニ、11=シートマスク1枚、12=同じ小さいレチノールパウチ2包、24=色付きエンドカード。</p></div>
          <div class="rule"><b>エンドカード</b><p>24だけ淡いピンク/金色で塗り、商品からバリアが出る感じ。CHIFURE参照の“公式感ある光と保護膜”を使います。</p></div>
        </div>
      </div>
    </section>

    <section id="references" class="band">
      <div class="wrap">
        <div class="section-head">
          <div>
            <h2>商品と参考広告</h2>
            <p class="section-note">今回の絵コンテで参照した商品形状・勝ち広告・雰囲気の源泉です。</p>
          </div>
        </div>
        <div class="product-strip">
          <div class="asset-card">
            <figure>
              <img src="assets/references/yunth_vc_pouch.png" alt="Yunth VC pouch reference">
              <figcaption>VC美白美容液の横長パウチ。メイン商品はこの小包が箱の中に並ぶ前提。</figcaption>
            </figure>
          </div>
          <div class="asset-card">
            <figure>
              <img src="assets/references/yunth_vc_box.png" alt="Yunth VC whitening serum box reference">
              <figcaption>ピンク/白の本品箱。 genericな美容液ボトルにしないことが重要。</figcaption>
            </figure>
          </div>
        </div>
        <div class="grid grid--2" style="margin-top:14px;">
          <div class="asset-card">
            <figure>
              <img src="assets/references/winning_ad_1_contact.jpg" alt="Winning ad one contact sheet">
              <figcaption>売れている実写/UGC寄せ広告。箱を持つ、開ける、並べる、限定性で押す。</figcaption>
            </figure>
          </div>
          <div class="asset-card">
            <figure>
              <img src="assets/references/winning_ad_2_contact.jpg" alt="Winning ad two contact sheet">
              <figcaption>LPスライド/公式説明型広告。社会的証明、価格、本品、CTAを高速に積む。</figcaption>
            </figure>
          </div>
        </div>
        <div class="note-box">
          参考ムード: <a href="${referenceYoutubeUrl}" target="_blank" rel="noreferrer">CHIFURE 薬用リンクル美容液 CM</a> の、温かい金色、商品マクロ、薄い幾何学ライン、保護バリア感。商品情報: <a href="${productLpUrl}" target="_blank" rel="noreferrer">Yunth LP</a>。
        </div>
        <div class="grid grid--2" style="margin-top:14px;">
          <div class="asset-card">
            <figure>
              <img src="assets/references/chifure_style_start_frame.png" alt="Chifure inspired start frame reference">
              <figcaption>CHIFUREの空気をYunthに翻訳した参考開始フレーム。白/ピンクに金色の保護感。</figcaption>
            </figure>
          </div>
          <div class="asset-card">
            <figure>
              <img src="assets/references/chifure_style_end_frame.png" alt="Chifure inspired end frame reference">
              <figcaption>終盤の参考フレーム。エンドカードで“商品からバリアが出る”方向性の補助。</figcaption>
            </figure>
          </div>
        </div>
      </div>
    </section>

    <section id="storyboard">
      <div class="wrap">
        <div class="section-head">
          <div>
            <h2>台本1行ごとの最終絵コンテ</h2>
            <p class="section-note">画像・台本・画作りメモ・編集確認メモを固定で並べています。赤みのある枠は、前回ズレやすかった注意シーンです。</p>
          </div>
        </div>
        <div class="story-grid">
          ${storyboardCards}
        </div>
      </div>
    </section>

    <section id="history" class="band">
      <div class="wrap">
        <div class="section-head">
          <div>
            <h2>このセッションの流れ</h2>
            <p class="section-note">人に説明するときは、この順で話すと「なぜv5になったか」が伝わります。</p>
          </div>
        </div>
        <div class="timeline">
          <div class="timeline-item"><div><b>元スプシから台本を取得</b><p>「プラッシング済み台本アリ」の27行をベースに、1行ごとにシーン提案を作成。</p></div></div>
          <div class="timeline-item"><div><b>CHIFURE CMの空気を追加</b><p>温かい光、商品マクロ、薄いライン、バリア表現を終盤演出の方向性として採用。</p></div></div>
          <div class="timeline-item"><div><b>初稿は抽象的すぎた</b><p>線画の密度が低く、意図が伝わりにくかったため、人物・手元・背景まで具体的に描く方針へ変更。</p></div></div>
          <div class="timeline-item"><div><b>商品形状を修正</b><p>メイン商品をgenericボトルではなく、Yunthのピンク箱と横長VCパウチに統一。</p></div></div>
          <div class="timeline-item"><div><b>売れている広告を分析</b><p>実写UGC型とLPスライド型から、後悔/限定/本品/在庫確認/CTAの強さを反映。</p></div></div>
          <div class="timeline-item"><div><b>v4で開封とサイズ感を追加</b><p>ただし台本行との対応ズレと、11/12周辺のパウチサイズ違いが発生。</p></div></div>
          <div class="timeline-item"><div><b>v5で差し替え</b><p>ライン対応を固定し、9/10/11/12/24の扱いを明確化。Scene 24だけ色付きエンドカード案に。</p></div></div>
          <div class="timeline-item"><div><b>共有用スプシを新規作成</b><p>元スプシは閲覧のみだったため、新しいGoogleスプレッドシートとして共有化。</p></div></div>
        </div>
      </div>
    </section>

    <section>
      <div class="wrap">
        <div class="section-head">
          <div>
            <h2>勝ち広告から入れた要素</h2>
            <p class="section-note">ブランドムービー寄せだけではなく、獲得広告として飽きずに見てもらうための要素です。</p>
          </div>
        </div>
        <div class="grid grid--2">
          <div class="summary-item"><b>見せ方</b><p>箱を開ける、手のひらに置く、商品を並べる、スマホCTAへ寄る。きれいな物撮りだけで終わらせない。</p></div>
          <div class="summary-item"><b>情報構造</b><p>迷い、価格、本品、特典、個包装、夜の使用、予防ケア、限定、在庫確認、動画下ボタンの順で畳む。</p></div>
          <div class="summary-item"><b>単調さ対策</b><p>俯瞰、低い商品スイープ、鏡越し、帰宅ワイド、マクロ一滴、エンドカードへ画角を変える。</p></div>
          <div class="summary-item"><b>注意</b><p>薬機に関わる説明はテロップ主体。画はバリアやラインで補助し、断定的な肌変化表現に寄せない。</p></div>
        </div>
      </div>
    </section>

    <section id="downloads">
      <div class="wrap">
        <div class="section-head">
          <div>
            <h2>共有資料</h2>
            <p class="section-note">このページを渡す人が、必要な素材へすぐ行けるようにまとめています。</p>
          </div>
        </div>
        <div class="downloads">
          <div class="download-card"><a href="${googleSheetUrl}" target="_blank" rel="noreferrer">Googleスプシ</a><p>新規作成済みの共有用スプレッドシート。リンク閲覧可。</p></div>
          <div class="download-card"><a href="downloads/yunth_storyboard_v5_share_tab.xlsx">共有用XLSX</a><p>Google Sheetsへ入れた1タブ版。画像付き。</p></div>
          <div class="download-card"><a href="downloads/yunth_lineart_storyboard_v5_fixed.xlsx">最終ワークブック</a><p>v5の元ブック。商品参考・修正方針タブ入り。</p></div>
          <div class="download-card"><a href="downloads/yunth_v5_storyboard_panels.zip">絵コンテ画像ZIP</a><p>Scene 01から27までの線画パネル一式。</p></div>
          <div class="download-card"><a href="downloads/yunth_winning_ads_analysis.md">勝ち広告分析メモ</a><p>2本の売れている広告から拾った構造メモ。</p></div>
          <div class="download-card"><a href="downloads/winning_ad_1_transcript.txt">勝ち広告1 文字起こし</a><p>実写/UGC寄せ広告の文字起こし。</p></div>
          <div class="download-card"><a href="downloads/winning_ad_2_transcript.txt">勝ち広告2 文字起こし</a><p>LPスライド/公式説明型広告の文字起こし。</p></div>
          <div class="download-card"><a href="${originalSheetUrl}" target="_blank" rel="noreferrer">元スプシ</a><p>台本取得元。こちらは閲覧のみだったため編集はしていません。</p></div>
        </div>
        <div class="note-box">
          Google Drive上では新規スプシをGoogleスプレッドシート形式として作成し、リンク閲覧権限まで設定済みです。画像入りで容量が大きいため、API経由の再エクスポート確認だけはGoogle側のサイズ制限に当たりました。
        </div>
      </div>
    </section>
  </main>

  <footer>
    <div class="wrap">
      Yunth 6月キャンペーン 絵コンテ制作セッション引き継ぎ / generated 2026-06-02
    </div>
  </footer>
</body>
</html>`;

fs.writeFileSync(path.join(outDir, "index.html"), html, "utf8");

fs.writeFileSync(
  path.join(outDir, "_headers"),
  `/*\n  Cache-Control: public, max-age=300\n`,
  "utf8",
);

console.log(
  JSON.stringify(
    {
      outDir,
      panels: storyboardRows.length,
      copiedAssets: copied.filter(Boolean).length,
      missingAssets: copied.filter((ok) => !ok).length,
      index: path.join(outDir, "index.html"),
    },
    null,
    2,
  ),
);
