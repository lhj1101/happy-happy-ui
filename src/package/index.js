import HappyButton from "../package/happy-button/index.vue"; // 引入封装好的组件
import HappyTable from "../package/happy-table/index.vue"; // 引入封装好的组件
import HappyParameter from "../package/happy-parameter/index.vue"; // 引入封装好的组件

const HappyHappyUI = [HappyButton, HappyTable, HappyParameter]; // 将来如果有其它组件,都可以写到这个数组里
console.log('HappyHappyUI', HappyHappyUI);

// 批量组件注册
const install = function (Vue) {
  HappyHappyUI.forEach((ui) => {
    // console.log('ui', ui);
    Vue.component(ui.name, ui);
  });
};

export default install; // 这个方法以后再使用的时候可以被use调用