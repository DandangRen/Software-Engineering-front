
<template>
  <Layout>
    <Title title="查看经营历程"></Title>
    <el-button type="primary" size="medium" @click="searchVisible = true">查看经营历程表</el-button>
    <el-button @click="exportAsExcel">导出Excel</el-button>

    <div style="margin-top: 10px">
      <div v-if="XS_LIST.length!==0">
        <sale-list :list="XS_LIST" :type="1" />
      </div>
      <div v-if="XSTH_LIST.length!==0">
        <sale-return-list :list="XSTH_LIST" :type="6" />
      </div>
      <div v-if="JH_LIST.length!==0">
        <purchase-list :list="JH_LIST" :type="2"/>
      </div>

      <div v-if="JHTH_LIST.length!==0" >
        <purchase-return-list :list="JHTH_LIST" :type="3"/>
      </div>

      <div v-if="PAY_LIST.length!==0">
        <payable-list :list="PAY_LIST" :type="4"/>
      </div>

      <div v-if="RECEIVE_LIST.length!==0">
        <receivable-list :list="RECEIVE_LIST" :type="5"/>
      </div>

    </div>

    <el-dialog
        title="查看经营历程表"
        :visible.sync = "searchVisible"
        width="40%"
        @close="close()">
      <!--   时间区间，商品名，客户，业务员，仓库   -->
      <div style="width:90%;margin:0 auto">
        <el-form :model="query" label-width="100px">
          <el-form-item label="单据类型">
            <el-select v-model="query.type">
              <el-option
                v-for="item in type"
                :key = "item"
                :label="item"
                :value="item">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label = "选择日期:">
            <el-date-picker
                v-model="date"
                type="datetimerange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="客户">
            <el-input v-model="query.supplier"  placeholder="请输入客户名称" type="number"></el-input>
          </el-form-item>
          <el-form-item label="业务员">
            <el-input v-model="query.operator"  placeholder="请输入业务员名称"></el-input>
          </el-form-item>


        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="getData()">立即查看</el-button>
      </span>
    </el-dialog>



  </Layout>
</template>

<script>
import Layout from "@/components/content/Layout";
import Title from "@/components/content/Title";
import SaleList from "@/views/sale/components/SaleList";
import SaleReturnList from "@/views/sale/components/SaleReturnList";
import PurchaseList from "@/views/purchase/components/PurchaseList";
import PurchaseReturnList from "@/views/purchase/components/PurchaseReturnList";
import PayableList from "@/views/finance/components/PayableList";

import {formatDate} from "@/common/utils";
import {getBusinessCalendar} from "@/network/finance";
import ReceivableList from "@/views/finance/components/ReceivableList";
import {tableExportExcel} from "@/network/finance";

export default {
  name: 'BusinessCalendar',
  components:{
    ReceivableList,
    Layout,
    Title,
    SaleList,
    PurchaseList,
    PurchaseReturnList,
    PayableList,
    SaleReturnList
  },

  data(){
    return{
      searchVisible: false,
      date:'',
      query:{//时间区间，客户，业务员
        beginDate:'',
        endDate:'',
        supplier: 0,
        operator:'',
        type:''
      },

      type:[
          'XSD',
          'XSTHD',
          'JHD',
          'JHTHD',
          'FKD',
          'SKD'
      ],
      XS_LIST:[],
      XSTH_LIST:[],
      JH_LIST:[],
      JHTH_LIST:[],
      PAY_LIST:[],
      RECEIVE_LIST:[],
      exportType:''
    }

  },
  computed: {
    beginDate: function(){
      return this.date === '' ? '' : formatDate(this.date[0])
    },
    endDate: function() {
      return this.date === '' ? '' : formatDate(this.date[1])
    }
  },
  methods:{
    close(){
      this.query={
        beginDate:'',
        endDate:'',
        supplier: 0,
        operator:'',
        type:''
      };
      this.date = '';
    },
    getData(){
      this.empty();
      this.query.beginDate = this.beginDate;
      this.query.endDate = this.endDate;
      this.query.supplier = Number(this.query.supplier);

      const config={
        params:{
          beginDate:this.query.beginDate,
          endDate:this.query.endDate,
          type:this.query.type,
          supplier: this.query.supplier,
          operator: this.query.operator
        }
      }
      getBusinessCalendar(config).then(_res =>{
        if(this.date===''||this.query.operator===''||this.query.supplier===''||this.query.type===''){
          this.$message.error('查询失败!请输入完整筛选条件');
          this.query={};

        }else{
          this.$message({
            type:'success',
            message: '查询成功！'

          });
          if(this.query.type==='XSD'){
            this.XS_LIST= _res.result;
          }else if(this.query.type==='XSTHD'){
            this.XSTH_LIST = _res.result;
          }else if(this.query.type==='JHD'){
            this.JH_LIST = _res.result;
          }else if(this.query.type==='JHTHD'){
            this.JHTH_LIST = _res.result;
          }else if(this.query.type==='FKD'){
            this.PAY_LIST = _res.result;
          }else if(this.query.type==='SKD'){
            this.RECEIVE_LIST = _res.result;
          }
        }
        this.searchVisible = false;

      })
    },
    empty(){
      this.XS_LIST=[];
      this.XSTH_LIST=[];
      this.JH_LIST=[];
      this.JHTH_LIST=[];
      this.PAY_LIST=[];
      this.RECEIVE_LIST=[];
    },
    exportAsExcel() {
      // XS_LIST:[],
      // XSTH_LIST:[],
      //     JH_LIST:[],
      //     JHTH_LIST:[],
      //     PAY_LIST:[],
      //     RECEIVE_LIST:[],
      if(this.XS_LIST.length !==0){
        this.exportType="销售单历程表";
      }else if(this.XSTH_LIST.length !==0){
        this.exportType="销售退货单历程表";
      }else if(this.JH_LIST.length !==0){
        this.exportType="进货单历程表";
      }else if(this.JHTH_LIST.length !==0){
        this.exportType="进货退货单历程表";
      }else if(this.PAY_LIST.length !==0){
        this.exportType="付款单历程表";
      }else if(this.RECEIVE_LIST.length !==0){
        this.exportType="收款单历程表";
      }

      const config ={
        params:{
          type: this.exportType
        }
      }
      tableExportExcel(config).then(_res =>{
        this.$message({
          type:'success',
          message: '导出excel成功！'

        });
      })
    }

  }

}




</script>