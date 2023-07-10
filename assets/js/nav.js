$(document).ready(() => {

    /*
     * 
     * Afficher le contenu des dropdowns dans la navBar au survole ou au click (pour les petits écrans)
     * 
    */
    const overlaydropdownElem = $('.overlaydropdown')[0]
    const dropdownElems = $('.nav .menu-list__dropdown') 

    //Pour les écrans supperieurs à 600px
    $(dropdownElems).hover((e) => {
        if (window.matchMedia("(min-width: 960px)").matches) {
            $(overlaydropdownElem).fadeIn(300)
            $(e.currentTarget).addClass('open')
        }
    }, (e) => {
        if (window.matchMedia("(min-width: 960px)").matches) {
            $(overlaydropdownElem).fadeOut(300)
            $(e.currentTarget).removeClass('open')
        }
    })

    //Pour les petits écrans inférieurs à 600px
    $(dropdownElems).children( ".menu-list__link" ).click((e) => {
        if (window.matchMedia("(max-width: 959px)").matches) {
            if($(e.currentTarget.offsetParent).hasClass('open')){
                $(e.currentTarget.offsetParent).removeClass('open')
            }else{
                $(e.currentTarget.offsetParent).addClass('open')
            }
        }
    })
    /*
     * CLOSE
    */


    /*
     * 
     * Afficher la navbar (petits écrans seulement)
     * 
    */
    const nav = $('.nav')[0]
    const navMenuBurger = $('.nav .menu-burger')[0]

    $(navMenuBurger).click(() => {
        if (window.matchMedia("(max-width: 959px)").matches) {
            if($(nav).hasClass('open')){
                $(overlaydropdownElem).fadeOut(300)
                $(nav).removeClass('open')
            }else{
                $(overlaydropdownElem).fadeIn(300)
                $(nav).addClass('open')
            }
        }
    })

    //Si l'utilisateur clique en dehors de la nav (ainsi que son enfant large-section contenant la liste des liens) le menu se fermera
    $(nav).click((e) => {
        e.stopPropagation()
    })
    $(window).click(() => {
        if (window.matchMedia("(max-width: 959px)").matches) {
            if($(nav).hasClass('open')){
                $(overlaydropdownElem).fadeOut(300)
                $(nav).removeClass('open')
            }
        }
    })

})