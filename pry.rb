require './api.rb'

DataMapper.setup(:default, 'postgres://barbarafraim:@localhost/meetup_api')
DataMapper.finalize.auto_upgrade!