<template>
  <Layout>
    <Title title="促销策略管理"></Title>
    <el-button type="primary" size="medium" @click="dialogVisible = true">制定促销策略</el-button>

    <div style="margin-top: 10px">
      <el-table
        :data="promotionList"
        stripe
        style="width: 100%"
        :header-cell-style="{'text-align':'center'}"
        :cell-style="{'text-align':'center'}">
        <el-table-column
          prop="id"
          label="促销策略单据编号"
          width="200">
        </el-table-column>
        <el-table-column
          prop="operator"
          label="操作员"
          width="100">
        </el-table-column>
        <el-table-column
          prop="discount"
          label="折让"
          width="100">
        </el-table-column>
        <el-table-column
          prop="voucherAmount"
          label="使用代金券总额"
          width="200">
        </el-table-column>
        <el-table-column
          prop="gift"
          label="赠品"
          width="100">
        </el-table-column>
        <el-table-column
          prop="promotionstrategy"
          label="促销策略"
          width="100">
        </el-table-column>
        <el-table-column
          prop="remark"
          label="备注"
          width="100">
        </el-table-column>
      </el-table>
    </div>
    <el-dialog
        title="创建促销策略单"
        :visible.sync="dialogVisible"
        width="40%">
      <div style="width: 90%; margin: 0 auto">
        <el-form :model="promotionForm" label-width="100px" ref="promotionForm" :rules="rules">
          <el-form-item label="促销策略: " prop="promotionstrategy">
            <el-select v-model="promotionstrategy" placeholder="请选择促销策略">
              <el-option label="对不同级别用户送赠品" value=1></el-option>
              <el-option label="对不同级别用户送代金券" value=3></el-option>
              <el-option label="对不同级别用户进行打折" value=2></el-option>
              <el-option label="对不同总价送赠品" value=1></el-option>
              <el-option label="对不同总价送代金券" value=3></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="促销策略编号: " prop="promotion_id">
            <el-input v-model="promotion_id"></el-input>
          </el-form-item>
          <el-form-item label="用户等级">
            <el-select v-model="level" placeholder="请选择用户级别">
              <el-option
                  v-for="item in levelList"
                  :key="item"
                  :label="item"
                  :value="item">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="折扣: " prop="discount">
            <el-input v-model="discount"></el-input>
          </el-form-item>
          <el-form-item label="代金券总额: " prop="voucherAmount">
            <el-input v-model="voucherAmount"></el-input>
          </el-form-item>
          <el-form-item label="赠品: " prop="gift">
            <el-input v-model="gift"></el-input>
          </el-form-item>
          <el-form-item label="选择日期">
            <el-date-picker
                v-model="date"
                type="datetimerange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="备注: ">
            <el-input type="textarea" v-model="promotionForm.remark"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm('promotionForm')">立即创建</el-button>
      </span>
    </el-dialog>

  </Layout>
</template>

<script>
import Layout from "@/components/content/Layout";
import Title from "@/components/content/Title";
import {createPromotion, getAllPromotion} from "../../network/promotion";
import {formatDate} from "@/common/utils";

export default {
  name: 'PromotionView',
  components: {
    Layout,
    Title,
  },
  data() {
    return {
      promotionList: [],
      date:'',
      beginTime:'',
      endTime:'',
      levelList:[
        1,
        2,
        3,
        4,
        5,
        "ALL"
      ],
      promotion_id: '',
      discount: '',
      voucherAmount: '',
      gift: '',
      level: '',
      dialogVisible: false,
      promotionForm: {

      },
      promotionstrategy: '',
      rules: {
        start_time: [
          { required: true, message: '请输入起始时间', trigger: 'change' }
        ],
        end_time: [
          { required: true, message: '请输入结束时间', trigger: 'change' }
        ],
      },
    }
  },
  mounted() {
    this.getPromotion()
  },
  computed: {
    beginDate: function(){
      return this.date === '' ? '' : formatDate(this.date[0])
    },
    endDate: function() {
      return this.date === '' ? '' : formatDate(this.date[1])
    }
  },
  methods: {
    getPromotion(){
      this.promotionList = [];
      getAllPromotion({}).then(_res => {
        this.promotionList=this.promotionList.concat(_res.result);
      })
    },
    submitForm(formName) {
      // console.log(this.promotionstrategy)
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.promotionForm.id = this.promotion_id;
          this.promotionForm.operator = sessionStorage.getItem("name")
          this.promotionForm.discount = Number(this.promotionForm.discount)
          this.promotionForm.voucherAmount = Number(this.promotionForm.voucherAmount)
          this.promotionForm.gift = this.gift;
          this.promotionForm.promotionstrategy = this.promotionstrategy;
          //console.log(this.promotionForm.promotionstrategy)
          createPromotion(this.promotionForm).then(_res => {
            if (_res.msg === 'Success') {
              this.$message.success('创建成功!')
              this.dialogVisible = false
            }
          })
          this.getPromotion()
        }
      })
    },
  }
}
</script>

<style lang="scss" scoped>
.body {
  margin: 0 auto;
  margin-top: 10px;
  height: 80vh;
  overflow-y: auto;
  width: 100%;
  background: rgba($color: #fff, $alpha: 0.5);
}
.mt15 {
  margin-top: 15px;
}
</style>