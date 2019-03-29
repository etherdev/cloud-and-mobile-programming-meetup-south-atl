module Implementation
  class React < Sinatra::Base
    register Mustache::Sinatra

    set :public_folder, "implementation/web-react/build/"

    # default route
    get "/" do
      send_file File.expand_path('index.html', settings.public_folder)
    end

  end
end