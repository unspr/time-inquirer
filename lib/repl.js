const R = require('ramda');

class Repl {
  static async boot() {
    const stdinStream = require('./stdin-stream');
    const process = R.pipe(Repl.evaluate, Repl.print);
    for await (const line of stdinStream) {
      process(line);
    }
  }

  static evaluate(input) {
    return (R.cond([
      [R.equals('ls'), R.always('none')],
      [R.T, R.always('not found this command')],
    ]))(input);
  }

  static print(output) {
    console.log(output);
  }
}

module.exports = Repl;
