class MeetingUserLink
  include DataMapper::Resource
  
  belongs_to :meeting, key: true
  belongs_to :user, key: true

end