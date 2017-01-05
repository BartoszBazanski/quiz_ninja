function main() {
    var $form = document.forms.hero;

    $form.addEventListener('submit', makeHero, false);
    $form.name.addEventListener('blur', validateInline, false);

    function makeHero(event) {
        console.log(event);
        event.preventDefault();

        var hero = {};
        hero.name = $form.name.value;
        hero.realName = $form.realName.value;
        hero.age = $form.age.value;
        hero.powers = [];
        hero.city = $form.city.value;
        hero.origin = $form.origin.value;

        for(var i=0, max=$form.powers.length; i<max; i++) {
            if($form.powers[i].checked) {
                hero.powers.push($form.powers[i].value);
            }
        }

        for(var i=0, max=$form.type.length; i<max; i++) {
            if($form.type[i].checked) {
                hero.type = $form.type[i].value;
                break;
            }
        }

        alert(JSON.stringify(hero));
    }

    function validateInline(event) {
        var firstLetter = $form.name.value[0];
        var label = document.querySelector("label[for='name']");
        if(firstLetter.toUpperCase() === "X") {
            label.classList.add("error");
            label.textContent = "Your name is not allowed to start with X!";
        } else {
            label.classList.remowe("error");
            label.textContent = "Name:";
        }
    }
}

document.addEventListener('DOMContentLoaded', main);
