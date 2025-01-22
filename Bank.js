// 🦋🏦 Bank and Account System 🏦 🦋 

//  🦋🏦 Bank Class: Manages multiple accounts
class Bank {
    constructor() {
        this.accounts = []; // Stores all accounts in the bank here 
    }

    //  🦋 This is the method to create an account for a new user 🦋
    createAccount(name, initialDeposit = 0) {
        const newAccount = new Account(name, initialDeposit); // Create a new Account
        this.accounts.push(newAccount); // Add the new Account to the Bank
        return newAccount; // Return the newly created account
    }
}

//  🤑 Account Class: Represents a single user's account
class Account {
    constructor(name, balance = 0) {
        this.name = name; // Account holder's name
        this.balance = balance; // Initial balance (default will be 0)
        this.transactionHistory = []; // Keeps a record of all transactions here
    }

    // Methods are listed below to deposit, withdraw, and transfer

    // 🤑 To deposit money into the account 
    deposit(amount) {
        if (amount > 0) {
            this.balance += amount; // Update the balance here
            this.transactionHistory.push({ transactionType: 'Deposit', amount }); // Record the transaction here
            console.log(`Deposited: $${amount}. New balance: $${this.balance}`);
        } else {
            console.log('Deposit amount must be greater than zero.');
        }
    }

    // 🦋  Method to withdraw an amount🦋 
    withdraw(amount) {
        if (amount > 0 && this.balance >= amount) {
            this.balance -= amount; // Update the balance here
            this.transactionHistory.push({ transactionType: 'Withdrawal', amount }); // Record the transaction here
            console.log(`Withdrew: $${amount}. New balance: $${this.balance}`);
        } else {
            console.log('Insufficient funds or invalid withdrawal amount.');
        }
    }

    // 🦋 To transfer an amount to another recipient account🦋 
    transfer(amount, recipientAccount) {
        if (amount > 0 && this.balance >= amount) {
            this.balance -= amount; // Withdraw from the sender's account here 
            recipientAccount.balance += amount; // Deposit into the recipient's account
            this.transactionHistory.push({ transactionType: 'Transfer', amount, to: recipientAccount.name });
            recipientAccount.transactionHistory.push({ transactionType: 'Received', amount, from: this.name });
            console.log(`Transferred: $${amount} to ${recipientAccount.name}.`);
        } else {
            console.log('Insufficient funds or invalid transfer amount.');
        }
    }

    // 🦋 To check the account balance🦋 
    checkBalance() {
        return this.balance; // Return the current balance here 
    }

    // 🦋 Method to view the transaction history 🦋 
    getTransactionHistory() {
        return this.transactionHistory; // Return the transaction history here 
    }
}
//<-------------------------------DO NOT WRITE ABOVE THIS LINE------------------------------>

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


console.log(testBankOperations());