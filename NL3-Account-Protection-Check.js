const https = require('https');
const nJwt = require('njwt');

function getLockStatus (jwt, api_host, api_path, event) {
  return new Promise((resolve, reject) => {
    var post_data = JSON.stringify({ "userIP": event.request.ip,
      "userDevice": event.request.user_agent,
      "userLocation": event.request.geoip.cityName,
      "integrationType": "auth0",
      "integrationData": event.request
    })
    var options = {
      host: api_host,
      port: "443",
      path: api_path,
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'x-nl3-authorization-token': jwt,
        'x-nl3-device-location': event.request.geoip.latitude + ',' + event.request.geoip.longitude,
        'x-forwarded-for': event.request.ip,
        'User-Agent': event.request.user_agent,
        'Content-Length': Buffer.byteLength(post_data)
      }
    }
    
    const req = https.request(options, (response) => {
      let chunks_of_data = [];

      response.on('data', (fragments) => {
				chunks_of_data.push(fragments);
			});

      response.on('end', () => {
				let response_body = Buffer.concat(chunks_of_data);
				resolve(response_body.toString());
			});
			response.on('error', (error) => {
        console.log("Error = " + error.message);
				reject(error);
			});      
    });
    req.write(post_data);
    req.end();
  });
}

exports.onExecutePostLogin = async (event, api) => {
  var failOpen = event.secrets.FAIL_OPEN == 'true'
  try {
    if (event.client.client_id==event.secrets.CLIENT_ID) {
      var claims = {
        iss: event.secrets.APP_URI,
        aud: event.secrets.API_HOST,
        sub: event.user.name
      }
      let decodedDomainToken = Buffer.from(event.secrets.SIGNING_KEY, 'base64');
      var jwt = nJwt.create(claims, decodedDomainToken);
      jwt.setExpiration(new Date().getTime() + (60*5*1000)); //5 minute expiration to allow for SignUp
      jwt.setNotBefore(new Date().getTime() - (60*1*1000)); //Valid from 1 minute ago to account for minor time diffs
      var authToken = jwt.compact();

      if (authToken.length > 0) {
        console.log(event.secrets.API_HOST + event.secrets.API_PATH)
        const res = await getLockStatus (authToken, event.secrets.API_HOST, event.secrets.API_PATH, event);
        if(res.indexOf('404') == -1)
          var result = JSON.parse(res);
        else
          console.log(res.toString());

        if(result) {
          console.log(JSON.stringify(result));
          if(result.locked) {
            api.access.deny(event.secrets.LOCKED_MESSAGE);
          }
        } else {
          if (!failOpen) {
            api.access.deny(event.secrets.LOCKED_MESSAGE);
          }
        }
      }    
    }
  } catch (err) {
    if (!failOpen) {
      api.access.deny(event.secrets.LOCKED_MESSAGE);
    }
  }

};
