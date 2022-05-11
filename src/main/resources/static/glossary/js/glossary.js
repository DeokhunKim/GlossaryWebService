let mainNavLinks = document.querySelectorAll("nav ul li a");
//let mainSections = document.querySelectorAll("main section");

function resetNavLinks(){
    mainNavLinks = document.querySelectorAll("nav ul li a");
}



let lastId;
let cur = [];

document.getElementsByTagName('ul')[0].style.top = '0px'

// This should probably be throttled.
// Especially because it triggers during smooth scrolling.
// https://lodash.com/docs/4.17.10#throttle
// You could do like...
// window.addEventListener("scroll", () => {
//    _.throttle(doThatStuff, 100);
// });
// Only not doing it here to keep this Pen dependency-free.

window.addEventListener("scroll", event => {
    let fromTop = window.scrollY;

    mainNavLinks.forEach(link => {
        if(link.id == null ||link.id == ''){
            return;
        }

        //let section = document.querySelector(link.hash.replaceAll('+', '\\+'));
        let section = document.getElementById(link.id.substring(4));
        if ( section.offsetTop <= fromTop &&
            section.offsetTop + section.offsetHeight > fromTop ) {
            link.classList.add("current");

            var navStyle = document.getElementsByTagName('ul')[0].style;
            let selectY = link.getBoundingClientRect().top - parseInt(navStyle.top);
            let windowHeight = $(window).height();

            if(selectY > windowHeight * 3 / 4){
                navStyle.top = '-' + (selectY - windowHeight * 3 / 4) + 'px';
            }
            else if(selectY <= windowHeight * 3 / 4){
                document.getElementsByTagName('ul')[0].style.top = '0px'
            }

        } else {
            link.classList.remove("current");
        }

    });
});
