/**
 * Created by Jdl28110 on 10/16/13.
 */


function getlistofservices(Category, latitude, longitude, positions){
    var position= positions.getPositions();
    position= Map.requestLocation(position);
    var State= position[1].state;
    var City= position[1].city;
    var Country= position[1].country;

    $.ajax({
        type: "GET",
        url : "http://eaa.ece.uprm.edu:3000/mobileEmergency?City=" + City,
        contentType: "application/json;  charset=ISO-8859-15",
        dataType: "json",
        data: {category: Category, latitude: latitude, longitude:longitude, state: "PR", country:"PR", clientPhoneNumber: "787-472-9078"},
        success : function(data){
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

}