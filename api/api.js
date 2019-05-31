const root = 'api/';
const API_BASE_URL = 'https://xiaochengxu.su360.com/' + root;
//const API_BASE_URL = 'http://10.0.0.207:8080/platform/' + root;
module.exports = {
  HOME_QUERY_GOODS: API_BASE_URL + 'dk_index/category', //首页商品展示
  HOME_QUERY_USERDK: API_BASE_URL + 'dkeshell/query_dk_num', //查询当前用户的蛋壳数
  HOME_QUERY_STEPTASK: API_BASE_URL + 'dkstep/query_undo_pao',//查询所有步数任务
  HOME_QUERY_DKSTEP: API_BASE_URL + 'auth/decrypt_weixin_data',//查询当前用步数
  HOME_QUERY_FRIENDADD: API_BASE_URL + 'dk_friends/query_add_percent',//查询当前用步数
  HOME_QUERY_FRIENDLIST: API_BASE_URL + 'dk_friends/query_dk_friends',//查询当前用户的好友
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
  BUYOU_SHOUCANGTOPIC_CANCEL: API_BASE_URL + 'step_square/cancel_collection',//取消收藏话题
  BUYOU_ATTENTIONUSER: API_BASE_URL + 'user_attention/query_AttentionUser_List',//获取关注人列表
  BUYOU_TOPICDISCUSS: API_BASE_URL + 'step_square/topic_discuss', //话题评论
  BUYOU_FANSLIST: API_BASE_URL + 'step_square/my_fans_List', //获取粉丝列表
  BUYOU_MYTOPICLIST: API_BASE_URL + 'step_square/my_community_list', //获取我的话题列表
  BUYOU_MYSCTOPICLIST: API_BASE_URL + 'step_square/my_collection_community_list', //获取我收藏的话题列表
  BUYOU_REWARDLIST: API_BASE_URL + 'step_square/reward_list', //分页查询打赏用户列表
  BUYOU_DELETETOPIC: API_BASE_URL + 'step_square/delete_topic', //删除已发布话题
  BUYOU_DASHANGLIST: API_BASE_URL + 'step_square/received_reward_list', //收到的打赏
  DK_HISTORY:API_BASE_URL + 'dkeshell/query_eshell_records',//查看蛋壳的消费记录,
  
  UPLOAD_IMGS: API_BASE_URL + 'step_square/upload_pics',//批量上传图片
  USER_ATTENTION: API_BASE_URL + 'user_attention/attention',// 关注用户
  USER_ATTENTION_CANCEL: API_BASE_URL + 'user_attention/cancel_attention',// 取消关注用户
  
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
  DKORDER_WULIU: API_BASE_URL + 'dk_order/express',//查看物流
  DKORDER_ORDERDETAIL: API_BASE_URL + 'dk_order/detail',//订单详情

  PayPrepayId: API_BASE_URL + 'pay/prepay', //获取微信统一下单prepay_id
  
  ME_INFONUM: API_BASE_URL + 'step_square/query_gfhf',//查询用户[关注][粉丝][获赏][发帖]
  
  REWARDRECORDS: API_BASE_URL + 'wheel_aword/get_award_records',//查询用户[关注][粉丝][获赏][发帖]
  
  QIANDAOLIST: API_BASE_URL + 'dkstep/sing_in_record',// 连续签到记录查询
  QIANDAO: API_BASE_URL + 'dkstep/sing_in',// 用户签到 
  
  MESSAGENUM_TOTAL: API_BASE_URL + 'notice/count_unread_notice_total',// 查询我的未读通知总数
  MESSAGENUM_TYPE: API_BASE_URL + 'notice/count_unread_notice_type',// 分别统计我的各类未读通知数目
  MESSAGENUM_REWARD: API_BASE_URL + 'notice/unreadNotice_reward',// 我的未读[打赏]通知
  MESSAGENUM_COMMENT: API_BASE_URL + 'notice/unreadNotice_comment',// 我的未读[评论]通知
  MESSAGENUM_FANS: API_BASE_URL + 'notice/unreadNotice_fans',// 我的未读[粉丝(被关注)]通知
  MESSAGENUM_SYSTEM: API_BASE_URL + 'notice/unreadNotice_sys',// 我的未读[系统]通知
  MESSAGENUM_CHANGESTATUS: API_BASE_URL + 'notice/change_notice_status',// 改变[某个]通知的阅读状态
  MESSAGENUM_CHANGESTATUS_BATCH: API_BASE_URL + 'notice/change_notice_status_Batch',// 改变[批量]通知的阅读状态
};
