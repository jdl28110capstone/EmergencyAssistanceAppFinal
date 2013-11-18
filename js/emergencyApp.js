var emergencyApp = {

	init: function () {

		if (isConfigured) {  //el usuario entro un numero de telefono y acepto los terminos de servicio
			emergencyApp.createEvents();  //la aplicacion espera porque los botones se aprieten
			$login.hide();  //esconde la pagina de login
			$main.fadeIn("fast", emergencyApp.mainPage());  //la pagina de los botones call aparece

		} else {
			$registrationPage.hide();
			$login.show();
			
			$registerButton.click(function () {
				$sections.hide();
				$registrationPage.fadeIn("fast");
				emergencyApp.registrationPage();
			});
			
			$done.click(function () {
				var $termsAccepted = $("#termsAccepted").is(":checked");
				console.log($termsAccepted);
				
				//if ($termsAccepted && $phoneNumber.val().length == 10 && $userPassword.val() == $password.val() ) {
					//var numero = parseInt($phoneNumber.val(), 10);
					//var numNoDecimal= parseInt(numero); //si termsAccepted esta marcado, el largo del numero de telefono es 10, y el password de usuario es igual al password guardado...
					//if (!isNaN(numero) && numero === numNoDecimal && numero > 0){  //esto se cumple solo si el numero de telefono es un numero y no es decimal y es positivo
				//if ($termsAccepted) {
						isConfigured = true;
				//window.localStorage["username"]= phoneNumber.val();
						console.log($termsAccepted);
						emergencyApp.init();  //recursion para comenzar Configurado
					//}
				//}
			});  
		}   
	},

	mainPage: function () {

		$other.click(function () {
			$sections.hide();
			arrayStack.push($main);
			$otherServices.fadeIn("fast");
		});
	},
	
	registrationPage: function() {
		$register.click(function () {

        if ( $userName.val() !== null || $password.val() !== null || $confirmPassword.val() !== null || $name.val() !== null) {
             if( $password.val() == $confirmPassword.val()) {
                 var numero = parseInt($phoneNumber.val(), 10);
                 var numNoDecimal= parseInt(numero); //si termsAccepted esta marcado, el largo del numero de telefono es 10, y el password de usuario es igual al password guardado...
                 if (!isNaN(numero) && numero === numNoDecimal && numero > 0){

                    $.ajax({
                        type : "GET",
                        url : "http://eaa.ece.uprm.edu:3000/registerDevice",
                        contentType : "application/json",
                        data: {username: dUsername, password: dPassword, name:name},
                        success : function(responseServer){
                           if(responseServer.validacion == "ok"){

                    /// si la validacion es correcta, muestra la pantalla "LoginPage"

                                $sections.hide();
                                $login.show();

                             }

                        },
                         error: function(){
                             navigator.notification.alert("Your registration failed", function() {});
                         }
                     });
                 }
             }
        }
		});
	},
	
	chatTime: function(category) {

		// navigator.geolocation.getCurrentPosition(onSuccess, onError);
	
		// var onSuccess = function(position) {
		},

	createEvents: function () {

		$registerButton.click(function () {
			$sections.hide();
			$registrationPage.fadeIn("fast");
		});

		$back.click(function () {
			$sections.hide();
            $main.fadeIn("fast", emergencyApp.mainPage());
        });

		$police.click(function() {
			$sections.hide();
            var category = 'police';
			arrayStack.push($main);
            searchfor(category);
            setTimeout(function(){
                    $call.fadeIn("fast");}
                , 4000);
		});

		$firefighters.click(function(){
			$sections.hide();
            var category = 'firefighter';
			arrayStack.push($main);
            searchfor(category);
            setTimeout(function(){
                    $call.fadeIn("fast");}
                , 4000);
        });

		$ambulance.click(function(){
			$sections.hide();
            var category = 'ambulance';
            arrayStack.push($main);
            searchfor(category);
            setTimeout(function(){
                    $call.fadeIn("fast");}
                , 4000);
		});

		$call911.click(function(){
			arrayStack =[];
            if (navigator.userAgent.indexOf("Android") != -1) {
                document.location.href = 'tel:911';
            } else if (navigator.userAgent.indexOf("iPhone") != -1) {
                window.location = 'telprompt://911';
            }
		});

		$hospitals.click(function() {
			$sections.hide();
			arrayStack.push($otherServices);
            searchfor('hospital');
            setTimeout(function(){
                    $hospitalPage.fadeIn("fast");
                    var positions= new Position();
                    Map.displayMap(positions.getPositions());;}
                , 4000);


        });

		$towingServices.click(function(){
			$sections.hide();
			arrayStack.push($otherServices);
            var category = 'towingservices';
            searchfor(category);
            setTimeout(function(){
                    $call.fadeIn("fast");}
                , 4000);
		});

		$chatButton.click(function(){
			$sections.hide();
			arrayStack.push($otherServices);
			$chooseChat.fadeIn("fast");
		});
		
		$chatPolice.click(function(){
			$sections.hide();
			arrayStack.push($chooseChat);
			emergencyApp.chatTime("police");
			$chat.fadeIn("fast");
		});
		
		$chatFirefighters.click(function(){
			$sections.hide();
			arrayStack.push($chooseChat);
			emergencyApp.chatTime("firefighters");
			$chat.fadeIn("fast");
		});
		
		$chatAmbulance.click(function(){
			$sections.hide();
			arrayStack.push($chooseChat);
			emergencyApp.chatTime("ambulance");
			$chat.fadeIn("fast");
		});
		
		$startChat.click(function(){
			$sections.hide();
			$chatPage.fadeIn("fast");
			//chat(usersArray[counter]);
			chat.start();
		});
		
		$chatNextButton.click(function(){
			$sections.hide();
			if(counter < usersArray.length-1)
			{
				counter++;
				arrayStack.push($chat);
				receiver = usersArray[counter];
				$chat.fadeIn("fast");
			} else {
				counter = 0;
				arrayStack = [];
				$sections.hide();
				$main.fadeIn("fast");
			}
		});
		
		$callNext.click(function(){
            arrayStack = [];
            Next();
		});
		
		$hangUp.click(function(){
			arrayStack = [];
            CallNumber();
		});
		
		$previous.click(function(){
		$sections.hide();
		arrayStack.pop(arrayStack.length-1).fadeIn("fast");
		counter = counter > 0 ? counter - 1 : counter; 
		});
		

	}
};

