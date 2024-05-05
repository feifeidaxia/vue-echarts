<template>
  <div style="height: 100%">
    <div class="header">
      <div class="selectRange">
        <Menu
          mode="horizontal"
          @on-select="(name) => $route.name !== name && $router.push(name)"
          :active-name="$route.name"
        >
          <MenuItem class="leftMenuItem" name="page1"> 农业总览 </MenuItem>
          <MenuItem class="leftMenuItem" name="page2"> 种植业 </MenuItem>
          <MenuItem class="leftMenuItem" name="page3"> 蔬菜管理 </MenuItem>
        </Menu>
      </div>
      <div class="header-title">
        <img
          class="header-img"
          src="../assets/images/上海市数字农业云平台.png"
          alt="title"
        />
        <span>管理者数字看板</span>
      </div>
      <div class="selectRange">
        <Menu
          mode="horizontal"
          @on-select="(name) => $route.name !== name && $router.push(name)"
          :active-name="$route.name"
        >
          <MenuItem class="rightMenuItem" name="page4"> 渔业管理 </MenuItem>
          <MenuItem class="rightMenuItem" name="page5"> 畜牧管理 </MenuItem>
          <MenuItem class="rightMenuItem" name="page6"> 种植业 </MenuItem>
          <Submenu name="4">
            <template slot="title">
              <img
                class="rightIcon"
                src="../assets/images/Group 670.png"
                alt=""
              />
            </template>
            <MenuItem name="userInfo">信息</MenuItem>
          </Submenu>
        </Menu>
      </div>
    </div>
    <Modal
      v-model="modal"
      title="选择时间"
      :mask-closable="false"
      @on-ok="getMonthBetween(startTime, endTime)"
    >
      <DatePicker
        @on-change="pickStartDate"
        :options="optionStart"
        type="date"
        placeholder="选择开始日期"
        style="width: 200px"
      ></DatePicker>
      <span style="padding: 0 20px; color: #75deef">至</span>
      <DatePicker
        @on-change="pickEndDate"
        :options="optionEnd"
        type="date"
        placeholder="选择结束日期"
        style="width: 200px"
      ></DatePicker>
    </Modal>
    <div class="page">
      <router-view v-if="flag" :selectRangeDate="selectRangeDate"></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: "",
  data() {
    return {
      activeName: "month", // 默认显示近一月
      modal: false,
      flag: false,
      selectRangeDate: [],
      startTime: "",
      endTime: "",
      optionStart: {
        disabledDate(date) {
          // 禁止选择今天之后的日期
          return date && date.valueOf() > Date.now() - 86400000;
        },
      },
      optionEnd: {},
      resizeFn: null,
    };
  },
  mounted() {
    window.addEventListener("resize", this.resizeFn);
    this.handleSelect(this.activeName); // 默认显示近一个月
  },
  methods: {
    pickStartDate(date) {
      // 选择开始时间的回调
      this.startTime = date;
      this.optionEnd = {
        disabledDate(d) {
          // 禁止选择开始时间之前的日期
          return d && d.valueOf() < new Date(date).valueOf() - 86400000;
        },
      };
    },
    pickEndDate(date) {
      // 选择结束时间的回调
      this.endTime = date;
    },
    getMonthBetween(start, end) {
      // 获取开始时间和结束时间之内的所有月份
      this.selectRangeDate = [];
      let s = start.split("-"); // 字符串装换数组
      let e = end.split("-");
      let date = new Date();
      let min = date.setFullYear(s[0], s[1] - 1); // 设置最小时间
      let max = date.setFullYear(e[0], e[1] - 1); // 设置最大时间
      let curr = min;
      while (curr <= max) {
        // 循环添加月份
        var month = curr.getMonth();
        var arr = [curr.getFullYear(), month + 1];
        this.selectRangeDate.push(arr);
        curr.setMonth(month + 1);
      }
    },
    getDays(day) {
      // 获取天数
      let arr = [];
      for (let i = -day; i < 0; i++) {
        // 循环添加天数
        let today = new Date(); // 获取今天
        let targetday_milliseconds = today.getTime() + 1000 * 60 * 60 * 24 * i;
        today.setTime(targetday_milliseconds); //设置i天前的时间
        let tYear = today.getFullYear();
        let tMonth = today.getMonth();
        let tDate = today.getDate();
        let date = [tYear, tMonth + 1, tDate];
        arr.push(date);
      }
      return arr;
    },
    handleSelect(name) {
      switch (name) {
        case "day":
          break;
        case "week":
          this.selectRangeDate = this.getDays(7); // 获取近一周的天数
          this.flag = true;

          break;
        case "month":
          this.selectRangeDate = this.getDays(30); // 获取近一个月的天数
          this.flag = true;
          break;
        case "filter":
          this.modal = true;
          break;
        default:
          break;
      }
    },
  },
};
</script>

