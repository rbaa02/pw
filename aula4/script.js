const Damas = {
    pecaId: 0,
    idPeca: 0,
    jogada: 0,
  
    posAtual: '',
    pecaAtual: '',
  
    posCaptura: '',
    pecaCapturada: '',
    nomePecaCapturada: '',

     criaTabuleiro: function(){
        let tamanhoTablueiro = 8

        let tabela = document.createElement('table')
        for(let l = 0; l < tamanhoTablueiro; l++){
            const linha = document.createElement('tr')

            for(let c = 0; c < tamanhoTablueiro; c++){
                const casa = document.createElement('td')

                casa.dataset.linha = l
                casa.dataset.coluna = c
              
                casa.setAttribute('id', `${l}-${c}`)

                if (l % 2 == c % 2) {
                    casa.style.backgroundColor = 'white'
                    
                } else {
                    casa.style.backgroundColor = 'black'
                    casa.classList.add('alvo')
                  
                    if (l * 8 + c < 24) {
                          casa.append(this.criaPeca('black'))
                          
                      } else if (l * 8 + c >= 40) {
                          casa.append(this.criaPeca('red'))
                      }
                }
                linha.appendChild(casa)
            }
            tabela.appendChild(linha)
        }
        document.body.appendChild(tabela)
    },

    start: function(){
      document.addEventListener('dragstart', (e)=>{
      this.posAtual = (e.target.parentElement.id)
      this.idPeca = parseInt(e.target.id)
      this.pecaAtual = (e.target.className)
      })
    },

    over: function(){
      document.addEventListener('dragover', function(e){
        e.preventDefault()
      })
    },

    drop: function(){
      document.addEventListener('drop', (e)=>{
        e.preventDefault()
        console.log('entrou')
        if(e.target.className == 'alvo'){ 

          const peca = document.getElementById(`${this.idPeca}`)

          const la = parseInt(peca.parentElement.dataset.linha)  //linha atual
          const ca = parseInt(peca.parentElement.dataset.coluna) //coluna atual
          const ld = parseInt(e.target.dataset.linha) //linha destino
          const cd = parseInt(e.target.dataset.coluna) //coluna destino

          
          if(this.pecaAtual == 'black' && ca > cd){ // encontra a casa pra capturar (meio)
              this.posCaptura = `${la + 1}-${ca - 1}`
            
          }else if(this.pecaAtual == 'black' && ca < cd){
              this.posCaptura = `${la + 1}-${ca + 1}`
            
          }else if(this.pecaAtual == 'red' && ca > cd){
              this.posCaptura = `${la - 1}-${ca - 1}`
              
          }else if(this.pecaAtual == 'red' && ca < cd){
              this.posCaptura = `${la - 1}-${ca + 1}`
          }
        
          //capturar (encontrar a peca e guardar o nome dela)
          const alvo = (document.getElementById(this.posCaptura))
          if(alvo.childElementCount == 1){
            this.pecaCapturada = alvo.firstElementChild
            this.nomePecaCapturada = alvo.firstElementChild.className
          }
          
          if(la != ld || la == ld){ // verifica se a linha é diferente pra não pular linha

            //verifica as jogadas e se ouve alguma peça capturada
            if(this.pecaAtual == 'red' && la > ld && la - ld == 1 && this.jogada % 2 == 0 || 
              la - ld == 2 && this.nomePecaCapturada == 'black' && this.jogada % 2 == 0 ||
               this.pecaAtual == 'black' && la < ld && la - ld == -1 && this.jogada % 2 == 1 ||
               la - ld == -2 && this.nomePecaCapturada == 'red' && this.jogada % 2 == 1
              ){
                e.target.appendChild(peca)
                this.jogada ++
              
                if(la - ld == 2 || la - ld == -2){ 
                    this.pecaCapturada.remove()
                }
            }
          }
        }
      })
    },

    criaPeca: function(cor){
        let imagem = document.createElement('img')
        imagem.setAttribute('src', `img/${cor}.png`)
        imagem.classList.add(cor)
        imagem.id = `${this.pecaId++}`
        return imagem
    }
}
Damas.over()
Damas.drop()
Damas.start()
