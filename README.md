# Nout

Nout means nothing, it aims to be a api to be used with app that will behavior like a scrum board

## Technology Stack

- Typescript
- Nodejs
- Express
- MongoDB
- Docker
- Minikube
- Skaffold

## How to run

To run local on your machine you need to install:

- [Docker](https://docs.docker.com/engine/install/ubuntu/)
- [minikube](https://minikube.sigs.k8s.io/docs/start/)
- [skaffold](https://skaffold.dev/docs/install/)

After install pre-requisites you need:

- First start minikube:

```sh
$ minikube start && eval $(minikube docker-env)
```

Notice to the first time you start minikube you should enable dashboard and ingress addons.

```sh
$ minikube addons enable dashboard
$ minikube addons enable ingress
```

- Use skaffold to start app

```sh
$ skaffold dev
```

## Services

From the get go we'll start with `authentication` or `auth` service to handle login by user and password and maybe using some social login. We will add other services as the project grows.

## Git strategies

For simplicity we'll keep all related services inside one git repository. Thus, for each commit related some microservice it should follow the pattern listed below.

```
[repo/action] Commit message

Commit description body, with imperative mood.

Resolves: #IssueNumber

Author's Signature
```

The tag should follow the pattern:

[repo's name/action] - where action can be:

- chore: for config files changes
- feat: for new features
- refact: for code refactory
- fix: for bugfixes
- bump: to designate a commit release version

Enjoy!
