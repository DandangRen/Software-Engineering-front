<template>
  <el-container style="height: 100%; border: 1px solid #eee">
    <el-aside width="250px" style="background-color: #545c64">
      <header class="title">
        <div class="title-inner">ERP</div>
      </header>
      <el-menu
        :default-active="getActivePath"
        class="el-menu-vertical-demo"
        background-color="#fff"
        text-color="#000000DE"
        @open="handleOpen"
        @close="handleClose"
        active-text-color="#7e57c2"
        router
      >
        <el-submenu index="1"
          v-if="permit(PATH.COMMODITY_CLASSIFICATION.requiresAuth)">
          <template slot="title">
            <i class="el-icon-receiving"></i>
            <span slot="title">商品管理</span>
          </template>
          <el-menu-item
            :index="PATH.COMMODITY_CLASSIFICATION.path"
            v-if="permit(PATH.COMMODITY_CLASSIFICATION.requiresAuth)"
          >
            <i class="el-icon-receiving"></i>
            <span slot="title">商品分类管理</span>
          </el-menu-item>
          <el-menu-item
            :index="PATH.COMMODITY_MANAGEMENT.path"
            v-if="permit(PATH.COMMODITY_MANAGEMENT.requiresAuth)"
          >
            <i class="el-icon-receiving"></i>
            <span slot="title">商品管理</span>
          </el-menu-item>
        </el-submenu>

        <el-submenu index="2" v-if="permit(PATH.INVENTORY_OPERATION.requiresAuth)">
          <template slot="title">
            <i class="el-icon-receiving"></i>
            <span slot="title">库存管理</span>
          </template>
          <el-menu-item
            :index="PATH.INVENTORY_MANAGEMENT.path"
            v-if="permit(PATH.INVENTORY_MANAGEMENT.requiresAuth)"
          >
            <i class="el-icon-receiving"></i>
            <span slot="title">库存管理</span>
          </el-menu-item>
<!--          <el-menu-item-->
<!--            :index="PATH.INVENTORY_OPERATION.path"-->
<!--            v-if="permit(PATH.INVENTORY_OPERATION.requiresAuth)"-->
<!--          >-->
<!--            <i class="el-icon-receiving"></i>-->
<!--            <span slot="title">库存操作</span>-->
<!--          </el-menu-item>-->
          <el-menu-item
            :index="PATH.INVENTORY_VIEW.path"
            v-if="permit(PATH.INVENTORY_VIEW.requiresAuth)"
          >
            <i class="el-icon-receiving"></i>
            <span slot="title">库存查看</span>
          </el-menu-item>
          <el-menu-item
            :index="PATH.INVENTORY_CHECK.path"
            v-if="permit(PATH.INVENTORY_CHECK.requiresAuth)"
          >
            <i class="el-icon-receiving"></i>
            <span slot="title">库存盘点</span>
          </el-menu-item>
        </el-submenu>
        <el-submenu index="3"
          v-if="permit(PATH.CUSTOMER_VIEW.requiresAuth)">
          <template slot="title">
            <i class="el-icon-sell"></i>
            <span slot="title">销售管理</span>
          </template>
          <el-menu-item
            :index="PATH.PURCHASE_VIEW.path"
            v-if="permit(PATH.PURCHASE_VIEW.requiresAuth)"
          >
            <i class="el-icon-shopping-cart-full"></i>
            <span slot="title">进货管理</span>
          </el-menu-item>
          <el-menu-item
            :index="PATH.PURCHASE_RETURN_VIEW.path"
            v-if="permit(PATH.PURCHASE_RETURN_VIEW.requiresAuth)"
          >
            <i class="el-icon-shopping-cart-2"></i>
            <span slot="title">进货退货管理</span>
          </el-menu-item>
          <el-menu-item
            :index="PATH.SALE_VIEW.path"
            v-if="permit(PATH.SALE_VIEW.requiresAuth)"
          >
            <i class="el-icon-sell"></i>
            <span slot="title">销售管理</span>
          </el-menu-item>
          <el-menu-item
              :index="PATH.SALE_RETURN_VIEW.path"
              v-if="permit(PATH.SALE_RETURN_VIEW.requiresAuth)"
          >
            <i class="el-icon-shopping-cart-2"></i>
            <span slot="title">销售退货管理</span>
          </el-menu-item>
          <el-menu-item
            :index="PATH.CUSTOMER_VIEW.path"
            v-if="permit(PATH.CUSTOMER_VIEW.requiresAuth)"
          >
            <i class="el-icon-user"></i>
            <span slot="title">客户管理</span>
          </el-menu-item>
          <el-menu-item
              :index="PATH.PROMOTION_VIEW.path"
              v-if="permit(PATH.PROMOTION_VIEW.requiresAuth)"
          >
            <i class="el-icon-user"></i>
            <span slot="title">促销策略管理</span>
          </el-menu-item>
        </el-submenu>
        <el-submenu index="4"
          v-if="permit(PATH.GM_APPROVAL.requiresAuth)">
          <template slot="title">
            <i class="el-icon-receiving"></i>
            <span slot="title">审核管理</span>
          </template>
          <el-menu-item
            :index="PATH.GM_APPROVAL.path"
            v-if="permit(PATH.GM_APPROVAL.requiresAuth)"
          >
            <i class="el-icon-receiving"></i>
            <span slot="title">审批</span>
          </el-menu-item>
        </el-submenu>

        <el-submenu index="5" v-if="permit(PATH.RECEIVABLE_VIEW.requiresAuth)">
          <template slot="title">
            <i class="el-icon-s-finance"></i>
            <span slot="title">财务管理</span>
          </template>
          <el-menu-item
            :index="PATH.BANK_ACCOUNT_VIEW.path"
            v-if="permit(PATH.BANK_ACCOUNT_VIEW.requiresAuth)"
          >
            <i class="el-icon-bank-card"></i>
            <span slot="title">账户管理</span>
          </el-menu-item>
          <el-menu-item
              :index="PATH.SALES_DETAILS_VIEW.path"
              v-if="permit(PATH.SALES_DETAILS_VIEW.requiresAuth)"
          >
            <i class="el-icon-coin"></i>
            <span slot="title">查看销售明细</span>
          </el-menu-item>

          <el-menu-item
            :index="PATH.RECEIVABLE_VIEW.path"
            v-if="permit(PATH.RECEIVABLE_VIEW.requiresAuth)"
          >
            <i class="el-icon-circle-plus"></i>
            <span slot="title">收款管理</span>
          </el-menu-item>

          <el-menu-item
            :index="PATH.PAYABLE_VIEW.path"
            v-if="permit(PATH.PAYABLE_VIEW.requiresAuth)"
          >
            <i class="el-icon-remove"></i>
            <span slot="title">付款管理</span>
          </el-menu-item>

          <el-menu-item
            :index="PATH.BUSINESS_CALENDAR.path"
            v-if="permit(PATH.BUSINESS_CALENDAR.requiresAuth)"
          >
            <i class="el-icon-notebook-2"></i>
            <span slot="title">查看经营历程</span>
          </el-menu-item>
          <el-menu-item
              :index="PATH.BUSINESS_OPERATION_VIEW.path"
              v-if="permit(PATH.BUSINESS_OPERATION_VIEW.requiresAuth)"
          >
            <i class = "el-icon-reading"></i>
            <span slot="title">查看经营情况</span>
          </el-menu-item>
        </el-submenu>

        <el-submenu index="6" v-if="permit(PATH.SALARY_VIEW.requiresAuth)">
          <template slot="title">
            <i class="el-icon-user-solid"></i>
            <span slot="title">人力资源管理</span>
          </template>

          <el-menu-item
            :index="PATH.STAFF_MANAGE_VIEW.path"
            v-if="permit(PATH.STAFF_MANAGE_VIEW.requiresAuth)"
          >
            <i class="el-icon-user"></i>
            <span slot="title">员工管理</span>
          </el-menu-item>

          <el-menu-item
            :index="PATH.STAFF_CLOCK_VIEW.path"
            v-if="permit(PATH.STAFF_CLOCK_VIEW.requiresAuth)"
          >
            <i class="el-icon-check"></i>
            <span slot="title">员工打卡</span>
          </el-menu-item>

          <el-menu-item
            :index="PATH.SALARY_VIEW.path"
            v-if="permit(PATH.SALARY_VIEW.requiresAuth)"
          >
            <i class="el-icon-money"></i>
            <span slot="title">工资管理</span>
          </el-menu-item>
        </el-submenu>

      </el-menu>
      <div class="logout-fix">
        <el-tooltip
          class="item"
          effect="light"
          :content="getUserRole"
          placement="right"
        >
          <div class="logout-name">{{ getUsername() }}</div>
        </el-tooltip>
        <div class="logout" @click="logout()">退出登录</div>
      </div>
    </el-aside>

    <el-main style="overflow-x: hidden">
      <slot></slot>
    </el-main>
  </el-container>
