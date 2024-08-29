import classNames from 'classnames'
import './index.scss'
import {changeActiveIndex} from '../../store/modules/takeaway'
import { useSelector,useDispatch } from 'react-redux'
// import { fetchFoodList } from '../../store/modules/takeaway'
// import { useEffect } from 'react'
const Menu = () => {
   //触发action执行
  //1.使用useDispatch ->dispatch 2. shi'yong使用actionCreater 导入进来 3.useEffect 
  const dispatch = useDispatch()
  // useEffect(()=>{
  //   dispatch(fetchFoodList())
  // },[dispatch])

    //获取foodslist 渲染数据列表
  //1.useSelector (state => state.xx,这里的xx要和store里面配置模块匹配上)
  const {foodsList, activeIndex} = useSelector(state=>state.foods)//拿到数据

  const menus = foodsList.map(item => ({ tag: item.tag, name: item.name }))
  return (
    <nav className="list-menu">
      {/* 添加active类名会变成激活状态 */}
      {menus.map((item, index) => {
        return (
          <div
          onClick={()=>dispatch(changeActiveIndex(index))}
            key={item.tag}
            className={classNames(
              'list-menu-item',
              activeIndex === index &&'active'
            )}
          >
            {item.name}
          </div>
        )
      })}
    </nav>
  )
}

export default Menu
