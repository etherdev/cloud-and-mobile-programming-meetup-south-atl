require './api.rb'

DataMapper.setup(:default, 'postgres://yourusername:@localhost/meetup_api')
DataMapper.finalize.auto_upgrade!