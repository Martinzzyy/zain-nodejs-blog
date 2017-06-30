var sqliteKey = ['abort',
    'action','add','after','all','alter','analyze','and','as',
    'asc','attach','autoincrement','before','begin','between','by','cascade','case','cast','check','collate','column','commit','conflict','constraint',
    'create','cross','current_date','current_time','current_timestamp','database','default','deferrable','deferred','delete','desc','detach','distinct',
    'drop','each','else','end','escape','except','exclusive','exists','explain','fail','for','foreign','from','full','glob',
    'group','having','if','ignore','immediate','in','index','indexed','initially','inner','insert','instead','intersect','into','is','isnull','join',
    'key','left','like','limit','match','natural','no','not','notnull','null','of','offset','on','or','order','outer','plan','pragma',
    'primary','query','raise','references','regexp','reindex','release','rename','replace','restrict','right','rollback','row','savepoint','select','set','table','temp','temporary',
    'then','to','transaction','trigger','union','unique','update','using','vacuum','values','view','virtual','when','where',];

var Symbol = ['`','~','!','@','#','$','%','^','&','*',',','，','.','。','/','、','\',','、','?','？','<','>',':','：',';'];

module.exports = function(str){
    if(!!str) return str;
    var reg = null;
    for(var i in Symbol){
        reg = new RegExp(Symbol[i], 'ig')
        str = str.replace(reg,' ');
    }
    return str;
}
