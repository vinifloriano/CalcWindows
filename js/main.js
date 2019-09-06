var vaiMudar = false, cont, valor, historico = Array(), memoria = Array(), fe=false, hyp=false, deg = "deg";
//
// FUNÇÕES DE CLICAR NOS BOTÕES
//
$(document).ready(function(){
    $('#historico').click();
});

$(document).on('click', '#deg', function(){
    if(deg == "deg") {
        deg = "rad";
        this.innerHTML = "RAD";
    }
    else if(deg == "rad") {
        deg = "grad";
        this.innerHTML = "GRAD";
    }
    else {
        deg = "deg";
        this.innerHTML = "DEG";
    }
});
$(document).on('click', '#fe', function(){
    if(fe) {
        fe = false;
        this.style.borderBottom = "none";
    }
    else {
        fe = true;
        this.style.borderBottom = "3px solid red";
    }
});
$(document).on('click', '#hyp', function(){
    if(hyp) {
        hyp = false;
        this.style.borderBottom = "none";
        $('#sen').html("<span>sin</span>");
        $('#cos').html("<span>cos</span>");
        $('#tan').html("<span>tag</span>");
        $('#sen1').html("<span>sin<sup>-1</sup></span>");
        $('#cos1').html("<span>cos<sup>-1</sup></span>");
        $('#tan1').html("<span>tag<sup>-1</sup></span>");
    }
    else {
        hyp = true;
        this.style.borderBottom = "3px solid red";
        $('#sen').html("<span>sinh</span>");
        $('#cos').html("<span>cosh</span>");
        $('#tan').html("<span>tagh</span>");
        $('#sen1').html("<span>sinh<sup>-1</sup></span>");
        $('#cos1').html("<span>cosh<sup>-1</sup></span>");
        $('#tan1').html("<span>tagh<sup>-1</sup></span>");
    }
    
});

$(document).on('click', '#memoria', function(){
    $('.tab').html("<div id='div-memoria'>Não há nada salvo na memória</div>");
    var memoriaLocal =localStorage.getItem("memoria");
    while(memoriaLocal.includes(','))
        memoriaLocal = memoriaLocal.replace(',','<br>')
    document.getElementById("div-memoria").innerHTML = memoriaLocal;
    document.getElementById('mem').style.borderBottom = "3px solid red";
    document.getElementById('his').style.borderBottom = "none";
});
$(document).on('click', '#historico', function(){
    $('.tab').html("<div id='div-historico'>Ainda não há histórico</div>");
    var historicoLocal =localStorage.getItem("historico");
    while(historicoLocal.includes(','))
        historicoLocal = historicoLocal.replace(',','<br>');
    document.getElementById("div-historico").innerHTML = historicoLocal;
    document.getElementById('his').style.borderBottom = "3px solid red";
    document.getElementById('mem').style.borderBottom = "none";
});

$(document).on('click', '#ms', function(){
    memoria.push($('#valor').text());
    localStorage.setItem("memoria",memoria);
    var memoriaLocal =localStorage.getItem("memoria");
    while(memoriaLocal.includes(','))
        memoriaLocal = memoriaLocal.replace(',','<br>')
    document.getElementById("div-memoria").innerHTML = memoriaLocal;
    vaiMudar = true;
});
$(document).on('click', '#mc', function(){
    localStorage.setItem("memoria","");
    document.getElementById("div-memoria").innerHTML = "";
    memoria = Array();
});
$(document).on('click', '#mr', function(){
    var memoriaLocal =localStorage.getItem("memoria");
    memoriaLocal = memoriaLocal.split(',');
    document.getElementById("valor").innerHTML = memoriaLocal[memoriaLocal.length-1];
    vaiMudar = true;
});
$(document).on('click', '#mMais', function(){
    var memoriaLocal =localStorage.getItem("memoria");
    memoriaLocal = memoriaLocal.split(',');
    var memoria2 = "";
    for(i=0; i< memoriaLocal.length-1; i++) {
        memoria2+=memoriaLocal[i]+",";
    }
    memoria2+= parseFloat(memoriaLocal[memoriaLocal.length-1])+parseFloat($('#valor').text());
    memoria = memoria2.split(',');
    localStorage.setItem("memoria",memoria2);
    while(memoria2.includes(','))
        memoria2 = memoria2.replace(',','<br>')
    document.getElementById("div-memoria").innerHTML = memoria2;
});
$(document).on('click', '#mMenos', function(){
    var memoriaLocal =localStorage.getItem("memoria");
    memoriaLocal = memoriaLocal.split(',');
    var memoria2 = "";
    for(i=0; i< memoriaLocal.length-1; i++) {
        memoria2+=memoriaLocal[i]+",";
    }
    memoria2+= parseFloat(memoriaLocal[memoriaLocal.length-1])-parseFloat($('#valor').text());
    memoria = memoria2.split(',');
    localStorage.setItem("memoria",memoria2);
    while(memoria2.includes(','))
        memoria2 = memoria2.replace(',','<br>')
    document.getElementById("div-memoria").innerHTML = memoria2;
});
















