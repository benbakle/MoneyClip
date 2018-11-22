pushd web
dotnet build
popd

pushd design
npm install
popd

pushd design
gulp default
popd