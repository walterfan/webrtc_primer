####################
设备与环境
####################

设备管理
====================

与媒体捕获和播放有关的设备有输入和输出设备之分

1. 输入

* Camera
* Mic
* Screen (屏幕共享)

2. 输出

* Speaker
* Screen



如何检测设备的更改，比如用户插入了一个新的耳麦，或者打开了摄像头

.. code-block::

    cmsc.cam_detectionTimerId = setInterval(function () {
                cmsc.getCamList(function (currentCamlist) {
                    if (!cmsc.lastCamList) {
                        cmsc.lastCamList = cmsc._camList && cmsc._camList.slice();
                        if (cmsc.lastCamList) {
                            report = {camInstalledChange: {type: "init", fullDevices: cmsc.lastCamList}};
                            cmsc._onDevMgrCb(report);
                        }else{
                            return;
                        }
                    }
                    var camAddedList = [];
                    var camRemoveList = [];

                    // check if add or remove
                    currentCamlist.forEach(function (curCam) {
                        var found = false;
                        cmsc.lastCamList.every(function (lastCam, i) {
                            if (curCam.id === lastCam.id) {
                                found = true;
                                cmsc.lastCamList.splice(i, 1);
                                return false; // stop searching
                            }
                            return true;
                        });
                        if (!found) {
                            camAddedList.push(curCam);
                        }
                    });
                    camRemoveList = cmsc.lastCamList;
                    cmsc.lastCamList = currentCamlist.slice();
                    currentCamlist = null;

                    // reporting
                    var report;
                    if (camAddedList.length > 0) {
                        report = {camInstalledChange: {type: "add", devices: camAddedList, fullDevices: cmsc.lastCamList}};
                        cmsc._onDevMgrCb(report);
                        camAddedList = null;
                    }
                    if (camRemoveList.length > 0) {
                        report = {camInstalledChange: {type: "remove", devices: camRemoveList, fullDevices: cmsc.lastCamList}};
                        cmsc._onDevMgrCb(report);
                        camRemoveList = null;
                    }
                }, true);
            }, period);