async function cuoZi(date) {
  const result = await fetch(`https://xiaoce.fun/api/v0/quiz/daily/wrong/get?date=${date}`, {
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
      Referer: "https://xiaoce.fun/wrong",
    },
    body: null,
    method: "GET",
  });
  const json = await result.json();
  const answer = json.data.data.wrongWords;
  console.log(answer);

  // validate input element
  let input;
  function checkInputBox(resolve) {
    input = document.querySelector(`div[style="max-width: 600px; margin: 0px auto;"]`);
    if (input === null) {
      setTimeout(() => checkInputBox(resolve), 10);
    } else {
      setTimeout(() => resolve(), 150);
    }
  }
  await new Promise((resolve) => checkInputBox(resolve));

  const words = [];
  for (const word of answer) {
    words.push(
      input.childNodes[word["paragraphIndex"]].childNodes[word["lineIndex"]].firstChild.childNodes[
        word["wordIndex"]
      ]
    );
  }
  console.log(words);
  for (const ele of words) {
    ele.click();
    await new Promise((resolve) => setTimeout(resolve, 50));
  }
}

export { cuoZi };
