function normalizeURL (url) {
    let normalizedURL = url.trim();

    // Remove trailing slash from the hostname if present
    if (normalizedURL.endsWith('/')) {
        normalizedURL = normalizedURL.slice(0, -1);
    }

    // Remove query parameters and hash
    const searchIndex = normalizedURL.indexOf('?');
    if (searchIndex !== -1) {
        normalizedURL = normalizedURL.slice(0, searchIndex);
    }
    const hashIndex = normalizedURL.indexOf('#');
    if (hashIndex !== -1) {
        normalizedURL = normalizedURL.slice(0, hashIndex);
    }

    // Add 'https://' protocol if 'http://' protocol is present
    if (normalizedURL.startsWith('http://')) {
        normalizedURL = 'https://' + normalizedURL.slice(7);
    }

    return normalizedURL;
};
function getCanonicalUrl() {
    const canonicalNode = document.querySelector('link[rel=\"canonical\"]');
    // canonicalNode?.href
    if (canonicalNode?.href) {
        return canonicalNode.href;
    }
}
function revealStyling() {
    const IFRAME_ID = "ad-auris-iframe";
    var iframeElement = document.getElementById(IFRAME_ID);
    iframeElement.style.display="inline";
}

function adaurisIframeDistribution() {
    // * id of the iframe
    const IFRAME_ID = "ad-auris-iframe";
    console.log('ADAURIS RSS DISTRIBTUION IS ACTIVE')

    // * data attribute on the iframe that is used to identify the project attached to narrations
    const IFRAME_ATTRIBUTE_PROJECT_IDENTIFIER = "data-project-id";

    // * URLS to other services in our stack
    // this should be usign the staging DWS Endpoint
    const DYNAMIC_WIDGET_ROUTE = "https://dynamic-widget-service-nextgen-staging-xa7fxewpsa-uc.a.run.app/api/v2/distribution/widget";

    var canonicalUrl = getCanonicalUrl()
    if (!canonicalUrl) {
        return;
    }

    normalizeURL(canonicalUrl).then((response) => {
        var normalizedParentUrl = response

        var iframeElement = document.getElementById(IFRAME_ID);
        // * this attribute should match
        var projectId = iframeElement.getAttribute(IFRAME_ATTRIBUTE_PROJECT_IDENTIFIER);

        fetch(`${DYNAMIC_WIDGET_ROUTE}?project_id=${projectId}&location_href=${normalizedParentUrl}`)
        .then(response => {
          if (response.ok) {
            return response.json(); // Parse the response body as JSON
          } else {
            throw new Error('Request failed with status: ' + response.status);
          }
        })
        .then(dynamicWidgetData => {
          if (dynamicWidgetData && dynamicWidgetData.narrationExists && dynamicWidgetData.audioWidgetUrl) {   
            iframeElement.src = dynamicWidgetData.audioWidgetUrl;
            // insert the DWS build narration URL for the audio player to play
            revealStyling();
            console.log(dynamicWidgetData);
            return dynamicWidgetData; // Return the dynamicWidgetData
          }
        })
        .catch(error => {
          console.error(error);
          throw error; // Rethrow the error to propagate it further
        });
        
        iframeElement.onload=null
    })
}

adaurisIframeDistribution()


