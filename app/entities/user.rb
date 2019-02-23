class User
  include DataMapper::Resource
  
  # GENDER = {male: 0, female: 1}
  # STATUSES = {active: 0, inactive: 1, deleted: 2}
  #
  property :id,                   Serial
  property :email,                String, required: true,
                                          unique: true,
                                          format: :email_address,
                                          messages: { is_unique: "We already have that email.",
                                                   format: "Doesn't look like an email address to me ..." }
  property :first_name,           String
  property :last_name,            String
  property :phone,                String
  property :birthday,             Date
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