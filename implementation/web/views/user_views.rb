module Implementation
  class Web  < Sinatra::Base
    module Views
      module Users

        class Index < Layout

          def users
            @users["users"]
          end
          
        end
        
        class Profile < Layout

          def user
            @user
          end
          
        end
        
      end
    end
  end
end