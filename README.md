### High level notes

`preloaded-script.js`
- script goes before iframe, attempt to load resource quickly

`script.js`
- script goes after, non blocking of other resources 

`canonical-url.js`
- instead of using href, grabs canonical to compare with resource


`script-non-minified.js`
- non minified version of typical version 
- turns into `script.js`
- this is what is being used in production

`preloaded-non-minified-script.js`
- non minified version of preload version
- the idea is the script goes above the iframe, which makes the logic a little harder 
but has possible speed games (not measured). 

`newspack-preloaded-non-minified-script.js`
- newspack version

`newspack-script-non-minified.js`
- 

### Introduction 

This is the script that powers our dynamic iframe, by contacting `dynamic-widget-service`
with the appropriate details.

Technologies

Installation & Setup

Table of contents

Scope of functionalities

Examples of use

Technical Debt

TODOs

Where is testing needed?

What requires a refactor?
