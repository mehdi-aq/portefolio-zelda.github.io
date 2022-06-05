window.addEventListener('DOMContentLoaded', main);

class Slider {
	html;
	images = [];
	index = 0;

	constructor() {
		var buttons = [];
		
		this.html = $('#slider');
		buttons = this.html.find('button').map((i, e) => $(e));
		buttons[1].click(this.prev.bind(this));
		buttons[2].click(this.next.bind(this));
		this.images = $('.in-slider').map((i, e) => $(e));
		this.images.each((i, e) => e.click(this.open.bind(this, i, e)));
	}

	open(index, image) {
		var finalPosition = {
			top: 0,
			left: 0
		};

		$('body').css('overflow', 'hidden');
		this.index = index;
		this.update();
		this.html.show();
		finalPosition = {
			top: $(window).height() / 2 - this.html.height() / 2,
			left: $(window).width() / 2 - this.html.width() / 2
		}
		this.html.width(image.width());
		this.html.height(image.height());
		this.html.offset(image.offset());

		this.html.animate({
			width: '95%',
			height: '95%',
			left: position.left,
			top: position.top
		}, 300);
	}

	close(image) {
		var originSize = {
			w: this.html.width(),
			h: this.html.height(),
		};
		var finalSize = {
			w: image.width() * 0.20,
			h: image.height() * 0.20,
		};
		var finalPos = {
			y: ( image.offset().top - $(window).scrollTop() ) + image.height() / 2 - finalSize.h,
			x: image.offset().left + image.width() / 2 -  finalSize.w,
		};

		$('body').css('overflow', 'auto');
		
		this.html.animate({
			width: finalSize.w,
			height: finalSize.h,
			top: finalPos.y,
			left: finalPos.x
		}, {
			duration: 400,
			done: () => {
				this.html.hide();
				this.html.width(originSize.w);
				this.html.height(originSize.h);
			}
		});
	}

	prev() {
		if (this.index > 0) {
			this.index --;
		}
		else {
			this.index = this.images.length - 1;
		}
		this.update();
	}

	next() {
		if (this.index < this.images.length - 1) {
			this.index ++;
		}
		else {
			this.index = 0;
		}
		this.update();
	}

	update() {
		this.html.css('background-image', 'url(' + this.images[this.index].attr('src') + ')');
		$('#cross').off('click');
		$('#cross').click(this.close.bind(this, this.images[this.index]));
	}
};

function main() {
	var slider = new Slider();
}