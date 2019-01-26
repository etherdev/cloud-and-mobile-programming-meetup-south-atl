module Implementation
  class Web < Sinatra::Base
    
    # index of users
    get "/users/?" do
      begin
        @title = "User List"
        @users = UsersRetrievalService.process(params)
        mustache :'users/index'
      rescue StandardError => e
        status 400
        @errors = format_errors("standard_error", e)
        mustache :failure
      end
    end

    # index of users
    # get "/users/?" do
    #   @title = "User List"
    #   if params[:status]
    #     @users = User.public_send(params[:status]).extend(UsersRepresenter)
    #   else
    #     @users = User.all.extend(UsersRepresenter)
    #   end
    #   mustache :'users/index'
    # end
    

    # instance of a user
    get "/users/:user_id/?" do
      begin
        @title = "User"
        @user = UserRetrievalService.process(params)
        mustache :'users/profile'
      rescue UserNotFound => e
        status 400
        @errors = format_errors("user_not_found", e)
        mustache :failure
      rescue StandardError => e
        status 400
        @errors = format_errors("standard_error", e)
        mustache :failure
      end
    end
    
    # instance of a user
    # get "/users/:user_id/?" do
    #   @title = "User"
    #   @user = User.get(params[:user_id]).extend(UserRepresenter).to_hash
    #   mustache :'users/profile'
    # end
    
    # create a user
    post '/users/?' do
      begin
        user = UserCreateService.process(params)
        redirect "/users/#{user["id"]}/"
      rescue DataMapper::SaveFailureError => e
        status 400
        @errors = format_errors("standard_error", e)
        mustache :failure
      rescue StandardError => e
        status 400
        @errors = format_errors("standard_error", e)
        mustache :failure
      end
    end
    
    # create a user
    # post "/users/?" do
    #   @user = User.new.extend(UserRepresenter)
    #   @user.from_hash(params)
    #   @user.save
    #   redirect "/users/#{@user.id}/"
    # end
    
    # update a user (including logical delete using status)
    post "/users/:user_id/?" do
      begin
        user = UserUpdateService.process(params)
        redirect "/users/#{user["id"]}/"
      rescue UserNotFound => e
        status 400
        @errors = format_errors("user_not_found", e)
        mustache :failure
      rescue DataMapper::SaveFailureError => e
        status 400
        @errors = format_errors("standard_error", e)
        mustache :failure
      rescue StandardError => e
        status 400
        @errors = format_errors("standard_error", e)
        mustache :failure
      end
    end
    
    # update a user (including logical delete using status)
    # post "/users/:user_id/?" do
    #   @user = User.get(params[:user_id]).extend(UserRepresenter)
    #   @user.from_hash(params)
    #   @user.save
    #   redirect "/users/#{@user.id}/"
    # end
  
  end
end