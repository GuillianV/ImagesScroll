class ImagesScroll {
  
  constructor(settings) {
    gsap.registerPlugin(ScrollTrigger);

    this.imagesArray = [];
    this.oldImage = null;

    const Settings = Object.assign(
      {},
      {
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
            }
          ],
        },
        sections: [
        ],
      },
      settings
    );

    this.loadImages(Settings.images);
    this.animateImages(Settings);
  }

  loadImages(SettingImages = {}) {
    const {
      imagesContainerSelector = "#container",
      nbImagesMax = 0,
      pathToLoad = "./",
      baseName = "",
      customAttributes = [],
      extension = ".png",
    } = SettingImages;

    const ImagesScrollContainer = document.querySelector(
      imagesContainerSelector
    );

    for (let iteration = 0; iteration <= nbImagesMax; iteration++) {
      const imageElement = document.createElement("img");

      imageElement.src = `${pathToLoad}${baseName}${iteration}${extension}`;
      imageElement.style.display = "none";
      imageElement.style.zIndex = iteration;

      customAttributes.forEach((customAttribute) => {
        imageElement[customAttribute.key] = customAttribute.value;
      });

      const node = ImagesScrollContainer.appendChild(imageElement);
      this.imagesArray.push(node);
    }
  }

  animateImages(Settings) {
    const { images = {}, sections = [] } = Settings;

    if (this.imagesArray.length != images.nbImagesMax + 1) return;

    sections.forEach((section) => {
      const { startingFrame = 0, endingFrame = images.nbImagesMax } = section;

      let scrollTrigger = Object.assign(
        {},
        {
          markers: true,
          start: "top top",
          end: "bottom bottom",
          scrub: true,
          onUpdate: (self) => {
            if (this.oldImage != null) this.oldImage.style.display = "none";

            const numberPicked = Math.round(
              self.progress * (endingFrame - startingFrame)
            );
            this.imagesArray[numberPicked + startingFrame].style.display = "block";
            this.oldImage = this.imagesArray[numberPicked + startingFrame];
          },
        },
        section
      );

      gsap.timeline({
        scrollTrigger,
      });
    });
  }
}
