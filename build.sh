#!/bin/sh

yarn --cwd=frontend install -D
yarn --cwd=backend install -D

yarn --cwd="./frontend" run build
rm -r backend/src/build
mv ./frontend/dist backend/src/build
