

$form = document.getElementById("myform");
$userName = document.getElementById("user");
$text = document.getElementById("textContent");
$getButton = document.getElementById("getbutton");
$currentDB = document.getElementById("currentDB");

const createNewDB = async (userName, text) => {
    try {
        await axios.post("/api/v1/excel-data-base", {
            userName: userName,
            text: text,
            // id: Math.random().toString(), //inputタグ以外の情報も追加できることを確認済み
        });
        window.alert("DBへの登録が完了しました!");
        $userName.value = "";
        $text.value = "";
    } catch (err) {
        console.log(err);
    }
}

$form.addEventListener("submit", (e) => {
    e.preventDefault();
    createNewDB($userName.value, $text.value);
})

const getInnerHtml = (arg) => {
    const allData = arg.map((rowData) => {
        const eachRow = rowData.map((elm) => {
            return `<th>${elm}</th>`
        });
        const eachRowText = eachRow.join("");
        const nodeText = `<tr>
                            ${eachRowText}
                        </tr>`;
        return nodeText;
    })
    return allData.join("");
}

const getDatabase = async () => {
    try {
        console.log("getボタンは押されました。")
        const getDatabase = await axios.get("/api/v1/excel-data-base")
        // window.alert("DBの情報を取得しました");
        const getData = getDatabase.data.database;
        const eachData = getData.map((elm) => {
            return elm.map((elm2) => elm2.v);
        });
        console.log(eachData);
        const innerNode = getInnerHtml(eachData);
        $currentDB.innerHTML = `<table>
                                ${innerNode}
                                </table>`;
    } catch (err) {
        console.log(err);
    }
}

$getButton.addEventListener("click", (e) => {
    getDatabase();
})
