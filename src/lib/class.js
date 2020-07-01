/**
 * 滚动通用类
 */
export default class ScrollClass {
  constructor(opts = {}) {
    // 一些默认设置
    this.defaultOpts = {
      container: opts.container || window
    }
    // 监听器的数据列表
    this.listenerList = {}
    // 用函数节流的方式绑定滚动监听
    this.defaultOpts.container.addEventListener('scroll', this.throttle(this.handleScroll.bind(this), 100, 300))
  }

  // 滚动监听所有
  handleScroll() {
    var scrollTop = this.getScrollTop(),
      windowHeight = this.getWindowHeight()
    for (var selector in this.listenerList) {
      this.handleScrollOne(this.listenerList[selector], scrollTop, windowHeight)
    }
  }

  // 滚动监听单个
  handleScrollOne(data, scrollTop, windowHeight) {
  }

  // 滚动监听器，用于监听某个元素在滚动时进场还是离场
  listener(opts, callBack) {
    var selector = '',
      target = null
    const getRandom = () => String(Math.random()*1000000000000).substring(0, 10)
    // opts都转换成对象的形式
    if (typeof opts === 'string' || (typeof jQuery !== 'undefined' && opts instanceof jQuery)) {
      opts = {
        el: opts
      }
    }
    selector = 'Element' + getRandom()
    // 如果el是一个jq对象，则做一个data选择器的标记
    if (typeof jQuery !== 'undefined' && opts.el instanceof jQuery) {
      if (!opts.el.data('selector')) {
        selector = 'jQuery' + getRandom()
        opts.el.data('selector', selector)
      } else {
        selector = opts.el.data('selector')
      }
      target = opts.el.get(0)
    } else if (typeof opts.el === 'string') {
      target = document.querySelector(opts.el)
    } else {
      target = opts.el
    }
    if (!this.listenerList[selector]) {
      this.listenerList[selector] = []
    }
    // 非jq对象需要为该原生target混入hasClass、addClass、removeClass方法
    this.mixinMethod(target)
    this.listenerList[selector].target = target
    this.listenerList[selector].push({ opts, callBack })
    // 主动触发一次监听。这是可能存在page on load时被滚动监听的节点达到进场条件，需要触发
    this.handleScrollOne(this.listenerList[selector], this.getScrollTop(), this.getWindowHeight())
    this.listenerEnd && this.listenerEnd(target, opts)
    return this
  }

  // 滚动监听器，监听多个元素
  listenerAll(opts, callBack) {
    const _this = this
    if (typeof jQuery !== 'undefined' && opts.el instanceof jQuery) {
      opts.el.each(function () {
        const curOpts = Object.assign({}, opts, {el: $(this)})
        _this.listener(curOpts, callBack)
      })
    } else {
      document.querySelectorAll(opts.el).forEach(el => {
        const curOpts = Object.assign({}, opts, {el})
        _this.listener(curOpts, callBack)
      })
    }
  }

  // 函数节流
  throttle(method, delay, duration) {
    let timer = null
    let begin = new Date()
    return function () {
      var context = this, args = arguments
      var current = new Date()
      clearTimeout(timer)
      if (current - begin >= duration) {
        method.apply(context, args)
        begin = current
      } else {
        timer = setTimeout(function () {
          method.apply(context, args)
        }, delay)
      }
    }
  }

  // 获取scrollTop
  getScrollTop() {
    if (this.defaultOpts.container !== window) return this.defaultOpts.container.scrollTop
    var scrollTop = 0
    if (document.documentElement && document.documentElement.scrollTop) {
      scrollTop = document.documentElement.scrollTop
    } else if (document.body) {
      scrollTop = document.body.scrollTop
    }
    return scrollTop
  }

  // 获取浏览器窗口高度
  getWindowHeight() {
    if (this.defaultOpts.container !== window) return Math.floor(this.defaultOpts.container.clientHeight)
    var windowHeight = 0
    if (window.innerHeight) {
      windowHeight = window.innerHeight
    } else if (document.body.clientHeight && document.documentElement.clientHeight) {
      windowHeight = document.body.clientHeight < document.documentElement.clientHeight
        ? document.body.clientHeight
        : document.documentElement.clientHeight
    } else {
      windowHeight = document.body.clientHeight > document.documentElement.clientHeight
        ? document.body.clientHeight
        : document.documentElement.clientHeight
    }
    return Math.floor(windowHeight)
  }

  // 为原生对象target混入一些方法
  mixinMethod(target) {
    target.hasClass = function (className) {
      return target.classList.contains(className)
    }
    target.addClass = function (className) {
      target.classList.add(className)
    }
    target.removeClass = function (className) {
      target.classList.remove(className)
    }
    target.offset = function () {
      return _getOffset(target)
    }
    target.getHeight = function () {
      // 如果传入的不是对象是字符串 则通过字符串转换成对象
      // 从style中获取对应的高度
      if (target.style.height != null && target.style.height.length > 0) {
        return parseFloat(target.style.height)
      }
      //如果style.height为空  则从css里面获取是否定义了height信息如果定义了 则读取css里面定义的高度height
      if (parseFloat(_getStyleValue(target, 'height')) > 0) {
        return parseFloat(_getStyleValue(target, 'height'))
      }
      //如果从css里获取到的值不是大于0  可能是auto 则通过offsetHeight来进行计算
      if (target.offsetHeight > 0) {
        let borderTopWidth = _getStyleValue(target, 'borderTopWidth'),
          borderBottomWidth = _getStyleValue(target, 'borderBottomWidth'),
          paddingTop = _getStyleValue(target, 'paddingTop'),
          paddingBottom = _getStyleValue(target, 'paddingBottom'),
          backHeight = parseFloat(target.offsetHeight) - parseFloat(borderTopWidth) - parseFloat(borderBottomWidth) - parseFloat(paddingTop) - parseFloat(paddingBottom)
        return parseFloat(backHeight)
      }
      return 0
    }

    //************一些辅助方法***************
    // 获取offset信息
    function _getOffset(obj) {
      var offset = { left: 0, top: 0 }
      while (obj) {
        offset.left += obj.offsetLeft
        offset.top += obj.offsetTop
        obj = obj.offsetParent
      }

      return offset
    }

    // 获取style中的值
    function _getStyleValue(elObj, attr) {
      var view = elObj.ownerDocument.defaultView
      if (!view || !view.opener) {
        view = window
      }
      if (elObj.currentStyle) {      //IE
        return elObj.currentStyle[attr]
      } else {
        return view.getComputedStyle(elObj)[attr]     //Firefox
      }
    }
  }
}
