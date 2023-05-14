$sendButton = document.getElementById("sendButton");

$sendButton.addEventListener("submit", () => {
    alert(document.myform.userName.value);
    document.myform.action = "/addString";
    document.myform.submit();
})