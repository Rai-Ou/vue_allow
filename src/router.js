import Vue from 'vue'
import Router from 'vue-router'
import store from './store'

Vue.use(Router)

// 手动跳转的页面白名单
const whiteList = ['/']
// 默认不需要权限的页面
const constantRouterMap = [
  {
    path: '/',
    name: 'home',
    component: resolve => require(['@/views/Home.vue'], resolve)
  },
  {
    path: '/home',
    name: 'home',
    component: resolve => require(['@/views/Home.vue'], resolve)
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: resolve => require(['@/views/About.vue'], resolve)
  }
]
// 注册路由
export const router = new Router({
  routes: constantRouterMap
})
export default router
// 异步路由
export const asyncRouterMap = [
  {
    path: '/page',
    name: 'page',
    meta: { permission: [] },
    component: resolve => require(['@/views/Page.vue'], resolve)
  }
]

/**
 * 根据权限匹配路由
 * @param {array} permission 权限列表（菜单列表）
 * @param {array} asyncRouter 异步路由对象
 */
function routerMath(permission, asyncRouter) {
  return new Promise(resolve => {
    const routers = []

    // 创建路由
    function createRouter(permission) {
      // 根据路径匹配到的router对象添加到routers中
      permission.forEach(item => {
        if (item.children && item.children.length) {
          createRouter(item.children)
        }
        let path = item.path
        // 循环异步路由，将符合权限列表的路由加入到routers中
        asyncRouter.find(s => {
          if (s.path === '') {
            s.children.find(y => {
              if (y.path === path) {
                y.meta.permission = item.permission
                routers.push(s)
              }
            })
          }
          if (s.path === path) {
            s.meta.permission = item.permission
            routers.push(s)
          }
        })
      })
    }

    createRouter(permission)
    resolve([routers])
  })
}

router.beforeEach((to, form, next) => {
  console.log(to.meta.permission)
  if (sessionStorage.getItem('token')) {
    // console.log(to.path)
    if (to.path === '/') {
      router.replace('/home')
    } else {
      console.log(store.state.list.length)
      if (store.state.list.length === 0) {
        // 如果没有权限列表，向后台请求
        console.log(111)
        store
          .dispatch('getPermission')
          .then(res => {
            console.log(res)
            routerMath(res, asyncRouterMap).then(res => {
              router.addRoutes(res[0])
              next(to.path)
            })
          })
          .catch(() => {
            router.replace('/')
          })
      } else {
        if (to.matched.length) {
          next()
        } else {
          router.replace('/')
        }
      }
    }
  } else {
    if (whiteList.indexOf(to.path) >= 0) {
      next()
    } else {
      router.replace('/')
    }
  }
})
