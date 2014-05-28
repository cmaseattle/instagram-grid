function instagramGrid(e) {
	var w = e.width !== undefined ? e.width : 5,
			h = e.height !== undefined ? e.height : 2,
			options = {
				'container': e.container !== undefined ? e.container : error('container'),
				'key': e.client_id !== undefined ? e.client_id : error('client_id'),
				'width': w,
				'height': h,
				'total': w*h,
				'link': e.link !== undefined ? e.link : false,
				'likes': e.likes !== undefined ? e.likes : false
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
	var container = document.getElementById(o.container);
	for(i=0;i<o.total;i++) {

		var block = document.createElement('div');
		block.className='insta-block';
		block.style.width=100/o.width+'%';

		var image = document.createElement('img');
		image.src=d.data[i].images.low_resolution.url;
		image.id='image-'+i;
		image.className='insta-img';

		if(o.link) {
			image.className+=' clickable';
			image.addEventListener('click', function(){
				var imageContain = document.createElement('div');
				imageContain.className = 'instagram-cover';
				imageContain.addEventListener('click', function(){
					this.parentNode.removeChild(this);
				});
				var id = parseInt(this.id.slice(6), 10);
				var imageLarge = document.createElement('img');
				imageLarge.className='insta-block-large';
				imageLarge.src=d.data[id].images.standard_resolution.url;
				imageContain.innerHTML='<div class="insta-block-large-close">&times;</div>';
				
				// append new elements to each other and to body
				imageContain.appendChild(imageLarge);
				document.body.appendChild(imageContain);
			});
		}
		if(o.likes) {
			if (d.data[i].likes.count!=0) {
				console.log('like it!');
				like = document.createElement('div');
				like.className='insta-likes';
				like.innerHTML='<img src="dist/img/insta-heart.svg" class="insta-heart">'+d.data[i].likes.count;
				block.appendChild(like);
			}
		}

		block.appendChild(image);
		container.appendChild(block);
	}
}

function error(message) {
	this.message = message;
	this.name = 'FatalError';
}

