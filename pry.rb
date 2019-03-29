require './init.rb'

DataMapper.setup(:default, 'postgres://jimmyether:@localhost/meetup_api')
DataMapper.finalize.auto_upgrade!