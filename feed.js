var http = require('http')
, parseString = require('xml2js').parseString;

var feedOptions = {
    host: 'www.ndbc.noaa.gov'
  , port: 80
  , path: '/rss/ndbc_obs_search.php?lat=40N&lon=73W&radius=100'
  , method: 'GET'
};

function createFeed(req, res){
  'use strict';
  http.request(feedOptions, function(dataResp){
    var str = '';
    dataResp.setEncoding('utf8');
    res.writeHead(dataResp.statusCode);
    
    dataResp
      .on('data', function(data){
        str += data;
      })
      .on('close', function(){
        res.end();
      })
      .on('end', function(){
        parseString(str, function(err, result){
          res.write(JSON.stringify(result));
      });
                  
      res.end();
    });
  })
  .on('error', function(e){
    console.warn(e.message);
    res.writeHead(500);
    res.end();
  })
  .end();
}


module.exports = createFeed;