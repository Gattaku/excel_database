const express = require("express");
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const excelFilePath = 'data.xlsx';
const getCurrentTime = require("../components/getDate"); //現在時刻を取ってくる関数をimport
const crypto = require("crypto"); // UUID用
const XLSX = require('xlsx');
const fs = require('fs');

//***********DBのデータ数を定義 *************/
const dataNum = 4; //<--ここの数字を変更する
const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const colIndex = alphabet.slice(0, dataNum);
//*************************************** */

// エクセルファイルに文字列を追記するAPI
const createDB = (req, res) => {
    const { userName, text } = req.body;
    const currentTime = getCurrentTime.getCurrentTime();

    // データベースの仕様 
    const id = crypto.randomUUID(); // nodejsのUUID記入方法
    const colContent = [currentTime, userName, id, text] //中身の配列

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
};

const getDB = (req, res) => {

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
    const dbContent = [];
    while (cnt < 1) {
        const checkFlg = !cell || cell.v === "";
        if (checkFlg) {
            console.log(worksheet[`A${rowIndex - 1}`].v);
            cnt++;
        } else {
            const rowContent = [];
            for (let i = 0; i < dataNum; i++) {
                rowContent.push(worksheet[`${colIndex[i]}${rowIndex}`]);
            }
            dbContent.push(rowContent);
            rowIndex++;
            checkRow = `A${rowIndex}`;
            cell = worksheet[checkRow];
        }
    }
    res.status(200).json({ database: dbContent });
    // res.redirect("/");
}

module.exports = {
    createDB,
    getDB
}
