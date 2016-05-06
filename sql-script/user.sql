
--用户表
-- create table IF NOT EXISTS user(
--     ID BIGINT(20) UNSIGNED NOT NULL AUTO_INCREMENT
--     PRIMARY KEY (ID));
    
CREATE TABLE if not exists user (
  id int(11) NOT NULL AUTO_INCREMENT,
  user_name varchar(50) DEFAULT NULL,
  pwd varchar(1000) DEFAULT NULL,
  PRIMARY KEY (id)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;


-- select * from information_schema.columns 
--         where table_schema='r7gs53056x0gq8dq' and table_name='user' and column_name='real_name'

alter table user change id id BIGINT(20) NOT NULL AUTO_INCREMENT;
--select case @i when 1 then (select 2) else (select 3) end as tt;

DROP PROCEDURE IF EXISTS  `r7gs53056x0gq8dq`.`alter_user`; 
CREATE PROCEDURE `r7gs53056x0gq8dq`.`alter_user` (IN icount int) 
 COMMENT 'alter_user' 
 DETERMINISTIC 
 READS SQL DATA 
  SQL SECURITY DEFINER 
begin
    --真实姓名
    select  @i:=count(column_name)  from information_schema.columns where
        table_name='user' and column_name='real_name';
    if @i=0 then alter table user add real_name varchar(30) null; end if;
    
    --英文名
    select  @i:=count(column_name)  from information_schema.columns where
        table_name='user' and column_name='eng_name';
    if @i=0 then alter table user add eng_name varchar(30) null; end if;
    
    --身份证号
    select  @i:=count(column_name)  from information_schema.columns where
        table_name='user' and column_name='idcard';
    if @i=0 then alter table user add idcard varchar(20) null;  end if;
    
    --性别
    select  @i:=count(column_name)  from information_schema.columns where
        table_name='user' and column_name='gender';
    if @i=0 then alter table user add `gender` varchar(20) null;  end if; 
    
    --手机号
    select  @i:=count(column_name)  from information_schema.columns where
        table_name='user' and column_name='phone';
    if @i=0 then alter table user add `phone` varchar(20) null;  end if; 
    
    --邮箱
    select  @i:=count(column_name)  from information_schema.columns where
        table_name='user' and column_name='email';
    if @i=0 then alter table user add `email` varchar(100) null;  end if; 
    
    --所属组织
    select  @i:=count(column_name)  from information_schema.columns where
        table_name='user' and column_name='organ_id';
    if @i=0 then alter table user add `organ_id` bigint(20) null;  end if; 
    
    --角色   0-创始人  1-领队  2-普通用户  3-VIP用户
    select  @i:=count(column_name)  from information_schema.columns where
        table_name='user' and column_name='role_flag';
    if @i=0 then alter table user add `role_flag` varchar(20) null;  end if; 
    
    --头像
    select  @i:=count(column_name)  from information_schema.columns where
        table_name='user' and column_name='header';
    if @i=0 then alter table user add `header` varchar(200) null;  end if; 
    
    --照片
    select  @i:=count(column_name)  from information_schema.columns where
        table_name='user' and column_name='photo';
    if @i=0 then alter table user add `photo` varchar(200) null;  end if; 
    
    --微信
    select  @i:=count(column_name)  from information_schema.columns where
        table_name='user' and column_name='wechat_no';
    if @i=0 then alter table user add `wechat_no` varchar(200) null;  end if; 
    
    --自我介绍
    select @i:=count(column_name) from information_schema.columns where 
        table_name='user' and column_name='about_me';
    if (@i=0) then alter table user add `about_me` varchar(2000) null; end if;
end; 

call alter_user(1);


select * from user;