window.Cal = {
  // 两个浮点数求和
  accAdd: function(num1, num2) {
    let r1;
    let r2;
    let m;

    try {
      r1 = num1.toString().split('.')[1].length;
    } catch (e) {
      r1 = 0;
    }
    try {
      r2 = num2.toString().split('.')[1].length;
    } catch (e) {
      r2 = 0;
    }
    m = 10 ** Math.max(r1, r2);

    return Math.round(num1 * m + num2 * m) / m;
  },
  // 两个浮点数相减
  accSub: function(num1, num2) {
    let r1;
    let r2;
    let m;
    let n;
    try {
      r1 = num1.toString().split('.')[1].length;
    } catch (e) {
      r1 = 0;
    }
    try {
      r2 = num2.toString().split('.')[1].length;
    } catch (e) {
      r2 = 0;
    }
    m = 10 ** Math.max(r1, r2);
    n = r1 >= r2 ? r1 : r2;
    return (Math.round(num1 * m - num2 * m) / m).toFixed(n);
  },
  // 两个浮点数相除
  accDiv: function(num1, num2) {
    let t1;
    let t2;
    let r1;
    let r2;
    try {
      t1 = num1.toString().split('.')[1].length;
    } catch (e) {
      t1 = 0;
    }
    try {
      t2 = num2.toString().split('.')[1].length;
    } catch (e) {
      t2 = 0;
    }
    r1 = Number(num1.toString().replace('.', ''));
    r2 = Number(num2.toString().replace('.', ''));
    return (r1 / r2) * 10 ** (t2 - t1);
  },
  // 两个浮点数相乘
  accMul: function(num1, num2) {
    let m = 0;
    let s1 = num1.toString();
    let s2 = num2.toString();

    try {
      m += s1.split('.')[1].length;
    } catch (e) {
      // console.log(e)
    }
    try {
      m += s2.split('.')[1].length;
    } catch (e) {
      // console.log(e)
    }

    return (
      (Number(s1.replace('.', '')) * Number(s2.replace('.', ''))) / 10 ** m
    );
  },

  getProductPrice: function(changeData, payType, isNeedBreekfast = false) {
    if (typeof payType === 'string') {
      payType = payType.toLowerCase();
    }

    if (typeof changeData !== 'object' || !['pre', 'post'].includes(payType)) {
      console.error('参数有误');
    }

    const { isHourly } = changeData;

    let pricekey = '';
    if (isHourly === 1) {
      pricekey = `hourlyPrice`;
    } else {
      pricekey = `${payType}${isNeedBreekfast ? 'Breakfast' : 'Sell'}Price`;
    }
    const price = changeData[pricekey] || 0;
    const rateKey = `${payType}CommissionRate`;
    const rate = changeData[rateKey] || 0;
    const ratePrice = this.accMul(price, this.accDiv(rate, 100));

    return {
      pricekey,
      productPrice: price, // 价格
      productCommissionRate: rate, // 佣金率
      productRatePrice: Number(ratePrice), // 佣金减去的金额
      productFloorPrice: Number(this.accSub(price, ratePrice)) // 佣金后低价
    };
  },

  // 计算价格觉得差值是否在2元内
  isDiffPrice: function(targetPrice, currentPrice = 0) {
    return Math.abs(targetPrice - currentPrice) < 2;
  }
};
