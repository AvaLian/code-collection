## 微信开发者工具启动黑屏

解决办法：修改路径下的JSON文件为下面代码` ~/AppData/Local/微信开发者工具/User Data/localstorage_b72da75d79277d2f5f9c30c9177be57e.json`,如本机路径为`C:\Users\203036\AppData\Local\微信开发者工具\User Data\WeappLocalData\localstorage_b72da75d79277d2f5f9c30c9177be57e.json`

```json
{
  "show": false,
  "currentCategory": "general",
  "compiler": {
    "clusterCompile": false,
    "autoPreview": false,
    "autoRemoteDebug": false
  },
  "general": {
    "openLastModifiedProject": true,
    "autoPreviewType": "mobile",
    "autoRemoteDebugType": "mobile",
    "maxLogLength": 300,
    "enableNewFW": true,
    "enableGPU": false,
    "ignoreUnsafeProxy": false,
    "locale": "zh",
    "defaultWorkspace": "/Users/kunlideng/WeChatProjects"
  },
  "appearance": {
    "theme": "dark",
    "devtoolsTheme": "dark",
    "fontFamily": "SF Mono",
    "fontSize": 12,
    "lineHeight": 20,
    "simulatorAlignment": "left"
  },
  "edit": {
    "tabSize": 2,
    "insertSpaces": true,
    "wrap": "on",
    "minimap": false,
    "gitIgnoreWindowsReturn": true,
    "autoTypingsDetectEnabled": true,
    "alwaysOpenFileInNewTab": false,
    "autoSave": false,
    "autoRefresh": false,
    "saveBeforeCompile": false,
    "saveBeforePreview": false,
    "saveBeforeUpload": false
  },
  "proxy": {
    "proxyType": "SYSTEM",
    "proxyHost": "127.0.0.1",
    "proxyPort": "12639"
  },
  "notification": {
    "bbs": true,
    "sys": true,
    "alarm": true
  },
  "security": {
    "enableServicePort": true,
    "port": 19195
  },
  "geo": {
    "enabled": false,
    "latitude": 39.92,
    "longitude": 116.46,
    "speed": -1,
    "accuracy": 65,
    "altitude": 0,
    "verticalAccuracy": 65,
    "horizontalAccuracy": 65
  },
  "shortcuts": {
    "_editingShortcuts": false,
    "toggleToolbar": {
      "modifiers": ["cmd", "shift"],
      "key": "T"
    },
    "toggleSimulatorWindow": {
      "modifiers": ["cmd", "alt"],
      "key": "S"
    },
    "toggleEditorWindow": {
      "modifiers": ["cmd", "shift"],
      "key": "E"
    },
    "toggleFileTree": {
      "modifiers": ["cmd", "shift"],
      "key": "M"
    },
    "toggleDebugWindow": {
      "key": "I",
      "modifiers": ["cmd", "shift"]
    },
    "rebuild": {
      "key": "B",
      "modifiers": ["cmd"]
    },
    "format": {
      "key": "F",
      "modifiers": ["shift", "alt"]
    },
    "refresh": {
      "key": "R",
      "modifiers": ["cmd"]
    },
    "toggleForegroundBackgroundStatus": {
      "key": "",
      "modifiers": []
    },
    "documentationSearch": {
      "key": "",
      "modifiers": []
    },
    "gotoFile": {
      "key": "P",
      "modifiers": ["cmd"]
    },
    "gotoRecentFile": {
      "key": "E",
      "modifiers": ["cmd"]
    },
    "preview": {
      "key": "P",
      "modifiers": ["shift", "cmd"]
    },
    "upload": {
      "key": "U",
      "modifiers": ["shift", "cmd"]
    }
  },
  "syncTime": 1584263702017
}
```