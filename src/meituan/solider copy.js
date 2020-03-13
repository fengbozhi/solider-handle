function simulateClick() {
  let obj = $('#yodaBox').offset();
  //点击位置为屏幕中间
  var sx = obj.left,
    sy = obj.top,
    cx = sx,
    cy = sy;
  var eventDown = document.createEvent('MouseEvents');
  eventDown.initMouseEvent(
    'mousedown',
    true,
    true,
    window,
    0,
    sx,
    sy,
    cx,
    cy,
    false,
    false,
    false,
    false,
    0,
    null
  );
  var eventMove = document.createEvent('MouseEvents');
  eventMove.initMouseEvent(
    'mousemove',
    true,
    true,
    window,
    0,
    sx + 220,
    sy,
    cx + 220,
    cy,
    false,
    false,
    false,
    false,
    0,
    null
  );
  var eventUp = document.createEvent('MouseEvents');
  eventUp.initMouseEvent(
    'mouseup',
    true,
    true,
    window,
    0,
    sx + 220,
    sy,
    cx + 220,
    cy,
    false,
    false,
    false,
    false,
    0,
    null
  );
  document.getElementById('yodaBox').dispatchEvent(eventDown);
  document.getElementById('yodaBox').dispatchEvent(eventMove);
  document.getElementById('yodaBox').dispatchEvent(eventUp);
}

function createEventFun(type, x, y) {
  var eventT = document.createEvent('MouseEvents');
  eventT.initMouseEvent(
    type,
    true,
    true,
    window,
    0,
    x,
    y,
    x,
    y,
    false,
    false,
    false,
    false,
    0,
    null
  );
  return new Promise((resolve, reject) => {
    // setTimeout(() => {
    document.getElementById('yodaBox').dispatchEvent(eventT);
    resolve(true);
    // }, Math.random() * 10);
  });
}

async function moveDistance(elmKey, distanceX, distanceY, step) {
  const _sefXY = $(elmKey).offset();
  let startX = _sefXY.left;
  let startY = _sefXY.top;
  let stepXLen = distanceX / step;
  let stepYLen = distanceY / step;
  for (let i = 1; i <= step; i++) {
    let movex = i * stepXLen;
    let moveY = i * stepYLen;
    console.log(startX, startY, movex, moveY);
    await createEventFun('mousemove', startX + movex, startY + moveY);
  }
}

function moveWait(delay = Math.random() * 400) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(true);
    }, delay);
  });
}

async function silderMove(len) {
  let elmKey = '#yodaBox';
  let totalXLen = 180;
  let totalYLen = 30;
  // 总长度196
  //
  await moveDistance(elmKey, totalXLen / 2, 0, 2);

  await moveWait();
  await moveDistance(elmKey, totalXLen / 4, totalYLen, 5);
  await moveWait();
  await moveDistance(elmKey, totalXLen / 4, -totalYLen, 5);
  await moveWait();
  await moveDistance(elmKey, (totalXLen / 8) * 3, 0, 8);
}

let obj = $('#yodaBox').offset();
var x = obj.left,
  y = obj.top;
createEventFun('mousedown', x, y);
silderMove();
createEventFun('mouseup', x + 220, y);

function createEventFun(type, x, y) {
  let eventT = document.createEvent('MouseEvents');
  eventT.initMouseEvent(
    type,
    true,
    true,
    window,
    0,
    x,
    y,
    x,
    y,
    false,
    false,
    false,
    false,
    0,
    null
  );
  // document.getElementById('yodaBox').dispatchEvent(eventT);
  return new Promise((resolve, reject) => {
    // setTimeout(() => {
    document.getElementById('yodaBox').dispatchEvent(eventT);
    resolve(true);
    // }, Math.random() * 10);
  });
}

let obj = $('#yodaBox').offset();
var x = obj.left,
  y = obj.top;

async function aa() {
  await createEventFun('mousedown');
  await createEventFun('mousemove', x + 150, y);
}

aa();

let obj = $('#yodaBox').offset();
//点击位置为屏幕中间
var sx = obj.left,
  sy = obj.top;

for (let i = 0; i < 10000; i++) {
  $('.search-btns')
    .find('button')
    .eq(1)
    .click();
}
