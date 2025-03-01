<template>
  <el-container class="centered-container">
    <el-header>
      <el-row>
        <div class="title">{{ Title }}</div>
        <el-button type="primary" @click="addAccount" style="font-size: larger; font-weight: 800;">+</el-button>
      </el-row>
      <el-container>
        <el-row>
          <el-icon :size="25" color="#409efc">
            <InfoFilled />
          </el-icon>
          <span class="remark">{{ Remark }}</span>
        </el-row>
      </el-container>
    </el-header>
    <el-main>
      <el-form ref="form" :model="dynamicAccounts" :rules="Rules" style="width: 100%;">
        <el-form-item v-for="(accountItem, index) in dynamicAccounts.accounts" :key="accountItem.key">
          <el-form-item :prop="'accounts.' + index + '.label'" :rules="Rules.label" class="form-el">
            <el-input v-model="accountItem.label" placeholder="Метка" show-word-limit maxlength="50" style="width:200px"
              @blur="accountsStore.saveToLocalStorage" />
          </el-form-item>
          <el-form-item :prop="'accounts.' + index + '.type'" class="form-el">
            <el-select v-model="accountItem.type" style="width:200px" @change="accountsStore.saveToLocalStorage">
              <el-option label="LDAP" value="ldap"></el-option>
              <el-option label="Локальная" value="local"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item :prop="'accounts.' + index + '.login'" :rules="Rules.login" class="form-el">
            <el-input v-model="accountItem.login" placeholder="Логин" show-word-limit maxlength="100"
              :class="{ loginMaxForm: accountItem.type === 'ldap' }" @blur="accountsStore.saveToLocalStorage" />
          </el-form-item>
          <el-form-item v-if="accountItem.type !== 'ldap'" :prop="'accounts.' + index + '.password'"
            :rules="Rules.password" class="form-el">
            <el-input v-model="accountItem.password" placeholder="Пароль" type="password" show-password show-word-limit
              maxlength="100" style="width:200px" @blur="accountsStore.saveToLocalStorage" />
          </el-form-item>
          <el-button type="danger" @click="removeAccount(accountItem)" :icon="Delete"/>
        </el-form-item>
      </el-form>
      <el-form-item>
        <el-button type="danger" @click="resetForm" style="font-size:medium;">Удалить все</el-button>
      </el-form-item>
    </el-main>
  </el-container>
</template>

<script setup lang="ts">
import { onMounted, reactive, watch } from 'vue';

import {
  ElContainer,
  ElInput,
  ElButton,
  ElRow,
  ElSelect,
  ElOption,
  ElHeader,
  ElMain,
  ElIcon,
  ElFormItem,
  ElForm
} from 'element-plus';
import { InfoFilled, Delete } from '@element-plus/icons-vue';

import { useAccountsStore } from './components/store/AccountsStore';
import type { Account } from './components/Interfaces/Account';
import { Rules, Title, Remark } from './components/constants.ts';

const accountsStore = useAccountsStore();

onMounted(() => {
  accountsStore.loadFromLocalStorage();
});

const dynamicAccounts = reactive<{ accounts: Account[] }>({ accounts: [] });

watch(
  () => accountsStore.accounts,
  (newAccounts) => {
    dynamicAccounts.accounts = newAccounts;
  },
  { immediate: true }
);

const addAccount = () => {
  accountsStore.addAccount();
};

const removeAccount = (accountItem: Account) => {
  accountsStore.removeAccount(accountItem);
};

const resetForm = () => {
  accountsStore.resetForm();
};
</script>

<style scoped>
.centered-container {
  max-width: 1200px;
  margin: 15px auto;
}

.form-el {
  margin-right: 20px;
}

.title {
  margin-right: 20px;
  font-size: 23px;
  color: grey;
  font-weight: bolder;
  font-family: Arial, Helvetica, sans-serif;
}
.remark{
  margin-left: 5px;
  font-size: 12px;
  padding-top: 3px;
  color: grey;
  font-weight: bolder;
  font-family: Arial, Helvetica, sans-serif;
}
.loginMaxForm {
  width: calc(200px * 2 + 20px * 3);
}
</style>