function normalizeURL(url) {
  let normalizedURL = url.trim();
  const searchIndex = normalizedURL.indexOf("?");
  if (searchIndex !== -1) {
    normalizedURL = normalizedURL.slice(0, searchIndex);
  }
  const hashIndex = normalizedURL.indexOf("#");
  if (hashIndex !== -1) {
    normalizedURL = normalizedURL.slice(0, hashIndex);
  }
  if (normalizedURL.startsWith("http://")) {
    normalizedURL = "https://" + normalizedURL.slice(7);
  }
  return normalizedURL;
}
function getCanonicalUrl() {
  const canonicalNode = document.querySelector('link[rel="canonical"]');
  if (canonicalNode?.href) {
    return canonicalNode.href;
  }
}
function revealStyling() {
  const IFRAME_ID = "ad-auris-iframe";
  var iframeElement = document.getElementById(IFRAME_ID);
  iframeElement.style.display = "inline";
}
document.addEventListener("DOMContentLoaded", function () {
  const IFRAME_ID = "ad-auris-iframe";
  const iframeElement = document.getElementById(IFRAME_ID);
  if (iframeElement) {
    const IFRAME_ATTRIBUTE_PROJECT_IDENTIFIER = "data-project-id";
    console.log("ADAURIS RSS DISTRIBTUION IS ACTIVE");
    const DYNAMIC_WIDGET_ROUTE =
      "https://bvprznavt5.us-east-1.awsapprunner.com/api/v2/distribution/widget";
    var parent_url = window.location.href;
    const normalizedParentUrl = normalizeURL(parent_url);
    console.log("normalizedParentUrl", normalizedParentUrl);
    var projectId = iframeElement.getAttribute(
      IFRAME_ATTRIBUTE_PROJECT_IDENTIFIER
    );
    console.log("projectId", projectId);
    fetch(
      `${DYNAMIC_WIDGET_ROUTE}?project_id=${projectId}&location_href=${normalizedParentUrl}`
    )
      .then((response) => {
        if (response.ok) {
          return response.json();
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
          revealStyling();
          console.log(dynamicWidgetData);
          return dynamicWidgetData;
        }
      })
      .catch((error) => {
        console.error(error);
        throw error;
      });
    iframeElement.onload = null;
  } else {
    console.error("iframeElement not found");
  }
});
