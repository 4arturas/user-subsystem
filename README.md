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

### Change database connection values in server/.env file
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
minikube config set memory 16384
minikube config set cpus 8
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
kubectl apply -f devops/k8s/postgresql.yaml
````

## /etc/hosts
```sh
echo "$(minikube ip) users-app.local.clearpay-test.systems" | sudo tee -a /etc/hosts
````

## start program using skaffold
```sh
skaffold dev
````

navigate to [http://users-app.local.clearpay-test.systems](users-app.local.clearpay-test.systems)