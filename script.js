var films;
var salida = "";
var imprimir = "", busqueda, pelicula;
var imagenes = ["img/The_phatom_Menace.jpg", "img/Attack_of_the_clones.jpg", "img/Revange_of_the_Sith.jpg", "img/A_new_hope.jpg", "img/The_empires_strikes_back.jpg", "img/Return_of_the_Jedi.jpg", "img/The_force_awakens.jpg"];

//  LLamada al Json general con las 7 peliculas con la que muestro la sección general de la página.


$(document).ready(function () {
    $.getJSON('https://swapi.co/api/films/').done(function (data) {
        films = data.results.map(function (item) {
            item["imagen"] = imagenes[item.episode_id - 1]
            return item;
        });
        films.sort(function (item1, item2) {
            return item1.episode_id > item2.episode_id;
        });
        console.log(films);
        tabla();
    });
});

// Aquí imprimo la sección principal con la portada de las 7 películas creando un div row cada 4 películas


function tabla() {
    for (i = 0; i < films.length; i++) {
        console.log("hola")
        if (i == 0) {
            salida += '<div class= "row">';
        }
        else if ((i % 4) == 0) {
            salida += '</div><div class= "row">';
        };
        salida += '<div class="col-lg-3 col-sm-6 col-12 text-center contenedor" ><img class="image" src="' + films[i].imagen + '"><div class="middle"><div class="text title">' + films[i].title + '</div><div class="text date">' + films[i].release_date + '</div> <button class="botonInfo" onclick="info(films,' + i + ')">See more..</button></div></div>';
    };
    if (i != 0) {
        salida += "</div>";
    }
    document.getElementById("allFilms").innerHTML = salida;
};

// En esta función hago la llamada al Json de la película que el usuario haya buscado y oculto las demás secciones para mostrar las caratulas y el botón de info de las películas que coincidan con la buqueda del usuario.


function search() {
    busqueda = document.getElementById("search").value;
    $.getJSON('https://swapi.co/api/films/?search=' + busqueda).done(function (data) {
        pelicula = data.results.map(function (item) {
            item["imagen"] = imagenes[item.episode_id - 1]
            return item;
        });
        pelicula.sort(function (item1, item2) {
            return item1.episode_id > item2.episode_id;
        });
       
        if (busqueda == "") {
            
    document.getElementById('search').style.background = "white";
            $("#allFilms").show();
            $("#oneFilm").hide();
            $("#filmSearch").hide();
            
        }else if (pelicula.length == 0) {
            
        document.getElementById('search').style.background = "red";
            
        }else {
            document.getElementById('search').style.background = "white";
            $("#allFilms").hide();
            $("#oneFilm").hide();
            $("#filmSearch").show();
            salida = "";
            for (i = 0; i < pelicula.length; i++) {
                if (i == 0) {
                    salida += '<div class= "row">';
                }
                else if ((i % 4) == 0) {
                    salida += '</div><div class= "row">';
                };
                salida += '<div class="col-lg-3 col-sm-6 col-12 text-center contenedor" ><img class="image" src="' + pelicula[i].imagen + '"><div class="middle"><div class="text title">' + pelicula[i].title + '</div><div class="text date">' + pelicula[i].release_date + '</div> <button class="botonInfo" onclick="info(pelicula,'+ i + ')">See more..</button></div></div>';
            };
            if (i != 0) {
                salida += "</div>";
            };
            document.getElementById("filmSearch").innerHTML = salida;
        };
    });
}
console.log(pelicula);

// Función para mostrar la tabla de información de cada película

function info(array, num) {
    
    salida = '<div class="row text-center"><div class="container col-lg-3 col-md-12"><img class="infoImage" src="' + array[num].imagen + '"></div><div class=" container col-lg-9 col-md-12"><table class="table table-hover "><thead><tr><th>Title</th><th>Description</th><th>Directed by</th></tr></thead><tbody class="infoTable"><tr><td>' + array[num].title + '</td><td>' + array[num].opening_crawl + '</td><td>' + array[num].director + '</td></tr></tbody></table></div></div>';
    document.getElementById("oneFilm").innerHTML = salida;
    toggle();
}



// función para volver al página principal


function toggle() {
    $('#allFilms').fadeOut(1000);
    $('#oneFilm').fadeIn(1000);
    $('#filmSearch').hide(500);
}

// función para esconder la página principal y la de busqueda para mostrar la de info

function atras() {
    $('#oneFilm').fadeOut(1000);
    $('#allFilms').fadeIn(1000);
    $('#filmSearch').fadeOut(1000);
};

// Código jQuery para que al presionar enter en el buscador sea como hacer click en el boton de busqueda.

$('#search').on("keydown", function (e) {
    if (e.keyCode == 13) {
        search();
    }
});