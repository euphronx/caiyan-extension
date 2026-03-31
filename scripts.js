const boxes = document.querySelectorAll(".checkbox-container input[type=checkbox]");
const btn = document.querySelector("#go-btn");
const selectBtn = document.querySelector("#select-all-btn");
const closeAtFinish = document.querySelector("#close-on-finish");
let closePage = true;
btn.addEventListener("click", () => {
  const checked = [];
  for (const box of boxes) {
    if (box.checked) {
      checked.push(box.id);
    }
  }

  chrome.runtime.sendMessage({ action: "fuckIt", tasks: checked, closeAtFinish: closePage });
  for (const box of boxes) {
    box.checked = false;
  }
});
selectBtn.addEventListener("click", () => {
  for (const box of boxes) {
    box.checked = true;
  }
});
closeAtFinish.addEventListener("change", () => {
  closePage = closeAtFinish.checked;
  chrome.storage.local.set({ "close-at-finish": closePage });
});

(async function () {
  const result = await chrome.storage.local.get("close-at-finish");
  const storedValue = result["close-at-finish"];
  closeAtFinish.checked = storedValue !== undefined ? storedValue : true;
  closePage = closeAtFinish.checked;
})();
