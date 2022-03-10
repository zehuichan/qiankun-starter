const shell = require('shelljs')

shell.rm('-rf', './dist')

shell.mkdir('-p', './dist')
shell.mkdir('-p', './dist/subapp')

shell.cp('-R','./sub-react/build/', './dist/subapp/sub-react/')

shell.cp('-R','./sub-vue/dist/', './dist/subapp/sub-vue/')

shell.cp('-R','./main/dist/', './dist/main/')

console.log('execute success.')
