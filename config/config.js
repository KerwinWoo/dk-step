var fileHost = "https://dankebsh.oss-cn-shanghai.aliyuncs.com/";//你的阿里云OSS地址  在你当前小程序的公众号后台的uploadFile 合法域名也要配上这个域名
var config = {
   uploadImageUrl: `${fileHost}`, // 默认存在根目录，可根据需求改
   AccessKeySecret: 'wlIob0oJEpfPIof0qTr7Lq0UjVyKPM',        // AccessKeySecret 去你的阿里云上控制台上找
   OSSAccessKeyId: 'LTAINMQguEyW6RHw',         // AccessKeyId 去你的阿里云上控制台上找
   timeout: 80000 ,//这个是上传文件时Policy的失效时间，
   messageInterval: 10,//单位：秒，系统消息监测轮询时间
};
module.exports = config