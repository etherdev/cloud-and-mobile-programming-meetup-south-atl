module Implementation
  class Web  < Sinatra::Base
    module Views

      class Layout < Mustache
        
        def title_tag
          @title || "Websuasion Meetup App"
        end
        
      end
      
      class Home < Layout
        
      end
      
      class Failure < Layout
        
      end
      
    end
  end
end