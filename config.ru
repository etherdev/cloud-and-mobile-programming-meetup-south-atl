require './api.rb'

DataMapper.setup(:default, 'postgres://yourusername:@localhost/meetup_api')
DataMapper.finalize.auto_upgrade!

app = Rack::Builder.new do

  map "/" do
  	run Implementation::API
  end
  
end

run app