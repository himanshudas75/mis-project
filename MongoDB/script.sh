helm install community-operator mongodb/community-operator --set community-operator-crds.enabled=false
kubectl apply -f mongodb-operator.yaml