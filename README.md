# V1 Iframe-distriubtion High level notes
- Please keep in mind this is for reference to help inform much of V1, but there is a separate V2 section below.

#### Non-minified

`script-non-minified.js`
- non minified version of typical version 
- This is `production` ready
- To then minify see below for *Examples of use*
- transformation: `script-non-minfied.js` -> `script.js`

`preloaded-non-minified-script.js`
- non minified version of preload version
- the idea is the script goes above the iframe, which makes the logic a little harder 
but has possible speed games (not measured). 
- to then minify see below for *Examples of use*
- transformation: `preloaded-non-minified-script.js` -> `preloaded-script.js`

`canonical-url-non-minified-script.js`
- This is WIP for retriving the url via a specific property of a link node with a rel attribute as `canonical`
- This is a specific case for users that transfer sites and thus break url normalization ability
- transformation: `canonical-url-non-minified-script.js` -> `canonical-url.js`

`newspack-script-non-minified.js`
- newspack version
- difference is the nature of the iframe
- read more about [newspack](https://newspack.pub/) here


`newspack-preloaded-non-minified-script.js`
- newspack version
- difference is the nature of the iframe
- read more about [newspack](https://newspack.pub/) here
- This is a WIP, not currently being used

----------

#### Minified

`preloaded-script.js`
- script goes before iframe, attempt to load resource quickly

`script.js`
- script goes after, non blocking of other resources 
- This is `production` ready and is currently in use

`canonical-url.js`
- instead of using href, grabs canonical to compare with resource

----------

### Introduction 

This is the repository that contains scripts that powers our dynamic iframe 

Although there are multiple permutations of the scripts outlined above the general
flow of logic for each are all quite similar. 

#### General flow

1. retrieve the url of the page this script is on 
2. retrieve an identification of the organisation 
3. normalize url 
4. request dynamic widget service to find narration corresponding to url
    4a. if exists place into iframe source appropriate widget url
    4b. if does not exist, hide iframe


#### Why are there different permutations
The different permutations, exist due to different limitations or requirements
of different platforms (e.g. newspack vs regular webpage).

### Technologies
For each of the scripts we import axios at the top by copying it's minified version
to the top of the file.
This can be improved and is touched on in technical debt.

Outside of this, plain js is used

### Installation & Setup

The use case of this was meant to be a script 
```
<script>

<iframe 
    style="width: 100%;
    height: 100px;
    border: none;
    display: none" data-org=b716aa144485c0995f603a2510670284.28b6 allowfullscreen="false" allowtransparency allow="clipboard-read;
    clipboard-write" frameborder="0" id="ad-auris-iframe" scrolling="no">
</iframe>
<script 
    src="https://cdn.jsdelivr.net/npm/ad-auris-iframe-distribution@latest/script.js">
</script>
```

`https://cdn.jsdelivr.net/npm/ad-auris-iframe-distribution@latest/script.js`

We deliver this script via a cdn attached to `npm`
you can update this package using the [np](https://www.npmjs.com/package/np) package

### Scope of functionalities
This is meant to render the correct widget for the given article it finds it self in

### Examples of use
Currently being used in the dashboard , for our dynamic widget. Contact the team 
if you need help finding this on the dashboard.

There is a slight variation to that html snippet for [AMP](https://amp.dev/) sites due
to the restrictive nature of AMP rules. Learn more from our [docs](https://adauris.atlassian.net/wiki/spaces/AA/pages/147914762/Dynamic+widget+distribution+in+AMP.)

### Technical Debt
Axios is being used but instead can rely on more lower level network calls such as
[fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)

This has only been tested manually, it would be good to create a "staging" area to test changes to 
these scripts

### TODOs

Because this script is being used inside of clients websites, the speed of this flow is important.
However there are no metrics on the speed outside of guessing that it is bad (by eye). 

All fault does not lie on this script, as it is simply the initiator to a bunch more other services
that all contribute delay.

### Where is testing needed?
You can trial this by looking at the different `temp*.html` files.
You will have to do some modification to the logic inside of whichever file you modify 

A testing environment that emulates how a user will use this script in conjunction with 
their website would be effective.


# V2 Iframe-distriubtion-nextgen High level notes (Most Up to Date) 🆕

## Description
- V2 Must respect this data spec for V2 architecture https://www.notion.so/RSS-Auto-Sync-Distribution-V2-Architecture-b6e9b41a71814c69b511deacb9180d74#a26d03f748d84ad08623f11c6bc38d03

## Usage
1. Develop code in canonical-url-non-minified-script.production.js or canonical-url-non-minified-script.staging.js
    - The main difference between the 2 is they interface with our production and staging firebase instnaces respectively via DWS (Dynamic Widget Service)
2. Test Script using temp.html
    - Recommend using the Live Server Extension for fatest development here
3. When code is ready, run the script "minify-canonical" for cdn/npm distribution
    - use => `npm install -g uglify-js` for the script command to work



## How to Publish 🚢 the Script 
1. Commit and push the code to the main repo ✅
2. Ensure to Build and bundle your code ✅
    - via the script command in the npm package 
3. Prepare for deployment with np: ✅
    - Run np in your project directory.
    - You will need to install => `npm install -g np`
    - np will guide you through a series of prompts to publish your package on npm.
    - Make sure to specify the correct version number when prompted.
4. Set up CDN deployment: ✅
 - Configure the CDN resource to point to your GitHub repository or directly to the bundled JavaScript file.
    - We use => https://www.jsdelivr.com - This is free & open soruce and will work out of the box once the npm package is published
5. Test 🧪 the deployment ✅
    - Access the CDN URL similar to https://cdn.jsdelivr.net/npm/your-package-name@latest/your-script.js in a web browser or include it in your HTML file.
    - V1 of the iframe is this URL https://cdn.jsdelivr.net/npm/ad-auris-iframe-distribution@latest/script.js (remember do not share this with publications as this is legacy)
    - Verify that the bundled JavaScript file is being served correctly from the CDN.

