$(document).ready(() => {
    //Register ScrollTrigger Plugin
    gsap.registerPlugin(ScrollTrigger)

    let section2Articles = gsap.utils.toArray($('.section2 .article'))
    section2Articles.forEach((article, i) => {
        gsap.from(article, {
            scrollTrigger: {
                trigger: article,
                markers: false,
                start: "top 85%"
            },
            xPercent: (i % 2 === 0) ? -15 : 15,
            opacity: 0,
            duration: 1.5,
            ease: "power2.out",
        })
    })

    let section4Articles = gsap.utils.toArray($('.section4 .article'))
    section4Articles.forEach((article, i) => {
        let articleImg = $(article).children('.article__img')[0]
        let articleContainer = $(article).children('.article__container')[0]
        let articleImgBackground = $(article).children('.article__img__background')[0]
        let articleImgBackgroundShadow = $(article).children('.article__img__background_shadow')[0]

        gsap.to(articleContainer, {
            yPercent: 10,
            ease: "none",
            scrollTrigger: {
                trigger: articleImg,
                scrub: true
            }
        })
    
        gsap.to(articleImg, {
            yPercent: -12,
            ease: "none",
            scrollTrigger: {
                trigger: articleImg,
                scrub: true
            }
        })

        if(articleImgBackground){
            gsap.to(articleImgBackground, {
                yPercent: -16,
                ease: "none",
                scrollTrigger: {
                    trigger: articleImgBackground,
                    scrub: true
                }
            })
            gsap.to(articleImgBackgroundShadow, {
                yPercent: -16,
                ease: "none",
                scrollTrigger: {
                    trigger: articleImgBackgroundShadow,
                    scrub: true
                }
            })
        }
    })
})