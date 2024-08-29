//编写store
import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
//同步
const foodStore = createSlice({
    
    name: 'foods',
    initialState: {
        ///商品列表
        foodsList: [],
        //菜单激活下标值
        activeIndex: 0,
        //购物车列表
        carList:[]
    },
    reducers: {
        //更改商品列表
        setFoodList(state , action){
            console.log(action);
            
            state.foodsList = action.payload
        },
        //更改activeindex
        changeActiveIndex(state,action){
            console.log(action);
            
            state.activeIndex = action.payload
        },
        //添加购物车
        addCar(state, action) {
            const item = state.carList.find(item => item.id === action.payload.id);
            if (item) {
                item.count++;
            } else {
                state.carList.push({ ...action.payload, count: 1 });
            }
            console.log('carList length:', state.carList.length);
            console.log('First item in carList:', state.carList[0]);
        },
        increCar(state,action){
            //需要判断购物车里面有没有
           const item = state.carList.find(item=>item.id===action.payload.id)
           item.count++
        },
        decreCar(state,action){
            //需要判断购物车里面有没有
           const item = state.carList.find(item=>item.id===action.payload.id)
           if (item.count === 0){
            return
           }
           item.count--
        },
        clearCar(state){
            state.carList = []
        }

    }

})
//异步
//解构出来
const { setFoodList, changeActiveIndex, addCar,increCar,decreCar,clearCar } = foodStore.actions
const fetchFoodList =()=>{
    return async(dispatch)=>{
       const res = await axios.get('http://localhost:3004/takeaway')
       //调用dispatch方法 提交action
        dispatch(setFoodList(res.data))//调用setfoodlist的同时要把后端数据传进来
    }
}
export { fetchFoodList, changeActiveIndex, addCar,increCar,decreCar,clearCar}

const reducers = foodStore.reducer

export default reducers