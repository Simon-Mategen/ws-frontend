var $carousel = $('.carousel').flickity({
    prevNextButtons: false
  });

function getTweets(name){
    // Metod som söker och hämtar tweets om en person.
    // Args: name: Namnet på personen som tweets ska handla om
    return function(){
        
        $carousel.flickity('destroy');
        $('.carousel').empty();
    
        var tempname = name.replace(/ /g, '+');

        $.ajax({
            url: "http://localhost:4567/api/v1/tweet/"+tempname,
            headers: {"Accept": "application/json"},
            error: function(response) {
                $carousel = $('.carousel').flickity({
                    wrapAround: true, 
                    prevNextButtons: false,
                    pageDots:false                  
                  });
                  $('.carousel').append('<div class="carousel-cell"> <p>Inga tweets hittade</p>');
                  $('#container main').css({"height" : "70vh"}); 
            } 
        })

            .done(function(details){    
                                                                         
                for(i = 0; i < details.length; i++){
                    $('.carousel').append('<div class="carousel-cell"> <p>'+details[i]["författare"]+'</p> <p>'+details[i]["text"]+'</p> <p> <a href ='+details[i]['url']+' target="_blank"> Klicka här för att se tweeten på twitters hemsida</a> </p> <img src="loggor/twitter.png">  <p class ="tid">'+details[i]["datum"]+'</p></div>');           
                }
                
                $carousel = $('.carousel').flickity({
                    wrapAround: true, 
                    prevNextButtons: true,
                    pageDots:false,
                    draggable: false
                  });
                
            });
    }
}

function getLink(id){
    // Metod som hämtar en länk till mer information om en person
    // Args: id: id-numret på personen som valts
    return function(){
        $.ajax({
            url: "http://localhost:4567/api/v1/link/"+id,
            headers: {"Accept": "application/json"} 
        })

        .done(function(details){
            $('#link').html('<a href= "'+details+'" target="_blank"> Mer info</a>');
        });
    }
}


function updatePersonInfo(id){
    // Metod som hämtar information om en vald person och uppdaterar sidan efter det
    // Args: id: id-numret på personen som valts
    return function(){
        
        $.ajax({
            url: "http://localhost:4567/api/v1/ledamoter/"+id,
            headers: {"Accept": "application/json"} 
            })

            .done(function(details)
            {
                console.log(details);
                $('#personNamn').text(details['namn']);
                $('#bild').html('<img src="' + details['bild'] + '">');
                $('#information').text("Mer info om " + details['namn'] + " finner du här: ");
                $('#parti').text("Parti: "+details['parti']);
            });
        
        
        $('#text').css({"outline-style":"dashed","outline-color": "#9F90BC"});
        $('#container main').css({"height" : "100vh"}); 
    }
}

$(document).ready(function(){
    // Metod som ger sidan sitt startutseende. Söker efter partinamn att sortera efter och söker efter alla namn att lägga till i listan
    $('#container main').css({"height" : "70vh"}); 

    $.ajax({
        url: "http://localhost:4567/api/v1/partier",
        headers: {"Accept": "application/json"} 
    })

    .done(function(partier){
        var i;
        for(i=0;i<partier.length;i++){
           $('#party').append('<option value="'+partier[i]+'">'+partier[i]+'</option>');
        }
    });

    getAll();
    
});

function submitForm(){
    // Metod som körs när en förändring har gjorts i dropdown-forumuläret
    var parti =  $("#party").val();

    if (parti == "alla"){
        getAll();
    }
    

    $('ul').empty();

    $.ajax({
        url: "http://localhost:4567/api/v1/ledamoter/parti/" +parti,       
        headers: {"Accept": "application/json"} 
    })
    
    .done(function(data){
        var i;
        for(i = 0; i < data.length; i++){
            html = ' <li id="person_' + i + '">' + data[i]['namn'] + '</li>';
        
            $('#personer').append(html);
            $('#personer').append('\n');
            $('#person_' + i).click(updatePersonInfo(data[i]['id']));
            $('#person_' + i).click(getTweets(data[i]['namn']));
            $('#person_' + i).click(getLink(data[i]['id']));
            
        }
    }); 
  } 


  function getAll() {
    $.ajax({
        url: "http://localhost:4567/api/v1/ledamoter",
        headers: {"Accept": "application/json"} 
        
    })
    
    .done(function(data){
        var i;
        for(i = 0; i < data.length; i++){
            html = ' <li id="person_' + i + '">' + data[i]['namn'] + '</li>';
            
            $('#personer').append(html);
            $('#personer').append('\n');
            $('#person_' + i).click(updatePersonInfo(i));
            $('#person_' + i).click(getTweets(data[i]['namn']));
            $('#person_' + i).click(getLink(data[i]['id']));
    
        }; 
        });
  }

function parallax_height() {
    // Metod som kontrollerar parallaxen på sida
    var scroll_top = $(this).scrollTop();
    var sample_section_top = $(".sample-section").offset().top;
    var header_height = $(".sample-header-section").outerHeight();
    $(".sample-section").css({ "margin-top": header_height });
    $(".sample-header").css({ height: header_height - scroll_top });
}
  
parallax_height();
$(window).scroll(function() {
    parallax_height();
});
$(window).resize(function() {
    parallax_height();
});
