helm upgrade --install ingress-nginx ingress-nginx --repo https://kubernetes.github.io/ingress-nginx
kubectl create secret tls tls-secret --cert=tls.cert --key=tls.key
kubectl apply -f gateway.yaml