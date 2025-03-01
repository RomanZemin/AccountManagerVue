import { defineStore } from 'pinia';
import type { Account } from '../Interfaces/Account';

export const useAccountsStore = defineStore('accounts', {
  state: () => ({
    accounts: [] as Account[],
  }),
  actions: {
    addAccount() {
      this.accounts.push({
        key: Date.now(),
        label: '',
        type: 'local',
        login: '',
        password: '',
      });
      this.saveToLocalStorage();
    },
    removeAccount(account: Account) {
      const index = this.accounts.indexOf(account);
      if (index !== -1) {
        this.accounts.splice(index, 1);
        this.saveToLocalStorage();
      }
    },
    resetForm() {
      this.accounts = [];
      localStorage.removeItem('accounts');
    },
    saveToLocalStorage() {
        const validAccounts = this.accounts.filter(account => 
          account.login && (account.type === 'ldap' || account.password)
        ).map(account => {
          if (account.type === 'ldap') {
            account.password = '';
          }
          return account;
        });
        localStorage.setItem('accounts', JSON.stringify(validAccounts));
    },
    loadFromLocalStorage() {
      const storedAccounts = localStorage.getItem('accounts');
      if (storedAccounts) {
        this.accounts = JSON.parse(storedAccounts);
      }
    },
  },
});