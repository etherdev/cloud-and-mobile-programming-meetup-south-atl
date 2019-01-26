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
        
        def errors
          @errors
        end
        
      end
      
    end
  end
end