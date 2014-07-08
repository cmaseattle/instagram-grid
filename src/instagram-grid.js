var igrid = (function() {
    
  function init(config) {
    // set up parameters object to pass
    // defaults are set here. If no default and the parameter is required an error should be thrown
    var w = config.width !== undefined ? config.width : 5,
        h = config.height !== undefined ? config.height : 2,
        params = {
          '_container': config.container !== undefined ? config.container : error('container'),
          '_clientid': config.client_id !== undefined ? config.client_id : error('client_id'),
          '_userID': config.userID !== undefined ? config.userID : error('userID'),
          '_width': w,
          '_height': h,
          '_total': w*h,
          '_link': config.link !== undefined ? config.link : false,
          '_likes': config.likes !== undefined ? config.likes : false,
          '_likesHover': config.likesHover !== undefined ? config.likesHover : false,
          '_caption': config.caption !== undefined ? config.caption : true,
          '_clearfix': config.clearfix !== undefined ? config.clearfix : false
        };
    getInsta(params);
  }

  function alertMessage(message) {
    alert(message);
  }

  function getInsta(p) {
    $.ajax({
      type: "GET",
      dataType: "jsonp",
      cache: false,
      url: 'https://api.instagram.com/v1/users/'+p._userID+'/media/recent/?client_id='+p._clientid+'&count='+p.total,
      success: function(d) {
        makeBlocks(d,p);
      },
      error: function(xhr, ajaxOptions, thrownError) {
        console.log(xhr.status, thrownError);
      }
    });
  }

  function makeBlocks(d,p) {
    var container = document.getElementById(p._container);
    for(i=0;i<p._total;i++) {

      // create image block
      var block = document.createElement('div');
      block.className='insta-block';
      block.style.width=100/p._width+'%';

      // add image 
      var image = document.createElement('img');
      image.src=d.data[i].images.low_resolution.url;
      image.id='image-'+i;
      image.className='insta-img';

      if(p._link) {

        // add class to image for css purposes
        image.className+=' clickable';

        // add event listener for click, which executes all of the following ...
        image.addEventListener('click', function(){

          // create full page image container
          var imageContain = document.createElement('div');
          imageContain.className = 'instagram-cover';

          // remove image if container is clicked
          imageContain.addEventListener('click', function(){
            this.parentNode.removeChild(this);
          });

          // create insta-block-large
          var largeBlock = document.createElement('div');
          largeBlock.className = 'insta-block-large';

          // generate image
          var id = parseInt(this.id.slice(6), 10);
          var imageLarge = document.createElement('img');
          imageLarge.className='insta-img-large';
          imageLarge.src=d.data[id].images.standard_resolution.url;

          // add close button to cover container
          imageContain.innerHTML='<div class="insta-block-large-close">&times;</div>';

          // append image to image container
          largeBlock.appendChild(imageLarge);

          // get image description
          if(p._caption) {
            var cap = d.data[id].caption.text;
            var caption = document.createElement('div');
            caption.className = 'insta-img-caption';
            caption.innerHTML = cap;

            // append to image container after image has already been added
            largeBlock.appendChild(caption);
          }
          
          // append image container to the full page container
          imageContain.appendChild(largeBlock);

          // append full container to the page
          document.body.appendChild(imageContain);
        });
      }
      if(p._likes) {
        if (d.data[i].likes.count!==0) {
          like = document.createElement('div');
          like.className='insta-likes';
          if(p._likesHover) {
            like.className+=' hide';
          }
          like.innerHTML='<img src="http://cmaseattle.github.io/instagram-grid/insta-heart.png" class="insta-heart">'+d.data[i].likes.count;
          block.appendChild(like);
        }
      }

      block.appendChild(image);
      container.appendChild(block);
    }
    if(p._clearfix) {
      var cf = document.createElement('div');
      cf.className='cf';
      container.appendChild(cf);
    }
  }

  return {
    'init': init,
    'alertMessage': alertMessage
  };

})();