async function tianShengJiuGe(date) {
  const result = await fetch(
    `https://xiaoce.fun/api/v0/quiz/daily/fillProvince/get?date=${date}&subType=33`,
    {
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
        "Referer": "https://xiaoce.fun/fillprovince/33",
      },
    }
  );
  const json = await result.json();
  const answers = json.data.data.answers;

  // generate valid answer
  const answer = new Array(9);
  const used = new Set();
  const state = [[0, 0]];
  while (state.length > 0) {
    const [idx, tryIdx] = state[state.length - 1];
    if (idx === 9) break;
    const current = answers[idx];

    // try the next element of the previous set if there's no valid solution
    if (tryIdx >= current.length) {
      state.pop();
      used.delete(answer[state[state.length - 1]]);
      state[state.length - 1][1]++;
      continue;
    }

    const val = current[tryIdx]["name"];
    if (!used.has(val)) {
      answer[idx] = val;
      used.add(val);
      state.push([idx + 1, 0]);
    } else {
      state[state.length - 1][1]++;
    }
  }

  // validate input element
  let input;
  function checkInputBox(resolve) {
    input = document.querySelector(
      `div[style="margin-top: 1rem; display: flex; justify-content: center;"]`
    );
    if (input === null) {
      setTimeout(() => checkInputBox(resolve), 10);
    } else {
      setTimeout(resolve, 150);
    }
  }
  await new Promise((resolve) => checkInputBox(resolve));
  const inputs = [
    ...[...input.firstChild.childNodes[1].childNodes].slice(1, 4),
    ...[...input.firstChild.childNodes[2].childNodes].slice(1, 4),
    ...[...input.firstChild.childNodes[3].childNodes].slice(1, 4),
  ];

  // input answer
  await new Promise((resolve) => setTimeout(resolve, 1000)); // Requires time to load all the components
  for (let i = 0; i < 9; i++) {
    const input = inputs[i],
      ans = answer[i];
    input.click();
    await new Promise((resolve) => setTimeout(resolve, 100));
    for (const btn of document.querySelectorAll(
      ".ant-btn.ant-btn-default.ant-btn-color-default.ant-btn-variant-outlined"
    )) {
      if (btn.textContent.replaceAll(" ", "") === ans) {
        btn.click();
        await new Promise((resolve) => setTimeout(resolve, 500)); // Wait for longer time
      }
    }
  }
}

export { tianShengJiuGe };
