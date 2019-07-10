const root = 'api/';
const API_BASE_URL = 'https://xiaochengxu.su360.com/' + root;
//const API_BASE_URL = 'http://10.0.0.210:8080/platform/' + root;
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
  COMMON_INVITATION: API_BASE_URL + 'auth/invitation',//通用邀请
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
  GAME_GETWHEEL_AWORDRECORD: API_BASE_URL + 'wheel_aword/get_roll_award_record',//中奖信息
  
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
  DKORDER_CANCEL: API_BASE_URL + 'dk_order/cancelOrder',//订单取消
  DKORDER_CONFIRM: API_BASE_URL + 'dk_order/confirm',//确认收货

  PayPrepayId: API_BASE_URL + 'pay/prepay', //获取微信统一下单prepay_id
  
  ME_INFONUM: API_BASE_URL + 'step_square/query_gfhf',//查询用户[关注][粉丝][获赏][发帖]
  
  REWARDRECORDS: API_BASE_URL + 'wheel_aword/get_award_records',//查询用户[关注][粉丝][获赏][发帖]
  
  QIANDAOLIST: API_BASE_URL + 'dkstep/sing_in_record',// 连续签到记录查询
  QIANDAO: API_BASE_URL + 'dkstep/sing_in',// 用户签到 
  QIANDAONUM: API_BASE_URL + 'dkstep/sign_user_num',// 今日签到人数
  STEPRECORD: API_BASE_URL + 'dkstep/query_step_records',// 查找步数消费生成记录
  
  MESSAGENUM_TOTAL: API_BASE_URL + 'notice/count_unread_notice_total',// 查询我的未读通知总数
  MESSAGENUM_TYPE: API_BASE_URL + 'notice/count_unread_notice_type',// 分别统计我的各类未读通知数目
  MESSAGENUM_REWARD: API_BASE_URL + 'notice/my_notice_reward',// 我的未读[打赏]通知
  MESSAGENUM_COMMENT: API_BASE_URL + 'notice/my_notice_comment',// 我的未读[评论]通知
  MESSAGENUM_FANS: API_BASE_URL + 'notice/my_notice_fans',// 我的未读[粉丝(被关注)]通知
  MESSAGENUM_SYSTEM: API_BASE_URL + 'notice/my_notice_sys',// 我的未读[系统]通知
  MESSAGENUM_CHANGESTATUS: API_BASE_URL + 'notice/change_notice_status',// 改变[某个]通知的阅读状态
  MESSAGENUM_CHANGESTATUS_BATCH: API_BASE_URL + 'notice/change_notice_status_Batch',// 改变[批量]通知的阅读状态
  
  TEAM_CREATE: API_BASE_URL + 'run_team/creat_team',// 创建跑团
  TEAM_LIST: API_BASE_URL + 'run_team/my_team_list',// 我参与的团队列表
  TEAM_DETAIL: API_BASE_URL + 'run_team/team_details',// 团队详情
  TEAM_DETAIL_EXIT: API_BASE_URL + 'run_team/quit_team',// 退出团队
  TEAM_DETAIL_DELETE: API_BASE_URL + 'run_team/dismiss_team',// 解散团队
  TEAM_DETAIL_EXPEL: API_BASE_URL + 'run_team/expel_team',// 踢出团队
  TEAM_UPDATE: API_BASE_URL + 'run_team/update_team',// 修改团队信息
  TEAM_JOIN: API_BASE_URL + 'run_team/join_team',// 加入团队
  
  REWARD_USER: API_BASE_URL + 'step_square/reward_user',// 打赏个人
  TOPIC_FORWARD: API_BASE_URL + 'step_square/forward',// 话题转发+1
  
  PAYQUERY: API_BASE_URL + 'pay/query',// 支付成功-查询微信支付状态
  
  GZH_QUERY:  API_BASE_URL + 'wxtask/concern',// 公众号关注状态查询
  GZH_REWARD:  API_BASE_URL + 'wxtask/reward',// 公众号奖励
  
  WXSTEPS: API_BASE_URL + 'dkstep/query_step_everyDay',// 微信步数历史记录
  
  UPDATETASK: API_BASE_URL + 'dktask/update_done_task',// 更新任务状态
  
  QUERY_WXSTEP: API_BASE_URL + 'dkstep/query_dk_step',// 查询微信步数
  
  TA_HOMEPAGEDATA: API_BASE_URL + 'step_square/ta_page',// 查询TA的主页信息
  
  UPDATE_USERINFO: API_BASE_URL + 'user/updateUser',// 更新用户信息
  
  TA_ATTENTIONUSERLIST: API_BASE_URL + 'user_attention/query_ta_attentionUser_list',// 获取TA的关注人列表
  
  TA_FANSLIST: API_BASE_URL + 'user_attention/query_ta_fans_list',// 查询TA的粉丝列表
  
  TA_REWARDLIST: API_BASE_URL + 'step_square/ta_received_reward_list',// TA收到的打赏
  
  TA_COMMUNITYLIST: API_BASE_URL + 'step_square/ta_community_list',// 查询TA的话题列表
  
  TEAM_INVITESTATUS: API_BASE_URL + 'run_team/get_join_status',// 查询加入team的状态
  
  LOTTERY_LISTLOTTERY: API_BASE_URL + 'lottery/list_lottery',// 查询加入team的状态
  LOTTERY_DETAIL: API_BASE_URL + 'lottery/lottery_detail',// 抽奖详情
  LOTTERY_JOIN: API_BASE_URL + 'lottery/join_lottery',// 参与抽奖
  LOTTERY_JOINUSER: API_BASE_URL + 'lottery/join_lottery_user_page',// 参与活动抽奖的用户的微信图片
  LOTTERY_GETSTEP: API_BASE_URL + 'lottery/get_lottery_step',// 参与活动抽奖的用户的微信图片
  POSTIMGLIST: API_BASE_URL + 'bill/list',// 海报图片
  HOMEPAGE_BG: API_BASE_URL + 'bill/home_page',// 首页背景
};
