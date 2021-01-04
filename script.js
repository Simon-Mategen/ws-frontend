var $carousel = $('.carousel').flickity({
    prevNextButtons: false
  });

function updatePersonInfo(details,tweets,link){
    // metod som uppdaterar informationen på sidan efter vald person
    return function(){
        
        $('#personNamn').text(details['tilltalsnamn'] + " " + details['efternamn']);
        $('#bild').html('<img src="' + details['bild_url_max'] + '">');
        $('#information').text("Mer info om " + details['tilltalsnamn'] + " " + details['efternamn'] + " finner du här: ");
        $('#link').html('<a href= "'+link['linkUrl']+'" target="_blank"> Mer info</a>');
        $('#text').css({"outline-style":"dashed","outline-color": "#9F90BC"});

        $carousel.flickity('destroy');
	    $('.carousel').empty();
        
        
        for(i = 0; i < tweets.tweets.length; i++){
            $('.carousel').append('<div class="carousel-cell"> <p>'+tweets["tweets"][i]["name"]+'</p> '+tweets["tweets"][i]["content"]+'</p> <p>'+tweets["tweets"][i]["url"]+'</p> <p>'+tweets["tweets"][i]["date"]+'</p></div>');           
            
        }
        
        $carousel = $('.carousel').flickity({
            wrapAround: true, 
            prevNextButtons: true,
            pageDots:false
          });
        

        switch(details['parti'])
        {
            case "L":
            $('#parti').text("Liberalerna");
            break;
            case "M":
            $('#parti').text("Moderaterna");
            break;
            case "S":
            $('#parti').text("Socialdemokraterna");
            break;
            case "C":
            $('#parti').text("Centerpartiet");
            break;
            case "SD":
            $('#parti').text("Sverigedemokraterna");
            break;
            case "V":
            $('#parti').text("Vänsterpartiet");
            break;
            case "MP":
            $('#parti').text("Miljöpartiet");
            break;
            case "KD":
            $('#parti').text("Kristdemokraterna");
            break;
            default:
            $('#parti').text("Partitillhörighet");
            break;
        }
        
        
    }
}

$(document).ready(function(){

    $.ajax({
    url: "http://data.riksdagen.se/personlista/?iid=&fnamn=&enamn=&f_ar=&kn=&parti=&valkrets=&rdlstatus=&org=&utformat=json&sort=sorteringsnamn&sortorder=asc&termlista=",
    headers: {"Accept": "application/json"} 
    })

    .done(function(data)
    {
        var i;
        for(i = 0; i < data['personlista']['@hits']; i++){
        html = ' <li id="person_' + i + '">' + data['personlista']['person'][i]['sorteringsnamn'] + '</li>';
      
        $('#personer').append(html);
        $('#personer').append('\n');
        
        // Ajax anrop till tweets här

        var tweets = {"tweets":[    
            {"name":"Ram", "content":"det här är tweet 1", "url":"det här är länken till tweeten", "date":"2020-12-26"},    
            {"name":"Uno", "content":"det här är tweet 2", "url":"det här är länken till tweeten", "date":"2020-12-27"},  
            {"name":"Ram", "content":"det här är tweet 3", "url":"det här är länken till tweeten", "date":"2020-12-28"}  
        ]};

        // Ajax anrop för informationslänk

        var link = {
            "linkUrl" : "http://www.google.com"
        };

        $('#person_' + i).click(updatePersonInfo(data['personlista']['person'][i], tweets, link))
        }; 
    });
});

function submitForm(){
    
    var parti =  $("#party").val();

    if (parti == "alla"){
        parti = "";
    }

    $('ul').empty();
        $.ajax({
        url: "http://data.riksdagen.se/personlista/?iid=&fnamn=&enamn=&f_ar=&kn=&parti="+parti+"&valkrets=&rdlstatus=&org=&utformat=json&sort=sorteringsnamn&sortorder=asc&termlista=",
        headers: {"Accept": "application/json"} 
        })
    
        .done(function(data)
        {
            var i;
            for(i = 0; i < data['personlista']['@hits']; i++)
            {
            
            
            html = '';
            html = ' <li id="person_' + i + '">' + data['personlista']['person'][i]['sorteringsnamn'] + '</li>';
          
            $('#personer').append(html);
            $('#personer').append('\n');
            
            var tweets = {"tweets":[    
                {"name":"Ram", "content":"det här är tweet 1", "url":"det här är länken till tweeten", "date":"2020-12-26"},    
                {"name":"Uno", "content":"det här är tweet 2", "url":"det här är länken till tweeten", "date":"2020-12-27"},  
                {"name":"Ram", "content":"det här är tweet 3", "url":"det här är länken till tweeten", "date":"2020-12-28"}  
            ]};

            $('#person_' + i).click(updatePersonInfo(data['personlista']['person'][i],tweets)
            )};
            
        }); 
  } 

  function parallax_height() {
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