<style lang="less">
.ivu-modal {
  .ivu-modal-content {
    background: #071332;

    .ivu-modal-header {
      border-bottom: 1px solid #1a3c58;

      .ivu-modal-header-inner {
        color: #75deef;
      }
    }

    .ivu-modal-body {
      text-align: center;

      .ivu-icon {
        color: #75deef;
      }

      .ivu-modal-confirm-body {
        padding-left: 0;
        color: #75deef;
      }

      .ivu-input {
        background-color: rgba(0, 0, 0, 0);
        border: 1px solid #1a3c58;
        color: #75deef;

        &::-webkit-input-placeholder {
          /* WebKit, Blink, Edge */
          color: #75deef;
        }

        &::-moz-placeholder {
          /* Mozilla Firefox 4 to 18 */
          color: #75deef;
        }

        &::-moz-placeholder {
          /* Mozilla Firefox 19+ */
          color: #75deef;
        }

        &::-ms-input-placeholder {
          /* Internet Explorer 10-11 */
          color: #75deef;
        }
      }

      .ivu-picker-panel-body {
        background: #071332;

        .ivu-date-picker-header {
          color: #75deef;
          border-bottom: 1px solid #1a3c58;
        }

        .ivu-date-picker-cells-cell {
          color: #75deef;

          &:hover em {
            background: #1a3c58;
          }
        }

        .ivu-date-picker-cells-cell-disabled {
          background: rgba(0, 0, 0, 0);
          color: #eee;
        }

        .ivu-date-picker-cells-focused em {
          box-shadow: 0 0 0 1px #1a3c58 inset;

          &::after {
            background: #1a3c58;
          }
        }
      }
    }

    .ivu-modal-footer {
      border-top: 1px solid #1a3c58;

      .ivu-btn-primary {
        color: #75deef;
        background: #1a3c58;
      }

      .ivu-btn-text {
        color: #ddd;
      }
    }
  }
}

.header {
  height: 80px;
  background-image: url(../assets/images/Group\ 671.png);
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-size: 100% auto;
  background-repeat: no-repeat;
  background-color: black;
  padding-left: 50px;

  .header-img {
    height: 45px;
    margin-top: -18px;
    margin-left: 11px;
    position: relative;
  }
  .header-title {
    display: flex;
    flex-direction: column;
    color: #75deef;
    align-items: center;
  }
  .selectRange {
    height: 100%;
    text-align: center;

    .rightIcon {
      width: 25px;
    }
    .ivu-menu-horizontal {
      background: rgba(255, 255, 255, 0);

      &::after {
        height: 0;
      }

      .ivu-menu-item,
      .ivu-menu-submenu {
        color: #75deef;
        min-width: 95px;
      }

      .ivu-select-dropdown {
        background: #09102e;

        .ivu-menu-item {
          color: #75deef;
        }
      }

      .ivu-menu-submenu-title {
        margin-top: 6px;
        i {
          margin-right: 0;
        }

        .ivu-icon-ios-arrow-down {
          display: none;
        }
      }
    }
  }
}

.page {
  height: calc(~"100% - 80px");
}

.ivu-menu-light.ivu-menu-horizontal .ivu-menu-item:hover {
  border-bottom: 2px solid transparent !important;
}
.ivu-menu-light.ivu-menu-horizontal .ivu-menu-item-active {
  border-bottom: 2px solid transparent !important;
}

.leftMenuItem {
  background-image: url("../assets/images/left.png");
  background-size: 100% auto;
  background-repeat: no-repeat;
  background-position: center;
}

.rightMenuItem {
  background-image: url("../assets/images/right.png");
  background-size: 100% auto;
  background-repeat: no-repeat;
  background-position: center;
}

.ivu-menu-item-active.leftMenuItem {
  background-image: url("../assets/images/leftActive.png");
  background-size: 100% auto;
  background-repeat: no-repeat;
  background-position: center;
}
.ivu-menu-item-active.rightMenuItem {
  background-image: url("../assets/images/rightActive.png");
  background-size: 100% auto;
  background-repeat: no-repeat;
  background-position: center;
}
</style>
