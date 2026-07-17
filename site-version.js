/* ==========================================================
   FILE : site-version.js

   PURPOSE:

   Temporary development update tracker.

   Displays latest code update time
   on the website.

   NOTE:

   Delete this entire file after development
   is completed.

   ========================================================== */


const SITE_VERSION = {

    version: "v1.0",

    updatedAt: "17 July 2026 23:45"


};



/* ==========================================================
   DISPLAY WEBSITE UPDATE INFORMATION

   PURPOSE:

   Adds update information at the bottom
   of the webpage.

   ========================================================== */


function showSiteVersion(){


    const versionBox = document.createElement("div");


    versionBox.innerHTML = `


    <hr>


    <div style="
        text-align:center;
        font-size:12px;
        color:gray;
        padding:10px;
    ">


    Website Version:
    ${SITE_VERSION.version}


    <br>


    Last Code Update:
    ${SITE_VERSION.updatedAt}


    </div>


    `;


    document.body.appendChild(versionBox);


}
