/** Nox load
 * 
 * About
 * I made this script for my neocities
 * page cause I needed to load a lot of stuff
 * at once.
 * 
 * Beware
 * This script makes a lot of requests, do not
 * abuse it! It makes 1 request per item displayed
 * meaning that 600 items will make 600 requests
 * that's an INSANE amount of requests!
 * I made it so this thing saves the images/whatever
 * in local storage, at least.
 * The script will make at most as many requests
 * as 'itemsPerPage' is set to.
 * By default it is set at 25 items per page, meaning
 * that at most the script will make 25 requests at once
 * 
 * Instructions:
 * >You will need to link this at the very bottom of your
 * page.
 * >You will need a loading object like this:
 * <div id="loading" style="display: none;"><p><img src="LinkToYourLoadingGifHere" alt="Loading..."><br>loading...</p>
 * >You will need a content div (where the images/text will be written):
 * <div id="content">OptionalPlaceholder</div>
 * >You will need navigation buttons like this (you can hide them with display:none, but never delete it)
 * <div id="pagination" style="display: block;"><button id="prevButton">Previous</button><button id="nextButton">Next</button></div>
 * 
 * Retrieving data:
 * The buttons that load the data look like this:
 * <button  data-directory="Resources" data-folder="Icons" data-format="ICO" id="ButtonC" data-files="691">Written</button>
 * Basically think of this like this:
 * YourSite/data-directory/data-folder/Written/X.ICO
 * X is a number from 1 to 'data-files', for example, if you use the button as it is now it will try to load the following
 * files:
 * YourSite/Resources/Icons/Written/1.ICO
 * YourSite/Resources/Icons/Written/2.ICO
 * YourSite/Resources/Icons/Written/3.ICO
 * ... ... ... ...
 * YourSite/Resources/Icons/Written/691.ICO
 * 
 * 
***/

//Max items to display per page
const itemsPerPage = 25;
//Default first page to display
let currentPage = 1;
//Default folder name to display on page load
let folderName = 'Resources/Icons/3D';
//Default file extension to display on page load
let fileExtension = 'ICO';
//Displays pictures only if set to true, names of files only if false (names are 1, 2, 3...)
let thumbs = true;

//Better not to touch anything from this point on, unless you know what you're doing
let cusFolderName = "Null";
let cusFileExtension = "Null";
async function generateContent(folderName, fileExtension) {
    const contentDiv = document.getElementById('content');
    const loadingDiv = document.getElementById('loading');
    const prevButton = document.getElementById('prevButton');
    const nextButton = document.getElementById('nextButton');
    const fileListElement = document.createElement('ul');
    let startIndex = (currentPage - 1) * itemsPerPage + 1;
    let endIndex = currentPage * itemsPerPage;
    let hasItems = false;

    cusFolderName = folderName;
    cusFileExtension = fileExtension;

    // Show loading GIF
    loadingDiv.style.display = 'block';

    // Create header with folder name
    const header = document.createElement('h2');
    header.textContent = folderName;
    contentDiv.innerHTML = ''; // Clear previous content
    contentDiv.appendChild(header);

    for (let i = startIndex; i <= endIndex; i++) {
        const fileName = i + '.' + fileExtension;
        const fullPath = `/${folderName}/${fileName}`;
        const fullPathExists = localStorage.getItem(fullPath) !== null;
        let exists = true;

        if (!fullPathExists) {
          exists = await checkFileExists(fullPath);
        }
        if (exists) {
          localStorage.setItem(fullPath, true);
          nextButton.style.display = 'inline';
            hasItems = true;
            const listItem = document.createElement('li');
            const link = document.createElement('a');
            link.textContent = fileName;
            link.href = fullPath;

            // Append images only if thumbs is true
            if (thumbs == true) {
                const image = document.createElement('img');
                image.src = fullPath;
                fileListElement.appendChild(image);
            } else {
            fileListElement.appendChild(listItem);
            }
            listItem.appendChild(link);
        }else{
          i = endIndex + 1;
          nextButton.style.display = 'none';
        }
        
    }

    // Hide loading GIF
    loadingDiv.style.display = 'none';

    // Append fileListElement only if it's not empty
    if (hasItems) {
        contentDiv.appendChild(fileListElement);
        pagination.style.display = 'block';
    }
}

document.getElementById('prevButton').addEventListener('click', () => {
    if (currentPage > 1) {
        currentPage--;
    }
});

document.getElementById('nextButton').addEventListener('click', () => {
    currentPage++;
});


        
function checkFileExists(url) {
    return new Promise(resolve => {
        fetch(url, { method: 'HEAD' })
            .then(response => {
                resolve(response.ok);
            })
            .catch(error => {
                resolve(false);
            });
    });
}
        
// handle button click, retrieve button name to populate page
        function handleButtonClick(event) {
          let buttonName = event.target.textContent;
          let button = event.target;
          let folder = button.dataset.folder;
          let format = button.dataset.format;
          let directory = button.dataset.directory;
          let fileExtension = format;
          
          folderName = directory + '/' + folder + '/' + buttonName; // Replace with the actual folder name
          
          if (buttonName != "Next" && buttonName != "Previous"){
          currentPage = 1;
          generateContent(folderName, fileExtension);
          } else {
            generateContent(cusFolderName, cusFileExtension);
          }
        }
        
       const buttons = document.querySelectorAll('button');
       
       buttons.forEach(button => {
        button.addEventListener('click', handleButtonClick);
       });
       
       generateContent(folderName, fileExtension);