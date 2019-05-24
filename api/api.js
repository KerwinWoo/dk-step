const root = 'api/';
const API_BASE_URL = 'https://xiaochengxu.su360.com/' + root;
//const API_BASE_URL = 'http://10.0.0.214:8080/platform/' + root;
module.exports = {
  HOME_QUERY_GOODS: API_BASE_URL + 'dk_index/category', //首页商品展示
  HOME_QUERY_USERDK: API_BASE_URL + 'dkeshell/query_dk_num', //查询当前用户的蛋壳数
  HOME_QUERY_STEPTASK: API_BASE_URL + 'dkstep/query_undo_pao',//查询所有步数任务
  HOME_QUERY_DKSTEP: API_BASE_URL + 'auth/decrypt_weixin_data',//查询当前用步数
  HOME_PICKSTEP: API_BASE_URL + 'dkstep/click_undo_pao',//点击泡泡任务
  AuthLoginByWeixin: API_BASE_URL + 'auth/login_by_weixin', //微信登录
  AUTH_GETSESSIONKEY: API_BASE_URL + 'auth/sessionkey', //获取sessinkey
  INIT_DKDATA: API_BASE_URL + 'auth/init_dk_data',//初始化数据
  SYNC_STEPS: API_BASE_URL + 'auth/decrypt_weixin_data',//用户登录步数同步接口
  HOME_QUERY_DKINDEX_CATEGORY: API_BASE_URL + 'dk_index/category',
  MALL_QUERY_DKGOODS_LIST: API_BASE_URL + 'dk_goods/list',
  MALL_QUERY_GOODS_DETAIL: API_BASE_URL + 'dk_goods/detail',
  HOME_CHANGEDK: API_BASE_URL  + 'dkstep/change_dk',//兑换蛋壳
  BUYOU_QUERY_COMMUNITYLIST: API_BASE_URL + 'step_square/community_tags_list',//查询话题列表
  BUYOU_ATTENTIONUSER_LIST: API_BASE_URL + 'step_square/my_attentionUser_community_list',//获取我关注的人的话题列表
  BUYOU_CREATETOPIC: API_BASE_URL + 'step_square/send_topic',//发布话题
  BUYOU_DASHANG: API_BASE_URL + 'step_square/reward_topic',//话题打赏
  BUYOU_RECOMMENT_TOPICLIST: API_BASE_URL + 'step_square/recommend_community_list',//推荐话题列表
  BUYOU_TOPICCOMMENT: API_BASE_URL + 'step_square/community_details',//话题评论
  BUYOU_SHOUCANGTOPIC: API_BASE_URL + 'step_square/collection',//收藏话题
  
  DK_HISTORY:API_BASE_URL + 'dkeshell/query_eshell_records',//查看蛋壳的消费记录,
  
  UPLOAD_IMGS: API_BASE_URL + 'step_square/upload_pics',//批量上传图片
  USER_ATTENTION: API_BASE_URL + 'user_attention/attention',// 关注用户
  
  GAME_WHEEL_AWORD: API_BASE_URL + 'wheel_aword/get_awards',//转盘数据
  GAME_GETWHEEL_AWORD: API_BASE_URL + 'wheel_aword/get_wheel_award',//抽奖
  
  DKWISH_SAVE: API_BASE_URL + 'dk_wish/save',//新增心愿清单
  DKWISH_DETAIL: API_BASE_URL + 'dk_wish/detail',//查询当前商品是否加入心愿清单
  DKWISH_DELETE: API_BASE_URL + 'dk_wish/delete',//移除心愿清单
  DKWISH_LIST: API_BASE_URL + 'dk_wish/list',//心愿清单-列表
  
  ADDRESS_LIST: API_BASE_URL + 'address/list',//地址列表
  RegionList: API_BASE_URL + 'region/list',  //获取区域列表,
  AddressDetail: API_BASE_URL + 'address/detail',  //收货地址详情
  AddressSave: API_BASE_URL + 'address/save',  //保存收货地址
  AddressDelete: API_BASE_URL + 'address/delete',  //删除收货地址
  
  DKORDER_SUBMIT: API_BASE_URL + 'dk_order/submit', //商品详情-提交订单-立即兑换/OR 下单
  DKORDER_LIST: API_BASE_URL + 'dk_order/list',// 订单管理

};
