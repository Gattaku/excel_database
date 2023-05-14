// $sendButton = document.getElementById("sendButton");

// $sendButton.addEventListener("submit", () => {
//     alert(document.myform.userName.value);
//     document.myform.action = "/addString";
//     document.myform.submit();
// })


$form = document.getElementById("myform");
$userName = document.getElementById("user");
$text = document.getElementById("textContent");

const createNewDB = async (userName, text) => {
    try {
        await axios.post("/addString", {
            userName: userName,
            text: text,
            // id: Math.random().toString(),
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


console.log(axios);