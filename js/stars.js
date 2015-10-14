

// Хак убирающий выделение нужного элемента см. (*) ниже
$.fn.extend({ 
    disableSelection: function() { 
        this.each(function() { 
            if (typeof this.onselectstart != 'undefined') {
                this.onselectstart = function() { return false; };
            } else if (typeof this.style.MozUserSelect != 'undefined') {
                this.style.MozUserSelect = 'none';
            } else {
                this.onmousedown = function() { return false; };
            }
        }); 
    } 
});

$('*').disableSelection(); 
$(document).ready(function(){
	
	var galaxy = [];
	function Star(obj) {
		this.pos = obj.pos;
		this.name = obj.id;
	}
	Star.prototype.getStarPos = function() {
		return { x: this.pos.x , y: this.pos.y};
	}
	Star.prototype.getName = function() {
		return this.name;
	}
	function getRandomInt(min, max) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}
	function setStars(num) {
		var i, j, MAX = {x : 470, y : 330}, MIN = {x : 20, y : 20},obj = {};
		galaxy = [];
		for (i = 0, j = num; i < j; i += 1 ) {
			 obj.pos = {x: getRandomInt(MIN.x, MAX.x)-5, y: getRandomInt(MIN.y, MAX.y)-5 };
			 obj.id = "Star_" + (i+1);
			 var star = new Star(obj);
			galaxy.push(star);
		}
// 		return galaxy;
	}
	
	function searchStarInGalaxy(pos) {
		// Поиск объекта с заданными координатами в массиве galaxy
		var ind = -1; 
		galaxy.forEach(function(item, i, arr) {
				if (arr[i].pos.x === pos.x && arr[i].pos.y === pos.y){
					ind = i;
				}	
		});
		return ind;
	}
	function searchElementInDOM(pos, cls) {
		// Поиск DIV.star с заданными координатами в DOM
		var el;
		$('.star').each(function(){
			if (pos.x === parseInt($(this).css('left')) && pos.y === parseInt($(this).css('top')) ) {
				el = $(this);
			}
		});
		el.addClass(cls);
	}
	function getDistance(pos1, pos2 ) {
		// Возвращаем дистанцию между pos1 и pos2
		var distance = Math.sqrt((Math.pow((pos2.x - pos1.x), 2) + Math.pow((pos2.y - pos1.y), 2)));
		return distance;
	}
	function minDistance(el) {
		//  Возвращаем минимальную дистанцию для звезды с координатами pos
		var pos = getPos(el);
		var minDistance, obj = {};
		galaxy.forEach(function(item, i, arr) {
			if (!(arr[i].pos.x === pos.x && arr[i].pos.y === pos.y)){
				var distance = getDistance(pos, arr[i].pos);
				if (!minDistance) {
					minDistance = distance;
					obj = {min: minDistance, obj: arr[i]}
				} else {
					if ( distance < minDistance) {
						minDistance = distance;
						obj = {min: minDistance, obj: arr[i]}
					}
				}
			}	
		});
		return obj;
	}
	function maxDistance(distance) {
		var dist = distance*2;
		return dist;
	}
	function getNeighbors(el, min){
		var maxDist = maxDistance(min),
			pos = getPos(el),
			minDist = min,
			countNeighbors = 0;

		galaxy.forEach(function(item, i, arr) {
			if (!(arr[i].pos.x === pos.x && arr[i].pos.y === pos.y)){
				 var distance = getDistance(pos, arr[i].pos );
				 if (distance !== minDist && distance <= maxDist) {
				 	searchElementInDOM(arr[i].pos, 'neighbors');
				 	countNeighbors += 1;
				 }
			}
			
		});
		return (countNeighbors + 1);
	}
	
	function createStar(pos) {
		var x = pos.x+'px', y = pos.y+'px';
		var newStar = $('<div />').attr('class','star').css({'top': y, 'left': x });
		 return newStar;
	};
	$('.hintBtn').click(function(){
		$('.hintBtn').toggleClass('on');
	})
	$('.btn').click(function(){
		var inpVal = parseInt($('.inp').val()), starMap = $('.starMap');
		if (inpVal <= 1000) {
			starMap.children('*').remove();
			setStars(inpVal);
			var map = $('<div/>').attr('class','content');		
			for (var i = 0, j = galaxy.length; i < j; i += 1){
				var elem = createStar(galaxy[i].getStarPos());
/*
				var idStar = galaxy[i].getName();
				elem.attr('id',idStar);
*/
				map.append(elem);
			}
			starMap.append(map);
		}	else {
			$('.inp').val('');
		}
	});
	function getPos(el) {
		var pos = {y: parseInt($(el).css('top')), x: parseInt($(el).css('left'))};
		return pos;
	};
	$(this).mouseover(function(e){
		var el = e.target;
		if(el.className === 'star'){
			var pos = getPos(el),
				ind = searchStarInGalaxy(pos);
				if (ind > -1){
					var popX = (pos.x+20);
					if (pos.x > 273) {
						if (galaxy[ind].name.length >= 7){
						popX = (pos.x - 205);
						}
						if (galaxy[ind].name.length < 7){
						popX = (pos.x - 200);
						}
					}
					var popUp = $('<div />').attr('class','popUp').css({'top':  (pos.y-20)+'px','left':  popX +'px'}).html(galaxy[ind].name + ' x: ' + galaxy[ind].pos.x + ' y: '+ pos.y),
						starMap = $('.starMap');
						
						if ($('.hintBtn').hasClass('on')){ // Если кнопка "?".hintBtn содержит класс "on" 
							starMap.append(popUp);
						}
				}; 
		};
	});
	$(this).mouseout(function(e){
		var el = e.target;
		if(el.className === 'star'){
			$('.popUp').remove();
			$('.glow').removeClass('glow');
			$('.neighbors').removeClass('neighbors');
		}
	});
	
	$(this).click(function(e){
		var el = e.target;
		if(el.className === 'star'){
			if (!$('.popUp').hasClass('off')) {
				$('.popUp').addClass('off');
				var obj =  minDistance( el);
				
				searchElementInDOM(obj.obj.pos, 'glow');
				
				var neighbors = getNeighbors(el, obj.min);
				
				
				var popUp = $('.popUp').html();
				popUp += '<br/><hr/>Радиус:<br /><br />' + obj.min +'<br /><hr />Колличество соседей:<br /><br />'+ neighbors;
				$('.popUp').html( popUp );
			};
		};
		
	});


});	