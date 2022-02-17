const https = require('https');
const nJwt = require('njwt');

function getLockStatus (jwt, api_host, api_path, event) {
  return new Promise((resolve, reject) => {
    var post_data = JSON.stringify({ "userIP": event.request.ip,
      "userDevice": event.request.user_agent,
      "userLocation": event.request.cityName,
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
  if (event.client.client_id==event.secrets.CLIENT_ID) {
    var claims = {
      iss: event.secrets.APP_URI,
      aud: event.secrets.API_HOST,
      sub: event.user.name
    }
    let decodedDomainToken = Buffer.from(event.secrets.SIGNING_KEY, 'base64');
    var jwt = nJwt.create(claims, decodedDomainToken);
    jwt.setExpiration(new Date().getTime() + (60*5*1000)); //5 minute expiration
    jwt.setNotBefore(new Date().getTime() - (60*1*1000)); //Valid from 1 minute ago to account for minor time diffs
    var authToken = jwt.compact();

    if (authToken.length > 0) {
      const res = await getLockStatus (authToken, event.secrets.API_HOST, event.secrets.API_PATH, event);
      var result = JSON.parse(res);

      if(result) {
        console.log(JSON.stringify(result));
        if(result.locked) {
          api.access.deny(event.secrets.LOCKED_MESSAGE);
        }
      } else {
        //Add logic for violations if required
      }
    }    
  }
};
