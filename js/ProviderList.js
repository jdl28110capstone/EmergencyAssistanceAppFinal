/**
 * Created by Jdl28110 on 10/16/13.
 */


function getlistofservices(Category, latitude, longitude, positions){
    var position= positions.getPositions();
    position= Map.requestLocation(position);
    var State= position[1].state;
    var City= position[1].city;
    var Country= position[1].country;

    alert("Country: "+ Country + "  City: " + City + "  State: "+ State +
        "  Latitude: "+ position[1].position.latitude + "  Longitude: " + position[1].position.longitude +
        " Category: " + Category);


    $.ajax({
        type: "GET",
        url : "http://eaa.ece.uprm.edu:3000/mobileEmergency?City=" + City,
        contentType: "application/json;  charset=ISO-8859-15",
        dataType: "json",
        data: {category: "firefighter", latitude: latitude, longitude:longitude, state: "PR", city:City, country:"PR", clientPhoneNumber: "787-472-9078"},
        success : function(data){
            alert("Entro a success de ajax");
            alert("Mobile:" + data[0].phoneNumber );
            for(var i = 0; i < 1; i++){
                if (Category == 'hospital'){
                    positions.savePosition(
                        new Coords(
                            data[i].latitude,
                            data[i].longitude,
                            positions.position[i].accuracy
                        ), Country ,State ,City ,data[i].mobile);
                }
                else {
                    //alert("Mobile:" + data[0].phoneNumber );
                    positions.savePosition(
                        new Coords(
                            latitude,
                            longitude,
                            positions.position[i].accuracy
                        ), Country ,State ,City ,data[i].mobile);


                }
            }
            return positions;

        },
        error: function(){
            navigator.notification.alert("MobileEmergency Failed", function() {});
        }
    });

    setInterval(function(){}, 5000);

}