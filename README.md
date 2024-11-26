# GiftShop

Dynamic loading of images in a static website using vanilla JS and HTML.

You can see a demo [here](https://oldcore.neocities.org/giftshop)

Beware, this script makes a lot of requests, do not
abuse it! It makes 1 request per item displayed
meaning that 600 items will make 600 requests
that's an INSANE amount of requests!

The script saves previously loaded images in local storage to retrieve them later to reduce the number of requests made.

  The script will make at most as many requests
  as 'itemsPerPage' is set to.
  By default it is set at 25 items per page, meaning
  that at most the script will make 25 requests at once.

  ### Instructions:
Script must be linked at the very bottom of the page.

Images are loaded as such:
 
 ```html
 <div id="loading" style="display: none;"><p><img src="LinkToYourLoadingGifHere" alt="Loading..."><br>loading...</p></div>
 ```

You will need a content div (where the images/text will be written):
 ```html
 <div id="content">OptionalPlaceholder</div>
 ```

You will need navigation buttons like this (you can hide them with display:none, but never delete it)
 ```html
 <div id="pagination" style="display: block;"><button id="prevButton">Previous</button><button id="nextButton">Next</button></div>
 ```

 Retrieving data:
 The buttons that load the data look like this:
 ```html
 <button  data-directory="Resources" data-folder="Icons" data-format="ICO" id="ButtonC" data-files="691">Written</button>
 ```

 Basically think of this like this:
 
 YourSite/data-directory/data-folder/Written/X.ICO
 
 X is a number from 1 to 'data-files', for example, if you use the button as it is now it will try to load the following
 files:
 - YourSite/Resources/Icons/Written/1.ICO
 - YourSite/Resources/Icons/Written/2.ICO
 - YourSite/Resources/Icons/Written/3.ICO
 - ... ... ... ...
 - YourSite/Resources/Icons/Written/691.ICO
