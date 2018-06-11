
$(function() {

	let white = '#FAFAFA';
	let black = '#2F2F2F'
	let purple = '#D8B1FF';
	let yellow = '#FADB74';
	let blue = '#AFCAF8';
	let red = '#FF8C8C';
	let green = '#A2EBDA';

	let firstWork = 'icarus';
	let secondWork = 'uxtra';
	let thirdWork = 'balls&boxes'

	var view = 'home';

	// Full Navigation for Left Button
	$('#left-nav').click(function() {
		switch(view) {
			case 'home':
				goToResume();
				break;
			default:
				goHome();
		}
	});

	// Full Navigation for Right Button
	$('#right-nav').click(function() {
		switch(view) {
			case 'resume':
				goHome();
				break;
			default:
				goToWorks();
		}
	});

	// Go to First Work
	$('#fstWork').click(function() {
		goFirst();
	});

	// Go to Second Work
	$('#sndWork').click(function() {
		goSecond();
	});

	// Go to Third Work
	$('#trdWork').click(function() {
		goThird();
	});

	// Things that have to happen when we go home
	function goHome() {
		$('#title h1').text('william hong');
		$('#page-home').show();

		animatePage('home', view);

		if (view != 'home') {
			setTimeout(function() {
				$('#page-resume').hide();
				$('#page-works').hide();
				$('#page-project').hide();

				$('.page').removeClass().addClass('page');
			}, 950);	
		}
		
		view = 'home';

		$('#title-cap').hide();
		$('#social-group').show();
		$('.highlight span').css('background-color', purple);

		$('#left-nav').css('visibility', 'visible');
		$('#right-nav').css('visibility', 'visible');
		$('#left-nav span').text('resume');
		$('#right-nav span').text('works');

		$('#flatbox *').css('background-color', black);
		$('.home-box').css('background-color', purple);

		resetAnimations();
		hideProjs();
		highlight('#page-home');
	}

	// Things that have to happen when we go to the resume
	function goToResume() {
		$('#title h1').text('resume');
		$('#page-resume').show();

		animatePage('resume', view);
		setTimeout(function() {
			$('#page-home').hide();
			$('#page-works').hide();
			$('#page-project').hide();

			$('.page').removeClass().addClass('page');
		}, 950);

		view = 'resume';

		$('#title-cap').show();
		$('#title-cap').css('left', ($('#title').width() + 64) + 'px');
		$('#title-cap').css('top', ($('#title').height() - 24) + 'px');

		$('#social-group').hide();
		$('.highlight span').css('background-color', blue);

		$('#left-nav').css('visibility', 'hidden');
		$('#right-nav').css('visibility', 'visible');
		$('#right-nav span').text('back');

		$('#flatbox *').css('background-color', black);
		$('.resume-box').css('background-color', blue);

		resetAnimations();
		hideProjs();
		highlight('#page-resume');
	}

	// Things that have to happen when we go to works
	function goToWorks() {
		$('#title h1').text('works');
		$('#page-works').show();

		animatePage('works', view);
		setTimeout(function() {
			$('#page-home').hide();
			$('#page-resume').hide();
			$('#page-project').hide();

			$('.page').removeClass().addClass('page');
		}, 950);

		view = 'works';
		
		$('#title-cap').hide();
		$('#social-group').hide();
		$('.highlight span').css('background-color', blue);

		$('#left-nav').css('visibility', 'visible');
		$('#right-nav').css('visibility', 'hidden');
		$('#left-nav span').text('back');

		$('#flatbox *').css('background-color', black);
		$('.works-box').css('background-color', blue);

		resetAnimations();
		hideProjs();
		highlight('#page-works');
	}

	// Things that have to happen when we go to the project page
	function goToProject(proj) {
		$('#page-project').show();

		animatePage(proj, view);
		view = proj;

		setTimeout(function() {
			$('#page-home').hide();
			$('#page-resume').hide();
			$('#page-works').hide();

			$('.page').removeClass().addClass('page');
		}, 950);
		
		$('#title-cap').hide();
		$('#social-group').show();

		$('#left-nav').css('visibility', 'visible');
		$('#right-nav').css('visibility', 'visible');
		$('#left-nav span').text('home');
		$('#right-nav span').text('back');

		highlight('#page-project');
	}

	// Things that have to happen when we go to the first project
	function goFirst() {
		$('#title h1').text(firstWork);
		$('.highlight span').css('background-color', yellow);
		$('.project-btn').css('background-color', yellow);

		hideProjs();

		$('#fstImgs').show();
		$('#fstDesc').show();

		$('#left-nav i').css('transform', 'rotate('+ -45 + 'deg)');
		$('#left-nav').removeClass().addClass('nav-btn blip-left-down');

		$('#right-nav i').css('transform', 'rotate('+ 90 + 'deg)');
		$('#right-nav').removeClass().addClass('nav-btn blip-down');

		$('#flatbox *').css('background-color', black);
		$('.fst-box').css('background-color', yellow);

		goToProject('fst');
	}

	// Things that have to happen when we go to the second project
	function goSecond() {
		$('#title h1').text(secondWork);
		$('.highlight span').css('background-color', green);
		$('.project-btn').css('background-color', green);

		hideProjs();

		$('#sndImgs').show();
		$('#sndDesc').show();

		$('#left-nav i').css('transform', 'rotate('+ 0 + 'deg)');
		$('#left-nav').removeClass().addClass('nav-btn blip-left');

		$('#right-nav i').css('transform', 'rotate('+ 180 + 'deg)');
		$('#right-nav').removeClass().addClass('nav-btn blip-left-rotate');

		$('#flatbox *').css('background-color', black);
		$('.snd-box').css('background-color', green);

		goToProject('snd');
	}

	// Things that have to happen when we go to the third project
	function goThird() {
		$('#title h1').text(thirdWork);
		$('.highlight span').css('background-color', red);
		$('.project-btn').css('background-color', red);

		hideProjs();

		$('#trdImgs').show();
		$('#trdDesc').show();

		$('#left-nav i').css('transform', 'rotate('+ 45 + 'deg)');
		$('#left-nav').removeClass().addClass('nav-btn blip-left-up');

		$('#right-nav i').css('transform', 'rotate('+ -90 + 'deg)');
		$('#right-nav').removeClass().addClass('nav-btn blip-up');

		$('#flatbox *').css('background-color', black);
		$('.trd-box').css('background-color', red);

		goToProject('trd');
	}

	// Hides everything to do with projects
	function hideProjs() {
		$('#fstImgs').hide();
		$('#sndImgs').hide();
		$('#trdImgs').hide();

		$('#fstDesc').hide();
		$('#sndDesc').hide();
		$('#trdDesc').hide();
	}

	function resetAnimations() {
		$('#left-nav i').css('transform', 'rotate('+ 0 + 'deg)');
		$('#left-nav').removeClass().addClass('nav-btn blip-left');

		$('#right-nav i').css('transform', 'rotate('+ 0 + 'deg)');
		$('#right-nav').removeClass().addClass('nav-btn blip-right');
	}

	// Function to determine which animation to play. Eww
	function animatePage(enter, exit) {
		switch(enter) {
			case 'resume':
				if (exit == 'home') {
					slideLeftToRight('resume', 'home');
				} break;
			case 'works':
				if (exit == 'home') {
					slideRightToLeft('works', 'home');
				} else if (exit == 'fst') {
					slideBotToTop('works', 'project');
				} else if (exit == 'snd') {
					slideLeftToRight('works', 'project');
				} else if (exit == 'trd') {
					slideTopToBot('works', 'project');
				} break;
			case 'fst':
				if (exit == 'works') {
					slideTopToBot('project', 'works');
				} break;
			case 'snd':
				if (exit == 'works') {
					slideRightToLeft('project', 'works');
				} break;
			case 'trd':
				if (exit == 'works') {
					slideBotToTop('project', 'works');
				} break;
			default:
				if (exit == 'resume') {
					slideRightToLeft('home', 'resume');
				} else if (exit == 'works') {
					slideLeftToRight('home', 'works');
				} else if (exit == 'fst') {
					slideDiagonalFromTop('home', 'project');
				} else if (exit == 'snd') {
					slideLeftTwice('home', 'project');
				} else if (exit == 'trd') {
					slideDiagonalFromBot('home', 'project');
				} break;
 		}
	}

	function slideLeftToRight(enter, exit) {
		$('#page-' + enter).addClass('slideEnterLeft');
		$('#page-' + exit).addClass('slideExitRight');
	}

	function slideRightToLeft(enter, exit) {
		$('#page-' + enter).addClass('slideEnterRight');
		$('#page-' + exit).addClass('slideExitLeft');
	}

	function slideTopToBot(enter, exit) {
		$('#page-' + enter).addClass('slideEnterTop');
		$('#page-' + exit).addClass('slideExitBot');
	}

	function slideBotToTop(enter, exit) {
		$('#page-' + enter).addClass('slideEnterBot');
		$('#page-' + exit).addClass('slideExitTop');
	}

	function slideDiagonalFromTop(enter, exit) {
		$('#page-' + enter).addClass('slideDiagonalEnterSW');
		$('#page-' + exit).addClass('slideDiagonalExitNE');
	}

	function slideDiagonalFromBot(enter, exit) {
		$('#page-' + enter).addClass('slideDiagonalEnterNW');
		$('#page-' + exit).addClass('slideDiagonalExitSE');
	}

	function slideLeftTwice(enter, exit) {
		slideLeftToRight('works', 'snd');
		slideLeftToRight('home', 'works');
	}

	// Highlights stuff in the entire document once
	function highlight(page) {
		$(page + ' .highlight, #title').each(function() {
			$(this).children('span').css('width', ($(this).children('h1, h3, b').width() + 6) + 'px');
			$(this).children('span').css('top', (Math.random() * 7 + 5) + 'px');
			$(this).children('span').css('height', (Math.random() * $(this).children('h1, h3, b').height() / 2 + $(this).children('h1, h3, b').height() / 3) + 'px');
		});
	}

	// Initialization function.
	function init() {
		$('#page-resume').hide();
		$('#page-works').hide();
		$('#page-project').hide();
		goHome();
	}

	init();

});
