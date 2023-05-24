const IFRAME_ID = "ad-auris-iframe";

function normalizeUrl(url) {
    var normalize_service_url = "https://us-central1-ad-auris-tts-app.cloudfunctions.net/normalizeUrlService"

    var requestBody = {
        checkRedirect: false,
        url: url,
    }

    return axios.post(normalize_service_url, requestBody).then((response) => {
        return response.data.normalizedUrl;
    }).catch((error) => {
        console.error("normalizing issue")
        console.log(error)
        return url
    })
}

 // this should be usign the production DWS Endpoint
 const DYNAMIC_WIDGET_ROUTE = "https://dynamic-widget-service-nextgen-production-xa7fxewpsa-uc.a.run.app/api/v2/distribution/widget";

function myFunction() {
    var parent_url = window.location.href;

    normalizeUrl(parent_url).then((response) => {
        var normalized_parent_url = response

        console.log(`normalizeUrl is ${normalized_parent_url}`)

        var iframe_element = document.getElementById(IFRAME_ID);
        var orgId = iframe_element.getAttribute("data-project-id")

        var requestBody = {
            organisationId: orgId,
            url: normalized_parent_url 
        }
        console.log('request body is')
        console.log(requestBody)

        axios.post(DYNAMIC_WIDGET_ROUTE, requestBody).then((response) => {
            console.log('response')
            console.log(response)
            return response;
        }).then((response) => {
            console.log('response.data')
            console.log(response.data)
            return response.data
        }).then((json) => {
            console.log('json')
            console.log(json)
            var narrationExists = json.data.narrationExists;
            var audioWidgetUrl = json.data.audioWidgetUrl;
            console.log(audioWidgetUrl)
            iframe_element.src = audioWidgetUrl;
            revealStyling();
        }).catch((error) => {
            console.error(error)
        })
        iframe_element.onload=null
    })
}

function revealStyling() {
    var iframe_element = document.getElementById(IFRAME_ID);
    iframe_element.style.display="inline";
}

myFunction()