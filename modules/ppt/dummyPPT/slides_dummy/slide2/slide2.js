
CORE.slides.slide2 = function () {

	return {


		init: function () {

		},
		createSlide: function (objPPT, slide) {

            objPPT.createSlide(slide, {});

		},

		postRender: function () {

		},
		render: function () {
			return (
				`<table class='' id = 'mainTable' border="0" cellpadding="0" cellspacing="0" width="1180" style="width:904px;border-collapse:collapse;font-size: 10px;font-family:Roboto;">
				<thead></thead>
				<tbody></tbody></table>
        	    `
			)
		}

	}
}