let titulo
let tamanho = 2

for (let i = 1; i < 7; i++) {
  titulo = document.querySelector(`h${i}`)
  if (titulo != null) {
    inputRange()
    break
  }
}

function inputRange() {
  const rangeI = document.createElement("div")
  rangeI.classList.add("box")
  rangeI.innerHTML = "<div class='input'><input type='range' min='1' max='8' value='5'></input><div class='value'>5</div></div>"
  

  const br = document.createElement("br")

  titulo.parentNode.insertBefore(br, titulo.nextSibling)
  titulo.parentNode.insertBefore(rangeI, titulo.nextSibling)
  rangeInput()
  rangeCss()
}

function rangeInput() {
  const rangeInput = document.querySelector("input")
  const value = document.querySelector(".value")
  
  rangeInput.oninput = ()=>{
    let rangeI = rangeInput.value
    value.innerText = rangeI
    titulo.style.fontSize = `${rangeI}em`
  }
}

function rangeCss(){
  const box = document.querySelector(".box")
  const input = document.querySelector(".input")
  const inputR = document.querySelector("input")
  const value = document.querySelector(".value")
  box.style.display = "flex"
  box.style.alingItems = "center"
  box.style.margin = "0 auto"
  box.style.backgroundColor = "white"
  box.style.padding = "5px"
  box.style.borderRadius = "5px"
  box.style.width = "250px"
  
  input.style.display = "flex"
  input.style.alingItems = "center"
  input.style.margin = "0 auto"
  
  inputR.style.width = "200px"
  
  value.style.paddingLeft = "5px"
}
