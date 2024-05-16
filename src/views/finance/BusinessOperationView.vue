<template>
  <layout>
    <Title title="查看经营情况"></Title>
    <el-button type="primary" size="medium" @click="searchVisible = true">查看经营情况表</el-button>
    <el-button @click="exportAsExcel">导出Excel</el-button>
    <div style="margin-top: 10px">
      <el-table
        :data="result"
        stripe
        style="width: 100%"
        :header-cell-style="{'text-align':'center'}"
        :cell-style="{'text-align':'center'}"
      >
        <el-table-column
            prop="income"
            label="总收入"
            width="200">
        </el-table-column>
        <el-table-column
            prop="discount"
            label="折让"
            width="200">
        </el-table-column>
        <el-table-column
            prop="expenditure"
            label="总支出"
            width="200">
        </el-table-column>
        <el-table-column
            prop="profit"
            label="总利润"
            width="200">
        </el-table-column>
      </el-table>

    </div>


    <el-dialog
        title="查看经营情况表"
        :visible.sync = "searchVisible"
        width="40%"
        @close="close()">
      <div style="width:90%;margin:0 auto">
        <el-date-picker
            v-model="date"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
        </el-date-picker>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="getData()">立即查看</el-button>
      </span>
    </el-dialog>

  </layout>
</template>

<script>
import Layout from "@/components/content/Layout";
import Title from "@/components/content/Title";
import {formatDate} from "@/common/utils";
import {getBusinessOperation} from "@/network/finance";
import {tableExportExcel} from "@/network/finance";

export default {
  name :'BusinessOperationView',
  components:{
    Layout,
    Title
  },

  data(){
    return{
      searchVisible: false,
      date:'',
      beginTime:'',
      endTime:'',
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
      this.date='';
      this.beginTime='';
      this.endTime='';
    },
    getData(){
      this.result=[];
      this.beginTime = this.beginDate;
      this.endTime = this.endDate;
      const config={
        params:{
          beginTime:this.beginTime,
          endTime:this.endTime
        }
      }
      getBusinessOperation(config).then(_res=>{
        if(this.date===''){
          this.$message.error('查询失败!请选择时间段');
        }else{
          this.$message({
            type:'success',
            message: '查询成功！'
          });
          console.log(_res.result);
          this.result= _res.result;
        }
        this.searchVisible = false;

      })


    },
    exportAsExcel() {
      const config ={
        params:{
          type:"经营情况表"
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