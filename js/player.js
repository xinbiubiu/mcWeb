// 判断player是否存在

// 通过players.json获取name对应的uuid

// 通过获取到的uuid来获取对应uuid文件夹下的统计数据

// 解析统计数据并写入    $(".main").append();


$(document).ready(function () {
    var name = $('title').text();
    var uuid = null;
    $.get('../players/players.json', function (data, status) {
        if (status != 'success') return;
        for (let i = 0; i < data.length; i++) {
            const player = data[i];
            if (name == player['name']) {
                uuid = player['uuid'];
                break;
            }
        }
        if (!uuid) {
            $(location).attr('href', '/404');
            return;
        }
        PlayerDataParse(name, uuid);
        $('.main h1').text(name);
    })
});

function PlayerDataParse (name, uuid) {
    $.get(`../players/${uuid}/${uuid}.json`, function (data, status) {
        if (status != 'success') return;

        var iron = utn(data['minecraft:iron_ore']) + utn(data['minecraft:deepslate_iron_ore']); //铁
        var redstone = utn(data['minecraft:redstone_ore']) + utn(data['minecraft:deepslate_redstone_ore']); //红石
        var gold = utn(data['minecraft:gold_ore']) + utn(data['minecraft:deepslate_gold_ore']); //金
        var copper = utn(data['minecraft:copper_ore']) + utn(data['minecraft:deepslate_copper_ore']); //铜
        var coal = utn(data['minecraft:coal_ore']) + utn(data['minecraft:deepslate_coal_ore']); //煤
        var lazuli = utn(data['minecraft:lapis_ore']) + utn(data['minecraft:deepslate_lapis_ore']); //青金石
        var emerald = utn(data['minecraft:emerald_ore']) + utn(data['minecraft:deepslate_emerald_ore']); //绿宝石
        var diamond = utn(data['minecraft:diamond_ore']) + utn(data['minecraft:deepslate_diamond_ore']); //钻石
        var netherite = utn(data['minecraft:ancient_debris']); //远古残骸
        var quartz = utn(data['minecraft:nether_quartz_ore']); //下界石英
        var nethergold = utn(data['minecraft:gilded_blackstone']) + utn(data['minecraft:nether_gold_ore']); //下界金矿

        var nametag = $('<ul class="nametag"></ul>');
        var numtag = $('<ul class="numtag"></ul>');
        $('.main').append(nametag, numtag);

        var names = [
                        {
                            "name": "铁",
                            "num": iron
                        },
                        {
                            "name": "红石",
                            "num": redstone
                        },
                        {
                            "name": "金",
                            "num": gold
                        },
                        {
                            "name": "铜",
                            "num": copper
                        },
                        {
                            "name": "煤",
                            "num": coal
                        },
                        {
                            "name": "青金石",
                            "num": lazuli
                        },
                        {
                            "name": "绿宝石",
                            "num": emerald
                        },
                        {
                            "name": "钻石",
                            "num": diamond
                        },
                        {
                            "name": "远古残骸",
                            "num": netherite
                        },
                        {
                            "name": "下界石英",
                            "num": quartz
                        },
                        {
                            "name": "下界金矿",
                            "num": nethergold
                        }
                    ];
        names.sort(function (a, b) {
            return b.num - a.num;
        });
        console.log(names);
        
        for (let i = 0; i < names.length; i++) {
            const name = names[i].name;
            const num = names[i].num;
            let namelist = $(`<li class="namelist"></li>`).text(name);
            let numlist = $(`<li class="numlist"></li>`).text(num);
            $('.main .nametag').append(namelist);
            $('.main .numtag').append(numlist);
        }
    })
}

function utn (a) {
    if (a == undefined || a == null) {
        return 0;
    } else {
        return a;
    }
}