# Users subsystem

## Minikube
````
minikube config set driver docker
minikube start
````
### Enable ingress on minikube
````
minikube addons enable ingress
````
### This command must be executed in order to work ingress properly
````
kubectl delete -A ValidatingWebhookConfiguration ingress-nginx-admission
````

## k8s
````
kubectl apply -f postgresql.yaml
````

## /etc/hosts
````
echo "$(minikube ip) users-app.local.clearpay-test.systems" | sudo tee -a /etc/hosts
````

## start program using skaffold
````
skaffold dev
````