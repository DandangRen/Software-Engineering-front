<template>
  <div></div>
</template>

<script>
import { ROLE, PATH } from "../common/const";
  export default {
    beforeMount() {
      // 设置不同角色访问的首页
      let role = sessionStorage.getItem("role");
      console.log(role)
      if(role === ROLE.ADMIN) {
        this.$router.push(PATH.COMMODITY_CLASSIFICATION.path);
      } else if(role === ROLE.INVENTORY_MANAGER) {
        this.$router.push(PATH.COMMODITY_CLASSIFICATION.path);
      } else if(role === ROLE.GM) {
        this.$router.push(PATH.GM_APPROVAL.path);
      } else if (role === ROLE.SALE_STAFF || role === ROLE.SALE_MANAGER) {
        this.$router.push(PATH.PURCHASE_VIEW.path)
      } else if (role === ROLE.FINANCIAL_STAFF){
        this.$router.push(PATH.RECEIVABLE_VIEW.path)
      } else if (role === ROLE.HR){
        this.$router.push(PATH.STAFF_MANAGE_VIEW.path)
      }
      else {
        this.$router.push("/error");
      }
    }
  }
</script>

<style scoped>
</style>
