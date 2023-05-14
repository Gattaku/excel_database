const express = require('express');
const bodyParser = require('body-parser');
const XLSX = require('xlsx');
const fs = require('fs');
const getCurrentTime = require("./components/getDate"); //現在時刻を取ってくる関数をimport

const app = express();
app.use(express.static("./public"));
app.use(express.json());
const port = 3000;
const excelFilePath = 'data.xlsx';

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// フロントエンドからの文字列を取得するAPIのルートエンドポイント
const apiEndpoint = '/addString';




// エクセルファイルに文字列を追記するAPI
app.post(apiEndpoint, (req, res) => {
    const { userName, text, id } = req.body;
    const currentTime = getCurrentTime.getCurrentTime();

    // 追加をつかさどる部分 
    const colIndex = "ABCD"; //どの列までするか
    const colContent = [currentTime, userName, text, id] //中身の配列



    // エクセルファイルの読み込み
    let workbook;
    if (fs.existsSync(excelFilePath)) {
        workbook = XLSX.readFile(excelFilePath);
    } else {
        workbook = XLSX.utils.book_new();
    }

    // 最初のシートを選択
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    let cnt = 0;
    let rowIndex = 1;
    let checkRow = `A${rowIndex}`;
    let cell = worksheet[checkRow];
    while (cnt < 1) {
        const checkFlg = !cell || cell.v === "";
        if (checkFlg) {
            console.log(checkRow);
            console.log(worksheet[`A${rowIndex - 1}`].v);
            cnt++;
        } else {
            rowIndex++;
            checkRow = `A${rowIndex}`;
            cell = worksheet[checkRow];
        }
    }



    // 変更可能範囲指定
    const rangeCol = `${colIndex[colIndex.length - 1]}${rowIndex}`;
    const range = worksheet['!ref'] = `A1:${rangeCol}`;

    for (let i = 0; i < colIndex.length; i++) {
        worksheet[`${colIndex[i]}${rowIndex}`] = { t: 's', v: colContent[i] };
    }



    // エクセルファイルを保存
    XLSX.writeFile(workbook, excelFilePath);

    res.redirect("/");
    // res.status(200).json({ message: '文字列が追加されました。' });
});

// サーバーを起動
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});