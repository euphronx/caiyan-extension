async function caiHan(date) {
  const result = await fetch(`https://xiaoce.fun/api/v0/quiz/daily/guessfunc/get?date=${date}`, {
    headers: {
      "accept": "*/*",
      "accept-language": "zh-CN,zh;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6",
      "cache-control": "no-cache",
      "fun-device": "web",
      "pragma": "no-cache",
      "priority": "u=1, i",
      "sec-ch-ua": '"Not(A:Brand";v="8", "Chromium";v="144", "Microsoft Edge";v="144"',
      "sec-fetch-dest": "empty",
      "sec-fetch-mode": "cors",
      "sec-fetch-site": "same-origin",
      "sec-gpc": "1",
      "Referer": "https://xiaoce.fun/guessfunc",
    },
  });
  const json = await result.json();
  const answer = json.data.data.expr;
  console.log(answer);

  // validate input element
  let btn;
  function checkInputBox(resolve) {
    btn = document.querySelector(".ant-switch-inner");
    if (btn === null) {
      setTimeout(() => checkInputBox(resolve), 10);
    } else {
      setTimeout(() => {
        const enabled = localStorage.getItem("guessfunc_keyboard_enabled_");
        if (enabled !== "false") btn.click();
        resolve();
      }, 150);
    }
  }
  await new Promise((resolve) => checkInputBox(resolve));

  console.log("button found");

  const input = document.querySelector(".ant-input.ant-input-outlined");
  Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, "value").set.call(input, answer);

  console.log("input found");
  input.dispatchEvent(new Event("input", { bubbles: true }));
  await new Promise((resolve) => setTimeout(resolve, 200));
  const confirmBtn = document.querySelectorAll(
    "button.ant-btn.ant-btn-primary.ant-btn-color-primary.ant-btn-variant-solid"
  )[0];
  confirmBtn.click();
}

export { caiHan };
