// scripts.js
// Objects
// KANBAN

$(function(){
	function randomString() {
		var chars = '0123456789abcdefghiklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXTZ';
		var str = ''
		var i = 0;
		for(var i = 0; i < 10; i++){
			str += chars[Math.floor(Math.random() * chars.length)];
		}
		return str;
	}

	function Column(name){
		var self = this;
		this.id = randomString();
		this.name = name || "Nowa kolumna";
		this.$element = createColumn();

//Funkcja konst. Kolumne

		function createColumn(){
			var $column = $('<div>').addClass('column');
			var $columnTitle = $('<h2>').addClass('column-title').text(self.name);
			var $columnCardList = $('<ul>').addClass('column-card-list');
			var $columnDelete = $('<button>').addClass('btn-delete').text('X');
			var $columnAddCard = $('<button>').addClass('btn-add').text('Dodaj karte');

			$columnDelete.click(function() {
				self.removeColumn();
			});

			$columnAddCard.click(function() {

				self.addCard(new Card(prompt("Wpisz nazwę karty")));
			});

			$column.append($columnTitle)
					.append($columnDelete)
					.append($columnAddCard)
					.append($columnCardList);

			return $column;
		}

	};
	Column.prototype = {
		addCard: function(card) {
			this.$element.children('ul').append(card.$element);
		},
		removeColumn: function() {
			this.$element.remove();
		}
	};
//Funkcja konst. Karte

	function Card(description) {
		var self = this;
		this.id = randomString();
		this.description = description || "Nowe zadanie";
		this.$element = createCard();


		function createCard() {
			var $card = $('<li>').addClass('card');
			var $cardDescription = $('<p>').addClass('card-description').text(self.description);
			var $cardDelete = $('<button>').addClass('btn-delete').text('X');

			$cardDelete.click(function() {
				self.removeCard();
			});
			//Skladanie karty w calosc
			$card.append($cardDelete)
				.append($cardDescription);

			return $card;
		}

		Card.prototype = {
			removeCard: function() {
				this.$element.remove();
			}
		}
	}

	var board = {
		name: 'Tablica Kanban',
		addColumn: function(column){
			this.$element.append(column.$element);
			initSortable();
		},
		$element: $('#board .column-container')
	};


	//UI

		function initSortable() {
			$('.column-card-list').sortable({
			connectWith: '.column-card-list',
			placeholder: 'card-placeholder'
		}).disableSelection();
	}

	$('.create-column')
		.click(function(){
			var name = prompt("Wpisz nazwe kolumny");
			var column = new Column(name);
			board.addColumn(column);

	});

	// TWORZENIE KOLUMN
	var todoColumn = new Column('Do zrobienia');
	var doingColumn = new Column('W trakcie');
	var doneColumn = new Column('Skończone');

	// DODAWANIE KOLUMN DO TABLICY
	board.addColumn(todoColumn);
	board.addColumn(doingColumn);
	board.addColumn(doneColumn);

	// TWORZENIE NOWYCH EGZEMPLARZY KART
	var card1 = new Card('Nowe zadanie');
	var card2 = new Card('Stworzyc tablice kanban');

	// DODAWANIE KART DO KOLUMN
	todoColumn.addCard(card1);
	doingColumn.addCard(card2);
});

