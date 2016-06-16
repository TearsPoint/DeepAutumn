--活动表
drop TABLE if exists activity;

CREATE TABLE if not exists activity (
  id bigint(20) NOT NULL AUTO_INCREMENT,
  act_theme varchar(200) DEFAULT NULL,     --活动主题
  act_summary varchar(500) DEFAULT NULL,   --活动摘要
  price double(18,2) null,                 --活动费用
  print_desc varchar(200),                 --活动费用描述
  act_detail text null,                    --活动详情
  begin_on datetime null,                  --开始时间
  end_on datetime null,                    --结束时间
  difficuty_flag  smallint null,           --难度指数
  start_place varchar(200) null,           --集合地点
  PRIMARY KEY (id)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;


DROP PROCEDURE IF EXISTS  `coredb`.`alter_activity`; 
CREATE PROCEDURE `coredb`.`alter_activity` (IN icount int) 
 COMMENT '修改活动表' 
 DETERMINISTIC 
 READS SQL DATA 
  SQL SECURITY DEFINER 
begin
    --真实姓名
    -- select  @i:=count(column_name)  from information_schema.columns where
    --     table_name='user' and column_name='real_name';
    -- if @i=0 then alter table user add real_name varchar(30) null; end if;
  
end; 

call alter_activity(1);

insert into activity (act_theme) values('狮子岛露营');

select * from activity;




--活动报名表
drop TABLE if exists act_signup;

CREATE TABLE if not exists act_signup (
  id bigint(20) NOT NULL AUTO_INCREMENT,
  act_id bigint(20) NULL,               --报名活动ID 
  user_id bigint(20) NULL,              --报名用户ID
  is_agreen smallint not null DEFAULT 1,--是否同意免责声明
  paytype_flag smallint null,           --支付方式
  status smallint not null default 0,   --状态  0：未支付  1:已支付
  suggesion varchar(200),               --对此活动的意见
  order_id varchar(50) null,            --订单ID
  signup_on datetime null ,      --报名时间
  PRIMARY KEY (id)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;

insert into act_signup (act_id,user_id,suggesion) values(1,1,'玩的愉快');
insert into act_signup (act_id,user_id,suggesion) values(2,2,'玩的愉快2');

select * from act_signup;
