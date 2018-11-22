pushd web
call dotnet build
popd

pushd design
call npm install
popd

pushd design
call gulp
popd