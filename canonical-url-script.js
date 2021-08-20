const IFRAME_ID = "ad-auris-iframe";

function normalizeUrl(url) {
    var normalizeServiceUrl = "https://us-central1-ad-auris-tts-app.cloudfunctions.net/normalizeUrlService"

    var requestBody = {
        checkRedirect: false,
        url: url,
    }

    return axios.post(normalizeServiceUrl, requestBody).then((response) => {
        return response.data.normalizedUrl;
    }).catch((error) => {
        console.error(error)
        return url
    })
}

function getCanonicalUrl() {
    const canonicalNode = document.querySelector('[rel=\"canonical\"]')
    // canonicalNode?.href
    if (canonicalNode) {
        canonicalUrl = canonicalNode.href
        console.log(`canonicalUrl ${getCanonicalUrl}`)
        if (canonicalUrl) {
            return canonicalUrl
        }
    }
}

const DYNAMIC_WIDGET_ROUTE = "https://dynamic-widget-service-l72twop3ra-uc.a.run.app"

function myFunction() {

    var canonicalUrl = getCanonicalUrl()
    if (!canonicalUrl) {
        console.error('no canonical url')
        return 
    }

    normalizeUrl(canonicalUrl).then((response) => {
        var normalizedParentUrl = response


        var iframeElement = document.getElementById(IFRAME_ID);
        var orgId = iframeElement.getAttribute("data-org")

        var requestBody = {
            organisationId: orgId,
            url: normalizedParentUrl 
        }

        // TODO: change to use fetch or xml request
        axios.post(DYNAMIC_WIDGET_ROUTE, requestBody).then((response) => {
            return response;
        }).then((response) => {
            return response.data
        }).then((json) => {
            var publisher = json.data.publisher;
            var articleTitle = json.data.articleTitle;
            var baseSrcURL = "https://narrations.ad-auris.com/widget/";
            var builtSrcUrl = baseSrcURL + publisher + "/" + articleTitle;
            iframeElement.src = builtSrcUrl;
            revealStyling();
        }).catch((error) => {
            console.error(error)
        })
        iframeElement.onload=null
    })
}

function revealStyling() {
    var iframeElement = document.getElementById(IFRAME_ID);
    iframeElement.style.display="inline";
}

myFunction()