</template>

<script>
import { ROLE, PATH } from "../../common/const";

export default {
  name: "Layout",
  props: {
    activePath: String
  },
  data() {
    return {
      ROLE: ROLE,
      PATH: PATH
    };
  },
  mounted() {},
  computed: {
    getActivePath() {
      if (this.activePath == null) {
        return this.$route.path;
      } else {
        return this.activePath;
      }
    },
    getUserRole() {
      return sessionStorage.getItem("role");
    }
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    logout() {
      sessionStorage.removeItem("name"); // name
      sessionStorage.removeItem("role"); // role
      sessionStorage.removeItem("token"); // token
      // this.$router.push('/');
      location.href = "/";
    },
    getUsername() {
      return sessionStorage.getItem("name");
    },
    permit(arr) {
      return arr.some(role => role === sessionStorage.getItem("role"));
    }
  }
};
</script>

<style>
.title {
  padding: 16px;
  margin-bottom: 10px;
}
.title-inner {
  background-color: #9fa8da !important;
  border-color: #9fa8da !important;
  border-radius: 8px !important;
  line-height: 40px;
  height: 40px;
  text-align: center;
  font-size: 21px;
  font-weight: bold;
}
.el-aside {
  background-color: #fff !important;
  margin-right: 10px;
}
.el-menu {
  border-right: solid 1px #fff;
}
.el-menu-item {
  width: 92%;
  margin: 0 auto;
  padding: 0 10px !important;
  height: 40px;
  line-height: 40px;
  font-size: 13px;
}
.el-menu-item > i {
  margin-right: 30px !important;
}
.el-menu-item:focus,
.el-menu-item:hover {
  outline: 0;
  background-color: #f6f6f6 !important;
}
.el-menu-item.is-active {
  color: #7e57c2;
  background-color: #f0ebf8 !important;
}
.logout-fix {
  position: fixed;
  left: 30px;
  bottom: 30px;
}
.logout-fix .logout-name {
  min-width: 60px;
  background-color: #7e57c2 !important;
  border-color: #7e57c2 !important;
  color: #fff;
  border-radius: 16px;
  font-size: 14px;
  height: 32px;
  text-align: center;
  padding: 0 10px;
  margin-left: -10px;
  line-height: 32px;
  margin-bottom: 14px;
  cursor: pointer;
}
.logout-fix .logout {
  color: #00000099;
  font-size: 14px;
  cursor: pointer;
}
.logout-fix .logout:hover {
  color: #000000;
}
</style>
