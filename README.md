Instagram Responsive Grid
=========================

version **0.0.4**

This library is intended for some quick-usage instagram feed work. Instagram-Grid allows you specify how many images wide and tall you want your feed to be within your specified container. **Requires jQuery** for `ajax` call. *NOTE*: maximum number of images in a single call is *33 images*.

## Setup

Include the `instagram-grid.min.js` and `instagram-grid.min.css` in your project's `<head>`

```HTML
<link href="css/instagram-grid.min.css" rel="stylesheet">
<script type="text/javascript" src="js/instagram-grid.min.js"></script>
```

Initiate the instagram feed via JavaScript

```JS
igrid.init({
	// options
});
```

## Required Parameters

**container**   
`container` defines the element ID you wish to add your feed to. **Must** be an ID

**client_id**   
`client_id` defines your client ID obtained from the instagram API. No authentication needed, just a quick API key. Follow [these steps](https://github.com/svmatthews/instagram-access-token-generation).

## Optional Parameters

**width**   
`width` in number of images you wish to span the horizontal space of your defined `container`.   
Default: `5`

**height**   
`height` in number of images you wish to span the vertical space of your defined `container`.   
Default: `2`

**link**   
`link` will add clickability to your images, allowing you to click and see a larger version of the image within your site - without linking to Instagram.   
Default: `false`

**likes**   
`likes` will add a small box in the corner of each image showing the number of likes **IF** the count is *at least one* like.   
Default: `false`

**likesHover**   
`likesHover` is used in hand with `likes` (above) to only show the like count when the user hovers over the image.   
Default: `false`

## Example

Initiate the instagram blocks to span 6 images across and 3 images down within the `#social` element. Clicking the element will show a larger, lightbox version of your image and each image will have the number of likes shown in the lower left corner.

```JS
$(document).ready(function(){
	igrid.init({
		container: 'social',
		client_id: 'your-client-id',
		width: 6,
		height: 3,
		link: true,
		likes: true,
		likesHover: true
	});
});
```

## Roadmap

* remove jQuery reliance for ajax call
* build error handler
* more optional parameters
	* ~~linkable options~~
	* ~~linkable within current page (build lightbox)~~ or linkable to instagram website
	* show like counts - boolean parameter - don't show if there aren't any likes for single photos *planned for 0.0.3*
* stack images vertically at specific media queries (optional)
* ~~build testing/development environment~~
* add example `gh-pages` branch with user input fields
# ~~start recording history~~
* ~~*build this as a real javascript library, rather than a file of accessible functions*~~

## History

**0.0.4** - 5/29/2014

* *refactor* library into module-based functions to prevent exposing unecessary functions to client (thanks to [@jczaplew](https://github.com/jczaplew)) - creates `igrid.init()`
* *rename* function to `igrid` to instead of camelCased `instagramGrid`

**0.0.3** - 5/27/2014

* *refactor* code to use `<img src>` tags instead of `<div>` with background images, which fixes Firefox and IE issues.
* *update* built-in lightbox UI to use `<img>` tags and has a new 'close' button
* *new* optional parameter `likes` allows user to include like count for images with at least *one* like.
* *new* optional parameter `likesHover` shows number of likes only when the user hovers over the image

**0.0.2**

* added `link` parameter with lightbox - default is `false`
* passing object from initial parameters reduces function-specific parameters and increases readability
* added MIT License

**0.0.1** - Original Release 5/23/2014

* testing environment with simple function-based library
