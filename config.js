/**
 * Created by 衡 on 15-1-17.
 */

// var config =
// {
//     db_host     : 'rdsj6varqyymnry.mysql.rds.aliyuncs.com', /* Database IP */
//     db_port     : 3306,        /* Database Port */
//     db_user     : 'r7gs53056x0gq8dq',        /* Database Username */
//     db_password : 'send email to 1010127369@qq.com',  /* Database Password */
//     db_database : 'r7gs53056x0gq8dq',    /* Database Name */
//     db_engine   : 'InnoDB',
//     blog_name   :  'DeepAutumn',
//     web_port    : 8025,
//     CACHE_ENABLE: 1
// }

var config =
    {
        db_host: 'localhost',      /* Database IP */
        db_port: 3306,                  /* Database Port */
        db_user: 'sa',                /* Database Username */
        db_password: '123mysql',     /* Database Password */
        db_database: 'coredb',           /* Database Name */
        db_engine: 'InnoDB',
        blog_name: 'DeepAutumn',
        web_port: 8025,
        CACHE_ENABLE: 1
    };

// var config =
//     {
//         db_host: '172.18.99.61', /* Database IP */
//         db_port: 3306,        /* Database Port */
//         db_user: 'sa',        /* Database Username */
//         db_password: '****',  /* Database Password */
//         db_database: 'coredb',    /* Database Name */
//         db_engine: 'InnoDB',
//         blog_name: 'DeepAutumn',
//         web_port: 8025,
//         CACHE_ENABLE: 1
//     };

module.exports = config;
