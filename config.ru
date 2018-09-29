require './init.rb'

DataMapper.setup(:default, 'postgres://jimmyether:@localhost/meetup_api')
DataMapper.finalize.auto_upgrade!

app = Rack::Builder.new do

  map "/" do
  	run Implementation::Web
  end
  
  map "/api/v1/" do
  	run Implementation::API
  end
  
end

run app