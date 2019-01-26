class UsersRetrievalService

  def self.process(options)
    if options[:status]
      User.public_send(options[:status]).extend(UsersRepresenter).to_hash
    else
      User.all.extend(UsersRepresenter).to_hash
    end
  end
  
end