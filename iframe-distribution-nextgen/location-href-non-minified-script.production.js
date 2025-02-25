function normalizeURL(url) {
  let normalizedURL = url.trim();

  // Remove query parameters and hash
  const searchIndex = normalizedURL.indexOf("?");
  if (searchIndex !== -1) {
    normalizedURL = normalizedURL.slice(0, searchIndex);
  }
  const hashIndex = normalizedURL.indexOf("#");
  if (hashIndex !== -1) {
    normalizedURL = normalizedURL.slice(0, hashIndex);
  }

  // Add 'https://' protocol if 'http://' protocol is present
  if (normalizedURL.startsWith("http://")) {
    normalizedURL = "https://" + normalizedURL.slice(7);
  }

  return normalizedURL;
}

function getCanonicalUrl() {
  const canonicalNode = document.querySelector('link[rel="canonical"]');
  // canonicalNode?.href
  if (canonicalNode?.href) {
    return canonicalNode.href;
  }
}
function revealStyling() {
  const IFRAME_ID = "ad-auris-iframe";
  var iframeElement = document.getElementById(IFRAME_ID);
  iframeElement.style.display = "inline";
}
// by adding this listener, this ensures we wait for the iframe to load first before pre-maturely searching for it which would other wise brake rendering the available audio.
document.addEventListener("DOMContentLoaded", function () {
  const IFRAME_ID = "ad-auris-iframe";

  const iframeElement = document.getElementById(IFRAME_ID);
  if (iframeElement) {
    // * id of the iframe
    const IFRAME_ATTRIBUTE_PROJECT_IDENTIFIER = "data-project-id";

    console.log("ADAURIS RSS DISTRIBTUION IS ACTIVE");

    // * data attribute on the iframe that is used to identify the project attached to narrations

    // * URLS to other services in our stack
    // this should be usign the production DWS Endpoint
    const DYNAMIC_WIDGET_ROUTE =
      "https://qw3ndmjqj5.us-east-1.awsapprunner.com/api/v2/distribution/widget";

    // var canonicalUrl = getCanonicalUrl()
    // if (canonicalUrl) {
    //     return;
    // }

    var parent_url = window.location.href;
    const normalizedParentUrl = normalizeURL(parent_url);

    console.log("normalizedParentUrl", normalizedParentUrl);

    // var iframeElement = document.getElementById(IFRAME_ID);
    // console.log("iframeElement", iframeElement)
    // * this attribute should match
    var projectId = iframeElement.getAttribute(
      IFRAME_ATTRIBUTE_PROJECT_IDENTIFIER
    );
    console.log("projectId", projectId);

    fetch(
      `${DYNAMIC_WIDGET_ROUTE}?project_id=${projectId}&location_href=${normalizedParentUrl}`
    )
      .then((response) => {
        if (response.ok) {
          return response.json(); // Parse the response body as JSON
        } else {
          throw new Error("Request failed with status: " + response.status);
        }
      })
      .then((dynamicWidgetData) => {
        if (
          dynamicWidgetData &&
          dynamicWidgetData.narrationExists &&
          dynamicWidgetData.audioWidgetUrl
        ) {
          console.log(dynamicWidgetData);
          iframeElement.src = dynamicWidgetData.audioWidgetUrl;
          // insert the DWS build narration URL for the audio player to play
          revealStyling();
          console.log(dynamicWidgetData);
          return dynamicWidgetData; // Return the dynamicWidgetData
        }
      })
      .catch((error) => {
        console.error(error);
        throw error; // Rethrow the error to propagate it further
      });

    iframeElement.onload = null;
  } else {
    console.error("iframeElement not found");
  }
});
