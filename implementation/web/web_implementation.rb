module Implementation
  class Web < Sinatra::Base
    register Mustache::Sinatra
    
    set :mustache, {
      :views => 'implementation/web/views/',
      :templates => 'implementation/web/templates/'
    }
    
    set :public_folder, "implementation/web/public/"
    
    # default route
    get "/" do
      mustache :home
    end
  
  end
end