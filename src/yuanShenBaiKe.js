async function yuanShenBaiKe(date) {
  const result = await fetch(
    `https://xiaoce.fun/api/v0/quiz/daily/baike/get?date=${date}&subType=genshin`,
    {
      headers: {
        "accept": "*/*",
        "accept-language": "en,zh-CN;q=0.9,zh;q=0.8,en-GB;q=0.7,en-US;q=0.6",
        "cache-control": "no-cache",
        "fun-device": "web",
        "pragma": "no-cache",
        "priority": "u=1, i",
        "sec-ch-ua": '"Chromium";v="146", "Not-A.Brand";v="24", "Microsoft Edge";v="146"',
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-origin",
        "sec-gpc": "1",
        "Referer": "https://xiaoce.fun/baike/genshin",
      },
    }
  );
  const json = await result.json();
  const answer = json.data.data.title;

  // validate input element
  let input;
  function checkInputBox(resolve) {
    input = document.querySelector(".ant-input.ant-input-outlined");
    if (input === null) {
      setTimeout(() => checkInputBox(resolve), 10);
    } else {
      setTimeout(() => resolve(), 150);
    }
  }
  await new Promise((resolve) => checkInputBox(resolve));

  const btn = document.querySelector(
    ".ant-btn.ant-btn-primary.ant-btn-color-primary.ant-btn-variant-solid"
  );

  // the original setter
  const nativeInputSetter = Object.getOwnPropertyDescriptor(
    HTMLInputElement.prototype,
    "value"
  ).set;
  // input title
  for (const char of answer) {
    nativeInputSetter.call(input, char);
    input.dispatchEvent(new Event("input", { bubbles: true }));
    btn.click();
    await new Promise((r) => setTimeout(r, 30));
  }

  return "done";
}

export { yuanShenBaiKe };
