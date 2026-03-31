async function caiGuo(date) {
  const result = await fetch(`https://xiaoce.fun/api/v0/quiz/daily/worldle/getTemp?date=${date}`, {
    headers: {
      "accept": "*/*",
      "accept-language": "zh-CN,zh;q=0.9",
      "cache-control": "no-cache",
      "fun-device": "web",
      "pragma": "no-cache",
      "priority": "u=1, i",
      "sec-ch-ua": '"Microsoft Edge";v="143", "Chromium";v="143", "Not A(Brand";v="24"',
      "sec-fetch-dest": "empty",
      "sec-fetch-mode": "cors",
      "sec-fetch-site": "same-origin",
      "sec-gpc": "1",
      "Referer": "https://xiaoce.fun/worldle",
    },
  });
  const json = await result.json();
  const answer = json.data.data.name;

  // validate input element
  let input;
  function checkInputBox(resolve) {
    input = document.querySelector(".ant-select-selection-search-input");
    if (input === null) {
      setTimeout(() => checkInputBox(resolve), 10);
    } else {
      setTimeout(resolve, 150);
    }
  }
  await new Promise((resolve) => checkInputBox(resolve));

  Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, "value").set.call(input, answer);
  input.dispatchEvent(new Event("input", { bubbles: true }));
  await new Promise((resolve) => setTimeout(resolve, 200));
  const btns = document.querySelectorAll(
    "button.ant-btn.ant-btn-primary.ant-btn-color-primary.ant-btn-variant-solid"
  );
  btns.forEach((b) => {
    if (b.textContent.includes("猜 测")) b.click();
  });
}

export { caiGuo };
