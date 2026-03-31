async function guSuan(date) {
  const result = await fetch(`https://xiaoce.fun/api/v0/quiz/daily/estimate/get?date=${date}`, {
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
      "Referer": "https://xiaoce.fun/estimate",
    },
  });
  const json = await result.json();
  const answer = json.data.answer;

  // validate input element
  let input;
  function checkInputBox(resolve) {
    input = document.querySelector(".ant-input-number-input");
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

  Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, "value").set.call(
    input,
    String(answer)
  );
  input.dispatchEvent(new Event("input", { bubbles: true }));
  btn.click();

  return "done";
}

export { guSuan };
