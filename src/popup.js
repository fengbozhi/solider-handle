// 设置dom信息提示，5秒后自动消失
let timer = null;
function setMsgText(domObj, str) {
  domObj.text(str);
  if (timer) clearTimeout(timer);

  timer = setTimeout(() => {
    domObj.text("");
  }, 5000);
}

$(() => {
  let bg = chrome.extension.getBackgroundPage();

  // 上传酒店信息
  let textBox = $("#syncHotelMsg");
  $("#syncHotelInfo").click(e => {
    sendMessageToContentScript(
      { click: true, msg: "上传酒店信息！" },
      response => {
        console.log(response);
        // if (response === undefined) {
        //   setMsgText(textBox, "插件未正常运行，请进入指定页面，并刷新页面！");
        // }
      }
    );
  });

  // 同步登陆信息
  let iscanClick = true;
  let loginMsgDom = $("#syncLoginMsg");
  $("#syncLoginInfo").click(e => {
    if (iscanClick) {
      iscanClick = false;

      getCurrentTabId(tab => {
        // 发送消息到平台页面获取登陆名
        chrome.tabs.sendMessage(
          tab.id,
          {
            isGetLogin: true
          },
          obj => {
            // 判断插件是否正常运行
            if (obj === undefined) {
              setMsgText(
                loginMsgDom,
                "插件未正常运行，请进入指定页面，并刷新页面！"
              );
              iscanClick = true;
              return;
            }
            // 判断登陆名是否为空
            if (!obj || !obj.loginName) {
              setMsgText(
                loginMsgDom,
                "获取当前页面登陆用户名失败，请重新登陆！"
              );
              iscanClick = true;
              return;
            }

            // 判断操作是否在指定页面
            if (bg.getDomainConfig(tab.url)) {
              console.log(obj);
              // 发送登陆信息到后台
              bg.postCookies(obj).then(
                r => {
                  iscanClick = true;
                  if (r.code === "200")
                    setMsgText(loginMsgDom, "同步登陆信息成功！");
                  else setMsgText(loginMsgDom, `上传失败！${r.msg}`);
                },
                e => {
                  iscanClick = true;
                  setMsgText(loginMsgDom, `上传失败！${JSON.stringify(e)}`);
                }
              );
            } else {
              setMsgText(loginMsgDom, "请到指定页面获取登陆信息！");
            }
          }
        );
      });
    }
  });
});
