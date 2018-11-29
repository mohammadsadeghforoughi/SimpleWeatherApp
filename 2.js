const getjson = async function () {
    try {

        var contry = await $.getJSON("https://restcountries.eu/rest/v2", function (data, textStatus, jqXHR) {
            return data;
        });
        for (var key in contry) {
            var option = "<option value=" + '"' + contry[key].name + '"' + ">" + contry[key].name + "</option>";
            $("#contries").append(option);

        }
        $("#flg").css("background", "");
        $("#sbmt").click(function () {
            event.preventDefault();
            var selected = $('#contries').find(":selected").text();
            showdata(selected, contry);
            $("#contries").hide();
            $("#sbmt").hide();
        });

    } catch (err) {
        console.log(err);
    }
}
const gewe = async function (city) {
    try {
        var weather = await $.getJSON("https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=44672afd4aa49a47cb811b2b6d0820fa", function (data, textStatus, jqXHR) {
            return data;
        });
 var tmp=weather.main.temp+" F";
 var hum=weather.main.humidity;
 var pre=weather.main.pressure;
 var vis=weather.visibility;
 $("#tmp").html(tmp);
 $("#hum").html(hum);
 $("#pre").html(pre);
 $("#vis").html(vis);
 
 var icon=weather.weather[0].icon;

 var iconurl="http://openweathermap.org/img/w/"+icon+".png";
  $("#stat").append(weather.weather[0].description);
 $(" #stat").append('<img height="150px"   src="' + iconurl + '">');

    } catch (err) {
        console.log(err);
    }
}

function showdata(name, contry) {
    var selected = {};
    for (var key in contry) {
        if (contry[key].name == name) {
            selected = contry[key]
        }

    }
    var namecontry = selected.name + " (" + selected.translations.fa + ")";
    var nname = selected.nativeName  ;
    var callingCodes = selected.callingCodes;
    var capital = selected.capital;
    var flag = selected.flag;
    var population = selected.population+" person";
    var region = selected.region;
    var lang = selected.languages[0].nativeName;
    var tzone=selected.timezones;
    var cnum="+"+selected.callingCodes;
    console.log(selected)
    $("#name").append(namecontry);
    $("#nname").append(nname);
    $("#capitalshow").append(capital);
    $("#capital").append(capital);
    $("#region").append(region);
    $("#population").append(population);
    $("#lang").append(lang);
    $("#tzone").append(tzone);
    $("#cnum").append(cnum);
    gewe(capital);
    $(" #flag").append('<img height="200px" class="rounded" id="flg" src="' + flag + '">');
 

}
getjson();