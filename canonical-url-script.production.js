function normalizeURL(url){let normalizedURL=url.trim();if(normalizedURL.endsWith("/")){normalizedURL=normalizedURL.slice(0,-1)}const searchIndex=normalizedURL.indexOf("?");if(searchIndex!==-1){normalizedURL=normalizedURL.slice(0,searchIndex)}const hashIndex=normalizedURL.indexOf("#");if(hashIndex!==-1){normalizedURL=normalizedURL.slice(0,hashIndex)}if(normalizedURL.startsWith("http://")){normalizedURL="https://"+normalizedURL.slice(7)}return normalizedURL}function getCanonicalUrl(){const canonicalNode=document.querySelector('link[rel="canonical"]');if(canonicalNode?.href){return canonicalNode.href}}function revealStyling(){const IFRAME_ID="ad-auris-iframe";var iframeElement=document.getElementById(IFRAME_ID);iframeElement.style.display="inline"}function adaurisIframeDistribution(){const IFRAME_ID="ad-auris-iframe";console.log("ADAURIS RSS DISTRIBTUION IS ACTIVE");const IFRAME_ATTRIBUTE_PROJECT_IDENTIFIER="data-project-id";const DYNAMIC_WIDGET_ROUTE="https://dynamic-widget-service-nextgen-production-xa7fxewpsa-uc.a.run.app/api/v2/distribution/widget";var canonicalUrl=getCanonicalUrl();if(!canonicalUrl){return}normalizeURL(canonicalUrl).then(response=>{var normalizedParentUrl=response;var iframeElement=document.getElementById(IFRAME_ID);var projectId=iframeElement.getAttribute(IFRAME_ATTRIBUTE_PROJECT_IDENTIFIER);fetch(`${DYNAMIC_WIDGET_ROUTE}?project_id=${projectId}&location_href=${normalizedParentUrl}`).then(response=>{const dynamicWidgetData=response.data;if(dynamicWidgetData&&dynamicWidgetData.narrationExists&&dynamicWidgetData.audioWidgetUrl){iframeElement.src=dynamicWidgetData.audioWidgetUrl;revealStyling()}}).catch(error=>{console.error(error)});iframeElement.onload=null})}adaurisIframeDistribution();