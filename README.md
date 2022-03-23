# CrystaLCA [![Build](https://github.com/linancn/CrystaLCA/actions/workflows/build.yml/badge.svg)](https://github.com/linancn/CrystaLCA/actions/workflows/build.yml) [![Docker Publish](https://github.com/linancn/CrystaLCA/actions/workflows/publish.yml/badge.svg?branch=v0.0.4&event=push)](https://github.com/linancn/CrystaLCA/actions/workflows/publish.yml)

This project is initialized with [Ant Design Pro](https://pro.ant.design). Follow is the quick guide for how to use.

## Environment Prepare

Install Node.js 16

```bash
apt update
apt upgrade
curl -fsSL https://deb.nodesource.com/setup_16.x | sudo -E bash -
apt install -y nodejs
npm install -g yarn
```

Install `node_modules`:

```bash
yarn
```

## Provided Scripts

Ant Design Pro provides some useful script to help you quick start and build with web project, code style check and test.

Scripts provided in `package.json`. It's safe to modify or add additional script:

### Start project

```bash
yarn start
```

### Build project

```bash
yarn build
```

### Check code style

```bash
yarn lint
```

You can also use script to auto fix some lint error:

```bash
yarn lint:fix
```

### Test code

```bash
yarn test
```

### Docker build

After yarn build

```bash
docker build --file Dockerfile --tag cystalca .
```
