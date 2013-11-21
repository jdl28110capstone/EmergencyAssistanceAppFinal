/**
 * Created by Jdl28110 on 10/16/13.
 */


function getlistofservices(Category, latitude, longitude){
    var positions = new Position();
    var position= positions.getPositions();
    var State= position[0].state;
    var City= position[0].city;
    var Country= position[0].country;


    for( var index=0; index < City.length; index++){
        if( City.charAt(index) == "ü" ){
            City = City.replaceAt(index, "u");
        }
        else if ( City.charAt(index) == "ñ" ){
            City = City.replaceAt(index, "n");
        }
        else if( City.charAt(index) == "í" ){
            City = City.replaceAt(index, "i");
        }
        else if( City.charAt(index) == "ó" ){
            City = City.replaceAt(index, "o");
        }
        else if( City.charAt(index) == "é" ){
            City = City.replaceAt(index, "e");
        }
        else if( City.charAt(index) == "á" ){
            City = City.replaceAt(index, "a");
        }
        else if( City.charAt(index) == "ú" ){
            City = City.replaceAt(index, "u");
        }
    }

    alert(" Estado: "+ State + " City: "+ City + " Country: "+ Country+ " latitude: " +latitude + " longitud: "+ longitude);

    $.ajax({
        type: "GET",
        url : "http://eaa.ece.uprm.edu:3000/mobileEmergency",
        contentType: "application/json; charset=ISO-8859-1",
        dataType: "json",
        data: {city: City, category: Category, latitude: latitude, longitude:longitude, state: "PR", country:"PR", clientPhoneNumber: window.localStorage["username"]},
        success : function(data){

            if (Category == 'hospital'){
                var latitudeList = data.latitudeList.split(",");
                var longitudeList = data.longitudeList.split(",");

                for(var i = 0; i < latitudeList.length - 1; i++){
                    alert(" Ajax Hospital");

                    alert(" Ajax Hospital latitud: "+ latitudeList[i] + " Longitude: "+ longitudeList[i]);
                    positions.savePosition(
                        new Coords(
                            latitudeList[i],
                            longitudeList[i],
                            position[i].position.accuracy
                        ), Country ,State ,City);
                }
            }
            else {
                    var phoneList = data.phoneList.split(",");
                    for(var i = 0; i < phoneList.length - 1; i++){
                    alert("" + Category);
                    alert("Latitude: "+ latitude + " longitude: "+ longitude+ " accuracy: " +position[i].position.accuracy);


                    alert("Numero de telefono en  position: " + phoneList[i] );

                    positions.savePosition(position[0].position, Country ,State ,City , phoneList[i]);

                    var positions2 = new Position();
                    var position2 = positions2.getPositions();
                    alert("Numero de telefono en  position: " + position2[0].mobile );
                    searchfor();
                }
            }
            return positions;

        },
        error: function(){
            alert("Mobile Emergency ajax failed");
        }
    });


}

    String.prototype.replaceAt=function(index, character) {
        return this.substr(0, index) + character + this.substr(index+character.length);
    }