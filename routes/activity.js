/**
 * Created by 衡 on 16-08-01.
 */
var express = require('express');
var runtime = require('../runtime');
var sqlexecutor = require('../sqlexecutor');
var url = require('url');

function push(router) {

    //发布活动
    router.post('/activity', function (req, res) {
        var act_theme = req.param('act_theme');
        var act_summary = req.param('act_summary');
        var price = req.param('price');
        var price_desc = req.param('price_desc');
        var act_detail = req.param('act_detail');
        var begin_on = req.param('begin_on');
        var end_on = req.param('end_on');
        var difficuty_flag = req.param('difficuty_flag');
        var start_place = req.param('start_place');

        sqlexecutor.ExecSql(' insert into activity (act_theme,act_summary,price,price_desc,act_detail,begin_on,end_on,' +
            'difficuty_flag,start_place,act_category,banner_url,start_on,leader1_uid) '
            , {
                act_theme: act_theme, act_summary: act_summary, price: price, price_desc: price_desc, act_detail: act_detail, begin_on: begin_on, end_on: end_on,
                difficuty_flag: difficuty_flag, start_place: start_place, act_category: act_category, banner_url: banner_url, start_on: start_on, leader1_uid: leader1_uid
            }
            , function (err, rows) {
                if (err) runtime.Log(err);
                else if (rows.insertedId > 0) {
                    res.send({ info: '发布成功' });
                }
                else
                    res.send({ info: '发布失败' });
            });
        return;
    });

    //获取活动未完成的活动 在主页中展示
    router.get('/activity', function (req, res, next) {
        sqlexecutor.ExecSql(' select id,act_theme,act_summary,price,price_desc,begin_on, ' +
            ' end_on,difficuty_flag,difficuty_desc,start_place,act_category,banner_url,start_on,leader1_uid,leader1_name,' +
            ' datediff(end_on,start_on ) days ' +
            ' from activity where isdeleted = 0  ', //--and end_on >= curdate()
            {}, function (err, rows) {
                if (err) runtime.Log(err);
                else if (rows.length > 0) {
                    res.contentType('application/json');
                    res.send({ title: '最近未完成活动', acts: rows });
                    return;
                }
            }
        )
    });


    //获取活动
    router.get('/detail', function (req, res, next) {
        var param = url.parse(req.url, true).query;
        var id = param.aid;

        sqlexecutor.ExecSql(' select id,act_theme,act_summary,price,price_desc,act_detail,begin_on, ' +
            ' end_on,difficuty_flag,difficuty_desc,start_place,act_category,banner_url ,act_category,banner_url,start_on,leader1_uid,leader1_name ,' +
            ' person_count' +
            ' from activity where id = @id ',
            { id: id }, function (err, rows) {
                if (err) runtime.Log(err);
                else if (rows.length > 0) {
                    res.render('detail', { title: '活动详情', act: rows[0] });
                    return;
                }
            }
        )
    });

    //报名
    router.get('/enroll', function (req, res, next) {
        var data = { user_name: '', pwd: '', real_name: '', gender: '', idcard: '', phone: '', email: '', wechat_no: '', about_me: '' ,ecperson:'',ecpersonphone:'' ,others:''};

        res.render('enroll', { title: "报名", user: data });
    });
}



module.exports.push = push;