const sliderObj = new HandleSlideBlock();

setTimeout(() => {
	let sliderDom = document.getElementById('yodaBox');
	if (sliderDom) {
		sliderObj.init();
		sliderObj.handleSlider();
	}
}, 3000);
