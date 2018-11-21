@echo off
pushd web
dotnet build
popd

pushd design
npm install
popd

pushd design
gulp
popd