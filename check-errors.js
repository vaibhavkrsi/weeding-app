const { exec } = require('child_process');

exec('npx tsc --noEmit', (error, stdout, stderr) => {
    const output = stdout + stderr;
    console.log(output);
});
