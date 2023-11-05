docker build -t mis-auth-api:$1 .
docker tag mis-auth-api:$1 himanshudas75/mis-auth-api:$1
docker push himanshudas75/mis-auth-api:$1