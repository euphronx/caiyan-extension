async function tianWord(date) {
  const result = await fetch(`https://xiaoce.fun/api/v0/quiz/daily/fillword/get?date=${date}`, {
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
      "Referer": "https://xiaoce.fun/fillword",
    },
  });
  const json = await result.json();
  const answer = json.data.toLowerCase();

  // validate input element
  let input;
  function checkInputBox(resolve) {
    input = document.querySelectorAll(
      ".ant-btn.ant-btn-default.ant-btn-color-default.ant-btn-variant-outlined"
    );
    if (input.length === 0) {
      setTimeout(() => checkInputBox(resolve), 10);
    } else {
      resolve();
    }
  }
  await new Promise((resolve) => checkInputBox(resolve));

  await new Promise((resolve) => setTimeout(resolve, 200));
  for (const byte of answer) {
    for (const ele of input) {
      if (ele.textContent.toLowerCase().includes(byte)) {
        ele.click();
        await new Promise((resolve) => setTimeout(resolve, 50));
        break;
      }
    }
  }
  const submit = document.querySelector(
    ".ant-btn.ant-btn-primary.ant-btn-color-primary.ant-btn-variant-solid"
  );
}

export { tianWord };
