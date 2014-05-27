function instagramGrid(e) {
	var w = e.width !== undefined ? e.width : 5,
			h = e.height !== undefined ? e.height : 2,
			options = {
				'container': e.container !== undefined ? e.container : error('container'),
				'key': e.client_id !== undefined ? e.client_id : error('client_id'),
				'width': w,
				'height': h,
				'total': w*h,
				'link': e.link !== undefined ? e.link : false
			};
	getImages(options);
}

function getImages(o) {
	$.ajax({
		type: "GET",
		dataType: "jsonp",
		cache: false,
		url: 'https://api.instagram.com/v1/users/257720515/media/recent/?client_id='+o.key+'&count='+o.total,
		success: function(d) {
			makeBlocks(d,o);
		},
		error: function(xhr, ajaxOptions, thrownError) {
			console.log(xhr.status, thrownError);
		}
	});
}

function makeBlocks(d,o) {
	console.log(d);
	for(i=0;i<o.total;i++) {
		var block = document.createElement('div');
		var container = document.getElementById(o.container);
		block.id='image-'+i;
		block.className='insta-block';
		if(o.link) {
			block.className+=' clickable';
			block.addEventListener('click', function(){
				var imageContain = document.createElement('div');
				imageContain.className = 'instagram-cover';
				imageContain.addEventListener('click', function(){
					this.parentNode.removeChild(this);
				});
				var id = parseInt(this.id.slice(6), 10);
				var image = document.createElement('div');
				image.className='insta-block-large';
				image.style['background-image']='url('+d.data[id].images.standard_resolution.url+')';
				image.innerHTML='<div class="insta-block-large-close">&times;</div>';
				
				// append new elements to each other and to body
				imageContain.appendChild(image);
				document.body.appendChild(imageContain);
			});
		}
		block.style.width=100/o.width+'%';
		block.style['padding-bottom']=100/o.width+'%';
		block.style['background-image']='url('+d.data[i].images.low_resolution.url+')';
		container.appendChild(block);
	}
}

function error(message) {
	this.message = message;
	this.name = 'FatalError';
}

