//Получение холста и его контекста
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

InitApp(); //Инициализировать приложение

//При растягивании окна приложение будет инициализироваться заново
window.addEventListener("resize", InitApp);

function InitApp() //Растягиваем холст на весь экран
{
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
};

//Чувствительность — количество пикселей, после которого жест будет считаться свайпом
const sensitivity = 20;

//Получение поля, в котором будут выводиться сообщения
const msgBox = document.getElementById("msg-box");

var touchStart = null; //Точка начала касания
var touchPosition = null; //Текущая позиция

//Перехватываем события
//Начало касания
canvas.addEventListener("touchstart", function (e) { TouchStart(e); });

//Движение пальцем по экрану
canvas.addEventListener("touchmove", function (e) { TouchMove(e); });

//Пользователь отпустил экран
canvas.addEventListener("touchend", function (e) { TouchEnd(e, "green"); });

//Отмена касания
canvas.addEventListener("touchcancel", function (e) { TouchEnd(e, "red"); });

function TouchStart(e) {
    //Получаем текущую позицию касания
    touchStart = { x: e.changedTouches[0].clientX, y: e.changedTouches[0].clientY };
    touchPosition = { x: touchStart.x, y: touchStart.y };

    //Рисуем точку начала касания
    Draw(touchPosition.x, touchPosition.y, 4, "blue");
};

function TouchMove(e) {
    //Получаем новую позицию
    touchPosition = { x: e.changedTouches[0].clientX, y: e.changedTouches[0].clientY };

    //Рисуем точку текущей позиции
    Draw(touchPosition.x, touchPosition.y, 2);
};

function TouchEnd(e, color) {

    //Рисуем линию между стартовой и конечной точками
    DrawLine();

    //Рисуем конечную точку
    Draw(touchPosition.x, touchPosition.y, 4, color);

    //Определяем, какой жест совершил пользователь
    CheckAction();

    //Очищаем позиции
    touchStart = null;
    touchPosition = null;
};

function CheckAction() {

    //Получаем расстояния от начальной до конечной точек по обеим осям
    var d =
    {
        x: touchStart.x - touchPosition.x,
        y: touchStart.y - touchPosition.y
    };

    //Сообщение
    var msg = "";

    canvas.style.background = '#7de8d3';

    if (Math.abs(d.x) > Math.abs(d.y)) //Проверяем, движение по какой оси было длиннее
    {
        if (Math.abs(d.x) > sensitivity) //Проверяем, было ли движение достаточно длинным
        {
            if (d.x > 0) //Если значение больше нуля, значит пользователь двигал пальцем справа налево
            {
                msg = "Swipe Left";
                canvas.style.background = '#c546db';
            }
            else //Иначе он двигал им слева направо
            {
                msg = "Swipe Right";
                canvas.style.background = '#c2e640';
            }
        }
    }
    else //Аналогичные проверки для вертикальной оси
    {
        if (Math.abs(d.y) > sensitivity) {
            if (d.y > 0) //Свайп вверх
            {
                msg = "Swipe up";
                canvas.style.background = '#f163d3';
            }
            else //Свайп вниз
            {
                msg = "Swipe down";
                canvas.style.background = '#30aae8';
            }
        }
    }

    msgBox.innerText = msg; //Выводим сообщение
};

//Функция рисования пунктирной линии (повторяет движение)
function Draw(x, y, weight, color = "#0e25cf") {
    ctx.fillStyle = color;

    let weightHalf = weight / 2;

    ctx.fillRect(x - weightHalf, y - weightHalf, weight, weight);
};

//Функция рисования соединяющей сплошной линии (краткий путь)
function DrawLine() {
    // ctx.strokeStyle = "#ccc";
    ctx.strokeStyle = "#0a9707";

    ctx.beginPath();

    ctx.moveTo(touchStart.x, touchStart.y);
    ctx.lineTo(touchPosition.x, touchPosition.y);

    ctx.stroke();
};
