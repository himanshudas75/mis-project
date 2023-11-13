docker build -t mis-flask-api:$1 .
docker tag mis-flask-api:$1 himanshudas75/mis-flask-api:$1
docker push himanshudas75/mis-flask-api:$1