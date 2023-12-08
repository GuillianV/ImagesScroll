class ImagesScroll {

    constructor(settings) {
        gsap.registerPlugin(ScrollTrigger);

        this.imagesArray = [];
        this.loadingManager = {};
        this.oldImage = null;


        
        const Settings = Object.assign(
            {},
            {
                scroll: {
                    enable: true, //Active ou desactive le Pin de l'element
                    trigger: "#imageScrollContainer", //Trigger de l'element
                    markers: false, //Affiche ou non les markers du scroll
                    start: "center center",  //trigger d'activation du suivi
                    end: "+=1500px", //trigger de désactivation du suivi
                    scrub: true, //Relie le scroll a l'animation
                    pin: true, //Fixe l'element 
                    pinSpacing: false, //Enleve l'espace crée par le pin sur la page
                    markers: false, //Affiche ou cache les markers
                   
                },
                images: {
                    imagesContainerSelector: "#imageScrollContainer",
                    nbImagesMax: 380, //Le nombre d'images totales. elle doivent contenir dans leurs noms (à la fin) le numéro de leur position dans l'animation. exemple img-0.png premiere et img-360.png pour la derniere
                    pathToLoad: "./assets/images/klokers/", //Chemin du folder contenant les images
                    baseName: "", // Nom de base des images ex : si les images se nomment img-0.png, img-1.png etc.. la propriété baseName sera 'img-'. Vide de base (0.png,1.png,2.png ..),
                    extension: ".png",
                    padstart: 0, //Utile si l'itération de la raclette commence par 001,002,003 au lieu de 0,1,2,3. si padstart = 3, l'iteration totale sera de 3 chiffres, 4 = 4 chiffres etc..
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
                    {   //Permet de découper les défilement des images de l'animation en fonction d'un scrollTrigger
                        trigger: ".step",
                        startingFrame: 0, // La frame de début de la section (si aucune valeur : 0 )
                        endingFrame: 380, // Frame de fin (si aucune valeur n'est inscrite, on calcule avec la taille de l'array d'images)
                        start: "top center",
                        end: "bottom center",
                        markers: false,
                        tweeningsTo: [  //Permet d'effectuer un tween en parallèle  du défilement des images
                            {
                                selector: "#imageScrollContainer", //L'element à tween en parallèle
                                scale: 1.5, //Veleur gsap exemple
                            }
                        ]
                    },

                ],
                loading: {
                    evtName: "evt_imagesscroll", //Nom de l'évenement pour obtenir la progression du chargement { progress : 0 } ->  { progress : 1 }
                    evtDispatcher: null  //Element servant a dispatcher l'evenement de load
                }
            },
            settings
        );

        this.loadManager(Settings.loading)
        this.loadImages(Settings.images);
        this.loadScroll(Settings.scroll)
        this.animateImages(Settings);
    }


    loadManager(LoadingSettings = {}) {

        let { evtName = "evt_imagesscroll", evtDispatcher } = LoadingSettings

        if (evtDispatcher == null && window != null)
            evtDispatcher = window
        else if (typeof evtDispatcher === 'string' && document != null)
            evtDispatcher = document.querySelector(evtDispatcher);
        
    
        this.loadingManager = {
            loadStatus : 0,
            images : [],
            imageLoaded : (index) => {
                this.loadingManager.images[index] = true
                this.loadingManager.loadStatus = this.loadingManager.images.filter((loaded) => loaded === true).length / this.loadingManager.images.length
                evtDispatcher.dispatchEvent(new CustomEvent(evtName, {
                    bubbles: true,
                    detail: {
                        progress: this.loadingManager.loadStatus
                    }
                }))
             
            }
        }




    }

    loadScroll(ScrollSettings = {}) {

        if (typeof ScrollSettings !== 'object' || ScrollSettings.enable == false) {
            return;
        }
          
        const timeline = gsap.timeline({
            scrollTrigger: ScrollSettings
        })

    }

    loadImages(SettingImages = {}) {
        const {
            imagesContainerSelector = "#container", nbImagesMax = 0, pathToLoad = "./", baseName = "", customAttributes = [], extension = ".png",  padstart = 0
        } = SettingImages;

        const ImagesScrollContainer = document.querySelector(
            imagesContainerSelector
        );

        for (let iteration = 0; iteration <= nbImagesMax; iteration++) {
            const imageElement = document.createElement("img");

            const imageIteration = padstart != 0 ? iteration.toString().padStart(padstart, '0') : iteration

            imageElement.src = `${pathToLoad}${baseName}${imageIteration}${extension}`;
            imageElement.style.display = "block";
            imageElement.style.opacity = "0";

            imageElement.style.zIndex = iteration;
            imageElement.dataset.index = iteration;
            this.loadingManager.images.push(iteration);
            imageElement.onload = () => {
                this.loadingManager.imageLoaded(iteration)
            };
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
            const { startingFrame = 0, endingFrame = images.nbImagesMax , tweeningsTo = [] } = section;


            let scrollTrigger = Object.assign(
                {},
                {
                    markers: false,
                    start: "top top",
                    end: "bottom bottom",
                    scrub: true,
                    onUpdate: (self) => {
                        if (this.oldImage != null) this.oldImage.style.opacity = "0";

                        const numberPicked = Math.round(
                            self.progress * (endingFrame - startingFrame)
                        );
                        this.imagesArray[numberPicked + startingFrame].style.opacity = "1"; 
                        this.oldImage = this.imagesArray[numberPicked + startingFrame];
                    },
                },
                section
            );

            let timeline = gsap.timeline({
                scrollTrigger,
            });
            
            tweeningsTo.forEach(tween => {
                timeline.to(tween.selector, tween)
            })

        });
    }
}