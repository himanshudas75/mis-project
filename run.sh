#!/bin/bash

install_operators() {
    helm ls --all --short | xargs -L1 helm delete
    helm install community-operator mongodb/community-operator
    helm upgrade --install ingress-nginx ingress-nginx --repo https://kubernetes.github.io/ingress-nginx
}

API() {
    kubectl apply -f API/gateway.yaml
}

Auth_Flask() {
    kubectl apply -f Auth_Flask/deployment.yaml
}

MongoDB() {
    kubectl apply -f MongoDB/deployment.yaml
}

start() {
    API
    Auth_Flask
    MongoDB
}

show_usage() {
    echo "Invalid Parameters"
}

if [ "$#" -lt 2 ]; then
    show_usage
fi

case "$1" in
    "op")
        install_operators
        ;;
    "start")
        start
        ;;
    *)
        show_usage
        ;;
esac