//Recopila toda la informacion necesaria para Hospitales o llamadas
// Latitud y Longitud por medio de Geolocation
// Ciudad, Pais y estado utilizando Geocoder
// Se encuentra la funcion displayMap para crear y desplegar las posiciones, y rutas
// Se busca la lista de telefones y latitudes y longitudes ( en caso de Hospitales)
function searchfor(Category){


    var geolocationOptions = {
        timeout: 15 * 1000, // 15 seconds
        maximumAge: 10 * 1000, // 10 seconds
        enableHighAccuracy: true
    };
    var positions = new Position();

    navigator.geolocation.getCurrentPosition(
        function (location) {
            var latitude = location.coords.latitude;
            var longitude = location.coords.longitude;

            positions.savePosition(
                new Coords(
                    location.coords.latitude,
                    location.coords.longitude,
                    location.coords.accuracy
                ), "Country", "State", "City", window.localStorage["username"]
            );
            getlistofservices(Category, latitude, longitude, positions);
        },

        function locationFail() {
            alert('Oops, could not find you, is your GPS enable?');
        }, geolocationOptions);

    }




//realiza la llamada de servidor, llama siempre al número de teléfono primero en la lista
// Ya que Next la lista se actualiza
function CallNumber(){
    var position = new Position();
    var numbers =  position.getPositions();
    var telephone = numbers[0].mobile;
    alert("Numero a llamar: "+ telephone);
    if (navigator.userAgent.indexOf("Android") != -1) {
        document.location.href = 'tel:' + telephone;
    } else if (navigator.userAgent.indexOf("iPhone") != -1) {
        window.location = 'telprompt://' + telephone;
    }
}



//funcion para realizar la llamada al otro servidor en la lista, actualiza la lista borrando el objeto tipo mobil
// primero en la lista, cosa de que cuando se llame CallNumber, se utilice el proximo numero.
function Next(){
    var numbers = new Position();
    numbers.deletePosition(0);
    CallNumber();
}