$(document).on('click', '#igual', function(){
    carrega();
    if($('#valor2').text().substring($('#valor2').text().length-2, $('#valor2').text().length-1) == ")")
        var conta = $('#valor2').text();
    else
        var conta = $('#valor2').text()+$('#valor').text();
    let resultado;
    while(conta.includes(','))
        conta = conta.replace(',','.');
    historico.push(conta);
    if(conta.includes('^')) {
        conta = conta.split('^');
        aux = 0;
        for(i=0; i< conta.length; i++) {
            if(i==0)
                resultado = eval(conta[0]);
            else {
                resultado = Math.pow(resultado,eval(conta[i]));
            }
        }
    }
    if(conta.includes('Mod')) {
        conta = conta.split('Mod');
        aux = 0;
        for(i=0; i< conta.length; i++) {
            if(i==0)
                resultado = eval(conta[0]);
            else {
                resultado = resultado%eval(conta[i]);
            }
        }
    }
    if(conta.includes('yroot')) {
        conta = conta.split('yroot');
        aux = 0;
        for(i=0; i< conta.length; i++) {
            if(i==0)
                resultado = eval(conta[0]);
            else {
                resultado = Math.pow(resultado, 1/eval(conta[i]));
            }
        }
    }
    else {
        resultado = eval(conta);
    }
    $('#valor2').html("");
    if(fe) {
        $('#valor').html(resultado.toExponential().toString().replace('.',','));
    }
    else {
        $('#valor').html(resultado.toString().replace('.',','));
    }
    vaiMudar = true;
    historico.push("<h3>"+resultado+"</h3>");
    localStorage.setItem("historico",historico);
    var historicoLocal =localStorage.getItem("historico");
    while(historicoLocal.includes(','))
        historicoLocal = historicoLocal.replace(',','<br>')
    document.getElementById("div-historico").innerHTML = historicoLocal;
});












//
// FUNÇÕES DE APERTAR TECLAS
//
document.addEventListener('keydown', function(evt) {
    carrega();
    valor = $('#valor').text();
    valor = valor.replace(',','.');
    evt = evt || window.event;
    var key = evt.keyCode || evt.which;
    if(key>=96 && key<=105){
        val = (key-96);
        $('#'+val).css('background-color', 'rgb(192,192,192)');
        if(valor.length < 15)
            $('#valor').html(valor == "0" || vaiMudar ? $('#'+val).text().trim().replace('.',','): (valor+ $('#'+val).text().trim()).replace('.',','));
        vaiMudar = false;
    }
    switch(key) {
        case 8:
            $('#backspace').click();
            break;
        case 27:
            $('#c').click();
            break;
        case 188: case 110:
            $('#virgula').click();
            break;
        case 111: case 193:
            $('#dividir').click();
            break;
        case 106:
            $('#multiplicar').css('background-color', 'rgb(192,192,192)');
            $('#valor2').html($('#valor2').text()+$('#valor').text()+" * ");
            vaiMudar = true;
            break;
        case 109: case 189:
            $('#subtrair').css('background-color', 'rgb(192,192,192)');
            $('#valor2').html($('#valor2').text()+$('#valor').text()+" - ");
            vaiMudar = true;
            break;
        case 107: case 187:
            $('#somar').css('background-color', 'rgb(192,192,192)');
            $('#valor2').html($('#valor2').text()+$('#valor').text()+" + ");
            vaiMudar = true;
            break;
        case 13:
            if($('#valor2').text().substring($('#valor2').text().length-2, $('#valor2').text().length-1) == ")")
            var conta = $('#valor2').text();
            else
                var conta = $('#valor2').text()+$('#valor').text();
            let resultado;
            while(conta.includes(','))
                conta = conta.replace(',','.');
                if(conta.includes('^')) {
                    conta = conta.split('^');
                    aux = 0;
                    for(i=0; i< conta.length; i++) {
                        if(i==0)
                            resultado = eval(conta[0]);
                        else {
                            resultado = Math.pow(resultado,eval(conta[i]));
                        }
                    }
                }
                if(conta.includes('Mod')) {
                    conta = conta.split('Mod');
                    aux = 0;
                    for(i=0; i< conta.length; i++) {
                        if(i==0)
                            resultado = eval(conta[0]);
                        else {
                            resultado = resultado%eval(conta[i]);
                        }
                    }
                }
                if(conta.includes('yroot')) {
                    conta = conta.split('yroot');
                    aux = 0;
                    for(i=0; i< conta.length; i++) {
                        if(i==0)
                            resultado = eval(conta[0]);
                        else {
                            resultado = Math.pow(resultado, 1/eval(conta[i]));
                        }
                    }
                }
            else {
                resultado = eval(conta);
            }
            if(fe) {
                $('#valor').html(resultado.toExponential().toString().replace('.',','));
            }
            else {
                $('#valor').html(resultado.toString().replace('.',','));
            }
            $('#valor2').html("");
            vaiMudar = true;
            break;
    }
    atualiza();
});
eval()

function atualiza() {
    
    setTimeout(function(){
        $('.col').css('background-color', 'rgb(240,240,240)');
        $('.numeros').css('background-color', 'rgb(250,250,250)');
    },100);
    $(".col").hover(function(){
        $(this).css('background-color', 'rgb(216,216,216)');
    },function(){
        $(this).css('background-color', 'rgb(240,240,240)');
    });
    $(".numeros").hover(function(){
        $(this).css('background-color', 'rgb(216,216,216)');
    },function(){
        $(this).css('background-color', 'rgb(250,250,250)');
    });
}