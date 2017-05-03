
window.dwnld = function(elem) {
	
	var link 	= $(elem).attr('link');
	var title 	= $(elem).attr('title');
	var is_mp3 	= $(elem).attr('mp3');
	
	var url 		 = "http://localhost:8080/xhr";
	var headers  = new Headers();
	headers.append("link", link);
	headers.append("is_mp3", is_mp3);
	var options = 	{	
							method: 'GET', 
							headers: headers 
						};
	var request = new Request(url, options);

	fetch(request)
		.then(function(res){
			flash_show(elem);
			return res.blob();
		})
		.then(function(blob){
			
			var type = ( is_mp3 === '0' ) ? 'video/mp4' : 'audio/mp3';
			var ext  = ( is_mp3 === '0' ) ? '.mp4' : '.mp3';

			var blob = new Blob([blob], {type: type});
   		if(window.navigator.msSaveOrOpenBlob) {
      		window.navigator.msSaveBlob(blob, filename);
			}
			else{
				var elem = window.document.createElement('a');
				elem.href = window.URL.createObjectURL(blob);
				elem.download = title + ext;        
				document.body.appendChild(elem);
				elem.click();        
				document.body.removeChild(elem);
				//flash_hide();
			}
		})
		.catch(function(err){
			console.error("Error! " + err);
		});
}

function flash_show(elem) {
	//$(elem).parent().parent().parent().prepend("<div class='flash-message'><p> One second while we process your video for download... </p></div>");
	alert("One second while we process your video for download...");
}

function flash_hide(){
	$('.flash-message').remove();
}

module.exports 	= dwnld;