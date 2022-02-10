# v16.4后的生命周期

[React生命周期](https://juejin.cn/post/6914112105964634119#comment)

https://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/

![img](https://images.yewq.top/a7d8676f379d4d96bbf0ebd9a8528594~tplv-k3u1fbpfcp-watermark.awebp)

- 挂载
    - constructor
    - getDerivedStateFromProps
    - render
    - componentDidMount

- 更新
    - getDerivedStateFromProps
    - shouldComponentUpdate
    - render
    - getSnapshotBeforeUpdate
    - componentDidUpdate

- 卸载
    - componentWillUnmount

## 详解新的生命周期

### 各个阶段生命周期函数

#### constructor()

```
constructor()` 在React组件挂载之前被调用，在为React.Component子类实现构造函数时，应在其他语句之前调用 `super()
```

> super的作用：将父类的this对象继承给子类 ([MDN参考](https://link.juejin.cn?target=https%3A%2F%2Fdeveloper.mozilla.org%2Fzh-CN%2Fdocs%2FWeb%2FJavaScript%2FReference%2FOperators%2Fsuper%23%E6%8F%8F%E8%BF%B0))

通常，React构造函数仅用于以下两种情况：

- 来初始化函数内部 state
- 为 [事件处理函数](https://link.juejin.cn?target=https%3A%2F%2Fzh-hans.reactjs.org%2Fdocs%2Fhandling-events.html) 绑定实例

> 如果不初始化 `state` 或不进行方法绑定，则不需要写 `constructor()` , 只需要设置 `this.state` 即可

> 不能在 `constructor()`构造函数内部调用 `this.setState()`, 因为此时第一次 `render()`还未执行，也就意味DOM节点还未挂载

#### static getDerivedStateFromProps(nextProps, prevState/nextProps)

`getDerivedStateFromProps()` 在调用 `render`方法之前调用，在初始化和后续更新都会被调用

> 返回值：返回一个对象来更新 `state`,  如果返回 `null` 则不修改state

> 参数： 第一个参数为即将更新的 `props`,  第二个参数为上一个状态的 `state` , 可以比较`props` 和 `state`来加一些限制条件，防止无用的state更新

> 注意：`getDerivedStateFromProps` 是一个静态函数，不能使用this, 也就是只能作一些无副作用的操作

至于为什么要这样做？请移步 [Morgan大佬 - 知乎](https://zhuanlan.zhihu.com/p/38030418)

#### render()

`render()` 方法是class组件中唯一必须实现的方法，用于渲染dom,  `render()`方法必须返回reactDOM

> 注意： 不要在 `render` 里面 `setState`, 否则会触发死循环导致内存崩溃

#### componentDidMount()

```
 componentDidMount()` 在组件挂载后 (插入DOM树后) 立即调用，`componentDidMount() `是发送网络请求、启用事件监听方法的好时机，并且可以在 此钩子函数里直接调用 `setState()
```

#### shouldComponentUpdate(nextProps, nextState)

`shouldComponentUpdate()` 在组件更新之前调用，可以控制组件是否进行更新， 返回true时组件更新， 返回false则不更新

> 包含两个参数，第一个是即将更新的 props 值，第二个是即将跟新后的 state 值，可以根据更新前后的 props 或 state 来比较加一些限制条件，决定是否更新，进行性能优化

> 不建议在 `shouldComponentUpdate()` 中进行深层比较或使用 `JSON.stringify()`。这样非常影响效率，且会损害性能

> 不要 `shouldComponentUpdate` 中调用 setState()，否则会导致无限循环调用更新、渲染，直至浏览器内存崩溃

> 可以使用内置 **[`PureComponent`](https://link.juejin.cn?target=https%3A%2F%2Fzh-hans.reactjs.org%2Fdocs%2Freact-api.html%23reactpurecomponent)** 组件替代

#### getSnapshotBeforeUpdate(prevProps, prevState)

`getSnapshotBeforeUpdate()` 在最近一次的渲染输出被提交之前调用。也就是说，在 render 之后，即将对组件进行挂载时调用。

> 它可以使组件在 DOM 真正更新之前捕获一些信息（例如滚动位置），此生命周期返回的任何值都会作为参数传递给 `componentDidUpdate()`。如不需要传递任何值，那么请返回 null

#### componentDidUpdate(prevProps, prevState, snapshot)

`componentDidUpdate()` 会在更新后会被立即调用。首次渲染不会执行

> 包含三个参数，第一个是上一次props值。 第二个是上一次state值。如果组件实现了 `getSnapshotBeforeUpdate()` 生命周期（不常用），第三个是“snapshot” 参数传递

> 可以进行前后props的比较进行条件语句的限制，来进行 `setState()` , 否则会导致死循环

#### componentWillUnmount()

`componentWillUnmount()` 在组件即将被卸载或销毁时进行调用。

> 此生命周期是**取消网络请求**、移除**监听事件**、**清理 DOM 元素**、**清理定时器**等操作的好时机



### 生命周期执行顺序

#### 挂载时: 

 constructor() -> static getDerivedStateFromProps() -> render() -> componentDidMount()



 #### 更新时: 

 static getDerivedStateFromProps() -> shouldComponentUpdate() -> render() -> getSnapshotBeforeUpdate() -> componentDidUpdate()



#### 卸载时: 

 componentWillUnmount()



### 总结

生命周期

  各阶段经历的函数

  挂载阶段: constructor() 构造函数 -> getDerivedStateFromProps(nextProps, prevState) -> render() ->  componentDidMount()

  更新阶段: getDerivedStateFromProps(nextProps, prevState) -> shouldComponentUpdate(nextProps, nextState) 是否更新 -> render() -> getSnapshotBeforeUpate(prevProps, prevState): snapshot -> (更新Dom, refs)-> componentDidUpdate(prevProps, prevState, snapshot)

  卸载阶段:  componentWillUnmount()

#### 发展过程: 新增了两个. 删除了3个. 为什么要这样做？

  新增: 

   \- getDerivedStateFromProps

   \- getSnapshotBeforeUpdate

  删除:

   \- componentWillReceiveProps

   \- componentWillMount

   \- componentWillUpdate

  在Fiber之后, 任务是可以被中断的. 原有的生命周期函数可能会被多次调用.

  原有生命周期函数的组合在Fiber之后就显得不合适了, 原有的生命周期函数总是会诱惑开发者在render之前的生命周期函数做一些动作，现在这些动作还放在这些函数中的话，有可能会被调用多次，这肯定不是你想要的结果. 删除了, 可以断了在这些生命周期函数里做些不该做事情的念想。



# redux, react-redux源码解析

## redux

- createStore 创建store, 订阅事件, 返回getState, dispatch, subscrible
- applyMiddleware  合并中间件 扩展createStore功能
- compose 执行一系列函数



redux.js

```js
export function createStore(reducer, enhancer) {
  if (enhancer) {
    return enhancer(createStore)(reducer);
  }
  let currentState = undefined;
  let currentListeners = [];
  function getState() {
    return currentState;
  }
  function dispatch(action) {
    currentState = reducer(currentState, action);
    // 监听函数是一个数组，那就循环吧
    currentListeners.map(listener => listener());
  }

  //订阅，可以多次订阅
  function subscribe(listener) {
    // 每次订阅，把回调放入回调数组
    currentListeners.push(listener);
  }

  // 取值的时候，注意一定要保证不和项目中的会重复
  dispatch({type: "@INIT/REDUX-KKB"});

  return {
    getState,
    dispatch,
    subscribe
  };
}

export function applyMiddleware(...middlewares) {
  return createStore => (...args) => {
    const store = createStore(...args);
    let dispatch = store.dispatch;
    const middleApi = {
      getState: store.getState,
      dispatch,
    };
    // 给middleware参数，比如说dispatch
    const middlewaresChain = middlewares.map((middleware) => {
      // console.log(middleware(middleApi));
      return middleware(middleApi);
    });
    // 传递dispatch. 返回新的dispatch.
    dispatch = compose(...middlewaresChain)(dispatch);
    console.log(dispatch); // (...args) => a(b(c(...args)))
    return {
      ...store,

      // 覆盖上面store里的dispatch
      dispatch,
    };
  };
}

// compose(a, b, c) => (...args) => a(b(c(...args)))
function compose(...funcs) {
  if (funcs.length === 0) {
    return arg => arg;
  }
  if (funcs.length === 1) {
    return funcs[0];
  }
  return funcs.reduce((a, b) => (...args) => a(b(...args)));
}

// 合并reducers
export function combineReducers(reducers) {
  return function (state = {}, action) {
    const newReducer = {};
    for (const [key, value] of Object.entries(reducers)) {
      newReducer[key] = value(state[key], action);
    }
    return newReducer;
  };
}

```

store.js

```js
import {createStore, applyMiddleware} from "redux";
// import {createStore, applyMiddleware} from "../kRedux";
import thunk from "redux-thunk";
import logger from "redux-logger";

function combineReducers(reducers) {
  return function (state = {}, action) {
    const newReducer = {};
    for (const [key, value] of Object.entries(reducers)) {
      newReducer[key] = value(state[key], action);
    }
    return newReducer;
  };
}

// 定义修改规则
function countReducer(state = 0, action) {
  switch (action.type) {
    case "ADD":
      return state + 1;
    case "MINUS":
      return state - 1;
    default:
      return state;
  }
}

// 默认action是对象. dispatch(action),  中间件thunk让dispatch能接受异步函数
const store = createStore(
  combineReducers({
    count: countReducer,
  }),
  applyMiddleware(thunk, logger)
);

export default store;

// function logger({getState, dispatch}) {
//   return next => action => {
//     console.log(action.type + "执行了"); //sy-log
//     return next(action);
//   };
// }

// function thunk({getState, dispatch}) {
//   return next => action => {
//     // action 可以是对象 还可以是函数 ，那不同的形式，操作也不同
//     if (typeof action === "function") {
//       return action(dispatch, getState);
//     } else {
//       return next(action);
//     }
//   };
// }


```

## react-redux

react-redux 借助 React.createContext() 将store从父组件传递到隔代组件, 隔代组件使用高阶函数connect包裹返回新组件, props里接收store的值和dispatch.

- Provider 使用context传递store
- connect  接收context. 组件从而创建新组件, 传stateProps, dispatchProps给新组件. 同时订阅更新~

ReactRedux.js

```js


import React, { Component } from 'react';

let StoreContext = React.createContext();
// {
//   add: () => ({ type: 'ADD' }),
// }

// 转换成 dispatch调用
function bindActionCreator(actionCreator, dispatch) {
  return (...args) => dispatch(actionCreator(...args));
}
function bindActionCreators(actionCreators, dispatch) {
  let boundActionCreators = {};
  for (const key in actionCreators) {
    if (Object.hasOwnProperty.call(actionCreators, key)) {
      boundActionCreators[key] = bindActionCreator(
        actionCreators[key],
        dispatch
      );
    }
  }
  return boundActionCreators;
}


export function connect(mapStateToProps, mapDispatchToProps) {
  return (WrapComponent) =>
    class extends Component {
      // 返回的组件接收context 访问方式 this.context
      static contextType = StoreContext;

      constructor(props) {
        super();
        this.state = {
          props: {},
        };
      }
      // constructor -> getDerivedStateFromProps -> render -> componentDidMount
      componentDidMount() {
        // 初始化
        this.update();
        // 订阅 刷新store
        const { subscribe } = this.context;
        subscribe(() => this.update())
      }

      update = () => {
        const { getState, dispatch } = this.context;
        let stateProps = mapStateToProps(getState(), this.props);
        let dispatchProps;
        // mapDispatchToProps: Object / Function类型;
        if(typeof mapDispatchToProps === 'object' && mapDispatchToProps !== null) {
          dispatchProps = bindActionCreators(mapDispatchToProps);
        } else if (typeof mapDispatchToProps === 'function') {
          dispatchProps = mapDispatchToProps(dispatch);
        } else {
          // 默认返回dispatch
          dispatchProps = { dispatch };
        }
        this.setState({
          props: {
            ...stateProps,
            ...dispatchProps,
          },
        });
      }

      render() {
        return <WrapComponent {...this.props} {...this.state.props} />;
      }
    };
}



export class Provider extends Component {
  render() {
    return (
        <StoreContext.Provider value={this.props.store}>
          {this.props.children}
        </StoreContext.Provider>
    );
  }
}


```



page.js 

```js

import React, {Component} from "react";
// import { connect } from "react-redux";
import { connect } from "../kReactRedux";
import { bindActionCreators } from 'redux';

export default connect(
  // mapStateToProps ，如果ownProps存在, 当 props 接收到来自父组件一个小小的改动，那么你所使用的 ownProps 参数，mapStateToProps 都会被重新计算
  (state, ownProps) => {
    return {
      count: state.count,
    };
  },
  // mapDispatchToProps: Object/Function类型
  //  如果传递的是一个对象，那么每个定义在该对象的函数都将被当作 Redux action creator，对象所定义的方法名将作为属性名
  // {
  //   add: () => ({ type: 'ADD' }),
  // }
  // 如果传递的是一个函数，该函数将接收一个 dispatch 函数，然后由你来决定如何返回一个对象，这个对象通过 dispatch 函数与 action creator 以某种方式绑定在一起.
  (dispatch, ownProps) => {
    return {
      // bindActionCreators(actionCreators, dispatch) --- actionCreators: (Function or Object): 一个 action creator，或者一个 value 是 action creator 的对象。
      // type ActionCreator = (...args: any) => Action | AsyncAction
      add: bindActionCreators(() => ({ type: 'ADD' }), dispatch),
      dispatch,
    };
  }
)(
  class ReactReduxPage extends Component {
    render() {
      console.log(this.props);
      const { dispatch, add } = this.props;
      return (
        <div>
          <h3>ReactReduxPage</h3>
          <h3>{this.props.count}</h3>
          {/* getState获取数据 */}
          <button onClick={add}>add</button>
          <button onClick={() => dispatch({ type: "MINUS" })}>minus</button>
          <button
            onClick={() =>
              dispatch((dispatch, getState) => {
                setTimeout(() => {
                  dispatch({
                    type: "ADD"
                  })
                }, 1000);
              })
            }
          >
            asyAdd
          </button>
        </div>
      );
    }
  }
);
```



# react-router

借助HTML5 history api 和 react context传递RouterContext

- BrowerRouter
- Route
- Link
- Switch
- Redirect

```js
// React.cloneElement(element,[config])  React.createElement(type, [props])的区别
```

react-router-dom（在浏览器中使⽤）或react-router-native（在rn中使⽤）。react-routerdom和react-router-native都依赖react-router，所以在安装

时，react-router也会⾃动安装，创建web应⽤.

```js
import React from "react";
// import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import { BrowserRouter as Router, Route, Link, Switch } from "./k-react-router-dom";
import HomePage from "./pages/HomePage";
import UserPage from "./pages/UserPage";
import LoginPage from "./pages/LoginPage";
import PrivateRoute from "./pages/PrivateRoute";

function App() {
  return (
    <div className="App">
      {/* react-router-dom（在浏览器中使
⽤）或react-router-native（在rn中使⽤）。react-routerdom和react-router-native都依赖react-router，所以在安装
时，react-router也会⾃动安装，创建web应⽤ */}
      {/* BrowserRouter history HTML5 api */}
      {/* MemoryRouter -> 把 URL 的历史记录保存在内存中的 <Router>（不读取、不 写⼊地址栏）。在测试和⾮浏览器环境中很有⽤，如React Native。 */}
      <Router
        getUserConfirmation={(message, callback) => {
          // this is the default behavior
          const allowTransition = window.confirm(message);
          callback(allowTransition);
        }}
        // basename='/'
      >
        <Link to="/">首页</Link>
        <Link to="/user">用户中心</Link>
        {/* <Link to="/login">登录</Link> */}
        <Link to="/children">children</Link>
        <Link to="/render">render</Link>
        <Link to="/search/123">search</Link>

        {/* 独占路由 匹配一个 */}
        {/* <Switch location={{pathname: "/user"}}> */}
        <Switch>
          {/* 渲染component的时候会调⽤ React.createElement，如果使⽤下⾯这种匿名函数的形 式，每次都会⽣成⼀个新的匿名的函数， 导致⽣成的组件的type总是不相同，这个时候会 产⽣重复的卸载和挂载  */}
          {/* Route渲染优先级：children > component > render。 */}
          {/* component render: func children: func */}
          <Route exact path="/" component={HomePage} />
          {/* props.match.params访问 */}
          {/* <Route path="/user" component={UserPage} /> */}
          <PrivateRoute path="/user" component={UserPage} />
          <Route path="/login" component={LoginPage} />
          <Route path="/children" children={() => <div>children</div>} />
          <Route path="/render" render={() => <div>render</div>} />
          <Route path="/search/:id" component={SearchComponent} />
          <Route render={() => <div>404</div>} />
        </Switch>
      </Router>
    </div>
  );
}

function DetailComonent(props) {
  return <div>DetailComonent</div>;
}

function SearchComponent(props) {
  const { id } = props.match.params; //props.match.params;
  return (
    <div>
      <div>SearchComponent-{id}</div>
      <Link to="/search/123/detail">详情</Link>
      <Route path="/search/:id/detail" component={DetailComonent} />
    </div>
  );
}

export default App;

```

书写 k-react-router-dom

### BowerRouter

```js
import React, { Component } from "react";
import { RouterContext } from "./RouterContext";
import { createBrowserHistory } from "history";

class Browserrouter extends Component {
  // 初始match
  static computeRootMatch(pathname) {
    return {
      path: "/",
      url: "/",
      params: {},
      isExact: pathname === "/",
    };
  }
  constructor(props) {
    super(props);
    this.history = createBrowserHistory();
    this.state = {
      history: this.history,
      location: this.history.location,
    };
    // 监听location变换
    this.unlisten = this.history.listen((location) => {
      this.setState({
        location,
      });
    });
  }
  componentWillUnmount() {
    // 销毁监听事件
    if (this.unlisten) {
      this.unlisten();
    }
  }
  render() {
    return (
      <RouterContext.Provider value={{ ...this.state, match: Browserrouter.computeRootMatch(this.state.location.pathname)}}>
        {this.props.children}
      </RouterContext.Provider>
    );
  }
}

export default Browserrouter;

```

### Route

```js
import React, { Component } from "react";
import { RouterContext } from "./RouterContext";
import matchPath from './matchPath'

export default class Route extends Component {
  render() {
    return (
      <RouterContext.Consumer>
        {(context) => {
          const { component, computeMatch, children, render } = this.props;
          // Route.location
          const location = this.props.location || context.location;
          // computeMatch 404处理
          const match = computeMatch || matchPath(location.pathname, this.props);
          console.log(match);
          const props = {
            ...context,
            location,
            match,
          };

          // 1. 先匹配路径 2. children > component > render
          // 不match children 或者 null  children有可能是嵌套组件
          return (
            // 再做嵌套, 拿到最新的location, match  => 场景: 使用hooks时 拿到的最近的props
            <RouterContext.Provider value={props}>
              {this.returnComponent(match, children, props, component, render)}
            </RouterContext.Provider>
          )
        }}
      </RouterContext.Consumer>
    );
  }

  returnComponent (match, children, props, component, render) {
    return match
      ? children
        ? typeof children === 'function'
          ? children(props)
          : children
        : component
          ? React.createElement(component, props)
          : render
            ? render(props)
            : null
      : typeof children === 'function'
        ? children(props)
        : null;
  }
}

```

### Switch

```js
import React, { Component } from 'react'
import {RouterContext} from "./RouterContext";
import matchPath from "./matchPath";

export default class Switch extends Component {
  render() {
    return (
      <RouterContext.Consumer>
        {(context) => {
          // location的使用场景: https://react-router.docschina.org/web/example/modal-gallery
          const location = this.props.location || context.location;
          let element;
          let match = null;
          // 剩下404
          React.Children.forEach(this.props.children, (child) => {
            if (match === null && React.isValidElement(child)) {
              element = child;
              match = child.props.path
                ? matchPath(location.pathname, child.props)
                : context.match;
            }
          });
          // createElement(type, props)
          // cloneElement(element, otherProps)
          return match
            ? React.cloneElement(element, {
                location,
                computeMatch: match,
              })
            : null;
        }}
      </RouterContext.Consumer>
    )
     
  }
}

```

### matchPath

```js
import pathToRegexp from "path-to-regexp";

const cache = {};
const cacheLimit = 10000;
let cacheCount = 0;

function compilePath(path, options) {
  const cacheKey = `${options.end}${options.strict}${options.sensitive}`;
  const pathCache = cache[cacheKey] || (cache[cacheKey] = {});

  if (pathCache[path]) return pathCache[path];

  const keys = [];
  const regexp = pathToRegexp(path, keys, options);
  const result = { regexp, keys };

  if (cacheCount < cacheLimit) {
    pathCache[path] = result;
    cacheCount++;
  }

  return result;
}

/**
 * Public API for matching a URL pathname to a path.
 */
function matchPath(pathname, options = {}) {
  if (typeof options === "string" || Array.isArray(options)) {
    options = { path: options };
  }

  const { path, exact = false, strict = false, sensitive = false } = options;

  const paths = [].concat(path);

  return paths.reduce((matched, path) => {
    if (!path && path !== "") return null;
    if (matched) return matched;

    const { regexp, keys } = compilePath(path, {
      end: exact,
      strict,
      sensitive
    });
    const match = regexp.exec(pathname);

    if (!match) return null;

    const [url, ...values] = match;
    const isExact = pathname === url;

    if (exact && !isExact) return null;

    return {
      path, // the path used to match
      url: path === "/" && url === "" ? "/" : url, // the matched portion of the URL
      isExact, // whether or not we matched exactly
      params: keys.reduce((memo, key, index) => {
        memo[key.name] = values[index];
        return memo;
      }, {})
    };
  }, null);
}

export default matchPath;

```

### Redirect

```js
import React, { Component } from 'react'
import { RouterContext } from "./RouterContext";

export default class Redirect extends Component {
  static contextType = RouterContext;
  render() {
    const { history } = this.context;
    const { to } = this.props;
     return <LifeCycle onMount={() => history.replace(to)} />;
  }
}

class LifeCycle extends Component {
  componentDidMount() {
    if (this.props.onMount) {
      this.props.onMount();
    }
  }
  render() {
    return null;
  }
}
```



### Link

```js
import React, { Component } from 'react';
import { RouterContext } from "./RouterContext";
class Link extends Component {
  handLink = (e, history) => {
    e.preventDefault();
    history.push(this.props.to);
  };
  render() {
    return (
      <RouterContext.Consumer>
        {(context) => {
          return (
            <a
              href={this.props.to}
              onClick={(e) => {
                this.handLink(e, context.history);
              }}
            >
              {this.props.children}
            </a>
          );
        }}
      </RouterContext.Consumer>
    );
  }
}

export default Link;

```

### RouterContext

```js
import React from 'react'
export const RouterContext = React.createContext()

```

### hooks

```js
import { useContext } from "react";
import { RouterContext } from "./RouterContext";

export function useParams() {
  const context = useContext(RouterContext)
  return context.match ? context.match.params : {};
}
export function useHistory() {
  const context = useContext(RouterContext)
  return context.history;
}
export function useLocation() {
  const context = useContext(RouterContext)
  return context.location;
}
```

# React原理解析

### 虚拟Dom

-  真实Dom的相对映射通过js对象保存
- 一种编程概念
- 代表用户界面的对象
-  **what？**⽤ JavaScript 对象表示 DOM 信息和结构，当状态变更的时候，重新渲染这个 JavaScript 的对象结构。这个 JavaScript 对象称为`virtual dom`
- **why？** 真实Dom操作很慢, 轻微操作可能会导致页面重新排版, 非常损耗性能, 相对于Dom对象, js对象处理更快, 更简单. 通过diff算法对比新旧`virtual dom`的差异, 可以批量, 最小化的执行dom操作, 从而提高性能
- **where？**react中⽤JSX语法描述视图，通过babel-loader转译 后它们变为React.createElement(...)形式，该函数将⽣成 vdom来描述真实dom。将来如果状态变化，vdom将作出相 应变化，再通过diff算法对⽐新⽼vdom区别从⽽做出最终 dom操作。
  - ![image-20211116110739401](https://images.yewq.top/image-20211116110739401.png)
- **how?**

![image-20211116105919168](https://images.yewq.top/image-20211116105919168.png)



### JSX

[尝试](https://zh-hans.reactjs.org/)

- 什么是JSX
  - **语法糖** React 使⽤ JSX 来替代常规的 JavaScript。 JSX 是⼀个看起来很像 XML 的 JavaScript 语法扩展。
- 为什么需要JSX
  - 开发效率：使⽤ JSX 编写模板简单快速。 
  - 执⾏效率：JSX编译为 JavaScript 代码后进⾏了优化， 执⾏更快。
  - 类型安全：在编译过程中就能发现错误。
- 原理:
  - babel-loader会预编译JSX, 相关节点编译为 React.createElement(...)
- 与vue的异同： 
  - react中虚拟dom+jsx的设计⼀开始就有，vue则是演进 过程中才出现的
  -  jsx本来就是js扩展，转义过程简单直接的多；vue把 template编译为render函数的过程需要复杂的编译器 转换字符串-ast-js函数字符串

### 核心api

- React.createElement：创建虚拟DOM 

- React.Component：实现⾃定义组件 

- ReactDOM.render：渲染真实DOM



 ```js
 ReactDOM.render(element, container, [callback])
 ```

当⾸次调⽤时，容器节点⾥的所有 DOM 元素都会被替换， 后续的调⽤则会使⽤ React 的 DOM 差分算法（DOM diffing algorithm）进⾏⾼效的更新。

### 实现核心api

#### React.createElement

将传入的节点转换为 *vnode*

注意节点类型： 

- ⽂本节点 
- HTML标签节点 
- function组件 
- class组件 
- fragment 
- 其他如portal等节点

![image-20211116112844774](https://images.yewq.top/image-20211116112844774.png)

入口index.js

> index.js中从未使⽤React类或者其任何接⼝，为何需 要导⼊它？ JSX编译后实际调⽤React.createElement⽅法，所以 只要出现JSX的⽂件中都需要导⼊React
>
> createElement被调⽤时会传⼊标签类型type，标签属 性props及若⼲⼦元素children

```react
// import React from "react";
// import ReactDOM from "react-dom";
import React from "./kreact";
import ReactDOM from "./kreact/ReactDOM";
import Component from "./kreact/Component";
import "./index.css";

function FunctionComponent({name}) {
  return (
    <div className="border function">
      hello, {name}
      <button onClick={() => console.log("omg")}>click</button>
    </div>
  );
}

function Fragment(props) {
  return <></>;
}

class ClassComponent extends Component {
  render() {
    const {name} = this.props;
    return <div className="border function">hello, {name}</div>;
  }
}
// jsx -> 通过babel转换成 -> React.createElement
const jsx = (
  <div className="border">
    <p>这是一个文本</p>
    <a href="https://kaikeba.com/">开课吧</a>
    <div className="border">
      <h5>hello</h5>
    </div>
    <FunctionComponent name="function" />
    <ClassComponent name="class" />
    <Fragment>
      <h5>文本1</h5>
      <h5>文本2</h5>
    </Fragment>

    {[1, 2, 3].map(item => {
      return (
        <div className="border" key={item}>
          <p>{item}</p>
          <p>{item}</p>
        </div>
      );
    })}
  </div>
);

// element， container
// vnode-> Dom , 把Dom渲染更新到container
ReactDOM.render(jsx, document.getElementById("root"));

// !节点类型
// 文本节点
// html标签节点
// class componet
// function component
// fragment
// 数组遍历

// jsx=>createElement(生成element，就是我们需要的虚拟dom)=>render(vnode->node, 再把node渲染到container)
// vnode->node的流程注意下节点的区分，不同节点处理方式不同

```



createElement

```js
//! vnode 就代表虚拟dom节点
//! node代表真实dom节点

// 接收type, props, children， 返回一个vnode
function createElement(type, props, ...children) {
  // console.log("createElement", arguments); //sy-log
  if (props) {  // 空标签 type: undefined, props: null
    delete props.__source;
    delete props.__self;
  }
  const config = {};
  if (type && type.defaultProps) {
    const defaultProps = type.defaultProps;
    for (let propName in defaultProps) {
      if (config[propName] === undefined) {
        config[propName] = defaultProps[propName];
      }
    }
  }

  return {
    type: type,
    props: {
      ...config,
      ...props,
      children: children.map((child) =>
        typeof child === 'object' ? child : createTextNode(child)
      ),
    },
  };
}

function createTextNode(text) {
  return {
    type: "TEXT",
    props: {
      children: [],
      nodeValue: text
    }
  };
}

const KReact = {
  createElement
}

export default KReact;

```

#### Component

```js
export default class Component {
  static isReactComponent = {};
  constructor(props) {
    this.props = props;
  }
  // render() {
  //   return "ooo";
  // }
}

// export default function Component(props) {
//   this.props = props;

// }

// Component.prototype.isReactComponent = {};

```

#### render

```js
//! vnode 就代表虚拟dom节点
/* 
  {type: 'xxx', props: {xxx}}
*/

function render(vnode, container) {
  console.log('vnode', vnode); //sy-log
  // vnode->node
  const node = createNode(vnode);
  // 把node更新到container
  container.appendChild(node);
}

// 根据vnode，创建一个node
function createNode(vnode) {
  const { type, props } = vnode;
  console.log(vnode);
  let node;
  if (type === 'TEXT') {
    node = document.createTextNode('');
  } else if (typeof type === 'function' && type.isReactComponent) {
    // 判断是否class
    node = returnClassComponent(vnode);
  } else if (typeof type === 'function') {
    node = returnFunctionComponent(vnode);
  } else if (type) {
    node = document.createElement(type);
  } else {
    // 空标签
    node = document.createDocumentFragment();
  }
  updateNode(node, props);
  reconcilerChildren(props.children, node);
  return node;
}

// function组件
function returnFunctionComponent(vnode) {
  const { type, props } = vnode;
  const vvnode = type(props);
  return createNode(vvnode)
}

// class组件
function returnClassComponent(vnode) {
  const { type, props } = vnode;
  const com = new type(props);
  const vvnode = com.render();
  return createNode(vvnode);
}

// 拆解children 添加到父级
function reconcilerChildren(children, node) {
  for (let i = 0; i < children.length; i++) {
    // console.log("children", children[i]); //sy-log
    const child = children[i];
    // 遍历 创建元素
    // 判读children[i]类型
    if (Array.isArray(child)) { // map遍历的情况
      for (let j = 0; j < child.length; j++) {
        render(child[j], node);
      }
    } else {
      render(children[i], node);
    }
  }
}

// 更新节点上属性，如className、nodeValue等
function updateNode(node, nextVal) {
  Object.keys(nextVal)
    .filter((k) => k !== 'children')
    .forEach((k) => {
      if (k.slice(0, 2) === "on") {
        // 以on开头，就认为是一个事件，源码处理复杂一些，
        let eventName = k.slice(2).toLocaleLowerCase();
        node.addEventListener(eventName, nextVal[k]);
      } else {
        node[k] = nextVal[k];
      }
    });
}

export default {
  render,
};

```

### 核心api总结

1. webpack+babel编译时，替换JSX为 React.createElement(type,props,...children) 
2.  所有React.createElement()执⾏结束后得到⼀个JS对象即 vdom，它能够完整描述dom结构
3.  ReactDOM.render(vdom, container)可以将vdom转换为 dom并追加到container中
4.  实际上，转换过程需要经过⼀个diff过程，⽐对出实际更 新补丁操作dom

### [reconciliation协调](https://zh-hans.reactjs.org/docs/reconciliation.html)

#### 设计动机

在某一时间节点调用 React 的 `render()` 方法，会创建一棵由 React 元素组成的树。在下一次 state 或 props 更新时，相同的 `render()` 方法会返回一棵不同的树。React 需要基于这两棵树之间的差别来判断如何高效的更新 UI，以保证当前 UI 与最新的树保持同步。

此算法有一些通用的解决方案，即生成将一棵树转换成另一棵树的最小操作次数。然而，即使使用[最优的算法](http://grfia.dlsi.ua.es/ml/algorithms/references/editsurvey_bille.pdf)，该算法的复杂程度仍为 O(n 3 )，其中 n 是树中元素的数量。

如果在 React 中使用该算法，那么展示 1000 个元素则需要 10 亿次的比较。这个开销实在是太过高昂。于是 React 在以下两个假设的基础之上提出了一套 O(n) 的**启发式算法**：

1. **两个不同类型的元素会产生出不同的树**；
2. **开发者可以通过设置 `key` 属性，来告知渲染哪些子元素在不同的渲染下可以保存不变**；

在实践中，我们发现以上假设在几乎所有实用的场景下都成立。

#### Diffing 算法

diff 策略 

1. **同级⽐较，Web UI 中 DOM 节点跨层级的移动操作 特别少，可以忽略不计**。 
2. **拥有不同类型的两个组件将会⽣成不同的树形结构**。 例如：div->p, CompA->CompB 
3. **开发者可以通过 key prop 来暗示哪些⼦元素在不同 的渲染下能保持稳定**；

⽐对两个虚拟dom时会有三种操作：删除、替换和更新 

vnode是现在的虚拟dom，newVnode是新虚拟dom。

- 删除：newVnode不存在时 
- 替换：vnode和newVnode类型不同或key不同时 
- 更新：有相同类型和key但vnode和newVnode不同时 

### fiber

为什么需要fiber

 React Conf 2017 Fiber介绍视频 

React的killer feature： virtual dom 

1. 为什么需要fiber 
   - 对于⼤型项⽬，组件树会很⼤，这个时候递归遍历的 成本就会很⾼，会造成主线程被持续占⽤，结果就是 主线程上的布局、动画等周期性任务就⽆法⽴即得到 处理，造成视觉上的卡顿，影响⽤户体验。
2.  任务分解的意义 
   - 解决上⾯的问题
3. 增量渲染（把渲染任务拆分成块，匀到多帧） 
4. 更新时能够暂停，终⽌，复⽤渲染任务
5. 给不同类型的更新赋予优先级 
6. 并发⽅⾯新的基础能⼒ 
7. 更流畅

fiber是指组件上将要完成或者已经完成的任务，每个组 件可以⼀个或者多个。

- 第一阶段: 找出更新列表, 可中断.
- 第二阶段: 提交到Dom, 状态不可中断, requestIdleCallback()



![image-20211117163306087](https://images.yewq.top/image-20211117163306087.png)

从root出发 先child 后sibling , 没有child , sibling 后 return返回父级.

![image-20211117164603294](https://images.yewq.top/image-20211117164603294.png)

![image-20211117185403071](https://images.yewq.top/image-20211117185403071.png)

FiberNode结构, 从而更新时能够暂停，终⽌

![image-20211118110753382](https://images.yewq.top/image-20211118110753382.png)

![image-20211117122210790](https://images.yewq.top/image-20211117122210790.png)

- child: 第一个子元素
- sibling: 后面的第一个兄弟元素
- return: 父级元素

#### requestIdleCallback

> window.requestIdleCallback(callback, [options]) 

插入一个函数，这个函数将**在浏览器空闲时期被调用**。这使开发者能够在主事件循环上执行后台和低优先级工作，而不会影响延迟关键事件，如动画和输入响应。函数一般会按先进先调用的顺序执行，然而，如果回调函数指定了执行超时时间`timeout`，则有可能为了在超时前执行函数而打乱执行顺序。

- callback接受IdleDeadline参数  
  - [`IdleDeadline.timeRemaining()`](https://developer.mozilla.org/zh-CN/docs/Web/API/IdleDeadline/timeRemaining) 用来表示当前闲置周期的预估剩余毫秒数
  - [`IdleDeadline.didTimeout` (en-US)](https://developer.mozilla.org/en-US/docs/Web/API/IdleDeadline/didTimeout) **只读** 一个Boolean类型 为true代表指定了超时时间. 且callback正在执行
- options
  - timeout 如果指定了timeout，并且有一个正值，而回调在timeout毫秒过后还没有被调用，那么回调任务将放入事件循环中排队，即使这样做有可能对性能产生负面影响。



#### 新增

```js

import { PLACEMENT }  from './CONST'
// 下一个任务单元 Fiber
let nextUnitOfWork = null;
// 工作中 work in progress Fiber
let workInProgressRoot = null;
// 当前root Fiber
let currentRoot = null;

function render(vnode, container) {
  workInProgressRoot = {
    node: container,
    props: {
      children: [vnode],
    },
    // 存储对比fiber
    base: currentRoot,
  };
  nextUnitOfWork = workInProgressRoot;
}

// 根据vnode，创建一个node
function createNode(vnode) {
  const {type, props} = vnode;
  let node;
  if (type === "TEXT") {
    node = document.createTextNode("");
  } else if (type) {
    node = document.createElement(type);
  }
  updateNode(node, props);
  return node;
}

// 构建fiber结构 children设定数组格式
function reconcilerChildren(workInProgressFiber, children) {
  // todo 新增, 更新, 删除
  
  // 记录上一个的fiber
  let prevFiber = null;
  // todo 比较之前fiber
  let oldFiber = workInProgressFiber.base && workInProgressFiber.base.child
  for (let i = 0; i < children.length; i++) {
    let child = children[i];
    // 新增
    let newFiber = {
      type: child.type, // 类型
      props: child.props, // 属性
      node: null, // dom
      base: null, // 旧fiber
      return: workInProgressFiber, // 上一层fiber
      effectTag: PLACEMENT,
    };

    // child
    if (i === 0) {
      workInProgressFiber.child = newFiber;
    } else {
      // 设置sibling
      prevFiber.sibling = newFiber;
    }
    prevFiber = newFiber;

    // oldFiber也下一个
    if (oldFiber) {
      oldFiber = oldFiber.sibling;
    }
  }
}

// 更新节点上属性，如className、nodeValue等
function updateNode(node, nextVal) {
  Object.keys(nextVal)
    .filter(k => k !== "children")
    .forEach(k => {
      if (k.slice(0, 2) === "on") {
        // 以on开头，就认为是一个事件，源码处理复杂一些，
        let eventName = k.slice(2).toLocaleLowerCase();
        node.addEventListener(eventName, nextVal[k]);
      } else {
        node[k] = nextVal[k];
      }
    });
}

// function组件，返回node
function updateFunctionComponent(fiber) {
  const { type, props } = fiber;
  const children = type(props);
  reconcilerChildren(fiber, [children])
}

function updateClassComponent(fiber) {
  const { type, props } = fiber;
  const cmp = new type(props); //实例化
  const children = cmp.render();
  reconcilerChildren(fiber, [children]);
}

// 原始标签. 构建fiber
function updateHostComponent(fiber) {
  if (!fiber.node) {
    fiber.node = createNode(fiber);
  }
  const { children } = fiber.props
  reconcilerChildren(fiber, children);
}

// 执行当前子任务 返回下一个任务
function performUnitOfWork(fiber) {
  const { type } = fiber;
  if (typeof type === 'function') {
    type.isReactComponent
      ? updateClassComponent(fiber)
      : updateFunctionComponent(fiber);
  } else {
    // 执行当前子任务
    updateHostComponent(fiber);
  }

  // 返回下一个任务 先child 后sibling , 没有child , sibling 后 return返回父级sibling.
  if (fiber.child) {
    return fiber.child;
  }

  // 去找兄弟元素 同时向上去寻找
  let nextFiber = fiber;
  while (nextFiber) {
    if (nextFiber.sibling) {
      return nextFiber.sibling;
    }
    nextFiber = nextFiber.return;
  }
  // 去找兄弟元素
  // if (fiber.sibling) {
  //   return fiber.sibling;
  // }

  // 去找父级兄弟元素
  // if (fiber.return.sibling) {
  //   return fiber.return.sibling;
  // }
}

function workLoop(IdleDeadline) {
  // 执行子任务 -> 如果下一个任务且有空闲时间 ... -> 没有子任务了 提交

  // 有子任务且有空闲时间
  while (nextUnitOfWork && IdleDeadline.timeRemaining() > 1) {
    nextUnitOfWork = performUnitOfWork(nextUnitOfWork);
  }

  // 没有子任务了 && 根节点存在
  if (!nextUnitOfWork && workInProgressRoot) {
    // 提交
    commitRoot()
  }
  requestIdleCallback(workLoop);
}

function commitRoot() {
  // 提交fiber
  commitWorker(workInProgressRoot.child);
  currentRoot = workInProgressRoot;
  workInProgressRoot = null;
}

// 提交fiber
function commitWorker(fiber) {
  console.log(fiber);
  if (!fiber) return;

  // 找到上一层的node 渲染
  let parentFiber = fiber.return;
  while(!parentFiber.node) {
    parentFiber = parentFiber.return;
  }
  if (fiber.node && fiber.effectTag === PLACEMENT) {
    parentFiber.node.appendChild(fiber.node);
  }
  commitWorker(fiber.child)
  commitWorker(fiber.sibling)
}

requestIdleCallback(workLoop)

 /* 
  总结: 
    1. 创建 任务单元nextUnitOfWork 工作中的fiber workInProgressRoot 当前的fiber currentRoot
    2. 创建workLoop requestIdleCallback执行workLoop  执行子任务 -> 如果下一个任务且有空闲时间 ... -> 没有子任务了 提交
    3.  
 */


export default {
  render
};

```



#### 总结

1. 创建 下一个任务单元nextUnitOfWork 工作中的fiber workInProgressRoot 当前的fiber currentRoot

2. 创建workLoop requestIdleCallback执行workLoop  执行子任务 -> 如果下一个任务且有空闲时间
   1. 有下一个任务且有空闲时间执行子任务performUnitOfWork 返回下一个任务 逻辑: 先child 后sibling , 没有child , sibling 后 return返回父级sibling.
      1. 根据类型, 树, 构建fiber  
3. 提交Root, 刷新currentRoot --- commitRoot
   1. 提交fiber,  --- commitWorker
      1. 找到上一层的node 渲染, 渲染子, 兄弟

# [React技术揭秘](https://react.iamkasong.com/)

## React16架构

React16架构可以分为三层：

- Scheduler（调度器）—— 调度任务的优先级，高优任务优先进入**Reconciler**
- Reconciler（协调器）—— 负责找出变化的组件
- Renderer（渲染器）—— 负责将变化的组件渲染到页面上

### Scheduler（调度器）

既然我们以浏览器是否有剩余时间作为任务中断的标准，那么我们需要一种机制，当浏览器有剩余时间时通知我们。

其实部分浏览器已经实现了这个API，这就是[requestIdleCallback (opens new window)](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/requestIdleCallback)。但是由于以下因素，`React`放弃使用：

- 浏览器兼容性
- 触发频率不稳定，受很多因素影响。比如当我们的浏览器切换tab后，之前tab注册的`requestIdleCallback`触发的频率会变得很低

基于以上原因，`React`实现了功能更完备的`requestIdleCallback`polyfill，这就是**Scheduler**。除了在空闲时触发回调的功能外，**Scheduler**还提供了多种调度优先级供任务设置。

### Reconciler（协调器）

我们知道，在React15中**Reconciler**是递归处理虚拟DOM的。让我们看看[React16的Reconciler (opens new window)](https://github.com/facebook/react/blob/1fb18e22ae66fdb1dc127347e169e73948778e5a/packages/react-reconciler/src/ReactFiberWorkLoop.new.js#L1673)。

我们可以看见，更新工作从递归变成了可以中断的循环过程。每次循环都会调用`shouldYield`判断当前是否有剩余时间。

```js
/** @noinline */
function workLoopConcurrent() {
  // Perform work until Scheduler asks us to yield
  while (workInProgress !== null && !shouldYield()) {
    workInProgress = performUnitOfWork(workInProgress);
  }
}
```

那么React16是如何解决中断更新时DOM渲染不完全的问题呢？

在React16中，**Reconciler**与**Renderer**不再是交替工作。当**Scheduler**将任务交给**Reconciler**后，**Reconciler**会为变化的虚拟DOM打上代表增/删/更新的标记，类似这样：

```js
export const Placement = /*             */ 0b0000000000010;
export const Update = /*                */ 0b0000000000100;
export const PlacementAndUpdate = /*    */ 0b0000000000110;
export const Deletion = /*              */ 0b0000000001000;
```

> 全部的标记见[这里(opens new window)](https://github.com/facebook/react/blob/1fb18e22ae66fdb1dc127347e169e73948778e5a/packages/react-reconciler/src/ReactSideEffectTags.js)

整个**Scheduler**与**Reconciler**的工作都在内存中进行。只有当所有组件都完成**Reconciler**的工作，才会统一交给**Renderer**。

### Renderer（渲染器）

**Renderer**根据**Reconciler**为虚拟DOM打的标记，同步执行对应的DOM操作。

在React16架构中整个更新流程为：

![更新流程](https://images.yewq.top/process.png)

其中红框中的步骤随时可能由于以下原因被中断：

- 有其他更高优任务需要先更新
- 当前帧没有剩余时间

由于红框中的工作都在内存中进行，不会更新页面上的DOM，所以即使反复中断，用户也不会看见更新不完全的DOM（即上一节演示的情况）。



`React Fiber`可以理解为：

```
React`内部实现的一套状态更新机制。支持任务不同`优先级`，可中断与恢复，并且恢复后可以复用之前的`中间状态
```

### 总结

通过本章的学习，我们了解了`React`的`Scheduler-Reconciler-Renderer`架构体系，在结束本章前，我想介绍几个源码内的术语：

- `Reconciler`工作的阶段被称为`render`阶段。因为在该阶段会调用组件的`render`方法。
- `Renderer`工作的阶段被称为`commit`阶段。就像你完成一个需求的编码后执行`git commit`提交代码。`commit`阶段会把`render`阶段提交的信息渲染在页面上。
- `render`与`commit`阶段统称为`work`，即`React`在工作中。相对应的，如果任务正在`Scheduler`内调度，就不属于`work`。

在`架构篇`我们会分别讲解`Reconciler`和`Renderer`的工作流程，所以章节名分别为`render阶段`和`commit阶段`。

## render阶段

### 流程概览

本章我们会讲解`Fiber节点`是如何被创建并构建`Fiber树`的。

`render阶段`开始于`performSyncWorkOnRoot`或`performConcurrentWorkOnRoot`方法的调用。这取决于本次更新是同步更新还是异步更新。

我们现在还不需要学习这两个方法，只需要知道在这两个方法中会调用如下两个方法：

```js
// performSyncWorkOnRoot会调用该方法
function workLoopSync() {
  while (workInProgress !== null) {
    performUnitOfWork(workInProgress);
  }
}

// performConcurrentWorkOnRoot会调用该方法
function workLoopConcurrent() {
  while (workInProgress !== null && !shouldYield()) {
    performUnitOfWork(workInProgress);
  }
}
```

可以看到，他们唯一的区别是是否调用`shouldYield`。如果当前浏览器帧没有剩余时间，`shouldYield`会中止循环，直到浏览器有空闲时间后再继续遍历。

`workInProgress`代表当前已创建的`workInProgress fiber`。

`performUnitOfWork`方法会创建下一个`Fiber节点`并赋值给`workInProgress`，并将`workInProgress`与已创建的`Fiber节点`连接起来构成`Fiber树`。

> 你可以从[这里 (opens new window)](https://github.com/facebook/react/blob/970fa122d8188bafa600e9b5214833487fbf1092/packages/react-reconciler/src/ReactFiberWorkLoop.new.js#L1599)看到`workLoopConcurrent`的源码

我们知道`Fiber Reconciler`是从`Stack Reconciler`重构而来，通过遍历的方式实现可中断的递归，所以`performUnitOfWork`的工作可以分为两部分：“递”和“归”。

“递”阶段

首先从`rootFiber`开始向下深度优先遍历。为遍历到的每个`Fiber节点`调用[beginWork方法 (opens new window)](https://github.com/facebook/react/blob/970fa122d8188bafa600e9b5214833487fbf1092/packages/react-reconciler/src/ReactFiberBeginWork.new.js#L3058)。

该方法会根据传入的`Fiber节点`创建`子Fiber节点`，并将这两个`Fiber节点`连接起来。

当遍历到叶子节点（即没有子组件的组件）时就会进入“归”阶段。

“归”阶段

在“归”阶段会调用[completeWork (opens new window)](https://github.com/facebook/react/blob/970fa122d8188bafa600e9b5214833487fbf1092/packages/react-reconciler/src/ReactFiberCompleteWork.new.js#L652)处理`Fiber节点`。

当某个`Fiber节点`执行完`completeWork`，如果其存在`兄弟Fiber节点`（即`fiber.sibling !== null`），会进入其`兄弟Fiber`的“递”阶段。

如果不存在`兄弟Fiber`，会进入`父级Fiber`的“归”阶段。

“递”和“归”阶段会交错执行直到“归”到`rootFiber`。至此，`render阶段`的工作就结束了。

以上一节的例子举例：

```js
function App() {
  return (
    <div>
      i am
      <span>KaSong</span>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById("root"));
```

对应的`Fiber树`结构： ![Fiber架构](https://images.yewq.top/uPic/fiber.png)

`render阶段`会依次执行：

```sh
1. rootFiber beginWork
2. App Fiber beginWork
3. div Fiber beginWork
4. "i am" Fiber beginWork
5. "i am" Fiber completeWork
6. span Fiber beginWork
7. span Fiber completeWork
8. div Fiber completeWork
9. App Fiber completeWork
10. rootFiber completeWork注意
```

>  之所以没有 “KaSong” Fiber 的 beginWork/completeWork，是因为作为一种性能优化手段，针对只有单一文本子节点的`Fiber`，`React`会特殊处理

### beginWork

beginWork

- mount 除`fiberRootNode`以外，`current === null`。会根据`fiber.tag`不同，创建不同类型的`子Fiber节点`
  - reconcileChildren
    - mountChildFibers
- update  如果`current`存在，在满足一定条件时可以复用`current`节点，这样就能克隆`current.child`作为`workInProgress.child`，而不需要新建`workInProgress.child`
  - bailoutOnAlreadyFinishedWork 可以复用
  - reconcileChildFibers  生成的`Fiber节点`带上`effectTag`属性

> 值得一提的是，mountChildFibers与reconcileChildFibers这两个方法的逻辑基本一致。唯一的区别是：reconcileChildFibers会为生成的Fiber节点带上effectTag属性，而mountChildFibers不会。 那么首屏渲染如何完成呢？ 

> 答案十分巧妙, 假设mountChildFibers也会赋值effectTag，那么可以预见mount时整棵Fiber树所有节点都会有Placement effectTag。那么commit阶段在执行DOM操作时每个节点都会执行一次插入操作，这样大量的DOM操作是极低效的。 为了解决这个问题，在mount时只有rootFiber会赋值Placement effectTag，在commit阶段只会执行一次插入操作。

![beginWorkæµç¨å¾](https://images.yewq.top/uPic/beginWork.png)

### completeWork

`completeWork`也是针对不同`fiber.tag`调用不同的处理逻辑。

处理HostComponent例子

completeWork

- mount
  - 为`Fiber节点`生成对应的`DOM节点`
  - 将子孙`DOM节点`插入刚生成的`DOM节点`中
    - appendAllChildren

  - 与`update`逻辑中的`updateHostComponent`类似的处理`props`的过程

- update
  - 处理`props`


![completeWork流程图](https://images.yewq.top/uPic/completeWork.png)

# 面试相关

## **1. React中key是什么，有什么用处**

- 用来判断与新旧节点key type 是否相同 可不可以复用

- 当diff数组时, key当生成map类型的key使用. 通过key获取对应的fiber




DebugReact-master\src\react\packages\react-reconciler\src\ReactChildFiber.js\@reconcileSingleElement


## 7. **函数组件与class组件如何选择**


![image-20220120191346663](https://images.yewq.top/image-20220120191346663.png)

1. hook之前函数组件是什么样子的

- 无状态, 无副作用, 单纯展示组件

2. class组件有什么弊端. 为什么引入hook

     - 组件之间复用难 (使用render props 和 高阶组件, providers，consumers ,难以理解比较麻烦, providers，consumers 高阶组件，render props 等其他抽象层组成的组件容易会形成“嵌套地狱”) 

​     ==> 使用 Hook 从组件中提取状态逻辑，使得这些逻辑可以单独测试并复用, Hook 使你在无需修改组件结构的情况下复用状态逻辑。

- 复杂组件难以理解 (生命周期里包含很多其他逻辑, 如设置事件监听, 获取数据等, 完全不相关的代码却在同一个方法中组合在一起, 容易出问题) 

​     ==> Hook 将组件中相互关联的部分拆分成更小的函数,(比如设置订阅或请求数据)

- 难以理解class, (绑定事件处理器)

​     ==> Hook 使你在非 class 的情况下可以使用更多的 React 特性

​    

3. 引入hook后, 函数组件的变化有哪些?

- 函数组件可以存储状态, 改变状态(useState, useReducer), 执行副作用(useEffect), 还可以复用状态逻辑(自定义hook)

   4. 函数组件, class组件如何选择?

- 出现以上缺点合适使用函数组件, (较为复杂, 状态可复用等)

## 8.性能优化方案

1. shouldComponentUpdate, PureComponent, React.memo

2. 数据缓存.
   1.  值: useMemo, 函数: useCallback
   2. 函数, 对象不用内联形式
   3. Router中内联函数渲染时使用render/children
3. 避免滥用context.props
4. 懒加载
5. 减少http请求

总结: **减少计算, 渲染和请求**

# [合成事件](https://juejin.cn/post/6844903988794671117)

## 总结

- 冒泡document时才执行.
- 因为window上事件的冒泡顺序位于document之后，所以react 事件中的e.stopPropagation阻止了react在document上的代理事件的冒泡，进而不会触发window上的事件。

**绑定的onClick触发的时候 是合成事件触发，而合成事件是会晚原生事件**

![image-20210721193955254](https://images.yewq.top/image-20210721193955254.png)

# [virtual dom](https://segmentfault.com/a/1190000019994425)

局部操作Dom树进行渲染更新.将影响降到最低.

1. 用`Javascript`对象结构描述Dom树结构,然后用它来构建真正的Dom树插入文档
2. 当状态发生改变之后,重新构造新的`Javascript`对象结构和旧的作对比得出差异
3. 针对差异之处进行重新构建更新视图

# [setState过程](https://juejin.cn/post/6844903781813993486)

1. setState异步?

   setState并没有直接操作去渲染，⽽是执⾏了⼀个异步 的updater队列 我们使⽤⼀个类来专⻔管理 

2. 为什么 React 不同步地更新 this.state？

    在开始重新渲染之前，React 会有意地进⾏“等待” ， 直到所有在组件的事件处理函数内调⽤的 setState() 完成之后。这样可以通过避免不必要的 重新渲染来提升性能。

3.  为什么setState是异步的？ 

    这⾥的异步指的是多个state会合成到⼀起进⾏批量更 新。

4. 为什么 setState只有在React合成事件和⽣命周期函 数中是异步的，在原⽣事件和setTimeout、 setInterval、addEventListener中都是同步的？

    原⽣事件绑定不会通过合成事件的⽅式处理，⾃然也不 会进⼊更新事务的处理流程。 



setState总结： 1. setState()执⾏时，updater会将partialState添加到 它维护的pendingStates中，等到 2. updateComponent负责合并pendingStates中所有 state变成⼀个state 3. forceUpdate执⾏新旧vdom⽐对-diff以及实际更新操 作



源码解析: 

原生事件中 executionContext 等于0 立即 更新了flushSyncCallbackQueue(), setTimeout延迟执行. 执行时executionContext已变成0.

合成事件中 setState执行 加入更新队列中. UpdateQueue. 最后才commit


## setState是同步还是异步的，为什么有的时候不能立即拿到更新结果而有的时候可以?

钩子函数和React合成事件中的`setState` 是异步的,  只是合成事件和钩⼦ 函数的调⽤顺序在更新之前，导致在合成事件和钩⼦函数中没法⽴⻢拿到更新后的值，形成了所谓的“异步”，当然 可以通过第⼆个参数 setState(partialState, callback) 中的 callback 拿到更新后的结果。

```react
  componentDidMount() {
    console.log('SetState调用setState');
    this.setState({
      index: this.state.index + 1
    })
    console.log('state', this.state.index);
    
    console.log('SetState调用setState');
    this.setState({
      index: this.state.index + 1
    })
    console.log('state', this.state.index);
  }
```

![image](https://images.yewq.top/169197bbda942d55)

- 1.调用`setState`不会立即更新
- 2.**所有组件使用的是同一套更新机制，当所有组件`didmount`后，父组件`didmount`，然后执行更新**
- 3.更新时会把每个组件的更新合并，每个组件只会触发一次更新的生命周期。

在`setTimeout`中调用`setState`（例子和在浏览器原生事件以及接口回调中执行效果相同）

```react
componentDidMount() {
    
    setTimeout(() => {
        // 父组件componentDidMount结束后执行
      console.log('调用setState');
      this.setState({
        index: this.state.index + 1
      })
      console.log('state', this.state.index);
      console.log('调用setState');
      this.setState({
        index: this.state.index + 1
      })
      console.log('state', this.state.index);
    }, 0);
  }
```

![image](https://images.yewq.top/169197bbda86af04)



- **在父组件`didmount`后执行**
- 调用`setState`同步更新
- 在生命周期，根据JS的异步机制，会将异步函数先暂存，等所有同步代码执行完毕后在执行，这时上一次更新过程已经执行完毕, 这时再调用`setState`即可立即执行更新，拿到更新结果。

### 总结

- setState在生命周期函数和合成事件中是异步的, 在异步函数和原生事件中(setTimeout, 接口回调)是同步的.

- 当所有组件`didmount`后，父组件`didmount`，然后执行更新(update钩子)

## 为什么有时连续两次`setState`只有一次生效？

```react
  componentDidMount() {
    this.setState({ index: this.state.index + 1 }, () => {
      console.log(this.state.index);
    })
    this.setState({ index: this.state.index + 1 }, () => {
      console.log(this.state.index);
    })
  }
  
  componentDidMount() {
    this.setState((preState) => ({ index: preState.index + 1 }), () => {
      console.log(this.state.index);
    })
    this.setState(preState => ({ index: preState.index + 1 }), () => {
      console.log(this.state.index);
    })
  }
```

执行结果：

```
1
1

2
2
```

- **直接传递对象的this.state.index没有立即更新**
- **使用函数传递`state`不会被合并, 参数拿到的是最新的state**


# [fiber](https://zhuanlan.zhihu.com/p/57346388)





# [高阶组件](https://zhuanlan.zhihu.com/p/24776678)

1. Props Proxy： HOC 对传给 WrappedComponent W 的 porps 进行操作，
2. Inheritance Inversion： HOC 继承 WrappedComponent W。



**使用 Props Proxy 可以做什么？**

- 操作 props
- 通过 Refs 访问到组件实例
- 提取 state
- 用其他元素包裹 *WrappedComponent*

```react
function ppHOC(WrappedComponent) {
  return class PP extends React.Component {
    render() {
      const newProps = {
        user: currentLoggedInUser
      }
      return <WrappedComponent {...this.props} {...newProps}/>
    }
  }
}
```



Inheritance Inversion (II) 的最简实现：

```text
function iiHOC(WrappedComponent) {
  return class Enhancer extends WrappedComponent {
    render() {
      return super.render()
    }
  }
}
```

你可以看到，返回的 HOC 类（Enhancer）**继承**了 *WrappedComponent*。之所以被称为 Inheritance Inversion 是因为 *WrappedComponent* 被 *Enhancer* 继承了，而不是 *WrappedComponent* 继承了 *Enhancer*。在这种方式中，它们的关系看上去被**反转（inverse）**了。

Inheritance Inversion 允许 HOC 通过 *this* 访问到 *WrappedComponent*，意味着**它可以访问到 state、props、组件生命周期方法和 render 方法**。

这很重要，意味着 **Inheritance Inversion 的高阶组件不一定会解析完整子树**

Inheritance Inversion 的高阶组件不一定会解析完整子树

这在学习渲染劫持（Render Highjacking）时非常重要。

**你可以用 Inheritance Inversion 做什么？**

- 渲染劫持（Render Highjacking）
- 操作 state

# 错误拦截

```js
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch(error, info) {
    // Display fallback UI
    this.setState({ hasError: true });
    // You can also log the error to an error reporting service
    logErrorToMyService(error, info);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <h1>Something went wrong.</h1>;
    }
    return this.props.children;
  }
}
```

```react
<ErrorBoundary>
  <MyWidget />
</ErrorBoundary>
```

# [性能优化](https://github.com/brickspert/blog/issues/36)

## 性能改进

如果所有的性能问题都像上面这么简单就好了。某个点耗时极长，找到它并改进之，皆大欢喜。但在 React 项目中，最容易出现的问题是组件太多，每个组件执行 1ms，一百个组件就执行了 100ms，怎么优化？没有任何一个突出的点可以攻克，我们也不可能把一百个组件都优化成 0.01 ms。

```
class App extend React.Component{
    constructor(props){
    super(props);
    this.state={
      count: 0
    }
  }
  render(){
    return (
      <div>
        <A />
        <B />
        <C />
        <D />
        <Button onClick={()=>{ this.setState({count: 1}) }}>click</Button>
      </div>
    )
  }
}
```



就像上面这个组件一样，当我们点击 Button 更新 state 时，A/B/C/D 四个组件均会执行一次 render 计算，这些计算完全是无用的。当我们组件够多时，会逐渐成为性能瓶颈！我们目标是**减少不必要的 render。**

### PureComponent/ShouldComponentUpdate

说到避免 Render，当然第一时间想到的就是 ShouldComponentUpdate 这个生命周期，该生命周期通过判断 props 及 state 是否变化来手动控制是否需要执行 render。当然如果使用 PureComponent，组件会自动处理 ShouldComponentUpdate。

使用 PureComponent/ShouldComponentUpdate 时，需要注意几点：

1. PureComponent 会对 props 与 state 做**浅比较，\**所以一定要保证 props 与 state 中的数据是 immutable 的\**。**
2. 如果你的数据不是 immutable 的，或许你可以自己手动通过 ShouldComponentUpdate 来进行深比较。当然深比较的性能一般都不好，不到万不得已，最好不要这样搞。

### React.memo

React.memo 与 PureComponent 一样，但它是为函数组件服务的。React.memo 会对 props 进行**浅比较**，如果一致，则不会再执行了。

```
const App = React.memo(()=>{
  return <div></div>
});
```



当然，如果你的数据不是 immutable 的，你可以通过 React.memo 的第二个参数来手动进行深比较，同样极其不推荐。

React.memo 对 props 的变化做了优化，避免了无用的 render。那 state 要怎么控制呢？

```
const [state, setState] = useState(0);
```



React 函数组件的 useState，其 setState 会自动做浅比较，也就是如果你在上面例子中调用了 `setState(0)` ，函数组件会忽略这次更新，并不会执行 render 的。一般在使用的时候要注意这一点，经常有同学掉进这个坑里面。

### 善用 React.useMemo

React.useMemo 是 React 内置 Hooks 之一，主要为了解决函数组件在频繁 render 时，无差别频繁触发无用的昂贵计算 ，一般会作为性能优化的手段之一。

```
const App = (props)=>{
  const [boolean, setBoolean] = useState(false);
  const [start, setStart] = useState(0);
  
  // 这是一个非常耗时的计算
  const result = computeExpensiveFunc(start);
}
```



在上面例子中， `computeExpensiveFunc` 是一个非常耗时的计算，但是当我们触发 `setBoolean` 时，组件会重新渲染， `computeExpensiveFunc` 会执行一次。这次执行是毫无意义的，因为 `computeExpensiveFunc` 的结果只与 `start` 有关系。

React.useMemo 就是为了解决这个问题诞生的，它可以指定只有当 `start` 变化时，才允许重新计算新的 `result` 。

```
const result = useMemo(()=>computeExpensiveFunc(start), [start]);
```



我建议 React.useMemo 要多用，能用就用，避免性能浪费。

### 合理使用 React.useCallback

在函数组件中，React.useCallback 也是性能优化的手段之一。

```
const OtherComponent = React.memo(()=>{
    ...
});
  
const App = (props)=>{
  const [boolan, setBoolean] = useState(false);
  const [value, setValue] = useState(0);
 
  const onChange = (v)=>{
      axios.post(`/api?v=${v}&state=${state}`)
  }
 
  return (
    <div>
        {/* OtherComponent 是一个非常昂贵的组件 */}
        <OtherComponent onChange={onChange}/>
    </div>
  )
}
```



在上面的例子中， `OtherComponent` 是一个非常昂贵的组件，我们要避免无用的 render。虽然 `OtherComponent` 已经用 React.memo 包裹起来了，但在父组件每次触发 `setBoolean` 时， `OtherComponent` 仍会频繁 render。

因为父级组件 `onChange` 函数在每一次 render 时，都是新生成的，导致子组件浅比较失效。通过 React.useCallback，我们可以让 onChange 只有在 state 变化时，才重新生成。

```
const onChange = React.useCallback((v)=>{
  axios.post(`/api?v=${v}&state=${state}`)
}, [state])
```



通过 useCallback 包裹后， `boolean` 的变化不会触发 `OtherComponent` ，只有 `state` 变化时，才会触发，可以避免很多无用的 `OtherComponent` 执行。

但是仔细想想， `state` 变化其实也是没有必要触发 `OtherComponent` 的，我们只要保证 `onChange` 一定能访问到最新的 `state` ，就可以避免 `state` 变化时，触发 `OtherComponent` 的 render。

```
const onChange = usePersistFn((v)=>{
  axios.post(`/api?v=${v}&state=${state}`)
})
```



上面的例子，我们使用了 Umi Hooks 的 [usePersistFn](https://hooks.umijs.org/zh-CN/hooks/advanced/use-persist-fn)，它可以保证函数地址永远不会变化，无论何时， `onChange` 地址都不会变化，也就是无论何时， `OtherComponent` 都不会重新 render 了。

### 谨慎使用 Context

Context 是跨组件传值的一种方案，但我们需要知道，我们无法阻止 Context 触发的 render。

不像 props 和 state，React 提供了 API 进行浅比较，避免无用的 render，Context 完全没有任何方案可以避免无用的渲染。

有几点关于 Context 的建议：

- Context 只放置必要的，关键的，被大多数组件所共享的状态。
- 对非常昂贵的组件，建议在父级获取 Context 数据，通过 props 传递进来。

### 小心使用 Redux

Redux 中的一些细节，稍不注意，就会触发无用的 render，或者其它的坑。

# 精细化依赖

```
const App = (props)=>{
  return (
    <div>
        {props.project.id}
    </div>
  )
}
export default connect((state)=>{
  layout: state.layout,
  project: state.project,
  user: state.user
})(App);
```



在上面的例子中，App 组件显示声明依赖了 redux 的 `layout` 、 `project` 、 `user` 数据，在这三个数据变化时，都会触发 App 重新 render。

但是 App 只需要监听 `project.id` 的变化，所以精细化依赖可以避免无效的 render，是一种有效的优化手段。

```
const App = (props)=>{
  return (
    <div>
        {props.projectId}
    </div>
  )
}
export default connect((state)=>{
  projectId: state.project.id,
})(App);
```



