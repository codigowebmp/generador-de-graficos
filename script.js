//Variable que guarda la cantidad de leyendas a insertar en el gráfico
let cantidadLeyendas;
//Este arreglo guardara los pares de elementos que se insertaran en el grafico:
//Se guardara en formato de arreglo. Ejemplo: 
//[['leyenda 1', 600],['leyenda 2', 200]]
var arregloDatos = [];

//Funciòn que agregar una leyenda mas
function agregarDato() {
    //tomo la cantidad de leyendas actual
    cantidadLeyendas = document.getElementsByClassName("dato").length;
    //Le sumo 1
    cantidadLeyendas++;

    //Creo un nuevo elemento div, que contendra los datos nuevos
    const dato = document.createElement("div");
    dato.className = "dato";

    //Creo el input de la leyenda y le asigno sus propiedades y clases
    const inputLeyenda = document.createElement("input");
    inputLeyenda.type = "text";
    inputLeyenda.className = "serie";
    inputLeyenda.placeholder = "Leyenda " + cantidadLeyendas;
    //Agrego el input al div datos
    dato.appendChild(inputLeyenda);
    document.getElementById("datos").appendChild(dato);

    //Creo el input para el valor y le asigno sus propiedades y clases
    const inputValor = document.createElement("input");
    inputValor.type = "text";
    inputValor.className = "valor";
    inputValor.placeholder = "Valor " + cantidadLeyendas;
    //Agrego el input al div datos
    dato.appendChild(inputValor);
    document.getElementById("datos").appendChild(dato);
}

//Función que cargar el gràfico de Google
function cargarGrafico() {
    // Cargo el gráfico de Google
    google.charts.load('current', {
        'packages': ['corechart']
    });
    google.charts.setOnLoadCallback(drawChart);
}

// Dibujo el gráfico y coloco los valores
function drawChart() {
    arregloDatos = [];
    //Recupero los inputs que hay dentro del div datos
    var datos = document.getElementById("datos").getElementsByTagName("input");
    //El primer par [x,x] a insertar en arregloDatos debe ser info del grafico.
    //Esta info no es visible, por lo tanto es indistinto el valor que le asignemos

    //Controlo que todos los input tengan un valor cargado
    for (i = 0; i < datos.length; i++) {
        if (datos[i].value === "") {
            alert("Cargue todos los campos");
            return;
        }
    }
    var t = ['Gráfico', ''];
    arregloDatos.push(t);

    for (i = 0; i < datos.length; i = i + 2) {
        //voy agregando los pares al arreglo arreglo arregloDatos.
        t = [datos[i].value, parseInt(datos[i + 1].value)];
        arregloDatos.push(t);
    }

    //Genero la tabla que contiene los datos con el arreglo arregloDatos
    var data = google.visualization.arrayToDataTable(arregloDatos);

    // Opcional; Agrego el título del gráfico
    var options = {
        'title': document.getElementById("titulo").value,
        'width': 600,
    };

    // Muestro el gráfico dentro del elemento <div>  con id="piechart"
    //dependiendo del tipo de grafico
    if (document.getElementById("tipo").value == "circular") {
        var chart = new google.visualization.PieChart(document.getElementById('piechart'));
        chart.draw(data, options);
    } else {
        var chart = new google.visualization.ColumnChart(document.getElementById('piechart'));
        chart.draw(data, options);
    }

}