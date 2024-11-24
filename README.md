![Silk](Images/image.png)
![Silk](Images/image2.png)
![Silk](Images/image3.png)

##

![NextJs](https://camo.githubusercontent.com/d5419d45bd40bcd99f97e53993e1b56e0542fdd4d444974c59b5b5178a451545/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f2d4e6578745f4a532d626c61636b3f7374796c653d666f722d7468652d6261646765266c6f676f436f6c6f723d7768697465266c6f676f3d6e657874646f746a7326636f6c6f723d303030303030)

![TypeScript](https://camo.githubusercontent.com/4318b1b43422f3e2df0cee9da235b3680f08bddaa4f73fab85fc1c5c9f8b60fa/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f2d547970655363726970742d626c61636b3f7374796c653d666f722d7468652d6261646765266c6f676f436f6c6f723d7768697465266c6f676f3d7479706573637269707426636f6c6f723d333137384336)

![TailWind Css](https://camo.githubusercontent.com/93bafe03a143d759a2983be7cd132f70a6a186233ca455f08f3f198adb3d2381/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f2d5461696c77696e645f4353532d626c61636b3f7374796c653d666f722d7468652d6261646765266c6f676f436f6c6f723d7768697465266c6f676f3d7461696c77696e6463737326636f6c6f723d303642364434)



# Introduction
Built with Next.js, Silk is a financial SaaS platform that connects to multiple bank accounts, displays transactions in real-time, allows users to transfer money to other platform users, and manages their finances altogether.


# Tech Stack
* Next.js
* TypeScript
* Appwrite
* Plaid
* Dwolla
* React Hook Form
* Zod
* TailwindCSS
* Chart.js
* ShadCN

# Features
👉 **Authentication**: An ultra-secure SSR authentication with proper validations and authorization

👉 **Connect Banks**: Integrates with Plaid for multiple bank account linking

👉 **Home Page**: Shows general overview of user account with total balance from all connected banks, recent transactions, money spent on different categories, etc

👉 **My Banks**: Check the complete list of all connected banks with respective balances, account details

👉 **Transaction History**: Includes pagination and filtering options for viewing transaction history of different banks

👉 **Real-time Updates**: Reflects changes across all relevant pages upon connecting new bank accounts.

👉 **Funds Transfer**: Allows users to transfer funds using Dwolla to other accounts with required fields and recipient bank ID.

👉 **Responsiveness**: Ensures the application adapts seamlessly to various screen sizes and devices, providing a consistent user experience across desktop, tablet, and mobile platforms.

and many more, including code architecture and reusability.

# Quick Start
Follow these steps to set up the project locally on your machine.

## Prerequisites

Make sure you have the following installed on your machine:

[Git](https://git-scm.com/) <br />
[Node.js](https://nodejs.org/en) <br />
[npm](https://www.npmjs.com/) (Node Package Manager)

## Cloning the Repository
```bash
git clone https://github.com/fahad7169/banking.git 
cd banking

```
## Installation

Install the project dependencies using npm:

```bash
npm install

```
## Set Up Environment Variables

Create a new file named .env in the root of your project and add the following content:

```bash
#NEXT
NEXT_PUBLIC_SITE_URL=

#APPWRITE
NEXT_PUBLIC_APPWRITE_ENDPOINT=https://cloud.appwrite.io/v1
NEXT_PUBLIC_APPWRITE_PROJECT=
APPWRITE_DATABASE_ID=
APPWRITE_USER_COLLECTION_ID=
APPWRITE_BANK_COLLECTION_ID=
APPWRITE_TRANSACTION_COLLECTION_ID=
APPWRITE_SECRET=

#PLAID
PLAID_CLIENT_ID=
PLAID_SECRET=
PLAID_ENV=
PLAID_PRODUCTS=
PLAID_COUNTRY_CODES=

#DWOLLA
DWOLLA_KEY=
DWOLLA_SECRET=
DWOLLA_BASE_URL=https://api-sandbox.dwolla.com
DWOLLA_ENV=sandbox


```


Running the Project


```bash
npm run dev

```
Open http://localhost:3000 in your browser to view the project.

