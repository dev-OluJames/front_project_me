#!/usr/bin/env sh

set -e

npm run build

cd dist

git init
git add -A
git commit -m 'New Ddeployment'

git push -f git@github.com:dev-OluJames/GIAC_FRONT.git web-page:gh

cd -
