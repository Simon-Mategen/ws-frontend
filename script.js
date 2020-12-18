function updatePersonInfo(details){
    return function(){
        $('#personNamn').text(details['tilltalsnamn'] + " " + details['efternamn']);
        $('#bild').html('<img src="' + details['bild_url_192'] + '">');

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
        for(i = 0; i < data['personlista']['@hits']; i++)
        {
        
        
        html = '';
        html = '<li id="person_' + i + '">' + data['personlista']['person'][i]['sorteringsnamn'] + '</li>';
      
        $('#personer').append(html);
        $('#personer').append('\n');
        

        $('#person_' + i).click(updatePersonInfo(data['personlista']['person'][i])
        )};
        
    });
});