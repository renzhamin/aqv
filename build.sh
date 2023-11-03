#!/bin/sh


yarn --cwd="./frontend" run build
mv ./frontend/dist backend/src/build
