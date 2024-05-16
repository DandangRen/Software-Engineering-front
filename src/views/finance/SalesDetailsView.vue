<template>
  <Layout>
    <Title title="查看销售明细"></Title>
    <el-button type="primary" size="medium" @click="searchVisible = true">查看销售明细表</el-button>
<!--时间（精确到天），商品名， 型号，数量，单价，总额。需要支持导出数据。-->
    <el-button @click="exportAsExcel">导出Excel</el-button>

    <div style="margin-top: 10px">
      <el-table
          :data="result"
          stripe
          style="width: 100%"
          :header-cell-style="{'text-align':'center'}"
          :cell-style="{'text-align':'center'}">
        <el-table-column
            prop="create_time"
            label="时间"
            width="200">
        </el-table-column>
        <el-table-column
            prop="name"
            label="名称"
            width="200">
        </el-table-column>
        <el-table-column
            prop="type"
            label="型号"
            width="200">
        </el-table-column>
        <el-table-column
            prop="quantity"
            label="数量"
            width="200">
        </el-table-column>
        <el-table-column
            prop="unit_price"
            label="单价"
            width="200">
        </el-table-column>
        <el-table-column
            prop="total_price"
            label="总额"
            width="200">
        </el-table-column>
      </el-table>
    </div>


    <el-dialog
      title="查看销售明细表"
      :visible.sync = "searchVisible"
      width="40%"
      @close="close()">
<!--   时间区间，商品名，客户，业务员，仓库   -->
      <div style="width:90%;margin:0 auto">
        <el-form :model="query" label-width="100px">
          <el-form-item label="商品名称">
            <el-input v-model="query.name"  placeholder="请输入商品名称"></el-input>
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

import {getSalesDetails} from '@/network/finance';
import {formatDate} from "@/common/utils";
import {tableExportExcel} from "@/network/finance";

export default {
  name: 'SalesDetailsView',
  components:{
    Layout,
    Title
  },

  data(){
    return{
      searchVisible: false,
      date:'',
      query:{//时间区间，商品名，客户，业务员
        beginDate:'',
        endDate:'',
        name:'',
        supplier:0,
        operator:'',
      },
      result:[]
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
      this.query={};
      this.date = '';
    },
    getData(){
      this.result=[];
      this.query.beginDate = this.beginDate;
      this.query.endDate = this.endDate;
      this.query.supplier = Number(this.query.supplier);
      console.log(this.query);
      const config = {
        params:{
          beginDate:this.query.beginDate,
          endDate:this.query.endDate,
          name:this.query.name,
          supplier:this.query.supplier,
          operator: this.query.operator

        }
      }
      console.log(config);
      getSalesDetails(config).then(_res =>{
        if(this.date===''||this.query.operator===''||this.query.supplier===''||this.query.name===''){
          this.$message.error('查询失败')
          this.query={};
        }else{
          this.$message({
            type:'success',
            message: '查询成功！'

          });
          this.result = _res.result;
          console.log(_res.result);
          console.log(this.result)
        }

        this.searchVisible=false;

      })
    },
    exportAsExcel(){
      const config ={
        params:{
          type:"销售明细表"
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