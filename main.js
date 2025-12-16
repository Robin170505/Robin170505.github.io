"use strict";

function responsive_title()
{
    const window_width = window.innerWidth;
    console.log("Screen width:" + window_width);

    let title = document.getElementById("title");
    let title_width = title.getBoundingClientRect().width;
    console.log(title_width);

    while(title_width == window_width)
    {
        const title_html = title.innerHTML;
        const first_space = title_html.indexOf(" ");
        const new_html = title_html.substring(0, first_space) + "<br/>" + title_html.substring(first_space+1);
        title.innerHTML = new_html;

        title_width = title.getBoundingClientRect().width;
    }
}
responsive_title();

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function play_typing_sound(time)
{
    let typing_sound = new Audio("media/typing.mp3");
    typing_sound.play();
    await sleep(time);
    typing_sound.pause();
}

function fix_typing_animation()
{
    let title = document.getElementById("title");
    const title_length = title.innerText.length;
    const animation_length = title_length/15.0;
    const title_width = title.getBoundingClientRect().width+"px";
    title.style.setProperty("--title-width", title_width);
    title.style.animation = "typing "+animation_length+"s steps("+title_length+"), blink 0.8s infinite";
    return animation_length;
}

function play_typing()
{
    const animation_length = fix_typing_animation();
    play_typing_sound(animation_length*1000);
}
play_typing();


function animate_if_in_view(elements)
{
    for(const element of elements)
    {
        if(element.isIntersecting)
        {
            element.target.classList.add("visibile-for-fly-in");
        }
    }
}

function connect_observer_for_fly_in(observer, class_name)
{
    const elements = document.getElementsByClassName(class_name);
    for(const element of elements) 
    {
        observer.observe(element);
    }
}

const observer = new IntersectionObserver(animate_if_in_view);
connect_observer_for_fly_in(observer, "content-heading");
connect_observer_for_fly_in(observer, "content-subheading");
connect_observer_for_fly_in(observer, "content-text");
