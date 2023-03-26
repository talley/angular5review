CREATE TABLE stories
(
 id int identity(1,1) not null primary key,
 plot nvarchar(200) null,
 writer nvarchar(200) null,
 upvotes int not null default 0,
 editing bit not null default 0,
 createdat datetime2 not null default getdate(),
 updatedat datetime2 null
)