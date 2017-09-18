Geocoding - QA

Greetings!

1) Task 1 - Written test cases for geocoding are located in the excel file "Geocoding - test cases".

2) Task 2 - Smoke tests are located in the same excel file. You can filter the smoke tests by "Type".
Smoke tests are labeled with # - 1,2,3,4,5,6,7,8,9,10

3) Task 3 - Samples of positive/negative tests. 
Positive tests are labeled with # - 1,2,15,16,17....
Negative tests are labeled with # - 3,4,5,6....
   
4) Task 4 - APIautomation

Getting Started
---------------
- Tests are written in javascript using protractor framework and selenium.
-See the [Protractor Website](http://www.protractortest.org) for most documentation.


Required installations
---------------
1. Install node.js
2. Install Protractor: npm install -g protractor
3. Install webdriver-manager: webdriver-manager update
4. Install log4js: npm install -g log4js
5. Install log4js-protractor-appender: npm install -g log4js-protractor-appender
6. Install superagent: npm install -g superagent
7. Replace the folder "example" from 'C:\Users\PC_NAME\AppData\Roaming\npm\node_modules\protractor\' with the one on the git.
8. Have Chrome browser installed.


Quick how-to:
---------------
1. Run a terminal and start the webdriver-manager by typing: webdriver-manager start (if not updated, run: webdriver-manager update)
2. Run a 2nd terminal and start the test by navigating to the folder "C:\Users\PC_NAME\AppData\Roaming\npm\node_modules\protractor\example" and typing: protractor conf.js


More tips:
1. You can skip a test in test_script.js by typing 'x' in front of a test. You will notice 'xit' and 'it'. Only 'it' will be run.
2. Logs for each test run are in 'logs' folder.
3. Parameters used for occuring automated runs are in parameters.json.
4. Helper functions used are in helper.js.


Cheers!
