class Idea
  include DataMapper::Resource
  
  property :id,                   Serial
  property :title,                String
  property :description,          String
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