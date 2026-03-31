async function tianShengSiGe(date) {
  const result = await fetch(`https://xiaoce.fun/api/v0/quiz/daily/fillProvince/get?date=${date}`, {
    headers: {
      accept: "*/*",
      "accept-language": "zh-CN,zh;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6",
      "cache-control": "no-cache",
      "fun-device": "web",
      pragma: "no-cache",
      priority: "u=1, i",
      "sec-ch-ua": '"Not(A:Brand";v="8", "Chromium";v="144", "Microsoft Edge";v="144"',
      "sec-fetch-dest": "empty",
      "sec-fetch-mode": "cors",
      "sec-fetch-site": "same-origin",
      "sec-gpc": "1",
      Referer: "https://xiaoce.fun/fillprovince",
    },
  });
  const json = await result.json();
  const answers = json.data.data.answers;

  // generate valid answer
  let answer = [];
  outer: for (const a1 of answers[0]) {
    const b1 = a1.name;
    for (const a2 of answers[1]) {
      const b2 = a2.name;
      if (b2 === b1) continue;
      for (const a3 of answers[2]) {
        const b3 = a3.name;
        if (b3 === b2 || b3 === b1) continue;
        for (const a4 of answers[3]) {
          const b4 = a4.name;
          if (b4 === b3 || b4 === b2 || b4 === b1) continue;
          answer = [b1, b2, b3, b4];
          break outer;
        }
      }
    }
  }

  // validate input element
  let input;
  function checkInputBox(resolve) {
    input = document.querySelector(
      `div[style="margin-top: 1rem; display: flex; justify-content: center;"]`,
    );
    if (input === null) {
      setTimeout(() => checkInputBox(resolve), 10);
    } else {
      setTimeout(resolve, 150);
    }
  }
  await new Promise((resolve) => checkInputBox(resolve));
  const inputs = [
    ...[...input.firstChild.childNodes[1].childNodes].slice(1, 3),
    ...[...input.firstChild.childNodes[2].childNodes].slice(1, 3),
  ];

  // input answer
  for (let i = 0; i < 4; i++) {
    const input = inputs[i],
      ans = answer[i];
    input.click();
    await new Promise((resolve) => setTimeout(resolve, 100));
    for (const btn of document.querySelectorAll(
      ".ant-btn.ant-btn-default.ant-btn-color-default.ant-btn-variant-outlined",
    )) {
      if (btn.textContent.replaceAll(" ", "") === ans) {
        btn.click();
        await new Promise((resolve) => setTimeout(resolve, 100));
      }
    }
  }
}

export { tianShengSiGe };
