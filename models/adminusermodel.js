var AdminUserModel = {
    id:0,
    account:'',
    passwd:'',
    state:0
};

var AdminUserState = {
    Deleted:0,//已删除
    Normal:1,//正常
}

module.exports = {AdminUserModel,AdminUserState};