Instruction...

1st: Install nodeJs

2nd :Install Node Modules using "npm install" command

3rd : "npm run dev " to start the project

Description: This website is built on NextJS and uses TailwindCSS for styling

Main points:

1. All Api calls are handled using custom hooks and are in the /helpers/Api.js file
2. /helpers/ApiHelpers.js contains the information for orderType, prodType, selectedType, token, city, etc. and the data is fetched from here whenever you want to use it.
3. /components/Layout/Layout.jsx is the wrapper component used in \_app.js and it defines the main layout of the website and handles any of the redirection information such as when a user accesses the website from the Zindigi app
4. /information.json has the "base_url_api" key which is different for both staging branch and production(main branch)
5. The production branch is main and the stagig branch is staging
6. The base path of staging is '/web' and is defined in the next.config.js file

Redux Selectors:

1. selectedAddress : current selected delivery address
2. ticker : ticker of website
3. nearestWarehouse
4. selectedType : b2b, cus or cnc (cnc and cus is not available at the moment and b2b is used by default)
5. city : selected city
6. isUserInitialized : if this is false, the home api is called with the guest user id and the user is initialized on the server
7. selectedPickupLocation
8. redirectSource : at the moment this can be "js_bank"
9. redirectInformation : "name", "email", and "phoneNumber"
10. isShowSelectionScreen : popup for main index page where you select between b2b and cnc (disabled currently)
