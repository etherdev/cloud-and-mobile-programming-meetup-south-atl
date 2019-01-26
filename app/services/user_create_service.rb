class UserCreateService

  def self.process(options)
    user = User.new.extend(UserCreateRepresenter)
    user.from_hash(options)
    user.save
    user.extend(UserRepresenter).to_hash
  end
  
end