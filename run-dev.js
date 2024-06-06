const { spawn } = require('cross-spawn');
const path = require('path');

const subfolders = ['mf.numbers', 'mf.sign', 'mf.shell'];

subfolders.forEach((folder) => {
  const folderPath = path.resolve(__dirname, folder);
  const npmCmd = process.platform === 'win32' ? 'npm.cmd' : 'npm';

  // First, run npm install in the subfolder
  const installProcess = spawn(npmCmd, ['install'], {
    cwd: folderPath,
    stdio: 'inherit'
  });

  installProcess.on('error', (err) => {
    console.error(`Failed to start npm install in ${folder}:`, err);
  });

  installProcess.on('exit', (code) => {
    if (code !== 0) {
      console.error(`npm install in ${folder} exited with code ${code}`);
    } else {
      console.log(`npm install in ${folder} completed successfully.`);

      // After npm install, run npm run dev in the subfolder
      const devProcess = spawn(npmCmd, ['run', 'dev'], {
        cwd: folderPath,
        stdio: 'inherit'
      });

      devProcess.on('error', (err) => {
        console.error(`Failed to start npm run dev in ${folder}:`, err);
      });

      devProcess.on('exit', (code) => {
        if (code !== 0) {
          console.error(`npm run dev in ${folder} exited with code ${code}`);
        } else {
          console.log(`npm run dev in ${folder} completed successfully.`);
        }
      });
    }
  });
});
