# TechOnMap v2

## Docker install

```
git clone https://github.com/ubimix/techonmap-v2.git
cd techonmap-v2/docker
sudo ./1.init.sh
sudo ./2.start.sh 1234
```

Open the browser at http://localhost:1234/app/

## Standard install

Requirements :
* node >= 0.10.28
* bower >= 1.2.5

Dependencies install :
* Client side dependency install : 

Server build :
```
npm install
sudo npm install -g grunt-cli
sudo npm install -g webpack
grunt
```
Client dependencies install :
```bower install```
