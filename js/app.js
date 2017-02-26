// scripts.js
// OGÓLNA FUNKCJA
var baseUrl = 'https://kodilla.com/pl/bootcamp-api';
var myHeaders = {
    'X-Client-Id': '1560',
    'X-Auth-Token': '99094b3b2924bf4c37e5a2caf1fb679b'
};


$.ajaxSetup({      //umieszczanie naglowkow w kazdym zapytaniu
    headers: myHeaders
});

$.ajax({
    url: baseUrl + '/board',
    method: 'GET',
    success: function(respopnse) {
        setupColumns(respopnse.columns); 
    }
});

function setupColumns(columns) {
    columns.forEach(function (column) {
        var col = new Column(column.id, column.name);  // id. tworzeone przez serv
        board.createColumn(col);  //tworzenie kolumny
        setupCards(col, column.cards);  // do funkcji zostaje przekazana kolumna do ktorej zostana przyczepione karty
    })
}
function setupCards(col, cards) {
    cards.forEach(function (card) {
        var card = new Card(card.id, card.name, card.boodcamp_kanban_column_id);
        col.createCard(card);
    })
}
