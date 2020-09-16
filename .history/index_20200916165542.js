const { app, BrowserWindow,autoUpdater, ipcMain } = require('electron')

let mainWindow;

const server = 'https://update.electronjs.org'
const feed = `${server}/jaydeeppedhadiya/wot_demo/${process.platform}-${process.arch}/${app.getVersion()}`
console.log(feed);
autoUpdater.setFeedURL(feed)


// require('update-electron-app')({
//     repo: 'jaydeeppedhadiya/wot_demo',
//     updateInterval: '5 Minutes',
//     logger: require('electron-log')
//   })
setInterval(() => {
    console.log('update')
    autoUpdater.checkForUpdates()
  }, 60000)
function createWindow() {
    // Create the browser window.
    const mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true
        }
    })

    // and load the index.html of the app.
    mainWindow.loadFile('index.html');

    // mainWindow.once('ready-to-show', () => {
    //     autoUpdater.checkForUpdatesAndNotify();
    // });
}

app.whenReady().then(createWindow)
autoUpdater.on('update-downloaded', (event, releaseNotes, releaseName) => {
    const dialogOpts = {
      type: 'info',
      buttons: ['Restart', 'Later'],
      title: 'Application Update',
      message: process.platform === 'win32' ? releaseNotes : releaseName,
      detail: 'A new version has been downloaded. Restart the application to apply the updates.'
    }
  
    dialog.showMessageBox(dialogOpts).then((returnValue) => {
      if (returnValue.response === 0) autoUpdater.quitAndInstall()
    })
  })
// setInterval(() => {
//     console.log('check_update')
//     autoUpdater.checkForUpdates()
// }, 60000)

// app.on('window-all-closed', function () {
//     if (process.platform !== 'darwin') {
//         app.quit();
//     }
// });

// app.on('activate', function () {
//     if (mainWindow === null) {
//         createWindow();
//     }
// });

// ipcMain.on('app_version', (event) => {
//     event.sender.send('app_version', { version: app.getVersion() });
// });

// autoUpdater.on('update-available', () => {
//     mainWindow.webContents.send('update_available');
// });

// autoUpdater.on('update-downloaded', () => {
//     mainWindow.webContents.send('update_downloaded');
// });

// ipcMain.on('restart_app', () => {
//     autoUpdater.quitAndInstall();
// });
// autoUpdater.on('update-downloaded', (event, releaseNotes, releaseName) => {
//     const dialogOpts = {
//         type: 'info',
//         buttons: ['Restart', 'Later'],
//         title: 'Application Update',
//         message: process.platform === 'win32' ? releaseNotes : releaseName,
//         detail: 'A new version has been downloaded. Restart the application to apply the updates.'
//     }

//     dialog.showMessageBox(dialogOpts).then((returnValue) => {
//         if (returnValue.response === 0) autoUpdater.quitAndInstall()
//     })
// })
// autoUpdater.on('error', message => {
//     console.error('There was a problem updating the application')
//     console.error(message)
// })