/**
 * Created by Jdl28110 on 10/16/13.
 */


function getlistofservices(Category, latitude, longitude){
    var positions = new Position();
    var position= positions.getPositions();
    var State= position[0].state;
    var City= position[0].city;
    var Country= position[0].country;

    alert(" Estado: "+ State + " City: "+ City + " Country: "+ Country+ " latitude: " +latitude + " longitud: "+ longitude);

    $.ajax({
        type: "GET",
        url : "http://eaa.ece.uprm.edu:3000/mobileEmergency?city=" + City,
        contentType: "application/json;  charset=ISO-8859-15",
        dataType: "json",
        data: {category: Category, latitude: latitude, longitude:longitude, state: "PR", country:"PR", clientPhoneNumber: "787-472-9078"},
        success : function(data){
            alert("Entro a Ajax");
            var positions2= new Position();

            for(var i = 0; i < 1; i++){

                if (Category == 'hospital'){
                    alert("Hospital");

                    alert("Hospital latitud: "+ data[i].latitude + " Longitude: "+ data[i].longitude);
                    positions2.savePosition(
                        new Coords(
                            data[i].latitude,
                            data[i].longitude,
                            position[i].position.accuracy
                        ), Country ,State ,City , '7873627434' );

                    var position2= positions2.getPositions();
                    alert("Numero de telefono en  position: " + position2[0].mobile )

                }
                else {
                    alert("Policia");
                    alert("Latitude: "+ latitude + " longitude: "+ longitude+ " accuracy: " +position[i].position.accuracy);


                    alert("Numero de telefono en  position: " + data[i].phoneNumber );

                    positions2.savePosition(position[0].position, Country ,State ,City , data[i].phoneNumber);
                    var position2= positions2.getPositions();
                    alert("Numero de telefono en  position: " + position2[0].mobile )


                }
            }
            return positions;

        },
        error: function(){
            alert("MobileEmergency Failed");
        }
    });


}