docker build -t login-flask-app:$1 .
docker tag login-flask-app:$1 himanshudas75/login-flask-app:$1
docker push himanshudas75/login-flask-app:$1