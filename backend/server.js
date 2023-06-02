
const express = require('express');
const axios = require('axios');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const { response } = require('express');
const app = express();
const port = process.env.PORT || 4750;

app.use(express.json());
app.use(cors());
const API_KEY = 'Ab8NqRpazdtSYdNYQrWaLcA0EZot28eoHHv7MOrCDWLU4Vkhnrh6LBMsSrpo';

// CORS middleware
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.post('/generate-image', async (req, res) => {
  const { prompt } = req.body;
  //console.log(req)
    const requestData = {
      prompt: prompt,
      key: API_KEY,
    }

   // const response = await axios.post('https://stablediffusionapi.com/api/v3/text2img', requestData);
   //const generatedImageUrl = response.data.image_url;
//console.log(generatedImageUrl)
  // res.json({  
//generatedImageUrl: generatedImageUrl

  // })
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("key", "Ab8NqRpazdtSYdNYQrWaLcA0EZot28eoHHv7MOrCDWLU4Vkhnrh6LBMsSrpo");
  myHeaders.append("Cookie", "XSRF-TOKEN=eyJpdiI6IjVmM0VCVDVPb3hhcWhYWU5teXczYUE9PSIsInZhbHVlIjoicEM5cHlFbENJOUdOYWdFYVNHeDFaOEhtNXU5QzN4bEtDOHdnd3YyMVE0dnk2RzdmVEpUK3daVEE0U3ZJM2trYnlWZVVZd1RwWnBRQ1FoT0w4Zk0ySVg5d2g2M0w1NEowSFhZK2pOWUNyK3ZNTDdaUGVYd3Bhb3JjWG9ra0dYV04iLCJtYWMiOiI5NmFhNzEyNmI5MmJhZmU3ZmUwYzM2ODZiOGM4Zjg3ZDU1NmU4YmMzMGQzYjRiNWVjZDVmN2QyYzU5NjhkMjcwIiwidGFnIjoiIn0%3D; sdapi_session=eyJpdiI6Ijl5cWRYbTd5VlFVdnBNM1VValhJaGc9PSIsInZhbHVlIjoiWnVmNXk0K3hkdWtGbGtDNzE5ZlI0dmJBM0I1dytNNytCU3hlcW9idlh6SXFhSDdSZHJCMWlQMzFtYlZRcG1ybFpuYU0rVkJEelpSQXB1czMxNVVZY0xXTjlrdks2cGIzL2RmcXUvcHBGR3RXdkUvbzN2WmlLWUFRbUp2Y0xiQXciLCJtYWMiOiJiYWE5YTAxNDZjMDY0OGU1NzZhM2VjZDJlMWM0YTc0MWNlMzFiNjk0YTdjN2ZhMmNlY2IzZTcyOWMzOGUzNzdmIiwidGFnIjoiIn0%3D");
  
  var raw = JSON.stringify({
    "key": "Ab8NqRpazdtSYdNYQrWaLcA0EZot28eoHHv7MOrCDWLU4Vkhnrh6LBMsSrpo",
    "prompt": prompt,
    "negative_prompt": "",
    "width": "512",
    "height": "512",
    "samples": "1",
    "num_inference_steps": "20",
    "safety_checker": "no",
    "enhance_prompt": "yes",
    "seed": null,
    "guidance_scale": 7.5,
    "webhook": null,
    "track_id": null
  });
  
  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };
  
const res1 = await fetch("https://stablediffusionapi.com/api/v3/text2img", requestOptions)
  .then((response) => {
    //console.log(response.text())
        return response.json();
      })

    .catch(error => console.log('error', error));
console.log(res1)
res.json({  
  generatedImageUrl: res1['output']  
  })
   })

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

