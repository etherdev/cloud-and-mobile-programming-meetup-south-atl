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

module UserCreateRepresenter
  include Roar::Representer::JSON

  property :email
  property :first_name
  property :last_name
  property :phone
  property :note
  
end

module UserUpdateRepresenter
  include Roar::Representer::JSON

  property :email
  property :first_name
  property :last_name
  property :phone
  property :note
  
end

module UsersRepresenter
  include Roar::Representer::JSON

  def users
    self
  end

  collection :users, extend: UserRepresenter, class: User
	
end