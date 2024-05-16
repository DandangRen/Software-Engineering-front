<template>
  <div class="card">
    <el-card v-for="(item) in list" :index="item.index" :key="item.id" shadow="hover">
      <div>
        <el-row>
          <el-col :span="3">
            <span><strong>促销策略编号: </strong>{{item.promotion_id}}</span>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="3">
            <span><strong>用户等级: </strong>{{item.level}}</span>
          </el-col>
          <el-col :span="3">
            <span><strong>操作员: </strong>{{item.operator}}</span>
          </el-col>
        </el-row>
        <el-row style="margin-top: 15px">
          <el-col :span="3">
            <span><strong>折扣: </strong>{{item.discount}}</span>
          </el-col>
          <el-col :span="6">
            <span><strong>代金券总额: </strong>{{item.voucherAmount}}(元)</span>
          </el-col>
          <el-col :span="3">
            <span><strong>赠品: </strong>{{item.gift}}</span>
          </el-col>
          <el-col :span="3">
            <span><strong>起始时间: </strong>{{item.date[0]}}</span>
          </el-col>
          <el-col :span="3">
            <span><strong>结束时间: </strong>{{item.date[1]}}</span>
          </el-col>
        </el-row>
        <el-row style="margin-top: 15px">
          <el-col :span="24">
            <span><strong>备注: </strong>{{item.remark}}</span>
          </el-col>
        </el-row>
      </div>
    </el-card>
  </div>
</template>

<script>

export default {
  name: 'PromotionList',
  props: {
    list: Array,
  },
  data() {
    return {
      showAll: [],
    }
  },
  mounted() {
    this.showAll = new Array(this.list.length).fill(false)
  },
  methods: {

  }
}
</script>

<style lang="scss" scoped>
.card {
  width: 80%;
  margin: 0 auto;
  .button {
    float: right;
    padding: 3px 0
  }
}
.el-card {
  margin-bottom: 20px;
  background: #EEF7F2;
}
</style>