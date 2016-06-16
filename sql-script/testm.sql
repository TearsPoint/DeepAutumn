

-- create table IF NOT EXISTS test(ID BIGINT(20) UNSIGNED NOT NULL AUTO_INCREMENT, VALUE VARCHAR(50) NOT NULL, PRIMARY KEY (ID));
-- delete from test;
-- set @b = "cccc";
-- INSERT INTO TEST(VALUE) VALUES(@b);
-- --插入测试数据--sss
--  if @o = 'i' then
--      INSERT INTO TEST(VALUE) VALUES(@value1);
--     INSERT INTO TEST(VALUE) VALUES(@b);
--     INSERT INTO TEST(VALUE) VALUES("HELLO3");
--     INSERT INTO TEST(VALUE) VALUES("HELLO4");
-- end if;
-- select * from test; 




drop TABLE if exists ChineseCharacterCode;
CREATE TABLE if not exists ChineseCharacterCode
(
	ID int NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `Character` varchar(10) NOT NULL,
    WBCode varchar(10) NOT NULL,
	SpellCode varchar(10) NOT NULL,
	WBCode1 varchar(10) NOT NULL,
    SpellCode1 varchar(10) NOT NULL,
	RowVersion date NOT NULL
);

--创建存储过程
DROP PROCEDURE IF EXISTS  `coredb`.`testproc2`; 
CREATE PROCEDURE `coredb`.`testproc2` (IN icount int) 
 COMMENT '测试proc' 
 DETERMINISTIC 
 READS SQL DATA 
  SQL SECURITY DEFINER 
begin
if(1=1) then set icount = icount+1;
end if;
select icount+1;
end; 

