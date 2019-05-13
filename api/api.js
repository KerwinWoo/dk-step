const root = 'api/';
const API_BASE_URL = 'https://xiaochengxu.su360.com/' + root;
//const API_BASE_URL = 'http://10.0.0.225:8080/platform/' + root;
module.exports = {
  HOME_QUERY_GOODS: API_BASE_URL + 'dk_index/category', //首页商品展示
  HOME_QUERY_USERDK: API_BASE_URL + 'dkeshell/query_dk_num', //查询当前用户的蛋壳数
  HOME_QUERY_STEPTASK: API_BASE_URL + 'dkstep/query_undo_pao',//查询所有步数任务
  HOME_QUERY_DKSTEP: API_BASE_URL + 'dkstep/query_dk_step',//查询当前用步数
  HOME_PICKSTEP: API_BASE_URL + 'dkstep/click_undo_pao',//点击泡泡任务
  AuthLoginByWeixin: API_BASE_URL + 'auth/login_by_weixin', //微信登录
  SYNC_STEPS: API_BASE_URL + 'auth/decrypt_weixin_data',//用户登录步数同步接口
  HOME_QUERY_DKINDEX_CATEGORY: API_BASE_URL + 'dk_index/category',
  MALL_QUERY_DKGOODS_LIST: API_BASE_URL + 'dk_goods/list',
  HOME_CHANGEDK: API_BASE_URL  + 'dkstep/change_dk',//兑换蛋壳
  BUYOU_QUERY_COMMUNITYLIST: API_BASE_URL + 'step_square/community_list',//查询话题列表
  BUYOU_ATTENTIONUSER_LIST: API_BASE_URL + 'step_square/my_attentionUser_Community_List',//获取我关注的人的话题列表
  
  DK_HISTORY:API_BASE_URL + 'dkeshell/query_dkEshell_consumers',//查看蛋壳的消费记录
};
