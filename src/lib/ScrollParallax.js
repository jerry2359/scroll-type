/**
 * Created by jerry.lin-wun on 2019/1/31.
 * 滚动视差插件
 * 调用示例：
 * var sp = new ScrollParallax();
 * sp.listener('.screen2 .img-shadow-wrap img');
 * sp.listener({
        el: '.screen2 .img-shadow-wrap img',
        limit: 20,
        duration: 1
    });
 */
import ScrollClass from './class'

export default class ScrollParallax extends ScrollClass {
  constructor() {
    super()
    // 一些默认设置
    this.defaultOpts = {
      limit: {
        x: 0,
        y: 7
      },
      duration: .5
    }
  }

  // 滚动监听单个
  handleScrollOne(data, scrollTop, windowHeight) {
    var _this = this,
      target = data.target
    data.forEach(function (item) {
      var callBack = item.callBack,
        opts = item.opts,
        offsetTop = target.offset().top,
        offsetWindowTop = (windowHeight - target.getHeight()) / 2,
        scale = 1 - (offsetTop - scrollTop) / offsetWindowTop,
        limitX = 0,
        limitY = 0,
        parallax = { x: 0, y: 0 }

      opts.limit = opts.limit || {}
      limitX = opts.limit.x || _this.defaultOpts.limit.x
      limitY = opts.limit.y || _this.defaultOpts.limit.y
      parallax = { x: limitX * scale * -1, y: limitY * scale * -1 }
      _this.setCss3(target, 'transform', 'translate(' + parallax.x + 'px, ' + parallax.y + 'px)')
      callBack && callBack({
        target,
        parallax,
        scrollTop,
        windowHeight
      })
    })
  }

  // 监听器运行完毕时触发
  listenerEnd(target, opts) {
    this.setCss3(target, 'transition', 'all ' + (opts.duration || this.defaultOpts.duration) + 's ease')
  }

  // 添加css3样式
  setCss3(obj, name, value) {
    var str = name.charAt(0).toUpperCase() + name.substring(1)
    obj.style['Webkit' + str] = value
    obj.style['Moz' + str] = value
    obj.style['ms' + str] = value
    obj.style['O' + str] = value
    obj.style[name] = value
  }
}
