const button = document.getElementById('hello-url');

button.addEventListener('click', () => {
  const h1 = document.createElement('h1');
  h1.textContent = 'Hello World!';
  document.body.appendChild(h1);
  console.log('hello')

    console.log(window.location.href)
    console.log(document.location.href)
});

