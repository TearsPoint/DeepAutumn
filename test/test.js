var mysql = require('mysql');
var config = require('../config');
var sqlexec = require('../sqlexec')
var fs = require('fs');
var path = require('path');
var runtime = require('../runtime');
var sql = process.argv[2];
var rdire = process.argv[1];  //e:\MyWorkspace\DeepAutumn\NodeJs\DeepAutumn\sql 



var Ext = Ext || {};
// Ext.apply(Ext, {
//     extend : (function () {
//         // inline overrides
//         var io = function (o) {
//             for (var m in o) {
//                 console.log("io : ", m);
//                 this[m] = o[m];
//             }
//         };
//         var oc = Object.prototype.constructor;
//         return function (sb, sp, overrides) {
//             if (typeof sp == 'object') {
//                 overrides = sp;
//                 sp = sb;
//                 sb = overrides.constructor != oc ? overrides.constructor : function () {
//                     sp.apply(this,
//                         arguments);
//                 };
//             }
//             var F = function () { }, sbp, spp = sp.prototype;
//             F.prototype = spp;
//             sbp = sb.prototype = new F();
//             sbp.constructor = sb;
//             sb.superclass = spp;
//             if (spp.constructor == oc) {
//                 spp.constructor = sp;
//             }
//             sb.override = function (o) {
//                 Ext.override(sb, o);
//             };
//             sbp.override = io;
//             Ext.override(sb, overrides);
//             sb.extend = function (o) { Ext.extend(sb, o); };
//             return sb;
//         };
//     } ()),
//     override: function (q, r) {
//         if (q.$isClass) {
//             q.override(r)
//         } else {
//             if (typeof q == "function") {
//                 Ext.apply(q.prototype, r)
//             } else {
//                 var n = q.self, o, p;
//                 if (n && n.$isClass) {
//                     for (o in r) {
//                         if (r.hasOwnProperty(o)) {
//                             p = r[o];
//                             if (typeof p == "function") {
//                                 p.$name = o;
//                                 p.$owner = n;
//                                 p.$previous = q.hasOwnProperty(o) ? q[o] : k
//                             }
//                             q[o] = p
//                         }
//                     }
//                 } else {
//                     Ext.apply(q, r)
//                 }
//             }
//         }
//         return q
//     }
// });



Ext.extend = function () {
    // inline overrides
    var io = function (o) {
        for (var m in o) {
            console.log("io : ", m);
            this[m] = o[m];
        }
    };
    var oc = Object.prototype.constructor;
    return function (sb, sp, overrides) {
        console.log(sb.constructor);
        console.log(sp.constructor);
        console.log(overrides);
        if (typeof sp == 'object') {
            overrides = sp;
            sp = sb;
            sb = overrides.constructor != oc ? overrides.constructor : function () {
                sp.apply(this, arguments);
            };
        }
        else {
            console.log("如果子类已经有自己定义的构造函数");
            var cache = sb;//把子类的构造函数先缓存起来
            //重新包装出一个构造函数
            sb = function () {
                sp.apply(this, arguments);//首先调用父类的构造函数 cache.apply(this,arguments);//然后调用自身的构造函数
            };
        }
        var F = function () { }, sbp, spp = sp.prototype;
        F.prototype = spp;
        sbp = sb.prototype = new F();
        sbp.constructor = sb;
        sb.superclass = spp;
        if (spp.constructor == oc) {
            spp.constructor = sp;
        }
        sb.override = function (o) {
            Ext.override(sb, o);
        };
        sbp.override = io;
        Ext.override(sb, overrides);
        sb.extend = function (o) { Ext.extend(sb, o); };
        return sb;
    };
} ();

Ext.override = function (q, r) {
    if (q.$isClass) {
        q.override(r)
    } else {
        if (typeof q == "function") {
            Ext.apply(q.prototype, r)
        } else {
            var n = q.self, o, p;
            if (n && n.$isClass) {
                for (o in r) {
                    if (r.hasOwnProperty(o)) {
                        p = r[o];
                        if (typeof p == "function") {
                            p.$name = o;
                            p.$owner = n;
                            p.$previous = q.hasOwnProperty(o) ? q[o] : k
                        }
                        q[o] = p
                    }
                }
            } else {
                Ext.apply(q, r)
            }
        }
    }
    return q
};

Ext.apply = function (q, p, s) {
    if (s) {
        Ext.apply(q, s)
    }
    if (q && p && typeof p === "object") {
        var r, o, n;
        for (r in p) {
            q[r] = p[r]
        }
        if (l) {
            for (o = l.length; o--;) {
                n = l[o];
                if (p.hasOwnProperty(n)) {
                    q[n] = p[n]
                }
            }
        }
    }
    return q
};

A = function (config) {
    this.id = config.id;
}
A.prototype.sayHello = function () {
    console.log("function from Class A!");
}

B = function (config) {
    this.name = config.namel;
}

B = Ext.extend(B, A);  //B 继承 A   

