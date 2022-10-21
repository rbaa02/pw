const ul = document.querySelector("ul");
let data = new Array();

const setResponse = (name) => {
   const li = document.createElement("li");
   li.innerText = name;
   ul.appendChild(li);
};

const fetchAPI = (inputValue) => {
   ul.innerHTML = "";
   fetch(`https://brasilapi.com.br/api/ddd/v1/${inputValue}`)
      .then(response => response.json())
      .then(dados => {
         if (dados.cities) {
            dados.cities.forEach(e => {
               setResponse(e);
            })
         }
      });
};

const h1 = (e) => {
   const h1 = document.querySelector("h1");
   h1.innerText = "Cidades com o DDD " + e;
};

document.getElementById('ddd').addEventListener("change", (e) => {
   e.preventDefault()
   fetchAPI(e.target.value);
   h1(e.target.value)
   e.target.value = "";
});

document.addEventListener("submit", 
(e) => {e.preventDefault()})
