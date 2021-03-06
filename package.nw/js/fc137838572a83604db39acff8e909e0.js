;!function(require, directRequire){;'use strict';const path=require('path'),fs=require('fs'),glob=require('glob'),rmdir=require('rmdir'),actionsConfig=require('./0634ee2ebd3e560d9d4804ecc960160f.js'),request=require('./15ba1827c7f6564a45df6bd44da3a977.js'),urlConfig=require('./f171257bbcaef547a3cf27266ccb0db2.js'),loginManager=require('./89ba85d67a88f7636d657c22b5d3e038.js'),projectManager=require('./3bfffbe88b3d923921f851c0697974fe.js'),dirConfig=require('./92320c1386e6db6a6f2556736a9bc280.js'),errcodeConfig=require('./df6d0ff021a69fb541c733de4dbba0fe.js'),locales=require('./common/locales/index.js'),ls=require('./84858de8a097c9cf84ff2c2e3d86e2a9.js'),webviewPool=require('./a78e6d6a87de1708226375ca4c320d76.js'),fileSystem=require('./f6cbcecf6ed9f533f6a506310d8f07b6.js'),backGroundAudioManager=require('./35a5c665bbd039baf968211c3ff216fc.js'),audioManager=require('./f7806acc0e6f141f3b11c7faf34d32ad.js'),store=require('./bc78839ccca8df9e5ceeb7fae11b7be2.js');function toggleNetworkToobar(){return{type:actionsConfig.TOOLBAR_TOGGLE_NETWORK}}function toggleSimulatorActionToolbar(){return{type:actionsConfig.TOOLBAR_TOGGLE_SIMULATORACTION}}function toggleDeviceToolbar(){return{type:actionsConfig.TOOLBAR_TOGGLE_DEVICE}}function toggleCompileTypeToolbar(){return{type:actionsConfig.TOOLBAR_TOGGLE_COMPILETYPE}}function toggleCompactToolbar(){return{type:actionsConfig.TOOLBAR_TOGGLE_COMPACT}}function toggleInfoToolbar(){return{type:actionsConfig.TOOLBAR_TOGGLE_INFO}}function selectNetwork(a){return dispatchAndSaveState({type:actionsConfig.TOOLBAR_SELECT_NETWORK,data:a})}function selectDevice(a){return dispatchAndSaveState({type:actionsConfig.TOOLBAR_SELECT_DEVICE,data:a})}function setDeviceRotated(a){return dispatchAndSaveState({type:actionsConfig.TOOLBAR_SET_DEVICE_ROTATED,data:a})}function setDeviceRotatedBeforeRoute(a){return dispatchAndSaveState({type:actionsConfig.TOOLBAR_SET_DEVICE_ROTATED_BEFORE_ROUTE,data:a})}function toggleClickKey(a){return{type:actionsConfig.TOOLBAR_TOGGLE_CLICKKEY,clickKey:a}}function togglePreviewCode(){return{type:actionsConfig.TOOLBAR_PREVIEW_CODE}}function autoPreview(a){return a||(a=Date.now()),{type:actionsConfig.TOOLBAR_AUTO_PREVIEW,data:a}}function toggleRemoteDebugCode(){return{type:actionsConfig.TOOLBAR_REMOTE_DEBUG_CODE}}function clearSession(a=!0){return(b)=>{const c=store.getState();return c.project&&c.project.current&&c.project.current.isTourist?void(a&&b({type:actionsConfig.INFO_SHOW_SUCCESS,data:locales.config.CLEAN_USER_SESSION_SUCCESS})):void request({url:`${urlConfig.clearSession}`,method:'post',needToken:1,needAppID:1}).then(()=>{a&&b({type:actionsConfig.INFO_SHOW_SUCCESS,data:locales.config.CLEAN_USER_SESSION_SUCCESS}),b({type:actionsConfig.TOOLBAR_TOGGLE_CLICKKEY,clickKey:'NONE'})}).catch((a)=>{b({type:actionsConfig.INFO_SHOW_ERROR,data:{message:locales.config.CLEAN_USER_SESSION_ERROR.format(a)}}),b({type:actionsConfig.TOOLBAR_TOGGLE_CLICKKEY,clickKey:'NONE'})})}}function clearAuth(a=!0){return(b)=>{const c=store.getState();if(c.project&&c.project.current&&c.project.current.isTourist)return void(a&&b({type:actionsConfig.INFO_SHOW_SUCCESS,data:locales.config.CLEAN_USER_AUTH_SUCCESS}));let d=2;const e=[],f=(c)=>{d--,c&&e.push(c),0==d&&(0===e.length?a&&b({type:actionsConfig.INFO_SHOW_SUCCESS,data:locales.config.CLEAN_USER_AUTH_SUCCESS}):b({type:actionsConfig.INFO_SHOW_ERROR,data:{message:locales.config.CLEAN_USER_AUTH_ERROR.format(e.join(','))}}),b({type:actionsConfig.TOOLBAR_TOGGLE_CLICKKEY,clickKey:'NONE'}))};request({method:'post',url:`${urlConfig.cleanUserAuth}`,needToken:1,needAppID:1}).then(()=>{f()}).catch((a)=>{f(a)}),request({method:'post',url:`${urlConfig.clearUserAutoFillInfo}`,needToken:1,needAppID:1}).then(()=>{f()}).catch((a)=>{f(a)})}}function cleanFileCache(a=!0){const b=loginManager.getUserInfo(),c=b&&b.openid?b.openid:'unknow',d=projectManager.getCurrent(),e=d.hash,f=dirConfig.WeappFileCache;return(b)=>{glob('*',{cwd:f},(c,e)=>{e.forEach((a)=>{const b=path.join(f,a);fs.unlink(b,()=>{})}),rmdir(path.join(f,d.appid),()=>{}),fileSystem.clearFileSystem(d),a&&b({type:actionsConfig.INFO_SHOW_SUCCESS,data:locales.config.CLEAN_FILE_CACHE_SUCCESS}),b({type:actionsConfig.TOOLBAR_TOGGLE_CLICKKEY,clickKey:'NONE'})})}}function cleanAll(){return(a)=>{a(cleanStorageCache(!1)),a(cleanFileCache(!1)),a(cleanWebViewCache(!1)),a(clearAuth(!1)),a(clearSession(!1)),a({type:actionsConfig.INFO_SHOW_SUCCESS,data:locales.config.CLEAR_ALL_SUCCESSFULLY}),a({type:actionsConfig.TOOLBAR_TOGGLE_CLICKKEY,clickKey:'NONE'})}}function cleanWebViewCache(a=!0){return(b)=>{const c=(a,c=!0)=>{a?a.clearData({since:0},{cookies:!0,appcache:!0,sessionCookies:!0,persistentCookies:!0,cache:!0,fileSystems:!0,indexedDB:!0,localStorage:!0,webSQL:!0},()=>{c&&b({type:actionsConfig.INFO_SHOW_SUCCESS,data:locales.config.CLEAR_NETWORK_CACHE_SUCCESSFULLY}),b({type:actionsConfig.TOOLBAR_TOGGLE_CLICKKEY,clickKey:'NONE'})}):b({type:actionsConfig.TOOLBAR_TOGGLE_CLICKKEY,clickKey:'NONE'})};let d=webviewPool.getAnyAttached('simulator');c(d,a),d=webviewPool.getAnyAttached('htmlwebview'),c(d,!1)}}function cleanStorageCache(a=!0){const b=loginManager.getUserInfo(),c=b&&b.openid?b.openid:'unknow',d=dirConfig.WeappStorage,e=projectManager.getCurrent(),f=path.join(d,`${e.hash}_${c}.json`),g=path.join(d,`storage_${e.hash}_${c}.json`);return(b)=>{try{fs.existsSync(f)&&fs.unlinkSync(f)}catch(a){console.error(a)}fs.unlink(g,(d)=>{console.error(d),a&&b({type:actionsConfig.INFO_SHOW_SUCCESS,data:locales.config.CLEAN_DATA_CACHE_SUCCESS}),b({type:actionsConfig.PROJECT_SET_STORAGE,data:{cache:{},openid:c}}),b({type:actionsConfig.TOOLBAR_TOGGLE_CLICKKEY,clickKey:'NONE'})})}}function setDeviceScale(a){return dispatchAndSaveState({type:actionsConfig.TOOLBAR_SET_DEVICESCALE,data:a})}function addDevice(a){return{type:actionsConfig.TOOLBAR_ADD_DEVICE,data:a}}function removeDevice(a){return{type:actionsConfig.TOOLBAR_REMOVE_DEVICE,data:a}}function setToolbarConfig(a){return dispatchAndSaveState({type:actionsConfig.TOOLBAR_CONFIG,data:a})}function setMuted(a){return backGroundAudioManager.setMuted(a),audioManager.setMuted(a),{type:actionsConfig.TOOLBAR_SET_MUTED,data:a}}function jumpWXGit(){return async(a)=>{try{const{body:a}=await request({url:urlConfig.wxGitGetTmpCode,needToken:1,needCheckErrCode:1,needCheckStatusCode:1,needParse:1,needAppID:1});if(!a||!a.tmpcode)throw new Error('Tmpcode Invalid. '+JSON.stringify(a));nw.Shell.openExternal('https://git.weixin.qq.com/users/auth/tmpcode?tmp_code='+a.tmpcode+'&scope=cloud_git_login')}catch(b){a({type:actionsConfig.INFO_SET_CONFIRM,data:{show:!0,showConfirm:!0,confirmText:locales.config.CLOSE,type:'error',title:'',showCancel:!1,content:b&&b.toString?b.toString():`${b}`,callback:()=>{}}})}}}function jumpTGit(){return(a)=>{request({url:urlConfig.getTGitUrl,method:'get',needToken:1,needAppID:1}).then((a)=>{nw.Shell.openExternal(a.body.dev_master_url)}).catch((b)=>{b&&b.errcode===errcodeConfig.DEV_CLOUD_NO_TGIT_PROJECT?a({type:actionsConfig.INFO_SET_CONFIRM,data:{show:!0,type:'error',title:'',content:locales.config.TGIT_NOT_OPEN_DETAIL,showConfirm:!0,showCancel:!0,confirmText:locales.config.READ_DOCUMENTATION,cancelText:locales.config.CLOSE,callback:(a)=>{a&&nw.Shell.openExternal('https://developers.weixin.qq.com/miniprogram/dev/qcloud/tgit.html')}}}):a({type:actionsConfig.INFO_SHOW_ERROR,data:{message:(b||'').toString()}})})}}const syncToolbar=(a={},b)=>(c)=>{c({type:actionsConfig.TOOLBAR_SYNC_STORE,data:a,syncTime:b})};function dispatchAndSaveState(a){return(b,c)=>{b(a),saveToolbarState(c)}}function saveToolbarState(a){try{global.devInfo&&global.devInfo.projectid&&ls.setToolbarForProject(global.devInfo.projectid,a().toolbar)}catch(a){}}module.exports={toggleNetworkToobar,toggleSimulatorActionToolbar,toggleDeviceToolbar,toggleCompactToolbar,toggleInfoToolbar,toggleCompileTypeToolbar,selectDevice,selectNetwork,toggleClickKey,togglePreviewCode,toggleRemoteDebugCode,clearAuth,cleanFileCache,cleanStorageCache,setDeviceScale,addDevice,removeDevice,cleanWebViewCache,clearSession,cleanAll,setToolbarConfig,autoPreview,setMuted,jumpTGit,jumpWXGit,setDeviceRotated,setDeviceRotatedBeforeRoute,syncToolbar};
;}(require("lazyload"), require);
