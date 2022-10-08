const newList = document.createElement("ul");
const tarefa = document.querySelector("#tarefa");
const formulario = document.querySelector("form");
formulario.addEventListener("submit", submit);
let controle = true;
document.body.append(newList);

function submit(e) {
  e.preventDefault();
  criaTarefa();
}

function criaTarefa() {
  // const newItem = document.createElement('li')
  // newItem.innerText = tarefa.value

  // newItem.append(criaCheckbox())
  // newItem.append(criaDeletar())
  addData();
}

function criaCheckbox(v) {
  const checkBox = document.createElement("input");
  checkBox.setAttribute("type", "checkbox");
  checkBox.checked = v;
  checkBox.addEventListener("change", check);
  return checkBox;
}

function criaDeletar() {
  const delet = document.createElement("i");
  delet.setAttribute("class", "fa fa-trash-o");
  delet.style.fontSize = "15px";
  delet.style.marginLeft = "7px";
  delet.addEventListener("click", deleta);
  return delet;
}

function check() {
  const item = this.parentNode;
  const id = parseInt(item.getAttribute("data-location-id"));

  if (this.checked) {
    item.style.textDecoration = "line-through";
    item.id = "concluido";
  } else {
    item.style.textDecoration = "none";
    item.removeAttribute("id");
  }

  let transactionD = db.transaction([storeName], "readwrite");
  let objectStore = transactionD.objectStore(storeName);
  const req = objectStore.get(id);

  req.onsuccess = (e) => {
    const registro = e.target.result;
    registro.feito = this.checked;
    objectStore.put(registro);
  };
}

function hide() {
  const concluidas = document.querySelectorAll("#concluido");
  const botao = document.querySelector("#hidee");
  if (concluidas != null) {
    if (controle) {
      concluidas.forEach((e) => {
        e.style.display = "none";
        botao.value = "Mostrar";
      });
    } else {
      concluidas.forEach((e) => {
        e.style.display = "";
        botao.value = "Mostrar";
      });
      botao.value = "Esconder";
    }
    controle = !controle;
  }
}

function deleta(e) {
  const item = this.parentElement;
  let itemID = item.getAttribute("data-location-id");

  const t = db.transaction([storeName], "readwrite");
  const objectS = t.objectStore(storeName);
  const request = objectS.delete(parseInt(itemID));

  t.oncomplete = (e) => {
    console.log("excluído", itemID, e);
  };
  item.remove();
}
let db;

const dbName = "ListaTarefas",
  storeName = "tarefas";

function createDb() {
  if (window.indexedDB) {
    const request = window.indexedDB.open(dbName, 1);

    request.onsuccess = (e) => {
      db = request.result;
      console.log(request.result);
      carregaDb();
    };

    request.onupgradeneeded = (e) => {
      db = request.result;
      console.log("on Upgrated", e);

      const object = db.createObjectStore(storeName, {
        keyPath: "id",
        autoIncrement: true,
      });
    };
  } else {
    console.log("Navegador não suporta.");
  }
}

function addData() {
  if (tarefa.value != "") {
    const objectS = db
      .transaction([storeName], "readwrite")
      .objectStore(storeName);

    const nLocation = { item: tarefa.value, feito: false };

    const request = objectS.add(nLocation);

    carregaDb();
    tarefa.value = "";
  }
}

function carregaDb() {
  const ul = document.querySelector("ul");
  ul.innerHTML = "";
  let transactionD = db.transaction(storeName);
  let objectStor = transactionD.objectStore(storeName);

  objectStor.openCursor().onsuccess = (e) => {
    const cursor = e.target.result;
    if (cursor) {
      const lItem = document.createElement("li");
      const tItem = cursor.value.item;
      lItem.textContent = tItem;
      if (cursor.value.feito == true) {
        lItem.style.textDecoration = "line-through";
        lItem.id = "concluido";
        lItem.append(criaCheckbox(true));
      } else if (cursor.value.feito == false) {
        lItem.style.textDecoration = "none";
        lItem.removeAttribute("id");
        lItem.append(criaCheckbox(false));
      }
      lItem.append(criaDeletar());
      lItem.setAttribute("data-location-id", cursor.value.id);
      newList.appendChild(lItem);
      cursor.continue();
    }
  };
}
