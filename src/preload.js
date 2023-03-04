const {ipcRenderer} = require("electron");

document.addEventListener("DOMContentLoaded", () => {

    ipcRenderer.send("makeDirectories");

    let CDButton = document.getElementById("CDButton");
    CDButton.addEventListener("click", ()=>{
        const championName = document.getElementById("championSelect").value;
        ipcRenderer.send("getCooldowns", championName);
    })

    let viewMatchupButton = document.getElementById("getViewMatchup");
    viewMatchupButton.addEventListener("click", ()=>{
        const playerChamp = document.getElementById("playerViewSelect").value;
        const enemyChamp = document.getElementById("enemyViewSelect").value;
        ipcRenderer.send("getMatchup", playerChamp, enemyChamp);
    })

    let loadPlayerChampsButton = document.getElementById("loadPlayerChamps");
    loadPlayerChampsButton.addEventListener("click", ()=>{
        ipcRenderer.send("getPlayerChamps");
    })

    let loadEnemyChampsButton = document.getElementById("loadEnemyChamps");
    loadEnemyChampsButton.addEventListener("click", ()=>{
        const playerChamp = document.getElementById("playerViewSelect").value;
        ipcRenderer.send("getEnemyChamps", playerChamp);
    })

    let writeMatchupButton = document.getElementById('writeMatchupButton');
    writeMatchupButton.addEventListener("click", ()=>{
        const playerChampion = document.getElementById('playerChampionSelect').value;
        const enemyChampion = document.getElementById('enemyChampionSelect').value;
        const notes = document.getElementById("notes").value;
        const difficulty = document.getElementById("difficultySelect").value;
        ipcRenderer.send("writeMatchup", playerChampion, enemyChampion, notes, difficulty);
    })
})

ipcRenderer.on('heresSomeCDs', function (evt, data) {
    document.getElementById("AutoRange").innerHTML = `Auto Range: ${data.autoRange}`;

    const makeStrings = (array) => {
        let result='';
        array.map((cd, i)=>{
            result += cd;
            if(i<array.length-1){
                result += '/';
            }
        })
        return result;
    }
    const hydrateHTML = (data, skillKey, range) => {
        if(data){
            const string = makeStrings(data);
            document.getElementById(skillKey).style.display="block";
            document.getElementById(skillKey).innerHTML = `${skillKey}: ${string}`;
            document.getElementById(`${skillKey}Range`).style.display="block";
            document.getElementById(`${skillKey}Range`).innerHTML = `Range: ${range}`;
        }
        else{
            document.getElementById(skillKey).innerHTML = '';
            document.getElementById(skillKey).style.display='none';
            document.getElementById(`${skillKey}Range`).innerHTML = '';
            document.getElementById(`${skillKey}Range`).style.display='none';
        }
    }
    
    const possibleSkillKeys = ['Q','Q2','W','W2','E','E2','R'];

    possibleSkillKeys.map((skillKey)=>{
        hydrateHTML(data[skillKey], skillKey, data[`${skillKey}Range`]);
    })

    if(data.cooldownNote){
        document.getElementById('cooldownNote').innerHTML=`Note: ${data.cooldownNote}`;
        document.getElementById('cooldownNote').style.display='block';
    } else{
        document.getElementById('cooldownNote').innerHTML='';
        document.getElementById('cooldownNote').style.display='none';
    }
    if(data.passive){
        document.getElementById('passive').innerHTML=`Passive CD: ${data.passive}`;
        document.getElementById('passive').style.display='block';
    } else{
        document.getElementById('passive').innerHTML='';
        document.getElementById('passive').style.display='none';
    }
});

ipcRenderer.on("matchupDelivery", function (evt, data){
    if(data){
        document.getElementById("viewNote").innerHTML = `${data.notes}`;
        document.getElementById("viewDifficulty").innerHTML = `Difficulty: ${data.difficulty}`
    } else{
        alert("Matchup not found, remember to click 'Load Enemies' when switching player champions to update existing matchups.")
    }
})

ipcRenderer.on('writeMatchupSuccess', function (evt, data) {
    alert("Matchup Saved!");
})
ipcRenderer.on('writeMatchupFailure', function (evt, data) {
    alert("Matchup save was unsuccessful, try restarting the app.");
})

ipcRenderer.on("playerChampsDelivery", function (evt, data){
    if(document.getElementById('playerViewSelect')){
        let select = document.getElementById('playerViewSelect')
        let child=select.lastElementChild;
        while(child){
            select.removeChild(child)
            child=select.lastElementChild;
        }
        for(let i=0;i<data.length;i++){
            let option = document.createElement("option");
            option.text=data[i];
            option.value=data[i];
            select.appendChild(option);
        }
    } else{
        let select = document.createElement("select");
        select.id ="playerViewSelect";
        for(let i=0;i<data.length;i++){
            let option = document.createElement("option");
            option.text=data[i];
            option.value=data[i];
            select.appendChild(option);
        }
        document.getElementById("playerViewSelectContainer").appendChild(select);
    }
})

ipcRenderer.on("enemyChampsDelivery", function (evt, data){
    if(document.getElementById('enemyViewSelect')){
        let select = document.getElementById('enemyViewSelect');
        let child=select.lastElementChild;
        while(child){
            select.removeChild(child)
            child=select.lastElementChild;
        }
        for(let i=0;i<data.length;i++){
            let option = document.createElement("option");
            option.text=data[i];
            option.value=data[i];
            select.appendChild(option);
        }
    } else{
        let select = document.createElement("select");
        select.id ="enemyViewSelect";
        for(let i=0;i<data.length;i++){
            let option = document.createElement("option");
            option.text=data[i];
            option.value=data[i];
            select.appendChild(option);
        }
        document.getElementById("enemyViewSelectContainer").appendChild(select);
    }
   
})