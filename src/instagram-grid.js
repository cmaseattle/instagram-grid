var igrid = (function() {

  /*
  **
  ** "global" parameters & data
  **
  */ 
  var params; // user config
  var instagram; // instagram data
  var container; // instagram container
  var mq; // media query
    
  /*
  **
  ** Initialize the igrid library
  ** Parameters are set via config or by defaults
  **
  */ 
  function init(config) {
    // set up parameters object to use globally
    // defaults are set here. If no default and the parameter is required an error should be thrown
    var w = config.width !== undefined ? config.width : 5;
    var h = config.height !== undefined ? config.height : 2;
    var mediaQuery = config.mediaQuery !== undefined ? config.mediaQuery : 640;
    mq = window.matchMedia( "(min-width: " + mediaQuery +  "px)" );

    params = {
      '_container': config.container !== undefined ? config.container : error('container'),
      '_local': config.local !== undefined ? config.local : false,
      '_clientid': config.client_id !== undefined ? config.client_id : null,
      '_userID': config.userID !== undefined ? config.userID : null,
      '_width': w,
      '_height': h,
      '_total': w*h,
      '_link': config.link !== undefined ? config.link : false,
      '_likes': config.likes !== undefined ? config.likes : false,
      '_likesHover': config.likesHover !== undefined ? config.likesHover : false,
      '_caption': config.caption !== undefined ? config.caption : true,
      '_clearfix': config.clearfix !== undefined ? config.clearfix : false,
      '_isMediaLarge': mq.matches,
      '_accesstoken': config.access_token

    };
    getInsta();
  }
      
  /*    
  ** 
  ** Handler to respond to media size
  ** changes. Switches the image layout
  ** between a vertical stack and a horizontal stack
  **
  */
  function widthChange(mq){
    $(".insta-block").each(function(){
      this.style.width = getImageWidth(mq.matches);
    });
  }
            
    
  /*
  ** 
  ** Return image size as a percentage of 
  ** screen size
  **
  */
  function getImageWidth(isLargeMedia){
    if(isLargeMedia){
      return 100/params._width + '%';
    }
    else {
      return 100/2 + '%';
    }
  }

  function alertMessage(message) {
    alert(message);
  }

  /*
  **
  ** jQuery Ajax call to get parameters from Instagram
  ** Returns as "d" in success statement
  **
  */ 
  function getInsta() {
    var url = params._local ? params._local : 'https://api.instagram.com/v1/users/'+params._userID+'/media/recent/?access_token='+params._accesstoken+'&count='+params.total;
    var dataType = params._local ? "json" : "jsonp";
    $.ajax({
      type: "GET",
      dataType: dataType,
      cache: false,
      url: url,
      success: initGrid,
      error: function(xhr, ajaxOptions, thrownError) {
        console.log(xhr.status, thrownError);
      }
    });
  }

  /*
  **
  ** Prepares the grid and cycles through
  ** length of data to create each image block
  **
  */ 
  function initGrid(data) {
    instagram = data;
    container = document.getElementById(params._container);
      
    // add listener
    mq.addListener(widthChange);
    widthChange(mq);
    
    for(var i=0;i<params._total;i++) {
      createImageBlock(i);
    }

    if(params._clearfix) {
      addClearfix();
    }
  }

  /*
  **
  ** Image block constructor
  ** Creates event handlers and sets attributes
  ** via parameters
  **
  */ 
  function createImageBlock(i) {

    // create image block
    var block = document.createElement('div');
    block.className='insta-block';      
    block.style.width = getImageWidth(params._isMediaLarge);

    // add image 
    var image = document.createElement('img');
    image.src=instagram.data[i].images.low_resolution.url;
    image.id='image-'+i;
    image.className='insta-img';

    if(params._link) {
      // add class to image for css purposes
      image.className+=' clickable';

      // add event listener for click, which executes all of the following ...
      image.addEventListener('click', function(){
        elem = this; // preserve clicked element through imageClickEvent()
        imageClickEvent(elem);
      });
    }

    if(params._likes) {
      if (instagram.data[i].likes.count!==0) {
        like = document.createElement('div');
        like.className='insta-likes';
        if(params._likesHover) {
          like.className+=' hide-likes';
        }
        like.innerHTML='<img src="http://cmaseattle.github.io/instagram-grid/insta-heart.png" class="insta-heart">'+instagram.data[i].likes.count;
        block.appendChild(like);
      }
    }

    block.appendChild(image);
    container.appendChild(block);
  }
    

  /*
  **
  ** Image click event constructor
  ** builds the popup 
  ** appends image
  **
  */ 
  function imageClickEvent(elem) {

    // create full page image container
    var imageContain = document.createElement('div');
    imageContain.className = 'instagram-cover';

    // remove image ONLY if container is clicked
    imageContain.addEventListener('click', function(){
      console.log(event);
      if(event.target.className=='instagram-cover' || event.target.className=="insta-block-large-close") {
        this.parentNode.removeChild(this);
      }
    });

    // create insta-block-large
    var largeBlock = document.createElement('div');
    largeBlock.className = 'insta-block-large';

    // generate image
    var id = parseInt(elem.id.slice(6), 10);
    var imageLarge = document.createElement('img');
    imageLarge.className='insta-img-large';
    imageLarge.src=instagram.data[id].images.standard_resolution.url;

    // add close button to cover container
    imageContain.innerHTML='<div class="insta-block-large-close">&times;</div>';

    // append image to image container
    largeBlock.appendChild(imageLarge);

    // get image description
    if(params._caption && instagram.data[id].caption) {
      var cap = instagram.data[id].caption.text;
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
  }/*
   ** END imageClickEvent */


  function addClearfix() {
    var cf = document.createElement('div');
    cf.className='cf';
    container.appendChild(cf);
  }

  return {
    'init': init,
    'alertMessage': alertMessage
  };

})();