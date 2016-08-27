
--组织
--drop table if exists organ;
create table if not exists organ 
(
    id bigint(20) not null auto_increment,
    organ_name varchar(200) null,   --组织名称
    organ_code varchar(100) null,   --组织编码
    organ_desc varchar(2000) null,  --组织描述
    primary key (id)
);

insert into organ (organ_name,organ_code,organ_desc,build_on )
values ('13hike','13hike','13户外','16-05-01');


--组织成员
--drop table if exists organ_member;
create table if not exists organ_member 
(
    id bigint(20) not null auto_increment,
    organ_id bigint(20) null,
    user_id bigint(20) null,
    primary key(id)
);


DROP PROCEDURE IF EXISTS  `coredb`.`alter_organ`; 
CREATE PROCEDURE `coredb`.`alter_organ` (IN icount int) 
 COMMENT '修改组织相关' 
 DETERMINISTIC 
 READS SQL DATA 
  SQL SECURITY DEFINER 
begin
    -- 组织成立时间
    select  @i:=count(column_name)  from information_schema.columns where
        table_name='organ' and column_name='build_on';
    if @i=0 then alter table organ add build_on date null; 
    end if;
     
end; 

call alter_organ(1);