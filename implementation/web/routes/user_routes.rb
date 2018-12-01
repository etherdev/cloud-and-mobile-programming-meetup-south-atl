module Implementation
  class Web < Sinatra::Base

    # index of users
    get "/users/?" do
      @title = "User List"
      if params[:status]
        @users = User.public_send(params[:status]).extend(UsersRepresenter)
      else
        @users = User.all.extend(UsersRepresenter)
      end
      mustache :'users/index'
    end
    
    # instance of a user
    get "/users/:id/?" do
      @title = "User"
      @user = User.get(params[:id]).extend(UserRepresenter).to_hash
      mustache :'users/profile'
    end
    
    # create a user
    post "/users/?" do
      @user = User.new.extend(UserRepresenter)
      @user.from_hash(params)
      @user.save
      redirect "/users/#{@user.id}/"
    end
    
    # update a user (including logical delete using status)
    post "/users/:user_id/?" do
      @user = User.get(params[:user_id]).extend(UserRepresenter)
      @user.from_hash(params)
      @user.save
      redirect "/users/#{@user.id}/"
    end
  
  end
end