
function playersInit() {

    $.get('../players/players.json', function (data, status) {
        //console.log(status + '\n');
        //console.log(data);
        if (status != 'success') return;
        for (let i = 0; i < data.length; i++) {
            const player = data[i];
            insertElement(player['name'], player['uuid']);
        }
    })
}

function insertElement(name, uuid) {

    var nameDiv = $(`<a href="/players/${name}" class="nameTag" type="button"></a>`).text(name);
    $('.main').append(nameDiv);

    
}

$(document).ready(function () {
    playersInit()

    
});