async function caiTieGuangZhou(date) {
  const result = await fetch(
    `https://xiaoce.fun/api/v0/quiz/daily/metro/get?date=${date}&city=%E5%B9%BF%E5%B7%9E`,
    {
      headers: {
        accept: "*/*",
        "accept-language": "zh-CN,zh;q=0.9",
        "cache-control": "no-cache",
        "fun-device": "web",
        pragma: "no-cache",
        priority: "u=1, i",
        "sec-ch-ua": '"Microsoft Edge";v="143", "Chromium";v="143", "Not A(Brand";v="24"',
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-origin",
        "sec-gpc": "1",
        Referer: "https://xiaoce.fun/metro",
      },
    }
  );
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

  const cardInput = document.querySelector(".ant-select-selection-search-input");
  Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, "value").set.call(cardInput, answer);
  cardInput.dispatchEvent(new Event("input", { bubbles: true }));
  await new Promise((resolve) => setTimeout(resolve, 200));
  for (const ele of document.querySelectorAll(
    ".ant-btn.ant-btn-default.ant-btn-color-default.ant-btn-variant-outlined"
  )) {
    if (ele.textContent.replaceAll(" ", "") === answer) {
      ele.click();
      break;
    }
  }
}

export { caiTieGuangZhou };
