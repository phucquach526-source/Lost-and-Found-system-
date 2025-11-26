let selectType = "";

document.getElementById("lost").addEventListener("click", () => {
    selectType = "lost";
});

document.getElementById("found").addEventListener("click", () => {
    selectType = "found";
});

document.getElementById("begin").addEventListener("click", () => {
    if (selectType === "lost") {
        window.location.href = "foundPage.html";
    } else if (selectType === "found") {
        window.location.href = "lostPage.html";
    } else {
        alert("Please choose Found or Lost first");
    }
});