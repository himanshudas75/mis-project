openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout tls.key -out tls.crt -subj "/CN=kubernetes.docker.internal"
cat tls.crt | base64 -w 0
echo "\n-------"
cat tls.key | base64 -w 0
rm tls.crt tls.key