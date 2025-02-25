const button = document.getElementById('hello-url');

button.addEventListener('click', () => {

    const IFRAME_ID = "ad-auris-iframe";
    var iframe_element = document.getElementById(IFRAME_ID);
    console.log(iframe_element)
    iframe_element.style.display="inline";

    console.log(window.location.href)
    console.log(window)
    console.log(document)
});

