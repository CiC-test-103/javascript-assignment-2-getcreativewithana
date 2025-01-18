// 🏦 Bank and Account System - Assingmnet 2 A.Schultz

// 🏦🤑🤑🤑Bank Class: Manages multiple accounts 🤑🤑🤑🏦
class Bank {
    constructor() {
        this.accounts = []; // Stores all accounts in the bank
    }

    // Methods are below such as createAccount(name, initialDeposit), new Account. 
    createAccount(name, initialDeposit) {
        const newAccount = new Account(name, initialDeposit); // Create a new Account 
        this.accounts.push(newAccount); // Add the new Account to the Bank and Account System 
        return newAccount; // Return the newly created account
    }
}

// 🏦Account Class: Represents a single user's account
class Account {
    constructor(name, balance = 0) {
        this.name = name; // Account holder's name
        this.balance = balance; // Initial balance (default is 0)
        this.transactionHistory = []; // Keeps a record of all transactions
    }

    // 😊Method to deposit an amount
    deposit(amount) {
        this.balance += amount; // Update the balance
        this.transactionHistory.push({ transactionType: 'Deposit', amount }); //  Keeps a record of all transactions ie.  transactionType: 'Deposit', amount: 500 
        console.log(`Deposited: $${amount}. New balance: $${this.balance}`);
    }

    // 😊Method to withdraw an amount
    withdraw(amount) {
        if (amount > this.balance) {
            console.log('Insufficient funds for withdrawal.');
            return;
        }
        this.balance -= amount; // Update the balance
        this.transactionHistory.push({ transactionType: 'Withdrawal', amount }); // Record the transaction, transactionType: 'Withdrawal', amount: 200 
        console.log(`Withdrew: $${amount}. New balance: $${this.balance}`);
    }

    // 🤑Method to transfer an amount to receipeint account 
    transfer(amount, recipientAccount) {
        if (amount > this.balance) {
            console.log('Insufficient funds for transfer.');
            return;
        }
        this.withdraw(amount); // Withdraw from the sender's account
        recipientAccount.deposit(amount); // Deposit into the recipient's account
        this.transactionHistory.push({ transactionType: 'Transfer', amount, to: recipientAccount.name }); // Record the transaction ie. Transfer', amount: 300, to: recipientName 
        recipientAccount.transactionHistory.push({ transactionType: 'Received', amount, from: this.name }); // Record the received transaction ie 'Received', amount: 300, from: senderName }
        console.log(`Transferred: $${amount} to ${recipientAccount.name}.`);
    }

    //🤑 Method to check the account balance example checkBalance (  )
    checkBalance() {
        return this.balance; // Return the current balance
    }
}

//<-------------------------------DO NOT WRITE BELOW THIS LINE------------------------------>

// Function to test bank operations
function testBankOperations() {
    const bank = new Bank();

    // Create new accounts
    const johnAccount = bank.createAccount('John Doe', 1000);
    const janeAccount = bank.createAccount('Jane Doe', 500);
    console.log('Accounts created:', johnAccount, janeAccount);

    // Perform some operations on John's account
    johnAccount.deposit(500);
    johnAccount.withdraw(200);

    // Perform a transfer from John to Jane
    johnAccount.transfer(300, janeAccount);

    // Check balances
    const johnFinalBalance = johnAccount.checkBalance();
    const janeFinalBalance = janeAccount.checkBalance();
    console.log('John\'s balance:', johnFinalBalance);
    console.log('Jane\'s balance:', janeFinalBalance);

    // Return balances for testing
    return {
        johnFinalBalance,
        janeFinalBalance,
        johnTransactionHistory: johnAccount.transactionHistory,
        janeTransactionHistory: janeAccount.transactionHistory
    };
}

module.exports = testBankOperations;

//<-------------------------------DO NOT WRITE ABOVE THIS LINE------------------------------>

// Run the test function and log the results
console.log(testBankOperations());