import { taskFunctions } from "./tasks.js";

chrome.runtime.onMessage.addListener(async (message, sender, sendResponse) => {
  if (message.action === "fuckIt" && message.tasks) {
    handleTasks(message.tasks, message.closeAtFinish);
  }
});

function getDate() {
  const today = new Date();
  return `${today.getFullYear()}${(today.getMonth() + 1).toString().padStart(2, "0")}${today
    .getDate()
    .toString()
    .padStart(2, "0")}`;
}

const urls = {
  baiKe: "baike",
  caiHua: "chemelem",
  geCi: "lyric",
  guSuan: "estimate",
  chengJing: "cityscene",
  guoJing: "countryscene",
  caiGuo: "worldle",
  caiTieShangHai: "metro/shanghai",
  caiTieGuangZhou: "metro/guangzhou",
  caiTieShenZhen: "metro/shenzhen",
  caiTieBeiJing: "metro",
  caiSe: "guesscolor",
  caiWord: "wordle",
  shiWen: "poem",
  wenTi: "question",
  cuoZi: "wrong",
  tianWord: "fillword",
  caiWordLiuZi: "wordle6",
  caiQi: "flagle",
  tianYan: "skyeye",
  caiYuan: "genshin",
  caiCheng: "chinale",
  caiCheng3D: "chinale3d",
  caiNong: "honor",
  xiangYin: "accent",
  caiYing: "lol",
  xunHuaLing: "xunhualing",
  tianShengSiGe: "fillprovince",
  tianShengJiuGe: "fillprovince/33",
  caiHan: "guessfunc",
  tianFan: "fillanime",
  caiBin: "guessdisease",
  yuanShenBaiKe: "baike/genshin",
  MCBaiKe: "baike/mc",
  liShiBaiKe: "baike/history",
  MCCaiWu: "mcitem",
  caiWu: "five",
};

async function handleTasks(tasks, closeAtFinish) {
  for (const task of tasks) {
    const tab = await chrome.tabs.create({
      url: `https://xiaoce.fun/${urls[task]}`,
    });

    if (task === "caiHan") {
      await chrome.scripting.executeScript({
        target: { tabId: tab.id },
        func: function () {
          localStorage.setItem("guessfunc_keyboard_enabled_", "false");
        },
      });
      await chrome.tabs.reload(tab.id);
      console.log("reloaded");
    }

    // wait for document loaded
    await new Promise((resolve) => {
      const listener = (tabId, changeInfo) => {
        if (tabId === tab.id && changeInfo.status === "complete") {
          chrome.tabs.onUpdated.removeListener(listener);
          resolve();
        }
      };

      chrome.tabs.onUpdated.addListener(listener);
    });

    await new Promise((resolve) => setTimeout(resolve, 500));

    // execute function
    try {
      const result = await chrome.scripting.executeScript({
        target: { tabId: tab.id },
        func: taskFunctions[task],
        args: [getDate()],
      });
      if (result === "done") console.log("task done");

      // wait for 500ms
      await new Promise((resolve) => setTimeout(resolve, 500));
      if (closeAtFinish) {
        chrome.tabs.remove(tab.id);
      }
    } catch (error) {
      console.error(`Error when completing task ${task}: `, error);
    }
  }
}
