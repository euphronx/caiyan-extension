async function caiHua(date) {
  const result = await fetch(`https://xiaoce.fun/api/v0/quiz/daily/chemElem/get?date=${date}`, {
    headers: {
      accept: "*/*",
      "accept-language": "zh-CN,zh;q=0.9",
      "cache-control": "no-cache",
      "fun-device": "web",
      pragma: "no-cache",
      priority: "u=1, i",
      "sec-ch-ua": '"Chromium";v="142", "Microsoft Edge";v="142", "Not_A Brand";v="99"',
      "sec-fetch-dest": "empty",
      "sec-fetch-mode": "cors",
      "sec-fetch-site": "same-origin",
      "sec-gpc": "1",
      Referer: "https://xiaoce.fun/chemelem",
    },
  });
  const json = await result.json();
  const answer = json.data.id - 1;

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

  function trying() {
    const container = document.getElementsByClassName("ant-modal-content");
    if (container.length > 0) {
      const tags = document.getElementsByClassName("ant-card-body");
      if (tags[answer]) tags[answer].click();
      else setTimeout(trying, 10);
    } else setTimeout(trying, 10);
  }
  trying();

  return "done";
}

export { caiHua };
