let sliderImages = document.querySelectorAll('.slide'), 
    arrowLeft = document.querySelector('#fio-arrow-left'), 
    arrowRight= document.querySelector('#fio-arrow-right'),
    current = 0;

function reset() {
    for(let counter = 0 ; counter < sliderImages.length ; counter++) {
        sliderImages[counter].style.display = 'none';
    }
}

function startSlide() {
    reset();
    sliderImages[0].style.display = 'block';
}

function slideLeft() {
    reset();
    sliderImages[current -1].style.display = 'block';
    current--;
}

function slideRight() {
    reset();
    sliderImages[current +1].style.display = 'block';
    current++;
}

arrowLeft.addEventListener('click', function() {
    if(current == 0){
        current = sliderImages.length;
    }
    slideLeft();
});

arrowRight.addEventListener('click', function() {
    if(current == sliderImages.length-1) {
        current = -1;
    }
    slideRight();
})

startSlide();

/* Photo Filter */

 const canvas = document.getElementById('canvas');
 const ctx = canvas.getContext('2d');

 let img = new Image();
 let fileName = "";

 const uploadBtn = document.getElementById('fio-upload-field');
 const downloadBtn = document.getElementById('fio-save');
 const removeBtn = document.getElementById('fio-remove'); 

 // Add Filters

 document.addEventListener('click', (e) => {
    if (e.target.classList.contains('fio-filter-btn')) {
        if (e.target.classList.contains('fio-brightness-add')) {
            Caman('#canvas', img, function() {
                this.brightness(5).render();
            });
        } else if (e.target.classList.contains('fio-brightness-remove')) {
            Caman('#canvas', img, function() {
                this.brightness(-5).render();
            });            
        } else if (e.target.classList.contains('fio-contrast-add')) {
            Caman('#canvas', img, function() {
                this.contrast(5).render();
            });            
        } else if (e.target.classList.contains('fio-contrast-remove')) {
            Caman('#canvas', img, function() {
                this.contrast(-5).render();
            });            
        } else if (e.target.classList.contains('fio-saturation-add')) {
            Caman('#canvas', img, function() {
                this.saturation(5).render();
            });            
        } else if (e.target.classList.contains('fio-saturation-remove')) {
            Caman('#canvas', img, function() {
                this.saturation(-5).render();
            });            
        } else if (e.target.classList.contains('fio-vibrance-add')) {
            Caman('#canvas', img, function() {
                this.vibrance(5).render();
            });            
        } else if (e.target.classList.contains('fio-vibrance-remove')) {
            Caman('#canvas', img, function() {
                this.vibrance(-5).render();
            });            
        } else if (e.target.classList.contains('fio-vintage')) {
            Caman('#canvas', img, function() { 
                this.revert();
                this.vintage().render();
            });            
        } else if (e.target.classList.contains('fio-lomo')) {
            Caman('#canvas', img, function() {
                this.revert();
                this.lomo().render();
            });            
        } else if (e.target.classList.contains('fio-clarity')) {
            Caman('#canvas', img, function() {
                this.revert();
                this.clarity().render();
            });            
        } else if (e.target.classList.contains('fio-sin-city')) {
            Caman('#canvas', img, function() {
                this.revert();
                this.sinCity().render();
            });            
        } else if (e.target.classList.contains('fio-cross')) {
            Caman('#canvas', img, function() {
                this.revert();
                this.crossProcess().render();
            });            
        } else if (e.target.classList.contains('fio-pinhole')) {
            Caman('#canvas', img, function() {
                this.revert();
                this.pinhole().render();
            });          
        }      
    }
 });

 removeBtn.addEventListener('click', (e) => {
    Caman('#canvas', img, function() {
        this.revert();
    })
 })

 downloadBtn.addEventListener('click', (e) => {
    const fileExtension = fileName.slice(-4);
    let newFileName;

    if (fileExtension === '.jpg' || fileExtension === '.png') {
        newFileName = fileName.substring(0, fileName.length-4) + '-edited.jpg';    
    }

    download(canvas, newFileName);
 })

 function download (canvas, filename) {
     let e;
     const link = document.createElement('a');
     
     link.download = filename;
     link.href = canvas.toDataURL('image/jpeg', 0.8);

     e = new MouseEvent('click');

     link.dispatchEvent(e);
 }
 // Upload File

 uploadBtn.addEventListener('change', (e) => {
    const file = document.getElementById('fio-upload-field').files[0];

    // Init FileReader

    const reader = new FileReader();

    if(file) {
        fileName = file.name;
        reader.readAsDataURL(file);
    }

    reader.addEventListener('load', () => {
        img = new Image();
        img.src = reader.result;
        img.onload = function() {
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0, img.width, img.height);
            canvas.removeAttribute('data-caman-id');
        }
    }, false);

 });