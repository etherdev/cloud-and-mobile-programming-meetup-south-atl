require './init.rb'

DataMapper.setup(:default, 'postgres://andrewskiles:@localhost/meetup_api')
DataMapper.finalize.auto_upgrade!