/**
 * 判断是否在微信中
 * @return {Boolean}
 */
export const isInWechat = function() {
  return !!navigator.userAgent.match(/micromessenger/i);
};

/**
 * 判断是否在iOS中
 * @return {Boolean}
 */
export const isInIOS = function() {
  return !!navigator.userAgent.match(/iphone|ipad|ipod/i);
};
