/**
 * Created by jerry.lin-wun on 2019/1/30.
 * 滚动进场插件
 * 调用示例：
 * var ls = new ListenScroll();
 * ls.listener({
        el: '.screen',
        trigger: .1
    }, function (ev) {
        // 每次滚动时都会触发
        console.log(ev);
        if (ev.status === 'enter' && !ev.target.hasClass('scroll-listened')) {
            ev.target.addClass('scroll-listened');
        }
    });
 ls.listener({
        type: 'once',
        scrollClassName: 'scroll-end-123',
        el: '.screen2',
        trigger: .1
    }, function (ev) {
        console.log('只触发一次滚动进场');
        //console.log(ev);
        screen2.find('.img-shadow-wrap').addClass('top-left');
    });
 ls.listener({
        type: 'repeat',
        el: '.screen3',
        trigger: .2
    }, function (ev) {
        console.log('重复进场时触发一次，离场时触发一次。当前状态是：' + ev.status);
    });
 */
import ScrollClass from './class'

export default class ListenScroll extends ScrollClass {
  constructor() {
    super()
    // 一些默认设置
    this.defaultOpts = {
      scrollClassName: 'scroll-listened',
      trigger: 1
    }
  }

  // 滚动监听单个
  handleScrollOne(data, scrollTop, windowHeight) {
    var _this = this,
      target = data.target
    data.forEach(function (item) {
      var callBack = item.callBack,
        opts = item.opts,
        status = _this.getStatus(target, scrollTop, windowHeight, opts.trigger || _this.defaultOpts.trigger),
        scrollClassName = opts.scrollClassName || _this.defaultOpts.scrollClassName

      switch (opts.type) {
        // 只触发一次进场
        case 'once':
          if (status === 'enter' && !opts.isListened) {
            opts.isListened = true
            target.addClass(scrollClassName)
            callBack && callBack({
              target,
              status,
              scrollTop,
              windowHeight
            })
          }
          break

        // 会一直重复进场时触发一次，离场时触发一次。
        case 'repeat':
          if (status === 'enter') {
            if (!opts.isListened) {
              opts.isListened = true
              target.addClass(scrollClassName)
              callBack && callBack({
                target,
                status,
                scrollTop,
                windowHeight
              })
            }
          } else if (status === 'leave') {
            if (opts.isListened) {
              opts.isListened = false
              target.removeClass(scrollClassName)
              callBack && callBack({
                target,
                status,
                scrollTop,
                windowHeight
              })
            }
          }
          break

        // 无论何种情况，每次都会触发
        default:
          callBack && callBack({
            target,
            status,
            scrollTop,
            windowHeight
          })
          break
      }
    })
  }

  // 判断进场还是离场的状态
  // enter 进场
  // leave 离场
  getStatus(screen, scrollTop, windowHeight, triggerAreaReferToWindow) {
    var status = '',
      screenOffsetTop = screen.offset().top
    if (
      // 从上往下滚动
      (screenOffsetTop < scrollTop + windowHeight / (1 + triggerAreaReferToWindow)
        && screen.getHeight() + screenOffsetTop > scrollTop + windowHeight)
      ||
      // 从下往上滚动
      (screen.getHeight() / (1 + triggerAreaReferToWindow) + screenOffsetTop > scrollTop
        && scrollTop > screenOffsetTop)
      ||
      // 上下两边都在窗口内
      (screenOffsetTop >= scrollTop && screenOffsetTop + screen.getHeight() <= scrollTop + windowHeight)
    ) {
      status = 'enter'
    } else {
      status = 'leave'
    }
    return status
  }
}