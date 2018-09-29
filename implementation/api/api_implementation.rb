module Implementation
  class API < Sinatra::Base
    
    # default route
    get "/" do
      "Hello world! This is working!!"
    end
    
    # get collection of users
    get "/users/?" do
      if params[:status]
        users = User.public_send(params[:status])
      else
        users = User.all
      end
      users.extend(UsersRepresenter).to_json
    end
    
    # get an instance of a user
    get "/users/:user_id/?" do
      user = User.get(params[:user_id])
      return {}.to_json if user.nil?
      user.extend(UserRepresenter).to_json
    end
    
    # create a user
    post "/users/?" do
      user = User.new.extend(UserRepresenter)
  	  user.from_json(request.body.read)
      user.save
      user.to_json
    end
    
    # update a user (including logical delete using status)
    post "/users/:user_id/?" do
      user = User.get(params["user_id"])
      return {}.to_json if user.nil?
      user.extend(UserRepresenter)
      user.from_json(request.body.read)
      user.save
      user.to_json
    end
  
  end
end