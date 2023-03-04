const championsArray = [
    'Aatrox',       'Ahri',         'Akali',        'Akshan',
    'Alistar',      'Amumu',        'Anivia',       'Annie',
    'Aphelios',     'Ashe',         'Aurelion Sol', 'Azir',
    'Bard',         "Bel'Veth",     'Blitzcrank',   'Brand',
    'Braum',        'Caitlyn',      'Camille',      'Cassiopeia',
    "Cho'Gath",     'Corki',        'Darius',       'Diana',
    'Draven',       'Dr. Mundo',    'Ekko',         'Elise',
    'Evelynn',      'Ezreal',       'Fiddlesticks', 'Fiora',
    'Fizz',         'Galio',        'Gangplank',    'Garen',
    'Gnar',         'Gragas',       'Graves',       'Gwen',
    'Hecarim',      'Heimerdinger', 'Illaoi',       'Irelia',
    'Ivern',        'Janna',        'Jarvan IV',    'Jax',
    'Jayce',        'Jhin',         'Jinx',         "Kai'Sa",
    'Kalista',      'Karma',        'Karthus',      'Kassadin',
    'Katarina',     'Kayle',        'Kayn',         'Kennen',
    "Kha'Zix",      'Kindred',      'Kled',         "Kog'Maw",
    "K'Sante",      'LeBlanc',      'Lee Sin',      'Leona',
    'Lillia',       'Lissandra',    'Lucian',       'Lulu',
    'Lux',          'Malphite',     'Malzahar',     'Maokai',
    'Master Yi',    'Miss Fortune', 'Mordekaiser',  'Morgana',
    'Nami',         'Nasus',        'Nautilus',     'Neeko',
    'Nidalee',      'Nilah',        'Nocturne',     'Nunu & Willump',
    'Olaf',         'Orianna',      'Ornn',         'Pantheon',
    'Poppy',        'Pyke',         'Qiyana',       'Quinn',
    'Rakan',        'Rammus',       "Rek'Sai",      'Rell',
    'Renata Glasc', 'Renekton',     'Rengar',       'Riven',
    'Rumble',       'Ryze',         'Samira',       'Sejuani',
    'Senna',        'Seraphine',    'Sett',         'Shaco',
    'Shen',         'Shyvana',      'Singed',       'Sion',
    'Sivir',        'Skarner',      'Sona',         'Soraka',
    'Swain',        'Sylas',        'Syndra',       'Tahm Kench',
    'Taliyah',      'Talon',        'Taric',        'Teemo',
    'Thresh',       'Tristana',     'Trundle',      'Tryndamere',
    'Twisted Fate', 'Twitch',       'Udyr',         'Urgot',
    'Varus',        'Vayne',        'Veigar',       "Vel'Koz",
    'Vex',          'Vi',           'Viego',        'Viktor',
    'Vladimir',     'Volibear',     'Warwick',      'Wukong',
    'Xayah',        'Xerath',       'Xin Zhao',     'Yasuo',
    'Yone',         'Yorick',       'Yuumi',        'Zac',
    'Zed',          'Zeri',         'Ziggs',        'Zilean',
    'Zoe',          'Zyra'
  ]

function createSelects(){
    let select = document.createElement("select");
    
    for(let i=0;i<championsArray.length;i++){
        let option = document.createElement("option");
        option.text=championsArray[i];
        option.value=championsArray[i];
        select.appendChild(option);
    }
    let playerChampionSelect = select.cloneNode(true);
    playerChampionSelect.id= 'playerChampionSelect';
    let enemyChampionSelect = select.cloneNode(true);
    enemyChampionSelect.id= 'enemyChampionSelect';

    document.getElementById("playerChampionSelectContainer").appendChild(playerChampionSelect);
    document.getElementById("enemyChampionSelectContainer").appendChild(enemyChampionSelect);
    select.id = "championSelect";
    document.getElementById("selectCDContainer").appendChild(select);
}
createSelects();
console.log('hello world');