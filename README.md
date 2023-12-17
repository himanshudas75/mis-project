### made for minikube
---

there's some difference where logs are stored on minikube and kind.
If using find change the mount paths in fluentd-daemonset.yaml to where the logs are stored

> Run startup.sh and wait for the pods to become live

access kibana at http://{minikube_ip}:30009/ and select the logstash index pattern, go to discover, you might see container logs anytime now

