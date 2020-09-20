const tela = document.querySelector('.tela')
const telaTextoCima = document.querySelector('.d1-1')
const telaCargo = document.querySelector('.d1-2')
const telaNum = document.querySelector('.d1-3')
const telaInf = document.querySelector('.d1-4')
const telaFoto = document.querySelector('.d1-ldir')
const rodape = document.querySelector('.d2')
const telaFoto1 = document.querySelector('.d1-imagem')
const telaFoto2 = document.querySelector('.d1-imagem.pequeno')

var cursor = 0
var numero = ''
var etapa = 0

function atualizarTela(){

    if (numero == 'BRANCO'){
        limparTela()
        telaCargo.innerHTML = sessao[etapa].cargo
        telaTextoCima.innerHTML = '<span>SEU VOTO PARA </span>'
        telaInf.innerHTML = 'VOTO EM BRANCO'
        telaInf.classList.add('alerta')
        telaInf.classList.add('pisca')
        rodape.hidden = false
        
    }else if( telaNum.children[cursor] != undefined){
        telaNum.children[cursor].classList.add('pisca')
        //telaNum.children[cursor].className += ' pisca'
    }else{
        telaTextoCima.innerHTML = '<span>SEU VOTO PARA </span>'
        if (numero in sessao[etapa]){
            let inf = sessao[etapa][numero]
            
            if (sessao[etapa].vice){
                telaInf.innerHTML = `
                <span id="cnome"> Nome : ${inf.nome} </span><br>
                <span id="cpart">Partido : ${inf.partido}</span>  <br>
                <span id="cvice">Vice : ${inf.vice} </span>
                `
                
                telaFoto.innerHTML = `
                <div class="d1-imagem">
                    <img src="./${inf.foto}" alt="">
                    ${sessao[etapa].cargo}
                </div>
                <div class="d1-imagem pequeno">
                    <img src="./${inf.fotovice}" alt="">
                    VICE
                </div>
                `
                
               /*
               telaFoto1.children[0].src = `./imagens/${inf.foto}`
               telaFoto1.children[1].textContent = sessao[etapa].cargo
               telaFoto1.hidden = false
               telaFoto2.children[0].src =  `./imagens/${inf.fotovice}`
               telaFoto2.children[1].textContent = 'VICE'
               telaFoto2.hidden = false
               */
            }else{
                telaInf.innerHTML = `
                <span id="cnome"> Nome : ${inf.nome} </span><br>
                <span id="cpart">Partido : ${inf.partido}</span> <br>
                `
                
                telaFoto.innerHTML = `
                <div class="d1-imagem">
                    <img src="./${inf.foto}" alt="">
                    ${sessao[etapa].cargo}
                </div>
                `
                
               /*
               telaFoto1.children[0].src = `./imagens/${inf.foto}`
               telaFoto1.children[1].textContent = sessao[etapa].cargo
               telaFoto1.hidden = false
               */
            }

            console.log(inf)
            rodape.hidden = false
            
        } else{
            telaInf.innerHTML = '<p>Número Errado</p><p>VOTO NULO</p>'
            telaInf.classList.add('alerta')
            telaInf.classList.add('pisca')
            rodape.hidden = false
            numero = 'NULO'
            console.log('Nulo')
        }
        
    }
}

function limparTela(){
    telaTextoCima.innerHTML = ''
    telaCargo.innerHTML = ''
    telaNum.innerHTML = ''
    telaInf.innerHTML = ''
    telaFoto.innerHTML = ''
    //telaFoto1.hidden = true
    //telaFoto2.hidden = true
    rodape.hidden = true
    //rodape.innerHTML = ''
    //rodape.classList.remove('borda')
}

function padraoTela(){
    limparTela()
    telaInf.classList.remove('alerta')
    telaInf.classList.remove('pisca')
    rodape.hidden = true

    telaCargo.innerHTML = sessao[etapa]['cargo']
    let n = sessao[etapa].digitos
    telaNum.innerHTML = 'Número: '
    for(let c = 0 ; c < n ; c++){
        telaNum.innerHTML += c == 0 ? '<div class="numero pisca"></div>' : '<div class="numero" ></div>'
    }
    
}

function clicou(num){
    for(n in telaNum.children){
        let temPisca = telaNum.children[n].className
        //console.log(temPisca)
        if(temPisca != undefined){
            if( temPisca.match(/pisca/gi) != null){
                telaNum.children[n].textContent = num
                document.querySelector('.d1-3').children[n].classList.remove('pisca')
                //document.querySelector('.d1-3').children[n].className = document.querySelector('.d1-3').children[n].className.replace(/pisca/gi , '')
                numero += num
                cursor ++
                break
            }  
        }
    }
    atualizarTela() 
}

function branco(){
    numero = 'BRANCO'
    atualizarTela()
}

function corrige(){
    for(n in telaNum.children){
        telaNum.children[n].textContent = ''
    }
    cursor = 0
    numero = ''  
    padraoTela()
    console.log('corrige')
}

function confirma(){
    function avancarEtapa(){
        etapa ++
        numero = ''
        cursor = 0
        if(etapa == sessao.length){
            tela.innerHTML = '<div>FIM</div>'
            tela.children[0].classList.add('pisca')
            tela.children[0].classList.add('fim')
            setInterval(() => {
                location.reload()
            }, 10000);
            console.log('FIM')
        }
        else{
            padraoTela()
        }
    }
    let sst = sessionStorage.getItem(numero)
    if(numero == 'BRANCO'  ){
        sessionStorage.setItem( sessao[etapa].cargo + ' BRANCO', sst == null ? '1' : Number(sst[0]) + 1 )
        avancarEtapa()
    }else if (numero == 'NULO'){
        sessionStorage.setItem( sessao[etapa].cargo + ' NULO', sst == null ? '1' : Number(sst[0]) + 1 )
        avancarEtapa()
    }else if (numero != '' && numero.length == sessao[etapa].digitos){
        sessionStorage.setItem(numero , sst == null ? '1' : Number(sst) + 1)
        avancarEtapa()  
    }else{
        console.log('nehuma ação')
    }

    console.log('confirma')
}



padraoTela()