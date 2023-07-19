$(document).ready(() => {

    const hero = $('.hero')[0]
    const slideElems = $('.hero .slide')
    const slidePaginationNext = $('.slide-pagination__next')[0]
    const slidePaginationPrev = $('.slide-pagination__prev')[0]
    let actualSlide = $('.hero .slide[data-slide-order=0]')[0]
    let heroInterval = null

    //Initialize pagination
    initializePagination()
    initializeAutoSlide()

    $(slidePaginationNext).click(() => {
        changeSlide('next')
    })
    $(slidePaginationPrev).click(() => {
        changeSlide('prev')
    })

    async function changeSlide(direction){
        //Disabled click sur les flèches de navigation lors d'un changement de slide
        $(slidePaginationNext).off('click')
        $(slidePaginationPrev).off('click')
        //On supprime le timeout pour que l'auto slide n'interpel pas l'utilisateur quand il change de slide lui même
        clearTimeout(heroInterval)

        let actualSlideContainer = $(actualSlide).children('.slide__container')[0]
        let actualSlideImage = $(actualSlide).children('.slide__image')[0]
        let actualSlideOrder = $(actualSlide).data("slide-order")
        let slidesCount = $(slideElems).length
        let followingSlideOrder = null
        if(direction == 'next'){
            if(actualSlideOrder + 1 < slidesCount){
                followingSlideOrder = actualSlideOrder + 1
            }else{
                followingSlideOrder = 0
            }
        }else{
            //prev
            if(actualSlideOrder - 1 >= 0){
                followingSlideOrder = actualSlideOrder - 1
            }else{
                followingSlideOrder = slidesCount - 1 
            }
        }

        //Update pagination (circle)
        updatePagination(followingSlideOrder)

        let followingSlide = $('.hero .slide[data-slide-order= ' + followingSlideOrder + ']')[0]

        let followingSlideImage = $(followingSlide).children('.slide__image')[0]
        let followingSlideContainer = $(followingSlide).children('.slide__container')[0]
        let followingSlideImageUri = $(followingSlide).children('.slide__image')[0].src
        
        //Changement du background en transition (css transition property)
        $(hero).css('--bg-image', "url('" + followingSlideImageUri + "')")

        //Set de la taille du prochain slide__container à 0
        $(followingSlideContainer).css('height', '0')
        //Display du prochain slide
        $(followingSlide).css('display', 'inherit')

        if(direction == 'next'){
            $(actualSlide).css('z-index', '10')
            $(followingSlide).css('z-index', '15')
        }else{
            $(actualSlide).css('z-index', '15')
            $(followingSlide).css('z-index', '10')
        }

        //Start l'animation
        if(direction == 'next'){
            await slideNextGSAP(actualSlideImage, followingSlideImage, followingSlideContainer, actualSlideContainer)
        }else{
            await slidePrevGSAP(actualSlideImage, followingSlideContainer, actualSlideContainer)
        }

        //Display none de l'ancien slide
        $(actualSlide).css('display', 'none')
        //Remise à inherit l'image de l'ancien slide
        $(actualSlideImage).css('display', 'inherit')
        //Remplacement du slide actuel
        actualSlide = followingSlide

        //Restart du timer auto slide
        initializeAutoSlide()

        //Réactivation des flèches de navigation
        $(slidePaginationNext).on('click', function(){
            changeSlide('next')
        })
        $(slidePaginationPrev).on('click', function(){
            changeSlide('prev')
        })
    }

    function slideNextGSAP(actualSlideImage, nextSlideImage, nextSlideContainer, actualSlideContainer){
        return new Promise(resolve => {   
            gsap.from(nextSlideImage, { xPercent: 100, duration: 1.5, ease: "power2.out", clearProps: "all", onComplete: function(){ $(actualSlideImage).css('display', 'none')} })
            gsap.to(actualSlideContainer, { 
                height: 0, 
                duration: .8,
                ease: "power2.out",
                onComplete: function(){ 
                    gsap.to(nextSlideContainer, { 
                        height: "auto", 
                        duration: 1,
                        ease: "power2.out",
                        onComplete: function(){ 
                            return resolve(true)
                        }
                    }) 
                } 
            })
        })
    }

    function slidePrevGSAP(actualSlideImage, prevSlideContainer, actualSlideContainer){
        return new Promise(resolve => {   
            gsap.to(actualSlideImage, { xPercent: 100, duration: 1.5, ease: "power2.out", clearProps: "all", onComplete: function(){ $(actualSlideImage).css('display', 'none')} })
            gsap.to(actualSlideContainer, { 
                height: 0, 
                duration: .8,
                ease: "power2.out",
                onComplete: function(){ 
                    gsap.to(prevSlideContainer, { 
                        height: "auto", 
                        duration: 1,
                        ease: "power2.out",
                        onComplete: function(){ 
                            return resolve(true)
                        }
                    }) 
                } 
            })
        })
    }

    function updatePagination(number){
        const pagination = $('.hero .slide-pagination')[0]
        const paginationCircles = $('.hero .slide-pagination .slide-pagination_circle')
        $(paginationCircles).removeClass('is--active')
        $($(paginationCircles)[number]).addClass('is--active')
    }

    function initializePagination(){
        const pagination = $('.hero .slide-pagination')[0]
        const paginationCircle = $('.hero .slide-pagination .slide-pagination_circle')[0]
        const slidesCount = $('.hero .slide').length

        if(slidesCount > 1){
            for(i=1; i < slidesCount; i++) {
                $(paginationCircle).clone().insertAfter($(paginationCircle))
            }
        }
        $($('.hero .slide-pagination .slide-pagination_circle')[0]).addClass('is--active')
    }

    function initializeAutoSlide(time = 5000){
        heroInterval = setTimeout(()=>{
            changeSlide('next')
        }, time)
    }
})