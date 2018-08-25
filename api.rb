require 'rubygems'
require 'data_mapper'
require 'dm-postgres-adapter'
require 'pg'
require 'sinatra/base'
require 'puma'
require 'roar/representer/json'
require 'roar/representer/feature/hypermedia'
require 'pry'
require 'pry-remote'
require 'pry-doc'

class User
  include DataMapper::Resource
  
  GENDER = {male: 0, female: 1}
  STATUSES = {active: 0, inactive: 1, deleted: 2}
  
  property :id,                   Serial
  property :email,                String, required: true,
                                          unique: true,
                                          format: :email_address,
                                          messages: { is_unique: "We already have that email.",
                                                      format: "Doesn't look like an email address to me ..." }
  property :first_name,           String
  property :last_name,            String
  property :phone,                String
  property :birthday,             DateTime
  property :gender,               Integer
  property :note,                 Text
  property :status,               Integer, default: 0
  
  has n, :ideas
  has n, :meeting_user_links
  has n, :meetings, through: :meeting_user_links
  
  def self.active
    all(status: 0)
  end
  
  def self.inactive
    all(status: 1)
  end
  
  def self.deleted
    all(status: 2)
  end

end

module UserRepresenter
  include Roar::Representer::JSON

  property :id
  property :email
  property :first_name
  property :last_name
  property :phone
  property :birthday
  property :gender
  property :note
  property :status
  
end

module UsersRepresenter
  include Roar::Representer::JSON

  def users
    self
  end

  collection :users, extend: UserRepresenter, class: User
	
end

class Idea
  include DataMapper::Resource
  
  property :id,                   Serial
  property :title,                String
  property :note,                 Text
  
  belongs_to :user
  belongs_to :meeting, required: false
  
  def self.in_meetings
    all(:meeting.not => nil)
  end
  
  def self.alone
    all(meeting: nil)
  end

end

class Meeting
  include DataMapper::Resource
  
  property :id,                   Serial
  property :description,          String
  property :date,                 DateTime
  
  has n, :meeting_user_links
  has n, :users, through: :meeting_user_links
  has n, :ideas

end

class MeetingUserLink
  include DataMapper::Resource
  
  belongs_to :meeting, key: true
  belongs_to :user, key: true

end

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