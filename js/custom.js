// custom.js
//here it is looking for every element with slider class attribute and each anonymous function is running

$('.slider').each(function (){
	//$ = jquery variable created
	var $this = $(this);
	var $group = $this.find('.slide-group');
	var $slides = $this.find('.slide');

	//javascript variables
	var buttonArray = [];
	var currentIndex = 0;
	var timeout;


	//move function setting variables (empty)
	function move(newIndex) {
		var animateLeft, slideLeft;
	
		//invoking advance function
		advance();


		//if the slider is animated = moving, stops function (return)
		if($group.is(':animated') || currentIndex === newIndex) {
			return;
		
	}


		buttonArray[currentIndex].removeClass('active');
		buttonArray[newIndex].addClass('active');

		//sliding left to right
		if(newIndex > currentIndex) {
			slideLeft = '100%';
			animateLeft = '-100%';
		//sliding right to left
		}else {
			slideLeft = '-100%';
			animateLeft = '100%';
		}

		$slides.eq(newIndex).css( {left:slideLeft, display: 'block'});
		$group.animate( {left: animateLeft}, function(){
			$slides.eq(currentIndex).css( {display: 'none'});
			$slides.eq(newIndex).css({left: 0});
			$group.css({left: 0});
			currentIndex = newIndex;
		});
	}

function advance() {

	clearTimeout(timeout);

	timeout = setTimeout(function(){
		//if current index is less than the number of slide images, add one to current index
		if(currentIndex < ($slides.length - 1)) {
			move(currentIndex + 1);
		} else {
		//else no addtion to current index
			move(0);
		}
		//duration for interval of slider
	}, 6000);	
}

$.each($slides, function(index) {
	//create a button element for the button on each slide
	var  $button = $('<button type="button" class="slide-btn">&bull;</button>');
	//if the index number of that slide is the same as the number held in the index
	//then active will be applied
	if(index === currentIndex) {
		$button.addClass('active');
	}

	$button.on('click', function(){
		move(index);
	//buttons are added to the button div also the array of buttons
	}).appendTo('.slide-buttons');
	buttonArray.push($button);
	});
	//advance is called to start the slider
	advance();

});