async function caiYuan(date) {
  const result = await fetch(`https://xiaoce.fun/api/v0/quiz/daily/genshin/get?date=${date}`, {
    headers: {
      accept: "*/*",
      "accept-language": "zh-CN,zh;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6",
      "cache-control": "no-cache",
      "fun-device": "web",
      pragma: "no-cache",
      priority: "u=1, i",
      "sec-ch-ua": '"Microsoft Edge";v="143", "Chromium";v="143", "Not A(Brand";v="24"',
      "sec-fetch-dest": "empty",
      "sec-fetch-mode": "cors",
      "sec-fetch-site": "same-origin",
      "sec-gpc": "1",
      Referer: "https://xiaoce.fun/genshin",
    },
  });
  const json = await result.json();
  const answer = json.data.data.name;

  // validate input element
  let input;
  function checkInputBox(resolve) {
    input = document.querySelector(
      ".ant-btn.ant-btn-default.ant-btn-color-default.ant-btn-variant-outlined"
    );
    if (input === null) {
      setTimeout(() => checkInputBox(resolve), 10);
    } else {
      setTimeout(() => {
        input.click();
        resolve();
      }, 150);
    }
  }
  await new Promise((resolve) => checkInputBox(resolve));

  const cardInput = document.querySelector(".ant-input.ant-input-outlined");
  Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, "value").set.call(cardInput, answer);
  cardInput.dispatchEvent(new Event("input", { bubbles: true }));
  await new Promise((resolve) => setTimeout(resolve, 200));
  for (const ele of document.querySelectorAll(".ant-card.ant-card-bordered.ant-card-hoverable")) {
    if (ele.textContent.replaceAll(" ", "") === answer) {
      ele.click();
      break;
    }
  }
}

export { caiYuan };
