//Created by Teodoro Dannemann --->  https://github.com/teo523    
//Credits to Zach Capalbo ---> https://github.com/zach-capalbo/hubs-client-bot


const {HubsBot} = require('./index.js')
const fs = require('fs')
var variable;

class ImportExportBot extends HubsBot {
  constructor({onlyPinned} = {}) {
    super({
      headless: true,
      autoLog: false,
    })
    this.onlyPinned = onlyPinned
  }
  
  //First wait to access the room
  async accessRoom(room) {
    await this.enterRoom(room)
 
    // Wait for network sync. TODO: Add an actual event handler
    await this.page.waitFor(5000);
    

    return this;
  }

  //Get (x,y,z) coordinates of connected avatars
  async exportFromRoom() {
    
 

    let objects = this.evaluate( async function prueba(onlyPinned) {
      var a = "";
      var b = [];

      //array with each gltf model
      objArray = await Array.from(document.querySelectorAll("[gltf-model-plus]"));    
      

      for (let i = 0; i < objArray.length;i++){
        //only user avatars contain the class=model, so we filter them
        if (objArray[i].classList[0]=="model") {
          try {
            a = await NAF.utils.getNetworkedEntity(objArray[i]);
            throw new Error("foo error");
          }
          catch(e) {
            console.log(e);

          }

      }
        //add position coordinates to array b.
        if (objArray[i].classList[0]=="model")
          b.push(a.object3D.position);
      }
      

      if (onlyPinned)
      {
        objArray = objArray.filter(o => o.pinned)
      }

      return JSON.stringify(b)
    }, this.onlyPinned)

    
  
    //console.log(objects);
    return objects
  }

  async importToRoom(room, objects) {
    if (room) await this.enterRoom(room)
    await this.evaluate(() => document.querySelector('*[networked-counter]').setAttribute('networked-counter', {max: 100}))

    for (let obj of objects) {
      obj.fitToBox = true
      this.spawnObject(obj)
    }
  }

//Continuously call exportFromRoom()
 async recursiveCall() {
this.exportFromRoom().then((o) => {process.stdout.write(o); variable = o;}).then(() => this.page.waitFor(500)).then(() =>this.recursiveCall());

}

}




function usage() {
  console.error(`
Usage: node examples/export-bot.js ROOM_URL [--import [JSON_FILE]]
  --import [JSON_FILE] If specified, imports the objects from the given JSON
                       file, otherwise imports from STDIN
  --print              Used with --import. Prints JavaScript code to STDOUT that
                       can be copied to the developer console in a Hubs Room to
                       import the objects
  --only-pinned         Only export pinned objects
**Note**: Currently, when importing without the --print option, the bot must
          remain running and connected to the room, otherwise the objects
          spawned will disappear.
`)
  process.exit(-1)
}

function parseOpts() {
  let args = process.argv.slice(2)
  let opts = {}
  for (let i = 0; i < args.length; i++)
  {
    let arg = args[i]

    if (!arg.startsWith("--"))
    {
      opts.roomUrl = arg
      continue
    }

    switch (arg) {
    case '--import':
      opts.import = true
      if (!(args[i + 1] || "").startsWith('--'))
      {
        opts.jsonFile = args[++i]
      }
      break;
    case '--print':
      opts.print = true
      break
    case '--only-pinned':
      opts.onlyPinned = true
      break
    default:
      usage()
    }
  }

  if ((!opts.import && !opts.roomUrl)
  || (opts.import && !opts.roomUrl && !opts.print))
  {
    usage()
  }

  return opts
}

var express = require('express');



var app = express();
var server = app.listen(process.env.PORT || 3000);
var io = require('socket.io')(server);


app.use(express.static(__dirname + '/public'));

app.get('/', function (req, res) {
    res.sendfile(__dirname + '/public/index.html');
});


io.sockets.on('connection', function (socket) {
    
    var id = socket.id;

    setInterval(() => {
    
    io.emit('message', variable);
}, 10);
    
    console.log('[*] info: new connection ' + socket.id);

});

console.log("hola");

let opts = parseOpts()

if (opts.import)
{
  let objs = JSON.parse(fs.readFileSync(opts.jsonFile ? opts.jsonFile : 0))

  if (opts.print)
  {
    process.stdout.write(new ImportExportBot().asBrowserBot((bot, objs) => {
      bot.importToRoom(undefined, objs)
    }, objs).toString())
    process.exit(0)
  }
  else
  {
    new ImportExportBot().importToRoom(opts.roomUrl, objs)
  }
}
else {
  new ImportExportBot(opts).accessRoom(opts.roomUrl).then((bot) => bot.recursiveCall());
}

setInterval(function(){ process.stdout.write("Wait... "); }, 3000);


