# Users subsystem

## Database

### Deploy data model to postgres
```
server/datamodel.sql
````

### Add test data into postgres
````
server/data_test.sql
````



## Developing on localhost
### Start backend
```sh
cd server
node server.js
````
### Rebuild frontend
```sh
cd app
npm run build
````

navigate to [http://localhost:4004](http://localhost:4004)

## Minikube
```sh
minikube config set driver docker
minikube start
````
### Enable ingress on minikube
```sh
minikube addons enable ingress
````
### This command must be executed in order to work ingress properly
```sh
kubectl delete -A ValidatingWebhookConfiguration ingress-nginx-admission
````

## k8s
```sh
kubectl apply -f postgresql.yaml
````

## /etc/hosts
```sh
echo "$(minikube ip) users-app.local.clearpay-test.systems" | sudo tee -a /etc/hosts
````

## start program using skaffold
```sh
skaffold dev
````