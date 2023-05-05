# NL3 Auth0 Action for Performing Account Protection Check
This integration allows auth0 customers to integrate a post login action to check the lock status for their users' accounts and block access if locked. This integration requires an active license with Next Level3. Please visit www.nextlevel3.com for more details on how to sign up for NL3 Account Protection.

## Steps for configuring as a custom action
1. Log into manage.auth0.com as a user with permissions to create and modify custom actions
2. In the left-side menu select Actions > Library
3. Select the "Build Custom" button in the upper right-hand corner
4. Give the action a descriptive name in the "Name" field (e.g. NL3 Account Protection Check for MyApp)
5. Select "Login / Post Login" for "Trigger"
6. Select "Node 16 (Recommended)" for "Runtime"
7. Click "Create"
8. Copy and Paste the code from the "NL3-Account-Protection-Check.js" in this repository into the action (replace any current, default code completely)
9. Select the icon that looks like a package called "Modules"
10. Select "Add Module"
11. In the "Name" textbox type njwt
12. Click "Create"
13. Select the icon that looks like a skeleton key called "Secrets"
14. Add the following secrets:

| Secret Name | Secret Value (description of value) |
| ----------- | ----------------------------------- |
| SIGNING_KEY | The base64 encoded signing key associated with the application you are integrating with from the NL3 company portal (company.nextlevel3.com) |
| APP_URI | The fully-qualified domain name associated with your application and SIGNING_KEY |
| CLIENT_ID | The Auth0 Client ID associated with the application you wish to add an NL3 Account Protection Check (This value can be found at manage.auth0.com by selecting Applications > Applications on the left-side menu. It will be in the right-hand column of the list of applications. |
| API_HOST | The domain name for the NL3 external API (e.g., api.nextlevel3.com - see NL3 product documentation or contact your account representative) |
| API_PATH | The path to the account protection check API method (e.g.,  /nl3/api/v1/accountProtectionCheck) |
| LOCKED_MESSAGE | The message to display to the end user if the account is locked (e.g. "Either the username and/or password are incorrect or the user account is locked") |
| FAIL_OPEN | Set to 'true' without quotes if you want the lock check to fail open, otherwise set it to 'false' without quotes. |

## Fill in POST data (post_data) with appropriate Auth0 fields in promiseEU function
Different customers store user data in Auth0 in different fields. You will most likely need to update the event.user. . . properties referenced to the appropriate event.user fields for your configuration (contact support for guidance).

## Integrate into Actions "Login" Flow
1. Log into manage.auth0.com as a user with permissions to create and modify action flows
2. In the left-side menu select "Actions > Flows"
3. Select "Login" from the tiles under the "Flows" header
4. In the side panel with the "Add Action" header, select the "Custom" tab
5. Find the Custom Action you created above and drag it into one of the "Drop Here" boxes that display below the "Start > User Logged In" and "Complete - Token Issued" flow designators when you start to drag over the custom action and make sure when you release it the action remains in the flow
6. Select "Apply" in the top right to add the action to the flow


## Test Integration
First, enable a user account for this application. Then, attempt to authenticate with the user account locked and then again with the user account unlocked.

## Integration Complete

# NL3 Auth0 Action for Performing Account Protection Check Plus Enable Users
This integration allows auth0 customers to integrate a post login action to check the lock status for their users' accounts and block access if locked. This integration will aslo create a user in NL3 and enable the auth0 account for locking. NOTE 1: if you use this action DO NOT use the integration above. NOTE 2: this will create a new NL3 user with the same email as the user for the application you add it to. It currently does not support an existing NL3 account, but that could be easily added (please contact support for more info). This integration requires an active license with Next Level3. Please visit www.nextlevel3.com for more details on how to sign up for NL3 Account Protection.

## Steps for configuring as a custom action
1. Log into manage.auth0.com as a user with permissions to create and modify custom actions
2. In the left-side menu select Actions > Library
3. Select the "Build Custom" button in the upper right-hand corner
4. Give the action a descriptive name in the "Name" field (e.g. NL3 Account Protection Check and User Enablement)
5. Select "Login / Post Login" for "Trigger"
6. Select "Node 16 (Recommended)" for "Runtime"
7. Click "Create"
8. Copy and Paste the code from the "NL3-Account-Protection-Check-Plus-Enable-User.js" in this repository into the action (replace any current, default code completely)
9. Select the icon that looks like a package called "Modules"
10. Select "Add Module"
11. In the "Name" textbox type njwt
12. Click "Create"
13. Select the icon that looks like a skeleton key called "Secrets"
14. Add the following secrets:

| Secret Name | Secret Value (description of value) |
| ----------- | ----------------------------------- |
| SIGNING_KEY | The base64 encoded signing key associated with the application you are integrating with from the NL3 company portal (company.nextlevel3.com) |
| APP_URI | The fully-qualified domain name associated with your application and SIGNING_KEY |
| CLIENT_ID | The Auth0 Client ID associated with the application you wish to add an NL3 Account Protection Check (This value can be found at manage.auth0.com by selecting Applications > Applications on the left-side menu. It will be in the right-hand column of the list of applications. |
| API_HOST | The domain name for the NL3 external API (e.g., api.nextlevel3.com - see NL3 product documentation or contact your account representative) |
| API_PATH | The path to the account protection check API method (e.g.,  /nl3/api/v1/accountProtectionCheck) |
| EU_API_PATH | The path to the account protection check API method (e.g.,  /nl3/api/v1/sdk/importUsers) |
| SDK_API_KEY | Retrieve SDK API key from company portal under Keys & Tokens in the side menu |
| LOCKED_MESSAGE | The message to display to the end user if the account is locked (e.g. "Either the username and/or password are incorrect or the user account is locked") |
| FAIL_OPEN | Set to 'true' without quotes if you want the lock check to fail open, otherwise set it to 'false' without quotes. |

## Integrate into Actions "Login" Flow
1. Log into manage.auth0.com as a user with permissions to create and modify action flows
2. In the left-side menu select "Actions > Flows"
3. Select "Login" from the tiles under the "Flows" header
4. In the side panel with the "Add Action" header, select the "Custom" tab
5. Find the Custom Action you created above and drag it into one of the "Drop Here" boxes that display below the "Start > User Logged In" and "Complete - Token Issued" flow designators when you start to drag over the custom action and make sure when you release it the action remains in the flow
6. Select "Apply" in the top right to add the action to the flow


## Test Integration
First, enable a user account for this application. Then, attempt to authenticate with the user account locked and then again with the user account unlocked.

## Integration Complete
