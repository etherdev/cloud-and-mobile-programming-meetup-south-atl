class UserUpdateService

  def self.process(options)
    user = User.get(options[:user_id])
    raise(UserNotFound, "No User record found") if user.nil?
    user.extend(UserUpdateRepresenter)
    user.from_hash(options)
    user.save
    user.extend(UserRepresenter).to_hash
  end
  
end