# GiftShop

Dynamic loading of images in a static website using vanilla JS and HTML. GiftShop dynamically loads images on a static website, addressing the challenge of displaying 1000+ images without manually coding each filename. Needlees to say, this webpage has no backend, as such all of the processing is being done user-side.

There is no particular reason as to why this script exists besides the fact that I wanted to make it, my objective was to be able to load 1000+ images on a static website without the need to manually write each filename individually, it got written in vanilla JS for practicing purposes.

### Demo
Slow (Safe) Version Demo [here](https://oldcore.neocities.org/giftshop)

Fast (Unsafe) Version Demo [here](https://oldcore.neocities.org/Giftshop2)


## Further info...

The script works by initially loading a specified number of images or resources in response to user actions, such as clicking on navigation buttons. This method reduces the initial load time and bandwidth usage by avoiding the loading of all images at once.

For demonstration purposes, the current implementation utilizes buttons to trigger the loading of images. Users can click these buttons to load images from specified directories and formats, simulating a dynamic content loading experience on a static page.

It is important to note that this script is not particularly fast, because it first makes sure the image actually exists before attempting to display it.

### Performance Overview
The current implementation is very slow due to the use of await within the main loop that checks each file ensures that operations are executed in order.

The rationale behind this approach is that each image must undergo a verification process before being displayed, to ensure it exists before being shown. There are better implementation methods that could be used, however for demonstration purposes, this script has been shipped as it is.

A simple way to greatly speed-up the process of loading the images is to remove the verification process, however if such task is to be done, one must ensure that all image files exist, otherwise the script will load broken images. It is perfectly possible to avoid broken images by defining a hard limit for the quantity of images displayed per page, however the point of this project is to automate a menial task.
A hybrid model of the two systems is also possible, however said system falls outside the scope of this repo.

Beware, this script makes a lot of requests, do not
abuse it! It makes 1 request per item displayed
meaning that 600 items will make 600 requests
that's an INSANE amount of requests!

The script saves previously loaded images in local storage to retrieve them later to reduce the number of requests made.

 The script will make at most as many requests as 'itemsPerPage' is set to. By default, it is set to 25 items per page, meaning that at most the script will make 25 requests at once.

### Instructions:
The script must be linked at the very bottom of the page.

Images are loaded as follows:

```html
<div id="loading" style="display: none;"><p><img src="LinkToYourLoadingGifHere" alt="Loading..."><br>loading...</p></div>
```

You will need a content div (where the images/text will be written):

```html
<div id="content">OptionalPlaceholder</div>
```

You will need navigation buttons like this (you can hide them with `display: none`, but never delete them):

```html
<div id="pagination" style="display: block;"><button id="prevButton">Previous</button><button id="nextButton">Next</button></div>
```

Retrieving data:
The buttons that load the data look like this:

```html
<button  data-directory="Resources" data-folder="Icons" data-format="ICO" id="ButtonC" data-files="691">Written</button>
```

Basically think of this like this:

`YourSite/data-directory/data-folder/Written/X.ICO`

`X` is a number from 1 to 'data-files'. For example, if you use the button as it is now, it will try to load the following files:
- `YourSite/Resources/Icons/Written/1.ICO`
- `YourSite/Resources/Icons/Written/2.ICO`
- `YourSite/Resources/Icons/Written/3.ICO`
- ...
- `YourSite/Resources/Icons/Written/691.ICO`
