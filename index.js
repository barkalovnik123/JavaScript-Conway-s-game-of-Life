//===================Разрешение поля====================
let width = Math.round(160*0.5); //ширина
let height = Math.round(90*0.5); //высота
//===================НАЧАЛЬНАЯ ПОЗИЦИЯ====================
const alive_propability = .08; //вероятность живой клетки на поле
//===================СЛУЧАЙНОЕ РОЖДЕНИЕ====================
const allow_random_life = false; //разрешить случайное рождение?
const random_life_propability = .001; //вероятность случайного рождения
//===================ТИП ПОЛЯ====================
const pole_type = 0 //0-края соеденены [верх-низ, право-лево][pac-man] | 1-поле ограничено экраном
//===================ЦВЕТА====================
const bg_color = "black"; //фон (мёртвая клетка)
const new_cell_color = "orange"; //рождёная клетка (0 поколений)
const old_cell_color = "red"; //живущая клетка (1+ поколений)

//создаём массив-поле
let old_pole = [];                                                                  //создание нового массива
for (let i = 0; i < height; i++) {                                                  //
    let row = Array(width).fill(0).map(elem=>+(Math.random()<alive_propability));   //наполнение случайными 1 и 0
    old_pole.push(row);                                                             //
}                                                                                   //
let new_pole = old_pole;                                                            //копирование старого поколения в новое

const l = console.log;

width-=1;height-=1;

function cycle() { //функция цикла
    old_pole.forEach((row, y)=>{
        row.forEach((cell, x)=>{
            let alive_around = 0;

            //l("now x "+x)
            //l("now y "+y)
            
            if (pole_type == 1) {
            if (y > 0) {alive_around+=+!!old_pole[y-1][x]}
            if (y < height) {alive_around+=+!!old_pole[y+1][x]}
            if (x > 0) {alive_around+=+!!old_pole[y][x-1]}
            if (x < width) {alive_around+=+!!old_pole[y][x+1]}
            if (y > 0 && x > 0) {alive_around+=+!!old_pole[y-1][x-1]}
            if (y > 0 && x < width) {alive_around+=+!!old_pole[y-1][x+1]}
            if (y < height && x > 0) {alive_around+=+!!old_pole[y+1][x-1]}
            if (y < height && x > width) {alive_around+=+!!old_pole[y+1][x+1]}
            } else if (pole_type == 0) {
            if (y > 0) {alive_around+=+!!old_pole[y-1][x]} else {alive_around+=+!!old_pole[height][x]}
            if (y < height) {alive_around+=+!!old_pole[y+1][x]} else {alive_around+=+!!old_pole[0][x]}
            if (x > 0) {alive_around+=+!!old_pole[y][x-1]} else {alive_around+=+!!old_pole[y][width]}
            if (x < width) {alive_around+=+!!old_pole[y][x+1]} else {alive_around+=+!!old_pole[y][0]}
            if (y > 0 && x > 0) {alive_around+=+!!old_pole[y-1][x-1]} else {alive_around+=+!!old_pole[height][width]}
            if (y > 0 && x < width) {alive_around+=+!!old_pole[y-1][x+1]} else {alive_around+=+!!old_pole[height][0]}
            if (y < height && x > 0) {alive_around+=+!!old_pole[y+1][x-1]} else {alive_around+=+!!old_pole[0][width]}
            if (y < height && x < width) {alive_around+=+!!old_pole[y+1][x+1]} else {alive_around+=+!!old_pole[0][0]}
            }
            //l(alive_around)
            if (old_pole[y][x] == 2) {
                new_pole[y][x] = 1;
            }

            if (!cell) {
                if (alive_around == 3) {
                    new_pole[y][x] = 2;
                }
                if (Math.random() < random_life_propability && allow_random_life) {
                    new_pole[y][x] = 2
                }
            } else {
                if (alive_around != 2 && alive_around != 3) {
                    new_pole[y][x] = 0;
                }
            }
        });
    });
    /*old_pole.forEach((elem, i)=>{
        console.log(elem + " " + new_pole[i]);
    })*/
}

// Function to create a table as a child of el.
// data must be an array of arrays (outer array is rows).
function tableCreate(el, data)
{
    var tbl  = document.createElement("table");
    tbl.style.width  = `100vw`;
    tbl.style.height = `100vh`;

    for (var i = 0; i < data.length; ++i)
    {
        var tr = tbl.insertRow();
        for(var j = 0; j < data[i].length; ++j)
        {
            var td = tr.insertCell();
            td.style.backgroundColor = (data[i][j]) ? old_cell_color : bg_color;
            if (data[i][j] == 2) {td.style.backgroundColor = new_cell_color;}
            //td.appendChild(document.createTextNode(data[i][j].toString()));
            td.appendChild(document.createTextNode(""));
        }
    }
    el.innerHTML = ""; el.appendChild(tbl);
}

const tmr = 100;
let timer = setTimeout(function step() {
    cycle();
    tableCreate(document.getElementById("app"), new_pole);
    old_pole = new_pole;
    timer = setTimeout(step, tmr)
},tmr)