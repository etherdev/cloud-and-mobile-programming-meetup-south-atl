module Implementation
  class React < Sinatra::Base
    register Mustache::Sinatra
    register Sinatra::CrossOrigin

    set :public_folder, "implementation/web-react/build/"
    
    set :allow_origin, :any
    set :allow_methods, [:get, :post, :options]
    set :allow_credentials, true
    set :max_age, "1728000"
    set :expose_headers, ['Content-Type']

    # default route
    get "/" do
      send_file File.expand_path('index.html', settings.public_folder)
    end

  end
end