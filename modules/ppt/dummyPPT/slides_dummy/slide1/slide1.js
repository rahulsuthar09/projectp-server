CORE.slides.slide1 = function () {
	return {

		init: function () {

		},
		createSlide: function (objPPT, slide) {
			let slideData = UTILS.getSlideData(slide);
			objPPT.createSlide(slide, slideData);
		},

		postRender: function () {

		},
		render: function () {
			return (
				`<div class="slide2" style="position:relative;">
				</div>`
			)
		}
	}
}