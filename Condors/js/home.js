"use strict";
const $$ = function (selector) {
	return document.querySelector(selector);
};

// carousel plugin
$(document).ready(function () {
	// change images for mobile version
	heroImageChange();
	// bxSlider plugin
	$('.slider').bxSlider(
		{
			touchEnabled: false,
			pager: false,
			// auto: true,
			speed: 2500,
			easing: 'ease-in-out',
		}
	);
	// get the banner height
	const heroHeight = document.querySelector(".bx-wrapper").offsetHeight;
	// $("#hero").height(heroHeight);
	document.getElementById("hero").style.height = `${heroHeight}px`;
	// apply ids to next buttons
	const nextButtons = document.querySelectorAll(".bx-next");
	for (let i = 0; i < nextButtons.length; i++) {
		let buttonIndex = [2, 1, 0];
		let idIndex = ["next-1", "next-2", "next-3"];
		nextButtons[buttonIndex[i]].setAttribute("id", idIndex[i]);
	};
	// set difftime
	setInterval(function () {
		$$("#next-2").click();
	}, 5000);
	setInterval(function () {
		setTimeout(() => $$("#next-1").click(), 100);
	}, 5000);
	setInterval(function () {
		setTimeout(() => $$("#next-3").click(), 250);
	}, 5000);
});
// set height for banner section because three are position:absolute
window.addEventListener("resize", () => {
	// set height for hero banner
	const heroHeight = document.querySelector(".bx-wrapper").offsetHeight;
	document.getElementById("hero").style.height = `${heroHeight}px`;
	// change images for mobile version
	heroImageChange();
});

// imfinite carousel
function imfiniteCarousel(container1, container2, animation) {
	// image's height
	const imgHeight = $(">ul>li:first-of-type", container1).outerHeight(false);
	// original container's width
	let originalWidth = 0;
	$(">ul>li", container1).each(function () {
		originalWidth += $(this).outerWidth(false);
	});
	// visible images count in viewport
	let visibleImgCount = $(container1).width() / $(">ul>li:first-of-type", container1).outerWidth(false);
	visibleImgCount = Math.ceil(visibleImgCount);
	// attach images to the tail
	$(">ul>li", container1).slice(0, visibleImgCount).clone().appendTo($(">ul", container1));
	$(">ul>li", container2).slice(0, visibleImgCount).clone().appendTo($(">ul", container2));
	// get width for animation
	let animationWidth = 0;
	$(">ul>li", container1).each(function () {
		animationWidth += $(this).outerWidth(false);
	});
	// set new width and height to the two
	$(">ul", container1).css({ "width": `${animationWidth}px`, "height": `${imgHeight}px` });
	$(">ul", container2).css({ "width": `${animationWidth}px`, "height": `${imgHeight}px` });
	// decide speed for the two
	const imgCount = $(">ul>li", container1).length;
	const speed1 = imgCount * 3;
	const speed2 = imgCount * 4;
	// set animation to html
	$(`<style>@keyframes ${animation} {0% {left: 0;} 100% {left: -${originalWidth}px;}}</style>`).appendTo("head");
	$(`${container1}>ul`).css("animation", `${animation} ${speed1}s linear infinite`);
	$(`${container2}>ul`).css("animation", `${animation} ${speed2}s linear infinite`);
	// hover to pause
	$(`${container1}>ul`).hover(function () {
		$(this).css("animation-play-state", "paused");
	}, function () {
		$(this).css("animation-play-state", "running");
	});
	$(`${container2}>ul`).hover(function () {
		$(this).css("animation-play-state", "paused");
	}, function () {
		$(this).css("animation-play-state", "running");
	});
};
// start the infinite carousels
$(window).on("load", function () {
	imfiniteCarousel(".infinite-carousel-1", ".infinite-carousel-2", "smoothscroll");
});

// scroll to show images
const allImages = document.querySelectorAll(".img-hide");
const allTexts = document.querySelectorAll(".text-hide");
function scrollToShow() {
	// the height of a viewport's content area
	const windowInnerHeight = window.innerHeight;
	// images to show
	allImages.forEach(function (item) {
		// the image position's top to viewport's top
		const imgToWindowTop = parseInt(item.getBoundingClientRect().top);

		// const windowInnerHeight = window.innerHeight;
		// calculate the image's position toward viewport
		const imgToWindowBottom = imgToWindowTop - windowInnerHeight;
		if (imgToWindowBottom < -200) {
			item.classList.add("img-show");
		}
		if (imgToWindowBottom > 100) {
			item.classList.remove("img-show");
		}
	});
	// text to show
	allTexts.forEach(function (item) {
		// the image position's top to viewport's top
		const textToWindowTop = parseInt(item.getBoundingClientRect().top);
		// calculate the image's position toward viewport
		const textToWindowBottom = textToWindowTop - windowInnerHeight;
		if (textToWindowBottom < -100) {
			item.classList.add("text-show");
		}
		if (textToWindowBottom > 100) {
			item.classList.remove("text-show");
		}
	});
};
window.addEventListener("scroll", scrollToShow);

// change hero images for mobile view
function heroImageChange() {
	// get inner window width
	const windowInnerWidth = window.innerWidth;
	// array for all images
	const allHeroImage1 = document.querySelectorAll("#slider-1 img");
	const allHeroImage2 = document.querySelectorAll("#slider-2 img");
	const allHeroImage3 = document.querySelectorAll("#slider-3 img");
	const allHeroImage = [allHeroImage1, allHeroImage2, allHeroImage3];
	// replace images when in mobile view
	if (windowInnerWidth < 768) {
		for (let i = 0; i < 3; i++) {
			for (let j = 0; j < allHeroImage[i].length; j++) {
				let imgAlt = allHeroImage[i][j].getAttribute("alt");
				allHeroImage[i][j].setAttribute("src", imgAlt);
				allHeroImage[i][j].style.height = windowInnerWidth + "px";
				allHeroImage[i][j].style.width = windowInnerWidth + "px";
			};
		}
	}
}


