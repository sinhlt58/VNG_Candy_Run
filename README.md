# VNG_Run_Run

Needed tools:

Cocos2dx 3.13.1: http://www.cocos2d-x.org/download/version (dowloand version 3.13.1 - very important)

Android sdk: https://developer.android.com/studio/index.html

Android ndk 12b: https://developer.android.com/ndk/downloads/index.html

Ant: http://ant.apache.org/

Setup:

I. Setup cocos2dx 3.13.1

1. go to folder cocos2dx-3.13.1 and run setup.py

2. do the instruction in the console

II. Gen static libs: (This step only needed for android build, ignore this step if you only wanna run for web)

1. Open cmd and run `cocos gen-libs -p android -m debug --ap-abi x86:armeabi:armeabi-v7`

III. Build project

A. For web

1. Just simply go to Candy_run folder and run `cocos run -p web`

B. For android

1. Just simply go to Candy_run folder and run `cocos run -p android`
