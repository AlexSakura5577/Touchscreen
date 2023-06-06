InitApp(); //Инициализировать приложение

window.addEventListener("resize", InitApp); //При растягивании окна приложение будет инициализироваться заново

function InitApp() //Растягиваем холст на весь экран
{
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
};
