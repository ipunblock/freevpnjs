
var status = "none";
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

$(document).ready(function(){
	var data = { type: "FROM_PAGE", text: "loaded" };
	window.postMessage(data, "*");

  window.addEventListener("message", function(event) {
      if (event.source != window)
          return;

      if (event.data.type && (event.data.type == "FROM_EXTENSION")) {
        status = event.data.text;
		console.log(event);
		if (event.data.text == "connected" && (event.data.server != "Direct Connection" && event.data.server != "undefined" )) {
			console.log(event.data.server);

			displayConnected("<h5>You have connected to "+event.data.server+".</h5>\nYour connection is valid for 3 hours.<br>\nReconnecting will extend your connection for another 3 hours.\n");
		}
        if (status.action == "disconnected") {
          $('#modalLoader').modal('hide');
        }

      }
  })


	var userLang = navigator.language || navigator.userLanguage;
	var userLang = userLang.split('-');

	if (userLang[0] != "en") {
		$("#local").val(userLang[0]).change();

	}



async function displayConnected(txt) {

  let promise = new Promise((resolve, reject) => {
    setTimeout(() => resolve("done!"), 1000)
  });

  let result = await promise; // wait till the promise resolves (*)

  document.getElementById('modalConnectedTxt').innerHTML = txt;
	//  disabled for now...
//	$('#modalConnected').modal('show');


}
// E

});


	(function() {

        var detector = function() {
            setTimeout(function() {

                if(!document.getElementsByClassName) return;
                var ads =
			document.getElementsByClassName('banner_ad'),
                    ad  = ads[ads.length - 1];

                if(!ad || ad.innerHTML.length == 0
				|| ad.clientHeight === 0) {
	  				jhkh = true;
				} else {
                    console.log('No Ad Blocker');
                }
            }, 2000);
        }

        /* Add a page load listener */
        if(window.addEventListener) {
            window.addEventListener('load', detector, false);
        }
})();


window.onload = function () {

};


function darkMode(action) {

  $('body').css('background','#222222');
  $('h1').css('color','#fd8d1d');
  $('h1').css('color','#fbab18');
  $('#darkModeLabel').html('Dark Mode');
  $('#darkMode').prop("checked", true);
  $.cookie("darkMode", true);

  if (action == "false") {
    $('body').css('background','#F2F2F2');
    $('h1').css('color','#333333');
    $('#darkModeLabel').html('Light Mode');
    $('#darkMode').prop("checked", false);
    $.cookie("darkMode", false);
  }

}



$("#local").change(function() {

	console.log( $( "#local" ).val()   );

	var request = new XMLHttpRequest();
request.open('GET', 'https://ipunblock.com/freevpn/_locales/'+$( "#local" ).val()+'/messages.json', true);

request.onload = function() {
  if (request.status >= 200 && request.status < 400) {

    var data = JSON.parse(request.responseText);
	  console.log(data.description.message);
		$("#description").html(data.description.message);
		$("#selectServer").html(data.selectServer.message);
  } else {
    // We reached our target server, but it returned an error

  }
};

request.onerror = function() {
  // There was a connection error of some sort
};

request.send();


});


$('#getBrowserVPN').on('hidden.bs.modal', function () {
  resetConnection();
});

$('#modalLoader').on('hidden.bs.modal', function () {
  if (status != "connected"){
    resetConnection();
  }
});

function resetConnection() {
  $('#servers span').each(function(){
    $(this).removeClass('selected');
  });
  $('#servers span').first().addClass('selected');
}




$('#servers span').click(async function(){
	var premium = false;

	if($(this).hasClass('premium')) {
		premium = "true";
		alert('Premium access not yet available.  Please select a standard server.');
		return false;
	}


  status = "none";
  $('#servers span').each(function(){
    $(this).removeClass('selected');
  });

  $(this).addClass('selected');

//  $('#modalLoader').modal('show');

if ($(this).data("server") != "global") {

  var data = { type: "FROM_PAGE", text: $(this).data("server") };
  window.postMessage(data, "*");

}




if ($(this).data("server") == "global") {
  if (jhkh == true) {
  } else {
  	var data = { type: "FROM_PAGE_GLOBAL", text: $(this).data("ip")+","+$(this).data("port")+","+$(this).data("type") };
  	window.postMessage(data, "*");
  }

}

  await sleep(2000);

  if (status == "none") {
    $('#servers span').each(function(){
      $(this).removeClass('selected');
    });
    $('#servers span').first().addClass('selected');
  }


});

$('#darkMode').change(function(){
   if(this.checked) {
      darkMode('true');
    } else {
      darkMode('false');
    }
});
