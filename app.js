const express = require('express');
const dbRoute = require("./routes/db");
const app = express();

app.use(express.static("./public")); //ローカルサーバー接続時に最初に接続する静的HTMLファイル
app.use(express.json());
const port = 3000;

// フロントエンドからエクセルDBにアクセスるAPIのルートエンドポイント
app.use("/api/v1/excel-data-base", dbRoute);

// サーバーを起動
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});