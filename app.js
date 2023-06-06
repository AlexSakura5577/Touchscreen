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

function TouchStart(e)
{
    //Получаем текущую позицию касания
    touchStart = { x: e.changedTouches[0].clientX, y: e.changedTouches[0].clientY };
    touchPosition = { x: touchStart.x, y: touchStart.y };

    //Рисуем точку начала касания
    Draw(touchPosition.x, touchPosition.y, 6, "blue");
};


