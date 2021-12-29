const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

const stdinStream = {
    [Symbol.asyncIterator]: () => ({
        next: () => new Promise(resolve => {
            rl.question('> ', answer =>
                resolve({
                    done: false,
                    value: answer,
                }));
        })
    })
};

module.exports = stdinStream;
