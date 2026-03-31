async function caiBin(date) {
  const result = await fetch(
    `https://xiaoce.fun/api/v0/quiz/daily/addRecord?type=guess_disease&date=${date}&status=giveUp`,
    {
      headers: {
        "accept": "*/*",
        "accept-language": "zh-CN,zh;q=0.9",
        "cache-control": "no-cache",
        "fun-device": "web",
        "pragma": "no-cache",
        "priority": "u=1, i",
        "sec-ch-ua": '"Chromium";v="146", "Not-A.Brand";v="24", "Microsoft Edge";v="146"',
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "cross-origin",
        "sec-gpc": "1",
        "Referer": "https://xiaoce.fun/guessdisease",
      },
    }
  );
  const json = await result.json();
  const answer = json.data.data.disease;

  // validate input element
  let input;
  function checkInputBox(resolve) {
    input = document.querySelector(".ant-input.ant-input-outlined");
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

  Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, "value").set.call(input, answer);
  input.dispatchEvent(new Event("input", { bubbles: true }));
  await new Promise((resolve) => setTimeout(resolve, 200));
  document
    .querySelector(".ant-btn.ant-btn-primary.ant-btn-color-primary.ant-btn-variant-solid")
    .click();
  await new Promise((resolve) => setTimeout(resolve, 10000));
}

export { caiBin };
