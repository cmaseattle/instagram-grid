Instagram Responsive Grid
=========================

version **0.0.6**

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

**access_token**
`access_token` defines your access token obtained from the instagram API. Follow [these steps](https://www.instagram.com/developer/authentication/) to get an access token from Instagram

**userID**
`userID` defines the specific account from which you are getting the images from. This can be any public instagram account. To obtain the userID from an account, you can [enter the username on this website](http://jelled.com/instagram/lookup-user-id#) and get the key back. *Should be a string value, but an integer will work as well*.

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

**caption**   
`caption` is the written caption for the photo on instragram, including hashtags and other usernames. This shows up only underneath the large image if `link` is set to true.   
Default: `true`

**likes**   
`likes` will add a small box in the corner of each image showing the number of likes **IF** the count is *at least one* like.   
Default: `false`

**likesHover**   
`likesHover` is used in hand with `likes` (above) to only show the like count when the user hovers over the image.   
Default: `false`

*local*   
`local` option allows you to define your local path to a version of your instagram data. This is typically scraped in a cron job or some other server-side process. See the PHP implementation below for an example of how to use this. Setting the path as a string will override the call to instagram even if you have your `client_id` and `userID` set.   
Default: `false`

**clearfix**   
`clearfix` option adds a standard [clearfix](http://nicolasgallagher.com/micro-clearfix-hack/) element to the end of your instagram blocks so your wrapping container element is expanded to the extent of your instagram images.   
Default: `false`

*Clearfix example*   
Before - see the border of the wrapping element does not expand to extent of instagram photos because the insta blocks are outside of the document flow.

![Instagram elements without a clearfix](img/clearfix-before.png)

After - Clearfixes will fake out the filled extent and push your wrapping element down to the extent of your instagram elemnts.

![Instagram elements with a clearfix enabled](img/clearfix-after.png)

## Example

Initiate the instagram blocks to span 6 images across and 3 images down within the `#social` element. Clicking the element will show a larger, lightbox version of your image and each image will have the number of likes shown in the lower left corner.

```JS
$(document).ready(function(){
	igrid.init({
		container: 'container',
		access_token: 'your-access-token',
		userID: '257720515', // CMA's instagram userID
		width: 3,
		height: 1,
		link: true,
		likes: true,
		likesHover: true,
		clearfix: true
	});
});
```

## PHP (server) Implementation

Implementing the instagram library locally is possible with the `local` parameter. You can set the path to the local version of your instagram data, assuming it is in a JSON format with the matching parameters from instagram. Setting `local` to any string will override the call to the instagram API. There is a PHP implementation in this repository that sets up a `config.php` file and a `get-instagram.php` file that essentially makes the same call to the API and generates an `instagram.json` file in a `instagram-data/` directory.

This is particularly useful when setting up your scripts to run on a cron, so you aren't calling the Instagram API every time a new user loads the page. You'll need a server to run this properly, but we've set up the files to in the `php/` folder as an example. Fill out `config.php` with your information and run the script on your server. It will output into the `instagram-data/` folder.

*NOTE: of course it'd be important to make sure your PHP scripts are running in a directory non publicly accessible, like any cron job. This will require you to set the path that the generated `instagram.json` file is sent to in `get-instagram.php` accordingly.*

**Example Local Call**
```JS
igrid.init({
  container: 'container',
  local: '/instagram-data/instagram.json',
  link: true,
  clearfix: true
});
```

## Roadmap

* remove jQuery reliance for ajax call
* build error handler
* stack images vertically at specific media queries (optional)
* ~~build testing/development environment~~
* ~~add example `gh-pages` branch with user input fields~~
# ~~start recording history~~
* ~~*build this as a real javascript library, rather than a file of accessible functions*~~

## History

**0.0.6** - 11/26/2014

* **added** new parameter `local` for local implementations of the code, assuming you have the instagram data already loaded in some other file. - [issue #21](https://github.com/cmaseattle/instagram-grid/issues/21)
* **fixed** css conflict issue - [issue #18](https://github.com/cmaseattle/instagram-grid/issues/18)
* **added** `@media` query for larger images [issue #16](https://github.com/cmaseattle/instagram-grid/issues/16)
* **fixed** `caption==null` issue - [issue #17](https://github.com/cmaseattle/instagram-grid/issues/17)
* started to modularize the code, scoped parameters, - [issue #20](https://github.com/cmaseattle/instagram-grid/issues/20) - *definitely not complete*
* **fix** issue with clicking image and closing overlay - [issue #19](https://github.com/cmaseattle/instagram-grid/issues/19)

**0.0.5** - 7/8/2014

* *new* parameter `caption` sets the caption of the image underneath the large version if `link` is set to `true`. Default is `true` so you would use `false` to turn it off.
* *refactored* large image blocks to be fixed instead of positioned absolutely, which removes the element completely from the document space even when there are `block` elements involved - [issue #10](https://github.com/cmaseattle/instagram-grid/issues/10)
* *added* clearfix parameter to allow for images to expand document space since they are floating - [issue #5](https://github.com/cmaseattle/instagram-grid/issues/5)
* *added* png image in place of svg image for safari svg bug - [issue #11](https://github.com/cmaseattle/instagram-grid/issues/11)
* *removed* CSS3 transitions to prevent image aliasing and other artifacts in safari - [issue #12](https://github.com/cmaseattle/instagram-grid/issues/12)
* *removed* relative path for svg image to now use CDN on gh-pages branch instead of including an `img/` directory.
* *created* test directory with `index.html` - this should be expanded upon more I think.

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
