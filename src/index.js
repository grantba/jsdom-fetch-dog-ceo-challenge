window.addEventListener('DOMContentLoaded', (event) => {
    console.log('%c HI', 'color: firebrick')
    loadImage();
    loadBreeds();
});

function loadImage() {
    const imgUrl = "https://dog.ceo/api/breeds/image/random/4"
    fetch(imgUrl)
        .then(resp => resp.json())
        .then(images => {
            renderImage(images)
        });
}

function renderImage(images) {
    const div = document.querySelector("#dog-image-container");
    const p = document.createElement('p');
    // message: Array(4)
    // 0: "https://images.dog.ceo/breeds/borzoi/n02090622_7489.jpg"
    // 1: "https://images.dog.ceo/breeds/hound-walker/n02089867_1697.jpg"
    // 2: "https://images.dog.ceo/breeds/spaniel-sussex/n02102480_4670.jpg"
    // 3: "https://images.dog.ceo/breeds/doberman/n02107142_4653.jpg"
    // length: 4
    images['message'].forEach(img => {
        let image = document.createElement("img");
        image.src = img;
        p.appendChild(image);
        const br = document.createElement('br');
        div.appendChild(p);
        p.append(br);
    })
};

function loadBreeds() {
    const breedUrl = 'https://dog.ceo/api/breeds/list/all'
    fetch(breedUrl)
        .then(resp => resp.json())
        .then(breeds => {
            renderBreeds(breeds)
        });
}

function renderBreeds(breeds) {
    const ul = document.querySelector("#dog-breeds");
    let counter = 0;

    Object.keys(breeds['message']).forEach(breed => {
        const li = document.createElement('li');
        ul.appendChild(li);
        const br = document.createElement('br');
        li.innerText = breed;
        li.id = 'dog-breed';
        li.addEventListener('click', changeColorOfLi);
        li.appendChild(br);
    })
}
// `dog-breed'-${counter += 1}`

// const dogList = document.querySelector("#dog-breeds");
// dogList.addEventListener('click', function (event) {
//     changeColorOfLi(event);
// });

function changeColorOfLi(event) {
    if (event.target.style.color === "red") {
        event.target.style.color = "black";
    }
    else {
        event.target.style.color = "red";
    }
}

const breedList = document.getElementById('select-breeds');
breedList.addEventListener('submit', function (event) {
    event.preventDefault();
    breedChoices();
});

function breedChoices() {
    const alphaDog = document.querySelector('select#breed-dropdown');
    const allBreeds = document.querySelector("#dog-breeds");
    const letter = alphaDog.value;
    const array = allBreeds.childNodes;
    if (letter === "all-breeds") {
        for (let i = 1; i < array.length; i++) {
            allBreeds.childNodes[i].style.display = "block";
        }
    }
    else {
        for (let i = 1; i < array.length; i++) {
            allBreeds.childNodes[i].style.display = "block";
        }
        for (let i = 1; i < array.length; i++) {
            if (array[i].textContent.charAt(0) !== letter) {
                allBreeds.childNodes[i].style.display = "none";
            }
        }
    }
    // if (array.length === 0) {
    //     const h3 = document.createElement("h3");
    //     allBreeds.appendChild(h3);
    //     h3.innerText = `There were no dogs starting with the letter ${letter}`
    // }
};
