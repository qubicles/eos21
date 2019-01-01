#! /bin/bash

printf "\t=========== Building eosio.contracts ===========\n\n"

RED='\033[0;31m'
NC='\033[0m'

CORES=`getconf _NPROCESSORS_ONLN`
mkdir -p eosio.token
pushd eosio.token &> /dev/null
cmake ../
make -j${CORES}
popd &> /dev/null
