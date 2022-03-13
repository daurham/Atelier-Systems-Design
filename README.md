# SDC-Jake

## Objective:
Replace the previously provided, underperforming API used for the FEC Project.  Rebuild a service within the API from scratch, focusing on optimizing performance and accommodating web traffic.

## How to set up with your own Database:
Assuming you've downloaded and set up Postgresql, set up a database the can work with the queries defined and are aiming to run requests.
- Run "npm install" to get the node modules.
- CTRL + SHFT + F, Type FILL_ME_IN to Fill in Reqs
- CD to the serverAPI directory, and run "bash init.sh"
- You should be able to connect to the url without including :3000, be it localhost or IP.

### K6 Testing:
Test: k6 run k6script.js
Docs: https://k6.io/blog/how-to-generate-a-constant-request-rate-with-the-new-scenarios-api/

## How to Transform CSV data: