helm ls --all --short | xargs -L1 helm delete
helm install community-operator mongodb/community-operator
helm upgrade --install ingress-nginx ingress-nginx --repo https://kubernetes.github.io/ingress-nginx