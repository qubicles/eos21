module.exports = (params) => {
    const { blackHole, onData } = params;

    blackHole.methods.closed().call()
    .then(result => {
        if (result === true){
            console.log("(EE) blackHole closed ... exiting");
            process.exit(0);
        }
    })

    blackHole.events.Teleport({})
        .on('data', event => {
            if (onData) {
                onData(event);
            }
            else
                console.log("(II) blackHole event " + event.returnValues);
        })
        .on('changed', reason => console.log("(WW) TeleportOracle: " + reason))
        .on('error', reason => console.log("(EE) TeleportOracle: " + reason));

    blackHole.events.Closed({})
        .on('data', () => {
            console.log("(END) blackHole closed ... exiting");
            process.exit(0);
        })
        .on('changed', reason => console.log("(WW) TeleportOracle: " + reason))
        .on('error', reason => console.log("(EE) TeleportOracle: " + reason));
}
