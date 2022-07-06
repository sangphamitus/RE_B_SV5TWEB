
function pageRoll()
{
    if (  window.scrollY >= $('#sec2').offset().top-100){
    $('.navbar').addClass('scrollingout');
    }
    else {
        $('.navbar').removeClass('scrollingout');
    }
}

function getTime()
{
    let today = new Date();

    let  date = today.getDate()+'-'+(today.getMonth()+1)+'-'+today.getFullYear();

    let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

   let dateTime = time+'\n'+date;

    document.getElementById('clock-disp').innerHTML=dateTime.toString();
}

$(document).ready(()=>{
    window.addEventListener("scroll",pageRoll);

    setInterval(getTime,1000);});




