async function chengJing(date) {
  const result = await fetch(`https://xiaoce.fun/api/v0/quiz/daily/cityScene/get?date=${date}`, {
    headers: {
      "accept": "*/*",
      "accept-language": "zh-CN,zh;q=0.9",
      "cache-control": "no-cache",
      "fun-device": "web",
      "pragma": "no-cache",
      "priority": "u=1, i",
      "sec-ch-ua": '"Chromium";v="142", "Microsoft Edge";v="142", "Not_A Brand";v="99"',
      "sec-fetch-dest": "empty",
      "sec-fetch-mode": "cors",
      "sec-fetch-site": "same-origin",
      "sec-gpc": "1",
      "Referer": "https://xiaoce.fun/cityscene",
    },
  });
  const json = await result.json();
  const id = json.data.data.locationId;

  // get the list of answer
  const getList = await fetch("https://xiaoce.fun/api/v0/quiz/daily/chinale/getList", {
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
      "Referer": "https://xiaoce.fun/cityscene",
    },
  });
  const list = await getList.json();
  const answer = Object.values(list.data).filter((l) => l.id == id)[0].name;

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
  for (const ele of document.querySelectorAll(
    "button.ant-btn.ant-btn-default.ant-btn-color-default.ant-btn-variant-outlined"
  )) {
    if (ele.textContent.replaceAll(" ", "") === answer) {
      ele.click();
      break;
    }
  }
}

export { chengJing };
