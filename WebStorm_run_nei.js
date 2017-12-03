var process = require('child_process');
process.exec('nei server', function(error, stdout, stderr){
    if(error !== null){
        console.log('exec error: ' + error);
    }
});