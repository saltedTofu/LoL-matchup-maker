const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path');
const fs = require('fs');

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  app.quit();
}

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 1000,
    height: 1200,
    webPreferences: {
      contextIsolation:true,
      nodeIntegration:true,
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  // and load the index.html of the app.
  mainWindow.loadFile(path.join(__dirname, 'index.html'));

  // Open the DevTools.
  //mainWindow.webContents.openDevTools();
  mainWindow.removeMenu();
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

ipcMain.on("makeDirectories", (event) => {
  if(!fs.existsSync("C:\\temp")){
    fs.mkdir("C:\\temp", (err) => {
      if(!err){
        console.log("Directory made")
      } else{
        console.log(err);
      }
    });
  }

  if(!fs.existsSync("C:\\temp\\matchups.json")){
    fs.writeFile("C:\\temp\\matchups.json", JSON.stringify({}, null, 4), (err)=>{
      if(!err){
        console.log("File written")
      } else{
        console.log(err);
      }
    })
  }
})

ipcMain.on("getCooldowns", (event, championName) => {
  const data = JSON.parse(fs.readFileSync(path.join(__dirname,"cooldowns.json")).toString());
  event.sender.send('heresSomeCDs',data[championName])
})

ipcMain.on("getMatchup", (event, playerChampion, enemyChampion) => {
  const data = JSON.parse(fs.readFileSync("C:\\temp\\matchups.json").toString());
  event.sender.send("matchupDelivery", data[playerChampion].matchups[enemyChampion]);
})

ipcMain.on("getPlayerChamps", (event) => {
  const data = Object.keys(JSON.parse(fs.readFileSync("C:\\temp\\matchups.json").toString())).sort();
  event.sender.send("playerChampsDelivery", data)
})

ipcMain.on("getEnemyChamps", (event, playerChampion) => {
  if(!playerChampion){
    return;
  } else{
    const data = JSON.parse(fs.readFileSync("C:\\temp\\matchups.json").toString());
    event.sender.send("enemyChampsDelivery", Object.keys(data[playerChampion].matchups).sort())
  }
})

ipcMain.on("writeMatchup", (event, playerChampion, enemyChampion, notes, difficulty) => {
  const data = JSON.parse(fs.readFileSync("C:\\temp\\matchups.json").toString());
  if(!data[playerChampion]){
    data[playerChampion]={
      matchups:{}
    };
  }
  if(!data[playerChampion].matchups[enemyChampion]){
    data[playerChampion].matchups[enemyChampion] = {
      difficulty:0,
      notes:""
    }
  }
  data[playerChampion].matchups[enemyChampion].difficulty = difficulty;
  data[playerChampion].matchups[enemyChampion].notes = notes;
  console.log(difficulty);

   fs.writeFile("C:\\temp\\matchups.json", JSON.stringify(data, null, 4), (err)=>{
    if(!err){
      console.log("File written")
      event.sender.send("writeMatchupSuccess", Object.keys(data[playerChampion].matchups).sort());
    } else{
      console.log(err);
      event.sender.send("writeMatchupFailure");
    }
  })
})