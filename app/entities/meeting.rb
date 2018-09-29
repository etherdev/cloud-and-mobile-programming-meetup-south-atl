class Meeting
  include DataMapper::Resource
  
  property :id,                   Serial
  property :description,          String
  property :date,                 DateTime
  
  has n, :meeting_user_links
  has n, :users, through: :meeting_user_links
  has n, :ideas

end