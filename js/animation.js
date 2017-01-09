function main() {
    var $squere = document.getElementById('squere');
    var angle = 0;
    function rotate() {
        angle = (angle + .5)%360;
        $squere.style.transform = "rotate(" + angle + "deg)";
        window.requestAnimationFrame(rotate);
    }
    id = window.requestAnimationFrame(rotate);
}
document.addEventListener('DOMContentLoaded', main);
