import NavBar from './components/NavBar'
import Menu from './components/Menu'
import Cart from './components/Cart'
import FoodsCategory from './components/FoodsCategory'
import './App.scss'
import { useDispatch,useSelector } from 'react-redux'
import { fetchFoodList } from './store/modules/takeaway'
import { useEffect } from 'react'



const App = () => {
  //触发action执行
  //1.使用useDispatch ->dispatch 2. shi'yong使用actionCreater 导入进来 3.useEffect 

  const dispatch = useDispatch()
  useEffect(()=>{
    dispatch(fetchFoodList())
  },[dispatch])
    //获取foodslist 渲染数据列表
  //1.useSelector (state => state.xx,这里的xx要和store里面配置模块匹配上)
  const {foodsList, activeIndex} = useSelector(state=>state.foods)//拿到数据
  return (
    <div className="home">
      {/* 导航 */}
      <NavBar />

      {/* 内容 */}
      <div className="content-wrap">
        <div className="content">
          <Menu />

          <div className="list-content">
            <div className="goods-list">
              {/* 外卖商品列表 */}
              {foodsList.map((item,index) => {
                return (
                  activeIndex === index &&<FoodsCategory
                    key={item.tag}
                    // 列表标题
                    name={item.name}
                    // 列表商品
                    foods={item.foods}
                  />
                )
              })}
            </div>
          </div>
        </div>
      </div>

      {/* 购物车 */}
      <Cart />
    </div>
  )
}

export default App
