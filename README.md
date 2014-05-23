Instagram Responsive Grid
=========================

This library is intended for some quick-usage instagram feed work. The library allows you specify how many images wide and tall you want your feed to be within your specified container. **Requires jQuery** for `ajax` call.

## Setup

Include the `instagrid.js` and `instagrid.css` in your project's `<head>`

```HTML
<link href="css/instagrid.css" rel="stylesheet">
<script type="text/javascript" src="js/instagrid.js"></script>
```

Initiate the instagram feed via JavaScript

```JS
instagrid({
	// options
});
```

## Required Parameters

**container**: `container` defines the element ID you wish to add your feed to. **Must** be an ID

**client_id**: `client_id` defines your client ID obtained from the instagram API. No authentication needed, just a quick API key. Follow [these steps](https://github.com/svmatthews/instagram-access-token-generation).

## Option Parameters

**width**: `width` in number of images you wish to span the horizontal space of your defined `container`. Default is 5.

**height**: `height` in number of images you wish to span the vertical space of your defined `container`. Default is 2. 

## Example

Initiate the instagram blocks to span 6 images across and 3 images down within the `#social` element.

```JS
$(document).ready(function(){
	instagrid({
		container: 'social',
		client_id: 'your-client-id',
		width: 6,
		height: 3
	});
});
```

## Roadmap

* remove jQuery reliance
* build error handler
* more optional parameters
	* linkable options
	* linkable within current page (build lightbox) or linkable to instagram website
* stack images vertically at specific media queries (optional)
* build testing/development environment
* add example `gh-pages` branch with user input fields