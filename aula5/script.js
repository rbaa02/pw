const ul = document.querySelector("ul");
const h1 = document.querySelector("h1");

const eventL = () => {
  document.addEventListener("change", (e) => {
    inputValue = e.target.value;
    main();
    h1.innerText = "Cidades com o DDD " + e.target.value;
    e.target.value = "";
  });
};

const fetchDDD = async (ddd) => {
  const fetchResponse = await fetch(
    `https://brasilapi.com.br/api/ddd/v1/${ddd}`
  );
  return await fetchResponse.json();
};

const setResponse = (name) => {
  const li = document.createElement("li");
  li.innerText = name;
  ul.appendChild(li);
};

const main = async () => {
  ul.innerHTML = "";
  h1.innerText = "Cidades com o DDD";
  const data = await fetchDDD(inputValue);
  const cities = data.cities ? data.cities : 0;
  for (let i = 0; i < cities.length; i++) {
    setResponse(cities[i]);
  }
};
