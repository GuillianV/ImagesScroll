document.addEventListener('DOMContentLoaded', function() {
    new ImagesScroll( {
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
              key: "loading",
              value: "lazy",
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
            onEnter: (event) => {
              console.log("start 1");
            },
          },
          {
            trigger: ".scene-2",
            startingFrame: 150,
            endingFrame: 210,
          },
          {
            trigger: ".scene-3",
            startingFrame: 210,
            endingFrame: 277,
          },
          {
            trigger: ".scene-4",
            startingFrame: 278,
            endingFrame: 341,
          },
          {
            trigger: ".scene-5",
            startingFrame: 342,
            endingFrame: 380,
          },
        ],
      },)

})