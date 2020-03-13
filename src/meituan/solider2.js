class HandleSlideBlock {
  constructor(x, y) {
    this.sliderElemId = 'yodaBox';
    this.warpElemKeyId = 'yodaBoxWrapper';
    this.sliderDom = undefined;
    this.startX = 0;
    this.startY = 0;
    this.totalXLen = 100;
    this.totalYLen = 20;
  }

  // 初始化操作
  init() {
    const sliderElem = document.getElementById(this.sliderElemId);
    const sliderWrapElem = document.getElementById(this.warpElemKeyId);

    let sliderWrapObj = sliderWrapElem.getBoundingClientRect();
    let sliderObj = sliderElem.getBoundingClientRect();

    // 滑块dome
    this.sliderDom = sliderElem;

    // 滑块信息
    this.startX = sliderObj.left;
    this.startY = sliderObj.top;

    // 滑动区域信息
    this.totalXLen = sliderWrapObj.width - sliderObj.width;
    // this.totalXLen = 120;
    this.totalYLen = sliderObj.width - 2;

    console.log(this.startX, this.startY, this.totalXLen, this.totalYLen);
  }

  // type:鼠标事件类型；
  createEventFun(type, x, y) {
    var eventT = new MouseEvent(type, {
      screenX: x,
      screenY: y,
      clientX: x,
      clientY: y
    });
    return new Promise((resolve, reject) => {
      // setTimeout(() => {
      document.getElementById(this.sliderElemId).dispatchEvent(eventT);
      resolve(true);
      // }, Math.random() * 10);
    });
  }

  // 分步滑动鼠标：distanceX： x轴距离；distanceY： Y轴距离；step分几步
  async moveDistance(distanceX, distanceY, step) {
    const _sefXY = document
      .getElementById(this.sliderElemId)
      .getBoundingClientRect();

    let startX = _sefXY.left;
    let startY = _sefXY.top;
    let stepXLen = distanceX / step;
    let stepYLen = distanceY / step;

    for (let i = 1; i <= step; i++) {
      let movex = i * stepXLen;
      let moveY = i * stepYLen;
      await this.createEventFun('mousemove', startX + movex, startY + moveY);
    }
  }

  // 设置等待时间
  moveWait(delay = Math.random() * 400) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(true);
      }, delay);
    });
  }

  // 模拟人为鼠标滑动操作
  async silderMove() {
    const { totalXLen, totalYLen } = this;
    console.log(totalXLen, totalYLen);

    await this.moveDistance(totalXLen / 2, 0, 2);
    await this.moveWait();
    await this.moveDistance(totalXLen / 4, totalYLen, 5);
    await this.moveWait();
    await this.moveDistance(totalXLen / 4, -totalYLen, 5);
    await this.moveWait();
    await this.moveDistance((totalXLen / 8) * 3, 0, 8);
  }

  // 滑动滑块
  async handleSlider() {
    await this.createEventFun('mousedown', this.startX, this.startY);
    await this.silderMove();
  }
}
