// ============================================================
// トレーニングログ — Google Apps Script
// ============================================================
// 【設定】自分のスプレッドシートIDに書き換えてください
// スプレッドシートのURLの /d/〇〇〇/edit の〇〇〇の部分
const SPREADSHEET_ID = 'YOUR_SPREADSHEET_ID';
const SHEET_NAME     = 'ログ';  // シート名（変える場合はここも変える）
// ============================================================

function doPost(e) {
  try {
    const json = JSON.parse(e.postData.contents);

    const ss    = SpreadsheetApp.openById(SPREADSHEET_ID);
    let sheet   = ss.getSheetByName(SHEET_NAME);

    // シートが存在しなければ自動作成＋ヘッダー挿入
    if (!sheet) {
      sheet = ss.insertSheet(SHEET_NAME);
      sheet.appendRow(['記録日時', '日付', 'No', '種目', '重量(kg)', 'レップ', 'セット', 'メモ']);
      sheet.setFrozenRows(1);
    }

    const timestamp = new Date();
    const date      = json.date  || '';
    const memo      = json.memo  || '';
    const exercises = json.exercises || [];

    // 種目ごとに1行ずつ書き込む
    exercises.forEach((ex, i) => {
      sheet.appendRow([
        timestamp,
        date,
        i + 1,               // 種目No（同一セッション内の順番）
        ex.exercise || '',
        ex.weight   || '',
        ex.reps     || '',
        ex.sets     || '',
        i === 0 ? memo : '', // メモは1行目にだけ書く
      ]);
    });

    return ContentService
      .createTextOutput(JSON.stringify({ status: 'ok', rows: exercises.length }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ status: 'error', message: err.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// ブラウザから直接アクセスしたときの確認用（任意）
function doGet() {
  return ContentService
    .createTextOutput('トレーニングログ API は動作しています。')
    .setMimeType(ContentService.MimeType.TEXT);
}
