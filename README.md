# Embedit-Node

Implementation of the Embedit service in Node

_This is NOT a production-ready service. It's just a demo_

## Installation

1. `npm install`
1. `npm start`
1. Query example: http://localhost:8080/media?q=pizza&services=imgur,giphy

or Run the Docker instance

1. `docker build -t=embedit/node --rm=true .`
1. `docker run -t -p 8080:8080 -e IMGURCLIENTID={VAR} -e GIPHYAPIKEY={VAR} embedit/node`

there is also a Heroku instance running at:

https://embedit-node.herokuapp.com/media/?q=pizza&services=imgur,giphy

### Sample response

```

[
  {
    "name":"summerbreak-pizza-summer-xUn3BUK7PRITKlSIQo",
    "service":"Giphy",
    "source":"https://giphy.com/gifs/summerbreak-pizza-summer-xUn3BUK7PRITKlSIQo",
    "type":"gif",
    "created":"2017-07-20T04:32:45.000Z",
    "thumbnailURL":"https://media0.giphy.com/media/xUn3BUK7PRITKlSIQo/giphy-downsized.gif",
    "mediaURL":"https://giphy.com/gifs/summerbreak-pizza-summer-xUn3BUK7PRITKlSIQo",
    "credit":""
  },
  {
    "name":"buzzfeed-pizza-party-xTkcEHoMQWx2kcGGPe",
    "service":"Giphy",
    "source":"https://giphy.com/gifs/buzzfeed-pizza-party-xTkcEHoMQWx2kcGGPe",
    "type":"gif",
    "created":"2017-07-26T03:37:45.000Z",
    "thumbnailURL":"https://media3.giphy.com/media/xTkcEHoMQWx2kcGGPe/giphy-downsized.gif",
    "mediaURL":"https://giphy.com/gifs/buzzfeed-pizza-party-xTkcEHoMQWx2kcGGPe",
    "credit":""
  },
  {
    "name":"heyduggee-3o6vXWARMxDY1kF0je",
    "service":"Giphy",
    "source":"https://giphy.com/gifs/heyduggee-3o6vXWARMxDY1kF0je",
    "type":"gif",
    "created":"2017-07-31T14:48:54.000Z",
    "thumbnailURL":"https://media2.giphy.com/media/3o6vXWARMxDY1kF0je/giphy-downsized.gif",
    "mediaURL":"https://giphy.com/gifs/heyduggee-3o6vXWARMxDY1kF0je",
    "credit":"https://www.heyduggee.com"
  }
]
```