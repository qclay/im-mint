export default function lazyLoad(){
    const lazy_images = document.querySelectorAll("[data-lazy-bg]");

    for(let imageItem of lazy_images){
        const src = imageItem.dataset.lazyBg;
        const img = document.createElement("img");
        img.src = src;
        imageItem.removeAttribute("data-lazy-bg");

        img.onload = () => {
            imageItem.style.backgroundImage = `url(${src})`;
        }
    }
}