// exec() Method 

// const fs = require('fs');
// const child_process = require('child_process');

// for(var i=0; i<3; i++) {
//    var childprocess = child_process.exec('node child.js '+i,function 
//       (error, stdout, stderr) {
      
//       if (error) {
//          console.log(error.stack);
//          console.log('Error code: '+error.code);
//          console.log('Signal received: '+error.signal);
//       }
//       console.log('stdout: ' + stdout);
//       console.log('stderr: ' + stderr);
//    });

//    childprocess.on('exit', function (code) {
//       console.log('Child process exited with exit code '+code);
//    });
// }


// Spawn() Method

const fs = require('fs');
const child_process = require('child_process');

for(var i=0; i<3; i++) {
var childprocess = child_process.spawn('node', ['child.js', i]);

   childprocess.stdout.on('data', function (data) {
      console.log('stdout: ' + data);
   });

   childprocess.on('exit', function (code) {
      console.log('Child process exited with exit code '+code);
   });
}