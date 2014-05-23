function instagrid(e) {
	var c = e.container !== undefined ? e.container : error('container');
	var key = e.client_id !== undefined ? e.client_id : error('client_id');
	var w = e.width !== undefined ? e.width : 5;
	var h = e.height !== undefined ? e.height : 2;
	console.log(c, w, h);
	makeBlocks(c,key,w,h);
}

function makeBlocks(c,key,w,h) {
	tot = w*h;
	var container = document.getElementById(c)
	$.ajax({
		type: "GET",
		dataType: "jsonp",
		cache: false,
		url: 'https://api.instagram.com/v1/users/257720515/media/recent/?client_id='+key+'&count='+tot,
		success: function(d) {
			for(i=0;i<tot;i++) {
				var block = document.createElement('div');
				block.className='insta-block';
				block.style.width=100/w+'%';
				block.style['padding-bottom']=100/w+'%';
				block.style['background-image']='url('+d.data[i].images.standard_resolution.url+')';
				container.appendChild(block);
			}
		},
		error: function(xhr, ajaxOptions, thrownError) {
			console.log(xhr.status, thrownError);
		}
	});
}

function error(message) {
	this.message = message;
	this.name = 'FatalError';
}