var bb = new B({ name: "ming", id: '001' });
bb.sayHello();
console.log("bb.id", bb.id)




console.log("----测试闭包---");

RectAngle = function (width, height) {
    this.width = width;
    this.height = height;
}
RectAngle.prototype.area = function () {
    return this.width * this.height;
}
console.log("RectAngle.prototype is：", RectAngle.prototype);


RectAngle = function (width, height) {
    this.getWidth = function () { return width };
    this.getHeight = function () { return height };
}
RectAngle.prototype.area2 = function () {
    return this.getWidth() * this.getHeight();
}
console.log("RectAngle.prototype is：", RectAngle.prototype);



RectAngle = function (width, height) {
    this.w = width;
    this.h = height;
    this.getWidth = function () {
        var haha = function () {
            return width;
        }
        console.log("ha 1 is  ", haha());
        return haha();
    },
        this.getHeight = function () {
            var haha = function () {
                return height;
            }
            console.log("ha 2 is  ", haha());
            return haha();
        }
}

RectAngle.prototype.area = function () {
    return this.getWidth() * this.getHeight();
}

RectAngle.prototype.area2 = function () {
    return this.w * this.h;
}
var rect = new RectAngle(2, 5);

console.log("rect.getWidth=", rect.getWidth());
console.log("RectAngle.prototype is：", RectAngle.prototype);
console.log("RectAngle.area() is：", rect.area());


ColorRectAngle = function (color, w, h) {
    //拷贝父类RectAngle的属性
    RectAngle.call(this, w, h);
    this.c = color;
}
var parent = new RectAngle();
//拷贝父类RectAngle的函数
ColorRectAngle.prototype = parent;
//重新指定构造函数
ColorRectAngle.prototype.constructor = ColorRectAngle
delete ColorRectAngle.prototype.w;
delete ColorRectAngle.prototype.h;

console.log("parent is", parent);
console.log("parent.constructor is", new RectAngle().constructor);

var crect = new ColorRectAngle("red", 1, 6);

console.log("crect.getWidth=", crect.w);
console.log("crect.getHeight=", crect.h);
console.log("crect.area() is ", crect.area());
console.log("ColorRectAngle.prototype is：", ColorRectAngle.prototype); constructor
console.log("ColorRectAngle.constructor is：", crect.constructor);



console.log("--------------");
console.log("");
console.log("");

console.log("----实际干了以下事情---");
function Person() {
    this.name = "";
    this.age = 0;
}
//new 实际干了以下事情
var obj = {};
obj.__proto__ = Person.prototype;
Person.call(obj);
console.log(Person.prototype);
console.log(obj);


console.log("--------------");


//Exec();
//ExecSqls();
//test();
//customerFormatSqlFile();

console.log(parseInt("3", 4));

var a = ["1", "2", "3"].map(parseInt);
console.log(a);
var b = ["1", "2", "3"];
b.map(parseInt);
console.log(b);

// function parseInt(str, radix) { 
//     return str+'-'+radix; 
// };
var a = ["1", "2", "3", "4", "5", 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
a = a.map(parseInt);
console.log(a);




function test() {
    var data;
    var uname = 'test';
    var pwd = '123';
    var cpwd = runtime.md5(runtime.md5(pwd));

    //原始拼字符串   不安全
    //sqlexec.ExecSql('insert into user(user_name,pwd) values("' + uname + '","' + cpwd + '");',

    //使用format()
    sqlexec.ExecSql('insert into user(user_name,pwd) values(@uname ,@cpwd)', { uname: uname, cpwd: cpwd },
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
    sqlexec.ExecSql(sql,
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

    sqlexec.ExecSqls(sql,
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
console.log(Object.prototype.toString.call(nums) == '[object Array]');

nums.reverse();   //反转
console.log('reverse():', nums);

var orderByDesc = function (num1, num2) {
    if (num2 > num1)
        return true;
}

var orderByEsc = function (num1, num2) {
    if (num1 > num2)
        return true;
}

Array.prototype.orderByDesc = function () {
    Array.prototype.sort.call(this, function (num1, num2) {
        if (num2 > num1)
            return true;
    });
    return this;
};


Array.prototype.orderByEsc = function () {
    Array.prototype.sort.call(this, function (num1, num2) {
        if (num1 > num2)
            return true;
    });
    return this;
};

//nums.sort(orderByDesc);
console.log('sortDesc:', nums.orderByDesc());
//nums.sort(orderByEsc);
console.log('sortEsc:', nums.orderByEsc());

nums.splice(0, 1, 'a');
console.log(nums);  // [1, 2, 3, 4, 5, 6, 7, 8, 9]

nums = nums.slice(0, 1);
console.log(nums);

var up = function (grade, index, current) {
    var r = grade += 5;
    return r;
}
var grades = [72, 65, 81, 92, 85];
var newGrades = grades.map(up, 2);
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
var compare = function (o1, o2) {
    return o1.index > o2.index;
};
objInArray.sort(compare);
console.log(objInArray); // true
