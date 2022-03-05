var fs = require("fs");
const YAML = require("yaml");
const path = require("path/posix");
const JSONStream = require("JSONStream");

const PLAYERS_PATH = path.resolve(__dirname, '../players/');
if(!fs.existsSync(PLAYERS_PATH)) {
    fs.mkdirSync(PLAYERS_PATH);
}
//读取配置文件获得数据路径
try {
    var configBuffer = fs.readFileSync(path.resolve(__dirname, "../config.yml"));
    if (!configBuffer) throw '未找到配置文件';

    var configString = configBuffer.toString();
    var config = YAML.parse(configString);
    const USERCACHE_PATH = config["usercachePath"];
    const STATS_PATH = config["statsDirPath"];

    //console.log('---配置文件读取成功---\n' + USERCACHE_PATH + '\n' + STATS_PATH);
    
    //更新数据
    dataRefresh(USERCACHE_PATH, STATS_PATH);

} catch (error) {
    console.error(error);
}


function dataRefresh (usercachePath, statsPath) {
    

    //复制usercache.json文件到players.json
    var rs = fs.createReadStream(usercachePath);
    if (!rs) throw 'usercachePath路径不存在或usercache.json文件不存在';

    var ws = fs.createWriteStream(path.join(PLAYERS_PATH, 'players.json'));
    rs.pipe(ws);
    ws.on('finish', function () {

        var stream = fs.createReadStream(path.join(PLAYERS_PATH, 'players.json'));
        var parser = JSONStream.parse('.');
        stream.pipe(parser);
        parser.on('data', function (data) {

            //在  ../players/  路径下创建所以uuid文件夹和uuid的stats文件
            let name = data['name'];
            let uuid = data['uuid'];
            let uuidPath = path.join(PLAYERS_PATH, uuid);
            let uuidSourcePath = path.join(statsPath, uuid + '.json');
            if(!fs.existsSync(uuidPath)) {
                fs.mkdirSync(uuidPath);
            }
            let rs = fs.createReadStream(uuidSourcePath);
            if (!rs) throw 'uuidSourcePath路径有误或与uuid相对应的统计信息文件不存在';

            let myParser = JSONStream.parse('stats.minecraft:mined');
            rs.pipe(myParser);
            myParser.on('data', function (data) {
                //取minecraft:mined内容写入文件
                let ws = fs.createWriteStream(path.join(uuidPath, uuid + '.json'));
                ws.write(JSON.stringify(data), function (err) {
                    if(err) {
                        console.error(err);
                    } else {
                        console.log(name + '数据导入成功\n');
                    }
                });
            })
        })
    })
}