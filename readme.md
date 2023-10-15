Deployment
```bash
serverless deploy
```

Local Test
```bash
serverless offline -s local --httpPort 3000 --websocketPort 3001 --lambdaPort 3002
```

Self sign SSL
```bash
openssl req -newkey rsa:2048 -new -nodes -x509 -days 3650 -keyout cert/key.pem -out cert/cert.pem
```

https://ns0h4wx8x9.execute-api.ap-southeast-1.amazonaws.com/dev
https://console.cloud.google.com/apis/credentials
