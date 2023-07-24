# PinStepAnim

* Used to make pinned anims using gsap
* `new  PinStepAnim(scrollTriggerProperties, core)`
* core require at least a mainElem.


```javascript

let parentContainer = document.querySelector(".approche-anim")


new PinStepAnim({
    trigger: parentContainer,
    start: "center center",
    end: "+=1300 center",
    pin: true,
    markers: true,
    scrub: 1,
    toggleActions: "Play Reverse none none"
}, {

       mainElem: {

            selector: document.querySelectorAll(".block-etape"), // Peut etre une variable avec une NodeList , un selecteur css
            createClass: "b", // Génere une classe custom aux blocks principaux
            gsapFrom: {
                properties: {
                    yPercent: 200, //Tous les propriétés gsap nécessaires
                    opacity: 0,
                },
                endDelay: "-=0.5"
            },

            gsapTo: {
                properties: {

                    yPercent: -200,
                    opacity: 0,
                },
            },

        },
        innerElems: [
            
            //Tableau contenant une liste d'objet à animer en parallele de l'élement principal
            {
            selector: ".etapeTitle", 
            gsapFrom: {
                properties: {

                    yPercent: 40,

                },
                endDelay: "<0"
            },

            gsapTo: {
                properties: {
                    yPercent: -40,
                },
                endDelay: "<0"

            },


        },{
            selector: ".images-anim-img",
            gsapFrom: {
                properties: {

                    xPercent: 100,

                },
                endDelay: "<0"
            },

            gsapTo: {
                properties: {
                    yPercent: -100,
                },
                endDelay: "<0"

            },


        }, {
            selector: ".number",
            gsapFrom: {
                properties: {

                    yPercent: 20,
                },
                endDelay: "<0"
            },

            gsapTo: {
                properties: {
                    yPercent: -20,
                    
                }, 
                endDelay: "<0"

            },
        }],
      

    

})

```
