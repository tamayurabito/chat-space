# DB設計
---

## usersテーブル
---
|column|type|options|
|---|---|---|
|name|string|null:false|
|mail|string|null:false|
|password|string|null:false|

### Association
- has_many :messages
- has_many :groups_users
- has_many :groups, through: :groups_users


## groupsテーブル
---
|column|type|options|
|---|---|---|
|group_name|string|null:false|

### Association
- has_many :messages
- has_many :groups_users
- has_many :users through: :groups_users


## messageテーブル
---
|column|type|potions|
|---|---|---|
|body|text||
|image|string||
|group_id|integer|null:false, foreigh_key:true|
|user_id|integer|unll:false, foreigh_key:ture|

### Association
- belong_to :user
- belong_to :group


## groups_usersテーブル
---
|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user