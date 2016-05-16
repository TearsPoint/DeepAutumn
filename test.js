var mysql = require('mysql');
var config = require('./config');
var sqlexecutor = require('./sqlexecutor')
var fs = require('fs');
var path = require('path');
var runtime = require('./runtime');
var sql = process.argv[2];
var rdire = process.argv[1];  //e:\MyWorkspace\DeepAutumn\NodeJs\DeepAutumn\sql 


//Exec();
//ExecSqls();
//test();
//customerFormatSqlFile();

console.log(parseInt("3",4));

var a = ["1", "2", "3"].map(parseInt) ;
console.log(a);
var b= ["1", "2", "3"];
b.map(parseInt);
console.log(b); 

// function parseInt(str, radix) { 
//     return str+'-'+radix; 
// };
var a=["1", "2", "3", "4","5",6,7,8,9,10,11,12,13,14,15];
a=a.map(parseInt);
console.log(a);


function Person()
{
    this.name = "";
    this.age = 0;
}

//new 实际干了以下事情
var obj  = {};
obj.__proto__ = Person.prototype;
Person.call(obj); 
console.log(Person.prototype);
console.log(obj);




function test() {
    var data;
    var uname = 'test';
    var pwd = '123';
    var cpwd = runtime.md5(runtime.md5(pwd));
    
    //原始拼字符串   不安全
    //sqlexecutor.ExecSql('insert into user(user_name,pwd) values("' + uname + '","' + cpwd + '");',
    
    //使用format()
    sqlexecutor.ExecSql('insert into user(user_name,pwd) values(@uname ,@cpwd)', { uname: uname, cpwd: cpwd },
        function (err, rows) {
            if (err) { console.log(err, 3); }
            else {
                data = rows;
            }
        });
}


//注释format
function customerFormatSqlFile() {
    var query = '';
    if (path.extname(sql) == '.sql') {
        var filePath = path.join(rdire, '../sql-script/' + sql);
        console.log(filePath);
        query = fs.readFileSync(filePath, 'utf-8');
        var r = query.replace(/--.*/g, function (txt, key) {
            if (txt.indexOf('--##') > -1) return txt;
            console.log('txt:', txt, 'key:', key);
            return '';
        }.bind(this));

        console.log(r);
    }
}


function getRootPath() {
    var strFullPath = "http://localhost:8025/svc/usersvc";
    var a = strFullPath.indexOf("://");
    var protocal = strFullPath.substring(0, a);
    var b = strFullPath.substr(a + 3);
    var c = b.indexOf("/");
    var host = b.substring(0, c + 1);
    rootPath = protocal + "://" + host
    return (rootPath);
}


function Exec() {
    if (sql == null || sql == undefined)
        sql = "select * from bi_posts";
    else if (path.extname(sql) == '.sql') {
        var filePath = path.join(rdire, '../sql-script/' + sql);
        console.log(filePath);
        sql = fs.readFileSync(filePath, 'utf-8');

        var sqls = [];
        sqls = sql.split('--##');
        if (sqls.length > 1) {
            sqls.forEach(function (element) {
                //console.log(element);
                ExecSql(element);
            }, this);
            return;
        }
    }
    console.log(sql);
    ExecSql(sql);
}


function ExecSql(sql) {
    sqlexecutor.ExecSql(sql,
        function (err, rows) {
            if (err) log(err, 3);
            else {
                console.log('等待退出...');
                setTimeout(function () {
                    process.exit();
                }, 2000);
            }
        }
        );
}


function ExecSqls() {
    if (sql == null || sql == undefined)
        sql = "select * from bi_posts";
    else if (path.extname(sql) == '.sql') {
        var filePath = path.join(rdire, '../sql-script/' + sql);
        console.log(filePath);
        sql = fs.readFileSync(filePath, 'utf-8');
    }

    sqlexecutor.ExecSqls(sql,
        function (err, rows) {
            if (err) log(err, 3);
            else {
                console.log('等待退出...');
                setTimeout(function () {
                    process.exit();
                }, 2000);
            }
        }
        );
}




var nums = [3, 1, 2, 7, 9, 8];

console.log(nums instanceof Array);
console.log(Object.prototype.toString.call(nums)=='[object Array]');

nums.reverse();   //反转
console.log('reverse():',nums);

var orderByDesc = function(num1,num2)
{
    if(num2>num1)
        return true;
}

var orderByEsc = function(num1,num2)
{
    if(num1>num2)
        return true;
}

Array.prototype.orderByDesc = function()
{
    Array.prototype.sort.call(this,function(num1,num2)
    {
        if(num2>num1)
            return true;
    });
    return this;
};


Array.prototype.orderByEsc = function()
{
    Array.prototype.sort.call(this,function(num1,num2)
    {
        if(num1>num2)
            return true;
    });
    return this;
};

//nums.sort(orderByDesc);
console.log('sortDesc:',nums.orderByDesc());
//nums.sort(orderByEsc);
console.log('sortEsc:',nums.orderByEsc());

nums.splice(0, 1,'a');
console.log(nums);  // [1, 2, 3, 4, 5, 6, 7, 8, 9]

nums = nums.slice(0, 1);
console.log(nums);

var up = function(grade,index,current) {
    var r = grade += 5;
    return r;
}
var grades = [72, 65, 81, 92, 85];
var newGrades = grades.map(up,2);
console.log(newGrades);


var objInArray = [
    {
        name: 'king',
        pass: '123',
        index: 2
    },
    {
        name: 'king1',
        pass: '234',
        index: 1
    }
];

// 对数组中的对象元素，根据index进行升序
var compare = function(o1, o2) {
    return o1.index > o2.index;
};
objInArray.sort(compare);
console.log(objInArray); // true
