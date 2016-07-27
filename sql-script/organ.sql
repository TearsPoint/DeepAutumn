
--组织
drop table if exists organ;

create table if not exists organ 
(
    id bigint(20) not null auto_increment,
    organ_name varchar(200) null,   --组织名称
    organ_code varchar(100) null,   --组织编码
    organ_desc varchar(2000) null,  --组织描述
    primary key (id)
);

alter table organ add build_on date null; --组织成立时间

insert into organ (organ_name,organ_code,organ_desc,build_on )
values ('iHiking.me','iHiking.me','艾嗨肯','13-05-01');

select * from organ;



--组织成员
drop table if exists organ_member;

create table if not exists organ_member 
(
    id bigint(20) not null auto_increment,
    organ_id bigint(20) null,
    user_id bigint(20) null,
    primary key(id)
);

select * from organ_member;