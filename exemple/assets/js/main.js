document.addEventListener('DOMContentLoaded', function() {

  const barload = document.querySelector('.loaderInnerInner')
    window.addEventListener("evt_imagesscroll", (evt) => {
      
      const {progress} = evt.detail
      barload.style.width = `${progress * 100}%`
      if(progress == 1){
        document.querySelector('.loader').style.opacity = '0'
      }
    })
  
    new ImagesScroll( {
        loading: {
            evtName: "evt_imagesscroll",
            evtDispatcher: window,
        },
        scroll: {
            enable: true, //Active ou desactive le Pin de l'element
            trigger: "#imageScrollContainer", //Trigger de l'element
            markers: true, //Affiche ou non les markers du scroll
            start: "top top",  //trigger d'activation du suivi
            end: "+=1000% bottom", //trigger de désactivation du suivi
            scrub: true, //Relie le scroll a l'animation
            pin: true, //Fixe l'element 
            pinSpacing: false, //Enleve l'espace crée par le pin sur la page
          
        },
        images: {
          imagesContainerSelector: "#imageScrollContainer",
          nbImagesMax: 380, //Le nombre d'images totales. elle doivent contenir dans leurs noms (à la fin) le numéro de leur position dans l'animation. exemple img-0.png premiere et img-360.png pour la derniere
          pathToLoad: "./assets/images/klokers/", //Chemin du folder contenant les images
          baseName: "", // Nom de base des images ex : si les images se nomment img-0.png, img-1.png etc.. la propriété baseName sera 'img-'. Vide de base (0.png,1.png,2.png ..),
          extension: ".png",
          customAttributes: [
            {
              key: "class",
              value: "imagesScroll",
            },
            {
              key: "alt",
              value: "une imagesss video",
            },
            {
              key: "title",
              value: "une image video",
            },
          ],
        },
        sections: [
          {
            trigger: ".scene-1",
            startingFrame: 0,
            endingFrame: 149,
            tweeningsTo:[
              {
                selector: "#imageScrollContainer",
                scale: 1.5,
              }
            ]
          },
          {
            trigger: ".scene-2",
            startingFrame: 150,
            endingFrame: 210,
            tweeningsTo:[
              {
                selector: "#imageScrollContainer",
                scale: .5,
              }
            ]
          },
          {
            trigger: ".scene-3",
            startingFrame: 210,
            endingFrame: 277,
            tweeningsTo:[
              {
                selector: "#imageScrollContainer",
                rotate: 360,
              }
            ]
          },
          {
            trigger: ".scene-4",
            startingFrame: 278,
            endingFrame: 341,
            tweeningsTo:[
              {
                selector: "#imageScrollContainer",
                x: 150,
              }
            ]
          },
          {
            trigger: ".scene-5",
            startingFrame: 342,
            endingFrame: 380,
            tweeningsTo:[
              {
                selector: "#imageScrollContainer",
                x: 0,
              }
            ]
          },
        ],
      },)

})