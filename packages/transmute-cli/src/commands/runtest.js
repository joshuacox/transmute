const run = require('./runner');

export function test() {
  cmd2run = 'echo hello world!'
  run.ner( cmd2run );
}
