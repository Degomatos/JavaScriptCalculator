onload = () => {
    document.querySelector('#bt-0').onclick = () => digito(0);
    document.querySelector('#bt-1').onclick = () => digito(1);
    document.querySelector('#bt-2').onclick = () => digito(2);
    document.querySelector('#bt-3').onclick = () => digito(3);
    document.querySelector('#bt-4').onclick = () => digito(4);
    document.querySelector('#bt-5').onclick = () => digito(5);
    document.querySelector('#bt-6').onclick = () => digito(6);
    document.querySelector('#bt-7').onclick = () => digito(7);
    document.querySelector('#bt-8').onclick = () => digito(8);
    document.querySelector('#bt-9').onclick = () => digito(9);
    document.querySelector('#bt-comma').onclick = comma;
    document.querySelector('#bt-ac').onclick = clear;
    document.querySelector('#bt-divide').onclick = () => operador('/');
    document.querySelector('#bt-times').onclick = () => operador('*');
    document.querySelector('#bt-minus').onclick = () => operador('-');
    document.querySelector('#bt-plus').onclick = () => operador('+');
    document.querySelector('#bt-equals').onclick = calcula;

//tentando usar os botoes do teclado
    document.addEventListener("keypress", function(e){
       teclado(e);
    });
}

//Variaveis para armazenar os valores digitados
let sValor = '0';
let novoNumero = true;
let valorAnterior = '0';
let operacaoPendente = null;

//atualiza visor
const refreshDisplay = () => {
    let [parteInt, parteDec] = sValor.split(',');
    let x = '';
    c = 0;
    for(let i = parteInt.length-1; i>=0; i--){
        if(++c > 3){
            x = '.'+ x;
            c = 1;
        }
        x = parteInt[i] + x;
    }
     x = x + (parteDec ? ',' + parteDec : '');
    document.querySelector('#display').innerText = x;
}

//Tratamento dos valores digitados
const digito = (n) =>{
    if(novoNumero){
        sValor = ''+n;
        novoNumero = false;
    }
    else{
        sValor += n; 
    } 
    refreshDisplay();
};

//Ponto decimal
const comma = () => {
    if(novoNumero){
        sValor = '0,';
        novoNumero = false;
    }else 
        if(sValor.indexOf(',') == -1) 
            sValor += ',';
    
    refreshDisplay();
}

//botao AC
const clear = () => {
    novoNumero = true;
    valorAnterior = 0;
    operacaoPendente = null;
    sValor = '0';
    refreshDisplay();
}

//Calculando

const valorAtual = () => parseFloat(sValor.replace(',', '.'));

const operador = (op) => {
  calcula();
  valorAnterior = valorAtual();
  operacaoPendente = op;
  novoNumero = true;
}

const calcula = () => {
    if(operacaoPendente != null){
        switch(operacaoPendente){
            case '+': resultado = valorAnterior + valorAtual(); break;
            case '-': resultado = valorAnterior - valorAtual(); break;
            case '/': resultado = valorAnterior / valorAtual(); break;
            case '*': resultado = valorAnterior * valorAtual(); break;
        }
        sValor = resultado.toString().replace('.', ',');
    }
    novoNumero = true;
    operacaoPendente = null;
    valorAnterior = 0;
    refreshDisplay();
}

//teclado
const teclado = (e) => {
    let btn = null;
    switch (e.key){
        case '1': btn = document.querySelector('#bt-1'); btn.onclick(); break;
        case '2': btn = document.querySelector('#bt-2'); btn.onclick(); break;
        case '3': btn = document.querySelector('#bt-3'); btn.onclick(); break;
        case '4': btn = document.querySelector('#bt-4'); btn.onclick(); break;
        case '5': btn = document.querySelector('#bt-5'); btn.onclick(); break;
        case '6': btn = document.querySelector('#bt-6'); btn.onclick(); break;
        case '7': btn = document.querySelector('#bt-7'); btn.onclick(); break;
        case '8': btn = document.querySelector('#bt-8'); btn.onclick(); break;
        case '9': btn = document.querySelector('#bt-9'); btn.onclick(); break;
        case '0': btn = document.querySelector('#bt-0'); btn.onclick(); break;
        //operacoes
        case ',': btn = document.querySelector('#bt-comma'); btn.onclick(); break;
        case '/': btn = document.querySelector('#bt-divide'); btn.onclick(); break;
        case '*': btn = document.querySelector('#bt-times'); btn.onclick(); break;
        case '-': btn = document.querySelector('#bt-minus'); btn.onclick(); break;
        case '+': btn = document.querySelector('#bt-plus'); btn.onclick(); break;
        case 'Enter': btn = document.querySelector('#bt-equals'); btn.onclick(); break;
    }
}