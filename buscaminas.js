listaA = ["a1","a2","a3","a4","a5"];

filas = 7;
columnas = 7;

resultado = ["img/0.png", "img/1.png", "img/2.png", "img/3.png", "img/4.png",
	     "img/5.png", "img/6.png", "img/7.png", "img/8.png", "img/mina.webp"];

minas = [];  
ceros = [];
seguro = false;
contadorBien = 0;
totalBien = 0;

abc = "abcdefghijk".split("");
iniciar = false;

function establecerValores() {
  filas = document.querySelector('#filas').selectedIndex + 4;
  columnas = document.querySelector('#columnas').selectedIndex + 4;

  for(i=7; i>filas; i--) {
    document.getElementById("fila_"+abc[i-1]).hidden = true;

  }

  for(i=7; i>columnas; i--) {
    for(j=0; j<filas; j++)
      document.getElementById(abc[j]+i).hidden = true;
  }

  for(i=0; i<filas; i++) {
    document.getElementById("fila_"+abc[i]).hidden = false;
  }
  
  for(i=0; i<columnas; i++) {
    for(j=0; j<filas; j++)
      document.getElementById(abc[j]+(i+1)).hidden = false;
  }

}

function ponerMinas(x, y) {
  totalBien = filas*columnas;
  
  maxMinas = Math.round(totalBien/5);
  maxMinas -= 1;
  contMinas = 0;
  valorMinas = "";

  index = abc.indexOf(x);
  z1 = abc[index+1];
  z2 = abc[index-1];
  valoresSeguros = [x+y, x+(y-1), x+(y+1), z1+y, z2+y,
		    z1+(y-1), z1+(y+1), z2+(y-1), z2+(y+1)];
  do {
    xm = Math.floor((Math.random() * filas));
    ym = Math.floor((Math.random() * columnas)+1);
    valorMinas = abc[xm] + ym;
    
    if (!valoresSeguros.includes(valorMinas) && !minas.includes(valorMinas)) {
      minas.push(valorMinas);
      contMinas++;
    }
  } while (contMinas <= maxMinas);


  totalBien -= maxMinas;
  document.getElementById("contadorMinas").innerHTML = maxMinas;

  for(i=0; i<maxMinas; i++) {
    document.getElementById("img_" + minas[i]).src = resultado[9];
  }
  mostrar(x, y);
}

function mostrar(x, y) {
  if (iniciar) {
    valor = x+y;
    if(!document.getElementById(valor).hidden) {
      document.getElementById(valor).hidden = true;
      document.getElementById("img_"+valor).hidden = false;
      contadorBien++;
    }
    evaluar(x, y);
  } 
  else {
    iniciar = true;

    document.getElementById("form").disabled = true;
    ponerMinas(x, y);
  }  
}

function fin() {
  document.getElementById("fin").hidden = false;
  for(i=0; i<minas.length; i++) {
    document.getElementById(minas[i]).hidden = true;
    document.getElementById("img_"+minas[i]).hidden = false;
  }
  for(i=0; i<50; i++)
    document.getElementsByTagName("button")[i].disabled = true;
}

  function evaluar(x, y) {
    valor = x + y;
    contador = 0;
    orilla = false;
    elementoValor = document.getElementById("img_"+valor).src;
    if (elementoValor.includes(resultado[9]) && !seguro) {
      contador = 9;
      contadorBien = 0;
      setTimeout(() => {
        document.getElementById("felicidades").hidden = true;
        document.getElementById("lastima").hidden = false;
      document.getElementById("kaboom").hidden = true;
        fin();
      }, 1000);
      document.getElementById("kaboom").hidden = false;
    }
    else if(x == "a" || x == abc[filas-1]) {
      orilla = true;
      listaOrilla(x, y);
    }
    else {
      listaMedio(x, y);
    }
    document.getElementById("img_"+valor).src = resultado[contador];
    if(contadorBien == totalBien) {
      fin();
    }
    else {
      if (contador == 0 && !ceros.includes(valor)) {
        seguro=true;
        ceros.push(valor);
        (orilla)? ceroOrilla(x,y) : ceroMedio(x,y);
      }
      else {
        seguro = false;
        contador = 0;
      }
    }
  }

  function listaOrilla(x, y) {
    index = abc.indexOf(x);
    (x=="a") ? z = abc[index+1] : z = abc[index-1];    

    if(y==1) {
      esX(x+2);
      esX(z+1);
      esX(z+2);
    }
    else if(y==columnas) {
      esX(x+(columnas-1));
      esX(z+columnas);
      esX(z+(columnas-1));
    } 
    else {
      esX(x+(y-1));
      esX(x+(y+1));
      esX(z+(y-1));
      esX(z+y);
      esX(z+(y+1));
    }
  }

  function listaMedio(x, y) {
    index = abc.indexOf(x);
    z1 = abc[index+1];
    z2 = abc[index-1];

    if(y==1) {
      esX(x+2);

      esX(z1+1);
      esX(z1+2);

      esX(z2+1);
      esX(z2+2);
    }
    else if(y==columnas) {
      esX(x+(columnas-1));

      esX(z1+columnas);
      esX(z1+(columnas-1));

      esX(z2+columnas);
      esX(z2+(columnas-1));
    } 
    else {
      esX(x+(y-1));
      esX(x+(y+1));
      
      esX(z1+(y-1));
      esX(z1+(y));
      esX(z1+(y+1));

      esX(z2+(y-1));
      esX(z2+(y));
      esX(z2+(y+1));
    }
  }

  function esX(valor) {
     if(document.getElementById("img_"+valor).src.includes(resultado[9])) {
       contador++;
     }
  }

  function ceroOrilla (x, y) {
    index = abc.indexOf(x);
    (x=="a") ? z = abc[index+1] : z = abc[index-1];
 
    if(y==1) {
      mostrar(z, 1);
      mostrar(x, 2);
    }
    else if(y==columnas) {
      mostrar(z, columnas);
      mostrar(x, (columnas-1));

    } 
    else {
      mostrar(z, y);
      mostrar(x, (y+1));
      mostrar(x, (y-1));

    }
  }

  function ceroMedio(x, y) {

    index = abc.indexOf(x);
    z1 = abc[index+1];
    z2 = abc[index-1];

    if(y==1) {
      mostrar(z2, 1);
      mostrar(x, 2);
      mostrar(z1, 1);

    }
    else if(y==columnas) {

      mostrar(z2, columnas);
      mostrar(x, (columnas-1));
      mostrar(z1, columnas);
    } 
    else {
      mostrar(z1, y);
      mostrar(x, (y-1));
      mostrar(z2, y);
      mostrar(x, (y+1));
    }
  }


function cerrar() {
  document.getElementById("fin").hidden = true;
  document.getElementById("abrir").hidden = false;
}

function abrir() {
  document.getElementById("fin").hidden = false;
  document.getElementById("abrir").hidden = true;
}