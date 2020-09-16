const electronInstaller = require('electron-winstaller');

var run = async function () {
    try {
        await electronInstaller.createWindowsInstaller({
            appDirectory: 'D:/node/wot_demo/release/package/wot_demo-win32-x64',
            outputDirectory: '/tmp/build/installer61',
            authors: 'JD PATEL.',
            exe: 'wot_demo.exe'
        });
        console.log('It worked!');
    } catch (e) {
        console.log(`No dice: ${e.message}`);
    }
}
run();