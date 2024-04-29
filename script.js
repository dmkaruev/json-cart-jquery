$(document).ready(function() {
	var nameArray = {
		"1" : {
			"status" : 0,
			"name" : "Товар 1",
			"description" : "Описание",
			"price" : "1000"
		}, 
		"2" : {
			"status" : 0,
			"name" : "Товар 2",
			"description" : "Описание",
			"price" : "800"
		}, 
		"3" : {
			"status" : 0,
			"name" : "Товар 3",
			"description" : "Описание",
			"price" : "200"
		}, 
		"4" : {
			"status" : 0,
			"name" : "Товар 4",
			"description" : "Описание",
			"price" : "500"
		}, 
		"5" : {
			"status" : 0,
			"name" : "Товар 5",
			"description" : "Описание",
			"price" : "100"
		}
	};
	var application = function(cardLayer, shopLayer) {
		var card = [];
		var self = this;

		this.refreshCard = function() {
			var summ = 0;
			var result = [];
			$(cardLayer).empty();
			$(cardLayer).append('<ul>');
			$(cardLayer).find('ul').append(function() {
				card.forEach(function(item, i, card) {
					result.push("<li>" + nameArray[item]['name'] + " : " + nameArray[item]['price'] + " руб." + "</li>");
					summ +=parseInt(nameArray[item]['price']);
				});
				return result;
			});
			$(cardLayer).find('ul').append('<li>Итого: ' + summ + ' руб.' + '</li>');
			console.log(nameArray);
		}

		this.cardControl = function(addItem) {
			if(card.indexOf(addItem) != -1) {
				card.splice(card.indexOf(addItem), 1);
			}
			else {
				card.push(addItem);
			}
			self.refreshCard();
		}

		this.render = function(array) {
			var thisRender = this;
			$(shopLayer).empty();
			$(shopLayer).append($('<ul>').addClass('priceList'));
			for(var key in array) {
				$(shopLayer).find('ul').append(
					$('<li>')
					.addClass('item')
					.append(
						$('<div>')
						.html(array[key]['name'])
					)
					.append(
						$('<div>')
						.html(array[key]['price'] + " руб.")
						.addClass('price')
					)
					.append(
						$('<div>')
						.html(array[key]['description'])
						.addClass('description')
					)
					.append(
						$('<input>')
						.attr('data-id', key)
						.attr('data-status', array[key]['status'])
						.attr('type', 'button')
						.attr('value', 'Купить')
						.on('click', function() {
							if($(this).attr('data-status') == 0) {
								buyStatus = 1;
							}
							else {
								buyStatus = 0;
							}
							nameArray[$(this).attr('data-id')]['status'] = buyStatus;
							self.cardControl($(this).attr('data-id'));
							thisRender.render(nameArray);
						})
						.attr('value', function() {
							if($(this).attr('data-status') == 0) {
								return "Купить";
							}
							else {
								return "Удалить";
							}
						})
					)
				);
			}
		}
	}
	var app = new application('#card', '#calc');
	app.render(nameArray);
});